/**
 * CardioCare Demo Authentication & Registration Handler
 * IMPORTANT: Frontend demonstration only. Never stores real passwords or genuine patient health records.
 */
(function (window) {
  'use strict';

  const CC = window.CardioCare;
  const DATA = window.CARDIOCARE_DEMO;

  function initPasswordToggles() {
    document.querySelectorAll('[data-cc-toggle-pwd]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const targetId = this.getAttribute('data-cc-toggle-pwd');
        const input = document.getElementById(targetId);
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        const icon = this.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
          CC.refreshIcons();
        }
      });
    });
  }

  function initLoginPage() {
    const form = document.getElementById('ccLoginForm');
    if (!form) return;

    const identifierInput = document.getElementById('loginIdentifier');
    const passwordInput = document.getElementById('loginPassword');
    const rememberInput = document.getElementById('loginRemember');
    const errorBox = document.getElementById('loginError');
    const submitBtn = document.getElementById('loginSubmitBtn');
    const fillBtn = document.getElementById('fillDemoCredentialsBtn');

    // Restore non-sensitive remembered demo identifier
    const rememberedId = CC.readPref('cardiocare_demo_remember_id', '');
    if (rememberedId && identifierInput) {
      identifierInput.value = rememberedId;
      if (rememberInput) rememberInput.checked = true;
    }

    if (fillBtn) {
      fillBtn.addEventListener('click', function () {
        identifierInput.value = 'patient.demo@cardiocare.example';
        passwordInput.value = 'DemoPortal#2027';
        errorBox.classList.add('d-none');
      });
    }

    const forgotBtn = document.getElementById('forgotPasswordLink');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', function (e) {
        e.preventDefault();
        CC.showToast('Demo Mode: Click "Use Demo Account" to fill the seeded demonstration login.', 'success');
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const idVal = identifierInput.value.trim();
      const pwdVal = passwordInput.value;

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(idVal);
      const isPatientId = /^CC-[A-Z0-9\-]{4,16}$/i.test(idVal);

      if (!idVal || (!isEmail && !isPatientId)) {
        errorBox.textContent = 'Please enter a valid Email Address or Demo Patient ID (e.g., CC-DEMO-2048).';
        errorBox.classList.remove('d-none');
        return;
      }

      if (!pwdVal || pwdVal.length < 6) {
        errorBox.textContent = 'Password must be at least 6 characters for this frontend demo login.';
        errorBox.classList.remove('d-none');
        return;
      }

      errorBox.classList.add('d-none');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span>Signing in (Demo)...</span>';

      if (rememberInput && rememberInput.checked) {
        CC.writePref('cardiocare_demo_remember_id', idVal);
      } else {
        CC.writePref('cardiocare_demo_remember_id', '');
      }

      // Store ONLY non-sensitive demo session marker (never passwords)
      const existingProfile = CC.readDemoJSON(CC.KEYS.DEMO_PROFILE, DATA.demoPatient);
      CC.writeDemoJSON(CC.KEYS.DEMO_SESSION, {
        isDemoAuthenticated: true,
        patientId: existingProfile.patientId || 'CC-DEMO-2048',
        displayName: existingProfile.fullName || 'Jordan Mercer (Demo Patient)',
        loginAt: new Date().toISOString()
      });

      setTimeout(function () {
        window.location.href = 'dashboard.html';
      }, 550);
    });
  }

  function initRegisterPage() {
    const form = document.getElementById('ccRegisterForm');
    if (!form) return;

    const demoIdInput = document.getElementById('regPatientId');
    const generatedId = 'CC-DEMO-' + Math.floor(3000 + Math.random() * 6999);
    if (demoIdInput) demoIdInput.value = generatedId;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const fullName = document.getElementById('regFullName').value.trim();
      const dob = document.getElementById('regDob').value;
      const gender = document.getElementById('regGender').value;
      const phone = document.getElementById('regPhone').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const address = document.getElementById('regAddress').value.trim();
      const city = document.getElementById('regCity').value.trim();
      const emName = document.getElementById('regEmergencyName').value.trim();
      const emPhone = document.getElementById('regEmergencyPhone').value.trim();
      const pwd = document.getElementById('regPassword').value;
      const confirmPwd = document.getElementById('regConfirmPassword').value;
      const terms = document.getElementById('regTerms').checked;
      const errBox = document.getElementById('registerError');

      if (fullName.length < 2 || !dob || !address || !city || !emName) {
        errBox.textContent = 'Please complete all required personal, address, and emergency contact fields.';
        errBox.classList.remove('d-none');
        return;
      }
      if (!/^[+\d\s\-()]{7,20}$/.test(phone) || !/^[+\d\s\-()]{7,20}$/.test(emPhone)) {
        errBox.textContent = 'Please enter valid phone numbers for both your phone and emergency contact.';
        errBox.classList.remove('d-none');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errBox.textContent = 'Please enter a valid email address.';
        errBox.classList.remove('d-none');
        return;
      }
      if (pwd.length < 8) {
        errBox.textContent = 'Demo password must be at least 8 characters long.';
        errBox.classList.remove('d-none');
        return;
      }
      if (pwd !== confirmPwd) {
        errBox.textContent = 'Password and Confirm Password do not match.';
        errBox.classList.remove('d-none');
        return;
      }
      if (!terms) {
        errBox.textContent = 'Please acknowledge the demonstration portal terms and privacy notice.';
        errBox.classList.remove('d-none');
        return;
      }

      errBox.classList.add('d-none');

      const initials = fullName
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0] ? p[0].toUpperCase() : '')
        .join('') || 'DP';

      const demoProfile = {
        patientId: demoIdInput.value,
        fullName: fullName + ' (Demo)',
        initials: initials,
        dob: dob,
        gender: gender || 'Prefer not to specify',
        phone: phone,
        email: email,
        address: address,
        city: city,
        emergencyContactName: emName,
        emergencyContactPhone: emPhone,
        lastConsultation: 'None yet (New Demo Account)'
      };

      // Store ONLY non-sensitive demo UI profile (never store password)
      CC.writeDemoJSON(CC.KEYS.DEMO_PROFILE, demoProfile);
      CC.writeDemoJSON(CC.KEYS.DEMO_SESSION, {
        isDemoAuthenticated: true,
        patientId: demoProfile.patientId,
        displayName: demoProfile.fullName,
        loginAt: new Date().toISOString()
      });

      document.getElementById('regSuccessId').textContent = demoProfile.patientId;
      form.classList.add('d-none');
      document.getElementById('registerSuccessCard').classList.remove('d-none');
      CC.showToast('Demo patient account created!', 'success');
    });
  }

  function initAuth() {
    initPasswordToggles();
    initLoginPage();
    initRegisterPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
})(window);

