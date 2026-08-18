/* ==========================================================================
   EXACT 1.PNG RUNLAYER EDITORIAL INTERACTION ENGINE (WITH ORANGE ACCENTS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // TOP ANNOUNCEMENT BAR & FLOATING BADGE CLOSE
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
  // 2. HERO GENERATIVE SOUNDWAVE CANVAS (With subtle warm gradient depth)
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('heroWaveCanvas');
  let ctx = canvas ? canvas.getContext('2d') : null;
  let phase = 0;

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);
    if (ctx) ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function renderExactHeroSoundwave() {
    if (!canvas || !ctx) return;
    const w = canvas.getBoundingClientRect().width;
    const h = canvas.getBoundingClientRect().height;

    ctx.clearRect(0, 0, w, h);
    phase += 0.025;

    const centerY = h / 2;
    const numVerticalLines = 84;
    const spacing = 3.8;
    const startX = 20;

    // 1. Draw Vertical Waveform Tick Lines
    for (let i = 0; i < numVerticalLines; i++) {
      const x = startX + i * spacing;
      const norm = i / numVerticalLines;
      
      const envelope = Math.sin(norm * Math.PI);
      const wave = Math.sin(i * 0.28 + phase * 1.5) * 0.6 + Math.cos(i * 0.12 - phase) * 0.4;
      
      let lineHalfHeight = (wave * 58 + 16) * Math.pow(envelope, 1.2);
      lineHalfHeight = Math.max(2, lineHalfHeight);

      // Transition from warm orange accent in the core to dark charcoal
      const isCore = Math.abs(i - numVerticalLines * 0.45) < 12;
      ctx.strokeStyle = isCore ? '#ea580c' : '#1e293b';
      ctx.lineWidth = 1;

      const alpha = 0.25 + 0.75 * envelope;
      ctx.globalAlpha = alpha;

      ctx.beginPath();
      ctx.moveTo(x, centerY - lineHalfHeight);
      ctx.lineTo(x, centerY + lineHalfHeight);
      ctx.stroke();
    }

    // 2. Draw Horizontal Parallel Rays extending to the Right
    const rayStartX = startX + (numVerticalLines * spacing) * 0.55;
    const rayEndX = w - 10;
    const numHorizontalRays = 18;
    const raySpacing = 3.2;

    for (let j = -numHorizontalRays / 2; j <= numHorizontalRays / 2; j++) {
      const y = centerY + j * raySpacing;
      const rayAlpha = Math.max(0.12, 1 - Math.abs(j) / (numHorizontalRays / 2) * 0.85);

      ctx.strokeStyle = Math.abs(j) < 3 ? '#ea580c' : '#334155';
      ctx.globalAlpha = rayAlpha * 0.9;
      ctx.beginPath();
      ctx.moveTo(rayStartX, y);
      ctx.lineTo(rayEndX, y);
      ctx.stroke();
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(renderExactHeroSoundwave);
  }

  renderExactHeroSoundwave();

  // --------------------------------------------------------------------------
  // 3. AI DIRECT ENGINE — INTERACTIVE FEATURE ACCORDION
  // --------------------------------------------------------------------------
  const featureItems = document.querySelectorAll('.feature-item');
  const previewTitle = document.getElementById('previewTitle');
  const subjectBox = document.getElementById('subjectBox');

  const titles = [
    'PRISM Engine — Live Autonomous Reframe [16:9 → 9:16]',
    'PRISM Engine — Dynamic Hook & Retention Analyzer',
    'PRISM Engine — Real-Time Secure Runtime Execution',
    'PRISM Engine — AI Spend & Usage Observability'
  ];

  featureItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      featureItems.forEach(f => f.classList.remove('active'));
      item.classList.add('active');

      if (previewTitle && titles[index]) {
        previewTitle.textContent = titles[index];
      }
    });
  });

  // Aspect ratio controls
  const aspectPills = document.querySelectorAll('.aspect-pill');
  aspectPills.forEach(pill => {
    pill.addEventListener('click', () => {
      aspectPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const ratio = pill.dataset.ratio;

      if (subjectBox) {
        if (ratio === '16-9') {
          subjectBox.style.width = '200px';
          subjectBox.style.height = '120px';
        } else if (ratio === '9-16') {
          subjectBox.style.width = '100px';
          subjectBox.style.height = '180px';
        } else if (ratio === '1-1') {
          subjectBox.style.width = '140px';
          subjectBox.style.height = '140px';
        } else if (ratio === '4-5') {
          subjectBox.style.width = '125px';
          subjectBox.style.height = '155px';
        }
      }
      showToast(`Viewport retargeted to ${pill.textContent}`);
    });
  });

  // --------------------------------------------------------------------------
  // 4. STUDIO INTEGRATIONS 3x3 APP GRID
  // --------------------------------------------------------------------------
  const appCards = document.querySelectorAll('.app-card');
  appCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.app-name')?.textContent || 'App';
      showToast(`Connected ${name} MCP server to gateway (Simulated)`);
    });
  });

  // --------------------------------------------------------------------------
  // 5. BENTO GRID 1: REFRAME SANDBOX
  // --------------------------------------------------------------------------
  const bentoRatioBtns = document.querySelectorAll('.bento-ratio-btn');
  const reframeFrame = document.getElementById('reframeFrame');

  bentoRatioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bentoRatioBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const ratioClass = btn.dataset.ratio;
      if (reframeFrame) {
        reframeFrame.className = `reframe-frame ${ratioClass}`;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. BENTO GRID 2: EQUALIZER & DUBBING
  // --------------------------------------------------------------------------
  const eqContainer = document.getElementById('eqBarsContainer');
  if (eqContainer) {
    const numEqBars = 24;
    for (let i = 0; i < numEqBars; i++) {
      const bar = document.createElement('div');
      bar.className = 'eq-bar';
      bar.style.height = `${Math.floor(Math.random() * 60) + 15}%`;
      eqContainer.appendChild(bar);
    }

    setInterval(() => {
      const bars = eqContainer.querySelectorAll('.eq-bar');
      bars.forEach(bar => {
        const h = Math.floor(Math.random() * 80) + 10;
        bar.style.height = `${h}%`;
      });
    }, 130);
  }

  const langPills = document.querySelectorAll('.lang-pill');
  langPills.forEach(pill => {
    pill.addEventListener('click', () => {
      langPills.forEach(l => l.classList.remove('active'));
      pill.classList.add('active');
      showToast(`Dub target: ${pill.textContent} (Simulated)`);
    });
  });

  const audioPreviewBtn = document.getElementById('audioPreviewBtn');
  const audioStatusLabel = document.getElementById('audioStatusLabel');
  let isDubbing = false;

  if (audioPreviewBtn && audioStatusLabel) {
    audioPreviewBtn.addEventListener('click', () => {
      isDubbing = !isDubbing;
      audioStatusLabel.textContent = isDubbing ? 'Dub Synthesized' : 'Simulate Dub';
      showToast(isDubbing ? 'Neural voice stem synthesized (Demo)' : 'Reset dub test');
    });
  }

  // --------------------------------------------------------------------------
  // 7. BENTO GRID 3: TERMINAL
  // --------------------------------------------------------------------------
  const typedCommand = document.getElementById('typedCommand');
  const promptChips = document.querySelectorAll('.prompt-chip');
  const terminalOutput = document.getElementById('terminalOutput');

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (!cmd || !typedCommand) return;
      typedCommand.textContent = cmd;
      if (terminalOutput) {
        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = `<span class="term-prompt">prism &gt;</span> <span>${cmd} — Demo Response OK</span>`;
        terminalOutput.appendChild(line);
      }
      showToast(`Ran simulated command: ${cmd}`);
    });
  });

  // --------------------------------------------------------------------------
  // 8. BENTO GRID 4: COUNT-UP METRICS
  // --------------------------------------------------------------------------
  const countUpElements = document.querySelectorAll('.count-up');
  let hasAnimatedCount = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimatedCount) {
        hasAnimatedCount = true;
        countUpElements.forEach(el => {
          const target = parseFloat(el.dataset.target || '0');
          const decimals = parseInt(el.dataset.decimals || '0', 10);
          const duration = 1400;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            el.textContent = currentVal.toFixed(decimals);

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target.toFixed(decimals);
            }
          }

          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsCard = document.getElementById('bentoMetricsCard');
  if (metricsCard) countObserver.observe(metricsCard);

  // --------------------------------------------------------------------------
  // 9. PRICING SWITCHER
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
  // 10. FAQ ACCORDION
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
  // 11. MODAL & TOAST
  // --------------------------------------------------------------------------
  const demoModal = document.getElementById('demoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const navBookBtn = document.getElementById('navBookBtn');
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

  navBookBtn?.addEventListener('click', openModal);
  modalCloseBtn?.addEventListener('click', closeModal);
  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) closeModal();
  });

  const heroForm = document.getElementById('heroEmailForm');
  heroForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('heroEmailInput')?.value;
    showToast(`Demo request simulated for ${email}!`);
  });

  const bottomForm = document.getElementById('bottomCtaForm');
  bottomForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('bottomEmailInput')?.value;
    showToast(`Portfolio demo access link generated!`);
  });

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();
    showToast('Simulated demo request received for portfolio showcase!');
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
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }
});
