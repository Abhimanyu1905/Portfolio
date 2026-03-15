# Abhimanyu — Portfolio Website

A dynamic, modern, animated, and fully responsive portfolio built with **React**, **TailwindCSS**, and **Framer Motion**.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 18 (Vite)                     |
| Styling     | TailwindCSS 3                       |
| Animations  | Framer Motion 11                    |
| Icons       | React Icons 5                       |
| Build tool  | Vite 5                              |

---

## Features

- Animated loading screen with spinning conic ring
- Canvas-based particle background with connecting lines
- Sticky glassmorphism navbar with active-section tracking
- Hero section with custom typing effect
- Animated profile card (floating, rotating rings)
- Skills section with category filter + animated progress bars
- Project cards with hover glow and card-shine effect
- Project filter system (All / Web Platform / Dashboard)
- Animated vertical education timeline
- Contact form with focus-glow inputs and success state
- Gradient scroll-progress bar
- Scroll-to-top FAB
- Dark / Light mode toggle (persisted to localStorage)
- Mobile hamburger menu with staggered animation
- Fully responsive (mobile, tablet, desktop)

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# 1. Navigate into the project folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview   # preview the built output locally
```

---

## Project Structure

```
portfolio/
├── index.html                    # SEO meta tags + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                  # React root entry
    ├── App.jsx                   # App shell: loading + layout
    ├── index.css                 # Tailwind + global styles
    ├── context/
    │   └── ThemeContext.jsx      # Dark/light mode context
    └── components/
        ├── LoadingScreen.jsx     # Animated splash screen
        ├── ParticleBackground.jsx# Canvas particle system
        ├── ScrollProgress.jsx    # Gradient progress bar
        ├── ScrollToTop.jsx       # Floating FAB
        ├── Navbar.jsx            # Sticky nav + mobile drawer
        ├── Hero.jsx              # Full-screen hero + typing
        ├── About.jsx             # Bio + profile card
        ├── Skills.jsx            # Skill grid + filter
        ├── Projects.jsx          # Project cards + filter
        ├── Education.jsx         # Timeline
        ├── Contact.jsx           # Info cards + form
        └── Footer.jsx            # Social links + copyright
```

---

## Customisation

### Personal information

Search for `// ← update` comments throughout the components to find placeholder values to replace:

| File              | What to update                              |
|-------------------|---------------------------------------------|
| `Hero.jsx`        | GitHub / LinkedIn / email hrefs             |
| `Contact.jsx`     | Email, phone, LinkedIn, GitHub              |
| `Footer.jsx`      | Social hrefs                                |
| `Projects.jsx`    | `github` and `demo` hrefs for each project  |

### Resume

Place your resume PDF at `public/resume.pdf`. The **Download Resume** button in Hero already points to `/resume.pdf`.

### Contact form (real email)

The form currently simulates a submission. To send real emails:

1. Create a free account at [EmailJS](https://www.emailjs.com) or [Formspree](https://formspree.io).
2. Replace the `await new Promise(...)` block in `Contact.jsx` with the appropriate SDK call.

### Adding more projects

Edit the `PROJECTS` array in `Projects.jsx`. Each entry supports:

- `title`, `category`, `tagline`, `description`
- `features[]`, `tech[]`
- `github`, `demo` (links)
- `gradient`, `glow`, `border`, `iconBg` (colours)
- `number` (watermark text)

### Adding more skills

Edit the `SKILLS` array in `Skills.jsx`. Each entry requires:

- `name`, `cat` (category), `Icon` (react-icons component)
- `level` (0–100), `color`, `bg`

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# then drag-and-drop the dist/ folder to Netlify dashboard
```

---

