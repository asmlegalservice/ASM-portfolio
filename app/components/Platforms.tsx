"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const PLATFORMS = [
  {
    title: "ASM Legal Services",
    subtitle: "Corporate & Litigation Consultancy",
    description: "A professional legal platform providing information, guidance and support across diverse areas of law.",
    cta: "Visit Website",
    image: "/legal services.png",
    link: "https://www.asmlegalservices.in/"
  },
  {
    title: "KNOW Divorce",
    subtitle: "Family & Matrimonial Support Initiative",
    description: "A dedicated platform for guidance in divorce and family law matters.",
    cta: "Visit Website",
    image: "/know divorce.png",
    link: "https://www.knowdivorce.in/"
  }
];

const BOOKS = [
  {
    title: "Life and Law",
    description: "Life and Law – Legal Guide for Everyone is a legal awareness book written for laymen. The book contains 101 articles that explain practical legal issues connected with day-to-day life in simple and understandable language. The purpose of this book is to help readers understand basic legal concepts, common legal situations, rights, responsibilities, documentation concerns, family and property-related issues, and other practical legal topics that may arise in everyday life.",
    cta: "Coming Soon",
    frontImage: "/LifeLaw_front.jpeg",
    backImage: "/LifeLaw_back.jpeg",
  },
  {
    title: "Magic Mindset",
    description: "Magic Mindset is a self-help and personal development book focused on personal growth, clarity of thought, discipline, decision-making, confidence, and practical life improvement. The book is written to help readers develop a positive and growth-oriented mindset. It encourages individuals to improve their thinking patterns, overcome limitations, build inner strength, and move forward in personal and professional life with better clarity and purpose.",
    cta: "Coming Soon",
    frontImage: "/MagicMindset_front.jpeg",
    backImage: "/MagicMindset_back.jpeg",
  },
];

export default function Platforms() {
  const [activeTab, setActiveTab] = useState<"advocate" | "author" | "blogger">("advocate");
  const [flippedBooks, setFlippedBooks] = useState<Record<string, boolean>>({});

  const toggleBookFlip = (title: string) => {
    setFlippedBooks(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#advocate" || hash === "#author" || hash === "#blogger") {
        const tab = hash.substring(1) as "advocate" | "author" | "blogger";
        setActiveTab(tab);
        setTimeout(() => {
          document.getElementById("platforms")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <section id="platforms" data-nav-theme="light" className="bg-white scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">

        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-12 select-none">
          <div className="flex items-center gap-2 grow">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-navy/10 to-slate-navy/25 grow" />
            <div className="h-[1px] w-[40px] md:w-[60px] border-t border-dashed border-muted-gold/60" />
            <span className="text-muted-gold text-[8px]">◆</span>
          </div>
          <h2 className="font-heading text-[13px] sm:text-lg md:text-xl text-slate-navy font-bold tracking-wider uppercase text-center shrink-0 leading-tight">
            Ideas and Initiatives
          </h2>
          <div className="flex items-center gap-2 grow">
            <span className="text-muted-gold text-[8px]">◆</span>
            <div className="h-[1px] w-[40px] md:w-[60px] border-t border-dashed border-muted-gold/60" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-slate-navy/10 to-slate-navy/25 grow" />
          </div>
        </div>

        {/* Motto Callout */}
        <div className="max-w-3xl mx-auto text-center mb-14 px-4">
          <p className="font-serif italic text-lg md:text-2xl text-muted-gold mb-3">
            “ An idea has the power to inform a mind and inspire a change ”
          </p>
        </div>

        {/* Tab Switcher Capsule */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-0.5 bg-[#FAF8F5] border border-soft-border/60 rounded-md shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            {(["advocate", "author", "blogger"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-[105px] sm:w-[155px] md:w-[210px] py-2 sm:py-3 rounded-md text-[11px] font-body font-bold uppercase tracking-widest transition-colors duration-300 text-center ${activeTab === tab
                  ? "bg-slate-navy text-white shadow-sm"
                  : "text-slate-navy/60 hover:text-slate-navy"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div>

          {/* ADVOCATE TAB */}
          {activeTab === "advocate" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 animate-fade-in">
              {PLATFORMS.map((p) => (
                <article
                  key={p.title}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:scale-105 flex flex-col justify-between"
                >
                  {/* Interactive Live Website Preview Frame */}
                  <div className="relative h-[240px] sm:h-[300px] md:h-[320px] w-full overflow-hidden bg-slate-100 border-b border-slate-200 isolate">
                    {/* Mobile View: Render native w-full h-full iframe for mobile responsive layout */}
                    <div className="sm:hidden w-full h-full">
                      <iframe
                        src={p.link}
                        title={`${p.title} live scrollable website preview`}
                        loading="lazy"
                        className="h-full w-full border-0"
                        style={{ overflow: "auto" }}
                      />
                    </div>
                    {/* Live preview on tablet/desktop */}
                    <div className="hidden sm:block w-[125%] h-[125%] origin-top-left scale-[0.8]">
                      <iframe
                        src={p.link}
                        title={`${p.title} live scrollable website preview`}
                        loading="lazy"
                        className="h-full w-full border-0"
                        style={{ overflow: "auto" }}
                      />
                    </div>
                  </div>

                  {/* Clickable Card content */}
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-7 flex flex-col justify-between grow cursor-pointer block hover:bg-slate-50/50 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-gold mb-1 block">
                        {p.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-slate-navy font-serif transition-colors">
                        {p.title}
                      </h3>

                      <p className="mt-3 font-body text-xs md:text-xs leading-relaxed text-on-surface-variant/80 text-justify">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-6 font-body text-xs font-bold text-slate-navy group-hover:text-muted-gold transition-colors inline-flex items-center gap-1.5 uppercase tracking-widest">
                      {p.cta}
                      <svg className="w-4 h-4 text-muted-gold group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}

          {/* AUTHOR TAB */}
          {activeTab === "author" && (
            <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
              {BOOKS.map((book) => (
                <div
                  key={book.title}
                  className="bg-white border border-soft-border/60 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] shadow-sm hover:shadow-lg hover:border-muted-gold/40 hover:scale-105 transition duration-300"
                >
                  {/* Book Cover 3D Flip Card */}
                  <div
                    onClick={() => toggleBookFlip(book.title)}
                    className="w-48 h-72 sm:w-52 sm:h-76 relative group shrink-0 perspective-1000 cursor-pointer animate-none"
                  >
                    <div
                      className={`w-full h-full relative preserve-3d book-card-inner transition-transform duration-700 ${flippedBooks[book.title] ? "[transform:rotateY(-180deg)]" : ""
                        } group-hover:[transform:rotateY(-180deg)]`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front Cover */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-r-md overflow-hidden shadow-md border border-soft-border/30 backface-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        <Image
                          src={book.frontImage}
                          alt={`${book.title} Front Cover`}
                          fill
                          sizes="(max-width: 640px) 192px, 208px"
                          className="object-cover"
                        />
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-black/15" />
                        <div className="absolute left-[4px] top-0 bottom-0 w-[1.5px] bg-white/10" />
                      </div>

                      {/* Back Cover */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-l-md overflow-hidden shadow-lg border border-soft-border/30 backface-hidden rotate-y-180"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)"
                        }}
                      >
                        <Image
                          src={book.backImage}
                          alt={`${book.title} Back Cover`}
                          fill
                          sizes="(max-width: 640px) 192px, 208px"
                          className="object-cover"
                        />
                        <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-black/15" />
                        <div className="absolute right-[4px] top-0 bottom-0 w-[1.5px] bg-white/10" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grow flex flex-col justify-between h-full">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-muted-gold mb-1 block">
                        Authored Work
                      </span>
                      <h3 className="text-lg font-bold text-slate-navy font-serif mb-3">{book.title}</h3>
                      <p className="font-body text-xs md:text-xs text-justify px-2 text-on-surface-variant leading-relaxed mb-6">
                        {book.description}
                      </p>
                    </div>
                    <Link
                      href="#"
                      className="font-body text-xs font-bold text-slate-navy hover:text-muted-gold transition-colors inline-flex items-center gap-1.5 uppercase tracking-wider group"
                    >
                      {book.cta}
                      <svg className="w-4 h-4 text-muted-gold group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* BLOGGER TAB */}
          {activeTab === "blogger" && (
            <div className="flex justify-center animate-fade-in">
              <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between w-full max-w-[650px]">
                {/* Interactive Live Website preview */}
                <div className="relative h-[260px] sm:h-[340px] md:h-[360px] w-full overflow-hidden bg-slate-100 border-b border-slate-200 isolate">
                  {/* Mobile View: Render native w-full h-full iframe for mobile responsive layout */}
                  <div className="sm:hidden w-full h-full">
                    <iframe
                      src="https://www.lifeandlaw.in/"
                      title="Life & Law Blog live scrollable website preview"
                      loading="lazy"
                      className="h-full w-full border-0"
                      style={{ overflow: "auto" }}
                    />
                  </div>
                  {/* Live preview on tablet/desktop */}
                  <div className="hidden sm:block w-[125%] h-[125%] origin-top-left scale-[0.8]">
                    <iframe
                      src="https://www.lifeandlaw.in/"
                      title="Life & Law Blog live scrollable website preview"
                      loading="lazy"
                      className="h-full w-full border-0"
                      style={{ overflow: "auto" }}
                    />
                  </div>
                </div>

                {/* Clickable Card content */}
                <a
                  href="https://www.lifeandlaw.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-7 md:p-8 flex flex-col justify-between grow cursor-pointer block hover:bg-slate-50/50 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-gold mb-1 block">
                      Legal Insights & Articles
                    </span>
                    <h3 className="text-2xl font-bold text-slate-navy font-serif transition-colors">
                      Life &amp; Law Blog
                    </h3>

                    <p className="mt-3 font-body text-xs md:text-sm leading-relaxed text-on-surface-variant/80 text-justify">
                      Legal blog simplifying Indian laws. Helping people understand their rights, duties, and legal options.
                    </p>
                  </div>

                  <div className="mt-6 font-body inline-flex w-full items-center justify-left text-xs md:text-sm font-semibold text-slate-navy uppercase tracking-wide transition group-hover:text-muted-gold">
                    Visit Blog Platform
                    <ArrowRight className="w-4 h-4 ml-1 text-muted-gold translate-y-0.5 group-hover:translate-x-2 transition-transform duration-200" />
                  </div>
                </a>
              </article>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
