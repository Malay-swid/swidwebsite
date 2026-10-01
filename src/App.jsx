import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Menu, ArrowRight, Zap, Shield, TrendingUp, Globe, X, CheckCircle2, Award, Phone, Mail, MapPin,
  Sun, Moon, Monitor, Battery, Factory, Building2, ExternalLink
} from 'lucide-react';
import { CONTENT } from './data/content';
import './apple-effects.css';

// ============================================
// REUSABLE UI COMPONENTS
// ============================================

const FadeInUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, delay = 0.1 }) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: { opacity: 0 },
      show: { transition: { staggerChildren: delay } }
    }}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const LiquidButton = ({ children, className = "", ...props }) => (
  <motion.button
    whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 122, 255, 0.9)" }}
    whileTap={{ scale: 0.98 }}
    className={`relative overflow-hidden transition-all duration-500 rounded-full px-8 py-4 font-bold ${className}`}
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <motion.div
      className="absolute inset-0 bg-white/20"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  </motion.button>
);

const SectionHeader = ({ title, subtitle, className = "" }) => (
  <div className={`text-center mb-24 ${className}`}>
    <FadeInUp>
      <span className="inline-block px-4 py-1.5 bg-solar-blue/10 text-solar-blue text-xs font-bold uppercase tracking-widest rounded-full mb-6">
        SWID Advantage
      </span>
    </FadeInUp>
    <FadeInUp delay={0.1}>
      <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-charcoal leading-tight mb-6">
        {title}
      </h2>
    </FadeInUp>
    {subtitle && (
      <FadeInUp delay={0.2}>
        <p className="text-solar-muted text-xl max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      </FadeInUp>
    )}
  </div>
);

const IconRenderer = ({ name, size = 32, className = "" }) => {
  const icons = {
    'trending-up': <TrendingUp size={size} />,
    'shield': <Shield size={size} />,
    'award': <Award size={size} />,
    'zap': <Zap size={size} />,
    'sun': <Sun size={size} />,
    'battery': <Battery size={size} />,
    'factory': <Factory size={size} />,
    'building': <Building2 size={size} />,
  };
  return <span className={`text-solar-blue ${className}`}>{icons[name] || <Zap size={size} />}</span>;
};

// ============================================
// MAIN COMPONENTS
// ============================================

const Navbar = ({ theme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const themeOptions = [
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon },
    { value: 'system', label: 'System', Icon: Monitor },
  ];
  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#investors', label: 'Investors' },
    { href: '#csr', label: 'CSR' },
    { href: '#subsidiaries', label: 'Subsidiaries' },
    { href: '#career', label: 'Career' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`theme-nav fixed top-0 w-full z-[100] px-6 py-6 transition-all duration-700 flex justify-between items-center ${scrolled ? 'bg-white/70 backdrop-blur-2xl py-4 shadow-sm is-scrolled' : 'bg-transparent'}`}>
        <div className={`text-2xl font-bold tracking-tighter transition-colors duration-500 ${scrolled ? 'text-charcoal' : 'text-white mix-blend-difference'}`}>
          SWID
        </div>
        <div className="flex items-center gap-3">
          <div className="appearance-control">
            <button
              className={`appearance-trigger ${scrolled ? 'appearance-trigger-scrolled' : ''}`}
              type="button"
              aria-label={`Appearance: ${theme}`}
              aria-haspopup="menu"
              aria-expanded={appearanceOpen}
              title={`Appearance: ${theme}`}
              onClick={() => setAppearanceOpen(!appearanceOpen)}
            >
              <ThemeIcon size={19} />
            </button>
            <AnimatePresence>
              {appearanceOpen && (
                <motion.div
                  className="appearance-menu"
                  role="menu"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>Appearance</p>
                  {themeOptions.map(({ value, label, Icon }) => (
                    <button
                      key={value}
                      className={`appearance-option ${theme === value ? 'appearance-option-active' : ''}`}
                      type="button"
                      role="menuitemradio"
                      aria-checked={theme === value}
                      onClick={() => {
                        onThemeChange(value);
                        setAppearanceOpen(false);
                      }}
                    >
                      <Icon size={17} />
                      <span>{label}</span>
                      {theme === value && <CheckCircle2 className="appearance-check" size={15} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-full cursor-pointer transition-all duration-500 ${scrolled ? 'bg-gray-100 text-charcoal' : 'bg-white/20 text-white backdrop-blur-md'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black text-white flex flex-col justify-center items-center gap-8"
          >
            <div className="flex flex-col items-center gap-8 text-3xl md:text-4xl font-bold tracking-tighter">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-solar-blue transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <LiquidButton className="bg-solar-blue text-white mt-12">
              Get in Touch
            </LiquidButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.2], [0, 70]);

  return (
    <section id="home" className="photo-contrast relative min-h-[680px] h-screen bg-black overflow-hidden">
      <motion.img
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=90"
        alt="A field of solar panels producing clean energy"
        fetchPriority="high"
        style={{ y: imageY, scale: 1.12 }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      <div className="relative z-10 flex min-h-[680px] h-full items-center px-6 pt-20 md:px-16">
        <div className="hero-copy-enter max-w-5xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Renewable energy, engineered in India</p>
          <h1 className="mb-7 text-6xl font-extrabold leading-[0.98] tracking-tight text-white md:text-8xl lg:text-9xl">
            <span className="text-shimmer-dark">{CONTENT.hero.title}</span>
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-white/75 md:text-2xl">
            {CONTENT.hero.subtitle}
          </p>
          <a href="#solutions" style={{ color: '#000000' }} className="hero-cta mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold transition-all duration-500 hover:-translate-y-1 hover:bg-blue-100">
            Explore our solutions <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-6 right-6 flex justify-between text-[10px] uppercase tracking-[0.18em] text-white/65 md:left-16 md:right-16">
        <span>SWID Renewables</span><span>Powering progress, responsibly</span>
      </div>
    </section>
  );
};

const Growth = () => {
  return (
    <section id="growth" className="photo-contrast relative h-screen bg-black flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={CONTENT.growth.image}
          className="w-full h-full object-cover"
          alt="Solar Farm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </motion.div>
      <div className="relative z-10 text-center text-white px-4">
        <FadeInUp>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
            <span className="text-shimmer-dark">{CONTENT.growth.title}</span>
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            {CONTENT.growth.subtitle}
          </p>
        </FadeInUp>
      </div>
    </section>
  );
};

const Transition = () => {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const travel = section.offsetHeight - window.innerHeight;
      const nextProgress = travel > 0
        ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel))
        : 0;

      setProgress((current) => Math.abs(current - nextProgress) < 0.002 ? current : nextProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const wipeProgress = Math.min(1, Math.max(0, (progress - 0.28) / 0.4));
  const solarOffset = `${(1 - wipeProgress) * 100}%`;
  const traditionalOpacity = 1 - Math.min(1, Math.max(0, (progress - 0.32) / 0.3));
  const solarOpacity = Math.min(1, Math.max(0, (progress - 0.34) / 0.28));

  return (
    <section ref={sectionRef} className="photo-contrast relative h-[220vh] bg-black" id="transition">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black text-white">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: traditionalOpacity }}
        >
          <img
            src={CONTENT.growth.image}
            alt="Electricity transmission infrastructure"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <div className="absolute inset-x-6 bottom-24 z-10 mx-auto max-w-6xl md:inset-x-16 md:bottom-28">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white/55">01 / The old energy model</p>
            <h3 className="mb-6 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
              The Burden of Tradition
            </h3>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">
              {CONTENT.transition.traditional.desc}
            </p>
            <div className="grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 text-sm text-white/65 sm:grid-cols-2 md:text-base">
              {["Volatile Fuel Costs", "Carbon Compliance Risk", "Grid Dependency", "Maintenance Overhead"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" />{item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ transform: `translateX(${solarOffset})`, opacity: solarOpacity, willChange: 'transform, opacity' }}
          className="absolute inset-0 overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=90"
            alt="Solar panels generating clean energy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />
          <div className="absolute inset-x-6 bottom-24 z-10 mx-auto max-w-6xl md:inset-x-16 md:bottom-28">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-emerald-100/80">02 / The solar advantage</p>
            <h3 className="mb-6 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
              The Freedom of Solar
            </h3>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/80 md:text-xl">
              {CONTENT.transition.solar.desc}
            </p>
            <div className="grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 text-sm text-white/85 sm:grid-cols-2 md:text-base">
              {["Fixed Energy Costs", "Zero Carbon Footprint", "Energy Independence", "Predictable Returns"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={17} className="text-emerald-200" />{item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="absolute left-6 right-6 top-6 z-20 h-px overflow-hidden bg-white/20 md:left-16 md:right-16">
          <div className="h-full origin-left bg-white" style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="absolute bottom-7 right-6 z-20 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 md:right-16">
          Scroll to compare
        </div>
      </div>
    </section>
  );
};

const StatsCounter = () => {
  const { title, items } = CONTENT.stats;

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={title}
          subtitle="Metrics that validate our commitment to precision and performance."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {items.map((stat, i) => (
            <StaggerItem key={stat.label} delay={i * 0.1}>
              <div className="text-center group">
                <div className="flex justify-center items-baseline gap-1 mb-2">
                  <span className="text-solar-muted text-xs font-bold uppercase tracking-widest">{stat.prefix}</span>
                  <motion.span
                    className="text-5xl md:text-7xl font-extrabold tracking-tighter text-charcoal"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-solar-muted text-xs font-bold uppercase tracking-widest">{stat.suffix}</span>
                </div>
                <p className="text-solar-muted text-sm font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
};

const Ecosystem = () => {
  return (
    <section className="py-32 px-6 bg-gray-50" id="projects">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="The Ecosystem"
          subtitle="Engineering excellence delivered through four core pillars of efficiency."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CONTENT.ecosystem.map((f, i) => (
            <StaggerItem key={f.id} delay={i * 0.1} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative h-full p-8 rounded-[2rem] border border-gray-200 bg-white hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden apple-card-glow"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <img src={f.img} className="w-full h-full object-cover" alt={f.title} />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="text-solar-blue mb-6 group-hover:scale-110 transition-transform duration-500">
                    {f.icon === 'trending-up' && <TrendingUp size={32} />}
                    {f.icon === 'shield' && <Shield size={32} />}
                    {f.icon === 'award' && <Award size={32} />}
                    {f.icon === 'zap' && <Zap size={32} />}
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-charcoal tracking-tight">{f.title}</h4>
                  <p className="text-solar-muted mb-6 text-sm leading-relaxed flex-1">{f.desc}</p>
                  <div className="space-y-2 border-t border-gray-100 pt-4">
                    {f.metrics.map((metric, mi) => (
                      <div key={mi} className="flex items-center gap-2 text-xs font-bold text-solar-blue uppercase tracking-wider">
                        <CheckCircle2 size={12} /> {metric}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = CONTENT.solutions;

  return (
    <section className="py-32 px-6 bg-black text-white" id="solutions">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Solutions"
          subtitle="Integrated energy infrastructure for the modern enterprise. From generation to storage to intelligence."
          className="text-white"
        />
        <div className="space-y-24">
          {solutions.map((sol, i) => (
            <StaggerItem key={sol.title} delay={i * 0.15} className="overflow-hidden">
              <div className={`relative grid lg:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden border border-zinc-800 bg-zinc-900/30 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                <div className="solution-visual relative min-h-[500px] overflow-hidden">
                  <img
                    src={sol.image}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt={sol.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 z-10">
                    <div className="text-solar-blue mb-4">
                      {sol.icon === 'factory' && <Factory size={48} />}
                      {sol.icon === 'battery' && <Battery size={48} />}
                      {sol.icon === 'building' && <Building2 size={48} />}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{sol.title}</h3>
                    <p className="text-gray-400 max-w-md text-lg font-light leading-relaxed">{sol.desc}</p>
                  </div>
                </div>
                <div className="p-16 flex flex-col justify-center bg-zinc-900/50">
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    {sol.features.map((feat, fi) => (
                      <motion.div
                        key={feat}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fi * 0.1 }}
                        className="flex items-center gap-4 p-5 bg-zinc-800/40 rounded-2xl border border-zinc-700/50 hover:border-solar-blue/50 transition-all group"
                      >
                        <div className="w-10 h-10 bg-solar-blue/10 rounded-xl flex items-center justify-center group-hover:bg-solar-blue/20 transition-colors">
                          <CheckCircle2 size={20} className="text-solar-blue" />
                        </div>
                        <span className="font-medium text-gray-200">{feat}</span>
                      </motion.div>
                    ))}
                  </div>
                  <LiquidButton className="mt-12 w-fit px-8 py-4 bg-solar-blue text-white font-bold text-sm uppercase tracking-widest">
                    Explore {sol.title} <ArrowRight size={16} className="ml-2" />
                  </LiquidButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  const { title, stats, projects, quote } = CONTENT.impact;

  return (
    <section className="py-32 px-6 bg-white" id="csr">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={title}
          subtitle="Our responsibility extends beyond the grid. We invest in communities where we operate."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-zinc-900 rounded-[3rem] p-12 flex flex-col justify-end relative overflow-hidden group h-[450px]">
            <img src="/images/csr-main.svg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" alt="Impact" />
            <div className="relative z-10">
              <span className="text-sm uppercase tracking-widest text-solar-blue font-bold">CSR Contribution</span>
              <h3 className="text-6xl md:text-8xl font-bold mt-2 text-white tracking-tighter">{stats[0].value}</h3>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {stats.slice(1).map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-900 rounded-[3rem] p-8 flex flex-col justify-center text-center flex-1 border border-zinc-800 transition-all"
              >
                <div className="text-4xl font-bold mb-2 text-white tracking-tight">{s.value}</div>
                <div className="text-solar-muted text-sm font-medium uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {projects.map((proj, i) => (
            <StaggerItem key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-zinc-900 rounded-[3rem] p-8 flex flex-col justify-between h-96 relative overflow-hidden group border border-zinc-800 transition-all"
              >
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img src={proj.image} className="w-full h-full object-cover" alt={proj.name} />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1 bg-solar-blue text-white text-xs font-bold rounded-full">{proj.amount}</span>
                    <span className="text-xs text-solar-muted uppercase tracking-widest">{proj.location}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-white tracking-tight">{proj.name}</h4>
                  <p className="text-solar-muted text-sm leading-relaxed">{proj.desc}</p>
                </div>
                <a href="#" className="relative z-10 text-solar-blue text-sm font-bold flex items-center gap-2 hover:underline group">
                  Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </StaggerItem>
          ))}

          <div className="md:col-span-3 bg-gradient-to-br from-solar-blue to-blue-700 rounded-[3rem] p-16 flex items-center justify-center text-center relative overflow-hidden h-80 shadow-2xl">
             <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
             <div className="relative z-10 max-w-3xl">
               <p className="text-3xl md:text-5xl font-medium italic text-white leading-tight tracking-tight">"{quote}"</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InvestorsSection = () => (
  <section className="py-32 px-6 bg-gray-50" id="investors">
    <div className="max-w-7xl mx-auto">
      <FadeInUp className="text-center mb-24">
        <span className="inline-block px-4 py-1.5 bg-solar-blue/10 text-solar-blue text-xs font-bold uppercase tracking-widest rounded-full mb-6">
          Investor relations
        </span>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-charcoal leading-tight mb-6">
          Built for the long term.
        </h2>
        <p className="text-solar-muted text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Transparent governance. Sustainable returns. Long-term value creation.
        </p>
      </FadeInUp>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Financial Reports", "Shareholder Info", "ESG Disclosures", "Board & Governance", "Stock Exchange Filings", "Annual General Meeting"].map((item, i) => (
          <StaggerItem key={item} delay={i * 0.05}>
            <div className="relative h-full group">
              <div className="absolute inset-0 bg-solar-blue/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-10 text-center h-full bg-white border border-gray-200 rounded-[2rem] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-8 bg-solar-blue/10 rounded-2xl flex items-center justify-center text-solar-blue">
                  <ExternalLink size={28} />
                </div>
                <h4 className="text-xl font-bold text-charcoal mb-3 tracking-tight">{item}</h4>
                <p className="text-solar-muted text-sm mb-8">Access latest documents & disclosures</p>
                <motion.button className="text-solar-blue font-bold text-sm flex items-center justify-center gap-2 mx-auto hover:gap-4 transition-all" whileHover={{ x: 4 }}>
                  View <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>
          </StaggerItem>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative bg-black text-white" id="contact">
    <div className="py-24 px-6 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="md:col-span-2">
          <div className="text-4xl font-bold tracking-tighter mb-8">SWID</div>
          <p className="text-gray-400 max-w-md mb-12 text-lg font-light leading-relaxed">
            Leading Indian renewable energy EPC partner. We don't just install solar panels; we engineer sustainable futures for India's most ambitious businesses.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3 text-sm text-gray-500"><MapPin size={18} /> India</div>
            <div className="flex items-center gap-3 text-sm text-gray-500"><Mail size={18} /> contact@swid.in</div>
            <div className="flex items-center gap-3 text-sm text-gray-500"><Phone size={18} /> +91 ...</div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="font-bold uppercase tracking-widest text-xs text-solar-blue">Navigation</h5>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['Home', 'Projects', 'Investors', 'CSR', 'Subsidiaries', 'Career'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <h5 className="font-bold uppercase tracking-widest text-xs text-solar-blue">Legal</h5>
          <ul className="space-y-4 text-gray-400 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Compliance', 'ESG Report'].map(l => (
              <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-solar-blue to-transparent shadow-[0_0_20px_#007AFF]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-16 leading-tight">
          <span className="text-shimmer-dark">{CONTENT.footer.ctaTitle}</span>
        </h2>
        <LiquidButton className="bg-solar-blue text-white px-16 py-6 text-2xl font-bold flex items-center gap-4 mx-auto hover:shadow-[0_0_50px_rgba(0,122,255,0.4)]">
          {CONTENT.footer.ctaButton} <ArrowRight size={28} />
        </LiquidButton>
      </motion.div>
    </div>
    <div className="py-12 px-6 text-center text-xs text-zinc-700 border-t border-zinc-900">
      © {new Date().getFullYear()} SWID Renewables. All rights reserved.
    </div>
  </footer>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed top-0 left-0 h-1 bg-solar-blue z-[200] origin-left"
    />
  );
};

const getThemePreference = () => {
  try {
    const savedTheme = window.localStorage.getItem('swid-theme');
    return ['light', 'dark', 'system'].includes(savedTheme) ? savedTheme : 'system';
  } catch {
    return 'system';
  }
};

export default function App() {
  const [theme, setTheme] = useState(getThemePreference);
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (event) => setSystemPrefersDark(event.matches);
    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', updateSystemTheme);
    else mediaQuery.addListener(updateSystemTheme);
    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', updateSystemTheme);
      else mediaQuery.removeListener(updateSystemTheme);
    };
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('swid-theme', theme);
    } catch {
      return;
    }
  }, [theme]);

  const activeTheme = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;

  return (
    <div data-theme={activeTheme} data-theme-mode={theme} className="selection:bg-solar-blue selection:text-white font-sans relative bg-white theme-root">
      <ScrollProgress />
      <Navbar theme={theme} onThemeChange={setTheme} />
      <Hero />
      <Growth />
      <Transition />
      <StatsCounter />
      <Ecosystem />
      <Solutions />
      <Impact />
      <InvestorsSection />
      <Footer />
    </div>
  );
}
