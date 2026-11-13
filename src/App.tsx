/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  BRAND_ASSETS,
  EquipmentItem,
  FAQ_ITEMS,
  FOUNDERS,
  LOCATIONS,
  STUDIO_VIDEOS,
  StudioVideo,
  SUCCESS_STORIES,
  SuccessStory,
  TRAINERS,
  TrainerProfile,
  UNIFIED_EQUIPMENT,
  WHY_US_FEATURES,
} from './data/gymData';

type NavSection =
  | 'home'
  | 'locations'
  | 'founder'
  | 'trainers'
  | 'equipment'
  | 'zumba'
  | 'results'
  | 'seo-guide'
  | 'faq'
  | 'contact';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavSection>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [is404, setIs404] = useState(false);

  // Lightbox & Modal states
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerProfile | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [selectedTransformation, setSelectedTransformation] = useState<SuccessStory | null>(null);
  const [activeStudioVideo, setActiveStudioVideo] = useState<StudioVideo | null>(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const zumbaVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [playingZumbaId, setPlayingZumbaId] = useState<string | null>(null);

  // Countdown timer state
  const [secondsLeft, setSecondsLeft] = useState(5 * 86400 + 12 * 3600 + 45 * 60 + 30);

  // Website Visitor Counter (Visitor count only)
  const [visitorCount, setVisitorCount] = useState<number>(1);
  useEffect(() => {
    try {
      const storageKey = 'fitxfreak_website_visitors';
      const sessionKey = 'fitxfreak_visit_counted';
      const storedRaw = window.localStorage.getItem(storageKey);
      const current = storedRaw ? Math.max(0, parseInt(storedRaw, 10) || 0) : 0;
      if (!window.sessionStorage.getItem(sessionKey)) {
        const updated = current + 1;
        window.localStorage.setItem(storageKey, String(updated));
        window.sessionStorage.setItem(sessionKey, '1');
        setVisitorCount(updated);
      } else {
        const ensured = current > 0 ? current : 1;
        if (current <= 0) {
          window.localStorage.setItem(storageKey, String(ensured));
        }
        setVisitorCount(ensured);
      }
    } catch {
      setVisitorCount(1);
    }
  }, []);

  // Lead form state (Mandatory branch selection)
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [preferredBranch, setPreferredBranch] = useState<'OP Road' | 'Fatehgunj'>('OP Road');
  const [interestedIn, setInterestedIn] = useState('Personal Training');
  const [preferredTime, setPreferredTime] = useState('Morning (06:00 AM - 12:00 PM)');
  const [messageGoals, setMessageGoals] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastDispatchedNumber, setLastDispatchedNumber] = useState('6354661053');

  // Visitor Auto Welcome Pass Modal
  const [visitorModalOpen, setVisitorModalOpen] = useState(false);
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorBranch, setVisitorBranch] = useState<'OP Road' | 'Fatehgunj'>('OP Road');
  const [visitorSubmitted, setVisitorSubmitted] = useState(false);

  // Window width tracking for responsive sliders
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive items-to-show helper
  // Trainers: 3 on desktop, 2 on tablet, 1 on mobile
  const trainersPerView = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;
  // Zumba videos: 3 on desktop, 2 on tablet, 1 on mobile (matches Trainers arrangement)
  const zumbaVideos = STUDIO_VIDEOS.filter((v) => v.category === 'Zumba & Group Fitness');
  const zumbaPerView = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;
  // Transformations: 3 on desktop, 2 on tablet, 1 on mobile (matches Trainers section)
  const transformationsPerView = windowWidth >= 1024 ? 3 : windowWidth >= 640 ? 2 : 1;
  // Equipment: 4 on desktop, 2 on tablet, 1 on mobile
  const equipmentPerView = windowWidth >= 1024 ? 4 : windowWidth >= 640 ? 2 : 1;

  // Slider State 1: Trainers Slider
  const [trainerIndex, setTrainerIndex] = useState(0);
  const [trainerHovered, setTrainerHovered] = useState(false);
  const trainerTouchStart = useRef<number | null>(null);

  const maxTrainerIndex = Math.max(0, TRAINERS.length - trainersPerView);

  // Clamp trainerIndex on resize
  useEffect(() => {
    setTrainerIndex((prev) => Math.min(prev, maxTrainerIndex));
  }, [maxTrainerIndex]);

  // Auto-slide trainers
  useEffect(() => {
    if (trainerHovered || maxTrainerIndex === 0) return;
    const interval = setInterval(() => {
      setTrainerIndex((prev) => (prev >= maxTrainerIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [trainerHovered, maxTrainerIndex]);

  // Slider State 1b: Zumba Videos Slider (Matches Trainers Arrangement)
  const [zumbaIndex, setZumbaIndex] = useState(0);
  const zumbaTouchStart = useRef<number | null>(null);

  const maxZumbaIndex = Math.max(0, zumbaVideos.length - zumbaPerView);

  useEffect(() => {
    setZumbaIndex((prev) => Math.min(prev, maxZumbaIndex));
  }, [maxZumbaIndex]);

  const pauseOtherZumbaVideos = (activeId: string) => {
    Object.entries(zumbaVideoRefs.current).forEach(([id, el]) => {
      if (id !== activeId && el && !el.paused) {
        el.pause();
      }
    });
  };

  const handleToggleZumbaVideo = async (videoId: string) => {
    const el = zumbaVideoRefs.current[videoId];
    if (!el) return;
    if (el.paused) {
      pauseOtherZumbaVideos(videoId);
      if (el.readyState === 0) {
        el.load();
      }
      try {
        await el.play();
      } catch {
        el.muted = true;
        await el.play().catch(() => {});
      }
    } else {
      el.pause();
    }
  };

  // Slider State 2: Transformations Slider (Matches Trainers Carousel)
  const [transformationIndex, setTransformationIndex] = useState(0);
  const [transformationHovered, setTransformationHovered] = useState(false);
  const transformationTouchStart = useRef<number | null>(null);

  const maxTransformationIndex = Math.max(0, SUCCESS_STORIES.length - transformationsPerView);

  // Clamp transformationIndex on resize
  useEffect(() => {
    setTransformationIndex((prev) => Math.min(prev, maxTransformationIndex));
  }, [maxTransformationIndex]);

  // Auto-slide transformations
  useEffect(() => {
    if (transformationHovered || maxTransformationIndex === 0) return;
    const interval = setInterval(() => {
      setTransformationIndex((prev) => (prev >= maxTransformationIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [transformationHovered, maxTransformationIndex]);

  // Slider State 3: UNIFIED EQUIPMENT SLIDER (Combining both locations)
  const [equipmentIndex, setEquipmentIndex] = useState(0);
  const [equipmentHovered, setEquipmentHovered] = useState(false);
  const [equipmentBranchFilter, setEquipmentBranchFilter] = useState<'all' | 'op-road' | 'fatehgunj'>('all');
  const equipmentTouchStart = useRef<number | null>(null);

  const displayedEquipment = UNIFIED_EQUIPMENT.filter((item) => {
    if (equipmentBranchFilter === 'all') return true;
    return item.branchId === equipmentBranchFilter;
  });

  const maxEquipmentIndex = Math.max(0, displayedEquipment.length - equipmentPerView);

  // Clamp equipmentIndex on resize or filter change
  useEffect(() => {
    setEquipmentIndex((prev) => Math.min(prev, maxEquipmentIndex));
  }, [maxEquipmentIndex]);

  // Auto-slide unified equipment
  useEffect(() => {
    if (equipmentHovered || maxEquipmentIndex === 0) return;
    const interval = setInterval(() => {
      setEquipmentIndex((prev) => (prev >= maxEquipmentIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [equipmentHovered, maxEquipmentIndex]);

  // Countdown tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 5 * 86400 + 12 * 3600 + 45 * 60 + 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 404 route check
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== '/' &&
      window.location.pathname !== '' &&
      !window.location.pathname.startsWith('/#')
    ) {
      setIs404(true);
    }
  }, []);

  // Scroll spy matching exact DOM section order
  useEffect(() => {
    const sectionIds: NavSection[] = [
      'home',
      'locations',
      'founder',
      'trainers',
      'equipment',
      'zumba',
      'results',
      'seo-guide',
      'faq',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveNav(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const days = String(Math.floor(secondsLeft / 86400)).padStart(2, '0');
  const hours = String(Math.floor((secondsLeft % 86400) / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const scrollToSection = (
    sectionId: NavSection,
    prefillOptions?: {
      branch?: 'OP Road' | 'Fatehgunj';
      interest?: string;
      goalNote?: string;
    }
  ) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);

    if (prefillOptions?.branch) {
      setPreferredBranch(prefillOptions.branch);
    }
    if (prefillOptions?.interest) {
      setInterestedIn(prefillOptions.interest);
    }
    if (prefillOptions?.goalNote) {
      setMessageGoals(prefillOptions.goalNote);
      setFormSubmitted(false);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getBranchContact = (branch: 'OP Road' | 'Fatehgunj') => {
    if (branch === 'OP Road') {
      return {
        name: 'FIT X FREAK – OP Road',
        phone: '6354661053',
        formatted: '+91 6354661053',
        address: '7-8th Floor, Avishkar Complex, Old Padra Road, Vadodara – 390007',
      };
    }
    return {
      name: 'FIT X FREAK – Fatehgunj',
      phone: '8733944072',
      formatted: '+91 8733944072',
      address: '1st and 2nd Floor, Astoria Complex, Beside Seven Seas Mall, Fatehgunj, Vadodara – 390008',
    };
  };

  const openWhatsAppChat = (branch: 'OP Road' | 'Fatehgunj', customText?: string) => {
    const contact = getBranchContact(branch);
    const defaultText = `Hello ${contact.name}, I would like to inquire about training programs, equipment, and visiting the gym.`;
    const text = customText || defaultText;
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/91${contact.phone}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const branchInfo = getBranchContact(preferredBranch);
    setLastDispatchedNumber(branchInfo.phone);
    setFormSubmitted(true);

    const message = [
      `*NEW FIT X FREAK ENQUIRY – ${preferredBranch.toUpperCase()} BRANCH*`,
      `━━━━━━━━━━━━━━━━━━━`,
      `👤 *Customer Name:* ${fullName || 'Not provided'}`,
      `📱 *Mobile Number:* ${mobileNumber || 'Not provided'}`,
      `✉️ *Email Address:* ${emailAddress || 'Not provided'}`,
      `📍 *Selected Gym Location:* ${branchInfo.name}`,
      `🎯 *Interested In:* ${interestedIn}`,
      `⏰ *Preferred Time:* ${preferredTime}`,
      messageGoals ? `💬 *Goals / Enquiry Details:* ${messageGoals}` : '',
      `━━━━━━━━━━━━━━━━━━━`,
      `_Dispatched to branch hotline: ${branchInfo.phone}_`,
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/91${branchInfo.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleResetForm = () => {
    setFullName('');
    setMobileNumber('');
    setEmailAddress('');
    setPreferredBranch('OP Road');
    setInterestedIn('Personal Training');
    setPreferredTime('Morning (06:00 AM - 12:00 PM)');
    setMessageGoals('');
    setFormSubmitted(false);
  };

  // Auto trigger Visitor VIP Welcome Pass popup after 4 seconds
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('fitxfreak_visitor_popup_seen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setVisitorModalOpen(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleVisitorLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorEmail) return;

    const branchInfo = getBranchContact(visitorBranch);

    try {
      const stored = JSON.parse(localStorage.getItem('fitxfreak_visitor_leads') || '[]');
      stored.unshift({
        email: visitorEmail,
        phone: visitorPhone || 'Not provided',
        branch: branchInfo.name,
        timestamp: new Date().toLocaleString(),
      });
      localStorage.setItem('fitxfreak_visitor_leads', JSON.stringify(stored));
    } catch {
      // ignore
    }

    setVisitorSubmitted(true);
    sessionStorage.setItem('fitxfreak_visitor_popup_seen', 'true');

    const message = [
      `🎁 *NEW WEBSITE VISITOR - 1-DAY FREE PASS*`,
      `━━━━━━━━━━━━━━━━━━━`,
      `📧 *Visitor Email:* ${visitorEmail}`,
      `📱 *Visitor Phone:* ${visitorPhone || 'Not provided'}`,
      `📍 *Selected Gym Location:* ${branchInfo.name}`,
      `⏰ *Visited Time:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      `━━━━━━━━━━━━━━━━━━━`,
      `_Direct Branch Alert to WhatsApp: ${branchInfo.phone}_`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/91${branchInfo.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const navItems: { id: NavSection; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'locations', label: 'Locations' },
    { id: 'founder', label: 'Founders' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'zumba', label: 'Zumba' },
    { id: 'results', label: 'Results' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];

  // Custom 404 Page (Requirement #9: Technical SEO custom 404 page)
  if (is404) {
    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col items-center justify-center p-gutter text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,84,76,0.18)_0,transparent_70%)] pointer-events-none" />
        <div className="max-w-xl w-full p-space-xl rounded-2xl bg-surface-container border border-primary/40 shadow-[0_0_50px_rgba(255,84,76,0.25)] relative z-10 flex flex-col items-center gap-space-md">
          <img
            alt="FIT X FREAK Logo"
            className="h-16 w-16 rounded-full object-contain bg-white/95 p-1 shadow-lg border border-primary/40"
            src={BRAND_ASSETS.logo}
          />
          <span className="font-headline-hero text-6xl sm:text-8xl text-primary leading-none tracking-widest">
            404
          </span>
          <h1 className="font-headline-lg uppercase text-on-surface text-xl sm:text-2xl">
            BEAST MODE LOST IN VADODARA?
          </h1>
          <p className="text-body-md text-on-surface-variant text-sm max-w-md">
            The page or workout route you are looking for does not exist. Let's get you back to the training floor at OP Road or Fatehgunj!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs w-full">
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/');
                setIs404(false);
              }}
              className="px-space-lg py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              Return to FIT X FREAK Home
            </button>
            <button
              type="button"
              onClick={() => {
                window.history.pushState({}, '', '/#locations');
                setIs404(false);
                setTimeout(() => scrollToSection('locations'), 50);
              }}
              className="px-space-lg py-2.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold uppercase hover:bg-surface-container-highest transition-all border border-outline-variant/30 cursor-pointer"
            >
              Explore 2 Vadodara Branches
            </button>
          </div>
          <div className="w-full pt-space-md border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between text-xs text-on-surface-variant gap-2">
            <span>OP Road: <a href="tel:+916354661053" className="text-primary font-mono font-bold">+91 6354661053</a></span>
            <span>Fatehgunj: <a href="tel:+918733944072" className="text-primary font-mono font-bold">+91 8733944072</a></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface dark selection:bg-primary selection:text-on-primary overflow-x-clip">
      {/* HEADER: No profile icon, No location dropdown in header */}
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.5)] border-b border-outline-variant/15">
        <div className="h-16 sm:h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-2">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-2 sm:gap-3 focus:outline-none group shrink-0"
          >
            <img
              alt="FIT X FREAK Logo"
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-contain bg-white/95 p-0.5 shadow-[0_0_15px_rgba(255,51,51,0.25)] border border-primary/40 transition-transform group-hover:scale-105 shrink-0"
              src={BRAND_ASSETS.logo}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-headline-md text-on-surface uppercase tracking-wider leading-none text-base sm:text-xl xl:text-2xl whitespace-nowrap">
                FIT X FREAK
              </span>
              <span className="text-[10px] text-primary tracking-widest uppercase font-semibold hidden xl:block whitespace-nowrap">
                Vadodara's Best Gym · OP Road &amp; Fatehgunj
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-space-sm xl:gap-space-md">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={
                    isActive
                      ? 'transition-colors bg-primary text-on-primary font-bold px-2.5 py-1 rounded text-xs xl:text-sm whitespace-nowrap'
                      : 'text-xs xl:text-sm text-on-surface-variant hover:text-on-surface px-1.5 py-1 transition-colors whitespace-nowrap'
                  }
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-space-sm">
            <button
              type="button"
              onClick={() => setCallModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-semibold hover:border-primary hover:text-primary transition-all cursor-pointer"
              title="Call Branches"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">call</span>
              <span>Call Us</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact', { interest: 'Free Trial Session' });
              }}
              className="inline-flex items-center px-3 py-2 sm:px-space-lg sm:py-space-sm bg-gradient-to-r from-primary-container to-secondary-container text-on-secondary-container font-label-lg rounded-lg uppercase shadow-[0_0_20px_rgba(255,51,51,0.25)] hover:brightness-110 transition-all whitespace-nowrap text-[11px] sm:text-sm font-bold"
            >
              Enquire Now
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface border border-outline-variant/30 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container border-b border-outline-variant/30 px-gutter py-space-md flex flex-col gap-1 animate-fade-in max-h-[calc(100dvh-4rem)] overflow-y-auto shadow-2xl">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`min-h-[42px] px-3 py-2 rounded-lg text-sm uppercase tracking-wider flex items-center justify-between ${
                  activeNav === item.id
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
                }`}
              >
                <span>{item.label}</span>
                <span className="material-symbols-outlined text-[16px] opacity-60">chevron_right</span>
              </a>
            ))}
            <div className="pt-space-sm border-t border-outline-variant/20 flex flex-col gap-2 mt-space-xs">
              <div className="text-xs text-on-surface-variant font-medium">Direct Branch Hotlines:</div>
              <a
                href="tel:+916354661053"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container-high text-xs font-bold text-on-surface"
              >
                <span>OP Road Branch</span>
                <span className="text-primary font-mono">+91 6354661053</span>
              </a>
              <a
                href="tel:+918733944072"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface-container-high text-xs font-bold text-on-surface"
              >
                <span>Fatehgunj Branch</span>
                <span className="text-primary font-mono">+91 8733944072</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full pt-16 sm:pt-20 bg-surface">
        <div className="flex flex-col w-full">
          {/* HERO SECTION */}
          <section
            id="home"
            className="relative min-h-[100svh] lg:min-h-[820px] flex items-center justify-center -mt-16 sm:-mt-20 pt-20 sm:pt-24 pb-8 px-gutter overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center z-0 scale-105"
              role="img"
              aria-label="High energy luxury gym interior with dark charcoal walls, striking neon red lighting accents, state of the art black matte fitness equipment."
              style={{
                backgroundImage: `url('${BRAND_ASSETS.heroBg}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-surface/40 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,84,76,0.18)_0,transparent_70%)] z-10" />

            <div className="relative z-20 max-w-7xl mx-auto w-full py-space-xl flex flex-col items-center text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-high/85 backdrop-blur-md mb-space-md border border-outline-variant/30 shadow-[0_0_15px_rgba(255,180,172,0.15)]"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-label-sm uppercase tracking-wider text-on-surface font-semibold text-xs sm:text-sm">
                  Vadodara's #1 Beast &amp; Luxury Gym · OP Road &amp; Fatehgunj
                </span>
              </motion.div>

              {/* Word-by-Word Reveal Heading */}
              <motion.h1
                className="font-headline-hero text-on-surface uppercase tracking-wider max-w-5xl mb-space-md text-4xl sm:text-6xl lg:text-7xl flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.18,
                    },
                  },
                }}
              >
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 35 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  UNLEASH
                </motion.span>
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 35 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  YOUR
                </motion.span>
                <motion.span
                  className="inline-block animate-text-shimmer font-black drop-shadow-[0_0_35px_rgba(255,84,76,0.5)]"
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  POTENTIAL
                </motion.span>
                <motion.span
                  className="block w-full text-sm sm:text-base md:text-lg font-mono font-bold tracking-widest text-primary/90 uppercase mt-1"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.5 },
                    },
                  }}
                >
                  IN VADODARA (OP ROAD &amp; FATEHGUNJ)
                </motion.span>
              </motion.h1>

              {/* Subtitle Animate After Heading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
                className="text-body-lg text-on-surface-variant max-w-3xl mb-space-lg sm:mb-space-xl font-body-md text-sm sm:text-lg leading-relaxed px-1"
              >
                Vadodara's Destination for Strength, Fitness &amp; Transformation. Premier fitness experience with imported biomechanical equipment, competition lifting bays, and certified master trainers led by Founders Irfan Shaikh &amp; Ronak Parmar and Senior Trainer Shehab Pathan.
              </motion.p>

              {/* CTA Buttons Entrance Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3 sm:gap-space-md mb-space-lg sm:mb-space-xl max-w-md sm:max-w-none"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact', {
                      interest: 'Free Trial Session',
                      goalNote: 'I would like to book a 1-day free VIP trial session.',
                    });
                  }}
                  className="px-6 py-3.5 sm:px-space-xl sm:py-space-md bg-gradient-to-r from-primary-container to-secondary-container text-on-secondary-container font-label-lg rounded-lg uppercase shadow-[0_0_30px_rgba(255,84,76,0.35)] hover:scale-105 transition-all text-sm sm:text-base font-bold cursor-pointer text-center"
                >
                  Book 1-Day Free Trial
                </a>
                <a
                  href="#locations"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('locations');
                  }}
                  className="px-6 py-3.5 sm:px-space-xl sm:py-space-md bg-surface-container-high/80 backdrop-blur-md text-on-surface font-label-lg rounded-lg uppercase border border-outline-variant/50 hover:bg-surface-container-highest transition-all text-sm sm:text-base font-bold cursor-pointer text-center"
                >
                  Explore 2 Branches
                </a>
              </motion.div>

              {/* Quick Branch Highlights Entrance Animation */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.15, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-space-md w-full max-w-3xl mb-space-lg text-left"
              >
                <div className="p-space-md rounded-xl bg-surface-container/70 backdrop-blur-md border border-outline-variant/30 flex items-start gap-space-md hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm uppercase text-on-surface text-sm sm:text-base">
                      Branch 1: OP Road
                    </span>
                    <span className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                      7-8th Floor, Avishkar Complex, Old Padra Rd, Vadodara
                    </span>
                    <a
                      href="tel:+916354661053"
                      className="text-primary font-mono text-xs font-bold mt-1.5 hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">call</span> +91 6354661053
                    </a>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container/70 backdrop-blur-md border border-outline-variant/30 flex items-start gap-space-md hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm uppercase text-on-surface text-sm sm:text-base">
                      Branch 2: Fatehgunj
                    </span>
                    <span className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">
                      1st &amp; 2nd Floor, Astoria Complex, Beside Seven Seas Mall, Fatehgunj, Vadodara
                    </span>
                    <a
                      href="tel:+918733944072"
                      className="text-primary font-mono text-xs font-bold mt-1.5 hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">call</span> +91 8733944072
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ANNOUNCEMENT BANNER */}
          <section
            aria-label="Fitness Challenge Announcement"
            className="w-full bg-gradient-to-r from-secondary-container to-primary-container py-space-md px-gutter relative z-30 shadow-[0_0_25px_rgba(215,59,0,0.3)]"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
              <button
                type="button"
                onClick={() =>
                  scrollToSection('contact', {
                    interest: 'Personal Training',
                    goalNote: 'Registering for the FIT X FREAK Vadodara Transformation Challenge.',
                  })
                }
                className="flex items-center gap-space-md text-left cursor-pointer hover:opacity-95 transition-opacity"
              >
                <span className="material-symbols-outlined text-on-secondary-container animate-bounce">
                  local_fire_department
                </span>
                <span className="font-headline-sm uppercase text-on-secondary-container tracking-wider text-sm sm:text-base">
                  NEW TRANSFORMATION CHALLENGE NOW LIVE IN VADODARA (OP ROAD &amp; FATEHGUNJ)
                </span>
              </button>
              <div className="flex items-center gap-space-sm font-label-lg text-on-secondary-container bg-surface/20 px-space-md py-space-xs rounded-lg backdrop-blur-sm tabular-nums text-sm">
                <span>{days}D</span> : <span>{hours}H</span> : <span>{mins}M</span> :{' '}
                <span>{secs}</span>S
              </div>
            </div>
          </section>

          {/* WHY FIT X FREAK */}
          <section className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Uncompromising Standards
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                WHY FIT X FREAK VADODARA
              </h2>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {WHY_US_FEATURES.map((feat) => (
                <article
                  key={feat.title}
                  className="p-space-lg rounded-xl bg-surface-container flex flex-col gap-space-md hover:translate-y-[-4px] transition-all group border border-outline-variant/20"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined">{feat.icon}</span>
                  </div>
                  <h3 className="font-headline-sm text-on-surface uppercase text-base sm:text-lg">
                    {feat.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* TWO BRANCHES – LOCATION DETAILS */}
          <section id="locations" className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Two Premier Fitness Sanctuaries
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                OUR VADODARA LOCATIONS
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mt-space-xs text-sm sm:text-base">
                Both branches offer state-of-the-art facilities, certified trainers, and dedicated contact numbers.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg sm:gap-space-xl">
              {LOCATIONS.map((branch) => (
                <article
                  key={branch.id}
                  className="p-4 sm:p-space-xl rounded-2xl bg-surface-container flex flex-col gap-space-md sm:gap-space-lg border border-outline-variant/30 hover:border-primary/50 transition-all shadow-[0_4px_24px_rgba(0,0,0,0.3)] relative group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-space-md">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shrink-0" />
                        <h3 className="font-headline-md uppercase text-on-surface text-xl sm:text-2xl">
                          {branch.name}
                        </h3>
                      </div>
                      <span className="text-xs text-primary font-bold uppercase tracking-wider block mt-1">
                        {branch.city}
                      </span>
                    </div>
                    <span className="self-start px-3 py-1 rounded-full bg-primary/20 text-primary text-label-sm uppercase text-[11px] sm:text-xs font-bold whitespace-nowrap">
                      {branch.badge}
                    </span>
                  </div>

                  <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-surface-container-lowest relative">
                    <img
                      src={branch.mapImage}
                      alt={branch.mapAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent flex items-end p-3 sm:p-space-md">
                      <span className="text-[11px] sm:text-xs text-on-surface font-semibold bg-surface/85 px-2.5 py-1 rounded backdrop-blur-sm border border-outline-variant/30">
                        {branch.highlights}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-sm text-body-md text-on-surface-variant text-xs sm:text-sm">
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-primary shrink-0 text-[20px] mt-0.5">
                        location_on
                      </span>
                      <span className="text-on-surface leading-snug">{branch.address}</span>
                    </div>

                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary shrink-0 text-[20px]">
                        call
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-on-surface-variant font-medium">Phone:</span>
                        <a
                          href={`tel:+91${branch.contactNumber}`}
                          className="text-primary font-mono font-bold text-sm sm:text-base hover:underline"
                          title={`Click to call ${branch.name}`}
                        >
                          {branch.contactNumberFormatted}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-space-sm pt-1">
                      <span className="material-symbols-outlined text-primary shrink-0 text-[20px] mt-0.5">
                        schedule
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 flex-1">
                        {branch.timings.map((slot) => (
                          <div
                            key={slot.day}
                            className={`px-2.5 py-1.5 rounded-lg border text-[11px] flex sm:flex-col justify-between sm:justify-start gap-1 ${
                              slot.hours.toLowerCase() === 'closed'
                                ? 'bg-error-container/25 border-error/30 text-error'
                                : 'bg-surface border-outline-variant/25 text-on-surface'
                            }`}
                          >
                            <span className="font-semibold uppercase tracking-wide opacity-85">
                              {slot.day}
                            </span>
                            <span className="font-mono font-bold whitespace-nowrap">
                              {slot.hours}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-space-sm pt-space-md border-t border-outline-variant/20 mt-auto">
                    <a
                      href={`tel:+91${branch.contactNumber}`}
                      className="py-2.5 px-3 rounded-lg bg-primary text-on-primary font-label-lg uppercase text-xs font-bold flex items-center justify-center gap-1.5 hover:brightness-110 transition-all text-center shadow-md cursor-pointer"
                      title={`Call ${branch.name} on ${branch.contactNumber}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Call Now</span>
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        openWhatsAppChat(
                          branch.id === 'op-road' ? 'OP Road' : 'Fatehgunj',
                          `Hello ${branch.name}, I would like to enquire about training programs, facilities, and personal coaching.`
                        )
                      }
                      className="py-2.5 px-3 rounded-lg bg-[#25D366] text-white font-label-lg uppercase text-xs font-bold flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer shadow-md"
                      title={`WhatsApp ${branch.name}`}
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>WhatsApp</span>
                    </button>

                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-span-2 sm:col-span-1 py-2.5 px-3 rounded-lg bg-surface-container-high text-on-surface font-label-lg uppercase text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-highest transition-all border border-outline-variant/30"
                    >
                      <span className="material-symbols-outlined text-[16px]">directions</span>
                      <span>Directions</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION: FOUNDERS OF FIT X FREAK (Irfan & Ronak Parmar)        */}
          {/* ============================================================== */}
          <section id="founder" className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-space-xs shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Leadership &amp; Vision
              </div>
              <h2 className="font-headline-lg uppercase text-on-surface text-3xl sm:text-5xl tracking-wide">
                MEET OUR <span className="text-amber-400">FOUNDERS</span>
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mt-space-xs text-sm sm:text-base">
                Led by Founders Irfan Shaikh and Ronak Parmar — driving FIT X FREAK’s fitness revolution across Vadodara.
              </p>
              <div className="w-24 h-1 bg-amber-500 mt-space-sm rounded-full" />
            </div>

            {/* Founder Cards Single Row (Irfan Shaikh & Ronak Parmar side by side) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-stretch">
              {FOUNDERS.map((founder, idx) => (
                <article
                  key={founder.id}
                  className={`p-4 sm:p-space-xl rounded-2xl bg-gradient-to-br from-surface-container via-surface-container to-surface-container-high relative overflow-hidden flex flex-col h-full ${
                    idx === 0
                      ? 'border-2 border-amber-500/60 shadow-[0_0_45px_rgba(245,158,11,0.22)]'
                      : 'border border-amber-500/45 shadow-[0_0_30px_rgba(245,158,11,0.14)]'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col h-full gap-space-md relative z-10">
                    {/* Single Image */}
                    <div className="w-full h-[290px] sm:h-[380px] rounded-2xl overflow-hidden bg-surface-container-lowest border-2 border-amber-500/50 shadow-2xl relative group shrink-0">
                      <img
                        src={founder.image}
                        alt={founder.alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-black font-black text-xs uppercase tracking-wider shadow-xl">
                        <span className="material-symbols-outlined text-[15px]">verified</span>
                        {founder.badgeLabel}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-surface/90 backdrop-blur-md border border-amber-500/30 text-center">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                          FIT X FREAK VADODARA
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          {founder.branchName} Clubs
                        </span>
                      </div>
                    </div>

                    {/* Founder Details */}
                    <div className="flex flex-col flex-1 gap-space-sm">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/40">
                          {founder.experience}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase font-mono">
                          Vadodara Best Gym
                        </span>
                      </div>

                      <h3 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-3xl mt-1 tracking-wide">
                        {founder.name}
                      </h3>

                      <p className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                        {founder.role} · FIT X FREAK
                      </p>

                      <blockquote className="p-3 rounded-xl bg-surface/80 border-l-4 border-amber-500 text-xs italic text-on-surface-variant leading-relaxed">
                        "{founder.quote}"
                      </blockquote>

                      <p className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                        {founder.bio}
                      </p>

                      {/* Key Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-space-xs">
                        {founder.keyHighlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="p-2 rounded-lg bg-surface border border-amber-500/25 flex items-center gap-2 text-xs text-on-surface font-semibold"
                          >
                            <span className="material-symbols-outlined text-[15px] text-amber-400 shrink-0">
                              star
                            </span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Certifications & Leadership tags */}
                      <div className="mt-space-xs">
                        <span className="text-xs font-bold uppercase tracking-wider text-on-surface block mb-1.5">
                          Leadership &amp; Specializations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {founder.certifications.map((cert) => (
                            <span
                              key={cert}
                              className="px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface text-[11px] font-medium border border-amber-500/30 flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[13px] text-amber-400">check_circle</span>
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="pt-space-md border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-space-sm mt-auto">
                        <a
                          href={founder.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-highest hover:bg-[#E1306C]/20 text-on-surface hover:text-[#E1306C] transition-all text-xs font-semibold border border-outline-variant/30"
                          title={`${founder.name} on Instagram`}
                        >
                          <svg className="w-4 h-4 fill-current text-[#E1306C]" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span>{founder.instagramHandle}</span>
                        </a>

                        <a
                          href="#contact"
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('contact', {
                              interest: `Guidance with Founder ${founder.name}`,
                              goalNote: `I want to inquire about training and guidance under Founder ${founder.name}.`,
                            });
                          }}
                          className="px-space-lg py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-label-lg uppercase text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105"
                        >
                          Connect with Founder
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION: CERTIFIED TRAINERS CAROUSEL SLIDER                    */}
          {/* ============================================================== */}
          <section id="trainers" className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Certified Coaching Team
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                MEET OUR TRAINERS
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mt-space-xs text-sm sm:text-base">
                Led by Senior Trainer Shehab Pathan (15 Years Experience) and our certified coaches across OP Road and Fatehgunj.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </div>

            {/* TRAINER CAROUSEL – SINGLE HORIZONTAL ROW FOR ALL TRAINERS */}
            <div className="mt-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm mb-space-md">
                <div>
                  <h3 className="font-headline-sm uppercase text-on-surface text-xl sm:text-2xl">
                    ALL CERTIFIED TRAINERS
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    1. Shehab Pathan (Senior Trainer) • 2. Arif Shaikh • 3. David Macwan • 4. Rehan Nanno • 5. Ahmad Shaikh • 6. Taksh • 7. Aehfaz
                  </p>
                </div>

                {/* Slider Navigation Arrows */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
                  <span className="text-xs font-mono text-on-surface-variant mr-1">
                    {trainerIndex + 1} - {Math.min(trainerIndex + trainersPerView, TRAINERS.length)} of {TRAINERS.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTrainerIndex((prev) => Math.max(0, prev - 1))}
                      disabled={trainerIndex === 0}
                      aria-label="Previous Trainers"
                      className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrainerIndex((prev) => Math.min(maxTrainerIndex, prev + 1))}
                      disabled={trainerIndex >= maxTrainerIndex}
                      aria-label="Next Trainers"
                      className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CAROUSEL TRACK (STRICT SINGLE HORIZONTAL ROW, NEVER MULTI-ROW) */}
              <div
                className="overflow-hidden rounded-2xl relative touch-pan-y"
                onMouseEnter={() => setTrainerHovered(true)}
                onMouseLeave={() => setTrainerHovered(false)}
                onTouchStart={(e) => {
                  trainerTouchStart.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (trainerTouchStart.current === null) return;
                  const deltaX = trainerTouchStart.current - e.changedTouches[0].clientX;
                  if (deltaX > 40 && trainerIndex < maxTrainerIndex) {
                    setTrainerIndex((p) => p + 1);
                  } else if (deltaX < -40 && trainerIndex > 0) {
                    setTrainerIndex((p) => p - 1);
                  }
                  trainerTouchStart.current = null;
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${trainerIndex * (100 / trainersPerView)}%)`,
                  }}
                >
                  {TRAINERS.map((trainer, idx) => (
                    <div
                      key={trainer.id}
                      className="px-2 shrink-0 flex flex-col"
                      style={{ width: `${100 / trainersPerView}%` }}
                    >
                      <article
                        className={`p-space-md rounded-2xl bg-surface-container flex flex-col h-full border transition-all duration-300 group hover:-translate-y-1 ${
                          trainer.isSeniorTrainer
                            ? 'border-primary/70 shadow-[0_0_20px_rgba(255,84,76,0.18)] ring-1 ring-primary/30'
                            : 'border-outline-variant/25 hover:border-primary/50'
                        }`}
                      >
                        {/* Image Card Container */}
                        <div
                          className="h-64 sm:h-72 rounded-xl overflow-hidden bg-surface-container-lowest relative shrink-0 cursor-pointer"
                          onClick={() => setSelectedTrainer(trainer)}
                        >
                          <img
                            src={trainer.image}
                            alt={trainer.alt}
                            loading="lazy"
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Distinct Badge on Image */}
                          <div className="absolute top-2 left-2">
                            {trainer.isSeniorTrainer ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px]">stars</span>
                                SENIOR TRAINER
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-surface/85 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider border border-outline-variant/30">
                                TRAINER
                              </span>
                            )}
                          </div>

                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-0.5 rounded bg-surface/85 backdrop-blur-sm text-on-surface text-[10px] font-mono font-bold border border-outline-variant/30">
                              {trainer.experience}
                            </span>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                            <span className="text-[11px] font-bold text-white bg-primary/90 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <span className="material-symbols-outlined text-[14px]">visibility</span>
                              View Certifications &amp; Bio
                            </span>
                          </div>
                        </div>

                        {/* Trainer Info */}
                        <div className="flex flex-col flex-1 pt-space-sm gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-on-surface-variant font-bold">
                              #{idx + 1} OF {TRAINERS.length}
                            </span>
                            <span className="text-[10px] text-primary font-bold uppercase">
                              {trainer.branchName}
                            </span>
                          </div>

                          <h4
                            onClick={() => setSelectedTrainer(trainer)}
                            className={`font-headline-sm uppercase text-base sm:text-lg cursor-pointer hover:underline ${
                              trainer.isSeniorTrainer
                                ? 'text-primary font-extrabold'
                                : 'text-on-surface font-bold'
                            }`}
                          >
                            {trainer.name}
                          </h4>

                          <p className="text-xs font-semibold text-primary/90 uppercase tracking-wide">
                            {trainer.role}
                          </p>

                          {trainer.qualification && (
                            <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px] text-primary">school</span>
                              {trainer.qualification}
                            </span>
                          )}

                          <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-snug">
                            {trainer.bio}
                          </p>

                          {/* Certifications preview */}
                          <div className="flex flex-wrap gap-1 mt-auto pt-2">
                            {trainer.certifications.slice(0, 3).map((cert) => (
                              <span
                                key={cert}
                                className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-medium border border-outline-variant/20 line-clamp-1"
                              >
                                {cert}
                              </span>
                            ))}
                            {trainer.certifications.length > 3 && (
                              <button
                                type="button"
                                onClick={() => setSelectedTrainer(trainer)}
                                className="px-1.5 py-0.5 rounded bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors text-[10px] font-bold cursor-pointer"
                              >
                                +{trainer.certifications.length - 3} more
                              </button>
                            )}
                          </div>

                          {/* Footer Action with Individual Instagram Handle */}
                          <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between gap-2 mt-2">
                            <a
                              href={trainer.instagramUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[11px] text-on-surface-variant hover:text-[#E1306C] flex items-center gap-1 transition-colors font-medium truncate"
                              title={`Follow ${trainer.name} (${trainer.instagramHandle}) on Instagram`}
                            >
                              <svg className="w-3.5 h-3.5 fill-current text-[#E1306C] shrink-0" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                              <span className="truncate">{trainer.instagramHandle}</span>
                            </a>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => setSelectedTrainer(trainer)}
                                className="px-2 py-1 rounded bg-surface-container-high text-[11px] text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium"
                              >
                                Bio
                              </button>
                              <a
                                href="#contact"
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection('contact', {
                                    interest: `Personal Training with ${trainer.name}`,
                                    goalNote: `Interested in personal coaching sessions with ${trainer.name} (${trainer.role}).`,
                                  });
                                }}
                                className="px-2.5 py-1 rounded bg-primary/15 text-primary hover:bg-primary hover:text-on-primary transition-all text-[11px] font-bold uppercase"
                              >
                                Book
                              </a>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-space-md">
                {Array.from({ length: maxTrainerIndex + 1 }).map((_, dotIdx) => (
                  <button
                    key={`tr-dot-${dotIdx}`}
                    type="button"
                    onClick={() => setTrainerIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      trainerIndex === dotIdx ? 'w-8 bg-primary' : 'w-2 bg-surface-container-highest hover:bg-on-surface-variant'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION: COMBINED GYM EQUIPMENT (UNIFIED SINGLE-ROW CAROUSEL)  */}
          {/* ============================================================== */}
          <section id="equipment" className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Commercial Biomechanical Engineering
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                COMBINED GYM EQUIPMENT
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mt-space-xs text-sm sm:text-base">
                Curated heavy-duty hardware unified across our OP Road Flagship &amp; Fatehgunj Branch. Single horizontal slider with interactive specs and biomechanics.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />

              {/* Branch Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-space-lg">
                {(
                  [
                    { id: 'all', label: `All Equipment (${UNIFIED_EQUIPMENT.length})` },
                    { id: 'op-road', label: 'OP Road Flagship' },
                    { id: 'fatehgunj', label: 'Fatehgunj Center' },
                  ] as { id: 'all' | 'op-road' | 'fatehgunj'; label: string }[]
                ).map((tab) => {
                  const active = equipmentBranchFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setEquipmentBranchFilter(tab.id);
                        setEquipmentIndex(0);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        active
                          ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(255,84,76,0.35)]'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/30'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* UNIFIED EQUIPMENT SLIDER CONTAINER */}
            <div className="p-3 sm:p-space-lg rounded-2xl bg-surface-container/60 border border-outline-variant/25">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-space-md gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">fitness_center</span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-headline-sm uppercase text-on-surface text-base sm:text-xl">
                        {equipmentBranchFilter === 'all'
                          ? 'ALL BRANCH EQUIPMENT'
                          : equipmentBranchFilter === 'op-road'
                          ? 'OP ROAD FLAGSHIP EQUIPMENT'
                          : 'FATEHGUNJ CENTER EQUIPMENT'}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase">
                        Unified Suite
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      Showing {displayedEquipment.length} machines · Single horizontal row
                    </span>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                  <span className="text-[11px] text-on-surface-variant font-mono mr-1">
                    {equipmentIndex + 1} - {Math.min(equipmentIndex + equipmentPerView, displayedEquipment.length)} of {displayedEquipment.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEquipmentIndex((prev) => Math.max(0, prev - 1))}
                      disabled={equipmentIndex === 0}
                      aria-label="Previous Equipment"
                      className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEquipmentIndex((prev) => Math.min(maxEquipmentIndex, prev + 1))}
                      disabled={equipmentIndex >= maxEquipmentIndex}
                      aria-label="Next Equipment"
                      className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Track (SINGLE HORIZONTAL ROW, NEVER MULTI-ROW) */}
              <div
                className="overflow-hidden rounded-xl relative touch-pan-y"
                onMouseEnter={() => setEquipmentHovered(true)}
                onMouseLeave={() => setEquipmentHovered(false)}
                onTouchStart={(e) => {
                  equipmentTouchStart.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (equipmentTouchStart.current === null) return;
                  const deltaX = equipmentTouchStart.current - e.changedTouches[0].clientX;
                  if (deltaX > 40 && equipmentIndex < maxEquipmentIndex) {
                    setEquipmentIndex((p) => p + 1);
                  } else if (deltaX < -40 && equipmentIndex > 0) {
                    setEquipmentIndex((p) => p - 1);
                  }
                  equipmentTouchStart.current = null;
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${equipmentIndex * (100 / equipmentPerView)}%)`,
                  }}
                >
                  {displayedEquipment.map((item) => (
                    <div
                      key={item.id}
                      className="px-2 shrink-0 flex flex-col"
                      style={{ width: `${100 / equipmentPerView}%` }}
                    >
                      <article
                        onClick={() => setSelectedEquipment(item)}
                        className="p-space-md rounded-xl bg-surface-container flex flex-col h-full border border-outline-variant/25 hover:border-primary/60 transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_20px_rgba(255,84,76,0.15)]"
                      >
                        <div className="h-48 rounded-lg overflow-hidden bg-surface-container-lowest relative shrink-0">
                          <img
                            src={item.image}
                            alt={item.alt}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 flex items-center gap-1">
                            <span className="px-2 py-0.5 rounded bg-surface/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider border border-outline-variant/30">
                              {item.branchName.replace('FIT X FREAK – ', '')}
                            </span>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]">zoom_in</span> Specs
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col flex-1 pt-space-xs gap-1 mt-1">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-headline-sm text-on-surface uppercase text-sm font-bold group-hover:text-primary transition-colors line-clamp-1">
                              {item.name}
                            </h4>
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase shrink-0">
                              {item.categoryLabel}
                            </span>
                          </div>

                          <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-auto pt-2 border-t border-outline-variant/20 flex flex-col gap-1 text-[11px]">
                            <div className="text-on-surface">
                              <span className="text-on-surface-variant font-medium">Target: </span>
                              <strong className="text-primary font-bold">{item.targetMuscle}</strong>
                            </div>
                            <div className="text-on-surface-variant line-clamp-1">
                              <span>Purpose: </span>
                              {item.workoutPurpose}
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-space-md">
                {Array.from({ length: maxEquipmentIndex + 1 }).map((_, dotIdx) => (
                  <button
                    key={`eq-dot-${dotIdx}`}
                    type="button"
                    onClick={() => setEquipmentIndex(dotIdx)}
                    aria-label={`Go to equipment slide ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      equipmentIndex === dotIdx ? 'w-7 bg-primary' : 'w-2 bg-surface-container-highest hover:bg-on-surface-variant'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* ZUMBA CLASSES & STUDIO VIDEO TOURS (Gallery Removed)           */}
          {/* ============================================================== */}
          <section id="zumba" className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Studio Action &amp; Walkthroughs
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                ZUMBA &amp; FACILITY VIDEO TOURS
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mt-space-xs text-sm sm:text-base">
                Watch live Zumba choreography and full floor walkthroughs of our OP Road &amp; Fatehgunj clubs. Click play directly or open Theater Mode.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </div>

            {/* ZUMBA CAROUSEL – SINGLE HORIZONTAL ROW (MATCHES TRAINERS ARRANGEMENT) */}
            <div className="mt-space-md mb-space-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm mb-space-md">
                <div>
                  <h3 className="font-headline-sm uppercase text-on-surface text-xl sm:text-2xl">
                    ALL ZUMBA SESSIONS
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    1. Studio Dance Fitness • 2. Outdoor Community Zumba • 3. Indoor Hardwood Floor Batch · Tap Play or open Theater Mode
                  </p>
                </div>

                {/* Slider Navigation Arrows */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
                  <span className="text-xs font-mono text-on-surface-variant mr-1">
                    {zumbaIndex + 1} - {Math.min(zumbaIndex + zumbaPerView, zumbaVideos.length)} of {zumbaVideos.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setZumbaIndex((prev) => Math.max(0, prev - 1))}
                      disabled={zumbaIndex === 0}
                      aria-label="Previous Zumba Videos"
                      className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setZumbaIndex((prev) => Math.min(maxZumbaIndex, prev + 1))}
                      disabled={zumbaIndex >= maxZumbaIndex}
                      aria-label="Next Zumba Videos"
                      className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CAROUSEL TRACK (STRICT SINGLE HORIZONTAL ROW, MATCHES TRAINERS) */}
              <div
                className="overflow-hidden rounded-2xl relative touch-pan-y"
                onTouchStart={(e) => {
                  zumbaTouchStart.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (zumbaTouchStart.current === null) return;
                  const deltaX = zumbaTouchStart.current - e.changedTouches[0].clientX;
                  if (deltaX > 40 && zumbaIndex < maxZumbaIndex) {
                    setZumbaIndex((p) => p + 1);
                  } else if (deltaX < -40 && zumbaIndex > 0) {
                    setZumbaIndex((p) => p - 1);
                  }
                  zumbaTouchStart.current = null;
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${zumbaIndex * (100 / zumbaPerView)}%)`,
                  }}
                >
                  {zumbaVideos.map((zumba, idx) => {
                    const isPlaying = playingZumbaId === zumba.id;
                    return (
                      <div
                        key={zumba.id}
                        className="px-2 shrink-0 flex flex-col"
                        style={{ width: `${100 / zumbaPerView}%` }}
                      >
                        <article className="p-space-md rounded-2xl bg-surface-container flex flex-col h-full border border-outline-variant/25 hover:border-primary/60 hover:shadow-[0_0_24px_rgba(255,84,76,0.16)] transition-all duration-300 group">
                          {/* Portrait Video Container */}
                          <div className="h-[340px] sm:h-[420px] rounded-xl overflow-hidden bg-black relative shrink-0 border border-outline-variant/20">
                            <video
                              key={zumba.id}
                              ref={(el) => {
                                zumbaVideoRefs.current[zumba.id] = el;
                              }}
                              src={zumba.videoUrl}
                              poster={zumba.posterUrl}
                              controls
                              playsInline
                              preload="metadata"
                              onPlay={() => {
                                pauseOtherZumbaVideos(zumba.id);
                                setPlayingZumbaId(zumba.id);
                              }}
                              onPause={() => {
                                setPlayingZumbaId((curr) => (curr === zumba.id ? null : curr));
                              }}
                              onEnded={() => {
                                setPlayingZumbaId((curr) => (curr === zumba.id ? null : curr));
                              }}
                              className="w-full h-full object-contain bg-black"
                            >
                              Your browser does not support HTML5 video playback.
                            </video>

                            {!isPlaying && (
                              <button
                                type="button"
                                onClick={() => handleToggleZumbaVideo(zumba.id)}
                                aria-label={`Play ${zumba.title}`}
                                className="absolute inset-x-0 top-0 bottom-14 flex items-center justify-center bg-black/25 hover:bg-black/10 transition-colors cursor-pointer"
                              >
                                <span className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_28px_rgba(255,84,76,0.75)] group-hover:scale-110 transition-transform">
                                  <span className="material-symbols-outlined text-[30px] ml-0.5">play_arrow</span>
                                </span>
                              </button>
                            )}

                            {/* Top Badges */}
                            <div className="absolute top-2 left-2 pointer-events-none">
                              <span className="px-2.5 py-0.5 rounded-full bg-primary/90 text-on-primary text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                ZUMBA
                              </span>
                            </div>
                            <div className="absolute top-2 right-2 pointer-events-none">
                              <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono font-bold border border-white/15">
                                {zumba.duration}
                              </span>
                            </div>
                          </div>

                          {/* Zumba Card Info */}
                          <div className="flex flex-col flex-1 pt-space-sm gap-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-mono text-on-surface-variant font-bold">
                                #{idx + 1} OF {zumbaVideos.length}
                              </span>
                              <span className="text-[10px] text-primary font-bold uppercase truncate">
                                {zumba.branchName}
                              </span>
                            </div>

                            <h4 className="font-headline-sm uppercase text-on-surface text-base sm:text-lg font-bold leading-snug">
                              {zumba.title}
                            </h4>

                            <p className="text-xs font-semibold text-primary/90 uppercase tracking-wide">
                              {zumba.subtitle}
                            </p>

                            <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-snug">
                              {zumba.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-auto pt-2">
                              {zumba.highlights.slice(0, 3).map((hl) => (
                                <span
                                  key={hl}
                                  className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-medium border border-outline-variant/20"
                                >
                                  {hl}
                                </span>
                              ))}
                            </div>

                            {/* Footer Action Controls */}
                            <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between gap-2 mt-2">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleZumbaVideo(zumba.id)}
                                  className="px-2.5 py-1 rounded bg-primary text-on-primary hover:brightness-110 text-[11px] font-bold uppercase flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    {isPlaying ? 'pause' : 'play_arrow'}
                                  </span>
                                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    pauseOtherZumbaVideos('');
                                    setPlayingZumbaId(null);
                                    setActiveStudioVideo(zumba);
                                  }}
                                  className="px-2 py-1 rounded bg-surface-container-high text-[11px] text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium flex items-center gap-1"
                                >
                                  <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                                  <span>Theater</span>
                                </button>
                              </div>

                              <a
                                href="#contact"
                                onClick={(e) => {
                                  e.preventDefault();
                                  scrollToSection('contact', {
                                    interest: 'Zumba & Group Fitness Classes',
                                    goalNote: `Interested in joining ${zumba.title} at FIT X FREAK Vadodara.`,
                                  });
                                }}
                                className="px-2.5 py-1 rounded bg-primary/15 text-primary hover:bg-primary hover:text-on-primary transition-all text-[11px] font-bold uppercase shrink-0"
                              >
                                Join
                              </a>
                            </div>
                          </div>
                        </article>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination Dots */}
              {maxZumbaIndex > 0 && (
                <div className="flex items-center justify-center gap-1.5 mt-space-md">
                  {Array.from({ length: maxZumbaIndex + 1 }).map((_, dotIdx) => (
                    <button
                      key={`zumba-dot-${dotIdx}`}
                      type="button"
                      onClick={() => setZumbaIndex(dotIdx)}
                      aria-label={`Go to Zumba slide ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        zumbaIndex === dotIdx
                          ? 'w-8 bg-primary'
                          : 'w-2 bg-surface-container-highest hover:bg-on-surface-variant'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 2 Branch Facility Walkthrough Videos */}
            <div className="mb-space-sm">
              <h3 className="font-headline-sm uppercase text-on-surface text-xl sm:text-2xl mb-1">
                BRANCH FACILITY WALKTHROUGHS
              </h3>
              <p className="text-xs text-on-surface-variant">
                Full floor video tours across OP Road &amp; Fatehgunj clubs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              {STUDIO_VIDEOS.filter((v) => v.category === 'Facility Walkthrough').map((vid) => (
                <div
                  key={vid.id}
                  className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 shadow-sm hover:shadow-[0_0_25px_rgba(255,84,76,0.18)] transition-all flex flex-col gap-space-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-bold uppercase text-primary tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">videocam</span> Video Facility Tour
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-surface/90 text-on-surface font-semibold text-xs border border-outline-variant/30">
                      {vid.branchName}
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden bg-black aspect-video relative group shadow-inner">
                    <video
                      src={vid.videoUrl}
                      poster={vid.posterUrl}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-contain bg-black"
                    >
                      Your browser does not support HTML5 video playback.
                    </video>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-headline-sm uppercase text-on-surface text-sm sm:text-base font-bold">
                        {vid.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveStudioVideo(vid)}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-[11px] font-bold uppercase tracking-wider text-primary border border-primary/30 shrink-0 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                        Theater
                      </button>
                    </div>
                    <p className="text-body-md text-on-surface-variant text-xs leading-relaxed">
                      {vid.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* PROVEN RESULTS IN VADODARA – CAROUSEL SLIDER (LIKE TRAINERS)   */}
          {/* ============================================================== */}
          <section id="results" className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Real Member Transformations
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                PROVEN RESULTS IN VADODARA
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mt-space-xs text-sm sm:text-base">
                Verified fat loss, lean muscle gain, and body recomposition journeys achieved by our dedicated members across OP Road &amp; Fatehgunj.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </div>

            {/* TRANSFORMATION CAROUSEL – SINGLE HORIZONTAL ROW (MATCHES TRAINERS SECTION) */}
            <div className="mt-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-sm mb-space-md">
                <div>
                  <h3 className="font-headline-sm uppercase text-on-surface text-xl sm:text-2xl">
                    ALL MEMBER TRANSFORMATIONS
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    1. 62→68 kg Lean Muscle Gain • 2. 52→64 kg Stronger Gain • 3–10. Verified Transformations · Tap arrows or swipe
                  </p>
                </div>

                {/* Slider Navigation Arrows */}
                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
                  <span className="text-xs font-mono text-on-surface-variant mr-1">
                    {transformationIndex + 1} - {Math.min(transformationIndex + transformationsPerView, SUCCESS_STORIES.length)} of {SUCCESS_STORIES.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTransformationIndex((prev) => Math.max(0, prev - 1))}
                      disabled={transformationIndex === 0}
                      aria-label="Previous Transformations"
                      className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTransformationIndex((prev) => Math.min(maxTransformationIndex, prev + 1))}
                      disabled={transformationIndex >= maxTransformationIndex}
                      aria-label="Next Transformations"
                      className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CAROUSEL TRACK (STRICT SINGLE HORIZONTAL ROW) */}
              <div
                className="overflow-hidden rounded-2xl relative touch-pan-y"
                onMouseEnter={() => setTransformationHovered(true)}
                onMouseLeave={() => setTransformationHovered(false)}
                onTouchStart={(e) => {
                  transformationTouchStart.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (transformationTouchStart.current === null) return;
                  const deltaX = transformationTouchStart.current - e.changedTouches[0].clientX;
                  if (deltaX > 40 && transformationIndex < maxTransformationIndex) {
                    setTransformationIndex((p) => p + 1);
                  } else if (deltaX < -40 && transformationIndex > 0) {
                    setTransformationIndex((p) => p - 1);
                  }
                  transformationTouchStart.current = null;
                }}
              >
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${transformationIndex * (100 / transformationsPerView)}%)`,
                  }}
                >
                  {SUCCESS_STORIES.map((story, idx) => (
                    <div
                      key={story.id}
                      className="px-2 shrink-0 flex flex-col"
                      style={{ width: `${100 / transformationsPerView}%` }}
                    >
                      <article
                        className={`p-space-md rounded-2xl bg-surface-container flex flex-col h-full border transition-all duration-300 group hover:-translate-y-1 ${
                          story.featured
                            ? 'border-primary/70 shadow-[0_0_20px_rgba(255,84,76,0.18)] ring-1 ring-primary/30'
                            : 'border-outline-variant/25 hover:border-primary/50'
                        }`}
                      >
                        {/* Image Container (Full Uncropped Showcase) */}
                        <div
                          className="h-64 sm:h-80 rounded-xl overflow-hidden bg-black relative shrink-0 cursor-pointer border border-outline-variant/20"
                          onClick={() => setSelectedTransformation(story)}
                        >
                          <img
                            src={story.image}
                            alt={story.alt}
                            loading="lazy"
                            className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                          />

                          {/* Top-Left Badge */}
                          {story.badge && (
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider border border-outline-variant/30">
                                {story.badge}
                              </span>
                            </div>
                          )}

                          {/* Top-Right Result Pill */}
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-0.5 rounded bg-surface/90 backdrop-blur-sm text-on-surface text-[10px] font-mono font-bold border border-outline-variant/30">
                              {story.duration}
                            </span>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                            <span className="text-[11px] font-bold text-white bg-primary/90 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                              View Full Transformation
                            </span>
                          </div>
                        </div>

                        {/* Transformation Info */}
                        <div className="flex flex-col flex-1 pt-space-sm gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-on-surface-variant font-bold">
                              #{idx + 1} OF {SUCCESS_STORIES.length}
                            </span>
                            <span className="text-[10px] text-primary font-bold uppercase">
                              {story.branch}
                            </span>
                          </div>

                          <h4
                            onClick={() => setSelectedTransformation(story)}
                            className={`font-headline-sm uppercase text-base sm:text-lg cursor-pointer hover:underline ${
                              story.featured
                                ? 'text-primary font-extrabold'
                                : 'text-on-surface font-bold'
                            }`}
                          >
                            {story.name}
                          </h4>

                          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                            {story.statHighlight}
                          </p>

                          <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-snug">
                            {story.quote}
                          </p>

                          {/* Footer Action */}
                          <div className="pt-2 border-t border-outline-variant/15 flex items-center justify-between gap-2 mt-auto">
                            <button
                              type="button"
                              onClick={() => setSelectedTransformation(story)}
                              className="text-[11px] text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors cursor-pointer font-medium"
                            >
                              <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                              Inspect
                            </button>

                            <a
                              href="#contact"
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('contact', {
                                  interest: 'Fat Loss & Transformation',
                                  goalNote: `Inspired by ${story.name} (${story.statHighlight}) — want to start my transformation journey.`,
                                });
                              }}
                              className="px-2.5 py-1 rounded bg-primary/15 text-primary hover:bg-primary hover:text-on-primary transition-all text-[11px] font-bold uppercase"
                            >
                              Start Plan
                            </a>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-space-md">
                {Array.from({ length: maxTransformationIndex + 1 }).map((_, dotIdx) => (
                  <button
                    key={`res-dot-${dotIdx}`}
                    type="button"
                    onClick={() => setTransformationIndex(dotIdx)}
                    aria-label={`Go to transformation slide ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      transformationIndex === dotIdx
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-surface-container-highest hover:bg-on-surface-variant'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* DEDICATED LOCAL SEO CONTENT SECTION – VADODARA GYM GUIDE       */}
          {/* ============================================================== */}
          <section id="seo-guide" className="py-space-xl px-gutter max-w-7xl mx-auto w-full">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 25 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center mb-space-xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-space-xs">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Local Fitness Authority
              </div>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl lg:text-5xl">
                BEST GYM IN VADODARA – <span className="text-primary">FIT X FREAK</span>
              </h2>
              <p className="text-body-lg text-on-surface-variant max-w-3xl mt-space-sm text-sm sm:text-base leading-relaxed">
                FIT X FREAK is a fitness destination in Vadodara, offering dedicated gym facilities at OP Road and Fatehgunj. Whether your goal is strength training, muscle development, general fitness or improving endurance, our gym provides access to fitness equipment and experienced trainers to support your fitness journey.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </motion.div>

            {/* 6 SEO Pillars / Subsections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {/* 1. Why Choose FIT X FREAK? */}
              <motion.article
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-space-sm hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">award_star</span>
                </div>
                <h3 className="font-headline-sm uppercase text-on-surface text-lg font-bold">
                  Why Choose FIT X FREAK?
                </h3>
                <p className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                  Consistently recognized as the <strong className="text-on-surface">best fitness centre in Vadodara</strong>, FIT X FREAK bridges elite athletic biomechanics with an energetic beast-mode environment. With zero clutter, heavy-gauge steel cages, and certified coaching, members achieve sustainable transformations rather than short-lived fitness trends.
                </p>
                <ul className="text-xs text-on-surface-variant flex flex-col gap-1 mt-auto pt-2 border-t border-outline-variant/20">
                  <li className="flex items-center gap-1.5 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                    Dual flagship gyms across central &amp; north Vadodara
                  </li>
                  <li className="flex items-center gap-1.5 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[14px]">check</span>
                    Zero membership gimmicks — transparent workout focus
                  </li>
                </ul>
              </motion.article>

              {/* 2. Our Gym Locations in Vadodara */}
              <motion.article
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-space-sm hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">location_on</span>
                </div>
                <h3 className="font-headline-sm uppercase text-on-surface text-lg font-bold">
                  Our Gym Locations in Vadodara
                </h3>
                <div className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed flex flex-col gap-2">
                  <div>
                    <strong className="text-on-surface block">1. Best Gym Near Old Padra Road:</strong>
                    <span>7-8th Floor, Avishkar Complex, Old Padra Road, near McDonald's &amp; opposite Bankars Heart Hospital, Haripura (390007). Call: </span>
                    <a href="tel:+916354661053" className="text-primary font-mono font-bold hover:underline">+91 6354661053</a>
                  </div>
                  <div>
                    <strong className="text-on-surface block">2. Gym Near Fatehgunj Vadodara:</strong>
                    <span>1st and 2nd Floor, Astoria Complex, Beside Seven Seas Mall, Fatehgunj (390008). Direct phone: </span>
                    <a href="tel:+918733944072" className="text-primary font-mono font-bold hover:underline">+91 8733944072</a>
                  </div>
                </div>
                <div className="mt-auto pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs">
                  <span className="text-primary font-semibold">Separate Direct Hotlines</span>
                  <a href="#locations" className="text-on-surface hover:text-primary font-bold">View Maps →</a>
                </div>
              </motion.article>

              {/* 3. Professional Fitness Trainers */}
              <motion.article
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-space-sm hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">sports</span>
                </div>
                <h3 className="font-headline-sm uppercase text-on-surface text-lg font-bold">
                  Professional Fitness Trainers
                </h3>
                <p className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                  Looking for a certified <strong className="text-on-surface">personal trainer in Vadodara</strong>? Our roster is led by <strong className="text-on-surface">Founders Irfan Shaikh &amp; Ronak Parmar</strong> and Senior Trainer <strong className="text-on-surface">Shehab Pathan</strong> (15 years experience, Diploma from K11 Fitness Academy, AKFA Kettlebell, CrossFit, Karate Black Belt). Together with Arif Shaikh, David Macwan, and Rehan Nanno, we design progressive hypertrophy and metabolic conditioning plans.
                </p>
                <div className="mt-auto pt-2 border-t border-outline-variant/20 text-xs text-on-surface">
                  <span className="text-primary font-bold">Specializations: </span>
                  Injury Rehab, Powerlifting, Fat Loss, Postural Alignment.
                </div>
              </motion.article>

              {/* 4. Modern Gym Equipment */}
              <motion.article
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-space-sm hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">fitness_center</span>
                </div>
                <h3 className="font-headline-sm uppercase text-on-surface text-lg font-bold">
                  Modern Gym Equipment
                </h3>
                <p className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                  Our Vadodara gyms feature heavy-duty commercial equipment engineered for biomechanical alignment. Highlights include Being Strong leg extension/curl platforms, 45° plate-loaded linear leg presses, 8-stack cable crossover hubs, competition flat/incline benches, power cages, and polyurethane dumbbells scaling up to 50+ kg.
                </p>
                <div className="mt-auto pt-2 border-t border-outline-variant/20 text-xs">
                  <a href="#equipment" className="text-primary font-bold hover:underline">
                    Explore Combined Equipment Gallery →
                  </a>
                </div>
              </motion.article>

              {/* 5. Strength and Fitness Training */}
              <motion.article
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-space-sm hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">bolt</span>
                </div>
                <h3 className="font-headline-sm uppercase text-on-surface text-lg font-bold">
                  Strength and Fitness Training
                </h3>
                <p className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                  We specialize in progressive <strong className="text-on-surface">strength training in Vadodara</strong> and individualized fitness programs. Whether you want to pack on lean muscle mass, strip stubborn body fat, or build functional power for athletic sports, our periodized workouts guarantee measurable results without plateauing.
                </p>
                <div className="mt-auto pt-2 border-t border-outline-variant/20 text-xs text-on-surface-variant">
                  <span>Programs: Hypertrophy · High Intensity Conditioning · Olympic Lifts</span>
                </div>
              </motion.article>

              {/* 6. Visit FIT X FREAK */}
              <motion.article
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 25 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-space-lg rounded-2xl bg-surface-container border border-primary/40 flex flex-col gap-space-sm hover:border-primary transition-all shadow-[0_0_25px_rgba(255,84,76,0.12)]"
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                </div>
                <h3 className="font-headline-sm uppercase text-on-surface text-lg font-bold">
                  Visit FIT X FREAK
                </h3>
                <p className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                  Ready to elevate your training? Claim your complimentary 1-Day VIP pass or book personal coaching. Select your preferred branch below, and your enquiry is routed automatically to our branch WhatsApp hotline.
                </p>
                <div className="mt-auto pt-2 border-t border-outline-variant/20 flex flex-col gap-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact', {
                        interest: '1-Day Free Trial Session',
                        goalNote: 'Visiting FIT X FREAK for trial session.',
                      });
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase tracking-wider text-center hover:brightness-110 transition-all cursor-pointer shadow-md"
                  >
                    Book Free Trial Session
                  </a>
                </div>
              </motion.article>
            </div>
          </section>

          {/* SEO FAQ SECTION */}
          <section id="faq" className="py-space-xl px-gutter max-w-4xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Answers to Frequent Questions
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                FREQUENTLY ASKED QUESTIONS – VADODARA BEST GYM
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mt-space-xs text-sm">
                Everything you need to know about workout sessions, trainers, equipment, and visiting FIT X FREAK Vadodara.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </div>

            <div className="flex flex-col gap-space-md">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <article
                    key={item.question}
                    className="rounded-xl bg-surface-container border border-outline-variant/20 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full p-space-lg flex items-center justify-between text-left cursor-pointer hover:bg-surface-container-high/60 transition-colors"
                    >
                      <div className="flex flex-col gap-1 pr-4">
                        <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
                          {item.category}
                        </span>
                        <h3 className="font-headline-sm uppercase text-on-surface text-base sm:text-lg">
                          {item.question}
                        </h3>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                        <span
                          className="material-symbols-outlined text-[20px] transition-transform duration-200"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        >
                          expand_more
                        </span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-space-lg pb-space-lg text-body-md text-on-surface-variant border-t border-outline-variant/15 pt-space-sm leading-relaxed text-sm">
                        <p>{item.answer}</p>
                        <div className="mt-space-md pt-space-xs flex flex-wrap items-center gap-space-md text-xs">
                          <button
                            type="button"
                            onClick={() => openWhatsAppChat('OP Road', `Hi, question regarding: "${item.question}"`)}
                            className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat</span> Ask OP Road (6354661053)
                          </button>
                          <button
                            type="button"
                            onClick={() => openWhatsAppChat('Fatehgunj', `Hi, question regarding: "${item.question}"`)}
                            className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat</span> Ask Fatehgunj (8733944072)
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* CONTACT / ENQUIRY FORM WITH MANDATORY LOCATION SELECTION */}
          <section id="contact" className="py-space-xl px-gutter max-w-4xl mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-space-xl">
              <span className="text-label-sm uppercase tracking-widest text-primary mb-space-xs">
                Direct Branch Dispatch
              </span>
              <h2 className="font-headline-lg uppercase text-on-surface text-2xl sm:text-4xl">
                SUBMIT YOUR ENQUIRY
              </h2>
              <p className="text-body-md text-on-surface-variant max-w-md mt-space-xs text-sm">
                Select your preferred gym location. Your enquiry will automatically open on the exact branch contact on WhatsApp.
              </p>
              <div className="w-24 h-1 bg-primary mt-space-sm rounded-full" />
            </div>

            <div className="p-4 sm:p-space-xl rounded-2xl bg-surface-container border border-outline-variant/20 relative shadow-[0_0_35px_rgba(0,0,0,0.5)]">
              {!formSubmitted ? (
                <form
                  className="flex flex-col gap-space-md sm:gap-space-lg"
                  id="lead-form"
                  onSubmit={handleFormSubmit}
                >
                  {/* Mandatory location selection field */}
                  <div className="p-3 sm:p-space-md rounded-xl bg-surface border-2 border-primary/40 flex flex-col gap-space-xs">
                    <label
                      htmlFor="preferred-branch"
                      className="text-xs uppercase text-primary font-bold flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      Select Your Preferred Gym Location *
                    </label>
                    <select
                      id="preferred-branch"
                      value={preferredBranch}
                      onChange={(e) => setPreferredBranch(e.target.value as 'OP Road' | 'Fatehgunj')}
                      required
                      className="w-full px-3 py-3 sm:px-space-md sm:py-space-md rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface focus:border-primary outline-none transition-all font-semibold text-base sm:text-sm cursor-pointer"
                    >
                      <option value="OP Road" className="bg-surface-container text-on-surface">
                        1. OP Road (Avishkar Complex — WhatsApp: 6354661053)
                      </option>
                      <option value="Fatehgunj" className="bg-surface-container text-on-surface">
                        2. Fatehgunj (Astoria Complex, Beside Seven Seas Mall — WhatsApp: 8733944072)
                      </option>
                    </select>
                    <div className="text-[11px] text-on-surface-variant flex items-center justify-between pt-1">
                      <span>Target Branch Hotline:</span>
                      <strong className="text-primary font-mono">
                        {preferredBranch === 'OP Road' ? '+91 6354661053' : '+91 8733944072'}
                      </strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md sm:gap-space-lg">
                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="full-name"
                        className="text-label-sm uppercase text-on-surface-variant text-xs"
                      >
                        Customer Name *
                      </label>
                      <input
                        id="full-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-3 sm:px-space-md sm:py-space-md rounded-lg bg-surface border border-outline-variant/30 text-on-surface focus:border-primary outline-none transition-all text-base sm:text-sm"
                        placeholder="e.g. Rahul Sharma"
                        required
                        type="text"
                      />
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="mobile-number"
                        className="text-label-sm uppercase text-on-surface-variant text-xs"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="mobile-number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full px-3 py-3 sm:px-space-md sm:py-space-md rounded-lg bg-surface border border-outline-variant/30 text-on-surface focus:border-primary outline-none transition-all text-base sm:text-sm font-mono"
                        placeholder="e.g. 9876543210"
                        required
                        type="tel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md sm:gap-space-lg">
                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="email-address"
                        className="text-label-sm uppercase text-on-surface-variant text-xs"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email-address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="w-full px-3 py-3 sm:px-space-md sm:py-space-md rounded-lg bg-surface border border-outline-variant/30 text-on-surface focus:border-primary outline-none transition-all text-base sm:text-sm"
                        placeholder="name@example.com"
                        required
                        type="email"
                      />
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="interested-in"
                        className="text-label-sm uppercase text-on-surface-variant text-xs"
                      >
                        Interested In *
                      </label>
                      <select
                        id="interested-in"
                        value={interestedIn}
                        onChange={(e) => setInterestedIn(e.target.value)}
                        className="w-full px-3 py-3 sm:px-space-md sm:py-space-md rounded-lg bg-surface border border-outline-variant/30 text-on-surface focus:border-primary outline-none transition-all text-base sm:text-sm cursor-pointer"
                      >
                        <option value="Personal Training with Coach">Personal Training with Coach</option>
                        <option value="Guidance with Founder Irfan Shaikh">Guidance with Founder Irfan Shaikh</option>
                        <option value="Guidance with Founder Ronak Parmar">Guidance with Founder Ronak Parmar</option>
                        <option value="Training with Senior Coach Shehab Pathan">Training with Senior Coach Shehab Pathan</option>
                        <option value="Zumba & Group Fitness Classes">Zumba &amp; Group Fitness Classes</option>
                        <option value="1-Day Free Trial Session">1-Day Free Trial Session</option>
                        <option value="Muscle Building & Weight Gain">Muscle Building &amp; Weight Gain</option>
                        <option value="Fat Loss & Transformation">Fat Loss &amp; Transformation</option>
                        <option value="General Fitness & Strength">General Fitness &amp; Strength</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md sm:gap-space-lg">
                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="preferred-time"
                        className="text-label-sm uppercase text-on-surface-variant text-xs"
                      >
                        Preferred Workout Batch
                      </label>
                      <select
                        id="preferred-time"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-3 sm:px-space-md sm:py-space-md rounded-lg bg-surface border border-outline-variant/30 text-on-surface focus:border-primary outline-none transition-all text-base sm:text-sm cursor-pointer"
                      >
                        <option value="Morning (06:00 AM - 12:00 PM)">
                          Morning (06:00 AM - 12:00 PM)
                        </option>
                        <option value="Evening (04:00 PM - 10:00 PM)">
                          Evening (04:00 PM - 10:00 PM)
                        </option>
                      </select>
                      <span className="text-[11px] text-on-surface-variant">
                        Mon – Sat open · Sunday Closed
                      </span>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label
                        htmlFor="message-goals"
                        className="text-label-sm uppercase text-on-surface-variant text-xs"
                      >
                        Enquiry Details / Fitness Goals
                      </label>
                      <input
                        id="message-goals"
                        value={messageGoals}
                        onChange={(e) => setMessageGoals(e.target.value)}
                        className="w-full px-3 py-3 sm:px-space-md sm:py-space-md rounded-lg bg-surface border border-outline-variant/30 text-on-surface focus:border-primary outline-none transition-all text-base sm:text-sm"
                        placeholder="e.g. Looking for weight loss and muscle building"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-space-md bg-gradient-to-r from-primary-container to-secondary-container text-on-secondary-container font-label-lg rounded-lg uppercase shadow-[0_0_20px_rgba(255,84,76,0.3)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 font-bold text-sm"
                    type="submit"
                  >
                    <span>Submit &amp; Open WhatsApp ({preferredBranch})</span>
                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-space-xl gap-space-md">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[32px]">
                    <span className="material-symbols-outlined text-[36px]">done</span>
                  </div>
                  <h3 className="font-headline-md uppercase text-on-surface text-xl sm:text-2xl">
                    Enquiry Dispatched!
                  </h3>
                  <p className="text-body-lg text-on-surface-variant max-w-md text-sm leading-relaxed">
                    Thank you, <strong className="text-on-surface">{fullName}</strong>! Your enquiry for{' '}
                    <span className="text-primary font-semibold">{interestedIn}</span> at{' '}
                    <strong className="text-on-surface">FIT X FREAK – {preferredBranch}</strong> has been generated and sent to WhatsApp hotline{' '}
                    <strong className="text-on-surface font-mono text-primary">
                      +91 {lastDispatchedNumber}
                    </strong>.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs">
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsAppChat(
                          preferredBranch,
                          `Hi FIT X FREAK ${preferredBranch}, following up on my enquiry for ${fullName} (${mobileNumber}).`
                        )
                      }
                      className="px-space-lg py-space-sm bg-[#25D366] text-white font-label-lg rounded-lg uppercase hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-md text-xs font-bold"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      Open WhatsApp Chat
                    </button>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-space-lg py-space-sm bg-surface-container-high text-on-surface font-label-lg rounded-lg uppercase hover:bg-primary hover:text-on-primary transition-all cursor-pointer text-xs"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 sm:gap-space-sm">
        <button
          type="button"
          onClick={() => {
            setVisitorSubmitted(false);
            setVisitorModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-[0_0_20px_rgba(255,84,76,0.6)] hover:scale-105 transition-all cursor-pointer font-bold text-[11px] sm:text-xs uppercase border border-white/20 animate-pulse"
          title="Claim Free 1-Day VIP Pass"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[16px]">redeem</span>
          <span>Free 1-Day Pass</span>
        </button>

        <div className="flex flex-col gap-space-sm items-center">
          <button
            type="button"
            aria-label="Call Gym Branches"
            onClick={() => setCallModalOpen(true)}
            className="flex items-center justify-center w-12 h-12 bg-surface-container-high text-on-surface rounded-full shadow-[0_0_15px_rgba(255,180,172,0.15)] hover:bg-primary hover:text-on-primary transition-all group relative cursor-pointer border border-outline-variant/30"
            title="Call Branch"
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
          </button>

          <button
            type="button"
            aria-label="Open WhatsApp Chat"
            onClick={() => setWhatsAppModalOpen(true)}
            className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:brightness-110 hover:scale-105 transition-all cursor-pointer"
            title="Chat on WhatsApp"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </button>
        </div>
      </div>

      {/* QUICK BRANCH CALL MODAL */}
      {callModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-gutter animate-fade-in"
          onClick={() => setCallModalOpen(false)}
        >
          <div
            className="max-w-sm w-full rounded-2xl bg-surface-container border border-outline-variant/30 p-space-lg flex flex-col gap-space-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <span className="font-headline-sm uppercase text-on-surface text-base flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                Call FIT X FREAK Branch
              </span>
              <button
                type="button"
                onClick={() => setCallModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant">
              Select which branch you would like to call:
            </p>

            <a
              href="tel:+916354661053"
              className="p-3 rounded-xl bg-surface border border-outline-variant/30 hover:border-primary flex items-center justify-between group transition-all"
            >
              <div>
                <span className="text-xs font-bold text-on-surface uppercase block">
                  OP Road Branch
                </span>
                <span className="text-[11px] text-on-surface-variant">Avishkar Complex, Old Padra Rd</span>
              </div>
              <span className="font-mono text-xs font-bold text-primary group-hover:underline">
                6354661053
              </span>
            </a>

            <a
              href="tel:+918733944072"
              className="p-3 rounded-xl bg-surface border border-outline-variant/30 hover:border-primary flex items-center justify-between group transition-all"
            >
              <div>
                <span className="text-xs font-bold text-on-surface uppercase block">
                  Fatehgunj Branch
                </span>
                <span className="text-[11px] text-on-surface-variant">Astoria Complex, Beside Seven Seas Mall</span>
              </div>
              <span className="font-mono text-xs font-bold text-primary group-hover:underline">
                8733944072
              </span>
            </a>
          </div>
        </div>
      )}

      {/* QUICK BRANCH WHATSAPP MODAL */}
      {whatsAppModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-gutter animate-fade-in"
          onClick={() => setWhatsAppModalOpen(false)}
        >
          <div
            className="max-w-sm w-full rounded-2xl bg-surface-container border border-outline-variant/30 p-space-lg flex flex-col gap-space-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <span className="font-headline-sm uppercase text-on-surface text-base flex items-center gap-1.5">
                <svg className="w-5 h-5 fill-current text-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Chat on WhatsApp
              </span>
              <button
                type="button"
                onClick={() => setWhatsAppModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant">
              Select which branch you would like to chat with:
            </p>

            <button
              type="button"
              onClick={() => {
                setWhatsAppModalOpen(false);
                openWhatsAppChat('OP Road');
              }}
              className="p-3 rounded-xl bg-surface border border-outline-variant/30 hover:border-[#25D366] flex items-center justify-between text-left cursor-pointer transition-all"
            >
              <div>
                <span className="text-xs font-bold text-on-surface uppercase block">
                  OP Road Branch
                </span>
                <span className="text-[11px] text-on-surface-variant">Hotline: 6354661053</span>
              </div>
              <span className="text-xs font-bold text-[#25D366]">Chat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setWhatsAppModalOpen(false);
                openWhatsAppChat('Fatehgunj');
              }}
              className="p-3 rounded-xl bg-surface border border-outline-variant/30 hover:border-[#25D366] flex items-center justify-between text-left cursor-pointer transition-all"
            >
              <div>
                <span className="text-xs font-bold text-on-surface uppercase block">
                  Fatehgunj Branch
                </span>
                <span className="text-[11px] text-on-surface-variant">Hotline: 8733944072</span>
              </div>
              <span className="text-xs font-bold text-[#25D366]">Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* TRAINER PROFILE & CERTIFICATIONS MODAL */}
      {selectedTrainer && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-gutter animate-fade-in"
          onClick={() => setSelectedTrainer(null)}
        >
          <div
            className="max-w-2xl w-full rounded-2xl bg-surface-container border border-outline-variant/30 overflow-hidden p-space-lg sm:p-space-xl flex flex-col gap-space-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-space-md">
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-xl overflow-hidden bg-surface-container-lowest shrink-0 border border-outline-variant/30 relative">
                <img
                  src={selectedTrainer.image}
                  alt={selectedTrainer.alt}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-2 left-2">
                  {selectedTrainer.isSeniorTrainer ? (
                    <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-black uppercase tracking-wider shadow-md">
                      ★ SENIOR TRAINER
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-surface/90 text-primary text-[10px] font-bold uppercase tracking-wider border border-outline-variant/30">
                      CERTIFIED COACH
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-1 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-bold uppercase tracking-wider">
                    {selectedTrainer.badgeLabel} · FIT X FREAK
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedTrainer(null)}
                    className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                <h3 className={`font-headline-md uppercase text-2xl ${
                  selectedTrainer.isSeniorTrainer ? 'text-primary' : 'text-on-surface'
                }`}>
                  {selectedTrainer.name}
                </h3>

                <p className="text-sm font-semibold text-primary">
                  {selectedTrainer.role}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-xs font-mono font-bold border border-outline-variant/30">
                    {selectedTrainer.experience}
                  </span>
                  {selectedTrainer.qualification && (
                    <span className="px-2.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-xs font-medium border border-outline-variant/30 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-primary">school</span>
                      {selectedTrainer.qualification}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded bg-surface-container-highest text-on-surface text-xs font-medium border border-outline-variant/30">
                    {selectedTrainer.branchName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-2">
                  {selectedTrainer.bio}
                </p>
              </div>
            </div>

            {/* Complete list of certifications */}
            <div className="border-t border-outline-variant/20 pt-space-sm flex flex-col gap-1.5">
              <span className="text-xs uppercase text-primary font-bold tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Verified Certifications &amp; Credentials ({selectedTrainer.certifications.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedTrainer.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="p-2 rounded-lg bg-surface border border-outline-variant/20 flex items-center gap-2 text-xs font-medium text-on-surface"
                  >
                    <span className="material-symbols-outlined text-primary text-[15px] shrink-0">check_circle</span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-md border-t border-outline-variant/20 text-xs">
              <a
                href={selectedTrainer.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-[#E1306C] flex items-center gap-1.5 transition-colors font-medium"
              >
                <svg className="w-4 h-4 fill-current text-[#E1306C]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Follow {selectedTrainer.instagramHandle}</span>
              </a>

              <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTrainer(null)}
                  className="px-space-md py-2 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const trainerName = selectedTrainer.name;
                    const trainerRole = selectedTrainer.role;
                    setSelectedTrainer(null);
                    scrollToSection('contact', {
                      interest: `Personal Training with ${trainerName}`,
                      goalNote: `I want to enroll for personal coaching sessions with ${trainerName} (${trainerRole}).`,
                    });
                  }}
                  className="px-space-md py-2 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase cursor-pointer hover:brightness-110 transition-all shadow-md"
                >
                  Book Training
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPMENT LIGHTBOX / SPECS MODAL (Identified Equipment Details) */}
      {selectedEquipment && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-gutter animate-fade-in"
          onClick={() => setSelectedEquipment(null)}
        >
          <div
            className="max-w-xl w-full rounded-2xl bg-surface-container border border-outline-variant/30 overflow-hidden p-space-xl flex flex-col gap-space-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-64 sm:h-72 rounded-xl overflow-hidden bg-surface-container-lowest relative">
              <img
                src={selectedEquipment.image}
                alt={selectedEquipment.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded bg-surface/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-wider border border-outline-variant/30">
                  {selectedEquipment.branchName}
                </span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                  {selectedEquipment.categoryLabel} Equipment
                </span>
                <h3 className="font-headline-md uppercase text-on-surface text-lg sm:text-xl">
                  {selectedEquipment.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEquipment(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
              {selectedEquipment.description}
            </p>

            {/* Target Muscle & Workout Purpose Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div className="p-3 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">sports_gymnastics</span>
                  Target Muscle Group
                </span>
                <span className="text-xs font-semibold text-on-surface">
                  {selectedEquipment.targetMuscle}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  Main Workout Purpose
                </span>
                <span className="text-xs text-on-surface leading-snug">
                  {selectedEquipment.workoutPurpose}
                </span>
              </div>
            </div>

            {/* Key Specs */}
            <div className="border-t border-outline-variant/20 pt-space-sm flex flex-col gap-space-xs">
              <span className="text-xs uppercase text-primary font-bold">Hardware Specifications</span>
              <ul className="grid grid-cols-1 gap-1 text-xs text-on-surface">
                {selectedEquipment.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[15px]">check_circle</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-space-md border-t border-outline-variant/20 text-xs">
              <span className="text-on-surface-variant">
                Available at: <strong className="text-primary">{selectedEquipment.branchName}</strong>
              </span>
              <div className="flex gap-space-sm">
                <button
                  type="button"
                  onClick={() => setSelectedEquipment(null)}
                  className="px-space-md py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const branchChoice =
                      selectedEquipment.branchId === 'op-road' ? 'OP Road' : 'Fatehgunj';
                    setSelectedEquipment(null);
                    scrollToSection('contact', {
                      branch: branchChoice,
                      interest: 'Free Trial Session',
                      goalNote: `Interested in testing ${selectedEquipment.name} at ${selectedEquipment.branchName}.`,
                    });
                  }}
                  className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase cursor-pointer"
                >
                  Try at Branch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRANSFORMATION LIGHTBOX MODAL */}
      {selectedTransformation && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-gutter animate-fade-in"
          onClick={() => setSelectedTransformation(null)}
        >
          <div
            className="max-w-3xl w-full rounded-2xl bg-surface-container border border-primary/40 overflow-hidden p-4 sm:p-space-lg flex flex-col gap-space-md shadow-[0_0_50px_rgba(0,0,0,0.85)] max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[260px] sm:h-[480px] rounded-xl overflow-hidden bg-black flex items-center justify-center relative border border-outline-variant/20 shrink-0">
              <img
                src={selectedTransformation.image}
                alt={selectedTransformation.alt}
                className="w-full h-full object-contain"
              />
              {selectedTransformation.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-primary text-on-primary text-[10px] font-black uppercase tracking-wider shadow-lg">
                    {selectedTransformation.badge}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase text-primary font-bold block">
                  {selectedTransformation.statHighlight} · {selectedTransformation.branch}
                </span>
                <h3 className="font-headline-md uppercase text-on-surface text-lg sm:text-xl font-bold">
                  {selectedTransformation.name}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1 leading-relaxed">
                  {selectedTransformation.quote}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTransformation(null)}
                className="px-space-md py-2 rounded-lg bg-surface-container-high text-on-surface text-xs uppercase font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer shrink-0 self-end sm:self-center"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED STUDIO & ZUMBA VIDEO THEATER MODAL */}
      {activeStudioVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-gutter animate-fade-in"
          onClick={() => setActiveStudioVideo(null)}
        >
          <div
            className="max-w-4xl w-full rounded-2xl bg-surface-container border border-primary/40 overflow-hidden p-4 sm:p-space-lg flex flex-col gap-space-md shadow-[0_0_50px_rgba(255,84,76,0.3)] max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping shrink-0" />
                <span className="text-[11px] sm:text-xs uppercase font-bold text-primary tracking-wider truncate">
                  {activeStudioVideo.branchName} · {activeStudioVideo.category} ({activeStudioVideo.duration})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveStudioVideo(null)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface hover:bg-primary hover:text-on-primary flex items-center justify-center cursor-pointer transition-colors shrink-0"
                aria-label="Close Video"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div
              className={`rounded-xl overflow-hidden bg-black shadow-2xl relative flex items-center justify-center ${
                activeStudioVideo.isPortrait ? 'max-h-[58dvh] sm:max-h-[68vh] aspect-[9/16] mx-auto' : 'w-full aspect-video'
              }`}
            >
              <video
                key={activeStudioVideo.id}
                src={activeStudioVideo.videoUrl}
                poster={activeStudioVideo.posterUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => {
                  const vidEl = e.currentTarget;
                  if (vidEl.paused) {
                    vidEl.play().catch(() => {
                      vidEl.muted = true;
                      vidEl.play().catch(() => {});
                    });
                  }
                }}
                className="w-full h-full object-contain"
              >
                Your browser does not support HTML5 video playback.
              </video>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <div>
                <h3 className="font-headline-md uppercase text-on-surface text-base sm:text-lg font-bold">
                  {activeStudioVideo.title}
                </h3>
                <p className="text-body-md text-on-surface-variant text-xs mt-0.5">
                  {activeStudioVideo.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStudioVideo(null)}
                className="px-space-md py-1.5 rounded-lg bg-surface-container-high text-on-surface text-xs uppercase font-bold hover:bg-primary hover:text-on-primary transition-all cursor-pointer self-end sm:self-auto shrink-0"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISITOR 1-DAY FREE PASS MODAL */}
      {visitorModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-gutter animate-fade-in"
          onClick={() => setVisitorModalOpen(false)}
        >
          <div
            className="max-w-md w-full rounded-2xl bg-surface-container border border-primary/40 shadow-[0_0_40px_rgba(255,84,76,0.3)] p-space-xl flex flex-col gap-space-md relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                Vadodara Special Invitation
              </div>
              <button
                type="button"
                onClick={() => setVisitorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {!visitorSubmitted ? (
              <form onSubmit={handleVisitorLeadSubmit} className="flex flex-col gap-space-md mt-space-xs">
                <div>
                  <h3 className="font-headline-md uppercase text-on-surface text-xl">
                    CLAIM 1-DAY FREE VIP PASS
                  </h3>
                  <p className="text-body-md text-on-surface-variant text-xs mt-1">
                    Enter your email to claim your complimentary workout pass. Notification dispatches directly to the selected branch's WhatsApp.
                  </p>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <label htmlFor="vis-branch" className="text-label-sm uppercase text-primary text-[11px] font-bold">
                    Select Gym Branch *
                  </label>
                  <select
                    id="vis-branch"
                    value={visitorBranch}
                    onChange={(e) => setVisitorBranch(e.target.value as 'OP Road' | 'Fatehgunj')}
                    className="w-full px-space-md py-2 rounded-lg bg-surface border border-outline-variant/40 text-on-surface text-xs font-semibold focus:border-primary outline-none cursor-pointer"
                  >
                    <option value="OP Road">FIT X FREAK – OP Road (6354661053)</option>
                    <option value="Fatehgunj">FIT X FREAK – Fatehgunj (8733944072)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <label htmlFor="vis-email" className="text-label-sm uppercase text-on-surface-variant text-[11px]">
                    Your Email Address *
                  </label>
                  <input
                    id="vis-email"
                    type="email"
                    required
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface border border-outline-variant/40 text-on-surface focus:border-primary outline-none transition-all text-xs"
                  />
                </div>

                <div className="flex flex-col gap-space-xs">
                  <label htmlFor="vis-phone" className="text-label-sm uppercase text-on-surface-variant text-[11px]">
                    Mobile / WhatsApp Number
                  </label>
                  <input
                    id="vis-phone"
                    type="tel"
                    value={visitorPhone}
                    onChange={(e) => setVisitorPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-space-md py-2.5 rounded-lg bg-surface border border-outline-variant/40 text-on-surface focus:border-primary outline-none transition-all text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-label-lg rounded-lg uppercase shadow-[0_0_20px_rgba(255,84,76,0.35)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <span>Claim Pass &amp; Open WhatsApp ({visitorBranch})</span>
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center py-space-md gap-space-sm">
                <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h4 className="font-headline-sm uppercase text-on-surface text-base">VIP Pass Registered!</h4>
                <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
                  Thank you! Your request for <strong className="text-on-surface">{visitorEmail}</strong> has been registered for{' '}
                  <strong className="text-primary">{visitorBranch}</strong> (Hotline: {visitorBranch === 'OP Road' ? '6354661053' : '8733944072'}).
                </p>
                <button
                  type="button"
                  onClick={() => setVisitorModalOpen(false)}
                  className="w-full py-2 bg-surface-container-high text-on-surface font-label-lg rounded-lg text-xs uppercase hover:bg-surface-container-highest cursor-pointer mt-2"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-low pt-space-xl pb-28 sm:pb-space-xl border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 md:grid-cols-4 gap-space-lg sm:gap-space-xl">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-md">
              <img
                alt="FIT X FREAK Logo"
                className="h-10 w-10 rounded-full object-contain bg-white/95 p-0.5 shadow-[0_0_10px_rgba(255,51,51,0.2)] border border-primary/30"
                src={BRAND_ASSETS.logo}
                referrerPolicy="no-referrer"
              />
              <span className="font-headline-sm text-on-surface uppercase text-lg">FIT X FREAK</span>
            </div>
            <p className="text-body-md text-on-surface-variant text-xs leading-relaxed">
              Vadodara’s highest-standard gym with Olympic-grade machinery, certified personal trainers, and uncompromising workout atmosphere across OP Road and Fatehgunj.
            </p>
            <div className="p-2.5 rounded-xl bg-surface-container border border-outline-variant/20 text-[11px] flex flex-col gap-0.5">
              <span className="font-bold text-primary uppercase tracking-wider">Gym Timings (Mon – Sat)</span>
              <span className="text-on-surface">Morning: 06:00 AM – 12:00 PM</span>
              <span className="text-on-surface">Evening: 04:00 PM – 10:00 PM</span>
              <span className="text-error font-semibold">Sunday: Closed</span>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs text-xs">
            <span className="font-label-lg uppercase text-on-surface font-bold text-sm mb-1">
              Quick Links
            </span>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#locations"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('locations');
              }}
            >
              Our Locations
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#founder"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('founder');
              }}
            >
              Founders Irfan Shaikh &amp; Ronak Parmar
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#trainers"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('trainers');
              }}
            >
              Certified Trainers &amp; Master Coaches
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#equipment"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('equipment');
              }}
            >
              Combined Gym Equipment
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#zumba"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('zumba');
              }}
            >
              Zumba &amp; Video Tours
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#results"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('results');
              }}
            >
              Proven Results
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#seo-guide"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('seo-guide');
              }}
            >
              Vadodara Gym Guide
            </a>
            <a
              className="text-on-surface-variant hover:text-on-surface transition-colors py-1"
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('faq');
              }}
            >
              FAQs
            </a>
          </div>

          <div className="flex flex-col gap-space-xs text-xs">
            <span className="font-label-lg uppercase text-on-surface font-bold text-sm mb-1">
              Our 2 Branches
            </span>
            <div className="flex flex-col gap-1 pb-2 border-b border-outline-variant/15">
              <strong className="text-on-surface font-bold">1. FIT X FREAK – OP Road</strong>
              <span className="text-on-surface-variant text-[11px]">
                7-8th Floor, Avishkar Complex, Old Padra Road, Vadodara – 390007
              </span>
              <a href="tel:+916354661053" className="text-primary font-mono font-bold hover:underline">
                Call: +91 6354661053
              </a>
            </div>
            <div className="flex flex-col gap-1 pt-1">
              <strong className="text-on-surface font-bold">2. FIT X FREAK – Fatehgunj</strong>
              <span className="text-on-surface-variant text-[11px]">
                1st and 2nd Floor, Astoria Complex, Beside Seven Seas Mall, Fatehgunj, Vadodara – 390008
              </span>
              <a href="tel:+918733944072" className="text-primary font-mono font-bold hover:underline">
                Call: +91 8733944072
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm text-xs">
            <span className="font-label-lg uppercase text-on-surface font-bold text-sm mb-1">
              Connect With Us
            </span>
            <button
              type="button"
              onClick={() => setWhatsAppModalOpen(true)}
              className="text-left text-[#25D366] hover:brightness-110 flex items-center gap-1.5 transition-colors cursor-pointer font-bold"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Chat with Branches on WhatsApp
            </button>

            <div className="flex items-center gap-space-md mt-space-xs">
              <a
                aria-label="FIT X FREAK Instagram Profile"
                className="text-on-surface-variant hover:text-[#E1306C] transition-colors"
                href={BRAND_ASSETS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Instagram: ${BRAND_ASSETS.instagramHandle}`}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                aria-label="FIT X FREAK YouTube Channel"
                className="text-on-surface-variant hover:text-[#FF0000] transition-colors"
                href={BRAND_ASSETS.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube: @fitxfreak"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                aria-label="FIT X FREAK Facebook"
                className="text-on-surface-variant hover:text-[#1877F2] transition-colors"
                href={BRAND_ASSETS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook: fitxfreak"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-gutter mt-space-xl pt-space-md border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant text-xs text-center sm:text-left">
          <span>
            © {new Date().getFullYear()} FIT X FREAK – Vadodara's Best Gym. All rights reserved.
          </span>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-primary">visibility</span>
            <span className="uppercase tracking-wider text-[11px] font-semibold text-on-surface-variant">
              Website Visitors:
            </span>
            <span className="font-mono font-bold text-primary tabular-nums text-sm">
              {visitorCount.toLocaleString()}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
