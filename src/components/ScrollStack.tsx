"use client";

import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import './ScrollStack.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = ''
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  blurAmount = 0,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardInitialTopsRef = useRef<number[]>([]);
  const ticking = useRef(false);

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const cacheInitialPositions = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const saved = cards.map(c => c.style.transform);
    cards.forEach(c => {
      c.style.transform = 'none';
    });

    void document.body.offsetHeight;

    cardInitialTopsRef.current = cards.map(card => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    cards.forEach((c, i) => {
      c.style.transform = saved[i];
    });
  }, []);

  const applyTransforms = useCallback(
    (scrollTop: number) => {
      const initialTops = cardInitialTopsRef.current;
      const cards = cardsRef.current;

      if (!initialTops.length || !cards.length) return;

      const vh = window.innerHeight;
      const stackPosPx = (parseFloat(stackPosition) / 100) * vh;
      const scaleEndPx = (parseFloat(scaleEndPosition) / 100) * vh;

      const endEl = scrollerRef.current?.querySelector(
        '.scroll-stack-end'
      ) as HTMLElement | null;

      const endTop = endEl
        ? endEl.getBoundingClientRect().top + scrollTop
        : initialTops[initialTops.length - 1] + vh;

      cards.forEach((card, i) => {
        const cardTop = initialTops[i];

        const pinStart =
          cardTop - stackPosPx - itemStackDistance * i;

        const pinEnd = endTop - vh * 0.5;

        const triggerStart = pinStart;
        const triggerEnd = cardTop - scaleEndPx;

        let scaleProgress = 0;

        if (triggerEnd > triggerStart) {
          scaleProgress = clamp(
            (scrollTop - triggerStart) /
              (triggerEnd - triggerStart),
            0,
            1
          );
        }

        const targetScale = baseScale + i * itemScale;
        const scale =
          1 - scaleProgress * (1 - targetScale);

        let translateY = 0;

        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY =
            scrollTop -
            cardTop +
            stackPosPx +
            itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY =
            pinEnd -
            cardTop +
            stackPosPx +
            itemStackDistance * i;
        }

        // IMPORTANT FIXES
        // Round values to avoid subpixel flickering
        const roundedY = Math.round(translateY);
        const roundedScale = Number(scale.toFixed(3));

        card.style.transform = `translateY(${roundedY}px) scale(${roundedScale})`;

        card.style.zIndex = `${i + 1}`;

        // Helps prevent rendering shimmer
        card.style.backfaceVisibility = 'hidden';
        card.style.webkitBackfaceVisibility = 'hidden';
      });

      if (onStackComplete && initialTops.length) {
        const lastPinStart =
          initialTops[initialTops.length - 1] -
          stackPosPx -
          itemStackDistance * (initialTops.length - 1);

        if (
          scrollTop >= lastPinStart &&
          !stackCompletedRef.current
        ) {
          stackCompletedRef.current = true;
          onStackComplete();
        } else if (scrollTop < lastPinStart) {
          stackCompletedRef.current = false;
        }
      }
    },
    [
      stackPosition,
      scaleEndPosition,
      itemStackDistance,
      baseScale,
      itemScale,
      blurAmount,
      onStackComplete
    ]
  );

  useIsomorphicLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }

      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.position = 'relative';
      card.style.zIndex = `${i + 1}`;

      // Additional smooth rendering fixes
      card.style.contain = 'paint';
      card.style.transformStyle = 'preserve-3d';
    });

    cacheInitialPositions();
    applyTransforms(window.scrollY);

    // FIXED SCROLL HANDLER USING requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          applyTransforms(window.scrollY);
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    const handleResize = () => {
      cacheInitialPositions();
      applyTransforms(window.scrollY);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      stackCompletedRef.current = false;
    };
  }, [itemDistance, cacheInitialPositions, applyTransforms]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
