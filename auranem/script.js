(() => {
  const LP_CONFIG = {
    variant: "A", // A or B fallback
    headlines: {
      A: "Weniger Supplement-Chaos. Mehr tägliche Balance mit System.",
      B: "30 Tage klare Routine — für mehr Konstanz im Alltag."
    },
    primaryCta: {
      A: "Starter unverbindlich ansehen",
      B: "30-Tage Starter unverbindlich entdecken"
    },
    finalCta: {
      A: "Starter unverbindlich ansehen",
      B: "Starter transparent auswählen"
    },
    angles: {
      routine_chaos: {
        eyebrow: "Für übervolle Tage · 30-Tage-Routine",
        headline: "Wenn dein Alltag chaotisch ist: mach deine Supplement-Routine idiotensicher.",
        subcopy: "AURANEM strukturiert deinen Start in klare, wiederholbare Schritte — damit du nicht jeden Tag neu entscheiden musst.",
        heroCta: "Chaos in Routine verwandeln",
        finalCta: "Starter für chaotische Wochen ansehen",
        mobileCta: "Routine statt Chaos starten"
      },
      clarity_daily: {
        eyebrow: "Daily Clarity Mode · 30 Tage",
        headline: "Mehr Klarheit im Tag beginnt mit einer klaren Routine.",
        subcopy: "Der Starter reduziert Entscheidungslast mit einer einfachen 30-Tage-Struktur für konstante Umsetzung.",
        heroCta: "Tägliche Klarheit aufbauen",
        finalCta: "Starter für Daily Clarity öffnen",
        mobileCta: "Klarheit jetzt starten"
      },
      premium_trust: {
        eyebrow: "Premium Trust Setup · 30 Tage",
        headline: "Premium Anspruch, transparent kommuniziert.",
        subcopy: "Für Erwachsene, die Qualität, klare Preislogik und verantwortungsvolle Produktkommunikation erwarten.",
        heroCta: "Premium-Starter prüfen",
        finalCta: "Transparente Starter-Details ansehen",
        mobileCta: "Premium-Starter ansehen"
      }
    }
  };

  const params = new URLSearchParams(window.location.search);
  const requestedAngle = params.get("angle");
  const activeAngle = requestedAngle && LP_CONFIG.angles[requestedAngle] ? requestedAngle : null;

  const track = (event, payload = {}) => {
    const detail = { event, ts: Date.now(), ...payload };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    console.log("[LP_TRACK]", detail);
  };

  const v = LP_CONFIG.variant;
  const defaultCopy = {
    headline: LP_CONFIG.headlines[v] || LP_CONFIG.headlines.A,
    heroCta: LP_CONFIG.primaryCta[v] || LP_CONFIG.primaryCta.A,
    finalCta: LP_CONFIG.finalCta[v] || LP_CONFIG.finalCta.A
  };
  const angleCopy = activeAngle ? LP_CONFIG.angles[activeAngle] : null;

  const eyebrow = document.getElementById("ab-eyebrow");
  const h = document.getElementById("ab-headline");
  const sub = document.getElementById("ab-subcopy");
  const heroCta = document.getElementById("ab-primary-cta");
  const finalCta = document.getElementById("ab-final-cta");
  const mobileCta = document.getElementById("ab-mobile-cta");

  if (eyebrow && angleCopy?.eyebrow) eyebrow.textContent = angleCopy.eyebrow;
  if (h) h.textContent = angleCopy?.headline || defaultCopy.headline;
  if (sub && angleCopy?.subcopy) sub.textContent = angleCopy.subcopy;
  if (heroCta) heroCta.textContent = angleCopy?.heroCta || defaultCopy.heroCta;
  if (finalCta) finalCta.textContent = angleCopy?.finalCta || defaultCopy.finalCta;
  if (mobileCta && angleCopy?.mobileCta) mobileCta.textContent = angleCopy.mobileCta;

  document.querySelectorAll('[data-analytics="cta-primary"]').forEach((el) => {
    el.addEventListener("click", () => track("cta_primary_click", { ctaName: el.dataset.ctaName || "unknown", variant: v, angle: activeAngle || "default" }));
  });

  document.querySelectorAll('[data-analytics="cta-secondary"]').forEach((el) => {
    el.addEventListener("click", () => track("cta_secondary_click", { ctaName: el.dataset.ctaName || "unknown", variant: v, angle: activeAngle || "default" }));
  });

  document.querySelectorAll('details[data-analytics="faq-item"]').forEach((el) => {
    el.addEventListener("toggle", () => {
      if (el.open) track("faq_expand", { faqId: el.dataset.faqId || "unknown", variant: v, angle: activeAngle || "default" });
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
        track("scroll_depth", { depth: cp, variant: v, angle: activeAngle || "default" });
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  track("lp_loaded", { variant: v, angle: activeAngle || "default" });
})();
