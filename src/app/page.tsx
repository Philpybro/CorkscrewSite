"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Zap,
  Map,
  Palette,
  Volume2,
  Gamepad2,
  ExternalLink,
  Menu,
  X,
  Star,
  Skull,
  Mountain,
  Waves,
  Building2,
  TreePine,
  Landmark,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Synopsis", href: "#synopsis" },
  { label: "Characters", href: "#characters" },
  { label: "Gameplay", href: "#gameplay" },
  { label: "World", href: "#world" },
  { label: "Media", href: "#media" },
  { label: "Links", href: "#links" },
];

interface Character {
  name: string;
  nickname?: string;
  role: string;
  description: string;
  colorClass: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
  icon: LucideIcon;
  traits: string[];
  iconColor: string;
}

const CHARACTERS: Character[] = [
  {
    name: "Charlie",
    role: "Main Character",
    description:
      "A 10-year-old Cornish lad with a love for money and adventure. Charlie can transform into a monster-like state — fast, agile, and built for speed. He builds insane momentum through wild stunts and uses bits of tech he \"invents\". He's the class clown: snarky, meme-loving, and always ready for a scrap.",
    colorClass: "char-charlie",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-emerald-400",
    iconBg: "bg-gradient-to-br from-cyan-500/20 to-emerald-400/20",
    icon: Zap,
    iconColor: "text-cyan-400",
    traits: ["Fast & Agile", "Tech-Enthusiast", "Monster Form", "Momentum Master"],
  },
  {
    name: "Zak",
    role: "Best Friend / Sidekick",
    description:
      "Originally from France but fully English at heart. Zak was unknowingly recruited as Jam's henchman before becoming Charlie's best mate. He fancies himself \"the first British cowboy\" and is a military enthusiast. Loyalty above all.",
    colorClass: "char-zak",
    gradientFrom: "from-yellow-400",
    gradientTo: "to-orange-500",
    iconBg: "bg-gradient-to-br from-yellow-400/20 to-orange-500/20",
    icon: Star,
    iconColor: "text-yellow-400",
    traits: ["British Cowboy", "Military Buff", "Loyal Friend", "French Origins"],
  },
  {
    name: "Jam",
    nickname: '"The Psycho Nerd"',
    role: "Main Antagonist",
    description:
      "A half-orphaned posh psycho-nerd haunted by his dead mafia dad's legacy. He holes up plotting world takeover, fuelled by evil powers and a mysterious cat ghost mask. He builds robots, summons demons, and his school run-ins with Charlie spark their bitter rivalry.",
    colorClass: "char-jam",
    gradientFrom: "from-pink-500",
    gradientTo: "to-purple-600",
    iconBg: "bg-gradient-to-br from-pink-500/20 to-purple-600/20",
    icon: Skull,
    iconColor: "text-pink-400",
    traits: ["Evil Genius", "Robot Builder", "Ghost Mask", "World Domination"],
  },
  {
    name: "CHAR-0",
    nickname: '"Zero"',
    role: "Secondary Antagonist / Boss",
    description:
      "Jam's failed robot, originally designed as a Charlie doppelganger. Rebuilt into an autonomous beast, Zero later absorbs Zak during a Metal Sonic-inspired boss fight — setting up one of the game's most intense confrontations.",
    colorClass: "char-zero",
    gradientFrom: "from-red-500",
    gradientTo: "to-orange-500",
    iconBg: "bg-gradient-to-br from-red-500/20 to-orange-500/20",
    icon: Gamepad2,
    iconColor: "text-red-400",
    traits: ["Mechanical Beast", "Charlie Clone", "Autonomous", "Final Boss Form"],
  },
];

interface GameFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const GAME_FEATURES: GameFeature[] = [
  {
    icon: Map,
    title: "Randomly Generated Levels",
    description:
      "Object spawning and layouts create dynamic, unpredictable levels every time you play.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Zap,
    title: "Momentum Physics",
    description:
      "Go as fast as you're willing! Momentum-based physics reminiscent of a certain blue speedster.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Palette,
    title: "HD Artstyle",
    description:
      "Cartoon and anime-inspired HD visuals give the platformer genre a fresh coat of paint.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Volume2,
    title: "Crass Humour",
    description:
      "Expressions and actions will get a giggle or two. #knowingsmile",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Gamepad2,
    title: "Exhaustion Meter",
    description:
      "Manage your stamina — an exhaustion system adds strategy to the high-speed platforming.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Waves,
    title: "Pseudo-3D Chase Scenes",
    description:
      "Thrilling pseudo-3D racing segments that break up the platforming with high-speed action.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

interface LevelInfo {
  num: number;
  name: string;
  description: string;
  boss?: string;
  mini?: boolean;
  icon: LucideIcon;
}

const LEVELS: LevelInfo[] = [
  { num: 1, name: "Kennoir Forest", description: "An English jungle/forest near alps and hills, sandy during summer. Location of Charlie's house.", icon: TreePine },
  { num: 2, name: "The Mines", description: "Mines and tunnels. Charlie rides a minecart through dark underground passages.", boss: "The Head — controls minecarts. Break the yellow ones to win!", icon: Mountain },
  { num: 3, name: "Wilting Field", description: "The fields around where Zak lives, eerie and withered.", icon: Landmark },
  { num: 4, name: "Desert Outskirts", description: "A scorching desert near a sprawling city.", boss: "Rouge Digger — an out-of-control digging machine.", mini: true, icon: Mountain },
  { num: 5, name: "Fairground", description: "A countryside fairground filled with rides turned dangerous.", icon: Star },
  { num: 6, name: "Carnival Street", description: "A small carnival street leading toward danger.", boss: "Evil Snake Man in a Ferris Wheel — rolling towards Charlie!", icon: Building2 },
  { num: 7, name: "Underwater", description: "An underwater segment with unique swimming mechanics.", icon: Waves },
  { num: 8, name: "Rural City Entrance", description: "Emerging from the river into the rural entrance of the city.", boss: "CHAR-0 absorbs Zak — a Metal Sonic parody boss fight!", mini: true, icon: Building2 },
  { num: 9, name: "J-Infected City", description: "Streets of a gang-filled city under Jam's control.", icon: Building2 },
  { num: 10, name: "Broken Red Sky City", description: "The final zone — a city with a broken red sky.", boss: "FINAL BOSS: J transforms Zak and the robot into a beast, then a racing segment!", icon: Skull },
];

interface SocialLink {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Steam Store Page", href: "https://store.steampowered.com/app/3197700/Corkscrew/", description: "Wishlist Corkscrew on Steam!", icon: Gamepad2, color: "from-[#1b2838] to-[#2a475e]" },
  { label: "Steam Community", href: "https://steamcommunity.com/app/3197700", description: "Join the community", icon: ExternalLink, color: "from-[#1b2838] to-[#2a475e]" },
  { label: "YouTube", href: "https://www.youtube.com/@CorkscrewFranchise", description: "Watch trailers and devlogs", icon: ExternalLink, color: "from-red-600 to-red-700" },
  { label: "GlobalComix", href: "https://globalcomix.com/c/corkscrew", description: "Read the Corkscrew comic", icon: ExternalLink, color: "from-indigo-500 to-purple-600" },
  { label: "Reddit", href: "https://www.reddit.com/r/CorkScrewTheGame/", description: "Join the subreddit", icon: ExternalLink, color: "from-orange-500 to-orange-600" },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page-wrapper relative">
      {/* ═══════════ HARD-CODED CSS BACKGROUND EFFECTS ═══════════ */}
      <BackgroundEffects />

      {/* ═══════════ HEADER / NAV ═══════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20"
            : "bg-black/50 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#hero" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
                C
              </div>
              <span className="font-black text-white text-lg tracking-wide hidden sm:block">
                CORKSCREW
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.slice(1) ? "active" : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="https://store.steampowered.com/app/3197700/Corkscrew/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex cork-btn-steam cork-btn text-sm py-2 px-5"
            >
              <Gamepad2 size={16} />
              Wishlist on Steam
            </a>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu md:hidden fixed top-16 right-0 bottom-0 w-72 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 ${mobileMenuOpen ? "open" : ""}`}>
          <nav className="flex flex-col p-6 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-link text-left py-3 ${activeSection === link.href.slice(1) ? "active" : ""}`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="https://store.steampowered.com/app/3197700/Corkscrew/"
                target="_blank"
                rel="noopener noreferrer"
                className="cork-btn cork-btn-steam w-full justify-center text-sm"
              >
                <Gamepad2 size={16} />
                Wishlist on Steam
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden scanlines">
        <div className="absolute inset-0 retro-grid opacity-40" />

        {/* Hero Pop Shapes */}
        <div className="absolute top-28 left-[6%] w-20 h-20 bg-cyan-400 rounded-2xl rotate-12 opacity-40 animate-float-1 shadow-[0_0_30px_rgba(0,212,255,0.3)]" />
        <div className="absolute top-44 right-[10%] w-16 h-16 bg-pink-500 rounded-full opacity-40 animate-float-2 shadow-[0_0_30px_rgba(255,45,149,0.3)]" />
        <div className="absolute bottom-[22%] right-[7%] w-28 h-11 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full -rotate-6 opacity-45 animate-float-3 shadow-[0_0_20px_rgba(255,215,0,0.2)]" />
        <div className="absolute bottom-[32%] left-[7%] w-14 h-14 bg-emerald-400 rounded-lg rotate-45 opacity-40 animate-float-2 shadow-[0_0_20px_rgba(0,255,136,0.2)]" />
        <div className="absolute top-[55%] left-[12%] w-8 h-24 bg-purple-500 rounded-3xl rotate-6 opacity-30 animate-float-3" />
        <div className="absolute bottom-[45%] right-[18%] w-10 h-10 bg-red-400 rotate-45 opacity-25 animate-float-1" />
        {/* swoosh streaks */}
        <div className="absolute top-[12%] right-[25%] w-44 h-3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rounded-full rotate-3 animate-float-2" />
        <div className="absolute bottom-[38%] right-[22%] w-36 h-3 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent rounded-full -rotate-6 animate-float-1" />

        {/* Frutiger Aero Bubbles (CSS only) */}
        <div className="aero-bubble absolute w-40 h-40 top-[15%] right-[20%] animate-float-1 opacity-30" />
        <div className="aero-bubble absolute w-28 h-28 bottom-[30%] left-[5%] animate-float-2 opacity-25" />
        <div className="aero-bubble absolute w-20 h-20 top-[60%] right-[8%] animate-float-3 opacity-20" />
        <div className="aero-bubble absolute w-16 h-16 bottom-[15%] right-[35%] animate-float-1 opacity-20" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          <div className="mb-8">
            <img
              src="/images/corkscrew/logo.jpg"
              alt="Corkscrew Logo"
              className="mx-auto max-w-md w-full rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.4),0_0_80px_rgba(255,45,149,0.2)] border-2 border-white/20"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            THE ULTIMATE{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              MOMENTUM-BASED
            </span>{" "}
            ADVENTURE
          </h1>

          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            A funny, fast-paced platformer set in Rural Britain, 2019. Play as
            Charlie — a 10-year-old lad who can turn into a monster — as he
            battles the psycho kid J to take back his cash and save his homeland!
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://store.steampowered.com/app/3197700/Corkscrew/"
              target="_blank"
              rel="noopener noreferrer"
              className="cork-btn cork-btn-steam"
            >
              <Gamepad2 size={18} />
              Wishlist on Steam
            </a>
            <a href="#synopsis" className="cork-btn cork-btn-primary">
              Learn More
              <ChevronDown size={16} />
            </a>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown size={28} className="text-white/40" />
          </div>
        </div>
      </section>

      {/* ═══════════ SYNOPSIS ═══════════ */}
      <section id="synopsis" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader tag="ABOUT THE GAME" title="What is Corkscrew?" subtitle="The only game of its kind." />

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <div className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-4">The Story</h3>
                <p className="text-white/80 leading-relaxed">
                  <strong className="text-cyan-400">Corkscrew</strong> sets you
                  in Rural Britain in the year 2019, where you play as a young
                  10-year-old lad whose life is rudely interrupted by a weird kid
                  from his school who&apos;s trying to take over the area.
                </p>
                <p className="text-white/80 leading-relaxed mt-4">
                  Getting under the young lad&apos;s skin by taking the one thing
                  he loves most — his{" "}
                  <strong className="text-yellow-400">CASH</strong>! The player
                  must traverse the levels to not only grab back his cash, but to
                  give this weird kid a right walloping!
                </p>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-white mb-4">The World</h3>
                <p className="text-white/80 leading-relaxed">
                  The world is pretty much 1:1 with real life — except Charlie
                  and co are effectively cartoon characters, and there&apos;s
                  loads of paranormal, magic, and high-tech shenanigans. Being
                  in such a remote location, every work of fiction is canon to
                  Corkscrew&apos;s world. Why? Because it&apos;s so far away
                  that the contradictions don&apos;t matter!
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card overflow-hidden rounded-2xl">
                <img
                  src="/images/corkscrew/ss1.jpg"
                  alt="Corkscrew Gameplay"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-panel-dark p-4 rounded-xl max-w-[200px]">
                <p className="text-xs text-white/60 uppercase tracking-wider mb-1">
                  In Development Since
                </p>
                <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  2018
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CHARACTERS ═══════════ */}
      <section id="characters" className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader tag="MEET THE CAST" title="Characters" subtitle="A ragtag bunch of misfits." />
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {CHARACTERS.map((char) => (
              <CharacterCard key={char.name} character={char} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GAMEPLAY ═══════════ */}
      <section id="gameplay" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader tag="HOW IT PLAYS" title="Gameplay" subtitle="Fast. Funny. Fresh every time." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {GAME_FEATURES.map((feat) => (
              <div key={feat.title} className="glass-card p-6">
                <div className={`feature-icon ${feat.bgColor} ${feat.color}`}>
                  <feat.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 glass-panel-dark p-8 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-3">Plus Even More!</h3>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
              Minecart levels, rap battles, bouncepads, platform grabbing, an
              exhaustion meter, pseudo-3D chase scenes, and even an{" "}
              <span className="text-yellow-400 font-semibold">OHIO secret level</span>.
              There&apos;s always something wild around the corner!
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ WORLD / LEVELS ═══════════ */}
      <section id="world" className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeader tag="EXPLORE THE WORLD" title="Levels & Zones" subtitle="From peaceful forests to broken red skies." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {LEVELS.map((level) => (
              <LevelCard key={level.num} level={level} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MEDIA ═══════════ */}
      <section id="media" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader tag="SEE IT IN ACTION" title="Media" subtitle="Screenshots from the game." />
          <div className="mt-16 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {["/images/corkscrew/ss1.jpg", "/images/corkscrew/ss2.jpg", "/images/corkscrew/ss3.jpg"].map((src, i) => (
                <div key={i} className="glass-card overflow-hidden rounded-2xl group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img src={src} alt={`Corkscrew Screenshot ${i + 1}`} className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="glass-card overflow-hidden rounded-2xl max-w-md w-full group cursor-pointer">
                <img src="/images/corkscrew/library.jpg" alt="Corkscrew Library Card" className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ LINKS ═══════════ */}
      <section id="links" className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeader tag="STAY CONNECTED" title="Links" subtitle="Find Corkscrew around the web." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <link.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {link.label}
                  <ExternalLink size={14} className="inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-white/50 text-sm">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ MARQUEE ═══════════ */}
      <div className="py-6 overflow-hidden border-y border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="text-white/20 font-black text-6xl sm:text-8xl tracking-widest mx-8 select-none">
              CORKSCREW &nbsp;★&nbsp; MOMENTUM &nbsp;★&nbsp; 2019 &nbsp;★&nbsp; CHARLIE &nbsp;★&nbsp; JAM &nbsp;★&nbsp; FAST &nbsp;★&nbsp; FUN &nbsp;★&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-12 px-4 bg-black/40 backdrop-blur-md border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-white font-black text-sm">
              C
            </div>
            <span className="font-black text-white/60 text-sm tracking-widest uppercase">Corkscrew</span>
          </div>
          <p className="text-white/30 text-sm mb-4 max-w-md mx-auto leading-relaxed">
            Developed by <span className="text-white/50 font-semibold">CharlieDoesStuff</span>. In development since 2018.
          </p>
          <p className="text-white/20 text-xs mb-6">
            &copy; Corkscrew 2023–2025. All characters and concepts are copyright of their respective owners.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/30 text-xs">
            <a href="https://store.steampowered.com/app/3197700/Corkscrew/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Steam</a>
            <a href="https://www.youtube.com/@CorkscrewFranchise" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">YouTube</a>
            <a href="https://globalcomix.com/c/corkscrew" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Comic</a>
            <a href="https://www.reddit.com/r/CorkScrewTheGame/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Reddit</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <p className="text-xs font-bold tracking-[0.3em] text-cyan-400/70 uppercase mb-3">{tag}</p>
      <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{title}</h2>
      <p className="text-white/50 text-lg font-light">{subtitle}</p>
      <div className="section-divider w-32 mx-auto mt-6" />
    </div>
  );
}

function CharacterCard({ character }: { character: Character }) {
  return (
    <div className={`character-card ${character.colorClass} p-8`}>
      <div className={`w-16 h-16 rounded-2xl ${character.iconBg} flex items-center justify-center mb-5`}>
        <character.icon size={30} className={character.iconColor} />
      </div>
      <div className="mb-4">
        <h3 className="text-2xl font-black text-white">{character.name}</h3>
        {character.nickname && <p className="text-white/40 text-sm italic">{character.nickname}</p>}
        <p className={`text-sm font-semibold bg-gradient-to-r ${character.gradientFrom} ${character.gradientTo} bg-clip-text text-transparent mt-1`}>
          {character.role}
        </p>
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-5">{character.description}</p>
      <div className="flex flex-wrap gap-2">
        {character.traits.map((trait) => (
          <span key={trait} className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10 bg-white/5 text-white/60">
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}

function LevelCard({ level }: { level: LevelInfo }) {
  return (
    <div className="level-card">
      <span className="level-number">{String(level.num).padStart(2, "0")}</span>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
          <level.icon size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-white">{level.name}</h3>
            {level.boss && <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider">Boss</span>}
            {level.mini && <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase tracking-wider">Mini</span>}
          </div>
        </div>
      </div>
      <p className="text-white/60 text-sm leading-relaxed ml-[52px]">{level.description}</p>
      {level.boss && (
        <div className="mt-3 ml-[52px] p-3 rounded-xl bg-white/5 border border-white/5">
          <p className="text-xs text-red-400/80 font-semibold mb-0.5 uppercase tracking-wider">Boss Fight</p>
          <p className="text-white/50 text-xs leading-relaxed">{level.boss}</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   HARD-CODED BACKGROUND EFFECTS (No Images)
   ═══════════════════════════════════════════ */

function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ── Large blurred orbs ── */}
      <div
        className="absolute w-[500px] h-[500px] -top-[200px] -left-[150px] rounded-full animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute w-[400px] h-[400px] top-[35%] -right-[120px] rounded-full animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(255,45,149,0.10) 0%, transparent 70%)", animationDelay: "2s" }}
      />
      <div
        className="absolute w-[350px] h-[350px] bottom-[-80px] left-[25%] rounded-full animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)", animationDelay: "4s" }}
      />

      {/* ── Abstract flat pop shapes (JP Sonic boxart style) ── */}
      {/* Rounded rectangles */}
      <div className="absolute top-[12%] left-[3%] w-36 h-28 bg-cyan-400/15 rounded-[40%_60%_60%_40%/50%_40%_60%_50%] animate-float-1" />
      <div className="absolute top-[38%] right-[6%] w-20 h-48 bg-purple-500/10 rounded-3xl -rotate-12 animate-float-3" />
      <div className="absolute bottom-[18%] left-[6%] w-24 h-24 bg-yellow-400/12 rounded-[50%] animate-wobble" />

      {/* Solid circles */}
      <div className="absolute top-[22%] right-[15%] w-14 h-14 bg-pink-500/20 rounded-full animate-float-2" />
      <div className="absolute top-[65%] left-[15%] w-10 h-10 bg-emerald-400/15 rounded-full animate-float-1" style={{ animationDelay: "5s" }} />
      <div className="absolute top-[80%] right-[30%] w-8 h-8 bg-cyan-400/20 rounded-full animate-float-3" style={{ animationDelay: "3s" }} />

      {/* Diamonds */}
      <div className="absolute top-[30%] left-[40%] w-12 h-12 bg-orange-400/15 rounded-sm rotate-45 animate-float-3" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-[35%] right-[12%] w-10 h-10 bg-cyan-400/12 rounded-sm rotate-45 animate-float-1" style={{ animationDelay: "7s" }} />

      {/* Pills / bars */}
      <div className="absolute top-[8%] right-[28%] w-48 h-4 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent rounded-full rotate-2 animate-float-2" />
      <div className="absolute bottom-[42%] left-[8%] w-36 h-3 bg-gradient-to-r from-transparent via-pink-500/15 to-transparent rounded-full -rotate-3 animate-float-1" style={{ animationDelay: "4s" }} />
      <div className="absolute top-[50%] right-[3%] w-5 h-20 bg-gradient-to-b from-yellow-400/10 to-transparent rounded-full rotate-6 animate-float-2" />

      {/* Triangular wedge shapes (using clip-path) */}
      <div
        className="absolute top-[16%] left-[22%] w-16 h-16 bg-gradient-to-br from-cyan-400/10 to-transparent animate-float-3"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-[25%] right-[22%] w-14 h-14 bg-gradient-to-br from-pink-500/10 to-transparent animate-float-1"
        style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)", animationDelay: "6s" }}
      />

      {/* ── Frutiger Aero glass bubbles ── */}
      <div className="aero-bubble absolute w-52 h-52 top-[5%] left-[15%] animate-float-1 opacity-20" />
      <div className="aero-bubble absolute w-36 h-36 bottom-[10%] right-[10%] animate-float-2 opacity-15" />
      <div className="aero-bubble absolute w-24 h-24 top-[55%] left-[5%] animate-float-3 opacity-15" />
      <div className="aero-bubble absolute w-44 h-44 bottom-[40%] right-[35%] animate-float-1 opacity-10" />
      <div className="aero-bubble absolute w-20 h-20 top-[75%] right-[8%] animate-float-2 opacity-20" />
    </div>
  );
}
