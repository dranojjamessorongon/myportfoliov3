# Dranoj Sorongon — Portfolio Site
## Implementation Guide

---

### 📁 Folder Structure

```
sorongon-portfolio/
├── index.html          ← Main HTML (one file, all sections)
├── styles.css          ← All styles + CSS variables
├── script.js           ← All JS: data, animations, logic
├── assets/
│   ├── profile.png     ← ✦ Your no-background profile photo (replace this)
│   └── logo.png        ← ✦ Your logo PNG (replace this)
└── README.md           ← This file
```

---

### 🚀 Local Setup

1. **Download / unzip** the folder.
2. Open `index.html` in any modern browser — no build step needed.
3. For live-reload during editing, use VS Code with the **Live Server** extension.

---

### ✦ How to Personalise

#### Replace Profile Photo
- Export a PNG of yourself with a **transparent background** (use remove.bg or Photoshop).
- Save it as `assets/profile.png` (exact filename matters).
- Recommended size: **340×420 px** or taller.

#### Replace Logo
- Save your logo as `assets/logo.png`.
- If no logo exists, the code automatically shows "DJS" text fallback.

#### Update Contact Info
In `script.js`, scroll to **Section 1 — CONFIG & CONTACT INFO**:
```js
const contactInfo = {
  email:    'your@email.com',
  whatsapp: '+639...',
  viber:    '+639...',
  location: 'Philippines',
  timezone: 'Philippine Standard Time (UTC+8)',
};
const MY_TZ_OFFSET = 8; // Your UTC offset
```

#### Add / Edit Skills
In `script.js`, **Section 2 — SKILLS DATA**, push a new object:
```js
{
  icon: '🛠️',
  title: 'Category Name',
  tags: ['Tag1', 'Tag2', 'Tag3'],
},
```

#### Add / Edit Work Experience
In `script.js`, **Section 3 — EXPERIENCE DATA**:
```js
{
  period: 'Jan 2020 – Dec 2023',
  role:    'Job Title',
  company: 'Company Name',
  bullets: [
    'Achievement / responsibility 1.',
    'Achievement / responsibility 2.',
  ],
},
```

#### Add / Edit Projects
In `script.js`, **Section 4 — PROJECTS DATA**:
```js
{
  title:   'Project Name',
  desc:    'One or two sentence description.',
  tags:    ['Tech1', 'Tech2'],
  liveUrl: 'https://your-live-link.com', // or '#'
  repoUrl: 'https://github.com/...',     // or '#'
},
```

#### Add / Edit Socials
In `script.js`, **Section 5 — SOCIALS DATA**:
```js
{
  icon:   '🐦',
  name:   'Twitter / X',
  handle: '@yourhandle',
  url:    'https://x.com/yourhandle',
},
```

---

### 🕐 How the Timezone Converter Works

When a visitor fills in the **Schedule a Call** block:
1. They pick a **date**, **time**, and their **timezone offset**.
2. JavaScript converts their input to UTC, then shifts it by `MY_TZ_OFFSET` (default: +8).
3. The resulting time in **Philippine Standard Time** is displayed instantly.

To change your timezone: update `MY_TZ_OFFSET` (integer, e.g. `-5` for EST) and `MY_TZ_LABEL` in `script.js`.

---

### 📬 Making the Contact Form Actually Send Emails

The form currently simulates a send. To make it real:

**Option A — Formspree (free, easiest)**
1. Sign up at formspree.io → create a form → get an endpoint URL.
2. In `script.js`, find the `// ✦ FORM ACTION` comment and replace the `setTimeout` block with:
```js
fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(form),
})
.then(r => r.ok ? setStatus('✓ Sent!', 'success') : setStatus('Error sending.', 'error'))
.catch(() => setStatus('Network error.', 'error'))
.finally(() => { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; });
```

**Option B — Netlify Forms**
Add `netlify` attribute to `<form id="contact-form" netlify>` and deploy to Netlify.

---

### 🌐 Deployment

**GitHub Pages (free)**
1. Push the folder to a GitHub repo (root = `index.html`).
2. Go to repo Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your site is live at `https://username.github.io/repo-name`.

**Netlify (free, fastest)**
1. Drag and drop the folder at netlify.com/drop.
2. Done — get an instant URL.

**Vercel**
1. `npm i -g vercel` then `vercel` inside the folder.
2. Follow prompts.

---

### 🎨 Changing the Color Theme

All colors are CSS variables at the top of `styles.css`:
```css
--accent:  #39ff14;   /* neon green — swap to any hex */
--accent2: #00e5ff;   /* cyan highlight */
--bg:      #050508;   /* page background */
```
Change `--accent` to retheme the entire site instantly.
