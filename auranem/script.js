(() => {
  const LP_CONFIG = {
    variant: "A", // A or B
    headlines: {
      A: "Weniger Supplement-Chaos. Mehr tägliche Balance mit System.",
      B: "30 Tage klare Routine — für mehr Konstanz im Alltag."
    },
    primaryCta: {
      A: "Jetzt 30-Tage-Routine sichern",
      B: "30-Tage Starter entdecken"
    },
    finalCta: {
      A: "Jetzt Daily Balance starten",
      B: "Starter heute auswählen"
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
  if (h) h.textContent = LP_CONFIG.headlines[v] || LP_CONFIG.headlines.A;
  if (heroCta) heroCta.textContent = LP_CONFIG.primaryCta[v] || LP_CONFIG.primaryCta.A;
  if (finalCta) finalCta.textContent = LP_CONFIG.finalCta[v] || LP_CONFIG.finalCta.A;

  document.querySelectorAll('[data-analytics="cta-primary"]').forEach((el) => {
    el.addEventListener("click", () => track("cta_primary_click", { ctaName: el.dataset.ctaName || "unknown", variant: v }));
  });

  document.querySelectorAll('[data-analytics="cta-secondary"]').forEach((el) => {
    el.addEventListener("click", () => track("cta_secondary_click", { ctaName: el.dataset.ctaName || "unknown", variant: v }));
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
  track("lp_loaded", { variant: v });
})();
