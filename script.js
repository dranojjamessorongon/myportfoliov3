/* ============================================================
   SORONGON PORTFOLIO — script.js
   Sections:
     1. CONFIG & CONTACT INFO     ← ✦ Edit here first
     2. SKILLS DATA               ← ✦ Add/remove skill categories
     3. EXPERIENCE DATA           ← ✦ Add/remove roles
     4. PROJECTS DATA             ← ✦ Add/remove projects
     5. SOCIALS DATA              ← ✦ Add/remove social links
     6. CANVAS PARTICLE BG
     7. SCROLL REVEAL
     8. STICKY HEADER
     9. COUNTER ANIMATION
    10. RENDER FUNCTIONS
    11. CONTACT FORM & TZ LOGIC
    12. MOBILE MENU
    13. INIT
   ============================================================ */

/* ============================================================
   1. CONFIG & CONTACT INFO
   ✦ EDIT these values to match your details
   ============================================================ */
const MY_TZ_OFFSET = 8;          // ✦ Your UTC offset (PHT = UTC+8)
const MY_TZ_LABEL  = 'Philippine Standard Time (UTC+8)';

const contactInfo = {
  email:    'dramessorongon@gmail.com',   // ✦ Your email
  whatsapp: '+639949850210',               // ✦ Format: +[country code][number]
  viber:    '+639949850210',               // ✦ Your Viber number
  location: 'Philippines',
  timezone: MY_TZ_LABEL,
};

/* ============================================================
   2. SKILLS DATA
   ✦ To add a category: push a new object to this array
   ✦ Format: { icon, title, tags: ['tag1', 'tag2', ...] }
   ============================================================ */
const skillsData = [
  {
    icon: '🌐',
    title: 'Networking',
    tags: ['TCP/IP', 'Subnetting', 'VLAN', 'DNS', 'Gateway', 'Cisco', 'Aruba', 'Huawei'],
  },
  {
    icon: '💻',
    title: 'Programming',
    tags: ['PHP', 'Python', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: '⚙️',
    title: 'Frameworks & Tools',
    tags: ['CodeIgniter', 'Bootstrap', 'Angular', 'VS Code'],
  },
  {
    icon: '☁️',
    title: 'Microsoft 365',
    tags: ['PowerApps', 'SharePoint', 'Power BI', 'MS Lists', 'Teams', 'OneDrive'],
  },
  {
    icon: '🖥️',
    title: 'Systems & OS',
    tags: ['Windows', 'Linux (learning)', 'OS Reimaging', 'Backup & Recovery', 'Symantec'],
  },
  {
    icon: '📡',
    title: 'IT Infrastructure',
    tags: ['CCTV / NVR', 'Remote Desktop', 'RDP', 'AnyDesk', 'Smart UPS', 'Hardware Repair'],
  },
];

/* ============================================================
   3. EXPERIENCE DATA
   ✦ To add a role: push a new object
   ✦ Format: { period, role, company, bullets: ['...'] }
   ============================================================ */
const experienceData = [
  {
    period: 'May 2024 – Present',
    role:    'IT Support Engineer',
    company: 'New Panay Agri-Ventures Development, Inc.',
    bullets: [
      'Achieved 98% system uptime across Windows, standalone apps, and server environments via proactive OS updates, reimaging, and mirror backups.',
      'Executed VLAN configuration and switch management across Cisco, Aruba, and Huawei hardware for multi-site networks.',
      'Administered inventory of 500+ CCTV cameras and 200+ workstations using Microsoft Lists, Power BI, SharePoint, and PowerApps — fully automated tracking.',
      'Delivered 10+ daily remote support sessions via RDP, AnyDesk, and Quick Assist across geographically distributed branch offices.',
      'Monitored real-time health of up to 10 NVR servers and associated surveillance feeds using Smart PSS.',
      'Configured network parameters for servers, mini PCs, NVRs, access points, UPS units, and CCTV infrastructure.',
    ],
  },
  // ✦ ADD MORE ROLES BELOW — copy the object above and edit
];

/* ============================================================
   4. PROJECTS DATA
   ✦ To add a project: push a new object
   ✦ Set liveUrl / repoUrl to '#' if not applicable
   ============================================================ */
const projectsData = [
  {
    title:   'IT Asset Tracker',
    desc:    'Internal inventory system for 700+ devices (CCTV, laptops, switches). Built on Microsoft Lists + PowerApps with Power BI dashboards for real-time reporting.',
    tags:    ['PowerApps', 'SharePoint', 'Power BI', 'MS Lists'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title:   'Network Monitoring Dashboard',
    desc:    'Real-time health monitoring setup for 10 NVR servers and CCTV feeds, reducing incident response time and improving surveillance uptime.',
    tags:    ['Smart PSS', 'CCTV', 'NVR', 'Networking'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title:   'Multi-Branch Remote Support System',
    desc:    'Structured remote support workflow using RDP, AnyDesk, and Quick Assist — scaled to 10+ daily sessions with consistent SLA performance.',
    tags:    ['RDP', 'AnyDesk', 'Windows', 'IT Support'],
    liveUrl: '#',
    repoUrl: '#',
  },
  // ✦ ADD MORE PROJECTS HERE
];

/* ============================================================
   5. SOCIALS DATA
   ✦ To add a platform: push a new object
   ✦ icon: any emoji or short text
   ============================================================ */
const socialsData = [
  {
    icon:   '💼',
    name:   'LinkedIn',
    handle: 'Dranoj Sorongon',
    url:    'https://linkedin.com/',   // ✦ Replace with your LinkedIn URL
  },
  {
    icon:   '🐙',
    name:   'GitHub',
    handle: '@dranoj-sorongon',
    url:    'https://github.com/',     // ✦ Replace with your GitHub URL
  },
  {
    icon:   '📘',
    name:   'Facebook',
    handle: 'Dranoj Sorongon',
    url:    'https://facebook.com/',   // ✦ Replace with your Facebook URL
  },
  // ✦ ADD MORE SOCIALS HERE — e.g. Twitter/X, Telegram, Portfolio links
];

/* ============================================================
   6. CANVAS PARTICLE BACKGROUND
   ============================================================ */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const COUNT = 90;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.2 + 0.2;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.a  = Math.random() * 0.5 + 0.1;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
      // alternately accent green or cyan
      this.color = Math.random() > 0.6 ? '0,229,255' : '57,255,20';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }

    draw() {
      const progress = this.life / this.maxLife;
      const alpha = this.a * Math.sin(progress * Math.PI);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  // Draw grid lines
  function drawGrid() {
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    const step = 80;
    for (let x = 0; x < W; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  loop();
})();

/* ============================================================
   7. SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
function initReveal() {
  // Hero elements
  document.querySelectorAll('.reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.disconnect(); }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  });

  // Section blocks
  document.querySelectorAll('.reveal-section').forEach(section => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); obs.disconnect(); }
      });
    }, { threshold: 0.08 });
    obs.observe(section);
  });
}

/* ============================================================
   8. STICKY HEADER
   ============================================================ */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
}

/* ============================================================
   9. COUNTER ANIMATION
   ============================================================ */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();

      const tick = () => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    obs.observe(el);
  });
}

/* ============================================================
   10. RENDER FUNCTIONS
   ============================================================ */

/** Render skills */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = skillsData.map(cat => `
    <div class="skill-category">
      <div class="skill-cat-icon">${cat.icon}</div>
      <div class="skill-cat-title">${cat.title}</div>
      <div class="skill-tags">
        ${cat.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/** Render experience timeline */
function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = experienceData.map(job => `
    <div class="timeline-item">
      <div class="tl-period">${job.period}</div>
      <div class="tl-role">${job.role}</div>
      <div class="tl-company">${job.company}</div>
      <ul class="tl-bullets">
        ${job.bullets.map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/** Render projects */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projectsData.map((p, i) => `
    <div class="project-card">
      <div class="project-number">${String(i + 1).padStart(2, '0')}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
      </div>
      <div class="project-links">
        ${p.liveUrl !== '#' ? `<a href="${p.liveUrl}" class="project-link" target="_blank" rel="noopener">Live →</a>` : ''}
        ${p.repoUrl !== '#' ? `<a href="${p.repoUrl}" class="project-link" target="_blank" rel="noopener">Repo →</a>` : ''}
      </div>
    </div>
  `).join('');
}

/** Render socials */
function renderSocials() {
  const container = document.getElementById('socials-container');
  if (!container) return;

  container.innerHTML = socialsData.map(s => `
    <a href="${s.url}" class="social-card" target="_blank" rel="noopener">
      <div class="social-icon">${s.icon}</div>
      <div>
        <div class="social-name">${s.name}</div>
        <div class="social-handle">${s.handle}</div>
      </div>
    </a>
  `).join('');
}

/** Render contact details */
function renderContactDetails() {
  const set = (id, icon, label, href) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `
      <span class="contact-icon">${icon}</span>
      ${href
        ? `<a href="${href}">${label}</a>`
        : `<span>${label}</span>`
      }
    `;
  };

  set('contact-email-el',    '✉️', contactInfo.email,    `mailto:${contactInfo.email}`);
  set('contact-whatsapp-el', '💬', `WhatsApp: ${contactInfo.whatsapp}`, `https://wa.me/${contactInfo.whatsapp.replace(/\D/g,'')}`);
  set('contact-viber-el',    '📱', `Viber: ${contactInfo.viber}`,       `viber://chat?number=${contactInfo.viber.replace(/\D/g,'')}`);
  set('contact-location-el', '📍', contactInfo.location, null);
  set('contact-tz-el',       '🕐', contactInfo.timezone, null);
}

/* ============================================================
   11. CONTACT FORM + TIMEZONE CONVERTER
   ============================================================ */
function initContactForm() {
  // Populate timezone selector
  const tzSelect = document.getElementById('cf-tz');
  if (tzSelect) {
    // Common offsets
    const zones = [
      { label: 'UTC-12:00 (Baker Island)',        offset: -12 },
      { label: 'UTC-11:00 (Samoa)',               offset: -11 },
      { label: 'UTC-10:00 (Hawaii)',              offset: -10 },
      { label: 'UTC-09:00 (Alaska)',              offset: -9  },
      { label: 'UTC-08:00 (Pacific — US)',        offset: -8  },
      { label: 'UTC-07:00 (Mountain — US)',       offset: -7  },
      { label: 'UTC-06:00 (Central — US)',        offset: -6  },
      { label: 'UTC-05:00 (Eastern — US)',        offset: -5  },
      { label: 'UTC-04:00 (Atlantic)',            offset: -4  },
      { label: 'UTC-03:00 (Brasília)',            offset: -3  },
      { label: 'UTC-02:00',                       offset: -2  },
      { label: 'UTC-01:00 (Azores)',              offset: -1  },
      { label: 'UTC+00:00 (London / GMT)',        offset:  0  },
      { label: 'UTC+01:00 (Central Europe)',      offset:  1  },
      { label: 'UTC+02:00 (Eastern Europe)',      offset:  2  },
      { label: 'UTC+03:00 (Moscow / Riyadh)',     offset:  3  },
      { label: 'UTC+04:00 (Dubai)',               offset:  4  },
      { label: 'UTC+05:00 (Pakistan)',            offset:  5  },
      { label: 'UTC+05:30 (India)',               offset:  5.5},
      { label: 'UTC+06:00 (Bangladesh)',          offset:  6  },
      { label: 'UTC+07:00 (Bangkok / Jakarta)',   offset:  7  },
      { label: 'UTC+08:00 (Philippines / SGP)',   offset:  8  },
      { label: 'UTC+09:00 (Japan / Korea)',       offset:  9  },
      { label: 'UTC+10:00 (Sydney)',              offset:  10 },
      { label: 'UTC+11:00 (Solomon Islands)',     offset:  11 },
      { label: 'UTC+12:00 (Auckland)',            offset:  12 },
    ];

    // Try to pre-select user's local offset
    const localOffset = -(new Date().getTimezoneOffset() / 60);

    zones.forEach(z => {
      const opt = document.createElement('option');
      opt.value = z.offset;
      opt.textContent = z.label;
      if (z.offset === localOffset) opt.selected = true;
      tzSelect.appendChild(opt);
    });
  }

  // TZ conversion on change
  function updateTZResult() {
    const dateVal = document.getElementById('cf-date').value;
    const timeVal = document.getElementById('cf-time').value;
    const tzOffset = parseFloat(document.getElementById('cf-tz').value);
    const resultEl = document.getElementById('tz-result');

    if (!dateVal || !timeVal || isNaN(tzOffset)) {
      if (resultEl) resultEl.textContent = '';
      return;
    }

    try {
      // Parse as UTC then shift
      const [y, m, d] = dateVal.split('-').map(Number);
      const [hh, mm] = timeVal.split(':').map(Number);

      // Build UTC timestamp from user's local input
      const userTotalMinutes = hh * 60 + mm - tzOffset * 60;
      const utcDate = new Date(Date.UTC(y, m - 1, d, 0, userTotalMinutes));

      // Convert to MY timezone
      const myTotalMinutes = utcDate.getUTCHours() * 60 + utcDate.getUTCMinutes() + MY_TZ_OFFSET * 60;
      const myDate = new Date(utcDate);
      myDate.setUTCMinutes(myDate.getUTCMinutes() + MY_TZ_OFFSET * 60);

      const fmtDate = myDate.toLocaleDateString('en-PH', {
        timeZone: 'UTC',
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
      });
      const fmtTime = myDate.toLocaleTimeString('en-PH', {
        timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: true
      });

      if (resultEl) {
        resultEl.textContent = `📍 My time: ${fmtDate}, ${fmtTime} (${MY_TZ_LABEL})`;
      }
    } catch (e) {
      if (resultEl) resultEl.textContent = 'Unable to convert time.';
    }
  }

  ['cf-date','cf-time','cf-tz'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateTZResult);
  });

  // Form submit
  const form    = document.getElementById('contact-form');
  const status  = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        setStatus('Please fill in all required fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus('Please enter a valid email address.', 'error');
        return;
      }

      // ✦ FORM ACTION: Replace with your form handler, Formspree, or Netlify Forms
      // Example Formspree: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form) })
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      // Simulate send (replace with real endpoint)
      fetch('https://formspree.io/f/xvzywvpp', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(form),
})
.then(r => r.ok ? setStatus('✓ Sent!', 'success') : setStatus('Error sending.', 'error'))
.catch(() => setStatus('Network error.', 'error'))
.finally(() => { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; });
    });
  }

  function setStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className = `form-status ${type}`;
  }
}

/* ============================================================
   12. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ============================================================
   13. INIT — runs on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const fy = document.getElementById('footer-year');
  if (fy) fy.textContent = new Date().getFullYear();

  // Render dynamic content
  renderSkills();
  renderExperience();
  renderProjects();
  renderSocials();
  renderContactDetails();

  // Behaviours
  initStickyHeader();
  initReveal();
  animateCounters();
  initContactForm();
  initMobileMenu();

  // Trigger hero reveals immediately
  setTimeout(() => {
    document.querySelectorAll('.hero-section .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});
