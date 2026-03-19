(() => {
  const LP_CONFIG = {
    variant: "A", // A or B
    headlines: {
      A: "In 60 Sekunden zu deinem passenden Setup: Starter (30 Tage) oder Plus (60 Tage) — kein Abo.",
      B: "30 Tage klare Struktur — damit Dranbleiben im Alltag leichter wird."
    },
    primaryCta: {
      A: "Starter Details prüfen (ab €89)",
      B: "Starter wählen & Preis prüfen (ab €89)"
    },
    finalCta: {
      A: "Starter Details prüfen (ab €89)",
      B: "Starter wählen & Preis prüfen (ab €89)"
    },
    ctaMicrocopy: {
      A: {
        hero: "Start in unter 2 Minuten: Starter oder Plus.",
        final: "Du springst zur passenden Variante und prüfst Preis & Inhalte vor der finalen Bestätigung."
      },
      B: {
        hero: "Wähle dein Paket in 2 Schritten und starte direkt.",
        final: "Klar wählen, einfach starten, strukturiert dranbleiben."
      }
    }
  };

  const track = (event, payload = {}) => {
    const detail = { event, ts: Date.now(), ...payload };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    console.log("[LP_TRACK]", detail);
  };

  const v = LP_CONFIG.variant;
  const h = document.getElementById("ab-headline");
  const heroCta = document.getElementById("ab-primary-cta");
  const finalCta = document.getElementById("ab-final-cta");
  const heroMicro = document.getElementById("hero-cta-micro");
  const finalMicro = document.getElementById("final-cta-micro");

  if (h) h.textContent = LP_CONFIG.headlines[v] || LP_CONFIG.headlines.A;
  if (heroCta) heroCta.textContent = LP_CONFIG.primaryCta[v] || LP_CONFIG.primaryCta.A;
  if (finalCta) finalCta.textContent = LP_CONFIG.finalCta[v] || LP_CONFIG.finalCta.A;
  if (heroMicro) heroMicro.textContent = (LP_CONFIG.ctaMicrocopy[v] || LP_CONFIG.ctaMicrocopy.A).hero;
  if (finalMicro) finalMicro.textContent = (LP_CONFIG.ctaMicrocopy[v] || LP_CONFIG.ctaMicrocopy.A).final;

  document.querySelectorAll('[data-analytics="cta-primary"]').forEach((el) => {
    el.addEventListener("click", () => track("cta_primary_click", {
      ctaName: el.dataset.ctaName || "unknown",
      angle: el.dataset.angle || "default",
      variant: v
    }));
  });

  document.querySelectorAll('[data-analytics="cta-secondary"]').forEach((el) => {
    el.addEventListener("click", () => track("cta_secondary_click", {
      ctaName: el.dataset.ctaName || "unknown",
      angle: el.dataset.angle || "default",
      variant: v
    }));
  });

  document.querySelectorAll('details[data-analytics="faq-item"]').forEach((el) => {
    el.addEventListener("toggle", () => {
      if (el.open) track("faq_expand", { faqId: el.dataset.faqId || "unknown", variant: v });
    });
  });

  const checkpoints = [25, 50, 75, 100];
  const fired = new Set();
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const depth = Math.round((window.scrollY / scrollable) * 100);

    checkpoints.forEach((cp) => {
      if (depth >= cp && !fired.has(cp)) {
        fired.add(cp);
        track("scroll_depth", { depth: cp, variant: v });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  const fitSelector = document.getElementById('offer-fit-selector');
  const fitButtons = document.querySelectorAll('.offer-fit-btn');
  const fitResult = document.getElementById('offer-fit-result');
  const fitCta = document.getElementById('offer-fit-cta');
  const fitContent = {
    starter: {
      text: "Starter für einen klaren 30-Tage-Einstieg ohne Abo-Bindung.",
      href: "#offer-starter",
      cta: "Empfehlung öffnen: Starter →",
      ctaName: "offer_fit_recommendation_starter"
    },
    plus: {
      text: "Plus, wenn du bereits mit 8 Wochen Kontinuität planst und Nachkauf-Reibung reduzieren willst.",
      href: "#offer-plus",
      cta: "Empfehlung öffnen: Plus →",
      ctaName: "offer_fit_recommendation_plus"
    }
  };

  const setFitSelection = (target = 'starter', shouldTrack = false) => {
    if (!fitSelector || !fitButtons.length || !fitResult || !fitCta) return;

    const normalizedTarget = target === 'plus' ? 'plus' : 'starter';
    const selected = fitContent[normalizedTarget] || fitContent.starter;

    fitButtons.forEach((btn) => {
      btn.classList.toggle('is-active', (btn.dataset.fitTarget || 'starter') === normalizedTarget);
    });

    fitResult.innerHTML = `<strong>Empfehlung:</strong> ${selected.text}`;
    fitCta.href = selected.href;
    fitCta.textContent = selected.cta;
    fitCta.dataset.ctaName = selected.ctaName;
    highlightFinalPlan(normalizedTarget);

    if (shouldTrack) {
      track('offer_fit_select', { target: normalizedTarget, variant: v });
    }
  };

  if (fitSelector && fitButtons.length && fitResult && fitCta) {
    fitButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        setFitSelection(btn.dataset.fitTarget || 'starter', true);
      });
    });
  }

  const planIntentLinks = document.querySelectorAll('[data-plan-intent]');
  const finalPlanContext = document.getElementById('final-plan-context');
  const finalStarterCta = document.getElementById('ab-final-cta');
  const finalPlusCta = document.getElementById('final-plus-choice');
  const offerStarterCard = document.getElementById('offer-starter');
  const offerPlusCard = document.getElementById('offer-plus');
  const heroPrimaryCta = document.getElementById('ab-primary-cta');
  const navPrimaryCta = document.querySelector('[data-cta-name="nav_primary_starter"]');
  const mobilePrimaryCta = document.querySelector('[data-cta-name="mobile_sticky_starter"]');
  const desktopPrimaryCta = document.querySelector('[data-cta-name="desktop_sticky_starter"]');

  const highlightOfferCards = (plan) => {
    if (!offerStarterCard || !offerPlusCard) return;
    const starterSelected = plan !== 'plus';

    offerStarterCard.classList.toggle('is-recommended', starterSelected);
    offerStarterCard.classList.toggle('is-dimmed', !starterSelected);
    offerPlusCard.classList.toggle('is-recommended', !starterSelected);
    offerPlusCard.classList.toggle('is-dimmed', starterSelected);
  };

  const syncPrimaryIntentCtas = (plan) => {
    const isPlus = plan === 'plus';
    const primaryHref = isPlus ? '#offer-plus' : '#offer-starter';
    const primaryText = isPlus ? 'Plus direkt öffnen (ab €149)' : 'Starter direkt öffnen (ab €89)';

    if (heroPrimaryCta) {
      heroPrimaryCta.href = primaryHref;
      heroPrimaryCta.textContent = primaryText;
      heroPrimaryCta.dataset.ctaName = isPlus ? 'hero_primary_plus' : 'hero_primary';
    }

    if (navPrimaryCta) {
      navPrimaryCta.href = primaryHref;
      navPrimaryCta.textContent = isPlus ? 'Plus ab €149' : 'Starter ab €89';
      navPrimaryCta.dataset.ctaName = isPlus ? 'nav_primary_plus_dynamic' : 'nav_primary_starter';
    }

    if (mobilePrimaryCta) {
      mobilePrimaryCta.href = primaryHref;
      mobilePrimaryCta.dataset.planIntent = isPlus ? 'plus' : 'starter';
    }

    if (desktopPrimaryCta) {
      desktopPrimaryCta.href = primaryHref;
      desktopPrimaryCta.dataset.planIntent = isPlus ? 'plus' : 'starter';
    }
  };

  const highlightFinalPlan = (plan) => {
    if (!finalStarterCta || !finalPlusCta || !finalPlanContext) return;

    finalStarterCta.classList.toggle('is-plan-selected', plan === 'starter');
    finalPlusCta.classList.toggle('is-plan-selected', plan === 'plus');

    finalPlanContext.textContent = plan === 'plus'
      ? 'Deine Vorauswahl: Plus. Prüfe jetzt Preis und Inhalte im finalen Schritt.'
      : 'Deine Vorauswahl: Starter. Prüfe jetzt Preis und Inhalte im finalen Schritt.';

    highlightOfferCards(plan);
    syncPrimaryIntentCtas(plan);
  };

  if (planIntentLinks.length) {
    planIntentLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const plan = link.dataset.planIntent === 'plus' ? 'plus' : 'starter';
        highlightFinalPlan(plan);
        track('offer_plan_handoff', { plan, variant: v });
      });
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const urlPlan = urlParams.get('plan');
  const angle = urlParams.get('angle');

  const angleBasedPlan = (() => {
    if (angle === 'premium_trust') return 'plus';
    if (angle === 'routine_chaos' || angle === 'clarity_daily') return 'starter';
    return null;
  })();

  const initialPlan = urlPlan === 'plus' || urlPlan === 'starter'
    ? urlPlan
    : (angleBasedPlan || 'starter');

  setFitSelection(initialPlan, false);

  if (initialPlan !== 'starter') {
    track('offer_plan_prefill', { plan: initialPlan, source: urlPlan ? 'plan_param' : 'angle_param', variant: v });
  }

  const stickyChooser = document.querySelector('.mobile-sticky-chooser');
  const desktopStickyChooser = document.querySelector('.desktop-sticky-chooser');
  const finalSection = document.getElementById('start');
  if (finalSection && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (stickyChooser) {
          stickyChooser.classList.toggle('is-hidden', entry.isIntersecting);
        }
        if (desktopStickyChooser) {
          desktopStickyChooser.classList.toggle('is-hidden', entry.isIntersecting);
        }
      });
    }, { threshold: 0.2 });
    io.observe(finalSection);
  }

  track("lp_loaded", { variant: v });
})();
