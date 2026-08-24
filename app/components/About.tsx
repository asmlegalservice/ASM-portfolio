"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const PRACTICE_AREAS = [
  {
    title: "Civil & Revenue Litigation",
    //subtitle: "Civil & Revenue Litigation",
    image: "/practice/civil_law.png",
    link: "https://www.asmlegalservices.in/practice-area/civil-litigation",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "Criminal Litigation & White Collar Crimes",
    //subtitle: "Criminal & White-Collar",
    image: "/practice/criminal_law.png",
    link: "https://www.asmlegalservices.in/practice-area/criminal-law",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l.852-.852m-.852.852a3.75 3.75 0 11-5.303-5.304 3.75 3.75 0 015.303 5.304zm0 0l6.182-6.182m-6.182 6.182L15 10m-6.182 6.122l-.852.852m.852-.852L15 10m0 0l.852-.852m-.852.852L9.53 16.122M15 10l6.182-6.182m-6.182 6.182l.852-.852" />
      </svg>
    ),
  },
  {
    title: "Matrimonial & Family Disputes",
    //subtitle: "Family & Matrimonial",
    image: "/practice/family_law.png",
    link: "https://www.asmlegalservices.in/practice-area/matrimonial-family-disputes",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Real Estate & Property Law",
    //subtitle: "Real Estate & Revenue",
    image: "/practice/property_law.png",
    link: "https://www.asmlegalservices.in/practice-area/real-estate-property-law",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M2.25 21h16.5M2.25 21V8.545A.91.91 0 013.159 7.64h13.682c.502 0 .91.408.91.91V21" />
      </svg>
    ),
  },
  {
    title: "Wills, Succession & Estate Planning",
    //subtitle: "Wills & Succession",
    image: "/practice/estate_planning.png",
    link: "https://www.asmlegalservices.in/practice-area/will-succession",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "HNI & NRI Legal Services",
    //subtitle: "Mediation & ADR",
    image: "/practice/HNI_RNI.png",
    link: "https://www.asmlegalservices.in/practice-area/hni-nri",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Startup & Early Stage Companies",
    //subtitle: "Startup Support",
    image: "/practice/corporate_law.png",
    link: "https://www.asmlegalservices.in/practice-area/corporate-law",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .994-.806 1.8-1.8 1.8H5.55c-.994 0-1.8-.806-1.8-1.8v-4.25m16.5 0a2.25 2.25 0 00.375-1.255v-2.208a2.25 2.25 0 00-2.25-2.25H5.625a2.25 2.25 0 00-2.25 2.25v2.208c0 .482.152.946.375 1.255m16.5 0c-.22.29-.53.51-.88.63a23.956 23.956 0 01-15.24 0 2.228 2.228 0 01-.88-.63M16.5 7.5V6a2.25 2.25 0 00-2.25-2.25h-4.5A2.25 2.25 0 007.5 6v1.5m9 0h-9" />
      </svg>
    ),
  },
  {
    title: "Conveyancing & Documentation Services",
    //subtitle: "Conveyance & Deeds",
    image: "/practice/documentation.png",
    link: "https://www.asmlegalservices.in/practice-area/documentation",
    icon: (
      <svg className="w-5 h-5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
];

const TIMELINE_EVENTS = [
  {
    year: "2003",
    category: "Education & Foundation",
    title: "LL.B Academic Excellence",
    description: "Completed legal education with a rigorous focus on constitutional law, civil procedure, and criminal jurisprudence."
  },
  {
    year: "2005",
    category: "Early Advocacy",
    title: "Courtroom Mentorship",
    description: "Trained under distinguished senior advocates, acquiring trial court exposure in complex civil and criminal litigation."
  },
  {
    year: "2008",
    category: "Official Practice",
    title: "Bar Council Enrollment",
    description: "Enrolled as an Advocate with the Bar Council of Maharashtra & Goa, commencing independent legal practice."
  },
  {
    year: "2012",
    category: "Practice Expansion",
    title: "Real Estate & Family Law",
    description: "Expanded core practice to encompass revenue litigation, high-value real estate documentation, and matrimonial dispute resolution."
  },
  {
    year: "2017",
    category: "Advisory & Corporate",
    title: "Startup & HNI Consultancy",
    description: "Established dedicated legal advisory services for startups, early-stage enterprises, HNI investors, and NRI legal compliance."
  },
  {
    year: "2021",
    category: "Publications & Initiatives",
    title: "Author & Legal Awareness",
    description: "Authored legal books ('Life and Law' & 'Magic Mindset') and launched digital legal platforms like KNOW Divorce."
  },
  {
    year: "2024+",
    category: "20+ Years Milestone",
    title: "Two Decades of Legal Trust",
    description: "Continuing legal leadership with a client-first practice built on transparency, meticulous preparation, and proactive guidance."
  }
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timelineEl = timelineRef.current;
    if (!timelineEl) return;

    const cardEls = timelineEl.querySelectorAll<HTMLElement>(".timeline-item");
    const dotEls = timelineEl.querySelectorAll<HTMLElement>(".timeline-dot-marker");

    const revealElements = () => {
      cardEls.forEach((card) => card.classList.add("timeline-reveal-active"));
      dotEls.forEach((dot) => dot.classList.add("timeline-reveal-active"));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("timeline-reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px 0px 50px 0px" }
    );

    cardEls.forEach((card) => observer.observe(card));
    dotEls.forEach((dot) => observer.observe(dot));

    const handleScroll = () => {
      if (!progressLineRef.current || !timelineEl) return;
      const rect = timelineEl.getBoundingClientRect();
      const windowH = window.innerHeight;
      const top = rect.top;
      const height = rect.height;

      if (top < windowH && top + height > 0) {
        const scrolledDistance = windowH - top;
        const progress = Math.min(Math.max(scrolledDistance / (height + windowH * 0.2), 0), 1);
        progressLineRef.current.style.height = `${progress * 100}%`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Fallback: If for any reason IntersectionObserver doesn't fire after 500ms, reveal cards automatically
    const timer = setTimeout(() => {
      handleScroll();
      revealElements();
    }, 600);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="about" data-nav-theme="light" className="bg-[#FAF8F5] py-15 md:py-20 scroll-mt-20">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">

        {/* Decorative Section Header */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-10 select-none">
          <div className="flex items-center gap-2 grow">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-navy/10 to-slate-navy/25 grow" />
            <div className="h-[1px] w-[40px] md:w-[60px] border-t border-dashed border-muted-gold/60" />
            <span className="text-muted-gold text-[8px]">◆</span>
          </div>
          <h2 className="font-heading text-[13px] sm:text-lg md:text-xl text-slate-navy font-bold tracking-wider uppercase text-center shrink-0 leading-tight">
            About
          </h2>
          <div className="flex items-center gap-2 grow">
            <span className="text-muted-gold text-[8px]">◆</span>
            <div className="h-[1px] w-[40px] md:w-[60px] border-t border-dashed border-muted-gold/60" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-slate-navy/10 to-slate-navy/25 grow" />
          </div>
        </div>

        {/* ROW 1: Profile Card & About Card Side-by-Side */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch mb-10">

          {/* LEFT COLUMN: Advocate Profile Card */}
          <div className="lg:col-span-5 flex relative">
            <div className="w-full bg-white border border-soft-border/60 rounded-[20px] p-5 md:p-6 flex flex-col items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.015)] overflow-hidden relative">

              {/* Column Ornament Watermark */}
              <div className="absolute top-0 left-0 h-full w-14 opacity-[0.02] pointer-events-none select-none hidden md:block">
                <svg className="w-full h-full text-slate-navy" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 800" preserveAspectRatio="none">
                  <line x1="20" y1="50" x2="20" y2="750" />
                  <line x1="40" y1="50" x2="40" y2="750" />
                  <line x1="60" y1="50" x2="60" y2="750" />
                  <line x1="80" y1="50" x2="80" y2="750" />
                  <path d="M20 50 C20 40, 80 40, 80 50" />
                  <rect x="10" y="750" width="80" height="20" />
                </svg>
              </div>

              {/* Ellipse Oval Frame */}
              <div className="relative mb-5 mt-1">
                <div className="relative p-2 border border-muted-gold/30 rounded-full">
                  <div className="p-0.5 border border-muted-gold/40 rounded-full">
                    {/* Portrait Frame Crop */}
                    <div className="relative w-[180px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[250px] lg:h-[250px] max-w-full rounded-[140px] overflow-hidden bg-slate-navy shadow-inner">
                      <Image
                        src="/aboutimage.jpeg"
                        alt="Adv. Abdul Mulla"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 310px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-navy/40" />
                    </div>
                  </div>

                  {/* Diamond Markers */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-muted-gold rotate-45 border border-white" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-muted-gold rotate-45 border border-white" />
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-muted-gold rotate-45 border border-white" />
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-muted-gold rotate-45 border border-white" />
                </div>

                {/* Experience Badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-muted-gold/55 flex flex-col items-center justify-center shadow-md z-10 select-none">
                  <span className="font-heading text-xs font-bold text-slate-navy leading-none">20+</span>
                  <span className="font-body text-[6px] font-bold uppercase tracking-wider text-muted-gold/80 mt-0.5">Years</span>
                </div>
              </div>

              {/* Name Details */}
              <div className="flex flex-col items-center w-full">
                <h3
                  className="text-xl md:text-2xl text-slate-navy font-bold tracking-wide mb-2 text-center"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Abdul Mulla
                </h3>
                <p className="font-body text-[9px] font-semibold tracking-[0.2em] text-muted-gold mb-4 text-center uppercase">
                  Advocate
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 w-3/4 mb-3">
                  <div className="h-[1px] bg-muted-gold/30 grow" />
                  <div className="w-1 h-1 bg-muted-gold rotate-45" />
                  <div className="h-[1px] bg-muted-gold/30 grow" />
                </div>

                <p className="font-bold text-xs text-on-surface-variant/80 italic text-center mb-4 leading-relaxed">
                  Defending Rights. Preventing Complications
                </p>
              </div>



            </div>
          </div>

          {/* RIGHT COLUMN: About Card */}
          <div className="lg:col-span-7 flex">
            <div className="w-full bg-white border border-soft-border/60 rounded-[20px] p-6 md:p-8 flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.015)] relative">

              {/* Pointed Ribbon */}
              <div
                className="absolute top-0 right-8 w-7.5 h-10 bg-[#0B1520] flex flex-col items-center justify-center shadow-md rounded-b-sm z-10"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}
              >
                <svg className="w-3.5 h-3.5 text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M12 5l-8 2.5M12 5l8 2.5M4 7.5v4a3 3 0 006 0v-4M14 7.5v4a3 3 0 006 0v-4M9 20h6" />
                </svg>
              </div>

              <div className="flex flex-col justify-center grow py-2 px-3">
                <div className="h-[2px] w-12 bg-muted-gold mb-5" />
                <div className="space-y-4 text-justify font-body text-on-surface-variant font-medium text-xs md:text-base leading-4.5 md:leading-6">
                  <p>
                    Adv. Abdul Mulla’s professional work includes litigation, property and real estate matters, family disputes, wills and succession, conveyancing, documentation, and advisory support for individuals, startups, early stage companies and organisations.
                  </p>
                  <p>
                    His practice is centred on understanding each client’s objective, addressing the matter with clarity and responsibility and proactively identifying steps that may help prevent future legal complications.
                  </p>
                  <p>
                    With an emphasis on careful preparation and clear communication, every matter is approached by first understanding the client’s objective, addressing the immediate concern and considering steps that may help prevent future legal complications.
                  </p>
                  <p>
                    The practice also seeks to create and maintain trustworthy professional relationships founded on transparency, mutual respect, responsible guidance and informed decision-making.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 2: Areas of Practice (Below Profile Card & About Card) */}
        <div className="bg-white border border-soft-border/60 rounded-[20px] p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.015)]">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-xs md:text-xl text-slate-navy font-bold tracking-widest uppercase mb-1"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Areas of Practice
              </h2>
              <div className="h-[2px] w-12 bg-muted-gold" />
            </div>
          </div>

          {/* Cards Grid with Images */}
          <div className="grid text-center grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6">
            {PRACTICE_AREAS.map((item) => (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#FAF8F5] border border-soft-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-muted-gold/60 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Practice Area Thumbnail Image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-navy">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-navy/40 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Icon Badge */}
                  <div className="absolute top-3 right-3 p-1.5 bg-slate-navy/80 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 flex flex-col justify-between grow">
                  <div>
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-slate-navy leading-tight mb-1 group-hover:text-muted-gold transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Disclaimer Box (Without quotation marks) */}
          <div className="bg-[#FAF8F5] border border-soft-border/50 rounded-xl p-4 flex items-center justify-center">
            <p className="font-body text-[11px] md:text-xs text-on-surface-variant/90 leading-relaxed italic text-center">
              These areas are mentioned only as factual information about the nature of professional work undertaken and should not be understood as a claim of specialization, superiority, or assurance of any result.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
