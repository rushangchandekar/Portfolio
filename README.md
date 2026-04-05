# 🌌 Rushang Chandekar — Personal Portfolio

A premium, modern portfolio experience built with **Next.js 15**, **React**, and **Framer Motion**. This project features a sophisticated dark-mode aesthetic with emerald-to-sky gradients, smooth scrolling behaviors, and high-quality interactive components.

---

## ✨ Key Features

- **🚀 Performance** — Built on Next.js 15 for optimal speed and SEO.
- **✨ Fluid Animations** — Powered by `Framer Motion` for seamless transitions and interactive elements.
- **📜 Smooth Scrolling** — Integrated with `Lenis` for a professional, inertia-based scrolling experience.
- **🏗️ 3D Stacked Projects** — Project cards with depth-based stacking and z-index interpolation.
- **📱 Responsive by Design** — Tailored for mobile, tablet, and desktop views using Tailwind CSS.
- **📨 Functional Contact System** — Integrated SMTP-based contact form via `Nodemailer`.
- **💎 Premium Aesthetics** — Glassmorphism, harmonious color palettes, and modern typography (Inter/Outfit).

---

## 🛠️ Tech Stack

### **Core**
*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Components**: [Shadcn UI](https://ui.shadcn.com/)

### **Experience**
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
*   **Icons**: [Lucide React](https://lucide.dev/)

### **Infrastructure**
*   **Mailer**: [Nodemailer](https://nodemailer.com/)
*   **Deployment**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

```text
portfolio/
├── src/
│   ├── app/            # Next.js App Router context
│   ├── components/     # Reusable UI components (Shadcn/Custom)
│   ├── sections/       # Primary page sections (Hero, About, Projects, etc.)
│   ├── data/           # Config files and content strings
│   └── lib/            # Utility functions and library wrappers
├── public/             # Static assets and icons
└── tailwind.config.ts  # Design tokens and theme configuration
```

---

## 🚀 Local Development

Follow these steps to get the project running locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rushangchandekar/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your SMTP credentials:
   ```env
   SMTP_USER=your-email@example.com
   SMTP_PASS=your-app-password
   CONTACT_RECEIVER=your-receiver-email@example.com
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` to see the live site.

---

## 📬 Contact & Socials

I'm always open to discussing new projects and creative ideas.

- **Email**: [rushangchandekar05@gmail.com](mailto:rushangchandekar05@gmail.com)
- **LinkedIn**: [Rushang Chandekar](https://linkedin.com/in/rushangchandekar)
- **GitHub**: [@rushangchandekar](https://github.com/rushangchandekar)

---

> Built with 💻 and ☕ by **Rushang Chandekar**
