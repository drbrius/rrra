/* ============================================================
   RAMSEIER VERLAG – Home Page
   Swiss Editorial Modernism:
   - Off-White (#F7F5F0) Hintergrund, Anthrazit Text, Signalrot Akzent
   - Playfair Display für Headlines, Source Sans 3 für Body
   - Asymmetrisches Layout, Sektionsnummern, rote Akzentlinien
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

// ─── Scroll-Animation Hook ────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv-fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Pricing Plans ────────────────────────────────────────────
const plans = [
  {
    id: "monthly",
    label: "Monatlich",
    freq: "1× pro Monat",
    price: "149",
    features: [
      "1 News-Artikel pro Monat",
      "Professionelles Redaktionslayout",
      "SEO-Optimierung inklusive",
      "Hosting & Domain-Verwaltung",
      "E-Mail-Benachrichtigung",
      "Monatlicher Bericht",
    ],
    highlight: false,
  },
  {
    id: "biweekly",
    label: "2× Monatlich",
    freq: "2× pro Monat",
    price: "249",
    features: [
      "2 News-Artikel pro Monat",
      "Professionelles Redaktionslayout",
      "SEO-Optimierung inklusive",
      "Hosting & Domain-Verwaltung",
      "Automatische Erinnerungs-E-Mails",
      "Monatlicher Bericht",
    ],
    highlight: false,
  },
  {
    id: "weekly",
    label: "Wöchentlich",
    freq: "4× pro Monat",
    price: "449",
    features: [
      "4 News-Artikel pro Monat",
      "Professionelles Redaktionslayout",
      "SEO-Optimierung inklusive",
      "Hosting & Domain-Verwaltung",
      "Automatische Erinnerungs-E-Mails",
      "Detaillierter Monatsreport",
      "Prioritäts-Support",
    ],
    highlight: true,
  },
  {
    id: "daily",
    label: "Täglich",
    freq: "20× pro Monat",
    price: "1'290",
    features: [
      "20 News-Artikel pro Monat",
      "Professionelles Redaktionslayout",
      "SEO-Optimierung inklusive",
      "Hosting & Domain-Verwaltung",
      "Vollautomatisierter Workflow",
      "Wöchentlicher Performance-Report",
      "Dedizierter Ansprechpartner",
      "KI-Bildgenerierung inklusive",
    ],
    highlight: false,
  },
];

// ─── Process Steps ────────────────────────────────────────────
const processSteps = [
  {
    num: "01",
    title: "Onboarding & Domain",
    desc: "Wir richten Ihre persönliche News-Domain ein (z.B. ihrafirma-news.ch), konfigurieren das Hosting und erstellen das individuelle Redaktionslayout in Ihrem Corporate Design.",
  },
  {
    num: "02",
    title: "Automatische Erinnerung",
    desc: "2 Tage vor dem vereinbarten Publikationstermin erhalten Sie automatisch eine E-Mail mit dem Formular. Sie füllen es aus, laden Bilder hoch – fertig.",
  },
  {
    num: "03",
    title: "KI-gestützte Erstellung",
    desc: "Ihr ausgefülltes Formular wird automatisch in einen strukturierten Prompt umgewandelt. Die KI erstellt daraus einen professionellen News-Artikel.",
  },
  {
    num: "04",
    title: "Qualitätsprüfung",
    desc: "Unser Team prüft den generierten Artikel auf Qualität, Korrektheit und SEO-Optimierung bevor er veröffentlicht wird.",
  },
  {
    num: "05",
    title: "Publikation & Bestätigung",
    desc: "Der Artikel wird auf Ihrer News-Website veröffentlicht. Sie erhalten sofort eine Bestätigungs-E-Mail mit dem direkten Link zum neuen Beitrag.",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────
const faqs = [
  {
    q: "Was muss ich als Kunde liefern?",
    a: "Je nach Abo-Modell erhalten Sie rechtzeitig ein Formular per E-Mail. Sie füllen die Grundinformationen aus (Thema, Kernaussagen, Datum) und laden optionale Bilder hoch. Das dauert in der Regel 10–15 Minuten.",
  },
  {
    q: "Was passiert, wenn ich keine eigenen Bilder habe?",
    a: "Kein Problem. Gegen einen kleinen Aufpreis generieren wir professionelle KI-Bilder, die perfekt zum Thema Ihres Artikels passen. Alternativ nutzen wir lizenzfreie Stockfotos.",
  },
  {
    q: "Wie unterscheidet sich die News-Website von meiner Hauptwebsite?",
    a: "Ihre Hauptwebsite (z.B. ihrafirma.ch) bleibt unverändert. Die News-Website (ihrafirma-news.ch) ist eine eigenständige, schnelle Seite, die ausschliesslich für News und Berichte optimiert ist – ideal für Suchmaschinen.",
  },
  {
    q: "Kann ich den Artikel vor der Veröffentlichung prüfen?",
    a: "Ja. Auf Wunsch senden wir Ihnen den Artikel zur Freigabe, bevor er online geht. Beim Wöchentlich- und Täglich-Abo ist dies standardmässig inbegriffen.",
  },
  {
    q: "Welche Vertragslaufzeit gilt?",
    a: "Alle Abos laufen monatlich und sind jederzeit kündbar. Es gibt keine Mindestlaufzeit und keine versteckten Kosten.",
  },
];

// ─── Main Component ───────────────────────────────────────────
export default function Home() {
  useScrollReveal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    plan: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      toast.success("Ihre Anfrage wurde erfolgreich übermittelt! Wir melden uns innerhalb von 24 Stunden.");
      setFormData({ name: "", company: "", email: "", phone: "", website: "", plan: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Source Sans 3', sans-serif", backgroundColor: "var(--rv-off-white)" }}>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: "var(--rv-border-line)", backgroundColor: "rgba(247,245,240,0.95)", backdropFilter: "blur(8px)" }}>
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-6" style={{ backgroundColor: "var(--rv-signal-red)" }} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--rv-anthracite)", letterSpacing: "-0.02em" }}>
                  Ramseier
                </span>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 400, fontSize: "1.25rem", color: "var(--rv-mid-gray)" }}>
                  Verlag
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: "Leistungen", href: "#leistungen" },
                { label: "Ablauf", href: "#ablauf" },
                { label: "Preise", href: "#preise" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a key={item.href} href={item.href} className="rv-link" style={{ fontSize: "0.875rem" }}>
                  {item.label}
                </a>
              ))}
              <button onClick={scrollToContact} className="rv-btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}>
                Kontakt
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--rv-anthracite)" }}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "var(--rv-border-line)", backgroundColor: "var(--rv-off-white)" }}>
            <div className="container py-4 flex flex-col gap-4">
              {[
                { label: "Leistungen", href: "#leistungen" },
                { label: "Ablauf", href: "#ablauf" },
                { label: "Preise", href: "#preise" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: "var(--rv-anthracite)", fontSize: "1rem" }}>
                  {item.label}
                </a>
              ))}
              <button onClick={scrollToContact} className="rv-btn-primary w-full justify-center mt-2">
                Kontakt aufnehmen
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-16 min-h-screen flex flex-col" style={{ backgroundColor: "var(--rv-off-white)" }}>
        <div className="container flex-1 flex flex-col lg:flex-row gap-0">
          {/* Left: Typography Block */}
          <div className="flex-1 flex flex-col justify-center py-20 lg:py-0 lg:pr-16 lg:border-r" style={{ borderColor: "var(--rv-border-line)" }}>
            <div className="rv-fade-up">
              <span className="rv-section-num">Ramseier Verlag — Digitale Werbeagentur</span>
              <div className="rv-accent-line mt-4" />
            </div>
            <h1 className="rv-fade-up mt-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--rv-anthracite)", lineHeight: 1.05, transitionDelay: "60ms" }}>
              Doppelte Online-<br />
              <span style={{ color: "var(--rv-signal-red)" }}>Sichtbarkeit</span><br />
              für Ihr Unternehmen.
            </h1>
            <p className="rv-fade-up mt-6 max-w-lg" style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--rv-mid-gray)", transitionDelay: "120ms" }}>
              Wir erstellen eine professionelle News-Website zusätzlich zu Ihrer bestehenden Firmenwebsite. Mehr SEO-Reichweite, mehr Sichtbarkeit – vollautomatisiert und ohne Aufwand für Sie.
            </p>
            <div className="rv-fade-up flex flex-wrap gap-4 mt-10" style={{ transitionDelay: "180ms" }}>
              <button onClick={scrollToContact} className="rv-btn-primary flex items-center gap-2">
                Jetzt starten <ArrowRight size={16} />
              </button>
              <a href="#ablauf" className="rv-btn-outline flex items-center gap-2">
                Wie es funktioniert <ChevronDown size={16} />
              </a>
            </div>

            {/* Stats Row */}
            <div className="rv-fade-up mt-16 grid grid-cols-3 gap-0 border-t pt-8" style={{ borderColor: "var(--rv-border-line)", transitionDelay: "240ms" }}>
              {[
                { val: "2×", label: "Online-Präsenz" },
                { val: "+65%", label: "SEO-Reichweite" },
                { val: "100%", label: "Automatisiert" },
              ].map((stat, i) => (
                <div key={i} className={i > 0 ? "pl-6 border-l" : ""} style={{ borderColor: "var(--rv-border-line)" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2rem", color: "var(--rv-anthracite)" }}>{stat.val}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--rv-mid-gray)", marginTop: "0.25rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden lg:flex lg:w-5/12 items-center justify-center py-20 pl-16">
            <div className="rv-fade-up w-full" style={{ transitionDelay: "80ms" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663674822989/hQb3xQpQcdf4MMFCL5vdgg/hero-news-abstract-7DkQLPQEEEG7AueFC84yrF.webp"
                alt="Digitale News-Website Konzept"
                className="w-full"
                style={{ border: "1px solid var(--rv-border-line)" }}
              />
              <div className="mt-4 flex items-center gap-2" style={{ color: "var(--rv-mid-gray)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <div className="w-4 h-px" style={{ backgroundColor: "var(--rv-signal-red)" }} />
                Beispiel einer News-Website
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="container pb-8 flex items-center gap-3" style={{ color: "var(--rv-mid-gray)", fontSize: "0.75rem" }}>
          <div className="w-px h-8" style={{ backgroundColor: "var(--rv-border-line)" }} />
          <span style={{ fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Scrollen</span>
        </div>
      </section>

      {/* ── LEISTUNGEN ── */}
      <section id="leistungen" className="py-24 border-t" style={{ borderColor: "var(--rv-border-line)" }}>
        <div className="container">
          <div className="rv-fade-up mb-16">
            <span className="rv-section-num">01 — Leistungen</span>
            <div className="rv-accent-line mt-4" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--rv-anthracite)", maxWidth: "32rem" }}>
              Was wir für Sie tun.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l" style={{ borderColor: "var(--rv-border-line)" }}>
            {[
              {
                icon: <Globe size={28} />,
                title: "Ihre eigene News-Domain",
                desc: "Wir registrieren und verwalten eine dedizierte News-Domain für Ihr Unternehmen (z.B. ihrafirma-news.ch). Schnell, sauber, SEO-optimiert.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663674822989/hQb3xQpQcdf4MMFCL5vdgg/feature-news-website-MeJM3kXVmZmGuX2XfcMtrN.webp",
              },
              {
                icon: <Search size={28} />,
                title: "Maximale SEO-Reichweite",
                desc: "News-Websites werden von Suchmaschinen bevorzugt behandelt. Jeder Artikel ist ein neuer Einstiegspunkt für potenzielle Kunden.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663674822989/hQb3xQpQcdf4MMFCL5vdgg/feature-seo-jjfZyaRN8anACDumXM75Md.webp",
              },
              {
                icon: <Zap size={28} />,
                title: "Vollautomatisierter Workflow",
                desc: "Von der Erinnerungs-E-Mail über die KI-gestützte Artikelerstellung bis zur Publikation – der gesamte Prozess läuft automatisch.",
                img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663674822989/hQb3xQpQcdf4MMFCL5vdgg/feature-automation-M9LgrNYdSALDAuLtmdYrUv.webp",
              },
            ].map((item, i) => (
              <div key={i} className="rv-fade-up border-r border-b p-8 flex flex-col gap-6 group" style={{ borderColor: "var(--rv-border-line)", transitionDelay: `${i * 80}ms` }}>
                <div className="overflow-hidden" style={{ height: "180px" }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div style={{ color: "var(--rv-signal-red)" }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--rv-anthracite)", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.9375rem", lineHeight: 1.65, color: "var(--rv-mid-gray)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-l" style={{ borderColor: "var(--rv-border-line)" }}>
            {[
              { icon: <TrendingUp size={20} />, label: "Performance-Reports" },
              { icon: <Mail size={20} />, label: "Automatische E-Mails" },
              { icon: <CheckCircle2 size={20} />, label: "Qualitätsprüfung" },
              { icon: <Globe size={20} />, label: "Hosting inklusive" },
            ].map((item, i) => (
              <div key={i} className="rv-fade-up border-r border-b p-6 flex items-center gap-3" style={{ borderColor: "var(--rv-border-line)", transitionDelay: `${i * 60}ms` }}>
                <div style={{ color: "var(--rv-signal-red)", flexShrink: 0 }}>{item.icon}</div>
                <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--rv-anthracite)" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABLAUF ── */}
      <section id="ablauf" className="py-24 border-t" style={{ borderColor: "var(--rv-border-line)", backgroundColor: "var(--rv-anthracite)" }}>
        <div className="container">
          <div className="rv-fade-up mb-16">
            <span className="rv-section-num" style={{ color: "var(--rv-mid-gray)" }}>02 — Ablauf</span>
            <div className="rv-accent-line mt-4" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "white", maxWidth: "32rem" }}>
              So einfach funktioniert es.
            </h2>
            <p style={{ marginTop: "1rem", fontSize: "1rem", color: "var(--rv-mid-gray)", maxWidth: "40rem", lineHeight: 1.7 }}>
              Unser vollautomatisierter Prozess minimiert Ihren Aufwand auf ein Minimum. Sie liefern die Grundinformationen – wir erledigen den Rest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            {processSteps.map((step, i) => (
              <div key={i} className="rv-fade-up relative" style={{ transitionDelay: `${i * 80}ms` }}>
                {/* Connector Line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px z-10" style={{ backgroundColor: "var(--rv-border-line)", transform: "translateX(-50%)" }} />
                )}
                <div className="p-6 border-l border-b" style={{ borderColor: "rgba(255,255,255,0.1)", height: "100%" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2.5rem", color: "var(--rv-signal-red)", lineHeight: 1, marginBottom: "1rem" }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.0625rem", color: "white", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--rv-mid-gray)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREISE ── */}
      <section id="preise" className="py-24 border-t" style={{ borderColor: "var(--rv-border-line)" }}>
        <div className="container">
          <div className="rv-fade-up mb-16">
            <span className="rv-section-num">03 — Preise</span>
            <div className="rv-accent-line mt-4" />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--rv-anthracite)", maxWidth: "32rem" }}>
              Transparente Monatsabos.
            </h2>
            <p style={{ marginTop: "1rem", fontSize: "1rem", color: "var(--rv-mid-gray)", maxWidth: "40rem", lineHeight: 1.7 }}>
              Alle Preise in CHF, exkl. MwSt. Monatlich kündbar, keine Mindestlaufzeit. Domain und Hosting sind im Abo enthalten.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l" style={{ borderColor: "var(--rv-border-line)" }}>
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className="rv-fade-up border-r border-b flex flex-col"
                style={{
                  borderColor: "var(--rv-border-line)",
                  transitionDelay: `${i * 80}ms`,
                  backgroundColor: plan.highlight ? "var(--rv-anthracite)" : "transparent",
                }}
              >
                {plan.highlight && (
                  <div className="px-6 py-2 text-center" style={{ backgroundColor: "var(--rv-signal-red)" }}>
                    <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Empfohlen</span>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div style={{ fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: plan.highlight ? "var(--rv-mid-gray)" : "var(--rv-mid-gray)", marginBottom: "0.5rem" }}>
                    {plan.label}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "2.75rem", color: plan.highlight ? "white" : "var(--rv-anthracite)", lineHeight: 1 }}>
                    CHF {plan.price}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--rv-mid-gray)", marginTop: "0.25rem", marginBottom: "1.5rem" }}>/ Monat · {plan.freq}</div>
                  <hr style={{ borderColor: plan.highlight ? "rgba(255,255,255,0.1)" : "var(--rv-border-line)", marginBottom: "1.5rem" }} />
                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} style={{ color: "var(--rv-signal-red)", flexShrink: 0, marginTop: "0.2rem" }} />
                        <span style={{ fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.8)" : "var(--rv-mid-gray)", lineHeight: 1.5 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={scrollToContact}
                    className={plan.highlight ? "rv-btn-primary mt-8 w-full justify-center" : "rv-btn-outline mt-8 w-full justify-center"}
                    style={plan.highlight ? { backgroundColor: "var(--rv-signal-red)", borderColor: "var(--rv-signal-red)" } : {}}
                  >
                    Jetzt anfragen
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="rv-fade-up mt-8 text-center" style={{ fontSize: "0.875rem", color: "var(--rv-mid-gray)" }}>
            KI-Bildgenerierung: +CHF 25 pro Bild · Einmalige Einrichtungsgebühr: CHF 290
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 border-t" style={{ borderColor: "var(--rv-border-line)", backgroundColor: "oklch(0.97 0.004 80)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="rv-fade-up sticky top-24">
                <span className="rv-section-num">04 — FAQ</span>
                <div className="rv-accent-line mt-4" />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--rv-anthracite)" }}>
                  Häufige Fragen.
                </h2>
                <p className="mt-4" style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--rv-mid-gray)" }}>
                  Haben Sie weitere Fragen? Wir freuen uns auf Ihre Kontaktaufnahme.
                </p>
                <button onClick={scrollToContact} className="rv-btn-primary mt-6 flex items-center gap-2">
                  Frage stellen <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-8">
              {faqs.map((faq, i) => (
                <div key={i} className="rv-fade-up border-t" style={{ borderColor: "var(--rv-border-line)", transitionDelay: `${i * 60}ms` }}>
                  <button
                    className="w-full flex items-center justify-between py-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.0625rem", color: "var(--rv-anthracite)", paddingRight: "2rem" }}>
                      {faq.q}
                    </span>
                    <div style={{ flexShrink: 0, color: "var(--rv-signal-red)", transition: "transform 200ms ease-out", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="pb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--rv-mid-gray)" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t" style={{ borderColor: "var(--rv-border-line)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section id="kontakt" ref={contactRef} className="py-24 border-t" style={{ borderColor: "var(--rv-border-line)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Info */}
            <div className="lg:col-span-5">
              <div className="rv-fade-up">
                <span className="rv-section-num">05 — Kontakt</span>
                <div className="rv-accent-line mt-4" />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--rv-anthracite)" }}>
                  Starten wir gemeinsam.
                </h2>
                <p className="mt-4" style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--rv-mid-gray)", maxWidth: "28rem" }}>
                  Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen. Wir beraten Sie kostenlos und unverbindlich.
                </p>
              </div>

              <div className="rv-fade-up mt-10 flex flex-col gap-5" style={{ transitionDelay: "80ms" }}>
                {[
                  { icon: <Mail size={18} />, label: "E-Mail", val: "info@ramseierverlag.ch", href: "mailto:info@ramseierverlag.ch" },
                  { icon: <Globe size={18} />, label: "Website", val: "www.ramseierverlag.ch", href: "https://www.ramseierverlag.ch" },
                  { icon: <MapPin size={18} />, label: "Standort", val: "Schweiz", href: null },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-0.5 flex-shrink-0" style={{ color: "var(--rv-signal-red)" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rv-mid-gray)", marginBottom: "0.25rem" }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="rv-link" style={{ fontSize: "0.9375rem" }}>{item.val}</a>
                      ) : (
                        <span style={{ fontSize: "0.9375rem", color: "var(--rv-anthracite)", fontWeight: 600 }}>{item.val}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="rv-fade-up mt-12 p-6 border" style={{ borderColor: "var(--rv-border-line)", transitionDelay: "120ms" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rv-mid-gray)", marginBottom: "1rem" }}>Unsere Versprechen</div>
                {[
                  "Keine Mindestlaufzeit",
                  "Antwort innerhalb 24 Stunden",
                  "Kostenlose Erstberatung",
                  "Transparente Preise",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 mb-2.5">
                    <CheckCircle2 size={15} style={{ color: "var(--rv-signal-red)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.875rem", color: "var(--rv-anthracite)", fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className="rv-fade-up" style={{ transitionDelay: "60ms" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "name", label: "Ihr Name *", type: "text", required: true, placeholder: "Max Muster" },
                    { id: "company", label: "Firma *", type: "text", required: true, placeholder: "Muster AG" },
                    { id: "email", label: "E-Mail *", type: "email", required: true, placeholder: "info@musterfirma.ch" },
                    { id: "phone", label: "Telefon", type: "tel", required: false, placeholder: "+41 79 123 45 67" },
                    { id: "website", label: "Ihre aktuelle Website", type: "url", required: false, placeholder: "https://ihrafirma.ch" },
                  ].map((field) => (
                    <div key={field.id} className={field.id === "website" ? "sm:col-span-2" : ""}>
                      <label htmlFor={field.id} style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rv-mid-gray)", marginBottom: "0.5rem" }}>
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          border: "1px solid var(--rv-border-line)",
                          borderRadius: 0,
                          backgroundColor: "white",
                          color: "var(--rv-anthracite)",
                          fontSize: "0.9375rem",
                          fontFamily: "'Source Sans 3', sans-serif",
                          outline: "none",
                          transition: "border-color 150ms ease-out",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--rv-signal-red)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--rv-border-line)")}
                      />
                    </div>
                  ))}

                  {/* Plan Select */}
                  <div className="sm:col-span-2">
                    <label htmlFor="plan" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rv-mid-gray)", marginBottom: "0.5rem" }}>
                      Gewünschtes Abo
                    </label>
                    <select
                      id="plan"
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid var(--rv-border-line)",
                        borderRadius: 0,
                        backgroundColor: "white",
                        color: formData.plan ? "var(--rv-anthracite)" : "var(--rv-mid-gray)",
                        fontSize: "0.9375rem",
                        fontFamily: "'Source Sans 3', sans-serif",
                        outline: "none",
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="monthly">Monatlich – CHF 149/Mt.</option>
                      <option value="biweekly">2× Monatlich – CHF 249/Mt.</option>
                      <option value="weekly">Wöchentlich – CHF 449/Mt.</option>
                      <option value="daily">Täglich – CHF 1'290/Mt.</option>
                      <option value="custom">Individuelles Angebot</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label htmlFor="message" style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rv-mid-gray)", marginBottom: "0.5rem" }}>
                      Nachricht / Fragen
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Was möchten Sie uns mitteilen?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid var(--rv-border-line)",
                        borderRadius: 0,
                        backgroundColor: "white",
                        color: "var(--rv-anthracite)",
                        fontSize: "0.9375rem",
                        fontFamily: "'Source Sans 3', sans-serif",
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 150ms ease-out",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--rv-signal-red)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--rv-border-line)")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="rv-btn-primary mt-6 flex items-center gap-2"
                  style={{ opacity: formSubmitting ? 0.7 : 1 }}
                >
                  {formSubmitting ? "Wird gesendet..." : "Anfrage absenden"}
                  {!formSubmitting && <ArrowRight size={16} />}
                </button>

                <p className="mt-4" style={{ fontSize: "0.8rem", color: "var(--rv-mid-gray)" }}>
                  Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t py-12" style={{ borderColor: "var(--rv-border-line)", backgroundColor: "var(--rv-anthracite)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            {/* Brand */}
            <div>
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-1 h-6" style={{ backgroundColor: "var(--rv-signal-red)" }} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.125rem", color: "white" }}>Ramseier Verlag</span>
              </div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--rv-mid-gray)", maxWidth: "22rem" }}>
                Digitale Werbeagentur für Schweizer KMU. Wir schaffen doppelte Online-Sichtbarkeit durch professionelle News-Websites.
              </p>
            </div>

            {/* Links */}
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rv-mid-gray)", marginBottom: "1rem" }}>Navigation</div>
              {["Leistungen", "Ablauf", "Preise", "FAQ", "Kontakt"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block mb-2" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 150ms ease-out" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--rv-signal-red)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                  {item}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rv-mid-gray)", marginBottom: "1rem" }}>Kontakt</div>
              <div className="flex flex-col gap-3">
                <a href="mailto:info@ramseierverlag.ch" className="flex items-center gap-2" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                  <Mail size={14} style={{ color: "var(--rv-signal-red)" }} />
                  info@ramseierverlag.ch
                </a>
                <a href="https://www.ramseierverlag.ch" className="flex items-center gap-2" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                  <Globe size={14} style={{ color: "var(--rv-signal-red)" }} />
                  www.ramseierverlag.ch
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={{ fontSize: "0.8rem", color: "var(--rv-mid-gray)" }}>
              © {new Date().getFullYear()} Ramseier Verlag. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              {["Impressum", "Datenschutz", "AGB"].map((item) => (
                <button key={item} onClick={() => toast.info("Diese Seite ist in Kürze verfügbar.")} style={{ fontSize: "0.8rem", color: "var(--rv-mid-gray)", background: "none", border: "none", cursor: "pointer", transition: "color 150ms ease-out" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--rv-mid-gray)")}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
