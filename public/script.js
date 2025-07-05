 // Side vine scroll animation with anime.js
    (function() {
      const vine = document.querySelector('.side-vine-path');
      const branch1 = document.querySelector('.side-vine-branch');
      const branch2 = document.querySelector('.side-vine-branch2');
      const branch3 = document.querySelector('.side-vine-branch3');
      const branch4 = document.querySelector('.side-vine-branch4');
      const leaf1 = document.querySelector('.side-vine-leaf');
      const leaf2 = document.querySelector('.side-vine-leaf2');
      const leaf3 = document.querySelector('.side-vine-leaf3');
      const leaf4 = document.querySelector('.side-vine-leaf4');
      const leaf5 = document.querySelector('.side-vine-leaf5');
      const canopy = document.getElementById('sideTreeCanopy');
      if (!vine) return;

      const vineLength = vine.getTotalLength();
      vine.style.strokeDasharray = vineLength;
      vine.style.strokeDashoffset = vineLength;

      const branch1Length = branch1.getTotalLength();
      branch1.style.strokeDasharray = branch1Length;
      branch1.style.strokeDashoffset = branch1Length;

      const branch2Length = branch2.getTotalLength();
      branch2.style.strokeDasharray = branch2Length;
      branch2.style.strokeDashoffset = branch2Length;

      const branch3Length = branch3.getTotalLength();
      branch3.style.strokeDasharray = branch3Length;
      branch3.style.strokeDashoffset = branch3Length;

      const branch4Length = branch4.getTotalLength();
      branch4.style.strokeDasharray = branch4Length;
      branch4.style.strokeDashoffset = branch4Length;

      function animateVineOnScroll() {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollTop / (docHeight * 0.6), 1);
        const offset = vineLength * (1 - progress);

        anime({
          targets: vine,
          strokeDashoffset: offset,
          duration: 400,
          easing: 'linear'
        });

        // Branches grow at different scroll points
        anime({
          targets: branch1,
          strokeDashoffset: branch1Length * (1 - Math.max(0, (progress - 0.18) / 0.22)), // 18%-40%
          duration: 400,
          easing: 'linear'
        });
        anime({
          targets: branch2,
          strokeDashoffset: branch2Length * (1 - Math.max(0, (progress - 0.32) / 0.18)), // 32%-50%
          duration: 400,
          easing: 'linear'
        });
        anime({
          targets: branch3,
          strokeDashoffset: branch3Length * (1 - Math.max(0, (progress - 0.48) / 0.18)), // 48%-66%
          duration: 400,
          easing: 'linear'
        });
        anime({
          targets: branch4,
          strokeDashoffset: branch4Length * (1 - Math.max(0, (progress - 0.62) / 0.18)), // 62%-80%
          duration: 400,
          easing: 'linear'
        });

        // Leaves fade in as their parent branch grows
        if (progress > 0.22) leaf1.classList.add('visible'); else leaf1.classList.remove('visible');
        if (progress > 0.38) leaf2.classList.add('visible'); else leaf2.classList.remove('visible');
        if (progress > 0.54) leaf3.classList.add('visible'); else leaf3.classList.remove('visible');
        if (progress > 0.70) leaf4.classList.add('visible'); else leaf4.classList.remove('visible');
        if (progress > 0.90) leaf5.classList.add('visible'); else leaf5.classList.remove('visible');

        // Show canopy when vine is fully grown
        if (progress >= 1) {
          canopy.classList.add('visible');
        } else {
          canopy.classList.remove('visible');
        }
      }

      window.addEventListener('scroll', animateVineOnScroll);
      window.addEventListener('resize', animateVineOnScroll);
      animateVineOnScroll();
    })();
 // Back to Top Button logic
(function() {
  const btn = document.getElementById('backToTopBtn');
  function toggleBtn() {
    if (window.scrollY > 200) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', toggleBtn);
  window.addEventListener('resize', toggleBtn);
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  // Initialize on load
  toggleBtn();
})();

  // Show thank you message if redirected with ?thanks=1
  if (window.location.search.includes('thanks=1')) {
    document.getElementById('thankYouMessage').style.display = 'block';
    // Optionally, hide the form after submission:
    document.querySelector('.contact-form').style.display = 'none';
    // Optionally, scroll to the message
    document.getElementById('thankYouMessage').scrollIntoView({behavior: 'smooth'});
  }
// Weather toggle logic
(function() {
  const sunlight = document.querySelector('.sunlight-rays');
  const rain = document.querySelector('.rain-effect');
  const btn = document.getElementById('weatherToggleBtn');
  const icon = document.getElementById('weatherIcon');
  const label = document.getElementById('weatherLabel');
  let isSunlight = true;

  // Rain drop generator
  function makeRain() {
    if (!rain) return;
    rain.innerHTML = '';
    for (let i = 0; i < 48; i++) {
  const drop = document.createElement('div');
  drop.className = 'rain-drop';
  drop.style.left = Math.random() * 100 + 'vw';
  drop.style.animationDelay = (Math.random() * 1.2) + 's';
  drop.style.animationDuration = (1.2 + Math.random() * 0.8) + 's';
  drop.style.opacity = 0.5 + Math.random() * 0.3;
  rain.appendChild(drop);
}

  }

  makeRain();

  btn.addEventListener('click', function() {
    isSunlight = !isSunlight;
    if (isSunlight) {
      sunlight.style.display = '';
      rain.style.display = 'none';
      icon.textContent = '☀️';
      label.textContent = 'Sunlight';
    } else {
      sunlight.style.display = 'none';
      rain.style.display = '';
      icon.textContent = '🌧️';
      label.textContent = 'Rain';
      makeRain();
    }
  });
})();
// Hamburger menu logic
(function() {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('main-nav');
  if (!navToggle || !nav) return;
  navToggle.addEventListener('click', function() {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 700) {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
// Password Strength Checker
const pwInput = document.getElementById('pw');
const pwStrength = document.getElementById('pw-strength');
const pwBar = document.getElementById('pw-strength-bar');
if (pwInput && pwStrength && pwBar) {
  pwInput.addEventListener('input', function() {
    const val = this.value;
    let strength = 'Weak';
    let percent = 33;
    let labelClass = '';
    if (val.length > 8 && /[A-Z]/.test(val) && /\d/.test(val) && /[^A-Za-z0-9]/.test(val)) {
      strength = 'Strong';
      percent = 100;
      labelClass = 'strong';
    } else if (val.length > 5 && (/[A-Z]/.test(val) || /\d/.test(val))) {
      strength = 'Medium';
      percent = 66;
      labelClass = 'medium';
    }
    pwStrength.textContent = 'Strength: ' + strength;
    pwStrength.className = 'pw-strength-label ' + labelClass;
    pwBar.style.width = percent + '%';
  });
}

