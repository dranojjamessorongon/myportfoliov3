/* ============================================================
   SORONGON PORTFOLIO — script.js
   Sections:
     1. CONFIG & CONTACT INFO     <- Edit here first
     2. SKILLS DATA               <- Add/remove skill categories
     3. EXPERIENCE DATA           <- Add/remove roles
     4. PROJECTS DATA             <- Add/remove projects
     5. SOCIALS DATA              <- Add/remove social links
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
   Edit these values to match your details.
   ============================================================ */
const MY_TZ_OFFSET = 8;          // Your UTC offset (PHT = UTC+8)
const MY_TZ_LABEL  = 'Philippine Standard Time (UTC+8)';

const contactInfo = {
  email:    'dramessorongon@gmail.com',   // Your email
  whatsapp: '+639949850210',               // Format: +[country code][number]
  viber:    '+639949850210',               // Your Viber number
  location: 'Philippines',
  timezone: MY_TZ_LABEL,
};

/* ============================================================
   2. SKILLS DATA
   INSTRUCTION 7: Each category now supports an optional `background` image.
   The image is applied to the top header area of the skill card as a partial overlay.
   Text remains readable via a CSS gradient overlay.

   HOW TO ADD A NEW CATEGORY:
     Push a new object into this array:
     {
       icon:       'assets/icons/placeholder.png',  // path to your custom icon PNG
       iconAlt:    'Category label',                // screen-reader alt text
       title:      'Category Name',
       background: 'assets/backgrounds/your-image.jpg', // optional background image
       tags:       ['Tag1', 'Tag2', 'Tag3'],
     }

   HOW TO CHANGE THE BACKGROUND IMAGE:
     - Add your image to the assets/backgrounds/ folder.
     - Update the `background` property value to match the file path.
     - Example: background: 'assets/backgrounds/automation.jpg'
     - Remove the `background` property entirely to use the default dark card.

   INSTRUCTION 6: icon property is now a file path (not an emoji).
     Replace assets/icons/placeholder.png with your own icon PNG files.
   ============================================================ */
const skillsData = [
  /* ---- CATEGORY: Automation ---- */
  {
    icon:       'assets/icons/placeholder.png', /* ICON REPLACE: use an automation/workflow icon */
    iconAlt:    'Automation icon',
    title:      'Automation',
    background: 'assets/backgrounds/automation.jpg', /* BACKGROUND REPLACE: add assets/backgrounds/automation.jpg */
    tags:       ['n8n', 'Workflow Design', 'API Integration', 'Webhooks', 'Triggers'],
  },
  /* ---- CATEGORY: Networking ---- */
  {
    icon:       'assets/icons/placeholder.png', /* ICON REPLACE: use a network/globe icon */
    iconAlt:    'Networking icon',
    title:      'Networking',
    background: 'assets/backgrounds/networking.jpg', /* BACKGROUND REPLACE: add assets/backgrounds/networking.jpg */
    tags:       ['TCP/IP', 'Subnetting', 'VLAN', 'DNS', 'Gateway', 'Cisco', 'Aruba', 'Huawei'],
  },
  /* ---- CATEGORY: Programming ---- */
  {
    icon:       'assets/icons/placeholder.png', /* ICON REPLACE: use a code/terminal icon */
    iconAlt:    'Programming icon',
    title:      'Programming',
    background: 'assets/backgrounds/programming.jpg', /* BACKGROUND REPLACE */
    tags:       ['PHP', 'Python', 'HTML', 'CSS', 'JavaScript'],
  },
  /* ---- CATEGORY: Frameworks & Tools ---- */
  {
    icon:       'assets/icons/placeholder.png', /* ICON REPLACE: use a tools/wrench icon */
    iconAlt:    'Frameworks icon',
    title:      'Frameworks & Tools',
    /* No background set — card uses default dark surface */
    tags:       ['CodeIgniter', 'Bootstrap', 'Angular', 'VS Code'],
  },
  /* ---- CATEGORY: Microsoft 365 ---- */
  {
    icon:       'assets/icons/placeholder.png', /* ICON REPLACE: use a cloud/Microsoft icon */
    iconAlt:    'Microsoft 365 icon',
    title:      'Microsoft 365',
    background: 'assets/backgrounds/microsoft365.jpg', /* BACKGROUND REPLACE */
    tags:       ['PowerApps', 'SharePoint', 'Power BI', 'MS Lists', 'Teams', 'OneDrive'],
  },
  /* ---- CATEGORY: Systems & OS ---- */
  {
    icon:       'assets/icons/placeholder.png', /* ICON REPLACE: use a monitor/OS icon */
    iconAlt:    'Systems icon',
    title:      'Systems & OS',
    /* No background set */
    tags:       ['Windows', 'Linux (learning)', 'OS Reimaging', 'Backup & Recovery', 'Symantec'],
  },
  /* ---- CATEGORY: IT Infrastructure ---- */
  {
    icon:       'assets/icons/placeholder.png', /* ICON REPLACE: use a server/hardware icon */
    iconAlt:    'IT Infrastructure icon',
    title:      'IT Infrastructure',
    /* No background set */
    tags:       ['CCTV / NVR', 'Remote Desktop', 'RDP', 'AnyDesk', 'Smart UPS', 'Hardware Repair'],
  },
];

/* ============================================================
   3. EXPERIENCE DATA
   HOW TO ADD A ROLE:
     Push a new object to this array:
     {
       period:  'Jan 2020 – Dec 2023',
       role:    'Job Title',
       company: 'Company Name',
       bullets: [
         'Achievement or responsibility 1.',
         'Achievement or responsibility 2.',
       ],
     }
   ============================================================ */
const experienceData = [
  {
    period:  'May 2024 – Present',
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
  /* ADD MORE ROLES BELOW — copy the object above and edit */
];

/* ============================================================
   4. PROJECTS DATA
   HOW TO ADD A PROJECT:
     Push a new object to this array:
     {
       title:   'Project Name',
       desc:    'One or two sentence description.',
       tags:    ['Tech1', 'Tech2'],
       liveUrl: 'https://your-live-link.com', // set to '#' if not applicable
       repoUrl: 'https://github.com/...',     // set to '#' if not applicable
     }
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
  /* ADD MORE PROJECTS HERE — copy any object above and edit */
];

/* ============================================================
   5. SOCIALS DATA
   INSTRUCTION 6: icon is now a file path, not an emoji.
   HOW TO ADD A SOCIAL LINK:
     Push a new object to this array:
     {
       icon:    'assets/icons/placeholder.png', // ICON REPLACE: path to your platform icon PNG
       iconAlt: 'Platform name icon',
       name:    'Platform Name',
       handle:  '@yourhandle',
       url:     'https://platform.com/yourprofile',
     }
   ============================================================ */
const socialsData = [
  {
    icon:    'assets/icons/placeholder.png', /* ICON REPLACE: use LinkedIn brand icon */
    iconAlt: 'LinkedIn icon',
    name:    'LinkedIn',
    handle:  'Dranoj Sorongon',
    url:     'https://linkedin.com/',   // Replace with your LinkedIn URL
  },
  {
    icon:    'assets/icons/placeholder.png', /* ICON REPLACE: use GitHub brand icon */
    iconAlt: 'GitHub icon',
    name:    'GitHub',
    handle:  '@dranoj-sorongon',
    url:     'https://github.com/',     // Replace with your GitHub URL
  },
  {
    icon:    'assets/icons/placeholder.png', /* ICON REPLACE: use Facebook brand icon */
    iconAlt: 'Facebook icon',
    name:    'Facebook',
    handle:  'Dranoj Sorongon',
    url:     'https://facebook.com/',   // Replace with your Facebook URL
  },
  /* ADD MORE SOCIALS HERE — e.g. Twitter/X, Telegram, Portfolio links */
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
      /* alternately accent green or cyan */
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

  /* Draw grid lines */
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
  /* Hero elements */
  document.querySelectorAll('.reveal').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.disconnect(); }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  });

  /* Section blocks */
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
   Each function reads its corresponding data array above and
   generates the HTML for that section. To change content,
   edit the data arrays — never edit the HTML output directly.
   ============================================================ */

/**
 * Render skills categories.
 * INSTRUCTION 7: Each card now has a .skill-cat-header with an optional background image.
 * INSTRUCTION 6: Icon is rendered as <img class="icon-lg"> instead of emoji text.
 *
 * HOW TO CHANGE A CARD'S BACKGROUND IMAGE:
 *   Update the `background` property in skillsData[n] above.
 *   The image will be applied inline via style attribute here.
 */
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = skillsData.map(cat => {
    /* Build inline style for background image if provided */
    /* HOW TO CHANGE: set cat.background to your image path in skillsData */
    const bgStyle = cat.background
      ? `background-image: url('${cat.background}');`
      : '';

    return `
      <div class="skill-category">
        <!-- Card header: holds icon + title over optional background image -->
        <!-- ICON REPLACE: swap cat.icon path in skillsData to use custom icons -->
        <div class="skill-cat-header" style="${bgStyle}">
          <div class="skill-cat-icon">
            <img src="${cat.icon}" alt="${cat.iconAlt || cat.title}" class="icon-lg" />
          </div>
          <div class="skill-cat-title">${cat.title}</div>
        </div>
        <!-- Tag pills — edit cat.tags in skillsData to add/remove -->
        <div class="skill-tags">
          ${cat.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Render experience timeline.
 * HOW TO ADD A ROLE: push a new object to experienceData above.
 */
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

/**
 * Render projects grid.
 * HOW TO ADD A PROJECT: push a new object to projectsData above.
 */
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
        ${p.liveUrl !== '#' ? `<a href="${p.liveUrl}" class="project-link" target="_blank" rel="noopener">Live &rarr;</a>` : ''}
        ${p.repoUrl !== '#' ? `<a href="${p.repoUrl}" class="project-link" target="_blank" rel="noopener">Repo &rarr;</a>` : ''}
      </div>
    </div>
  `).join('');
}

/**
 * Render socials grid.
 * INSTRUCTION 6: icon is rendered as <img class="icon-lg"> instead of emoji text.
 * HOW TO ADD A SOCIAL: push a new object to socialsData above.
 */
function renderSocials() {
  const container = document.getElementById('socials-container');
  if (!container) return;

  container.innerHTML = socialsData.map(s => `
    <a href="${s.url}" class="social-card" target="_blank" rel="noopener">
      <!-- ICON REPLACE: update s.icon path in socialsData to use custom platform icons -->
      <div class="social-icon">
        <img src="${s.icon}" alt="${s.iconAlt || s.name}" class="icon-lg" />
      </div>
      <div>
        <div class="social-name">${s.name}</div>
        <div class="social-handle">${s.handle}</div>
      </div>
    </a>
  `).join('');
}

/**
 * Render contact details.
 * INSTRUCTION 6: All contact icons rendered as <img class="icon"> tags.
 * ICON REPLACE comments indicate which icon each slot needs.
 */
function renderContactDetails() {
  const set = (id, iconSrc, iconAlt, label, href) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `
      <span class="contact-icon">
        <!-- ICON REPLACE: swap src to a custom icon PNG for each contact type -->
        <img src="${iconSrc}" alt="${iconAlt}" class="icon" />
      </span>
      ${href
        ? `<a href="${href}">${label}</a>`
        : `<span>${label}</span>`
      }
    `;
  };

  /* ICON REPLACE: replace each placeholder path with the appropriate icon */
  set('contact-email-el',    'assets/icons/placeholder.png', 'Email icon',    contactInfo.email,                     `mailto:${contactInfo.email}`);
  set('contact-whatsapp-el', 'assets/icons/placeholder.png', 'WhatsApp icon', `WhatsApp: ${contactInfo.whatsapp}`,   `https://wa.me/${contactInfo.whatsapp.replace(/\D/g,'')}`);
  set('contact-viber-el',    'assets/icons/placeholder.png', 'Viber icon',    `Viber: ${contactInfo.viber}`,         `viber://chat?number=${contactInfo.viber.replace(/\D/g,'')}`);
  set('contact-location-el', 'assets/icons/placeholder.png', 'Location icon', contactInfo.location,                  null);
  set('contact-tz-el',       'assets/icons/placeholder.png', 'Timezone icon', contactInfo.timezone,                  null);
}

/* ============================================================
   11. CONTACT FORM + TIMEZONE CONVERTER
   ============================================================ */
function initContactForm() {
  /* Populate timezone selector */
  const tzSelect = document.getElementById('cf-tz');
  if (tzSelect) {
    const zones = [
      { label: 'UTC-12:00 (Baker Island)',        offset: -12 },
      { label: 'UTC-11:00 (Samoa)',               offset: -11 },
      { label: 'UTC-10:00 (Hawaii)',              offset: -10 },
      { label: 'UTC-09:00 (Alaska)',              offset: -9  },
      { label: 'UTC-08:00 (Pacific - US)',        offset: -8  },
      { label: 'UTC-07:00 (Mountain - US)',       offset: -7  },
      { label: 'UTC-06:00 (Central - US)',        offset: -6  },
      { label: 'UTC-05:00 (Eastern - US)',        offset: -5  },
      { label: 'UTC-04:00 (Atlantic)',            offset: -4  },
      { label: 'UTC-03:00 (Brasilia)',            offset: -3  },
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

    /* Pre-select the visitor's local offset */
    const localOffset = -(new Date().getTimezoneOffset() / 60);

    zones.forEach(z => {
      const opt = document.createElement('option');
      opt.value = z.offset;
      opt.textContent = z.label;
      if (z.offset === localOffset) opt.selected = true;
      tzSelect.appendChild(opt);
    });
  }

  /* TZ conversion on input change */
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
      const [y, m, d] = dateVal.split('-').map(Number);
      const [hh, mm] = timeVal.split(':').map(Number);

      /* Build UTC timestamp from user's local input */
      const userTotalMinutes = hh * 60 + mm - tzOffset * 60;
      const utcDate = new Date(Date.UTC(y, m - 1, d, 0, userTotalMinutes));

      /* Convert to MY timezone */
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
        resultEl.textContent = `My time: ${fmtDate}, ${fmtTime} (${MY_TZ_LABEL})`;
      }
    } catch (e) {
      if (resultEl) resultEl.textContent = 'Unable to convert time.';
    }
  }

  ['cf-date','cf-time','cf-tz'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateTZResult);
  });

  /* Form submit handler */
  const form      = document.getElementById('contact-form');
  const status    = document.getElementById('form-status');
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

      /* FORM ACTION: Replace with your form handler, Formspree, or Netlify Forms.
         Example Formspree:
           fetch('https://formspree.io/f/YOUR_ID', {
             method: 'POST',
             headers: { 'Accept': 'application/json' },
             body: new FormData(form),
           })
           .then(r => r.ok ? setStatus('Sent!', 'success') : setStatus('Error sending.', 'error'))
           .catch(() => setStatus('Network error.', 'error'))
           .finally(() => { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; });
      */
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      /* Simulate send — replace this block with real endpoint above */
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        setStatus("Message sent! I'll get back to you within 24 hours.", 'success');
        document.getElementById('tz-result').textContent = '';
      }, 1500);
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

  /* Close on link click */
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ============================================================
   13. INIT — runs on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* Footer year */
  const fy = document.getElementById('footer-year');
  if (fy) fy.textContent = new Date().getFullYear();

  /* Render dynamic content from data arrays above */
  renderSkills();
  renderExperience();
  renderProjects();
  renderSocials();
  renderContactDetails();

  /* Behaviours */
  initStickyHeader();
  initReveal();
  animateCounters();
  initContactForm();
  initMobileMenu();

  /* Trigger hero reveals immediately on load */
  setTimeout(() => {
    document.querySelectorAll('.hero-section .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});
