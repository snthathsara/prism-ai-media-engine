/* ==========================================================================
   PRISM — SWISS ARCHITECTURAL MINIMALIST INTERACTION & PRICING ENGINE
   Features: Fluid Elastic Navbar Blob, Asynchronous Scrollspy,
   3-Card Pricing Toggle (Monthly/Annual), Theme Switcher, HUD Tabs, Modals.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // 2. THEME SWITCHER (Strict Monochrome / Orange Light & Dark Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('prism-theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlRoot.classList.remove('dark');
      htmlRoot.classList.add('light');
    } else {
      htmlRoot.classList.remove('light');
      htmlRoot.classList.add('dark');
    }
    localStorage.setItem('prism-theme', theme);
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = htmlRoot.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} mode`);
  });

  // --------------------------------------------------------------------------
  // 3. FLUID ELASTIC NAVBAR BLOB & ASYNCHRONOUS SCROLLSPY
  // --------------------------------------------------------------------------
  const capsuleNav = document.getElementById('capsuleNav');
  const navActiveBlob = document.getElementById('navActiveBlob');
  const navLinks = document.querySelectorAll('.capsule-nav .capsule-link');

  function updateNavBlob() {
    const activeLink = document.querySelector('.capsule-nav .capsule-link.active');
    if (activeLink && navActiveBlob && capsuleNav) {
      const leftOffset = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;
      navActiveBlob.style.transform = `translateX(${leftOffset - 4}px)`;
      navActiveBlob.style.width = `${width}px`;
    }
  }

  // Initial Blob Placement
  setTimeout(updateNavBlob, 60);
  window.addEventListener('resize', updateNavBlob, { passive: true });

  // Scrollspy Observer
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.dataset.section === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        updateNavBlob();
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // Smooth Scroll on Link Clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetEl = document.getElementById(targetId);

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateNavBlob();

      if (targetEl) {
        const topOffset = targetEl.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. HERO SHOWCASE HUD MODEL TABS
  // --------------------------------------------------------------------------
  const hudTabs = document.querySelectorAll('.hud-tab');
  const hudClusterTag = document.getElementById('hudClusterTag');
  const neuralWavePath = document.getElementById('neuralWavePath');

  const hudData = {
    prores: {
      cluster: 'Cluster 04 // US-East (ProRes 4444 XQ Active)',
      path: 'M 0 110 Q 100 30, 200 110 T 400 110 T 600 110 T 800 110'
    },
    dubbing: {
      cluster: 'Cluster 08 // EU-Central (40+ Dialects Synchronized)',
      path: 'M 0 110 Q 80 10, 160 110 T 320 110 T 480 110 T 640 110 T 800 110'
    },
    reframe: {
      cluster: 'Cluster 02 // AP-East (Auto 9:16 Bounding Lock)',
      path: 'M 0 110 Q 120 50, 240 110 T 480 110 T 720 110 T 800 110'
    },
    synthesis: {
      cluster: 'Cluster 11 // US-West (Neural Scene Inpainting)',
      path: 'M 0 110 Q 60 20, 120 110 T 240 110 T 360 110 T 480 110 T 600 110 T 720 110 T 800 110'
    }
  };

  hudTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      hudTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const modelKey = tab.dataset.model;
      const data = hudData[modelKey];
      if (data) {
        if (hudClusterTag) hudClusterTag.textContent = data.cluster;
        if (neuralWavePath) neuralWavePath.setAttribute('d', data.path);
        showToast(`Model parameter switched: ${tab.textContent}`);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. 3-CARD PRICING SWITCHER (Monthly vs Annual with 20% Discount)
  // --------------------------------------------------------------------------
  const billingToggleBtn = document.getElementById('billingToggleBtn');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const priceVals = document.querySelectorAll('.price-val');
  const billingNotes = document.querySelectorAll('.billing-note');
  let isAnnual = true;

  function updatePricing() {
    if (billingToggleBtn) {
      if (isAnnual) {
        billingToggleBtn.classList.remove('monthly');
        annualLabel?.classList.add('active');
        monthlyLabel?.classList.remove('active');
      } else {
        billingToggleBtn.classList.add('monthly');
        annualLabel?.classList.remove('active');
        monthlyLabel?.classList.add('active');
      }
    }

    priceVals.forEach(val => {
      const price = isAnnual ? val.dataset.annual : val.dataset.monthly;
      val.textContent = price;
    });

    billingNotes.forEach((note, idx) => {
      if (isAnnual) {
        const annualSums = ['$288/yr', '$768/yr', '$2,388/yr'];
        note.textContent = `Billed annually (${annualSums[idx] || ''})`;
      } else {
        note.textContent = 'Billed month-to-month';
      }
    });
  }

  billingToggleBtn?.addEventListener('click', () => {
    isAnnual = !isAnnual;
    updatePricing();
  });
  monthlyLabel?.addEventListener('click', () => { isAnnual = false; updatePricing(); });
  annualLabel?.addEventListener('click', () => { isAnnual = true; updatePricing(); });

  // --------------------------------------------------------------------------
  // 6. EDITORIAL FAQ ACCORDION
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-header-btn');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-header-btn')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. PRE-FOOTER RADAR FORM & MODAL HANDLERS
  // --------------------------------------------------------------------------
  const radarForm = document.getElementById('radarForm');
  radarForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const uri = document.getElementById('radarInput')?.value;
    showToast(`Feasibility audit passed for ${uri} (Latency: 8.4ms)`);
  });

  const deployModal = document.getElementById('deployModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const deployBtn = document.getElementById('deployBtn');
  const exploreCloudBtn = document.getElementById('exploreCloudBtn');
  const starterPlanBtn = document.getElementById('starterPlanBtn');
  const proPlanBtn = document.getElementById('proPlanBtn');
  const enterprisePlanBtn = document.getElementById('enterprisePlanBtn');
  const deployModalForm = document.getElementById('deployModalForm');

  function openModal() {
    if (deployModal) {
      deployModal.classList.add('open');
      deployModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (deployModal) {
      deployModal.classList.remove('open');
      deployModal.setAttribute('aria-hidden', 'true');
    }
  }

  deployBtn?.addEventListener('click', openModal);
  exploreCloudBtn?.addEventListener('click', openModal);
  starterPlanBtn?.addEventListener('click', openModal);
  proPlanBtn?.addEventListener('click', openModal);
  enterprisePlanBtn?.addEventListener('click', openModal);
  modalCloseBtn?.addEventListener('click', closeModal);
  deployModal?.addEventListener('click', (e) => {
    if (e.target === deployModal) closeModal();
  });

  deployModalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    showToast('Simulated cluster provisioning event triggered for portfolio showcase!');
  });

  // Floating Dismiss Badge
  const portfolioFloatingBadge = document.getElementById('portfolioFloatingBadge');
  const dismissBadgeBtn = document.getElementById('dismissBadgeBtn');
  dismissBadgeBtn?.addEventListener('click', () => {
    if (portfolioFloatingBadge) {
      portfolioFloatingBadge.classList.add('hidden');
    }
  });

  // Top Announcement Close
  const announcementBar = document.getElementById('announcementBar');
  const closeAnnouncementBtn = document.getElementById('closeAnnouncementBtn');
  closeAnnouncementBtn?.addEventListener('click', () => {
    if (announcementBar) {
      announcementBar.style.display = 'none';
    }
  });

  // Toast Function
  function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }
});
