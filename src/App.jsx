import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Menu, ArrowRight, Zap, Shield, TrendingUp, Globe, X, CheckCircle2, Award, Phone, Mail, MapPin,
  Sun, Moon, Monitor, Battery, Factory, Building2, ExternalLink
} from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { CONTENT } from './data/content';
import './apple-effects.css';

const BRAND_LOGO = `${import.meta.env.BASE_URL}images/swid-brand-logo.png`;
const projectMapStyle = (theme) => (
  `https://tiles.openfreemap.org/styles/${theme === 'dark' ? 'dark' : 'positron'}`
);

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
    whileHover={{ scale: 1.02, backgroundColor: "rgba(15, 97, 171, 0.9)" }}
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
    { href: '#home', label: 'Overview' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#project-locations', label: 'Projects' },
    { href: '#projects', label: 'Our approach' },
    { href: '#csr', label: 'Impact' },
    { href: '#investors', label: 'Investors' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`theme-nav ${scrolled ? 'theme-nav-scrolled' : ''}`}>
        <a className="theme-wordmark" href="#home" aria-label="SWID home">
          <img src={BRAND_LOGO} alt="SWID Renewables Limited" />
        </a>
        <div className="theme-desktop-links">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <div className="theme-nav-actions">
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
            className="menu-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className="theme-announcement">
        <span>Engineering a cleaner energy future for business.</span>
        <a href="#solutions">Explore SWID <ArrowRight size={14} /></a>
      </div>

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
  const [activeStoryStage, setActiveStoryStage] = useState(0);
  const storyRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });
  const storyProgress = scrollYProgress;

  const surveyPhotoOpacity = useTransform(storyProgress, [0, 0.1, 0.19, 0.39, 0.5, 1], [0, 0, 1, 1, 0, 0]);
  const installPhotoOpacity = useTransform(storyProgress, [0, 0.39, 0.5, 0.6, 0.68, 0.76, 1], [0, 0, 1, 1, 1, 0, 0]);
  const powerPhotoOpacity = useTransform(storyProgress, [0, 0.6, 0.7, 0.82, 0.87, 1], [0, 0, 0.35, 1, 1, 1]);
  const brandCardOpacity = useTransform(storyProgress, [0, 0.13, 0.28, 0.38, 0.62, 0.7, 0.82, 1], [1, 1, 0.45, 0, 1, 0.55, 0, 0]);
  const panelOpacity = useTransform(storyProgress, [0, 0.34, 0.37, 0.38, 1], [1, 1, 0.5, 0, 0]);
  const panelTilt = useTransform(storyProgress, [0, 0.23, 0.39, 0.535, 0.68, 0.755, 0.9, 1], [0, 0, 12, 10, 0, 0, 0, 0]);
  const panelRotation = useTransform(storyProgress, [0, 0.23, 0.39, 0.535, 0.68, 0.755, 0.9, 1], [0, 0, -3, -2, 0, 0, 0, 0]);
  const panelDrop = useTransform(storyProgress, [0, 0.23, 0.39, 0.535, 0.68, 0.755, 0.9, 1], [0, 0, 18, 12, 0, 0, 0, 0]);
  const surveyScanOpacity = useTransform(storyProgress, [0, 0.16, 0.24, 0.39, 0.48, 1], [0, 0, 1, 1, 0, 0]);
  const energyOpacity = useTransform(storyProgress, [0, 0.6, 0.72, 0.86, 1], [0, 0, 1, 1, 1]);
  const energyLineProgress = useTransform(storyProgress, [0, 0.64, 0.8, 0.92, 1], [0, 0, 1, 1, 1]);
  const energyLineOffset = useTransform(energyLineProgress, (value) => 1 - value);
  const brandProgress = useTransform(storyProgress, [0, 0.79, 0.91, 1], [0, 0, 1, 1]);
  const stageLabels = [
    '01 / Solar cells',
    '02 / Site survey',
    '03 / Rooftop installation',
    '04 / Powering the facility',
    'SWID / Energy at work',
  ];
  const stageScrollPoints = [0.04, 0.27, 0.535, 0.755, 0.94];
  const heroPhotoSource = (source) => source.replace(/([?&]w=)\d+/, (_, prefix) => `${prefix}1200`);
  const navigateToStoryStage = (index) => {
    const section = storyRef.current;
    const stickyStage = section?.querySelector('.launch-hero-sticky');
    if (!section || !stickyStage) return;

    const travel = section.offsetHeight - window.innerHeight;
    const top = window.scrollY + section.getBoundingClientRect().top + travel * stageScrollPoints[index];
    window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  useMotionValueEvent(storyProgress, 'change', (progress) => {
    if (prefersReducedMotion) return;
    const nextStage = progress < 0.16 ? 0 : progress < 0.39 ? 1 : progress < 0.68 ? 2 : progress < 0.83 ? 3 : 4;
    setActiveStoryStage((currentStage) => currentStage === nextStage ? currentStage : nextStage);
  });

  return (
    <section id="home" className={`launch-hero${prefersReducedMotion ? ' launch-hero-reduced' : ''}`} ref={storyRef}>
      <div className="launch-hero-sticky">
        <div className="launch-copy">
          <p className="launch-eyebrow">Clean energy, engineered for business</p>
          <h1>{CONTENT.hero.title}</h1>
          <p className="launch-description">From site survey to power-on, SWID engineers solar installations for commercial facilities.</p>
          <a href="#solutions" className="launch-button">Explore our solutions <ArrowRight size={16} /></a>
        </div>
        <div
          className="launch-stage"
          role="img"
          aria-label="Scroll story: SWID surveys a commercial roof, installs solar panels, and powers the facility"
        >
          <div className="launch-stage-frame">
            <motion.div className="launch-brand-backdrop" style={{ opacity: prefersReducedMotion ? 0 : brandCardOpacity }} />
            <motion.div className="launch-photo-layer launch-photo-survey" style={{ opacity: prefersReducedMotion ? 0 : surveyPhotoOpacity }}>
              <img src={heroPhotoSource(CONTENT.solutions[2].image)} alt="" aria-hidden="true" fetchPriority="high" />
            </motion.div>
            <motion.div className="launch-photo-layer launch-photo-install" style={{ opacity: prefersReducedMotion ? 0 : installPhotoOpacity }}>
              <img src={heroPhotoSource(CONTENT.solutions[0].image)} alt="" aria-hidden="true" loading="eager" />
            </motion.div>
            <motion.div className="launch-photo-layer launch-photo-powered" style={{ opacity: prefersReducedMotion ? 1 : powerPhotoOpacity }}>
              <img src={heroPhotoSource(CONTENT.growth.image)} alt="" aria-hidden="true" loading="eager" />
            </motion.div>
            <motion.svg className="launch-photo-overlay" viewBox="0 0 390 390" aria-hidden="true" focusable="false">
              <motion.g style={{ opacity: prefersReducedMotion ? 0 : surveyScanOpacity }} fill="none" stroke="#8ed8ff" strokeWidth="2">
                <path d="M34 120 187 78l169 48M44 145l142 42 161-49" strokeDasharray="5 5" />
                <path d="M42 108v19m0-9h18M349 115v20m-9-10h18" />
                <circle cx="194" cy="136" r="92" strokeDasharray="2 8" />
              </motion.g>
              <motion.g style={{ opacity: prefersReducedMotion ? 1 : energyOpacity }} fill="none" stroke="#48b4ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M288 194 332 215v61h-70v32h-77"
                  pathLength="1"
                  style={{ strokeDasharray: 1, strokeDashoffset: prefersReducedMotion ? 0 : energyLineOffset }}
                  filter="drop-shadow(0 0 7px rgba(50,163,255,.9))"
                />
                <motion.circle cx="185" cy="308" r="7" fill="#d9f1ff" />
              </motion.g>
            </motion.svg>
            <motion.div
              className={`solar-panel-grid${activeStoryStage >= 3 ? ' solar-panel-grid-powered' : ''}`}
              aria-hidden="true"
              style={{
                opacity: prefersReducedMotion ? 1 : panelOpacity,
                rotateX: prefersReducedMotion ? 0 : panelTilt,
                rotateZ: prefersReducedMotion ? 0 : panelRotation,
                y: prefersReducedMotion ? 0 : panelDrop,
              }}
            >
              {Array.from({ length: 36 }, (_, index) => {
                return (
                  <div
                    key={index}
                    className="solar-tile"
                    style={{
                      animationDelay: `${index * 18}ms`,
                      backgroundImage: `url("${import.meta.env.BASE_URL}images/hero-solar-cell.svg")`,
                    }}
                  />
                );
              })}
            </motion.div>
            <motion.span
              className={`solar-panel-brand${!prefersReducedMotion && activeStoryStage === 4 ? ' solar-panel-brand-reveal' : ''}`}
              style={{ opacity: prefersReducedMotion ? 1 : brandProgress }}
              aria-hidden="true"
            >SWID</motion.span>
          </div>
        </div>
        {!prefersReducedMotion && (
          <nav className="launch-story-controls" aria-label="Solar story stages">
            <span className="launch-story-prompt">Scroll or choose a stage</span>
            <div className="launch-story-stops">
              {stageLabels.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`Go to stage ${index + 1}: ${label.replace(/^\d+ \/ /, '')}`}
                  aria-current={activeStoryStage === index ? 'step' : undefined}
                  className={activeStoryStage === index ? 'launch-story-stop is-active' : 'launch-story-stop'}
                  onClick={() => navigateToStoryStage(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </nav>
        )}
        <div className="launch-assembly-progress" aria-hidden="true">
          <motion.span style={{ scaleX: prefersReducedMotion ? 1 : storyProgress }} />
        </div>
        <div className="launch-caption">
          <span>{prefersReducedMotion ? 'SWID / Energy at work' : stageLabels[activeStoryStage]}</span>
          <span>Commercial solar / Engineered by SWID</span>
        </div>
      </div>
    </section>
  );
};

const Growth = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const storySteps = [
    {
      title: 'Site survey',
      description: 'We assess your roof, energy use, and site conditions before design begins.',
      scene: 'Survey markers map the facility roof.',
    },
    {
      title: 'System design',
      description: 'Our engineers shape a solar layout around your facility and generation needs.',
      scene: 'A digital panel layout is placed over the roof.',
    },
    {
      title: 'Equipment selection',
      description: 'Panels, inverters, and system components are selected for the project requirements.',
      scene: 'Solar equipment arrives at the project site.',
    },
    {
      title: 'Panel installation',
      description: 'Installation teams build the array with safety and quality controls at each stage.',
      scene: 'Solar panels are installed across the roof.',
    },
    {
      title: 'Electrical integration',
      description: 'The solar plant is connected into your facility’s electrical system.',
      scene: 'Cabling links the solar array with the facility.',
    },
    {
      title: 'Testing and commissioning',
      description: 'The completed plant is inspected, tested, and commissioned before handover.',
      scene: 'The installation passes testing and commissioning.',
    },
    {
      title: 'Power generation',
      description: 'Your commissioned solar plant starts generating power for your business.',
      scene: 'The facility is powered by its completed solar plant.',
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const updateActiveStep = () => {
      const section = sectionRef.current;
      const stickyStage = section?.querySelector('.growth-story-sticky');
      if (!section || !stickyStage) return;

      const travel = section.offsetHeight - stickyStage.offsetHeight;
      const progress = travel > 0
        ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel))
        : 0;
      const nextStep = Math.min(storySteps.length - 1, Math.floor(progress * storySteps.length));
      setActiveStep((currentStep) => currentStep === nextStep ? currentStep : nextStep);
    };

    updateActiveStep();
    window.addEventListener('scroll', updateActiveStep, { passive: true });
    window.addEventListener('resize', updateActiveStep);
    return () => {
      window.removeEventListener('scroll', updateActiveStep);
      window.removeEventListener('resize', updateActiveStep);
    };
  }, [prefersReducedMotion, storySteps.length]);

  const displayStep = prefersReducedMotion ? storySteps.length - 1 : activeStep;
  const completedStep = (step) => displayStep >= step;

  return (
    <section
      id="growth"
      className={`growth-story${prefersReducedMotion ? ' growth-story-reduced' : ''}`}
      ref={sectionRef}
    >
      <div className="growth-story-sticky">
        <div className="growth-story-topline">
          <span>SWID / SOLAR EPC</span>
          <span>From rooftop to ready</span>
        </div>

        <div className="growth-story-layout">
          <div className="growth-story-copy">
            <p className="growth-launch-eyebrow">A smarter way to power business</p>
            <h2>{CONTENT.growth.title}</h2>
            <p className="growth-launch-description">{CONTENT.growth.subtitle}</p>

            <div className="growth-story-active-step" aria-live="polite">
              <p className="growth-story-step-count">STEP {String(displayStep + 1).padStart(2, '0')} / 07</p>
              <h3>{storySteps[displayStep].title}</h3>
              <p>{storySteps[displayStep].description}</p>
              {displayStep === storySteps.length - 1 && (
                <div className="growth-story-cta-wrap">
                  <a className="growth-launch-primary" href="#contact">Talk to SWID <ArrowRight size={15} /></a>
                </div>
              )}
            </div>

            <ol className="growth-story-step-list" aria-label="Solar installation process">
              {storySteps.map((step, index) => (
                <li key={step.title} className={index === displayStep ? 'growth-story-step-current' : ''}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{step.title}</span>
                </li>
              ))}
            </ol>
            <a className="growth-story-mobile-cta" href="#contact">Talk to SWID <ArrowRight size={15} /></a>
          </div>

          <div className={`growth-story-scene growth-story-scene-step-${displayStep}`} role="img" aria-label={storySteps[displayStep].scene}>
            <div className="growth-story-scene-sky" />
            <div className="growth-story-sun" />
            <div className="growth-story-cloud growth-story-cloud-one" />
            <div className="growth-story-cloud growth-story-cloud-two" />
            <div className="growth-story-scene-label">SWID / PROJECT DELIVERY</div>
            <svg className="growth-story-facility" viewBox="0 0 760 470" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="roof-gradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#26384f" />
                  <stop offset="1" stopColor="#101824" />
                </linearGradient>
                <linearGradient id="building-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#263243" />
                  <stop offset="1" stopColor="#151b25" />
                </linearGradient>
              </defs>
              <path d="M0 374 760 344v126H0z" fill="#111923" />
              <path d="M98 249 342 187l308 74v148H98z" fill="url(#building-gradient)" stroke="#657187" strokeWidth="2" />
              <path d="m98 249 244-62 308 74-244 66z" fill="url(#roof-gradient)" stroke="#98a8bf" strokeWidth="2" />
              <path d="M123 260 342 205l279 67-220 58z" fill="#172b40" opacity=".75" />
              <path d="M185 284v116m72-135v153m73-171v189m73-171v160m73-141v122m73-103v84" stroke="#66788e" strokeWidth="2" opacity=".45" />
              <path d="M98 249v148m552-74v148" stroke="#8090a4" strokeWidth="2" opacity=".55" />
              <path d="M132 322h20v32h-20zm52-13h20v32h-20zm52-13h20v32h-20zm52-13h20v32h-20zm52-13h20v32h-20zm52-13h20v32h-20zm52 13h20v32h-20zm52 13h20v32h-20zm52 13h20v32h-20z" fill="#95abc2" opacity=".68" />
              <path d="M555 200v-83h43v93" fill="#222e3c" stroke="#71839a" strokeWidth="2" />
              <path d="M565 135h23m-23 17h23m-23 17h23" stroke="#91a3b9" strokeWidth="2" opacity=".65" />
              <g className={`growth-story-roof-grid${completedStep(1) ? ' is-visible' : ''}`}>
                {Array.from({ length: 12 }, (_, index) => {
                  const row = Math.floor(index / 4);
                  const column = index % 4;
                  return (
                    <polygon
                      key={index}
                      points={`${165 + column * 46 + row * 15},${239 + row * 12} ${204 + column * 46 + row * 15},${229 + row * 12} ${247 + column * 46 + row * 15},${239 + row * 12} ${208 + column * 46 + row * 15},${250 + row * 12}`}
                      fill="#0786ff"
                      fillOpacity=".58"
                      stroke="#87c7ff"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </g>
              <g className={`growth-story-wires${completedStep(4) ? ' is-visible' : ''}`} fill="none" stroke="#38bdf8" strokeWidth="3">
                <path d="m220 283 72 103h212l65-58" />
                <path d="M505 328h54v51" />
              </g>
              <g className={`growth-story-checks${completedStep(5) ? ' is-visible' : ''}`} fill="#83f0c2" stroke="#061a17" strokeWidth="2">
                <circle cx="210" cy="245" r="15" /><path d="m203 245 5 5 10-11" fill="none" stroke="#061a17" strokeWidth="3" />
                <circle cx="405" cy="236" r="15" /><path d="m398 236 5 5 10-11" fill="none" stroke="#061a17" strokeWidth="3" />
                <circle cx="554" cy="282" r="15" /><path d="m547 282 5 5 10-11" fill="none" stroke="#061a17" strokeWidth="3" />
              </g>
            </svg>
            <div className={`growth-story-survey${completedStep(0) ? ' is-visible' : ''}`}><span />SURVEY SCAN</div>
            <div className={`growth-story-delivery${completedStep(2) ? ' is-visible' : ''}`}>
              <span className="growth-story-delivery-box">SWID</span>
              <span className="growth-story-delivery-base" />
            </div>
            <div className={`growth-story-power${completedStep(6) ? ' is-visible' : ''}`}>
              <Zap size={17} fill="currentColor" />
              <span>GENERATING</span>
            </div>
            <div className="growth-story-results" aria-label="SWID project results">
              {CONTENT.stats.items.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.prefix}{stat.value}{stat.suffix}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="growth-story-scene-caption">{storySteps[displayStep].scene}</div>
          </div>
        </div>

        <div className="growth-story-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${(displayStep + 1) / storySteps.length})` }} />
        </div>
        <div className="growth-story-footer">
          <span>{prefersReducedMotion ? 'SOLAR EPC / END TO END' : 'SCROLL TO FOLLOW THE BUILD'}</span>
          <span>{String(displayStep + 1).padStart(2, '0')} — 07</span>
        </div>
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

  const clampProgress = (value) => Math.min(1, Math.max(0, value));
  const traditionalOpacity = 1 - clampProgress(progress / 0.43);
  const solarOpacity = clampProgress((progress - 0.56) / 0.26);
  const traditionalImageOpacity = 1 - progress;
  const solarImageOpacity = progress;

  return (
    <section ref={sectionRef} className="photo-contrast transition-story" id="transition">
      <div className="transition-story-sticky">
        <div className="transition-story-image" style={{ opacity: traditionalImageOpacity }} aria-hidden="true">
          <img
            src={CONTENT.growth.image}
            alt=""
          />
          <div />
        </div>

        <div className="transition-story-image" style={{ opacity: solarImageOpacity }} aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=90"
            alt=""
          />
          <div />
        </div>

        <div className="transition-story-content">
          <div className="transition-scene" style={{ opacity: traditionalOpacity, transform: `translateY(${(1 - traditionalOpacity) * -16}px)` }} aria-hidden={traditionalOpacity < 0.01}>
            <p className="transition-eyebrow">01 / The old energy model</p>
            <h3>{CONTENT.transition.traditional.title}</h3>
            <p className="transition-description">{CONTENT.transition.traditional.desc}</p>
            <div className="transition-points">
              {["Volatile Fuel Costs", "Carbon Compliance Risk", "Grid Dependency", "Maintenance Overhead"].map((item) => (
                <span key={item}><i />{item}</span>
              ))}
            </div>
          </div>

          <div className="transition-scene transition-scene-solar" style={{ opacity: solarOpacity, transform: `translateY(${(1 - solarOpacity) * 16}px)` }} aria-hidden={solarOpacity < 0.01}>
            <p className="transition-eyebrow">02 / The solar advantage</p>
            <h3>{CONTENT.transition.solar.title}</h3>
            <p className="transition-description">{CONTENT.transition.solar.desc}</p>
            <div className="transition-points">
              {["Fixed Energy Costs", "Zero Carbon Footprint", "Energy Independence", "Predictable Returns"].map((item) => (
                <span key={item}><CheckCircle2 size={16} />{item}</span>
              ))}
            </div>
            <a href="#solutions" className="transition-cta">Explore solar solutions <ArrowRight size={15} /></a>
          </div>
        </div>

        <div className="transition-progress">
          <div style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="transition-hint">
          {progress >= 0.98 ? 'Scroll up to compare' : 'Scroll to compare'}
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

const ProjectLocations = ({ theme }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const currentTheme = useRef(theme);
  currentTheme.current = theme;
  const styleRef = useRef(projectMapStyle(theme));
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [mapStatus, setMapStatus] = useState('loading');
  const locations = CONTENT.projectLocations.filter((project) => (
    Number.isFinite(project.latitude)
    && Number.isFinite(project.longitude)
    && project.latitude >= -90
    && project.latitude <= 90
    && project.longitude >= -180
    && project.longitude <= 180
  ));

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const loadWhenNearViewport = () => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (bounds && bounds.top <= window.innerHeight + 300 && bounds.bottom >= -300) {
        setShouldLoadMap(true);
        window.removeEventListener('scroll', loadWhenNearViewport);
        window.removeEventListener('resize', loadWhenNearViewport);
      }
    };
    loadWhenNearViewport();
    window.addEventListener('scroll', loadWhenNearViewport, { passive: true });
    window.addEventListener('resize', loadWhenNearViewport);
    return () => {
      window.removeEventListener('scroll', loadWhenNearViewport);
      window.removeEventListener('resize', loadWhenNearViewport);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !shouldLoadMap) return undefined;

    setMapStatus('loading');
    let map;
    let popup = null;
    let selectedProjectId = null;
    let hoverTimeout;
    let disposed = false;

    const clearHoverTimeout = () => {
      window.clearTimeout(hoverTimeout);
    };
    const schedulePopupClose = () => {
      clearHoverTimeout();
      hoverTimeout = window.setTimeout(() => {
        if (selectedProjectId === null) {
          popup?.remove();
          popup = null;
        }
      }, 180);
    };
    const closePersistentPopup = () => {
      selectedProjectId = null;
      popup?.remove();
      popup = null;
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape' && selectedProjectId !== null) {
        closePersistentPopup();
      }
    };

    const initializeMap = async () => {
      try {
        const maplibregl = await import('maplibre-gl');
        if (disposed) return;

        maplibregl.setWorkerUrl(maplibreWorkerUrl);
        const initialStyle = projectMapStyle(currentTheme.current);
        map = new maplibregl.Map({
          container: containerRef.current,
          style: initialStyle,
          center: [78.9629, 20.5937],
          zoom: 4,
        });
        mapRef.current = map;
        styleRef.current = initialStyle;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
        map.on('load', () => {
          if (!disposed) setMapStatus('ready');
        });
        map.on('error', (event) => {
          if (!disposed) {
            console.error('Unable to load the project map.', event.error);
            setMapStatus('error');
          }
        });

        const openPopup = (project, persistent = false) => {
          if (selectedProjectId !== null && selectedProjectId !== project.id) return;
          clearHoverTimeout();
          if (persistent) selectedProjectId = project.id;
          const previousPopup = popup;
          popup = null;
          previousPopup?.remove();

          const content = document.createElement('div');
          content.className = 'project-location-popup';
          const image = document.createElement('img');
          image.src = `${import.meta.env.BASE_URL}${project.image.replace(/^\/+/, '')}`;
          image.alt = project.imageAlt;
          image.loading = 'lazy';
          image.addEventListener('error', () => {
            const fallback = document.createElement('div');
            fallback.className = 'project-location-image-fallback';
            fallback.textContent = 'Project photo unavailable.';
            image.replaceWith(fallback);
          }, { once: true });
          const name = document.createElement('strong');
          name.textContent = project.name;
          content.append(image, name);

          const nextPopup = new maplibregl.Popup({
            closeButton: true,
            closeOnClick: false,
            offset: 20,
            className: 'project-location-popup-shell',
          })
            .setLngLat([project.longitude, project.latitude])
            .setDOMContent(content)
            .addTo(map);
          popup = nextPopup;
          nextPopup.on('close', () => {
            if (popup === nextPopup) {
              popup = null;
              if (selectedProjectId === project.id) selectedProjectId = null;
            }
          });
          const popupElement = nextPopup.getElement();
          popupElement.addEventListener('mouseenter', clearHoverTimeout);
          popupElement.addEventListener('mouseleave', schedulePopupClose);
          popupElement.addEventListener('focusin', clearHoverTimeout);
          popupElement.addEventListener('focusout', (event) => {
            if (!popupElement.contains(event.relatedTarget)) schedulePopupClose();
          });
        };

        document.addEventListener('keydown', handleEscape);

        if (locations.length > 0) {
          const bounds = new maplibregl.LngLatBounds();
          locations.forEach((project) => {
            bounds.extend([project.longitude, project.latitude]);
            const marker = document.createElement('button');
            marker.type = 'button';
            marker.className = 'project-location-marker';
            marker.setAttribute('aria-label', `Show project location: ${project.name}`);
            marker.title = project.name;
            marker.addEventListener('mouseenter', () => openPopup(project));
            marker.addEventListener('mouseleave', schedulePopupClose);
            marker.addEventListener('focus', () => openPopup(project));
            marker.addEventListener('blur', schedulePopupClose);
            marker.addEventListener('click', (event) => {
              event.stopPropagation();
              openPopup(project, true);
            });

            new maplibregl.Marker({ element: marker, anchor: 'bottom' })
              .setLngLat([project.longitude, project.latitude])
              .addTo(map);
          });
          map.fitBounds(bounds, { padding: 72, maxZoom: 8, duration: 900 });
        }
      } catch (error) {
        if (!disposed) {
          console.error('Unable to initialize the project map.', error);
          setMapStatus('error');
        }
      }
    };

    initializeMap();

    return () => {
      disposed = true;
      clearHoverTimeout();
      document.removeEventListener('keydown', handleEscape);
      map?.remove();
      mapRef.current = null;
    };
  }, [shouldLoadMap]);

  useEffect(() => {
    const nextStyle = projectMapStyle(theme);
    if (mapRef.current && styleRef.current !== nextStyle) {
      mapRef.current.setStyle(nextStyle);
      styleRef.current = nextStyle;
    }
  }, [theme]);

  const mapMessage = 'The project map could not load. Check your network connection and try again.';

  return (
    <section className="py-32 px-6 bg-gray-50" id="project-locations">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Project Locations"
          subtitle="Explore six illustrative demo pins across India; these are not actual SWID project sites."
        />
        {locations.length > 0 && (
          <p className="project-location-demo-copy">
            Demo coordinates are approximate city-center examples, and every pin uses the same illustrative solar artwork.
          </p>
        )}
        {locations.length === 0 && (
          <p className="project-location-empty-copy">
            No public project locations have been added yet. Approved projects will appear here when their details are published.
          </p>
        )}
        <div className="project-map-frame">
          <div
            ref={containerRef}
            className="project-map-canvas"
            role="region"
            aria-label="Interactive map of illustrative solar project locations"
          />
          {mapStatus === 'error' ? (
            <div className="project-map-message" role="status">
              <MapPin size={24} aria-hidden="true" />
              <p>{mapMessage}</p>
            </div>
          ) : mapStatus === 'loading' ? (
            <div className="project-map-message" role="status">Loading project map…</div>
          ) : null}
        </div>
        <p className="project-map-caption">
          DEMO pins use approximate city-center coordinates and are not actual SWID projects. Map data © OpenStreetMap contributors, via OpenFreeMap.
        </p>
      </div>
    </section>
  );
};

const Impact = () => {
  const { title, stats, projects, quote } = CONTENT.impact;
  const prefersReducedMotion = useReducedMotion();
  const [impactAmount, impactUnit] = stats[0].value.split(' ');

  return (
    <section className="py-32 px-6 bg-white" id="csr">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={title}
          subtitle="Our responsibility extends beyond the grid. We invest in communities where we operate."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            className="impact-feature-card md:col-span-2"
          >
            <div className="impact-feature-orbit impact-feature-orbit-one" aria-hidden="true" />
            <div className="impact-feature-orbit impact-feature-orbit-two" aria-hidden="true" />
            <div className="impact-feature-content">
              <span className="impact-feature-eyebrow">
                <span className="impact-feature-live-dot" aria-hidden="true" />
                Community impact
              </span>
              <p className="impact-feature-label">CSR Contribution</p>
              <h3 className="impact-feature-amount" aria-label={stats[0].value}>
                <span>{impactAmount}</span>
                <span className="impact-feature-unit">{impactUnit}</span>
              </h3>
              <p className="impact-feature-description">
                Supporting community initiatives where we operate.
              </p>
            </div>
            <span className="impact-feature-index" aria-hidden="true">SWID · IMPACT</span>
          </motion.div>

          <div className="impact-stats-stack">
            {stats.slice(1).map((s, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                className="impact-stat-card"
              >
                <div className="impact-stat-value">{s.value}</div>
                <div className="impact-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={prefersReducedMotion ? undefined : { y: -5 }}
              className="impact-recipient-card"
            >
              <div className="impact-recipient-art" aria-hidden="true">
                <span className="impact-recipient-art-ring" />
                <span className="impact-recipient-art-label">COMMUNITY<br />PARTNERSHIP</span>
              </div>
              <div className="impact-recipient-content">
                <div className="impact-recipient-meta">
                  <span className="impact-recipient-amount">{proj.amount}</span>
                  <span className="impact-recipient-location">
                    <MapPin size={13} aria-hidden="true" />
                    {proj.location}
                  </span>
                </div>
                <h4 className="impact-recipient-name">{proj.name}</h4>
                <p className="impact-recipient-description">{proj.desc}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="impact-quote-card md:col-span-3"
          >
            <span className="impact-quote-mark" aria-hidden="true">“</span>
            <p>{quote}</p>
          </motion.div>
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
          <img className="footer-brand-logo mb-8" src={BRAND_LOGO} alt="SWID Renewables Limited" />
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
              <li key={l}><a href={l === 'Projects' ? '#project-locations' : '#'} className="hover:text-white transition-colors">{l}</a></li>
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
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-solar-blue to-transparent shadow-[0_0_20px_#0f61ab]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center z-10"
      >
        <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-16 leading-tight">
          <span className="text-shimmer-dark">{CONTENT.footer.ctaTitle}</span>
        </h2>
        <LiquidButton className="bg-solar-blue text-white px-16 py-6 text-2xl font-bold flex items-center gap-4 mx-auto hover:shadow-[0_0_50px_rgba(15,97,171,0.4)]">
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
      <ProjectLocations theme={activeTheme} />
      <Impact />
      <InvestorsSection />
      <Footer />
    </div>
  );
}
