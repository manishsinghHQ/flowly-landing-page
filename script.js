/**
 * script.js — Flowly Landing Page
 *
 * Modules (each in its own init function):
 *   1. Theme toggle     — dark / light mode with localStorage persistence
 *   2. Navigation       — sticky-scroll shadow + hamburger mobile menu
 *   3. Scroll reveal    — IntersectionObserver fade-in on scroll
 *   4. FAQ accordion    — single-open accordion with keyboard support
 *   5. Modal            — sign-up modal open/close + focus trap
 *   6. Form validation  — modal signup form with password strength meter
 *   7. CTA form         — banner email form with validation
 *   8. Pricing CTAs     — pre-select plan in modal when pricing button clicked
 */

'use strict';

/* ═══════════════════════════════════════
   1. THEME TOGGLE
   Persists preference to localStorage.
   Applies [data-theme] on <html>.
   ═══════════════════════════════════════ */
function initThemeToggle() {
  const html    = document.documentElement;
  const btn     = document.getElementById('themeToggle');

  // Restore saved preference (default: dark)
  const saved = localStorage.getItem('flowly-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('flowly-theme', next);
  });
}


/* ═══════════════════════════════════════
   2. NAVIGATION
   - Adds box-shadow to nav on scroll
   - Hamburger toggles mobile drawer
   - Closes drawer when a link is clicked
   ═══════════════════════════════════════ */
function initNavigation() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen     = false;

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 1px 20px rgba(0,0,0,0.25)'
      : 'none';
  }, { passive: true });

  // Toggle mobile drawer
  function toggleMenu(open) {
    menuOpen = open;
    hamburger.classList.toggle('hamburger--open', open);
    mobileMenu.classList.toggle('mobile-menu--open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
  }

  hamburger.addEventListener('click', () => toggleMenu(!menuOpen));

  // Close on any link / button click inside menu
  mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) toggleMenu(false);
  });
}


/* ═══════════════════════════════════════
   3. SCROLL REVEAL
   Uses IntersectionObserver so elements
   fade + rise into view as they enter the
   viewport. Class .reveal is the trigger;
   .is-visible drives the CSS transition.
   ═══════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Stop watching once visible — no need to re-trigger
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach((el) => observer.observe(el));
}


/* ═══════════════════════════════════════
   4. FAQ ACCORDION
   One item open at a time.
   Keyboard: Enter / Space toggles.
   aria-expanded reflects open state.
   ═══════════════════════════════════════ */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  function toggleItem(item) {
    const isOpen    = item.classList.contains('faq-item--open');
    const question  = item.querySelector('.faq-question');

    // Close all items first
    items.forEach((i) => {
      i.classList.remove('faq-item--open');
      i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    // Open the clicked item (unless it was already open)
    if (!isOpen) {
      item.classList.add('faq-item--open');
      question?.setAttribute('aria-expanded', 'true');
    }
  }

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => toggleItem(item));

    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(item);
      }
    });
  });
}


/* ═══════════════════════════════════════
   5. MODAL
   Open / close with:
     - CTA buttons  (nav, hero, mobile nav)
     - Pricing plan buttons (pre-selects plan)
     - Close button, overlay click, Escape key
   Traps focus inside modal while open.
   Restores focus to trigger on close.
   ═══════════════════════════════════════ */
function initModal() {
  const overlay     = document.getElementById('modalOverlay');
  const modal       = document.getElementById('modal');
  const closeBtn    = document.getElementById('modalClose');
  const planSelect  = document.getElementById('signupPlan');

  let triggerEl = null; // Element that opened the modal (for focus restore)

  // Focusable elements inside modal (for focus trap)
  const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function openModal(plan = null) {
    overlay.classList.add('modal-overlay--visible');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // Pre-select a plan if provided
    if (plan && planSelect) {
      planSelect.value = plan.toLowerCase();
    }

    // Focus first input after transition
    setTimeout(() => {
      modal.querySelector('input')?.focus();
    }, 260);
  }

  function closeModal() {
    overlay.classList.remove('modal-overlay--visible');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus to element that triggered the modal
    triggerEl?.focus();
    triggerEl = null;
  }

  // Focus trap — prevent Tab from leaving the modal
  overlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusable = [...modal.querySelectorAll(FOCUSABLE)];
    const first     = focusable[0];
    const last      = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('modal-overlay--visible')) {
      closeModal();
    }
  });

  // Click outside modal to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  closeBtn.addEventListener('click', closeModal);

  // Wire up open triggers (nav CTA, hero CTA, mobile nav CTA)
  const openTriggers = [
    document.getElementById('navCta'),
    document.getElementById('heroCta'),
    document.getElementById('mobileNavCta'),
  ];

  openTriggers.forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      triggerEl = btn;
      openModal();
    });
  });

  // Expose openModal so pricing CTAs can call it with a plan
  window._flowlyOpenModal = (plan, trigger) => {
    triggerEl = trigger || null;
    openModal(plan);
  };

  // Success state close
  document.getElementById('modalSuccessClose')?.addEventListener('click', closeModal);
}


/* ═══════════════════════════════════════
   6. SIGN-UP FORM VALIDATION
   Validates: name, email, password.
   Shows inline errors on blur + submit.
   Password strength meter updates live.
   On success: shows modal success state.
   ═══════════════════════════════════════ */
function initSignupForm() {
  const form          = document.getElementById('signupForm');
  const nameInput     = document.getElementById('signupName');
  const emailInput    = document.getElementById('signupEmail');
  const passwordInput = document.getElementById('signupPassword');
  const togglePwBtn   = document.getElementById('togglePassword');
  const strengthFill  = document.getElementById('strengthFill');
  const strengthLabel = document.getElementById('strengthLabel');
  const submitBtn     = document.getElementById('signupSubmit');
  const successEl     = document.getElementById('modalSuccess');

  if (!form) return;

  // ── Helpers ──────────────────────────────
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  function setFieldState(input, errorEl, message) {
    if (message) {
      input.classList.add('is-error');
      input.classList.remove('is-valid');
      errorEl.textContent = message;
    } else {
      input.classList.remove('is-error');
      input.classList.add('is-valid');
      errorEl.textContent = '';
    }
  }

  // ── Field validators ──────────────────────
  function validateName() {
    const v = nameInput.value.trim();
    const err = document.getElementById('nameError');
    if (!v)           { setFieldState(nameInput, err, 'Name is required.'); return false; }
    if (v.length < 2) { setFieldState(nameInput, err, 'Name must be at least 2 characters.'); return false; }
    setFieldState(nameInput, err, null);
    return true;
  }

  function validateEmail() {
    const v = emailInput.value.trim();
    const err = document.getElementById('emailError');
    if (!v)              { setFieldState(emailInput, err, 'Email is required.'); return false; }
    if (!isValidEmail(v)){ setFieldState(emailInput, err, 'Please enter a valid email address.'); return false; }
    setFieldState(emailInput, err, null);
    return true;
  }

  function validatePassword() {
    const v = passwordInput.value;
    const err = document.getElementById('passwordError');
    if (!v)           { setFieldState(passwordInput, err, 'Password is required.'); return false; }
    if (v.length < 8) { setFieldState(passwordInput, err, 'Password must be at least 8 characters.'); return false; }
    setFieldState(passwordInput, err, null);
    return true;
  }

  // ── Password strength meter ───────────────
  function getStrength(pw) {
    let score = 0;
    if (pw.length >= 8)                   score++;
    if (pw.length >= 12)                  score++;
    if (/[A-Z]/.test(pw))                 score++;
    if (/[0-9]/.test(pw))                 score++;
    if (/[^A-Za-z0-9]/.test(pw))          score++;
    return score; // 0–5
  }

  const STRENGTH_MAP = [
    { label: '',        cls: '',                      width: '0%' },
    { label: 'Weak',    cls: 'strength-meter__fill--weak',   width: '25%' },
    { label: 'Fair',    cls: 'strength-meter__fill--fair',   width: '50%' },
    { label: 'Good',    cls: 'strength-meter__fill--good',   width: '75%' },
    { label: 'Good',    cls: 'strength-meter__fill--good',   width: '75%' },
    { label: 'Strong',  cls: 'strength-meter__fill--strong', width: '100%' },
  ];

  passwordInput.addEventListener('input', () => {
    const score  = getStrength(passwordInput.value);
    const config = STRENGTH_MAP[score];

    strengthFill.className = 'strength-meter__fill ' + config.cls;
    strengthFill.style.width = config.width;
    strengthLabel.textContent = config.label;
    strengthLabel.style.color = score >= 4 ? 'var(--green)' : score >= 3 ? 'var(--accent2)' : score >= 2 ? 'var(--amber)' : 'var(--coral)';
  });

  // ── Blur validation (validate on leave) ──
  nameInput.addEventListener('blur',     validateName);
  emailInput.addEventListener('blur',    validateEmail);
  passwordInput.addEventListener('blur', validatePassword);

  // ── Show / hide password ──────────────────
  togglePwBtn?.addEventListener('click', () => {
    const isText = passwordInput.type === 'text';
    passwordInput.type = isText ? 'password' : 'text';
    togglePwBtn.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
    togglePwBtn.textContent = isText ? '👁' : '🙈';
  });

  // ── Submit ────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ok = [validateName(), validateEmail(), validatePassword()].every(Boolean);
    if (!ok) return;

    // Simulate async submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account…';

    setTimeout(() => {
      // Show success state
      form.hidden = true;
      successEl.hidden = false;

      // Persist email to localStorage (demonstrates real feature usage)
      const email = emailInput.value.trim();
      localStorage.setItem('flowly-signup-email', email);
    }, 1200);
  });
}


/* ═══════════════════════════════════════
   7. CTA BANNER FORM VALIDATION
   Validates email inline before submit.
   Shows a success message on valid submit.
   ═══════════════════════════════════════ */
function initCtaForm() {
  const form      = document.getElementById('ctaForm');
  const input     = document.getElementById('ctaEmail');
  const errorEl   = document.getElementById('ctaEmailError');
  const successEl = document.getElementById('ctaSuccess');

  if (!form) return;

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  function validate() {
    const v = input.value.trim();
    if (!v) {
      input.classList.add('is-error');
      input.classList.remove('is-valid');
      errorEl.textContent = 'Please enter your email address.';
      return false;
    }
    if (!isValidEmail(v)) {
      input.classList.add('is-error');
      input.classList.remove('is-valid');
      errorEl.textContent = 'That doesn\'t look like a valid email.';
      return false;
    }
    input.classList.remove('is-error');
    input.classList.add('is-valid');
    errorEl.textContent = '';
    return true;
  }

  input.addEventListener('blur', validate);
  input.addEventListener('input', () => {
    // Clear error as user types (re-validate silently)
    if (input.classList.contains('is-error')) validate();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Persist email
    localStorage.setItem('flowly-cta-email', input.value.trim());

    // Show success
    form.hidden = true;
    successEl.hidden = false;
  });
}


/* ═══════════════════════════════════════
   8. PRICING CTAs — pre-select plan
   Clicking a pricing plan button opens
   the modal with that plan pre-selected.
   ═══════════════════════════════════════ */
function initPricingCtAs() {
  const planButtons = document.querySelectorAll('[data-plan]');

  planButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');  // "Starter" | "Pro" | "Enterprise"
      window._flowlyOpenModal?.(plan, btn);
    });
  });
}


/* ═══════════════════════════════════════
   BOOT — run all modules on DOMContentLoaded
   ═══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initScrollReveal();
  initFaqAccordion();
  initModal();
  initSignupForm();
  initCtaForm();
  initPricingCtAs();
});