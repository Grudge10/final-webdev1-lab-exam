(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  const ICONS = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>',
    facebook: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/></svg>',
    instagram: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/></svg>',
    twitter: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>'
  };

  function buildSocialLink(s) {
    return '<li><a href="' + escapeHTML(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHTML(s.name) + '" title="' + escapeHTML(s.name) + '">' + (ICONS[s.icon] || '') + '</a></li>';
  }

  async function loadData() {
    try {
      const response = await fetch('data/data.json');
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return await response.json();
    } catch (err) {
      console.error('Could not load data.json:', err);
      const grid = $('#projectGrid');
      if (grid) {
        grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">Could not load <code>data.json</code>. Please run the site through a local web server (for example <code>python3 -m http.server</code>) because browsers block fetch() on file:// URLs.</p>';
      }
      return null;
    }
  }

  function renderHero(profile) {
    $('#heroNameBadge').textContent = profile.name.toUpperCase();

    const roleTag = profile.roleTag || 'DEVELOPER';
    $('#heroRoleTag').innerHTML =
      '<span class="handle handle--tl"></span>' +
      '<span class="handle handle--tr"></span>' +
      '<span class="handle handle--bl"></span>' +
      '<span class="handle handle--br"></span>' +
      escapeHTML(roleTag);

    $('#heroYear').textContent = new Date().getFullYear();

    const taglineEl = $('#heroTagline');
    if (profile.taglineHTML) {
      taglineEl.innerHTML = '<strong>' + escapeHTML(profile.role) + '.</strong> ' + profile.taglineHTML;
    } else {
      taglineEl.textContent = profile.role + '. ' + profile.tagline;
    }

    document.title = profile.name + ' — ' + profile.role;
    $('#heroSocials').innerHTML = profile.socials.map(buildSocialLink).join('');
  }

  function renderAbout(about) {
    $('#aboutBackground').textContent = about.background;
    $('#aboutInterests').innerHTML = about.interests.map(i => '<li>' + escapeHTML(i) + '</li>').join('');
    $('#aboutHighlights').innerHTML = about.highlights.map(h =>
      '<li><span class="stat-value">' + escapeHTML(h.value) + '</span><span class="stat-label">' + escapeHTML(h.label) + '</span></li>'
    ).join('');
  }

  function renderSkills(skills) {
    const tech = skills.filter(s => s.category === 'technical');
    const soft = skills.filter(s => s.category === 'soft');

    $('#technicalSkills').innerHTML = tech.map(s =>
      '<li class="skill-item">' +
      '<div class="skill-meta"><span>' + escapeHTML(s.name) + '</span><span class="skill-percent">' + s.level + '%</span></div>' +
      '<div class="skill-bar"><div class="skill-bar-fill" data-level="' + s.level + '"></div></div>' +
      '</li>'
    ).join('');

    $('#softSkills').innerHTML = soft.map(s => '<li class="skill-tag">' + escapeHTML(s.name) + '</li>').join('');
  }

  function renderProjects(projects) {
    const categories = ['All'].concat(
      Array.from(new Set(projects.map(p => p.category).filter(Boolean)))
    );

    $('#projectFilters').innerHTML = categories.map((cat, i) =>
      '<button class="filter-btn' + (i === 0 ? ' is-active' : '') + '" data-filter="' + escapeHTML(cat) + '" role="tab" aria-selected="' + (i === 0) + '">' + escapeHTML(cat) + '</button>'
    ).join('');

    $('#projectGrid').innerHTML = projects.map(p =>
      '<article class="project-card reveal" data-category="' + escapeHTML(p.category || '') + '">' +
      '<div class="project-image">' +
      '<img src="' + escapeHTML(p.image) + '" alt="' + escapeHTML(p.title) + ' preview" loading="lazy">' +
      (p.featured ? '<span class="project-badge">Featured</span>' : '') +
      '</div>' +
      '<div class="project-body">' +
      '<h3 class="project-title">' + escapeHTML(p.title) + '</h3>' +
      '<p class="project-desc">' + escapeHTML(p.description) + '</p>' +
      '<ul class="project-tags">' + p.tags.map(t => '<li>' + escapeHTML(t) + '</li>').join('') + '</ul>' +
      '<a href="' + escapeHTML(p.link || '#') + '" class="project-link"' + (p.link && p.link !== '#' ? ' target="_blank" rel="noopener noreferrer"' : '') + '>View Project</a>' +
      '</div>' +
      '</article>'
    ).join('');

    const filterBar = $('#projectFilters');
    filterBar.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', filterBar).forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      $$('.project-card').forEach(card => {
        const show = filter === 'All' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  }

  function renderTimeline(timeline) {
    $('#timelineList').innerHTML = timeline.map(t =>
      '<li class="timeline-item">' +
      '<div class="timeline-card reveal">' +
      '<span class="timeline-period">' + escapeHTML(t.period) + '</span>' +
      '<span class="timeline-type">' + escapeHTML(t.type) + '</span>' +
      '<h3 class="timeline-title">' + escapeHTML(t.title) + '</h3>' +
      '<p class="timeline-org">' + escapeHTML(t.organization) + '</p>' +
      '<p class="timeline-desc">' + escapeHTML(t.description) + '</p>' +
      (t.link ? '<a href="' + escapeHTML(t.link) + '" class="timeline-link" target="_blank" rel="noopener noreferrer">View Repository →</a>' : '') +
      '</div>' +
      '</li>'
    ).join('');
  }

  function renderContact(profile) {
    const items = [
      ['<svg viewBox="0 0 16 16" fill="currentColor"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg>', 'Email', '<a class="contact-value" href="mailto:' + escapeHTML(profile.email) + '">' + escapeHTML(profile.email) + '</a>'],
      ['<svg viewBox="0 0 16 16" fill="currentColor"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>', 'Phone', '<a class="contact-value" href="tel:' + escapeHTML(profile.phone.replace(/\s+/g, '')) + '">' + escapeHTML(profile.phone) + '</a>'],
      ['<svg viewBox="0 0 16 16" fill="currentColor"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>', 'Location', '<span class="contact-value">' + escapeHTML(profile.location) + '</span>'],
      ['<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg>', 'Availability', '<span class="contact-value">' + escapeHTML(profile.availability) + '</span>']
    ];

    $('#contactInfo').innerHTML = items.map(item =>
      '<li><span class="contact-icon" aria-hidden="true">' + item[0] + '</span><div><span class="contact-label">' + item[1] + '</span>' + item[2] + '</div></li>'
    ).join('');

    $('#footerSocials').innerHTML = profile.socials.map(buildSocialLink).join('');
    $('#year').textContent = new Date().getFullYear();
  }

  function initNavToggle() {
    const toggle = $('#navToggle');
    const nav = $('#primaryNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    $$('.nav-link', nav).forEach(link => {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
      }
    });
  }

  function initBackToTop() {
    const btn = $('#backToTop');
    if (!btn) return;

    function onScroll() {
      btn.classList.toggle('is-visible', window.scrollY > 600);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    onScroll();
  }

  function initActiveNav() {
    const sections = $$('main section[id]');
    const links = $$('.nav-link');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  function initRevealOnScroll() {
    const revealEls = $$('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => observer.observe(el));

    setTimeout(function () {
      $$('.reveal:not(.is-visible)').forEach(el => el.classList.add('is-visible'));
    }, 2500);
  }

  function initSkillBars() {
    const bars = $$('.skill-bar-fill');
    if (!bars.length) return;

    if (!('IntersectionObserver' in window)) {
      bars.forEach(bar => { bar.style.width = (bar.dataset.level || 0) + '%'; });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const level = entry.target.dataset.level || 0;
          entry.target.style.width = level + '%';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

    bars.forEach(bar => observer.observe(bar));

    setTimeout(function () {
      bars.forEach(function (bar) {
        if (!bar.style.width || bar.style.width === '0%') {
          bar.style.width = (bar.dataset.level || 0) + '%';
        }
      });
    }, 3000);
  }

  function initContactForm() {
    const form = $('#contactForm');
    const note = $('#formNote');
    if (!form || !note) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      function showError(text) {
        note.style.color = 'var(--c-orange)';
        note.textContent = text;
      }

      function showSuccess(text) {
        note.style.color = 'var(--c-green)';
        note.textContent = text;
      }

      if (!name || !email || !message) {
        return showError('Please fill in your name, email, and message.');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return showError("That email doesn't look right — please check it.");
      }

      showSuccess('Thanks, ' + name + '! Your message has been recorded locally. (This is a front-end demo — no email was actually sent.)');
      form.reset();

      setTimeout(function () { note.textContent = ''; }, 6000);
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
    initSkillBars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
