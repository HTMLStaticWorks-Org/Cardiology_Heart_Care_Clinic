/**
 * CardioCare Core UI Utilities
 * Handles Light/Dark theme persistence, RTL/LTR direction & Arabic label support,
 * appointment booking modal, Three.js calm hero canvas, GSAP & AOS animations.
 */
(function (window, $) {
  'use strict';

  const STORAGE_KEYS = {
    THEME: 'cardiocare_pref_theme',
    DIR: 'cardiocare_pref_dir',
    DEMO_SESSION: 'cardiocare_demo_session',
    DEMO_APPOINTMENTS: 'cardiocare_demo_appointments',
    DEMO_MEDS: 'cardiocare_demo_meds',
    DEMO_MED_HISTORY: 'cardiocare_demo_med_history',
    DEMO_NOTIFS: 'cardiocare_demo_notifs',
    DEMO_PROFILE: 'cardiocare_demo_profile',
    DEMO_HISTORY_NOTES: 'cardiocare_demo_history_notes'
  };

  function readPref(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? val : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writePref(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      // Ignore storage quota / privacy-mode errors gracefully
    }
  }

  function readDemoJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(fallback));
    } catch (e) {
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  function writeDemoJSON(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      // Ignore gracefully
    }
  }

  /* Toast Notification */
  function showToast(message, type = 'success') {
    let wrap = document.getElementById('ccToastWrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'ccToastWrap';
      wrap.className = 'cc-toast-wrap';
      wrap.setAttribute('aria-live', 'polite');
      document.body.appendChild(wrap);
    }
    const toast = document.createElement('div');
    toast.className = `cc-toast ${type}`;
    toast.innerHTML = `
      <span class="flex-grow-1">${escapeHtml(message)}</span>
      <button type="button" class="btn-close btn-sm" aria-label="Close"></button>
    `;
    toast.querySelector('.btn-close').addEventListener('click', () => toast.remove());
    wrap.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 4800);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* Theme Management */
  function applyTheme(theme) {
    const resolved = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolved);
    writePref(STORAGE_KEYS.THEME, resolved);

    document.querySelectorAll('[data-cc-theme-toggle]').forEach((btn) => {
      const iconName = resolved === 'dark' ? 'sun' : 'moon';
      const label = resolved === 'dark' ? 'Light' : 'Dark';
      btn.setAttribute('aria-label', resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title', resolved === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const iconEl = btn.querySelector('.cc-theme-icon');
      const textEl = btn.querySelector('.cc-theme-label');
      if (iconEl) iconEl.setAttribute('data-lucide', iconName);
      if (textEl) textEl.textContent = label;
    });

    refreshIcons();
    window.dispatchEvent(new CustomEvent('cardiocare:themechange', { detail: { theme: resolved } }));
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* RTL / LTR Management + Arabic Dictionary Support */
  function applyDirection(dir) {
    const resolved = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', resolved);
    document.documentElement.setAttribute('lang', resolved === 'rtl' ? 'ar' : 'en');
    writePref(STORAGE_KEYS.DIR, resolved);

    const dict = (window.CARDIOCARE_DEMO && window.CARDIOCARE_DEMO.i18n)
      ? window.CARDIOCARE_DEMO.i18n[resolved === 'rtl' ? 'ar' : 'en']
      : null;

    if (dict) {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        if (!el.dataset.i18nOriginalHtml) {
          el.dataset.i18nOriginalHtml = el.innerHTML;
        }
        const key = el.getAttribute('data-i18n');
        if (resolved === 'ltr' && el.dataset.i18nOriginalHtml) {
          el.innerHTML = el.dataset.i18nOriginalHtml;
        } else if (dict[key]) {
          el.textContent = dict[key];
        }
      });
    }

    document.querySelectorAll('[data-cc-dir-toggle]').forEach((btn) => {
      const label = resolved === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', resolved === 'rtl' ? 'Switch layout to LTR (English)' : 'Switch layout to RTL (Arabic)');
      const textEl = btn.querySelector('.cc-dir-label');
      if (textEl) textEl.textContent = label;
    });

    // Update Bootstrap offcanvas placement if present
    const mobileDrawer = document.getElementById('ccMobileDrawer');
    if (mobileDrawer) {
      mobileDrawer.classList.remove('offcanvas-end', 'offcanvas-start');
      mobileDrawer.classList.add(resolved === 'rtl' ? 'offcanvas-start' : 'offcanvas-end');
    }

    refreshIcons();
    window.dispatchEvent(new CustomEvent('cardiocare:dirchange', { detail: { dir: resolved } }));
  }

  function toggleDirection() {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    applyDirection(current === 'rtl' ? 'ltr' : 'rtl');
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* Fallback SVG if any external photo ever fails offline */
  function installImageFallbacks() {
    const fallbackSvg = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
        <rect width="800" height="500" fill="#EDF2F4"/>
        <path d="M180 260 H310 L345 190 L385 320 L425 225 L450 260 H620" fill="none" stroke="#168C91" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="400" y="385" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="600" fill="#172B3A">CardioCare Clinical Preview</text>
      </svg>`
    );
    document.querySelectorAll('img').forEach((img) => {
      if (!img.dataset.ccFallbackBound) {
        img.dataset.ccFallbackBound = '1';
        img.addEventListener('error', function () {
          if (this.src !== fallbackSvg) {
            this.src = fallbackSvg;
          }
        });
      }
    });
  }

  /* Three.js Subtle Calm Cardiac Pulse Wave Background (Hero Only) */
  function initHeroThreeCanvas() {
    const canvas = document.getElementById('ccHeroThreeCanvas');
    if (!canvas || !window.THREE) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    try {
      const THREE = window.THREE;
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / Math.max(1, canvas.clientHeight), 0.1, 100);
      camera.position.z = 16;

      const count = 90;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 28;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x168C91,
        size: 0.16,
        transparent: true,
        opacity: 0.55
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      function resize() {
        const w = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
        const h = canvas.parentElement ? canvas.parentElement.clientHeight : 520;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(1, h);
        camera.updateProjectionMatrix();
      }
      resize();
      window.addEventListener('resize', resize);

      let frameId;
      function animate() {
        frameId = requestAnimationFrame(animate);
        points.rotation.y += 0.0008;
        points.rotation.x += 0.0003;
        renderer.render(scene, camera);
      }
      animate();
      window.addEventListener('beforeunload', () => cancelAnimationFrame(frameId));
    } catch (e) {
      // Gracefully skip WebGL if unavailable
    }
  }

  /* GSAP Hero Entrance & AOS Scroll Animations */
  function initAnimations() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion && window.gsap && document.querySelector('.cc-hero-animate')) {
      window.gsap.from('.cc-hero-animate', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      });
    }
    if (window.AOS) {
      window.AOS.init({
        duration: 650,
        once: true,
        offset: 50,
        disable: reducedMotion
      });
    }
  }

  /* Shared Appointment Booking Modal */
  function openBookingModal(prefill = {}) {
    const modalEl = document.getElementById('ccBookingModal');
    if (!modalEl || !window.bootstrap) return;

    const doctorSelect = modalEl.querySelector('#bkDoctor');
    const specSelect = modalEl.querySelector('#bkSpecialization');
    const typeSelect = modalEl.querySelector('#bkType');

    if (prefill.doctorId && doctorSelect) {
      doctorSelect.value = prefill.doctorId;
      const doc = (window.CARDIOCARE_DEMO.doctors || []).find((d) => d.id === prefill.doctorId);
      if (doc && specSelect) specSelect.value = doc.specialization;
    }
    if (prefill.serviceTitle && typeSelect) {
      for (let i = 0; i < typeSelect.options.length; i++) {
        if (typeSelect.options[i].value.toLowerCase().includes(prefill.serviceTitle.toLowerCase().split(' ')[0])) {
          typeSelect.selectedIndex = i;
          break;
        }
      }
    }

    const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }

  function initBookingModalForm() {
    const form = document.getElementById('ccPublicBookingForm');
    if (!form) return;

    const docSelect = form.querySelector('#bkDoctor');
    const specSelect = form.querySelector('#bkSpecialization');
    const dateInput = form.querySelector('#bkDate');

    if (dateInput) {
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      dateInput.min = tomorrow;
      if (!dateInput.value) dateInput.value = tomorrow;
    }

    if (docSelect && window.CARDIOCARE_DEMO) {
      docSelect.innerHTML = '<option value="">Choose a Cardiology Specialist...</option>' +
        window.CARDIOCARE_DEMO.doctors.map((d) =>
          `<option value="${d.id}" data-spec="${escapeHtml(d.specialization)}">${escapeHtml(d.name)} — ${escapeHtml(d.roleTitle)}</option>`
        ).join('');

      docSelect.addEventListener('change', function () {
        const selected = this.options[this.selectedIndex];
        const spec = selected ? selected.getAttribute('data-spec') : '';
        if (spec && specSelect) specSelect.value = spec;
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('#bkPatientName').value.trim();
      const phone = form.querySelector('#bkPhone').value.trim();
      const docId = docSelect.value;
      const spec = specSelect.value;
      const type = form.querySelector('#bkType').value;
      const date = dateInput.value;
      const slot = form.querySelector('#bkSlot').value;
      const reason = form.querySelector('#bkReason').value.trim();
      const errEl = document.getElementById('bkFormError');

      if (!name || name.length < 2) {
        errEl.textContent = 'Please enter your full name (at least 2 characters).';
        errEl.classList.remove('d-none');
        return;
      }
      if (!/^[+\d\s\-()]{7,20}$/.test(phone)) {
        errEl.textContent = 'Please provide a valid contact phone number.';
        errEl.classList.remove('d-none');
        return;
      }
      if (!docId || !date || !slot || !reason) {
        errEl.textContent = 'Please select a specialist, date, time slot, and brief reason for your visit.';
        errEl.classList.remove('d-none');
        return;
      }

      errEl.classList.add('d-none');
      const docObj = window.CARDIOCARE_DEMO.doctors.find((d) => d.id === docId);

      // Save to demo appointment list so it also reflects in Patient Dashboard demo!
      const list = readDemoJSON(STORAGE_KEYS.DEMO_APPOINTMENTS, window.CARDIOCARE_DEMO.demoAppointments);
      const newApt = {
        id: 'APT-DEMO-' + Math.floor(200 + Math.random() * 799),
        doctorId: docId,
        doctorName: docObj ? docObj.name : 'Selected Specialist (Demo)',
        specialization: spec || 'Cardiology',
        type: type,
        date: date,
        time: slot,
        reason: reason + ' (Demo Request)',
        contact: phone,
        status: 'Pending (demo)'
      };
      list.unshift(newApt);
      writeDemoJSON(STORAGE_KEYS.DEMO_APPOINTMENTS, list);

      const modalEl = document.getElementById('ccBookingModal');
      if (modalEl && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      }
      form.reset();
      showToast(`Demo appointment request (${newApt.id}) recorded for ${date} at ${slot}.`, 'success');
    });
  }

  /* Simulated AJAX Clinic Demo Metadata Load using jQuery $.ajax */
  function loadClinicConfigAjax() {
    if (!$ || !$.ajax) return;
    $.ajax({
      url: 'assets/data/clinic-demo.json',
      method: 'GET',
      dataType: 'json',
      timeout: 3000
    }).done(function (data) {
      if (data && data.availableSlots) {
        window.CARDIOCARE_AJAX_SLOTS = data.availableSlots;
      }
    }).fail(function () {
      // Graceful fallback when opened directly via file://
      window.CARDIOCARE_AJAX_SLOTS = ['09:00 AM', '10:15 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:45 PM'];
    });
  }

  /* Back To Top Floating Button Handler */
  function initBackToTop() {
    let btn = document.getElementById('ccBackToTop');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'ccBackToTop';
      btn.className = 'cc-back-to-top';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = '<i data-lucide="arrow-up" style="width:20px;height:20px;"></i>';
      document.body.appendChild(btn);
      refreshIcons();
    }
    window.addEventListener('scroll', function () {
      if (window.scrollY > 280) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Global Init */
  function initCore() {
    const savedTheme = readPref(STORAGE_KEYS.THEME, 'light');
    const savedDir = readPref(STORAGE_KEYS.DIR, 'ltr');
    applyTheme(savedTheme);
    applyDirection(savedDir);

    document.querySelectorAll('[data-cc-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
    document.querySelectorAll('[data-cc-dir-toggle]').forEach((btn) => {
      btn.addEventListener('click', toggleDirection);
    });

    // Global book buttons
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-cc-book]');
      if (trigger) {
        e.preventDefault();
        openBookingModal({
          doctorId: trigger.getAttribute('data-doctor-id') || '',
          serviceTitle: trigger.getAttribute('data-service') || ''
        });
      }
    });

    initBookingModalForm();
    loadClinicConfigAjax();
    initHeroThreeCanvas();
    initAnimations();
    initBackToTop();
    installImageFallbacks();
    refreshIcons();
  }

  window.CardioCare = {
    KEYS: STORAGE_KEYS,
    readPref,
    writePref,
    readDemoJSON,
    writeDemoJSON,
    showToast,
    escapeHtml,
    applyTheme,
    toggleTheme,
    applyDirection,
    toggleDirection,
    refreshIcons,
    openBookingModal,
    installImageFallbacks
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCore);
  } else {
    initCore();
  }
})(window, window.jQuery);

