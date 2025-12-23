import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ChevronUp,
  Users,
  Mic,
  Camera,
  Music,
  Shirt,
  Menu,
  X,
} from "lucide-react";

/**
 * FEMEIA ÎN ROȘU — Informational One‑Page Website (React + Tailwind)
 *
 * ✅ Cerință aplicată: ELIMINATE toate efectele vizuale de fundal
 *    - background global (silk gradients / particles / glow)
 *    - efecte din Hero section (shimmer / glow / silhouette / particles)
 *    - overlay-uri decorative de tip “radial-gradient” din carduri
 *
 * ✅ Cerință aplicată: Speakerii apar și în Hero section ca avataruri rotunde
 */

const GOLD = "rgba(255, 210, 150, 0.95)";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="relative py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-8 md:mb-10">
          {eyebrow ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] text-white/70">
              <Sparkles className="h-4 w-4" />
              <span className="uppercase">{eyebrow}</span>
            </div>
          ) : null}
          <h2 className="mt-4 font-serif text-3xl md:text-4xl text-white">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function InfoPill({ icon: Icon, label, value }) {
  // Păstrat pentru reutilizare în alte secțiuni, dar în Hero folosim o bară mai elegantă.
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/40">
          <Icon className="h-5 w-5 text-white/80" />
        </div>
        <div>
          <div className="text-xs tracking-[0.2em] text-white/55 uppercase">{label}</div>
          <div className="text-sm md:text-base text-white/90">{value}</div>
        </div>
      </div>
    </div>
  );
}

function HeroMetaBar({ items }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <div className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-y-0 md:divide-x">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2 px-3 py-2 md:px-3 md:py-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-black/30">
              <Icon className="h-3.5 w-3.5 text-white/75" />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] tracking-[0.3em] uppercase text-white/55">{label}</div>
              <div
                className={cx(
                  "mt-0.5 text-[11px] md:text-xs text-white/90 leading-snug",
                  label === "Locație" ? "max-w-[22rem] md:max-w-[28rem] whitespace-normal break-words" : null
                )}
              >
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeakerProfileCard({ name, role, subtitle, imgSrc, bio }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-7">
        <div className="flex shrink-0 justify-center md:justify-start">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-black/40 md:h-32 md:w-32">
            <img src={imgSrc} alt={name} className="h-full w-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="font-serif text-2xl md:text-3xl text-white/95">{name}</div>
            <div className="mt-1 text-sm md:text-base tracking-wide text-white/70">{role}</div>
            {subtitle ? <div className="mt-1 text-xs md:text-sm text-white/55">{subtitle}</div> : null}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-5 md:p-6">
            {Array.isArray(bio) ? (
              <div className="grid gap-3">
                {bio.map((p, idx) => (
                  <p key={idx} className="text-sm md:text-base leading-relaxed text-white/75">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm md:text-base leading-relaxed text-white/75">{bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ time, title, description, icon: Icon }) {
  return (
    <div className="grid gap-2 rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/40">
          <Icon className="h-5 w-5 text-white/80" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <div className="text-sm tracking-[0.2em] uppercase text-white/60">{time}</div>
            <div className="font-serif text-lg text-white/95">{title}</div>
          </div>
          {description ? <p className="mt-2 text-sm leading-relaxed text-white/75">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}

function HeroSpeaker({ speaker, onClick }) {
  const { name, role, imgSrc, } = speaker;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-center text-center outline-none transition-transform hover:scale-105"

      aria-label={`${name} — ${role}`}
      title={`${name} — ${role}`}
    >
    <div
  className="
    h-20 w-20 md:h-20 md:w-20
    overflow-hidden rounded-full
    border border-white/20
    bg-black/40
    transition
    group-hover:border-[rgba(255,210,150,0.65)]
    group-hover:shadow-[0_0_18px_rgba(255,210,150,0.35)]
  "
>




        <img src={imgSrc} alt={name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="mt-2 max-w-[9.5rem] truncate text-sm font-serif text-white/95">{name}</div>
      <div className="max-w-[9.5rem] truncate text-xs text-white/70">
{role}</div>

    </button>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when switching to desktop width
  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const speakers = useMemo(
    () => [
      {
        name: "Alexandru Bordea",
        role: "Business Mentor",
        imgSrc: "/images/alexandru.jpg",
        bio: [
          "Cu peste 900 de antreprenori și experți pe care i-a ajutat să își lanseze sau dezvolte afacerile, Alexandru Bordea știe despre marketing și promovare tot ce te poate ajuta să obții rezultatele dorite.",
          "În cadrul acestui eveniment vei afla instrumentele necesare, cu exemple concrete care vor genera clienți.",
          "În 2026 vei face promovarea altfel: mai eficient și cu impact.",
        ],
      },
      {
        name: "Caraush Alina",
        role: "Stylist",
        imgSrc: "/images/alina.jpg",
        bio: [
          "Sunt Alina Caraush, stilist vestimentar cu 7 ani de experiență. Am stilizat sute de femei, online și offline, ghidându-le în procesul de transformare personală și redescoperire a încrederii prin stil.",
          "Prin conținut educativ și inspirațional, implicare socială și colaborări cu televiziunea, reviste și evenimente dedicate femeilor, am contribuit la dezvoltarea domeniului stilului în Republica Moldova.",
          "Pentru mine, stilul nu înseamnă doar haine, ci atitudine, încredere și identitate.",
          "Sunt onorată să fac parte din eveniment și vă promit că acesta va fi primul pas către o schimbare autentică, care începe din interior și se reflectă în exterior.",
        ],
      },
      {
        name: "Emilia Ceaglic",
        role: "Moderator",
        subtitle: "Moderator/Coordonator & Vocalist",
        imgSrc: "/images/emilia.jpg",
        bio: [
          "Eu știu să transform fiecare eveniment într-o experiență autentică, plină de emoție și eleganță.",
          "Profesionalismul, creativitatea și energia bună sunt punctul meu de referință.",
          "Orice eveniment, împreună îl facem de neuitat!",
        ],
      },
      {
        name: "Maria Baciu",
        role: "Tricoterapeut",
        imgSrc: "/images/maria.jpg",
        bio: [
          "Maria Baciu – tricoterapeut și expert în sănătatea scalpului și a părului cu peste 7 ani experiență.",
          "Fondatoarea primului cabinet de Tricoterapie MB Trichotherapy.",
          " În plus, vom aborda un subiect despre care prea puține femei au curajul să vorbească: căderea părului,problemele de scalp, îngrășarea părului — soluții și explicații oferite de o specialistă trihoterapeut."
        ],
      },
    ],
    []
  );

  const nav = useMemo(
    () => [
      { id: "despre", label: "Desq" },
      { id: "de-ce", label: "De ce roșu" },
      { id: "pentru-cine", label: "Pentru cine" },
      { id: "speakers", label: "Speakeri" },
      { id: "program", label: "Program" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Minimal runtime checks (dev): ensure unique nav ids & sections exist.
  React.useEffect(() => {
    const ids = nav.map((n) => n.id);
    console.assert(new Set(ids).size === ids.length, "[Nav] duplicate section ids", ids);
    ids.forEach((id) => {
      console.assert(!!document.getElementById(id), `[Nav] missing section for #${id}`);
    });

    // Basic "test" checks
    console.assert(Array.isArray(speakers) && speakers.length > 0, "[Speakers] expected non-empty array");
    console.assert(
      new Set(speakers.map((s) => s.name)).size === speakers.length,
      "[Speakers] expected unique speaker names",
      speakers.map((s) => s.name)
    );
  }, [nav, speakers]);

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-red-500/30">

      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => scrollTo("top")}
            className="group inline-flex items-center gap-3"
            aria-label="Mergi la început"
            type="button"
          >
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/50">
              <span className="font-serif text-lg" style={{ color: GOLD }}>
                F
              </span>
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-serif text-sm text-white/95">Femeia în Roșu</div>
              <div className="text-xs tracking-[0.26em] uppercase text-white/50">Feminin & Puternic</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="rounded-xl px-3 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 transition"
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/50 text-white/80"
            aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileOpen}
            type="button"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/70">
            <div className="flex flex-col px-4 py-3">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollTo(item.id);
                    setMobileOpen(false);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-white/80 hover:bg-white/5"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main id="top">
        <section className="relative overflow-hidden bg-[#07070a]">
          {/* HERO BACKGROUND (asigură-te că fișierul există în /public/images/hero-bg.jpg) */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-bg.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
            {/* Overlay mai light ca să NU pară totul negru */}
            <div className="absolute inset-0 bg-black/35" />
            {/* Fade elegant jos, elimină linia */}
<div className="pointer-events-none absolute inset-x-0 bottom-0 h- bg-gradient-to-b from-transparent to-[#07070a]" />

          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-4 pb-10 md:pt-12 md:pb-10">
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] text-white/70"
      >
        <Sparkles className="h-4 w-4" />
        <span className="uppercase">Dedicat 100% femeilor care îndrăznesc</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
        className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95]"
  style={{
    color: "rgba(255, 210, 150, 0.95)",
    textShadow: "0 0 24px rgba(255,210,150,0.35)"
  }}
      >
        FEMEIA ÎN ROȘU
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
        className="mt-4 text-sm md:text-base tracking-[0.35em] uppercase"
  style={{
    color: "rgba(255, 210, 150, 0.75)",
    textShadow: "0 0 12px rgba(255,210,150,0.25)"
  }}
      >
        Feminin &amp; Puternic
      </motion.div>

      {/* Speakeri sub titlu, centrați */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
        className="mt-7 grid grid-cols-2 gap-6 justify-items-center sm:flex sm:flex-wrap sm:justify-center"

      >
        {speakers.map((s) => (
          <HeroSpeaker key={s.name} speaker={s} onClick={() => scrollTo("speakers")} />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
        className="mx-auto mt-7 max-w-2xl text-base md:text-lg leading-relaxed text-white/75"
      >
        O seară dedicată femeilor care vor susținere, inspirație și motivație — o experiență care îmbină feminitatea
        cu puterea interioară, eleganța cu energia și comunitatea cu transformarea.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <button
          onClick={() => scrollTo("program")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm md:text-base border border-white/10 bg-white/5 text-white/85 hover:text-white hover:bg-white/10 transition"
          type="button"
        >
          <Calendar className="h-5 w-5" />
          Vezi programul
        </button>
      </motion.div>
    </div>
  </div>
</section>


{/* BACKGROUND ROȘU PENTRU TOT CE E SUB HERO */}
<div className="relative overflow-hidden isolate">
  
  <div className="absolute inset-0 z-0">
    <img
      src="/images/hero-bg.jpg"
      alt=""
      className="h-full w-full object-cover object-center opacity-70 saturate-150 contrast-125"
    />
    <div className="absolute inset-0 bg-[#07070a]/90" />
  </div>


<div className="relative z-10">
{/* Motto (format lung) sub Hero */}
<section className="relative mt-10 md:mt-16 pb-14 md:pb-20">

  <div className="mx-auto w-full max-w-6xl px-4">
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-8">
      {/* Motto + informații eveniment pe același rând (desktop) */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="font-serif text-2xl md:text-3xl text-white/95">Motto</div>
          <p className="mt-3 text-white/75 leading-relaxed">„Dedicat 100% femeilor care îndrăznesc.”</p>
        </div>

        {/* Bandă info integrată (nu mai e pe mijloc) */}
        <div className="w-full md:max-w-[460px]">
          <button
  className="
    mb-4
    w-full
    rounded-xl
    bg-red-600
    hover:bg-red-700
    transition
    py-3
    text-lg
    font-semibold
    text-white
    shadow-lg
    shadow-red-600/30
  "
>
  Prețul: 140 €
</button>

          <HeroMetaBar
            items={[
              { icon: Calendar, label: "Data", value: "1 februarie 2026" },
              { icon: Clock, label: "Ora", value: "14:00 – 23:00" },
              { icon: MapPin, label: "Locație", value: "10 Rue Léonard de Vinci, 77170 Brie-Comte-Robert" },
            ]}
          />
          
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-start">
        <div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-white/80" />
                <div className="text-sm text-white/80">Networking &amp; comunitate</div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-3">
                <Mic className="h-5 w-5 text-white/80" />
                <div className="text-sm text-white/80">Speakeri inspiraționali</div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-3">
                <Music className="h-5 w-5 text-white/80" />
                <div className="text-sm text-white/80">DJ &amp; atmosferă elegantă</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
          <div className="flex items-center gap-3">
            <Shirt className="h-5 w-5 text-white/85" />
            <div>
              <div className="text-xs tracking-[0.2em] uppercase text-white/55">Dress code</div>
              <div className="font-serif text-xl text-white/95">Negru &amp; Roșu</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Ținuta recomandată pentru seară: accente elegante în negru și roșu.
          </p>
        </div>
      </div>
    </div>
  </div>
  
</section>

        <Section id="despre" eyebrow="Despre eveniment" title="O experiență dedicată femeilor care îndrăznesc">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <p className="text-white/75 leading-relaxed">
                „Femeia în Roșu – Feminin & Puternic” este mai mult decât o întâlnire, este o experiență. Este un
                eveniment pentru femei care au nevoie de susținere, inspirație și motivație — pentru femei care vor
                să iasă din zona de confort, să fie văzute, auzite și încurajate.
              </p>
              <p className="mt-4 text-white/75 leading-relaxed">
                O seară în care fiecare femeie va fi în centru. Vei primi informație valoroasă, energie feminină,
                inspirație, suport, dar și relaxare, eleganță, muzică bună și o atmosferă caldă.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-white/80" />
                <div className="font-serif text-xl text-white/95">Ce vei simți</div>
              </div>
              <ul className="mt-4 grid gap-3 text-white/75">
                {[
                  "Conexiune reală între femei",
                  "Claritate, curaj și inspirație",
                  "Eleganță, energie bună și vibrație feminină",
                  "O doză de motivație care rămâne cu tine",
                ].map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span className="leading-relaxed">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="de-ce" eyebrow="De ce roșu" title="Curaj, pasiune, încredere și eleganță">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <p className="text-white/75 leading-relaxed">
              Am ales roșul pentru că înseamnă curaj, pasiune, încredere, putere și eleganță — exact ceea ce definim
              noi ca femei. Am adăugat și negrul, pentru că simbolizează lux, rafinament, profunzime și prezență
              puternică.
            </p>
            <p className="mt-4 text-white/75 leading-relaxed">
              Împreună, aceste culori spun povestea femeii moderne: feminină, elegantă, puternică, sigură pe sine și
              pregătită să îndrăznească.
            </p>
          </div>
        </Section>

        <Section id="pentru-cine" eyebrow="Pentru cine" title="Pentru tine, dacă…">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "ai un vis, dar încă nu știi cum să îl transformi în realitate",
              "ai nevoie de motivație, susținere și inspirație",
              "ești antreprenoare sau îți dorești să devii",
              "îți dorești dezvoltare personală și profesională",
              "ai nevoie de claritate și curaj",
              "vrei să cunoști femei ca tine, să creezi conexiuni și comunitate",
              "vrei o seară feminină, elegantă și încărcată de energie bună",
            ].map((x) => (
              <div key={x} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-white/60" />
                  <p className="text-white/75 leading-relaxed">{x}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="speakers" eyebrow="Speakeri" title="Oameni care aduc inspirație, stil și claritate">
          <div className="grid gap-4">{speakers.map((s) => <SpeakerProfileCard key={s.name} {...s} />)}</div>

         
        </Section>

        <Section id="program" eyebrow="Program" title="1 Februarie | Paris">
          <div className="grid gap-4">
            <TimelineItem
              time="14:00 – 15:00"
              title="Întâlnire & networking"
              description="Socializare, fotografii, acomodare într-o atmosferă caldă și feminină."
              icon={Users}
            />
            <TimelineItem
              time="15:00 – 16:30"
              title="Alexandru Bordea"
              description="Inspirație, mentalitate, dezvoltare, motivație."
              icon={Mic}
            />
            <TimelineItem
              time="16:30 – 18:00"
              title="Caraush Alina"
              description="Feminitate, stil, imagine, trenduri și cum să ne simțim bine în pielea noastră."
              icon={Sparkles}
            />
            <TimelineItem
              time="18:00 – 19:00"
              title="Maria Baciu"
              description="Sănătatea părului: probleme reale și soluții corecte pentru femei."
              icon={Mic}
            />
            <TimelineItem
              time="după 19:00"
              title="Cină festivă & seară de distracție"
              description="Meniu special, candy bar, băuturi, DJ Zara — vibrație, emoție, energie feminină pură."
              icon={Music}
            />
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Informații de contact">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="font-serif text-xl text-white/95">Olga</div>
              <a href="tel:+33782809686" className="mt-2 block text-lg text-white/80 hover:text-white transition">
                +33 7 82 80 96 86
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="font-serif text-xl text-white/95">Fiiama</div>
              <a href="tel:+33744532048" className="mt-2 block text-lg text-white/80 hover:text-white transition">
                +33 7 44 53 20 48
              </a>
            </div>
          </div>
        </Section>
</div>

        <footer className="border-t border-white/10 bg-black/30">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/60">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-serif text-white/80">Femeia în Roșu</span> — Feminin & Puternic
              </div>
              <div className="text-white/55">© {new Date().getFullYear()} • Toate drepturile rezervate</div>
            </div>
          </div>
        </footer>
        </div> 
        
        
      </main>

      <button
        onClick={() => scrollTo("top")}
        className={cx(
          "fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/55 transition",
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        )}
        aria-label="Înapoi sus"
        type="button"
      >
        <ChevronUp className="h-5 w-5 text-white/85" />
      </button>
    </div>
  );
}
