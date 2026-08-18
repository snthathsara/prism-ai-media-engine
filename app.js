/* ==========================================================================
   PRISM — HIGH-PERFORMANCE INTERACTION & SCROLLSPY ENGINE
   Features: Asynchronous IntersectionObserver Scrollspy, Clean 2D Interactions,
   Theme Switcher, Dynamic Matrix, Pricing Switcher, Modals & Toast.
   Zero Continuous JS Loops • 100% Native Performance
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // 2. THEME SWITCHER (Dark Mode / Light Mode with Sun & Moon Icons)
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
  // 3. ZERO-LAG ASYNCHRONOUS SCROLLSPY (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sectionElements = document.querySelectorAll('section[id], .hero-dashboard-grid[id]');

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
      }
    });
  }, observerOptions);

  sectionElements.forEach(section => observer.observe(section));

  // Native Smooth Scroll on Nav Link Clicks with Offset
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetEl = document.getElementById(targetId);

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
  // 4. TOP ANNOUNCEMENT & FLOATING BADGE DISMISS
  // --------------------------------------------------------------------------
  const announcementBar = document.getElementById('announcementBar');
  const closeAnnouncementBtn = document.getElementById('closeAnnouncementBtn');
  closeAnnouncementBtn?.addEventListener('click', () => {
    if (announcementBar) {
      announcementBar.style.opacity = '0';
      announcementBar.style.maxHeight = '0';
      announcementBar.style.padding = '0';
      announcementBar.style.transition = 'all 0.3s ease';
      setTimeout(() => announcementBar.remove(), 300);
    }
  });

  const portfolioFloatingBadge = document.getElementById('portfolioFloatingBadge');
  const dismissBadgeBtn = document.getElementById('dismissBadgeBtn');
  dismissBadgeBtn?.addEventListener('click', () => {
    if (portfolioFloatingBadge) {
      portfolioFloatingBadge.classList.add('hidden');
    }
  });

  // --------------------------------------------------------------------------
  // 5. DYNAMIC MATRIX TAG SELECTOR (Workflow Section)
  // --------------------------------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const previewBadge = document.getElementById('previewBadge');
  const previewDesc = document.getElementById('previewDesc');

  const tagDetails = {
    strategy: {
      badge: 'Media Strategy',
      desc: 'Formulate predictive content release schedules and format retargeting strategies based on algorithmic viewer retention data.'
    },
    infra: {
      badge: 'Cloud Transcode',
      desc: 'Distributed GPU encoding clusters delivering real-time ProRes 4444 XQ and AV1 streams with sub-100ms pipeline latency.'
    },
    channels: {
      badge: 'Multi-Platform Retargeting',
      desc: 'Instantly conform raw timeline footage into 9:16 vertical shorts, 1:1 feeds, and 16:9 cinematic outputs with automatic subject framing.'
    },
    ai: {
      badge: 'Artificial Intelligence',
      desc: 'AI that saves hours of editing time, cuts compute costs, and automatically generates viral social cutdowns from long-form footage.'
    },
    render: {
      badge: 'Model Render & Synthesis',
      desc: 'Neural generative scene expansion, background inpainting, and zero-flicker frame interpolation powered by custom edge models.'
    },
    process: {
      badge: 'Process Optimization',
      desc: 'Streamline multi-camera synchronization, automated loudness mastering (-14 LUFS standard), and XML timeline roundtrips.'
    },
    auto: {
      badge: 'Studio Automation',
      desc: 'Trigger autonomous batch rendering from webhook events, cloud storage uploads, or scheduled calendar drops.'
    },
    growth: {
      badge: 'Retention Engine',
      desc: 'Detect the highest energy hooks in raw footage to create magnetic first 3-second openers that maximize viewer engagement.'
    }
  };

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const tagKey = pill.dataset.tag;
      const data = tagDetails[tagKey];
      if (data && previewBadge && previewDesc) {
        previewBadge.style.opacity = '0';
        previewDesc.style.opacity = '0';
        setTimeout(() => {
          previewBadge.textContent = data.badge;
          previewDesc.textContent = data.desc;
          previewBadge.style.opacity = '1';
          previewDesc.style.opacity = '1';
        }, 120);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. HERO AREA CHART TIME TABS
  // --------------------------------------------------------------------------
  const chartTabs = document.querySelectorAll('.chart-time-tabs .tab-item');
  chartTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showToast(`Viewing ${tab.textContent} throughput data`);
    });
  });

  // --------------------------------------------------------------------------
  // 7. PRICING SWITCHER (Monthly vs Annual with 20% Discount)
  // --------------------------------------------------------------------------
  const billingToggleBtn = document.getElementById('billingToggleBtn');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const priceVals = document.querySelectorAll('.price-val');
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

    const billingNotes = document.querySelectorAll('.billing-note');
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
  // 8. FAQ ACCORDION
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(f => {
        f.classList.remove('open');
        f.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 9. MODAL & TOAST HANDLERS
  // --------------------------------------------------------------------------
  const demoModal = document.getElementById('demoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const navGetStartedBtn = document.getElementById('navGetStartedBtn');
  const navRequestDemoBtn = document.getElementById('navRequestDemoBtn');
  const heroStartBtn = document.getElementById('heroStartBtn');
  const heroContactBtn = document.getElementById('heroContactBtn');
  const workflowControlBtn = document.getElementById('workflowControlBtn');
  const modalForm = document.getElementById('modalForm');

  function openModal() {
    if (demoModal) {
      demoModal.classList.add('open');
      demoModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (demoModal) {
      demoModal.classList.remove('open');
      demoModal.setAttribute('aria-hidden', 'true');
    }
  }

  navGetStartedBtn?.addEventListener('click', openModal);
  navRequestDemoBtn?.addEventListener('click', openModal);
  heroStartBtn?.addEventListener('click', openModal);
  heroContactBtn?.addEventListener('click', openModal);
  workflowControlBtn?.addEventListener('click', openModal);
  modalCloseBtn?.addEventListener('click', closeModal);
  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) closeModal();
  });

  const bottomForm = document.getElementById('bottomCtaForm');
  bottomForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('bottomEmailInput')?.value;
    showToast(`Access kit simulated for ${email}!`);
  });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    showToast('Simulated consultation request received for portfolio showcase!');
  });

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
