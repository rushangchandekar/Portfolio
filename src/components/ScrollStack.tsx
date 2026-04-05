"use client";
import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
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
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardInitialTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map<number, string>());

  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  const cacheInitialPositions = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const saved = cards.map(c => c.style.transform);
    cards.forEach(c => { c.style.transform = 'none'; });

    void document.body.offsetHeight;

    cardInitialTopsRef.current = cards.map(card => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    cards.forEach((c, i) => { c.style.transform = saved[i]; });
  }, []);

  const updateCardTransforms = useCallback((scrollTop: number) => {
    const cards = cardsRef.current;
    const initialTops = cardInitialTopsRef.current;
    if (!cards.length || !initialTops.length) return;

    const vh = window.innerHeight;
    const stackPosPx = (parseFloat(stackPosition) / 100) * vh;
    const scaleEndPx = (parseFloat(scaleEndPosition) / 100) * vh;

    const endEl = scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null;
    const endTop = endEl
      ? endEl.getBoundingClientRect().top + scrollTop
      : initialTops[initialTops.length - 1] + vh;

    cards.forEach((card, i) => {
      const cardTop = initialTops[i];
      const pinStart = cardTop - stackPosPx - itemStackDistance * i;
      const pinEnd = endTop - vh * 0.5;

      const triggerStart = pinStart;
      const triggerEnd = cardTop - scaleEndPx;
      let scaleProgress = 0;
      if (triggerEnd > triggerStart) {
        scaleProgress = clamp((scrollTop - triggerStart) / (triggerEnd - triggerStart), 0, 1);
      }
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPosPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPosPx + itemStackDistance * i;
      }

      const transformStr = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;

      if (lastTransformsRef.current.get(i) !== transformStr) {
        card.style.transform = transformStr;
        card.style.zIndex = `${i + 1}`;
        lastTransformsRef.current.set(i, transformStr);
      }

      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jPinStart = initialTops[j] - stackPosPx - itemStackDistance * j;
          if (scrollTop >= jPinStart) topCardIndex = j;
        }
        card.style.filter = i < topCardIndex
          ? `blur(${(topCardIndex - i) * blurAmount}px)`
          : '';
      }
    });

    if (onStackComplete && cards.length) {
      const lastPinStart = initialTops[initialTops.length - 1] - stackPosPx - itemStackDistance * (cards.length - 1);
      if (scrollTop >= lastPinStart && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete();
      } else if (scrollTop < lastPinStart) {
        stackCompletedRef.current = false;
      }
    }
  }, [stackPosition, scaleEndPosition, itemStackDistance, baseScale, itemScale, blurAmount, onStackComplete]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.position = 'relative';
      card.style.zIndex = `${i + 1}`;
    });

    cacheInitialPositions();

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        lerp: 0.1,
    });

    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
        updateCardTransforms(scroll);
    });

    const raf = (time: number) => {
        lenis.raf(time);
        rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    // Initial update
    updateCardTransforms(window.scrollY);

    const handleResize = () => {
      cacheInitialPositions();
      updateCardTransforms(window.scrollY);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      lastTransformsRef.current.clear();
      stackCompletedRef.current = false;
    };
  }, [itemDistance, cacheInitialPositions, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
