Build a professional, visually stunning Backend Developer portfolio website using React.js and Tailwind CSS with advanced scroll animations and effects.

═══════════════════════════════════════════════════════════
STEP 1 — READ RESUME FILE FIRST (MANDATORY)
═══════════════════════════════════════════════════════════

Before writing any code, locate the resume file in the project folder.
Search for: resume.pdf / resume.docx / CV.pdf / cv.docx

Extract this data:
- Full name
- Job title
- Professional summary
- Work experience (company, role, dates, responsibilities)
- Education (degree, college, year, CGPA)
- Skills (languages, frameworks, databases, DevOps, tools)
- Projects (name, description, tech stack, GitHub link, live link)
- Certifications (if any)
- Contact info (email, phone, LinkedIn, GitHub, location)

Save everything in: src/data/resumeData.js as one exported JS object.
Use ONLY this data across all components — zero hardcoded strings in JSX.

═══════════════════════════════════════════════════════════
STEP 2 — INSTALL REQUIRED PACKAGES
═══════════════════════════════════════════════════════════

Install these packages before starting:

npm install framer-motion
npm install react-intersection-observer
npm install react-scroll
npm install react-type-animation
npm install react-icons
npm install react-countup
npm install react-tilt
npm install tailwindcss

These will power all scroll effects, animations, and interactions.

═══════════════════════════════════════════════════════════
STEP 3 — PROJECT STRUCTURE
═══════════════════════════════════════════════════════════

src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Education.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── hooks/
│   ├── useScrollReveal.js
│   └── useActiveSection.js
├── animations/
│   └── variants.js
├── data/
│   └── resumeData.js
├── App.jsx
├── index.js
└── index.css

Build order strictly:
1. resumeData.js → populate from resume
2. variants.js → define all Framer Motion animation variants
3. index.css → global styles, fonts, CSS variables
4. hooks → useScrollReveal, useActiveSection
5. Components one by one (confirm render before next)
6. App.jsx → wire all sections together

═══════════════════════════════════════════════════════════
STEP 4 — DESIGN SYSTEM & GLOBAL STYLES (index.css)
═══════════════════════════════════════════════════════════

Import these fonts from Google Fonts:
- Syne (weights: 400, 700, 800) → for headings and logo
- DM Sans (weights: 300, 400, 500) → for body text

CSS Variables:
--bg: #050810
--surface: #0d1117
--card: #111827
--accent: #00d4ff
--accent2: #7c3aed
--text: #f0f4ff
--muted: #8892a4
--border: #1e2535

Global rules:
- html { scroll-behavior: smooth; }
- body { background: #050810; color: #f0f4ff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
- ::selection { background: #00d4ff; color: #050810; }
- Custom scrollbar: 6px width, accent color thumb (#00d4ff), dark track (#0d1117), border-radius 10px
- Add a subtle CSS noise texture overlay on body using SVG filter (pseudo-element, pointer-events: none, opacity: 0.04)

Tailwind config (tailwind.config.js):
Extend colors with all CSS variables above so they work as Tailwind utility classes.
Example: accent: '#00d4ff', accent2: '#7c3aed', surface: '#0d1117'

═══════════════════════════════════════════════════════════
STEP 5 — ANIMATION VARIANTS (animations/variants.js)
═══════════════════════════════════════════════════════════

Define and export these Framer Motion variants:

fadeUp:
- hidden: { opacity: 0, y: 60 }
- visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }

fadeIn:
- hidden: { opacity: 0 }
- visible: { opacity: 1, transition: { duration: 0.6 } }

slideLeft:
- hidden: { opacity: 0, x: -80 }
- visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }

slideRight:
- hidden: { opacity: 0, x: 80 }
- visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }

staggerContainer:
- hidden: {}
- visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }

scaleIn:
- hidden: { opacity: 0, scale: 0.8 }
- visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }

cardHover:
- rest: { y: 0, boxShadow: '0 0 0 rgba(0,212,255,0)' }
- hover: { y: -8, boxShadow: '0 20px 60px rgba(0,212,255,0.15)', transition: { duration: 0.3 } }

Use these variants consistently across all components via Framer Motion's motion.div with whileInView, viewport: { once: true, amount: 0.2 }

═══════════════════════════════════════════════════════════
STEP 6 — CUSTOM HOOKS
═══════════════════════════════════════════════════════════

useScrollReveal.js:
- Uses react-intersection-observer's useInView
- Returns { ref, inView } with threshold: 0.15, triggerOnce: true
- Used for triggering Framer Motion animations on scroll

useActiveSection.js:
- Tracks which section is currently in viewport using IntersectionObserver
- Returns the active section ID string
- Used by Navbar to highlight the current section link

═══════════════════════════════════════════════════════════
STEP 7 — BUILD ALL COMPONENTS
═══════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━
NAVBAR (Navbar.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: name from resumeData

Design:
- Position: fixed top, full width, z-index: 100
- Default state: fully transparent background
- Scrolled state (after 80px): background rgba(5,8,16,0.85) + backdrop-filter: blur(20px) + bottom border 1px solid #1e2535
- Transition: all 0.4s ease
- Use Framer Motion: animate navbar background change with motion.nav

Left side:
- Logo: first name in white + last name in accent color (#00d4ff)
- Font: Syne, font-weight 800, font-size 1.4rem
- Animate in: fadeIn from top on page load

Right side (desktop):
- Nav links: About | Skills | Experience | Projects | Contact
- Each link uses react-scroll's Link component for smooth scroll
- Font: DM Sans, 0.85rem, uppercase, letter-spacing 0.1em, color: muted
- Hover: color changes to white, underline slides in from left (CSS ::after pseudo-element)
- Active section link: accent color (#00d4ff), detected via useActiveSection hook
- "Download Resume" button: outlined, accent border, hover → fills with accent color
- Links to the resume file in public folder

Mobile (below 768px):
- Show hamburger icon (react-icons: RiMenuLine / RiCloseLine)
- Clicking opens full-screen overlay menu with staggered link animations (Framer Motion)
- Background: rgba(5,8,16,0.97) + backdrop-filter: blur(20px)
- Links animate in from left one by one with 0.1s stagger delay

━━━━━━━━━━━━━━━━━━━━
HERO (Hero.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: name, jobTitle, summary from resumeData

Background effects (all pure CSS, no library):
1. Animated dot grid: CSS background-image with radial-gradient dots, masked with radial-gradient so dots fade at edges
2. Two floating glow orbs: position absolute, border-radius 50%, background radial-gradient with accent colors, filter: blur(80px), CSS keyframe animation (drift — slowly moves in opposite directions, 12–15s infinite alternate)
3. CSS noise texture overlay via body::before

Layout: min-height 100vh, flex center, text-align center, padding 8rem 2rem

Content (animate each element with Framer Motion staggerContainer + fadeUp variants):
1. Small tag badge (animate first, delay 0.2s):
   - Text: "Available for Opportunities"
   - Style: tiny font, uppercase, letter-spacing, accent color, border: 1px solid rgba(0,212,255,0.3), border-radius 100px, padding 0.4rem 1.2rem

2. Full name H1 (animate, delay 0.4s):
   - Font: Syne, font-weight 800
   - Font-size: clamp(3rem, 8vw, 6rem)
   - Last name: gradient text effect (background: linear-gradient(135deg, #00d4ff, #7c3aed), -webkit-background-clip: text, -webkit-text-fill-color: transparent)

3. Animated typing subtitle (delay 0.6s):
   - Use react-type-animation to cycle through job titles from resumeData
   - Example sequence: "Backend Developer", 2000, "API Architect", 2000, "System Designer", 2000
   - Font-size: 1.2–1.4rem, color: muted, font-weight 300

4. Short tagline (delay 0.8s):
   - One specific line generated from resume summary
   - NOT "I am passionate about technology"
   - Write it like: "I build the systems that never break when it matters most."
   - Color: muted, font-size 1rem

5. Two CTA buttons (delay 1s):
   - "View My Work" → filled accent, scrolls to #projects
   - "Download Resume" → outlined, links to resume file
   - Hover: translateY(-3px) + accent glow box-shadow
   - Framer Motion whileHover and whileTap on each button

6. Social icon links (delay 1.2s):
   - GitHub, LinkedIn, Email icons from react-icons
   - Small, muted color, hover → accent color + scale(1.2)
   - From resumeData contact info

7. Scroll down indicator (absolute bottom center):
   - Small text "scroll" + animated vertical line
   - Line animates: height pulses from 0 to 50px and back, gradient from accent to transparent
   - CSS keyframe animation, infinite loop

━━━━━━━━━━━━━━━━━━━━
ABOUT (About.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: summary, workExperience, skills, projects from resumeData

Section heading pattern (use this exact pattern for ALL sections):
- Small label: uppercase, accent color, letter-spacing 0.2em, font-size 0.8rem
- Main heading: Syne font, large, white
- Accent underline bar: 60px wide, 3px tall, accent color, border-radius 2px, margin-top 0.5rem
- Animate heading with fadeUp variant

Layout: two-column grid on desktop (1fr 1fr), stacked on mobile

Left column (slideLeft variant):
- Avatar circle: 180px, gradient border (2px, linear-gradient from accent to accent2)
- Inside: initials from name, Syne font, 2.5rem, gradient text
- Below avatar: 3 status pills with dot indicators:
  → Green dot + "Open to Work"
  → Blue dot + city/location from resumeData
  → Purple dot + "Available for Freelance"

Right column (slideRight variant):
- 2–3 paragraphs from resume summary, rewritten to sound like a real developer talking to a peer
- No buzzwords, no filler, specific and honest
- Below paragraphs: 3 animated stat cards in a row using react-countup:
  → Years of Experience (calculate: current year minus earliest job start year)
  → Projects Built (count from resumeData.projects)
  → Technologies (count all skills from resumeData.skills)
- Each stat card: large number in accent color (CountUp animates on scroll into view), label below, card background #111827, border #1e2535, hover: border-color accent, translateY(-4px)

━━━━━━━━━━━━━━━━━━━━
SKILLS (Skills.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: skills (grouped by category) from resumeData

Categories: Languages | Frameworks | Databases | DevOps & Cloud | Tools

Tab switcher:
- Horizontal tabs, one per category
- Active tab: accent background, white text, border-radius 8px
- Inactive: transparent, muted text
- Framer Motion AnimatePresence on tab content — slides new content in from right, exits to left

Skills grid (changes per tab):
- 4–5 columns desktop, 2–3 mobile, gap 1rem
- Each skill card:
  → Devicon CDN icon (https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg) — fallback to react-icons
  → Skill name below icon
  → Card: background #111827, border 1px solid #1e2535
  → Hover: border-color accent, box-shadow 0 0 20px rgba(0,212,255,0.1), scale(1.05)
  → Use react-tilt for 3D tilt effect on hover
- Cards animate in with staggerContainer + scaleIn variants when tab changes

Progress indicators (optional, if feasible):
- Below skill name: thin progress bar showing proficiency level (set levels in resumeData: beginner/intermediate/expert)
- Bar fills with accent color on scroll into view using Framer Motion

━━━━━━━━━━━━━━━━━━━━
EXPERIENCE (Experience.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: workExperience array from resumeData

Layout: vertical timeline, full width

Timeline structure:
- Single vertical line running down left side: 2px wide, gradient from accent to accent2, position absolute
- Line animates: height grows from 0 to 100% on scroll using Framer Motion (scaleY from 0 to 1, transformOrigin: top)
- Each job entry positioned to the right of the line

Each experience card (slideRight variant, staggered):
- Dot on timeline: 14px circle, accent color, border 3px solid bg, position absolute on line
- Dot pulses: CSS animation, box-shadow pulses from 0 to rgba(0,212,255,0.4) 2x 4px, 2s infinite
- Card: background #111827, border 1px solid #1e2535, border-radius 12px, padding 1.5rem
- Top row: Role title (bold, white, 1.1rem) | Duration badge (muted, small, accent border, border-radius 100px)
- Second row: Company name (accent color) | Location (muted, with location icon)
- Divider: 1px solid #1e2535
- Bullet points: 3–5 from resumeData, each with small accent arrow (→) instead of bullet
- Bottom: tech tags used in that role — small pills, accent color border, font-size 0.75rem
- Hover: border-color accent, translateX(8px)
- Most recent job at top

━━━━━━━━━━━━━━━━━━━━
PROJECTS (Projects.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: projects array from resumeData

Filter bar at top:
- "All" tab + one tab per unique tech category (derive from project tags)
- Active: accent filled, inactive: outlined
- Framer Motion AnimatePresence handles card exit/enter animation when filter changes (layout animation with motion.div layout prop)

Projects grid: 3 columns desktop, 2 tablet, 1 mobile

Each project card (Framer Motion cardHover variant):
- Use react-tilt for 3D tilt on hover (max 10 degrees)
- Background: #111827, border: 1px solid #1e2535, border-radius: 14px, padding: 1.5rem
- Top: category tag (small, accent background at 15% opacity, accent text color)
- Accent line: 3px tall, full card width, gradient accent to accent2, border-radius top only
- Project name: Syne font, 1.1rem, bold, white
- Description: 2–3 lines, muted color, DM Sans
- Tech stack: small rounded pills, muted border, muted text, gap 0.5rem, flex-wrap
- Bottom row: GitHub icon button + Live Demo icon button (if URL exists in resumeData)
  → Icon buttons: transparent bg, muted color, hover → accent color + scale(1.1)
- Hover: border-color: rgba(0,212,255,0.4), box-shadow: 0 20px 60px rgba(0,212,255,0.1)
- Cards animate out/in with Framer Motion layout animations on filter change

If fewer than 3 projects in resume:
Generate realistic backend projects based on their actual tech skills. Name them specifically.
For example if they know Node.js + PostgreSQL → "RESTful E-commerce API with JWT Auth"

━━━━━━━━━━━━━━━━━━━━
EDUCATION (Education.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: education array from resumeData

Layout: horizontal card grid (2 columns desktop, 1 mobile)

Each education card (scaleIn variant, staggered):
- Background: #111827, border: 1px solid #1e2535, border-radius: 14px, padding: 1.5rem
- Top-right corner: large faded graduation cap icon (react-icons: PiGraduationCap), color accent at 10% opacity, font-size 5rem, position absolute
- Degree name: Syne font, bold, white, 1.1rem
- Institution: accent color, font-weight 500
- Year range: muted color with calendar icon
- CGPA / percentage badge: small pill, accent border, accent text
- Any achievements or honors: bullet list below with accent dot
- Hover: border-color accent, translateY(-6px)

Certifications subsection (if in resume):
- Simple horizontal scroll list of cert cards
- Each: cert name + issuer + year + badge icon
- Small, compact, one row

━━━━━━━━━━━━━━━━━━━━
CONTACT (Contact.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: contact object from resumeData

Section heading: "Let's Build Something" — NOT "Get In Touch"
Subtext: specific line about what kind of work you are open to (derive from resume context)

Layout: two-column grid (form left, info right), stacked on mobile

Left — Contact Form (slideLeft variant):
Fields: Name | Email | Subject | Message (textarea 5 rows)
Field style:
- Background: #111827, border: 1px solid #1e2535
- Focus: border-color accent, box-shadow: 0 0 0 3px rgba(0,212,255,0.1)
- Transition: all 0.3s ease
- Label floats up on focus (floating label effect)

Submit button:
- Full width, background accent, color #050810, font-weight 600
- Hover: background accent2, translateY(-2px), box-shadow accent glow
- Framer Motion whileHover and whileTap

On submit:
- Client-side validation: show inline error messages in red if fields empty or email invalid
- Valid: open mailto: link with form data pre-filled

Right — Contact Info cards (slideRight variant, staggered):
Each card: Email | LinkedIn | GitHub | Phone (if in resumeData)
Card style:
- Background: #111827, border: 1px solid #1e2535, border-radius: 10px, padding: 1rem
- Left: icon in accent color inside 40px circle (accent bg at 15% opacity)
- Right: label (muted, small) + value (white, clickable link)
- Hover: border-color accent, translateX(6px)

Below cards:
- Availability badge: green glowing dot + "Available for full-time & freelance" text
- Dot animation: CSS keyframe, box-shadow pulses from green to transparent, 2s infinite

━━━━━━━━━━━━━━━━━━━━
FOOTER (Footer.jsx)
━━━━━━━━━━━━━━━━━━━━
Data: name, contact links from resumeData

Layout: 3-column grid + bottom bar
Background: #0d1117, border-top: 1px solid #1e2535

Column 1: Name (Syne, bold) + condensed tagline from summary
Column 2: Quick nav links (same as navbar, react-scroll)
Column 3: Social icons (GitHub, LinkedIn, Email, Twitter if in resume) — hover accent color + scale

Bottom bar:
- Left: "© 2025 [Name]. Built with React.js"
- Year: dynamic via new Date().getFullYear()
- Right: "Designed & Developed with ♥"
- Divider: 1px solid #1e2535 above bottom bar

═══════════════════════════════════════════════════════════
STEP 8 — SPECIAL EFFECTS & POLISH
═══════════════════════════════════════════════════════════

1. CURSOR GLOW EFFECT:
Add a large soft radial gradient div that follows the mouse cursor globally.
- Position: fixed, 400px x 400px circle, pointer-events: none, z-index: 0
- Background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)
- Tracks mouse position via window.addEventListener('mousemove') in App.jsx
- Smooth follow with CSS transition: 0.1s or requestAnimationFrame lerp
- Creates premium "cursor aura" effect visible across all sections

2. PAGE LOAD ANIMATION:
- On first load: full-screen overlay (#050810) slides up and disappears after 0.8s
- Reveals the hero content with a smooth Framer Motion AnimatePresence
- Use Framer Motion's initial, animate, exit props

3. SECTION TRANSITIONS:
- Every section: Framer Motion whileInView triggers animation
- viewport: { once: true, amount: 0.15 }
- All sections use staggerContainer so child elements animate in sequence

4. PARALLAX HERO ELEMENTS:
- Hero orbs move slightly on mouse move (opposite directions, gentle parallax)
- Track mouse position in Hero component, apply transform: translate() to orbs
- Max movement: ±20px, smooth with CSS transition 0.3s

5. NAVBAR SCROLL PROGRESS BAR:
- Thin 2px line at very top of navbar (above everything)
- Width grows from 0% to 100% as user scrolls down the page
- Color: linear-gradient(to right, accent, accent2)
- Calculated via: scrollY / (documentHeight - viewportHeight) * 100

6. SMOOTH SECTION DIVIDERS:
- Between each section: subtle SVG wave or diagonal cut divider
- Alternating section backgrounds: #050810 and #0a0e1a to create rhythm

═══════════════════════════════════════════════════════════
STEP 9 — APP.jsx WIRING
═══════════════════════════════════════════════════════════

Import and render all components:

<CursorGlow />
<PageLoader />
<Navbar />
<main>
  <section id="hero"><Hero /></section>
  <section id="about"><About /></section>
  <section id="skills"><Skills /></section>
  <section id="experience"><Experience /></section>
  <section id="projects"><Projects /></section>
  <section id="education"><Education /></section>
  <section id="contact"><Contact /></section>
</main>
<Footer />

Each section: padding-top: 100px, padding-bottom: 100px (accounts for fixed navbar).
Alternating backgrounds via section:nth-child(odd) and section:nth-child(even).
Add scroll progress bar state in App.jsx and pass width to Navbar.

═══════════════════════════════════════════════════════════
STEP 10 — FINAL QUALITY CHECKLIST
═══════════════════════════════════════════════════════════

Before finishing, verify every item:

✅ All content sourced from resumeData.js — zero hardcoded strings in JSX
✅ Resume download button works (links to file in /public folder)
✅ Navbar active link highlighting works on scroll
✅ Navbar background blur activates after 80px scroll
✅ Scroll progress bar fills correctly
✅ Page loader appears and disappears on first load
✅ Cursor glow follows mouse smoothly
✅ Hero typing animation cycles through job titles
✅ Hero parallax orbs respond to mouse movement
✅ Timeline line animates height on scroll into view
✅ Timeline dots pulse correctly
✅ Skill tab switcher works — correct skills per category
✅ Skill cards have 3D tilt effect on hover
✅ Project filter tabs animate cards in/out correctly
✅ CountUp stat numbers animate when About section scrolls into view
✅ Contact form validates fields correctly
✅ Contact form mailto opens with pre-filled data
✅ Mobile hamburger menu opens/closes with animation
✅ Fully responsive at 320px, 768px, 1024px, 1440px
✅ No console errors
✅ All visible text sounds like a real developer wrote it
✅ No buzzwords: "passionate", "leverage", "cutting-edge", "synergy", "dynamic"

═══════════════════════════════════════════════════════════
ANTIGRAVITY EXECUTION INSTRUCTIONS
═══════════════════════════════════════════════════════════

Use Planning Mode — review the full plan before executing.

Build in this strict phase order:

Phase 1: Read resume → extract all data → write resumeData.js
Phase 2: Install all npm packages
Phase 3: Set up index.css + tailwind.config.js + variants.js + hooks
Phase 4: Navbar → Hero (confirm renders, animations work)
Phase 5: About → Skills → Experience (confirm each before next)
Phase 6: Projects → Education → Contact → Footer
Phase 7: Wire App.jsx → add CursorGlow, PageLoader, ScrollProgress
Phase 8: Run full quality checklist → fix all issues
Phase 9: Final test on multiple screen sizes

Commit after each phase is confirmed working.
If any resume data is missing, leave a TODO comment in resumeData.js — never invent data and no test in any external browser.