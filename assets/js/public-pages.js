/**
 * CardioCare Public Pages Controller (Home, Services, Doctors)
 */
(function (window, $) {
  'use strict';

  const CC = window.CardioCare;
  const DATA = window.CARDIOCARE_DEMO;
  let testimonialSwiper = null;
  let doctorSwiper = null;

  function renderServiceCardHtml(srv, colClass = 'col-md-6 col-xl-3') {
    return `
      <div class="${colClass}" data-aos="fade-up">
        <article class="cc-card">
          <div class="cc-card-media">
            <img src="${srv.image}" alt="${CC.escapeHtml(srv.alt)}" loading="lazy">
          </div>
          <div class="cc-card-body">
            <div class="mb-2">
              <span class="cc-inhouse-badge">${CC.escapeHtml(srv.deliveryType)}</span>
            </div>
            <h3 class="cc-card-title">${CC.escapeHtml(srv.title)}</h3>
            <p class="cc-card-text">${CC.escapeHtml(srv.shortDesc)}</p>
            <div class="cc-card-footer-actions">
              <a href="services.html#${srv.id}" class="btn-cc-outline btn-cc-sm w-100">
                <span>Learn More</span>
                <i data-lucide="arrow-right" class="cc-rtl-flip"></i>
              </a>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function renderHomeServices() {
    const grid = document.getElementById('homeServicesGrid');
    if (!grid || !DATA) return;
    grid.innerHTML = DATA.services.map((srv) => renderServiceCardHtml(srv)).join('');
  }

  function renderDoctorCardHtml(doc) {
    return `
      <article class="cc-card w-100">
        <div class="cc-card-media cc-card-media-portrait">
          <img src="${doc.photo}" alt="${CC.escapeHtml(doc.alt)}" loading="lazy">
        </div>
        <div class="cc-card-body">
          <div class="mb-2 d-flex flex-wrap gap-1 justify-content-between align-items-center">
            <span class="cc-demo-badge">Sample Demo Profile</span>
          </div>
          <h3 class="cc-card-title mb-1">${CC.escapeHtml(doc.name)}</h3>
          <p class="small fw-semibold mb-3" style="color: var(--cc-teal);">${CC.escapeHtml(doc.roleTitle)}</p>
          <ul class="cc-doc-meta">
            <li><i data-lucide="award"></i><span>${CC.escapeHtml(doc.qualification)}</span></li>
            <li><i data-lucide="heart-pulse"></i><span>${CC.escapeHtml(doc.specialization)}</span></li>
            <li><i data-lucide="briefcase"></i><span>Experience: ${CC.escapeHtml(doc.experience)}</span></li>
            <li><i data-lucide="languages"></i><span>${CC.escapeHtml(doc.languages.join(', '))}</span></li>
            <li><i data-lucide="clock"></i><span>${CC.escapeHtml(doc.availability)}</span></li>
          </ul>
          <p class="cc-card-text small">${CC.escapeHtml(doc.bio)}</p>
          <div class="cc-card-footer-actions">
            <button type="button" class="btn-cc-outline btn-cc-sm flex-grow-1" data-cc-view-doctor="${doc.id}">
              <i data-lucide="user-check"></i><span>View Profile</span>
            </button>
            <button type="button" class="btn-cc-primary btn-cc-sm flex-grow-1" data-cc-book data-doctor-id="${doc.id}">
              <i data-lucide="calendar-plus"></i><span>Book Appointment</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderHomeDoctorsSlider() {
    const wrapper = document.getElementById('homeDoctorsWrapper');
    if (!wrapper || !DATA) return;
    wrapper.innerHTML = DATA.doctors.map((doc) => `
      <div class="swiper-slide">${renderDoctorCardHtml(doc)}</div>
    `).join('');
  }

  function renderHomeEducation() {
    const grid = document.getElementById('homeEducationGrid');
    if (!grid || !DATA) return;
    grid.innerHTML = DATA.educationArticles.map((art) => `
      <div class="col-md-6 col-lg-4" data-aos="fade-up">
        <article class="cc-card">
          <div class="cc-card-body">
            <div class="cc-icon-box">
              <i data-lucide="${art.icon}"></i>
            </div>
            <h3 class="cc-card-title">${CC.escapeHtml(art.title)}</h3>
            <p class="cc-card-text">${CC.escapeHtml(art.summary)}</p>
            <div class="cc-card-footer-actions">
              <button type="button" class="btn-cc-outline btn-cc-sm" data-cc-read-article="${art.id}">
                <span>Read More</span>
                <i data-lucide="book-open"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    `).join('');
  }

  function renderHomeFacilities() {
    const grid = document.getElementById('homeFacilitiesGrid');
    if (!grid || !DATA) return;
    grid.innerHTML = DATA.facilities.map((fac) => `
      <div class="col-md-6 col-lg-4" data-aos="fade-up">
        <article class="cc-card">
          <div class="cc-card-media">
            <img src="${fac.image}" alt="${CC.escapeHtml(fac.alt)}" loading="lazy">
          </div>
          <div class="cc-card-body">
            <div class="mb-2"><span class="cc-demo-badge">Illustrative Sample Image</span></div>
            <h3 class="cc-card-title">${CC.escapeHtml(fac.title)}</h3>
            <p class="cc-card-text mb-0">${CC.escapeHtml(fac.desc)}</p>
          </div>
        </article>
      </div>
    `).join('');
  }

  function renderHomeTestimonials() {
    const wrapper = document.getElementById('homeTestimonialsWrapper');
    if (!wrapper || !DATA) return;
    wrapper.innerHTML = DATA.testimonials.map((t) => `
      <div class="swiper-slide">
        <article class="cc-testimonial-card">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="cc-demo-badge">Demo Testimonial</span>
            <i data-lucide="quote" style="color: var(--cc-teal); width: 22px; height: 22px;"></i>
          </div>
          <p class="flex-grow-1 fs-6">"${CC.escapeHtml(t.quote)}"</p>
          <div class="pt-3 border-top" style="border-color: var(--cc-border) !important;">
            <div class="fw-bold small">${CC.escapeHtml(t.author)}</div>
            <div class="small" style="color: var(--cc-text-muted);">${CC.escapeHtml(t.visitType)}</div>
          </div>
        </article>
      </div>
    `).join('');
  }

  function initSwipers() {
    if (!window.Swiper) return;
    if (doctorSwiper) doctorSwiper.destroy(true, true);
    if (testimonialSwiper) testimonialSwiper.destroy(true, true);

    if (document.getElementById('homeDoctorsSwiper')) {
      doctorSwiper = new window.Swiper('#homeDoctorsSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { el: '#doctorsPagination', clickable: true },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 22 },
          1200: { slidesPerView: 3, spaceBetween: 24 }
        }
      });
    }

    if (document.getElementById('homeTestimonialsSwiper')) {
      testimonialSwiper = new window.Swiper('#homeTestimonialsSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { el: '#testimonialsPagination', clickable: true },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 22 },
          1200: { slidesPerView: 3, spaceBetween: 24 }
        }
      });
    }
  }

  /* Services Page Rendering */
  function renderServicesPage() {
    const list = document.getElementById('servicesDetailList');
    if (list && DATA) {
      const targetIds = [
        'general-consultation',
        'ecg-testing',
        'echocardiography',
        'cardiac-stress-testing',
        'preventive-heart-health',
        'follow-up-consultations'
      ];
      const items = DATA.services.filter((s) => targetIds.includes(s.id));
      list.innerHTML = items.map((srv, idx) => `
        <article id="${srv.id}" class="cc-service-detail-card mb-4" data-aos="fade-up">
          <div class="row g-0 align-items-stretch">
            <div class="col-lg-5 ${idx % 2 === 1 ? 'order-lg-2' : ''}">
              <img src="${srv.image}" alt="${CC.escapeHtml(srv.alt)}" class="cc-service-detail-img" loading="lazy">
            </div>
            <div class="col-lg-7 p-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex flex-wrap align-items-center gap-2 mb-3">
                  <span class="cc-inhouse-badge">${CC.escapeHtml(srv.deliveryType)}</span>
                </div>
                <h2 class="h3 mb-3">${CC.escapeHtml(srv.title)}</h2>
                <p class="mb-3">${CC.escapeHtml(srv.shortDesc)}</p>
                <p class="small mb-3"><strong>Purpose:</strong> ${CC.escapeHtml(srv.purpose)}</p>
                <div class="cc-prep-box mb-4">
                  <div class="small fw-bold mb-1" style="color: var(--cc-teal);">General Preparation Guidance</div>
                  <p class="small mb-0">${CC.escapeHtml(srv.preparation)}</p>
                </div>
              </div>
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-2">
                <span class="small" style="color: var(--cc-text-muted);">Informational guidance only — not a substitute for consultation.</span>
                <button type="button" class="btn-cc-primary" data-cc-book data-service="${CC.escapeHtml(srv.title)}">
                  <i data-lucide="calendar-plus"></i><span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `).join('');
    }

    const faqEl = document.getElementById('servicesFaqAccordion');
    if (faqEl && DATA) {
      faqEl.innerHTML = DATA.faqs.map((item, i) => `
        <div class="accordion-item">
          <h3 class="accordion-header" id="faqHead${i}">
            <button class="accordion-button ${i === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#faqBody${i}" aria-expanded="${i === 0 ? 'true' : 'false'}" aria-controls="faqBody${i}">
              ${CC.escapeHtml(item.q)}
            </button>
          </h3>
          <div id="faqBody${i}" class="accordion-collapse collapse ${i === 0 ? 'show' : ''}" aria-labelledby="faqHead${i}" data-bs-parent="#servicesFaqAccordion">
            <div class="accordion-body">${CC.escapeHtml(item.a)}</div>
          </div>
        </div>
      `).join('');
    }
  }

  /* Doctors Directory Page Rendering & Filter */
  function renderDoctorsDirectory(filterText = 'all') {
    const grid = document.getElementById('doctorsDirectoryGrid');
    if (!grid || !DATA) return;
    const list = filterText === 'all'
      ? DATA.doctors
      : DATA.doctors.filter((d) => d.roleTitle.toLowerCase().includes(filterText) || d.specialization.toLowerCase().includes(filterText));

    grid.innerHTML = list.map((doc) => `
      <div class="col-md-6 col-xl-4 d-flex" data-aos="fade-up">
        ${renderDoctorCardHtml(doc)}
      </div>
    `).join('');
    CC.refreshIcons();
    CC.installImageFallbacks();
  }

  function openDoctorProfileModal(docId) {
    const doc = (DATA.doctors || []).find((d) => d.id === docId);
    const modalEl = document.getElementById('ccDoctorProfileModal');
    if (!doc || !modalEl || !window.bootstrap) return;

    modalEl.querySelector('#docModalPhoto').src = doc.photo;
    modalEl.querySelector('#docModalPhoto').alt = doc.alt;
    modalEl.querySelector('#docModalName').textContent = doc.name;
    modalEl.querySelector('#docModalRole').textContent = doc.roleTitle;
    modalEl.querySelector('#docModalQual').textContent = doc.qualification;
    modalEl.querySelector('#docModalSpec').textContent = doc.specialization;
    modalEl.querySelector('#docModalExp').textContent = doc.experience;
    modalEl.querySelector('#docModalLang').textContent = doc.languages.join(', ');
    modalEl.querySelector('#docModalBio').textContent = doc.bio;
    modalEl.querySelector('#docModalInterests').innerHTML = doc.interests
      .map((i) => `<span class="cc-inhouse-badge">${CC.escapeHtml(i)}</span>`).join(' ');
    modalEl.querySelector('#docModalSlots').innerHTML = doc.slots
      .map((s) => `<span class="cc-slot-chip">${CC.escapeHtml(s)}</span>`).join(' ');

    const bookBtn = modalEl.querySelector('#docModalBookBtn');
    bookBtn.setAttribute('data-doctor-id', doc.id);
    bookBtn.onclick = function () {
      window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      CC.openBookingModal({ doctorId: doc.id });
    };

    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  function openArticleModal(articleId) {
    const art = (DATA.educationArticles || []).find((a) => a.id === articleId);
    const modalEl = document.getElementById('ccArticleModal');
    if (!art || !modalEl || !window.bootstrap) return;
    modalEl.querySelector('#artModalTitle').textContent = art.title;
    modalEl.querySelector('#artModalBody').textContent = art.body;
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  function bindContactFormById(formId, errId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector('textarea').value.trim();
      const errEl = document.getElementById(errId);

      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 8) {
        errEl.textContent = 'Please provide your name, a valid email address, and a brief inquiry (at least 8 characters).';
        errEl.classList.remove('d-none');
        return;
      }
      errEl.classList.add('d-none');
      form.reset();
      CC.showToast('Demo clinic inquiry submitted. For urgent symptoms, please call local emergency services.', 'success');
    });
  }

  /* ==========================================================================
     HOME 2 (Editorial Variant) Renderers & Interactive Controls
     ========================================================================== */
  function renderHome2Services(category = 'all') {
    const grid = document.getElementById('home2ServicesGrid');
    if (!grid || !DATA) return;
    const catMap = {
      consultations: ['general-consultation', 'follow-up-consultations'],
      diagnostics: ['ecg-testing', 'echocardiography', 'cardiac-stress-testing'],
      preventive: ['blood-pressure-assessment', 'preventive-heart-health', 'cardiac-risk-assessment']
    };
    const items = category === 'all'
      ? DATA.services
      : DATA.services.filter((s) => (catMap[category] || []).includes(s.id));

    grid.innerHTML = items.map((srv) => renderServiceCardHtml(srv, 'col-md-6 col-xl-3')).join('');
    CC.refreshIcons();
    CC.installImageFallbacks();
  }

  function renderHome2Doctors() {
    const grid = document.getElementById('home2DoctorsGrid');
    if (!grid || !DATA) return;
    grid.innerHTML = DATA.doctors.slice(0, 3).map((doc) => `
      <div class="col-md-6 col-lg-4 d-flex" data-aos="fade-up">
        ${renderDoctorCardHtml(doc)}
      </div>
    `).join('');
  }

  function renderHome2Education() {
    const grid = document.getElementById('home2EducationGrid');
    if (!grid || !DATA) return;
    const nonUrgent = DATA.educationArticles.filter((a) => a.id !== 'edu-warning').slice(0, 3);
    grid.innerHTML = nonUrgent.map((art) => `
      <div class="col-md-4" data-aos="fade-up">
        <article class="cc-card">
          <div class="cc-card-body">
            <div class="cc-icon-box"><i data-lucide="${art.icon}"></i></div>
            <h3 class="cc-card-title">${CC.escapeHtml(art.title)}</h3>
            <p class="cc-card-text">${CC.escapeHtml(art.summary)}</p>
            <div class="cc-card-footer-actions">
              <button type="button" class="btn-cc-outline btn-cc-sm" data-cc-read-article="${art.id}">
                <span>Read More</span><i data-lucide="book-open"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    `).join('');
  }

  function initHome2FacilitySwitcher() {
    const tabsWrap = document.getElementById('home2FacilityTabs');
    const previewImg = document.getElementById('home2FacilityImg');
    const previewTitle = document.getElementById('home2FacilityTitle');
    const previewDesc = document.getElementById('home2FacilityDesc');
    if (!tabsWrap || !previewImg || !DATA) return;

    function selectFacility(index) {
      const fac = DATA.facilities[index];
      if (!fac) return;
      previewImg.src = fac.image;
      previewImg.alt = fac.alt;
      previewTitle.textContent = fac.title;
      previewDesc.textContent = fac.desc;
      tabsWrap.querySelectorAll('.cc-facility-tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
    }

    tabsWrap.innerHTML = DATA.facilities.map((fac, idx) => `
      <button type="button" class="cc-facility-tab-btn ${idx === 0 ? 'active' : ''}" data-fac-index="${idx}">
        <span>${CC.escapeHtml(fac.title)}</span>
        <i data-lucide="chevron-right" class="cc-rtl-flip" style="width:18px;height:18px;"></i>
      </button>
    `).join('');

    tabsWrap.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-fac-index]');
      if (btn) {
        selectFacility(Number(btn.getAttribute('data-fac-index')));
      }
    });
    selectFacility(0);
  }

  function initHome2QuickBar() {
    const form = document.getElementById('home2QuickBookingForm');
    if (!form || !DATA) return;
    const docSel = document.getElementById('h2QuickDoc');
    if (docSel) {
      docSel.innerHTML = '<option value="">Any Available Cardiologist</option>' +
        DATA.doctors.map((d) => `<option value="${d.id}">${CC.escapeHtml(d.name)}</option>`).join('');
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      CC.openBookingModal({
        doctorId: docSel ? docSel.value : '',
        serviceTitle: document.getElementById('h2QuickService')?.value || ''
      });
    });
  }

  function initPublicPages() {
    renderHomeServices();
    renderHomeDoctorsSlider();
    renderHomeEducation();
    renderHomeFacilities();
    renderHomeTestimonials();
    renderHome2Services('all');
    renderHome2Doctors();
    renderHome2Education();
    initHome2FacilitySwitcher();
    initHome2QuickBar();
    renderServicesPage();
    renderDoctorsDirectory('all');
    initSwipers();
    bindContactFormById('ccHomeContactForm', 'ctFormError');
    bindContactFormById('ccHome2ContactForm', 'ct2FormError');

    // Home 2 Service Filter Tabs
    document.querySelectorAll('[data-h2-srv-filter]').forEach((btn) => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-h2-srv-filter]').forEach((b) => {
          b.classList.remove('btn-cc-primary');
          b.classList.add('btn-cc-outline');
        });
        this.classList.remove('btn-cc-outline');
        this.classList.add('btn-cc-primary');
        renderHome2Services(this.getAttribute('data-h2-srv-filter'));
      });
    });

    // Doctor filter buttons on doctors.html
    document.querySelectorAll('[data-doc-filter]').forEach((btn) => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-doc-filter]').forEach((b) => {
          b.classList.remove('btn-cc-primary');
          b.classList.add('btn-cc-outline');
        });
        this.classList.remove('btn-cc-outline');
        this.classList.add('btn-cc-primary');
        renderDoctorsDirectory(this.getAttribute('data-doc-filter'));
      });
    });

    // Delegated clicks for View Profile & Read More
    document.addEventListener('click', function (e) {
      const docBtn = e.target.closest('[data-cc-view-doctor]');
      if (docBtn) {
        e.preventDefault();
        openDoctorProfileModal(docBtn.getAttribute('data-cc-view-doctor'));
      }
      const artBtn = e.target.closest('[data-cc-read-article]');
      if (artBtn) {
        e.preventDefault();
        openArticleModal(artBtn.getAttribute('data-cc-read-article'));
      }
    });

    // Re-init Swipers cleanly when RTL/LTR changes
    window.addEventListener('cardiocare:dirchange', function () {
      setTimeout(initSwipers, 60);
    });

    CC.refreshIcons();
    CC.installImageFallbacks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPublicPages);
  } else {
    initPublicPages();
  }
})(window, window.jQuery);

