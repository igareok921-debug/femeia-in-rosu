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
 * ✅ Luxe hero + animated silhouette
 * ✅ Speakers: long profile cards (avatar in circle + detailed bio)
 * ✅ Contact section with phone numbers only
 * ✅ FIX: removed accidental broken fragment after nav useMemo (was causing “Missing initializer in const declaration”)
 *
 * Images:
 *  - Put speaker photos in /public/images/
 *  - Names used here:
 *      /images/alexandru.jpg
 *      /images/alina.jpg
 *      /images/emilia.jpg
 *      /images/maria.jpg
 */

const GOLD = "rgba(255, 210, 150, 0.95)";
const GOLD_SOFT = "rgba(255, 210, 150, 0.25)";

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
          <h2 className="mt-4 font-serif text-3xl md:text-4xl text-white">
            <span className="bg-gradient-to-b from-[rgba(255,220,185,0.95)] via-[rgba(255,200,150,0.88)] to-[rgba(255,170,120,0.82)] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function InfoPill({ icon: Icon, label, value }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px 200px at 30% 20%, rgba(255,70,70,0.18), transparent 60%), radial-gradient(500px 180px at 70% 80%, rgba(255,200,150,0.10), transparent 60%)",
        }}
      />
      <div className="relative flex items-center gap-3">
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

function HeroSilhouette({ className }) {
  return (
    <svg viewBox="0 0 420 520" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="goldStroke" x1="40" y1="60" x2="360" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(255, 235, 210, 0.95)" />
          <stop offset="0.45" stopColor="rgba(255, 200, 150, 0.85)" />
          <stop offset="1" stopColor="rgba(255, 120, 120, 0.65)" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.15  0 1 0 0 0.10  0 0 1 0 0.05  0 0 0 1 0"
            result="warm"
          />
          <feMerge>
            <feMergeNode in="warm" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M230 78c0 17-13 31-30 31s-30-14-30-31 13-31 30-31 30 14 30 31Z"
        stroke="url(#goldStroke)"
        strokeWidth="3.6"
        opacity="0.95"
        filter="url(#softGlow)"
      />
      <path
        d="M200 109c0 18 3 27 10 39"
        stroke="url(#goldStroke)"
        strokeWidth="3.2"
        opacity="0.95"
        strokeLinecap="round"
        filter="url(#softGlow)"
      />
      <path
        d="M210 148c18 18 28 40 28 68 0 25-7 48-18 72-9 20-14 44-14 73 0 41 18 82 54 120"
        stroke="url(#goldStroke)"
        strokeWidth="3.6"
        strokeLinecap="round"
        opacity="0.95"
        filter="url(#softGlow)"
      />
      <path
        d="M190 148c-18 18-28 40-28 68 0 25 7 48 18 72 9 20 14 44 14 73 0 41-18 82-54 120"
        stroke="url(#goldStroke)"
        strokeWidth="3.6"
        strokeLinecap="round"
        opacity="0.95"
        filter="url(#softGlow)"
      />
      <path
        d="M62 468c58-10 108-18 138-20 32-2 58 0 80 6 19 5 41 9 78 14"
        stroke="url(#goldStroke)"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.9"
        filter="url(#softGlow)"
      />
      <path
        d="M56 476c74 0 118-6 150-10 35-4 61-5 86-2 28 3 52 9 122 12"
        stroke="url(#goldStroke)"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function FloatingDust({ count = 26, className }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = 1 + Math.random() * 2.2;
      const delay = Math.random() * 3.5;
      const dur = 3.5 + Math.random() * 4.5;
      const opacity = 0.18 + Math.random() * 0.38;
      return { i, left, top, size, delay, dur, opacity };
    });
  }, [count]);

  return (
    <div className={cx("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {dots.map((d) => (
        <motion.span
          key={d.i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: "rgba(255, 210, 150, 0.9)",
            opacity: d.opacity,
            filter: "blur(0.2px)",
          }}
          initial={{ y: 0, x: 0 }}
          animate={{ y: [-8, 10, -6], x: [0, 6, -2] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function SpeakerProfileCard({ name, role, subtitle, imgSrc, bio }) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 md:p-7 backdrop-blur">
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(800px 320px at 20% 0%, rgba(255,70,70,0.18), transparent 60%), radial-gradient(700px 260px at 90% 80%, rgba(255,200,150,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:gap-7">
        <div className="flex shrink-0 justify-center md:justify-start">
          <div className="relative">
            <div
              className="absolute -inset-3 rounded-full blur-lg"
              style={{
                background:
                  "conic-gradient(from 180deg, rgba(255,70,70,0.55), rgba(255,200,150,0.45), rgba(255,70,70,0.55))",
                opacity: 0.75,
              }}
            />
            <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-black/40 md:h-32 md:w-32">
              <img src={imgSrc} alt={name} className="h-full w-full object-cover" loading="lazy" />
            </div>
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
    <div className="relative grid gap-2 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(500px 240px at 20% 0%, rgba(255,70,70,0.12), transparent 65%), radial-gradient(450px 220px at 100% 100%, rgba(255,200,150,0.08), transparent 55%)",
        }}
      />

      <div className="relative flex items-start gap-3">
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
        name: "Emilia Ciaglic",
        role: "Moderatoare",
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
        ],
      },
    ],
    []
  );

  const nav = useMemo(
    () => [
      { id: "despre", label: "Despre" },
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
  }, [nav]);

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-red-500/30">
      {/* Background: red silk + particles */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-24 left-[-12%] h-[55vh] w-[80vw] rotate-[-10deg] opacity-70 blur-[0.3px]"
          style={{
            background:
              "radial-gradient(60% 90% at 20% 40%, rgba(255,0,60,0.55), transparent 70%), radial-gradient(55% 80% at 60% 30%, rgba(255,40,40,0.38), transparent 72%), radial-gradient(45% 70% at 85% 55%, rgba(180,0,40,0.35), transparent 70%)",
            filter: "saturate(1.2)",
          }}
        />
        <div
          className="absolute bottom-[-22%] right-[-15%] h-[65vh] w-[90vw] rotate-[8deg] opacity-75 blur-[0.2px]"
          style={{
            background:
              "radial-gradient(55% 90% at 65% 55%, rgba(255,0,60,0.55), transparent 70%), radial-gradient(50% 80% at 35% 45%, rgba(255,170,120,0.16), transparent 70%), radial-gradient(45% 70% at 10% 75%, rgba(120,0,30,0.38), transparent 72%)",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-[12%] h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,200,150,0.22), transparent 62%)" }}
          animate={{ scale: [1, 1.06, 1.01], opacity: [0.35, 0.55, 0.4] }}
          transition={{ duration: 8.0, repeat: Infinity, ease: "easeInOut" }}
        />

        <FloatingDust count={36} className="opacity-60" />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 700px at 50% 20%, transparent 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.78) 100%)",
          }}
        />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => scrollTo("top")}
            className="group inline-flex items-center gap-3"
            aria-label="Mergi la început"
          >
            <div
              className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/50"
              style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 0 40px ${GOLD_SOFT}` }}
            >
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
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/50 text-white/80"
            style={{ color: "rgba(255,255,255,0.9)" }}
            aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileOpen}
            type="button"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur">
            <div className="flex flex-col px-4 py-3">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollTo(item.id);
                    setMobileOpen(false);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-white/80 hover:bg-white/5"
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
        <style>{`
          @keyframes shimmerSweep {
            0% { transform: translateX(-30%) rotate(-8deg); opacity: 0.0; }
            20% { opacity: 0.75; }
            55% { opacity: 0.55; }
            100% { transform: translateX(35%) rotate(-8deg); opacity: 0.0; }
          }
          @keyframes glowPulse {
            0%,100% { opacity: 0.55; }
            50% { opacity: 0.95; }
          }
        `}</style>

        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 md:pt-24 md:pb-16">
            {/* Luxury hero layers */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div
                className="absolute left-[-20%] top-[8%] h-[180px] w-[140%]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,200,150,0.10) 18%, rgba(255,235,210,0.22) 35%, rgba(255,200,150,0.10) 52%, transparent 70%)",
                  filter: "blur(0.6px)",
                  animation: "shimmerSweep 7.2s ease-in-out infinite",
                  opacity: 0.0,
                }}
              />

              <motion.div
                className="absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle at 40% 40%, rgba(255,70,70,0.22), transparent 65%)" }}
                animate={{ scale: [0.95, 1.04, 0.98], opacity: [0.35, 0.6, 0.4] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute left-1/2 top-[2%] h-[640px] w-[640px] -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,200,150,0.18), transparent 62%)" }}
                animate={{ scale: [1, 1.06, 1.01], opacity: [0.35, 0.55, 0.4] }}
                transition={{ duration: 8.0, repeat: Infinity, ease: "easeInOut" }}
              />

              <FloatingDust count={36} className="opacity-80" />
            </div>

            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
              {/* Poster-like silhouette behind content */}
              <motion.div
                className="pointer-events-none absolute left-1/2 top-[10%] hidden h-[560px] w-[560px] -translate-x-1/2 md:block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 26px rgba(255,200,150,0.10))" }}
              >
                <div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background: "radial-gradient(circle at 50% 40%, rgba(255,200,150,0.14), transparent 60%)",
                    animation: "glowPulse 5.6s ease-in-out infinite",
                  }}
                />

                <motion.div
                  className="absolute inset-0"
                  animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "50% 60%" }}
                >
                  <HeroSilhouette className="h-full w-full opacity-[0.85]" />
                </motion.div>

                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0.0, 0.22, 0.0], x: [0, 10, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HeroSilhouette className="h-full w-full opacity-[0.22]" />
                </motion.div>
              </motion.div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] text-white/70"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="uppercase">Dedicat 100% femeilor care îndrăznesc</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.05, ease: "easeOut" }}
                  className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95]"
                >
                  <span
                    className="bg-gradient-to-b from-[rgba(255,235,210,0.98)] via-[rgba(255,205,160,0.88)] to-[rgba(255,165,120,0.78)] bg-clip-text text-transparent"
                    style={{ textShadow: `0 0 80px ${GOLD_SOFT}` }}
                  >
                    FEMEIA ÎN ROȘU
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.12, ease: "easeOut" }}
                  className="mt-4 text-sm md:text-base tracking-[0.35em] uppercase text-white/70"
                >
                  Feminin & Puternic
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.18, ease: "easeOut" }}
                  className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/75"
                >
                  O seară dedicată femeilor care vor susținere, inspirație și motivație — o experiență care îmbină
                  feminitatea cu puterea interioară, eleganța cu energia și comunitatea cu transformarea.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.22, ease: "easeOut" }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <button
                    onClick={() => scrollTo("program")}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm md:text-base border border-white/10 bg-white/5 text-white/85 hover:text-white hover:bg-white/10 transition"
                  >
                    <Calendar className="h-5 w-5" />
                    Vezi programul
                  </button>
                </motion.div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  <InfoPill icon={Calendar} label="Data" value="1 februarie 2026" />
                  <InfoPill icon={Clock} label="Ora" value="14:00 – 23:00" />
                  <InfoPill icon={MapPin} label="Locație" value="10 rue Leonardo De Vinci, Brie Comte 77170" />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(800px 380px at 30% 0%, rgba(255,70,70,0.20), transparent 60%), radial-gradient(700px 340px at 80% 90%, rgba(255,200,150,0.12), transparent 60%)",
                    }}
                  />

                  <div className="relative">
                    <div className="font-serif text-2xl text-white/95">Motto</div>
                    <p className="mt-3 text-white/75 leading-relaxed">„Dedicat 100% femeilor care îndrăznesc.”</p>

                    <div className="mt-6 grid gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-white/80" />
                          <div className="text-sm text-white/80">Networking & comunitate</div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <div className="flex items-center gap-3">
                          <Mic className="h-5 w-5 text-white/80" />
                          <div className="text-sm text-white/80">Speakeri inspiraționali</div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                        <div className="flex items-center gap-3">
                          <Music className="h-5 w-5 text-white/80" />
                          <div className="text-sm text-white/80">DJ & atmosferă elegantă</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <Shirt className="h-5 w-5 text-white/85" />
                        <div>
                          <div className="text-xs tracking-[0.2em] uppercase text-white/55">Dress code</div>
                          <div className="font-serif text-lg text-white/95">Negru & Roșu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Section id="despre" eyebrow="Despre eveniment" title="O experiență dedicată femeilor care îndrăznesc">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
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

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
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
              <div key={x} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full" style={{ background: "rgba(255,70,70,0.85)" }} />
                  <p className="text-white/75 leading-relaxed">{x}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="speakers" eyebrow="Speakeri" title="Oameni care aduc inspirație, stil și claritate">
          <div className="grid gap-4">
            {speakers.map((s) => (
              <SpeakerProfileCard key={s.name} {...s} />
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <p className="text-white/75 leading-relaxed">
              În plus, vom aborda un subiect despre care prea puține femei au curajul să vorbească: căderea părului,
              problemele de scalp, îngrășarea părului — soluții și explicații oferite de o specialistă trihoterapeut.
            </p>
          </div>
        </Section>

        <Section id="program" eyebrow="Program" title="1 februarie | Paris">
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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div className="font-serif text-xl text-white/95">Olga</div>
              <a href="tel:+33782809686" className="mt-2 block text-lg text-white/80 hover:text-white transition">
                +33 7 82 80 96 86
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div className="font-serif text-xl text-white/95">Fiiama</div>
              <a href="tel:+33744532048" className="mt-2 block text-lg text-white/80 hover:text-white transition">
                +33 7 44 53 20 48
              </a>
            </div>
          </div>
        </Section>

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
      </main>

      <button
        onClick={() => scrollTo("top")}
        className={cx(
          "fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black/55 backdrop-blur transition",
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        )}
        aria-label="Înapoi sus"
      >
        <ChevronUp className="h-5 w-5 text-white/85" />
      </button>
    </div>
  );
}
