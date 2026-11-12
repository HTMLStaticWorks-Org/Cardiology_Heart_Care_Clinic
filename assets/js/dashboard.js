/**
 * CardioCare Patient Dashboard Controller
 * Modules: Overview, Appointments, ECG Reports, Test Reports,
 * Medication Reminders, Medical History, My Profile, Notifications, Logout.
 */
(function (window) {
  'use strict';

  const CC = window.CardioCare;
  const DATA = window.CARDIOCARE_DEMO;
  let activityChart = null;
  let currentModule = 'overview';

  function getAppointments() {
    return CC.readDemoJSON(CC.KEYS.DEMO_APPOINTMENTS, DATA.demoAppointments);
  }
  function saveAppointments(list) {
    CC.writeDemoJSON(CC.KEYS.DEMO_APPOINTMENTS, list);
  }

  function getMedications() {
    return CC.readDemoJSON(CC.KEYS.DEMO_MEDS, DATA.demoMedications);
  }
  function saveMedications(list) {
    CC.writeDemoJSON(CC.KEYS.DEMO_MEDS, list);
  }

  function getMedHistory() {
    return CC.readDemoJSON(CC.KEYS.DEMO_MED_HISTORY, [
      { id: 'HIST-1', name: 'Sample Morning Prescription Placeholder A', takenAt: 'Today, 08:05 AM (Demo Log)' }
    ]);
  }
  function saveMedHistory(list) {
    CC.writeDemoJSON(CC.KEYS.DEMO_MED_HISTORY, list);
  }

  function getNotifications() {
    return CC.readDemoJSON(CC.KEYS.DEMO_NOTIFS, DATA.demoNotifications);
  }
  function saveNotifications(list) {
    CC.writeDemoJSON(CC.KEYS.DEMO_NOTIFS, list);
  }

  function getProfile() {
    return CC.readDemoJSON(CC.KEYS.DEMO_PROFILE, DATA.demoPatient);
  }
  function saveProfile(profile) {
    CC.writeDemoJSON(CC.KEYS.DEMO_PROFILE, profile);
  }

  function getHistoryNotes() {
    return CC.readDemoJSON(CC.KEYS.DEMO_HISTORY_NOTES, DATA.demoMedicalHistory.notes);
  }
  function saveHistoryNotes(notes) {
    CC.writeDemoJSON(CC.KEYS.DEMO_HISTORY_NOTES, notes);
  }

  function statusBadgeClass(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('confirm') || s.includes('active') || s.includes('available') || s.includes('reviewed')) return 'cc-status-confirmed';
    if (s.includes('pending') || s.includes('uploaded')) return 'cc-status-pending';
    if (s.includes('completed')) return 'cc-status-completed';
    if (s.includes('cancel')) return 'cc-status-cancelled';
    return 'cc-status-completed';
  }

  /* Download Clearly-Marked Sample Report File */
  function downloadSampleDocument(filename, title, metaLines) {
    const content = [
      '====================================================================',
      'CARDIOCARE — SAMPLE DEMONSTRATION REPORT (NOT A REAL MEDICAL RECORD)',
      '====================================================================',
      '',
      `Document Title: ${title}`,
      ...metaLines,
      '',
      'IMPORTANT MEDICAL NOTICE:',
      'This file is a placeholder downloaded from the CardioCare frontend',
      'demonstration portal. It does NOT contain real patient data, ECG',
      'waveforms, lab results, or clinical diagnoses.',
      '',
      'Actual ECG and diagnostic reports must always be reviewed directly',
      'with a qualified cardiologist or healthcare professional.',
      '===================================================================='
    ].join('\r\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    CC.showToast(`Downloaded sample demo file: ${filename}`, 'success');
  }

  /* Sync Header / Profile UI */
  function syncProfileHeader() {
    const profile = getProfile();
    document.querySelectorAll('[data-dash-patient-name]').forEach((el) => {
      el.textContent = profile.fullName;
    });
    document.querySelectorAll('[data-dash-patient-id]').forEach((el) => {
      el.textContent = profile.patientId;
    });
    document.querySelectorAll('[data-dash-patient-initials]').forEach((el) => {
      el.textContent = profile.initials || 'DP';
    });

    const unreadCount = getNotifications().filter((n) => !n.read).length;
    const sidebarBadge = document.getElementById('sidebarNotifBadge');
    const topBadge = document.getElementById('topNotifBadge');
    if (sidebarBadge) {
      sidebarBadge.textContent = unreadCount;
      sidebarBadge.classList.toggle('d-none', unreadCount === 0);
    }
    if (topBadge) {
      topBadge.textContent = unreadCount;
      topBadge.classList.toggle('d-none', unreadCount === 0);
    }
  }

  function updateTopbarTitle(moduleName) {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const titleMapEn = {
      overview: 'Patient Overview',
      appointments: 'Appointments & Booking',
      ecg: 'ECG Reports (Sample Demo)',
      tests: 'Diagnostic Test Reports (Sample Demo)',
      medications: 'Medication Reminders',
      history: 'Medical History (Sample Demo)',
      profile: 'My Profile',
      notifications: 'Notifications'
    };
    const titleMapAr = {
      overview: 'نظرة عامة للمريض',
      appointments: 'المواعيد والحجز',
      ecg: 'تقارير تخطيط القلب (عرض تجريبي)',
      tests: 'التقارير التشخيصية (عرض تجريبي)',
      medications: 'تذكيرات الأدوية',
      history: 'السجل الطبي (عرض تجريبي)',
      profile: 'ملفي الشخصي',
      notifications: 'الإشعارات'
    };
    const topTitle = document.getElementById('dashTopbarTitle');
    if (topTitle) {
      const map = isRtl ? titleMapAr : titleMapEn;
      topTitle.textContent = map[moduleName] || (isRtl ? 'بوابة المريض' : 'Patient Portal');
    }
  }

  /* Switch Active Dashboard Module */
  function switchModule(moduleName) {
    currentModule = moduleName;
    document.querySelectorAll('.cc-dash-module').forEach((sec) => {
      sec.classList.toggle('d-none', sec.id !== `mod-${moduleName}`);
    });
    document.querySelectorAll('[data-dash-module]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-dash-module') === moduleName);
    });

    updateTopbarTitle(moduleName);

    // Close mobile drawer if open
    const sidebar = document.getElementById('ccDashSidebar');
    const backdrop = document.getElementById('ccDashBackdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');

    if (moduleName === 'overview') renderOverview();
    if (moduleName === 'appointments') renderAppointmentsModule();
    if (moduleName === 'ecg') renderEcgModule();
    if (moduleName === 'tests') renderTestsModule();
    if (moduleName === 'medications') renderMedicationsModule();
    if (moduleName === 'history') renderHistoryModule();
    if (moduleName === 'profile') renderProfileModule();
    if (moduleName === 'notifications') renderNotificationsModule();

    CC.refreshIcons();
  }

  /* ==========================================================================
     MODULE 1: OVERVIEW
     ========================================================================== */
  function renderOverview() {
    const profile = getProfile();
    const apts = getAppointments();
    const meds = getMedications();
    const notifs = getNotifications();

    const upcoming = apts.find((a) => !a.status.toLowerCase().includes('cancel') && !a.status.toLowerCase().includes('completed'));
    const unreadNotifs = notifs.filter((n) => !n.read);

    const kpiNext = document.getElementById('ovNextApt');
    const kpiLast = document.getElementById('ovLastConsult');
    const kpiEcg = document.getElementById('ovEcgCount');
    const kpiTests = document.getElementById('ovTestCount');
    const kpiMeds = document.getElementById('ovMedCount');
    const kpiNotifs = document.getElementById('ovNotifCount');

    if (kpiNext) kpiNext.textContent = upcoming ? `${upcoming.date} · ${upcoming.time}` : 'None scheduled';
    if (kpiLast) kpiLast.textContent = profile.lastConsultation || '2026-10-18 (Demo)';
    if (kpiEcg) kpiEcg.textContent = DATA.demoEcgReports.length;
    if (kpiTests) kpiTests.textContent = DATA.demoTestReports.length;
    if (kpiMeds) kpiMeds.textContent = meds.length;
    if (kpiNotifs) kpiNotifs.textContent = unreadNotifs.length;

    const upCard = document.getElementById('ovUpcomingCard');
    if (upCard) {
      upCard.innerHTML = upcoming ? `
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
          <div>
            <div class="fw-bold fs-6">${CC.escapeHtml(upcoming.doctorName)}</div>
            <div class="small" style="color: var(--cc-teal);">${CC.escapeHtml(upcoming.specialization)}</div>
          </div>
          <span class="cc-status-badge ${statusBadgeClass(upcoming.status)}">${CC.escapeHtml(upcoming.status)}</span>
        </div>
        <div class="small mb-2"><strong>Type:</strong> ${CC.escapeHtml(upcoming.type)} | <strong>ID:</strong> ${CC.escapeHtml(upcoming.id)}</div>
        <div class="small mb-3"><strong>Date & Time:</strong> ${CC.escapeHtml(upcoming.date)} at ${CC.escapeHtml(upcoming.time)}</div>
        <button type="button" class="btn-cc-outline btn-cc-sm" onclick="window.CardioCareDash.switchModule('appointments')">
          Manage Appointments
        </button>
      ` : '<p class="small mb-0">No upcoming demo appointments. Use Quick Actions to book one.</p>';
    }

    const recentReportsEl = document.getElementById('ovRecentReports');
    if (recentReportsEl) {
      const items = [
        ...DATA.demoEcgReports.slice(0, 1).map((r) => ({ title: r.name, date: r.date, mod: 'ecg' })),
        ...DATA.demoTestReports.slice(0, 2).map((r) => ({ title: r.name, date: r.date, mod: 'tests' }))
      ];
      recentReportsEl.innerHTML = items.map((item) => `
        <div class="d-flex justify-content-between align-items-center py-2 border-bottom" style="border-color: var(--cc-border) !important;">
          <div>
            <div class="fw-semibold small">${CC.escapeHtml(item.title)}</div>
            <div class="small" style="color: var(--cc-text-muted);">${CC.escapeHtml(item.date)} · Sample Demo</div>
          </div>
          <button type="button" class="btn-cc-outline btn-cc-sm" onclick="window.CardioCareDash.switchModule('${item.mod}')">View</button>
        </div>
      `).join('');
    }

    const medSummaryEl = document.getElementById('ovMedSummary');
    if (medSummaryEl) {
      medSummaryEl.innerHTML = meds.slice(0, 3).map((m) => `
        <div class="d-flex justify-content-between align-items-center py-2 border-bottom" style="border-color: var(--cc-border) !important;">
          <div>
            <div class="fw-semibold small">${CC.escapeHtml(m.name)}</div>
            <div class="small" style="color: var(--cc-text-muted);">${CC.escapeHtml(m.time)} · ${CC.escapeHtml(m.frequency)}</div>
          </div>
          <span class="cc-status-badge cc-status-confirmed">Active (Demo)</span>
        </div>
      `).join('');
    }

    const aptPreviewEl = document.getElementById('ovAptHistoryPreview');
    if (aptPreviewEl) {
      aptPreviewEl.innerHTML = apts.slice(0, 3).map((a) => `
        <tr>
          <td><strong>${CC.escapeHtml(a.id)}</strong></td>
          <td>${CC.escapeHtml(a.doctorName)}</td>
          <td>${CC.escapeHtml(a.date)} · ${CC.escapeHtml(a.time)}</td>
          <td><span class="cc-status-badge ${statusBadgeClass(a.status)}">${CC.escapeHtml(a.status)}</span></td>
        </tr>
      `).join('');
    }

    renderOverviewChart(apts, meds);
  }

  function renderOverviewChart(apts, meds) {
    const canvas = document.getElementById('dashOverviewChart');
    if (!canvas || !window.Chart) return;
    if (activityChart) activityChart.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#C2D0DA' : '#435766';
    const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(23,43,58,0.08)';

    activityChart = new window.Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Appointments', 'ECG Samples', 'Test Samples', 'Med Reminders', 'Notifications'],
        datasets: [{
          label: 'Portal Items (Demo Count)',
          data: [
            apts.length,
            DATA.demoEcgReports.length,
            DATA.demoTestReports.length,
            meds.length,
            getNotifications().length
          ],
          backgroundColor: ['#7B263A', '#168C91', '#24966D', '#E6A23C', '#172B3A'],
          borderRadius: 8,
          maxBarThickness: 42
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { color: textColor }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { stepSize: 1, color: textColor }, grid: { color: gridColor } }
        }
      }
    });
  }

  /* ==========================================================================
     MODULE 2: APPOINTMENTS
     ========================================================================== */
  function renderAppointmentsModule() {
    const docSelect = document.getElementById('dashAptDoctor');
    const specInput = document.getElementById('dashAptSpec');
    const dateInput = document.getElementById('dashAptDate');

    if (docSelect && !docSelect.dataset.populated) {
      docSelect.dataset.populated = '1';
      docSelect.innerHTML = '<option value="">Select Specialist...</option>' +
        DATA.doctors.map((d) => `<option value="${d.id}" data-spec="${CC.escapeHtml(d.specialization)}">${CC.escapeHtml(d.name)}</option>`).join('');
      docSelect.addEventListener('change', function () {
        const opt = this.options[this.selectedIndex];
        if (opt && specInput) specInput.value = opt.getAttribute('data-spec') || '';
      });
    }

    if (dateInput && !dateInput.value) {
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      dateInput.min = tomorrow;
      dateInput.value = tomorrow;
    }

    const tbody = document.getElementById('dashAppointmentsBody');
    if (!tbody) return;
    const apts = getAppointments();

    tbody.innerHTML = apts.map((a) => {
      const isCancelled = a.status.toLowerCase().includes('cancel');
      const isCompleted = a.status.toLowerCase().includes('completed');
      return `
        <tr>
          <td><strong>${CC.escapeHtml(a.id)}</strong></td>
          <td>${CC.escapeHtml(a.doctorName)}</td>
          <td>${CC.escapeHtml(a.specialization)}</td>
          <td>${CC.escapeHtml(a.date)}</td>
          <td>${CC.escapeHtml(a.time)}</td>
          <td>${CC.escapeHtml(a.type)}</td>
          <td><span class="cc-status-badge ${statusBadgeClass(a.status)}">${CC.escapeHtml(a.status)}</span></td>
          <td class="text-nowrap">
            <button type="button" class="btn-cc-outline btn-cc-sm me-1" data-apt-view="${a.id}" title="View Details">Details</button>
            ${(!isCancelled && !isCompleted) ? `
              <button type="button" class="btn-cc-outline btn-cc-sm me-1" data-apt-reschedule="${a.id}">Reschedule</button>
              <button type="button" class="btn-cc-outline btn-cc-sm text-danger" data-apt-cancel="${a.id}">Cancel</button>
            ` : ''}
          </td>
        </tr>
      `;
    }).join('');
  }

  function initAppointmentForm() {
    const form = document.getElementById('dashBookAptForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const docId = document.getElementById('dashAptDoctor').value;
      const spec = document.getElementById('dashAptSpec').value;
      const type = document.getElementById('dashAptType').value;
      const date = document.getElementById('dashAptDate').value;
      const time = document.getElementById('dashAptTime').value;
      const reason = document.getElementById('dashAptReason').value.trim();
      const contact = document.getElementById('dashAptContact').value.trim();
      const errBox = document.getElementById('dashAptError');

      if (!docId || !spec || !date || !time || reason.length < 4 || !/^[+\d\s\-()]{7,20}$/.test(contact)) {
        errBox.textContent = 'Please complete all appointment fields with a valid phone number and brief visit reason.';
        errBox.classList.remove('d-none');
        return;
      }
      errBox.classList.add('d-none');

      const docObj = DATA.doctors.find((d) => d.id === docId);
      const apts = getAppointments();
      const newApt = {
        id: 'APT-DEMO-' + Math.floor(200 + Math.random() * 799),
        doctorId: docId,
        doctorName: docObj ? docObj.name : 'Selected Specialist (Demo)',
        specialization: spec,
        type: type,
        date: date,
        time: time,
        reason: reason,
        contact: contact,
        status: 'Confirmed (demo)'
      };
      apts.unshift(newApt);
      saveAppointments(apts);

      // Add demo notification
      const notifs = getNotifications();
      notifs.unshift({
        id: 'NTF-' + Date.now(),
        category: 'Appointment Confirmation',
        title: `Demo Appointment ${newApt.id} Recorded`,
        message: `${newApt.type} with ${newApt.doctorName} on ${newApt.date} at ${newApt.time}.`,
        time: 'Just now',
        read: false
      });
      saveNotifications(notifs);

      form.reset();
      syncProfileHeader();
      renderAppointmentsModule();
      CC.showToast(`Demo appointment ${newApt.id} confirmed!`, 'success');
    });

    const resetBtn = document.getElementById('dashAptCancelFormBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        document.getElementById('dashAptError').classList.add('d-none');
      });
    }
  }

  /* ==========================================================================
     MODULE 3: ECG REPORTS
     ========================================================================== */
  function renderEcgModule() {
    const tbody = document.getElementById('dashEcgBody');
    if (!tbody) return;
    tbody.innerHTML = DATA.demoEcgReports.map((r) => `
      <tr>
        <td><strong>${CC.escapeHtml(r.id)}</strong></td>
        <td>${CC.escapeHtml(r.name)}</td>
        <td>${CC.escapeHtml(r.date)}</td>
        <td>${CC.escapeHtml(r.doctor)}</td>
        <td><span class="cc-status-badge cc-status-confirmed">${CC.escapeHtml(r.status)}</span></td>
        <td class="text-nowrap">
          <button type="button" class="btn-cc-primary btn-cc-sm me-1" data-ecg-view="${r.id}">View Report</button>
          <button type="button" class="btn-cc-outline btn-cc-sm" data-ecg-dl="${r.id}">Download Sample</button>
        </td>
      </tr>
    `).join('');
  }

  function openEcgViewer(reportId) {
    const rep = DATA.demoEcgReports.find((r) => r.id === reportId);
    const modalEl = document.getElementById('ccEcgViewerModal');
    if (!rep || !modalEl || !window.bootstrap) return;

    const profile = getProfile();
    modalEl.querySelector('#ecgModalTitle').textContent = rep.name;
    modalEl.querySelector('#ecgModalPatientId').textContent = profile.patientId;
    modalEl.querySelector('#ecgModalDate').textContent = rep.date;
    modalEl.querySelector('#ecgModalDoctor').textContent = rep.doctor;
    modalEl.querySelector('#ecgModalSummary').textContent = rep.summaryNote;
    modalEl.querySelector('#ecgModalDownloadBtn').onclick = () => {
      downloadSampleDocument(`${rep.id}-sample.txt`, rep.name, [
        `Report ID: ${rep.id}`,
        `Demo Patient ID: ${profile.patientId}`,
        `Test Date: ${rep.date}`,
        `Referring Clinician: ${rep.doctor}`
      ]);
    };

    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  /* ==========================================================================
     MODULE 4: TEST REPORTS
     ========================================================================== */
  function renderTestsModule() {
    const searchVal = (document.getElementById('testSearchInput')?.value || '').trim().toLowerCase();
    const catVal = document.getElementById('testCategoryFilter')?.value || 'all';
    const dateVal = document.getElementById('testDateFilter')?.value || '';

    const filtered = DATA.demoTestReports.filter((t) => {
      const matchesSearch = !searchVal || t.name.toLowerCase().includes(searchVal) || t.category.toLowerCase().includes(searchVal) || t.id.toLowerCase().includes(searchVal);
      const matchesCat = catVal === 'all' || t.category === catVal;
      const matchesDate = !dateVal || t.date === dateVal;
      return matchesSearch && matchesCat && matchesDate;
    });

    const tbody = document.getElementById('dashTestsBody');
    if (!tbody) return;
    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">No sample demonstration reports match your current filter.</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map((t) => `
      <tr>
        <td><strong>${CC.escapeHtml(t.name)}</strong><div class="small" style="color: var(--cc-text-muted);">${CC.escapeHtml(t.id)}</div></td>
        <td>${CC.escapeHtml(t.category)}</td>
        <td>${CC.escapeHtml(t.date)}</td>
        <td><span class="cc-status-badge ${statusBadgeClass(t.status)}">${CC.escapeHtml(t.status)}</span></td>
        <td><button type="button" class="btn-cc-primary btn-cc-sm" data-test-view="${t.id}">View</button></td>
        <td><button type="button" class="btn-cc-outline btn-cc-sm" data-test-dl="${t.id}">Download</button></td>
      </tr>
    `).join('');
  }

  function openTestViewer(testId) {
    const t = DATA.demoTestReports.find((r) => r.id === testId);
    const modalEl = document.getElementById('ccTestViewerModal');
    if (!t || !modalEl || !window.bootstrap) return;

    const profile = getProfile();
    modalEl.querySelector('#testModalTitle').textContent = t.name;
    modalEl.querySelector('#testModalId').textContent = t.id;
    modalEl.querySelector('#testModalCat').textContent = t.category;
    modalEl.querySelector('#testModalDate').textContent = t.date;
    modalEl.querySelector('#testModalDoc').textContent = t.doctor;
    modalEl.querySelector('#testModalStatus').textContent = t.status;
    modalEl.querySelector('#testModalNote').textContent = t.note;
    modalEl.querySelector('#testModalDownloadBtn').onclick = () => {
      downloadSampleDocument(`${t.id}-sample.txt`, t.name, [
        `Report ID: ${t.id}`,
        `Category: ${t.category}`,
        `Demo Patient ID: ${profile.patientId}`,
        `Test Date: ${t.date}`,
        `Clinician: ${t.doctor}`
      ]);
    };

    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  /* ==========================================================================
     MODULE 5: MEDICATION REMINDERS
     ========================================================================== */
  function renderMedicationsModule() {
    const grid = document.getElementById('dashMedsGrid');
    const histBody = document.getElementById('dashMedHistoryBody');
    const meds = getMedications();
    const history = getMedHistory();

    if (grid) {
      grid.innerHTML = meds.length === 0
        ? '<div class="col-12"><div class="cc-panel text-center py-4">No medication reminders added yet.</div></div>'
        : meds.map((m) => `
          <div class="col-md-6 col-xl-4">
            <article class="cc-med-card">
              <div>
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                  <h4 class="h6 mb-0">${CC.escapeHtml(m.name)}</h4>
                  <span class="cc-status-badge cc-status-confirmed">${CC.escapeHtml(m.status || 'Active (Demo)')}</span>
                </div>
                <p class="small mb-2"><strong>Dosage Instructions:</strong> ${CC.escapeHtml(m.dosage)}</p>
                <p class="small mb-1"><strong>Time:</strong> ${CC.escapeHtml(m.time)} · <strong>Frequency:</strong> ${CC.escapeHtml(m.frequency)}</p>
                <p class="small mb-2"><strong>Schedule:</strong> ${CC.escapeHtml(m.startDate)} to ${CC.escapeHtml(m.endDate || 'Ongoing')}</p>
                ${m.notes ? `<p class="small fst-italic mb-3" style="color: var(--cc-text-muted);">${CC.escapeHtml(m.notes)}</p>` : ''}
              </div>
              <div class="d-flex flex-wrap gap-2 pt-2 border-top" style="border-color: var(--cc-border) !important;">
                <button type="button" class="btn-cc-teal btn-cc-sm" data-med-taken="${m.id}">Mark as Taken</button>
                <button type="button" class="btn-cc-outline btn-cc-sm" data-med-edit="${m.id}">Edit</button>
                <button type="button" class="btn-cc-outline btn-cc-sm text-danger" data-med-del="${m.id}">Delete</button>
              </div>
            </article>
          </div>
        `).join('');
    }

    if (histBody) {
      histBody.innerHTML = history.map((h) => `
        <tr>
          <td>${CC.escapeHtml(h.name)}</td>
          <td>${CC.escapeHtml(h.takenAt)}</td>
          <td><span class="cc-status-badge cc-status-completed">Logged (Demo)</span></td>
        </tr>
      `).join('');
    }
  }

  function initMedicationForm() {
    const form = document.getElementById('dashMedForm');
    if (!form) return;
    const medStart = document.getElementById('medStart');
    if (medStart && !medStart.value) {
      medStart.value = new Date().toISOString().split('T')[0];
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const editId = document.getElementById('medEditId').value;
      const name = document.getElementById('medName').value.trim();
      const dosage = document.getElementById('medDosage').value.trim();
      const freq = document.getElementById('medFrequency').value;
      const time = document.getElementById('medTime').value;
      const startDate = document.getElementById('medStart').value;
      const endDate = document.getElementById('medEnd').value;
      const notes = document.getElementById('medNotes').value.trim();
      const errBox = document.getElementById('dashMedError');

      if (!name || !dosage || !time || !startDate) {
        errBox.textContent = 'Please enter medication name, prescription dosage instructions, reminder time, and start date.';
        errBox.classList.remove('d-none');
        return;
      }
      errBox.classList.add('d-none');

      const meds = getMedications();
      if (editId) {
        const idx = meds.findIndex((m) => m.id === editId);
        if (idx > -1) {
          meds[idx] = { ...meds[idx], name, dosage, frequency: freq, time, startDate, endDate, notes };
        }
        CC.showToast('Demo medication reminder updated.', 'success');
      } else {
        meds.unshift({
          id: 'MED-DEMO-' + Date.now(),
          name,
          dosage,
          frequency: freq,
          time,
          startDate,
          endDate,
          notes,
          status: 'Active (Demo)'
        });
        CC.showToast('Demo medication reminder added.', 'success');
      }

      saveMedications(meds);
      form.reset();
      document.getElementById('medEditId').value = '';
      document.getElementById('medSubmitBtn').textContent = 'Save Reminder';
      renderMedicationsModule();
    });
  }

  /* ==========================================================================
     MODULE 6: MEDICAL HISTORY
     ========================================================================== */
  function renderHistoryModule() {
    const mh = DATA.demoMedicalHistory;
    const consultEl = document.getElementById('histConsultationsList');
    const testsEl = document.getElementById('histTestsList');
    const allergiesEl = document.getElementById('histAllergiesList');
    const condEl = document.getElementById('histConditionsList');
    const notesEl = document.getElementById('histNotesList');
    const famEl = document.getElementById('histFamilyList');

    if (consultEl) {
      consultEl.innerHTML = mh.consultations.map((c) => `
        <div class="p-3 rounded border mb-2" style="border-color: var(--cc-border) !important;">
          <div class="fw-bold small">${CC.escapeHtml(c.title)}</div>
          <div class="small" style="color: var(--cc-teal);">${CC.escapeHtml(c.date)} · ${CC.escapeHtml(c.clinician)}</div>
          <div class="small mt-1">${CC.escapeHtml(c.note)}</div>
        </div>
      `).join('');
    }
    if (testsEl) {
      testsEl.innerHTML = mh.tests.map((t) => `
        <div class="p-3 rounded border mb-2" style="border-color: var(--cc-border) !important;">
          <div class="fw-bold small">${CC.escapeHtml(t.title)}</div>
          <div class="small" style="color: var(--cc-teal);">${CC.escapeHtml(t.date)} · ${CC.escapeHtml(t.clinician)}</div>
          <div class="small mt-1">${CC.escapeHtml(t.note)}</div>
        </div>
      `).join('');
    }
    if (allergiesEl) {
      allergiesEl.innerHTML = mh.allergies.map((a) => `
        <div class="p-3 rounded border mb-2" style="border-color: var(--cc-border) !important;">
          <div class="fw-semibold small">${CC.escapeHtml(a.item)}</div>
          <div class="small" style="color: var(--cc-text-muted);">${CC.escapeHtml(a.note)}</div>
        </div>
      `).join('');
    }
    if (condEl) {
      condEl.innerHTML = mh.conditions.map((c) => `
        <div class="p-3 rounded border mb-2" style="border-color: var(--cc-border) !important;">
          <div class="fw-semibold small">${CC.escapeHtml(c.item)}</div>
          <div class="small" style="color: var(--cc-text-muted);">${CC.escapeHtml(c.note)}</div>
        </div>
      `).join('');
    }
    if (notesEl) {
      const notes = getHistoryNotes();
      notesEl.innerHTML = notes.map((n) => `
        <div class="p-3 rounded border mb-2" style="border-color: var(--cc-border) !important;">
          <div class="small fw-bold" style="color: var(--cc-teal);">${CC.escapeHtml(n.date)}</div>
          <div class="small">${CC.escapeHtml(n.text)}</div>
        </div>
      `).join('');
    }
    if (famEl) {
      famEl.innerHTML = mh.familyHistory.map((f) => `
        <div class="p-3 rounded border mb-2" style="border-color: var(--cc-border) !important;">
          <div class="fw-semibold small">${CC.escapeHtml(f.relation)}</div>
          <div class="small">${CC.escapeHtml(f.detail)}</div>
        </div>
      `).join('');
    }
  }

  /* ==========================================================================
     MODULE 7: MY PROFILE
     ========================================================================== */
  function renderProfileModule() {
    const p = getProfile();
    document.getElementById('profFullName').value = p.fullName || '';
    document.getElementById('profPatientId').value = p.patientId || '';
    document.getElementById('profDob').value = p.dob || '';
    document.getElementById('profPhone').value = p.phone || '';
    document.getElementById('profEmail').value = p.email || '';
    document.getElementById('profAddress').value = p.address || '';
    document.getElementById('profEmergencyName').value = p.emergencyContactName || '';
    document.getElementById('profEmergencyPhone').value = p.emergencyContactPhone || '';
  }

  function initProfileForm() {
    const form = document.getElementById('dashProfileForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fullName = document.getElementById('profFullName').value.trim();
      const phone = document.getElementById('profPhone').value.trim();
      const email = document.getElementById('profEmail').value.trim();
      const errBox = document.getElementById('dashProfError');
      const okBox = document.getElementById('dashProfSuccess');

      if (fullName.length < 2 || !/^[+\d\s\-()]{7,20}$/.test(phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errBox.textContent = 'Please provide a valid full name, phone number, and email address.';
        errBox.classList.remove('d-none');
        okBox.classList.add('d-none');
        return;
      }

      errBox.classList.add('d-none');
      const existing = getProfile();
      const initials = fullName.split(/\s+/).slice(0, 2).map((w) => w[0] ? w[0].toUpperCase() : '').join('') || 'DP';
      const updated = {
        ...existing,
        fullName,
        initials,
        dob: document.getElementById('profDob').value,
        phone,
        email,
        address: document.getElementById('profAddress').value.trim(),
        emergencyContactName: document.getElementById('profEmergencyName').value.trim(),
        emergencyContactPhone: document.getElementById('profEmergencyPhone').value.trim()
      };
      saveProfile(updated);
      syncProfileHeader();
      okBox.classList.remove('d-none');
      CC.showToast('Demo profile updated.', 'success');
    });

    const cancelBtn = document.getElementById('dashProfCancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        renderProfileModule();
        document.getElementById('dashProfError').classList.add('d-none');
        document.getElementById('dashProfSuccess').classList.add('d-none');
      });
    }
  }

  /* ==========================================================================
     MODULE 8: NOTIFICATIONS
     ========================================================================== */
  function renderNotificationsModule() {
    const listEl = document.getElementById('dashNotifsList');
    if (!listEl) return;
    const notifs = getNotifications();

    if (notifs.length === 0) {
      listEl.innerHTML = '<div class="cc-panel text-center py-4">No demonstration notifications remaining.</div>';
      return;
    }

    listEl.innerHTML = notifs.map((n) => `
      <div class="cc-notif-item ${n.read ? '' : 'unread'} mb-3">
        <div>
          <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
            <span class="cc-inhouse-badge">${CC.escapeHtml(n.category)}</span>
            <span class="small" style="color: var(--cc-text-muted);">${CC.escapeHtml(n.time)}</span>
            ${n.read ? '' : '<span class="cc-demo-badge">Unread</span>'}
          </div>
          <div class="fw-bold small mb-1">${CC.escapeHtml(n.title)}</div>
          <p class="small mb-0">${CC.escapeHtml(n.message)}</p>
        </div>
        <button type="button" class="btn-cc-outline btn-cc-sm text-nowrap" data-notif-toggle="${n.id}">
          ${n.read ? 'Mark Unread' : 'Mark as Read'}
        </button>
      </div>
    `).join('');
  }

  /* ==========================================================================
     GLOBAL DASHBOARD EVENTS & LOGOUT
     ========================================================================== */
  function bindDashboardEvents() {
    // Sidebar & Quick Action module switches
    document.addEventListener('click', function (e) {
      const modBtn = e.target.closest('[data-dash-module]');
      if (modBtn) {
        e.preventDefault();
        switchModule(modBtn.getAttribute('data-dash-module'));
        return;
      }

      // Appointments actions
      const viewAptBtn = e.target.closest('[data-apt-view]');
      if (viewAptBtn) {
        const apt = getAppointments().find((a) => a.id === viewAptBtn.getAttribute('data-apt-view'));
        if (apt) {
          CC.showToast(`${apt.id}: ${apt.type} with ${apt.doctorName} on ${apt.date} (${apt.status})`, 'success');
        }
        return;
      }

      const cancelAptBtn = e.target.closest('[data-apt-cancel]');
      if (cancelAptBtn) {
        const id = cancelAptBtn.getAttribute('data-apt-cancel');
        const list = getAppointments().map((a) => a.id === id ? { ...a, status: 'Cancelled (demo)' } : a);
        saveAppointments(list);
        renderAppointmentsModule();
        CC.showToast(`Demo appointment ${id} marked Cancelled.`, 'success');
        return;
      }

      const reschedBtn = e.target.closest('[data-apt-reschedule]');
      if (reschedBtn) {
        const id = reschedBtn.getAttribute('data-apt-reschedule');
        const apt = getAppointments().find((a) => a.id === id);
        if (apt && window.bootstrap) {
          document.getElementById('reschedAptId').value = apt.id;
          const reschedDate = document.getElementById('reschedDate');
          reschedDate.min = new Date(Date.now() + 86400000).toISOString().split('T')[0];
          reschedDate.value = apt.date;
          document.getElementById('reschedTime').value = apt.time;
          window.bootstrap.Modal.getOrCreateInstance(document.getElementById('ccRescheduleModal')).show();
        }
        return;
      }

      // ECG actions
      const ecgView = e.target.closest('[data-ecg-view]');
      if (ecgView) {
        openEcgViewer(ecgView.getAttribute('data-ecg-view'));
        return;
      }
      const ecgDl = e.target.closest('[data-ecg-dl]');
      if (ecgDl) {
        const rep = DATA.demoEcgReports.find((r) => r.id === ecgDl.getAttribute('data-ecg-dl'));
        if (rep) {
          downloadSampleDocument(`${rep.id}-sample.txt`, rep.name, [`Report ID: ${rep.id}`, `Test Date: ${rep.date}`, `Doctor: ${rep.doctor}`]);
        }
        return;
      }

      // Test report actions
      const testView = e.target.closest('[data-test-view]');
      if (testView) {
        openTestViewer(testView.getAttribute('data-test-view'));
        return;
      }
      const testDl = e.target.closest('[data-test-dl]');
      if (testDl) {
        const rep = DATA.demoTestReports.find((r) => r.id === testDl.getAttribute('data-test-dl'));
        if (rep) {
          downloadSampleDocument(`${rep.id}-sample.txt`, rep.name, [`Category: ${rep.category}`, `Test Date: ${rep.date}`, `Doctor: ${rep.doctor}`]);
        }
        return;
      }

      // Medication actions
      const medTaken = e.target.closest('[data-med-taken]');
      if (medTaken) {
        const med = getMedications().find((m) => m.id === medTaken.getAttribute('data-med-taken'));
        if (med) {
          const hist = getMedHistory();
          hist.unshift({ id: 'HIST-' + Date.now(), name: med.name, takenAt: new Date().toLocaleString() + ' (Demo)' });
          saveMedHistory(hist);
          renderMedicationsModule();
          CC.showToast(`Marked "${med.name}" as taken in demo log.`, 'success');
        }
        return;
      }
      const medEdit = e.target.closest('[data-med-edit]');
      if (medEdit) {
        const med = getMedications().find((m) => m.id === medEdit.getAttribute('data-med-edit'));
        if (med) {
          document.getElementById('medEditId').value = med.id;
          document.getElementById('medName').value = med.name;
          document.getElementById('medDosage').value = med.dosage;
          document.getElementById('medFrequency').value = med.frequency;
          document.getElementById('medTime').value = med.time;
          document.getElementById('medStart').value = med.startDate;
          document.getElementById('medEnd').value = med.endDate || '';
          document.getElementById('medNotes').value = med.notes || '';
          document.getElementById('medSubmitBtn').textContent = 'Update Reminder';
          document.getElementById('dashMedForm').scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      const medDel = e.target.closest('[data-med-del]');
      if (medDel) {
        const id = medDel.getAttribute('data-med-del');
        saveMedications(getMedications().filter((m) => m.id !== id));
        renderMedicationsModule();
        CC.showToast('Demo reminder deleted.', 'success');
        return;
      }

      // Notification toggle
      const notifToggle = e.target.closest('[data-notif-toggle]');
      if (notifToggle) {
        const id = notifToggle.getAttribute('data-notif-toggle');
        const list = getNotifications().map((n) => n.id === id ? { ...n, read: !n.read } : n);
        saveNotifications(list);
        syncProfileHeader();
        renderNotificationsModule();
        return;
      }
    });

    // Reschedule modal submit
    const reschedForm = document.getElementById('ccRescheduleForm');
    if (reschedForm) {
      reschedForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = document.getElementById('reschedAptId').value;
        const newDate = document.getElementById('reschedDate').value;
        const newTime = document.getElementById('reschedTime').value;
        const list = getAppointments().map((a) => a.id === id ? { ...a, date: newDate, time: newTime, status: 'Confirmed (demo)' } : a);
        saveAppointments(list);
        window.bootstrap.Modal.getOrCreateInstance(document.getElementById('ccRescheduleModal')).hide();
        renderAppointmentsModule();
        CC.showToast(`Demo appointment ${id} rescheduled to ${newDate} at ${newTime}.`, 'success');
      });
    }

    // Test Reports Search & Filters
    ['testSearchInput', 'testCategoryFilter', 'testDateFilter'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', renderTestsModule);
    });
    const clearFilterBtn = document.getElementById('testClearFilterBtn');
    if (clearFilterBtn) {
      clearFilterBtn.addEventListener('click', () => {
        document.getElementById('testSearchInput').value = '';
        document.getElementById('testCategoryFilter').value = 'all';
        document.getElementById('testDateFilter').value = '';
        renderTestsModule();
      });
    }

    // Add Demo History Note
    const noteForm = document.getElementById('dashAddHistoryNoteForm');
    if (noteForm) {
      noteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.getElementById('histNewNoteInput');
        const val = input.value.trim();
        if (!val) return;
        const notes = getHistoryNotes();
        notes.unshift({ date: new Date().toISOString().split('T')[0], text: val + ' (Patient Demo Note)' });
        saveHistoryNotes(notes);
        input.value = '';
        renderHistoryModule();
        CC.showToast('Demo note added to Medical History.', 'success');
      });
    }

    // Notifications Mark All / Clear
    const markAllBtn = document.getElementById('notifMarkAllBtn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        saveNotifications(getNotifications().map((n) => ({ ...n, read: true })));
        syncProfileHeader();
        renderNotificationsModule();
      });
    }
    const clearNotifBtn = document.getElementById('notifClearAllBtn');
    if (clearNotifBtn) {
      clearNotifBtn.addEventListener('click', () => {
        saveNotifications([]);
        syncProfileHeader();
        renderNotificationsModule();
        CC.showToast('Demo notifications cleared.', 'success');
      });
    }

    // Mobile Drawer Toggle
    const drawerBtn = document.getElementById('ccDashDrawerBtn');
    const sidebar = document.getElementById('ccDashSidebar');
    const backdrop = document.getElementById('ccDashBackdrop');
    const closeDrawerBtn = document.getElementById('ccDashCloseDrawerBtn');
    if (drawerBtn && sidebar && backdrop) {
      drawerBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('open');
      });
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
      });
      if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', () => {
          sidebar.classList.remove('open');
          backdrop.classList.remove('open');
        });
      }
    }

    // Logout Buttons
    document.querySelectorAll('[data-dash-logout]').forEach((btn) => {
      btn.addEventListener('click', () => {
        try {
          localStorage.removeItem(CC.KEYS.DEMO_SESSION);
        } catch (e) {}
        CC.showToast('Logged out of Demo Patient Portal.', 'success');
        setTimeout(() => { window.location.href = 'login.html'; }, 350);
      });
    });

    // Re-render Chart cleanly on theme change
    window.addEventListener('cardiocare:themechange', () => {
      if (currentModule === 'overview') {
        renderOverviewChart(getAppointments(), getMedications());
      }
    });

    // Update topbar title cleanly when RTL/LTR changes
    window.addEventListener('cardiocare:dirchange', () => {
      updateTopbarTitle(currentModule);
    });
  }

  function initDashboard() {
    if (!document.getElementById('ccDashShell')) return;
    syncProfileHeader();
    initAppointmentForm();
    initMedicationForm();
    initProfileForm();
    bindDashboardEvents();
    switchModule('overview');
  }

  window.CardioCareDash = { switchModule };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }
})(window);

