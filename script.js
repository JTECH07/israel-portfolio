    // ---- NAVBAR SCROLL ----
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 60);
      backTop.classList.toggle('show', y > 400);
    });

    // ---- BURGER MENU ----
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        burgerBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // ---- SCROLL REVEAL ----
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('active'), 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    // ---- SKILL BARS ----
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.dataset.width;
          setTimeout(() => { target.style.width = width + '%'; }, 300);
          skillObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    skillFills.forEach(fill => skillObserver.observe(fill));

    // ---- CONTACT FORM ----
    function sendForm() {
      const prenom = document.getElementById('f-prenom').value.trim();
      const email = document.getElementById('f-email').value.trim();
      const msg = document.getElementById('f-msg').value.trim();
      if (!prenom || !email || !msg) {
        alert('Veuillez remplir au moins le prénom, l\'email et le message.');
        return;
      }
      // Simulate send
      const btn = document.querySelector('.contact-form-wrap .btn-primary');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        btn.style.background = 'var(--green-light)';
        document.getElementById('formSuccess').style.display = 'block';
        // Reset
        ['f-prenom','f-nom','f-email','f-objet','f-msg'].forEach(id => { document.getElementById(id).value = ''; });
      }, 1800);
    }

    // ---- SMOOTH ACTIVE NAV LINKS ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
      });
    });

    // ---- COUNTER ANIMATION ----
    function animateCounter(el, end, duration) {
      let start = 0;
      const step = end / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) { el.textContent = end + '+'; clearInterval(timer); }
        else { el.textContent = Math.floor(start) + '+'; }
      }, 16);
    }
    const heroObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.hero-stat .num').forEach(el => {
          const val = parseInt(el.textContent);
          if (!isNaN(val)) animateCounter(el, val, 1500);
        });
        heroObserver.disconnect();
      }
    });
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);