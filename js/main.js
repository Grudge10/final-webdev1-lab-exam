

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function escapeHTML(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }


  const ICONS = {
    github:   '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM19 19h-3v-4.7c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.5V19h-3v-9h2.9v1.2h.04c.4-.8 1.4-1.5 2.8-1.5 3 0 3.6 2 3.6 4.5V19z"/></svg>',
    twitter:  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 1.2h3.7l-8 9.1 9.4 12.5h-7.4l-5.8-7.6-6.6 7.6H.4l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.6h2L6.5 3.3H4.4l13.2 17.5z"/></svg>',
    dribbble: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm7.9 5.5a10 10 0 0 1 2.3 6.3c-.3-.1-3.5-.7-6.7-.3-.1-.3-.2-.5-.4-.8 3.2-1.3 4.6-3.2 4.8-5.2zM12 2.2c2.5 0 4.8.9 6.5 2.5-.2.3-1.4 2-4.5 3.2-1.4-2.6-3-4.7-3.2-5C11.2 2.4 11.6 2.2 12 2.2zM8.4 3.9c.2.3 1.7 2.4 3.2 4.9C7.7 9.9 4.2 9.9 3.8 9.9 4.4 7.2 6.1 4.9 8.4 3.9zM3.5 12v-.3c.4 0 4.6.1 8.9-1.3.3.5.5 1 .8 1.5-3.7 1-6.7 4-7.3 7.6A9.8 9.8 0 0 1 3.5 12zm8.5 9.8c-2.4 0-4.5-.8-6.2-2.2.4-2.9 3-5.4 6.2-6.5 1 2.6 1.5 4.8 1.6 5.4-1 .6-2 .9-3 .9zm4.4-1.9c-.1-.6-.5-2.6-1.4-5.1 3-.5 5.6.3 5.9.4-.4 2.1-1.6 4-3.4 5.2-.4-.2-.7-.3-1.1-.5z"/></svg>',
    facebook:  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C20.32 1.35 19.65.94 18.86.63c-.76-.3-1.64-.5-2.91-.56C14.67.01 14.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-10.4a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/></svg>'
  };


  async function loadData() {
    try {
      const res = await fetch('data.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to load data.json:', err);

      const grid = $('#projectGrid');
      if (grid) {
        grid.innerHTML =
          '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);">' +
          '⚠ Could not load content from <code>data.json</code>. ' +
          'If you opened this file directly with <code>file://</code>, please run it through a local web server ' +
          '(e.g. <code>npx serve</code> or VS Code Live Server) — browsers block fetch() on local files.</p>';
      }
      return null;
    }
  }




  function renderHero(profile) {

    $('#heroNameBadge').textContent = profile.name.toUpperCase();



    const roleShort = profile.roleTag || (profile.role || '')
      .replace(/aspiring\s+/i, '')
      .replace(/developer/i, '')
      .trim()
      .toUpperCase() || 'DEVELOPER';
    $('#heroRoleTag').innerHTML = `
      <span class="handle handle--tl"></span>
      <span class="handle handle--tr"></span>
      <span class="handle handle--bl"></span>
      <span class="handle handle--br"></span>
      ${escapeHTML(roleShort)}
    `;


    $('#heroYear').textContent = new Date().getFullYear();



    const taglineEl = $('#heroTagline');
    if (profile.taglineHTML) {
      taglineEl.innerHTML = `<strong>${escapeHTML(profile.role)}.</strong> ${profile.taglineHTML}`;
    } else {
      taglineEl.textContent = `${profile.role}. ${profile.tagline}`;
    }


    document.title = `${profile.name} — ${profile.role}`;


    const socials = $('#heroSocials');
    socials.innerHTML = profile.socials.map(s => `
      <li>
        <a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer"
           aria-label="${escapeHTML(s.name)}" title="${escapeHTML(s.name)}">
          ${ICONS[s.icon] || ''}
        </a>
      </li>
    `).join('');
  }


  function renderAbout(about) {
    $('#aboutBackground').textContent = about.background;

    const interests = $('#aboutInterests');
    interests.innerHTML = about.interests
      .map(i => `<li>${escapeHTML(i)}</li>`).join('');

    const highlights = $('#aboutHighlights');
    highlights.innerHTML = about.highlights
      .map(h => `
        <li>
          <span class="stat-value">${escapeHTML(h.value)}</span>
          <span class="stat-label">${escapeHTML(h.label)}</span>
        </li>
      `).join('');
  }


  function renderSkills(skills) {
    const techList = $('#technicalSkills');
    const softList = $('#softSkills');

    const technical = skills.filter(s => s.category === 'technical');
    const soft      = skills.filter(s => s.category === 'soft');


    techList.innerHTML = technical.map(s => `
      <li class="skill-item">
        <div class="skill-meta">
          <span>${escapeHTML(s.name)}</span>
          <span class="skill-percent">${s.level}%</span>
        </div>
        <div class="skill-bar">
          <div class="skill-bar-fill" data-level="${s.level}" style="width:0%"></div>
        </div>
      </li>
    `).join('');


    softList.innerHTML = soft.map(s => `
      <li class="skill-tag">${escapeHTML(s.name)}</li>
    `).join('');
  }


  function renderProjects(projects) {
    const grid = $('#projectGrid');
    grid.innerHTML = projects.map(p => `
      <article class="project-card reveal">
        <div class="project-image">
          <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)} preview" loading="lazy" />
          ${p.featured ? '<span class="project-badge">Featured</span>' : ''}
        </div>
        <div class="project-body">
          <h3 class="project-title">${escapeHTML(p.title)}</h3>
          <p class="project-desc">${escapeHTML(p.description)}</p>
          <ul class="project-tags">
            ${p.tags.map(t => `<li>${escapeHTML(t)}</li>`).join('')}
          </ul>
          <a href="${escapeHTML(p.link || '#')}" class="project-link"
             ${p.link && p.link !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
             View Project
          </a>
        </div>
      </article>
    `).join('');
  }


  function renderTimeline(timeline) {
    const list = $('#timelineList');
    list.innerHTML = timeline.map(t => `
      <li class="timeline-item">
        <div class="timeline-card reveal">
          <span class="timeline-period">${escapeHTML(t.period)}</span>
          <span class="timeline-type">${escapeHTML(t.type)}</span>
          <h3 class="timeline-title">${escapeHTML(t.title)}</h3>
          <p class="timeline-org">${escapeHTML(t.organization)}</p>
          <p class="timeline-desc">${escapeHTML(t.description)}</p>
        </div>
      </li>
    `).join('');
  }


  function renderContact(profile) {
    const info = $('#contactInfo');
    info.innerHTML = `
      <li>
        <span class="contact-icon" aria-hidden="true">@</span>
        <div>
          <span class="contact-label">Email</span>
          <a class="contact-value" href="mailto:${escapeHTML(profile.email)}">${escapeHTML(profile.email)}</a>
        </div>
      </li>
      <li>
        <span class="contact-icon" aria-hidden="true">☎</span>
        <div>
          <span class="contact-label">Phone</span>
          <a class="contact-value" href="tel:${escapeHTML(profile.phone.replace(/\s+/g, ''))}">${escapeHTML(profile.phone)}</a>
        </div>
      </li>
      <li>
        <span class="contact-icon" aria-hidden="true">⌖</span>
        <div>
          <span class="contact-label">Location</span>
          <span class="contact-value">${escapeHTML(profile.location)}</span>
        </div>
      </li>
      <li>
        <span class="contact-icon" aria-hidden="true">●</span>
        <div>
          <span class="contact-label">Availability</span>
          <span class="contact-value">${escapeHTML(profile.availability)}</span>
        </div>
      </li>
    `;


    const footerSocials = $('#footerSocials');
    footerSocials.innerHTML = profile.socials.map(s => `
      <li>
        <a href="${escapeHTML(s.url)}" target="_blank" rel="noopener noreferrer"
           aria-label="${escapeHTML(s.name)}" title="${escapeHTML(s.name)}">
          ${ICONS[s.icon] || ''}
        </a>
      </li>
    `).join('');


    $('#year').textContent = new Date().getFullYear();
  }




  function initNavToggle() {
    const toggle = $('#navToggle');
    const nav    = $('#primaryNav');

    if (!toggle || !nav) return;

    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const openNav = () => {
      nav.classList.add('is-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', () => {
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });


    $$('.nav-link', nav).forEach(link =>
      link.addEventListener('click', closeNav)
    );


    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
    });


    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeNav();
    });
  }




  function initBackToTop() {
    const btn  = $('#backToTop');
    if (!btn) return;

    const onScroll = () => {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
    onScroll();
  }


  function initActiveNav() {
    const sections = $$('main section[id]');
    const links    = $$('.nav-link');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach(l =>
              l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`)
            );
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(s => observer.observe(s));
  }


  function initRevealOnScroll() {
    const revealEls = $$('.reveal');
    if (!revealEls.length) return;


    if (!('IntersectionObserver' in window)) {
      document.documentElement.classList.add('no-observer');
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));


    setTimeout(() => {
      const stillHidden = $$('.reveal:not(.is-visible)');
      if (stillHidden.length) {
        document.documentElement.classList.add('no-observer');
      }
    }, 2500);
  }


  function initSkillBarAnimation() {
    const bars = $$('.skill-bar-fill');
    if (!bars.length) return;


    if (!('IntersectionObserver' in window)) {

      bars.forEach(b => {
        b.style.width = `${b.dataset.level || 0}%`;
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const level = entry.target.dataset.level || 0;
            entry.target.style.width = `${level}%`;
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );
    bars.forEach(b => observer.observe(b));


    setTimeout(() => {
      const empty = $$('.skill-bar-fill').filter(b => !b.style.width || b.style.width === '0%');
      empty.forEach(b => {
        b.style.width = `${b.dataset.level || 0}%`;
      });
    }, 3000);
  }


  function initContactForm() {
    const form = $('#contactForm');
    const note = $('#formNote');
    if (!form || !note) return;

    form.addEventListener('submit', e => {
      e.preventDefault();


      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        note.style.color = 'var(--c-orange)';
        note.textContent = 'Please fill in your name, email, and message.';
        return;
      }

      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOK) {
        note.style.color = 'var(--c-orange)';
        note.textContent = 'That email doesn\'t look right — please check it.';
        return;
      }


      note.style.color = 'var(--c-green)';
      note.textContent = `Thanks, ${name}! Your message has been recorded locally. (This is a front-end demo — no email was actually sent.)`;
      form.reset();


      setTimeout(() => { note.textContent = ''; }, 6000);
    });
  }


  async function init() {



    document.documentElement.classList.add('js-enabled');



    initNavToggle();
    initBackToTop();
    initActiveNav();
    initContactForm();


    const data = await loadData();
    if (!data) return;

    renderHero(data.profile);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderProjects(data.projects);
    renderTimeline(data.timeline);
    renderContact(data.profile);



    initRevealOnScroll();
    initSkillBarAnimation();
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
