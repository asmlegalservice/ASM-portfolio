"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCardActive, setIsCardActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Reset status to idle after 6 seconds
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send message"
      );
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      data-nav-theme="light"
      ref={sectionRef}
      className="relative bg-[#FAF8F5] scroll-mt-20 py-14 sm:py-18 md:py-24 overflow-hidden"
    >
      {/* Premium Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-muted-gold/20 to-transparent" />
        <div className="absolute top-20 -left-32 w-72 h-72 bg-muted-gold/[0.03] rounded-full blur-[100px]" />
        <div className="absolute bottom-20 -right-32 w-80 h-80 bg-slate-navy/[0.02] rounded-full blur-[120px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,43,60,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,43,60,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-10">
        <div
          className={`flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 select-none transition-[opacity,transform] duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <div className="flex items-center gap-2 grow">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-navy/10 to-slate-navy/25 grow" />
            <div className="h-[1px] w-[40px] md:w-[60px] border-t border-dashed border-muted-gold/60" />
            <span className="text-muted-gold text-[8px]">◆</span>
          </div>
          <h2 className="font-heading text-[13px] sm:text-lg md:text-xl text-slate-navy font-bold tracking-wider uppercase text-center shrink-0 leading-tight">
            Consultation
          </h2>
          <div className="flex items-center gap-2 grow">
            <span className="text-muted-gold text-[8px]">◆</span>
            <div className="h-[1px] w-[40px] md:w-[60px] border-t border-dashed border-muted-gold/60" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-slate-navy/10 to-slate-navy/25 grow" />
          </div>
        </div>

        {/* Motto Callout */}
        <div
          className={`max-w-2xl mx-auto text-center mb-10 sm:mb-14 px-2 sm:px-4 transition-[opacity,transform] duration-1000 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <p className="font-heading italic text-base sm:text-lg md:text-2xl text-muted-gold mb-2 sm:mb-3">
            “ Professional legal representation & clear advice ”
          </p>
          <p className="font-body text-[11px] sm:text-xs md:text-sm text-on-surface-variant/75 leading-relaxed max-w-lg mx-auto">
            Schedule an appointment, ask a query or request assistance. Every communication is handled with professional privilege, absolute confidentiality and standard-of-care precision.
          </p>
        </div>

        {/* Grid Layout: Two Columns on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

          {/* LEFT COLUMN: Interactive Sliding Card Container */}
          <div
            onClick={() => setIsCardActive(!isCardActive)}
            className={`lg:col-span-5 group relative min-h-[480px] h-full rounded-2xl sm:rounded-[20px] overflow-hidden cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-[opacity,transform] duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            {/* FRONT SIDE (Forest Green Theme) */}
            <div
              className={`w-full h-full min-h-[480px] p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#112A1D] via-[#0E2017] to-[#08130E] border border-muted-gold/25 shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between overflow-hidden transition-all duration-500 ${isCardActive ? "blur-sm scale-[0.98] opacity-10" : ""
                } group-hover:blur-sm group-hover:scale-[0.98] group-hover:opacity-10`}
            >
              {/* Background accent glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/[0.08] via-transparent to-transparent opacity-70" />

              {/* Watermark Logo */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.04] select-none pointer-events-none transition-transform duration-1000 group-hover:scale-105">
                <svg className="w-full h-full text-muted-gold" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path d="M12 3v17M12 5l-8 2.5M12 5l8 2.5M4 7.5v4a3 3 0 006 0v-4M14 7.5v4a3 3 0 006 0v-4M9 20h6" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header: Logo & Experience Badge */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  <Image
                    src="/legal services.png"
                    alt="ASM Legal Services Logo"
                    width={160}
                    height={45}
                    style={{ width: "auto" }}
                    className="h-9 sm:h-11 md:h-12 w-auto object-contain brightness-0 invert drop-shadow"
                    priority
                  />
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-muted-gold/30 bg-muted-gold/[0.08] flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105 select-none shrink-0">
                    <span className="font-heading text-base sm:text-lg font-bold text-muted-gold leading-none">20+</span>
                    <span className="font-body text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-muted-gold/80 mt-0.5">Years Exp</span>
                  </div>
                </div>

                <h3
                  className="text-2xl sm:text-3xl md:text-[34px] font-bold text-white tracking-wider mb-3 pt-2 leading-tight"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Adv. Abdul Mulla
                </h3>
              </div>

              {/* Bottom Instruction */}
              <div className="relative z-10 mt-auto flex items-center gap-1.5 text-[10px] sm:text-xs text-white/40 font-body font-bold uppercase tracking-wider">
                <span className="hidden sm:inline">Hover to view contact details</span>
                <span className="inline sm:hidden">Tap to view contact details</span>
                <svg className="w-3.5 h-3.5 text-muted-gold animate-pulse shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>

            {/* BACK SIDE (Dark Theme - Contact Details Frosted Blur Reveal) */}
            <div
              className={`absolute inset-0 w-full h-full p-6 sm:p-8 md:p-10 bg-[#0B1520]/95 backdrop-blur-md text-white border border-white/10 shadow-[0_8px_40px_rgba(11,21,32,0.12)] flex flex-col justify-between overflow-hidden transition-all duration-500 ${isCardActive
                ? "opacity-100 pointer-events-auto scale-100"
                : "opacity-0 pointer-events-none scale-95"
                } group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 z-20`}
            >
              {/* Background accent glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/[0.06] via-transparent to-transparent opacity-70" />

              {/* Watermark Logo */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.03] select-none pointer-events-none transition-transform duration-1000 group-hover:scale-105">
                <svg className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path d="M12 3v17M12 5l-8 2.5M12 5l8 2.5M4 7.5v4a3 3 0 006 0v-4M14 7.5v4a3 3 0 006 0v-4M9 20h6" />
                </svg>
              </div>

              {/* Top Header inside Left Card */}
              <div className="relative z-10">
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide mb-4 sm:mb-6 pt-10">
                  Adv. Abdul Mulla
                </h3>

                {/* Divider */}
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  <div className="w-8 h-[1px] bg-muted-gold" />
                  <div className="w-1.5 h-1.5 bg-muted-gold rotate-45" />
                  <div className="w-4 h-[1px] bg-white/20" />
                </div>

                {/* Details List */}
                <ul className="space-y-5 sm:space-y-6 text-sm text-white/80">
                  <li className="flex gap-3 sm:gap-4 items-start group/item">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-muted-gold transition-colors group-hover/item:bg-muted-gold/10 group-hover/item:border-muted-gold/30">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="grow">
                      <span className="font-body block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-0.5">Address</span>
                      <span className="font-body leading-relaxed text-[13px] sm:text-sm">
                        Unit No. 409, 4th Floor, Krystal Square, E Ward, Nagala Park, Near Khanvilkar Pump, <span className="whitespace-nowrap">Kolhapur - 416003</span>
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-3 sm:gap-4 items-center group/item">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-muted-gold transition-colors group-hover/item:bg-muted-gold/10 group-hover/item:border-muted-gold/30">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-body block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-0.5">Office Hours</span>
                      <span className="font-body leading-relaxed text-[12px] sm:text-sm text-white/80">
                        10:00 AM to 6:30 PM
                      </span>
                    </div>
                  </li>

                  <li className="flex gap-3 sm:gap-4 items-center group/item">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-muted-gold transition-colors group-hover/item:bg-muted-gold/10 group-hover/item:border-muted-gold/30">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-body block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-0.5">Email</span>
                      <a
                        href="mailto:adv.abduloffice@gmail.com"
                        onClick={(e) => e.stopPropagation()}
                        className="font-body text-[13px] sm:text-sm hover:text-muted-gold transition-colors break-all sm:break-normal"
                      >
                        adv.abduloffice@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex gap-4 items-center group/item">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-muted-gold transition-colors group-hover/item:bg-muted-gold/10 group-hover/item:border-muted-gold/30">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-body block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/40 mb-0.5">Phone</span>
                      <a
                        href="tel:+919370072022"
                        onClick={(e) => e.stopPropagation()}
                        className="font-body text-[13px] sm:text-sm hover:text-muted-gold transition-colors"
                      >
                        +91 93-7007-2022
                      </a>
                    </div>
                  </li>
                </ul>

                {/* Mobile Close Instruction */}
                <div className="flex sm:hidden items-center justify-center gap-1.5 mt-8 text-[9px] text-white/30 font-body font-bold uppercase tracking-wider select-none">
                  <span>Tap card to return</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Premium Form */}
          <div
            className={`lg:col-span-7 flex transition-[opacity,transform] duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="w-full bg-white border border-soft-border/60 rounded-2xl sm:rounded-[20px] p-5 sm:p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between relative overflow-hidden">
              {/* Gold card accent lines — hidden on mobile to avoid overflow artifacts */}
              <div className="hidden sm:block absolute top-0 left-8 w-16 h-[1px] bg-gradient-to-r from-muted-gold/50 to-transparent" />
              <div className="hidden sm:block absolute top-0 left-8 w-[1px] h-16 bg-gradient-to-b from-muted-gold/50 to-transparent" />
              <div className="hidden sm:block absolute bottom-0 right-8 w-16 h-[1px] bg-gradient-to-l from-muted-gold/50 to-transparent" />
              <div className="hidden sm:block absolute bottom-0 right-8 w-[1px] h-16 bg-gradient-to-t from-muted-gold/50 to-transparent" />

              <form
                onSubmit={handleSubmit}
                className="space-y-5 sm:space-y-6"
                id="contact-form"
              >
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="relative">
                    <label
                      htmlFor="contact-firstName"
                      className="block font-body text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-wider text-slate-navy/60 mb-1.5 sm:mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="contact-firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                      className="w-full font-body bg-[#FAF8F5]/50 border border-soft-border text-[13px] sm:text-sm text-slate-navy rounded-lg px-3.5 sm:px-4 py-3 sm:py-3.5 outline-none transition-colors duration-300 focus:border-muted-gold focus:bg-white focus:shadow-[0_0_15px_rgba(197,160,89,0.06)] hover:border-slate-navy/20"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="contact-lastName"
                      className="block font-body text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-wider text-slate-navy/60 mb-1.5 sm:mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="contact-lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                      className="w-full font-body bg-[#FAF8F5]/50 border border-soft-border text-[13px] sm:text-sm text-slate-navy rounded-lg px-3.5 sm:px-4 py-3 sm:py-3.5 outline-none transition-colors duration-300 focus:border-muted-gold focus:bg-white focus:shadow-[0_0_15px_rgba(197,160,89,0.06)] hover:border-slate-navy/20"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="relative">
                    <label
                      htmlFor="contact-email"
                      className="block font-body text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-wider text-slate-navy/60 mb-1.5 sm:mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-navy/35">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter email"
                        className="w-full font-body bg-[#FAF8F5]/50 border border-soft-border text-[13px] sm:text-sm text-slate-navy rounded-lg pl-10 sm:pl-11 pr-3.5 sm:pr-4 py-3 sm:py-3.5 outline-none transition-colors duration-300 focus:border-muted-gold focus:bg-white focus:shadow-[0_0_15px_rgba(197,160,89,0.06)] hover:border-slate-navy/20"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="contact-phone"
                      className="block font-body text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-wider text-slate-navy/60 mb-1.5 sm:mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-navy/35">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </span>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full font-body bg-[#FAF8F5]/50 border border-soft-border text-[13px] sm:text-sm text-slate-navy rounded-lg pl-10 sm:pl-11 pr-3.5 sm:pr-4 py-3 sm:py-3.5 outline-none transition-colors duration-300 focus:border-muted-gold focus:bg-white focus:shadow-[0_0_15px_rgba(197,160,89,0.06)] hover:border-slate-navy/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="contact-message"
                    className="block font-body text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-wider text-slate-navy/60 mb-1.5 sm:mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Briefly describe your legal query or requirement..."
                    className="w-full font-body bg-[#FAF8F5]/50 border border-soft-border text-[13px] sm:text-sm text-slate-navy rounded-lg px-3.5 sm:px-4 py-3 sm:py-3.5 outline-none transition-colors duration-300 focus:border-muted-gold focus:bg-white focus:shadow-[0_0_15px_rgba(197,160,89,0.06)] hover:border-slate-navy/20 resize-none"
                  />
                </div>

                <div>
                  <p className="font-body text-[11px] sm:text-xs text-left text-[#A36801]/40 border border-[#A36801]/10 p-3.5 sm:p-4 rounded-lg">
                    This form is intended only to understand the enquiry; submission does not create an advocate–client relationship, and any professional engagement begins only upon mutual confirmation
                  </p>
                </div>

                {/* Alerts */}
                {status === "success" && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 border border-emerald-200/60 transition-[opacity] duration-300">
                    <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-body text-[11px] sm:text-xs text-emerald-700 font-medium">
                      Message sent successfully! A confirmation email and auto-reply have been dispatched.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200/60 transition-[opacity] duration-300">
                    <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="font-body text-[11px] sm:text-xs text-red-600 font-medium">{errorMsg}</p>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    id="contact-submit"
                    className="group/btn relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#0B1520] hover:bg-[#132233] text-white font-body text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg transition-colors hover:scale-[1.02] transition-transform duration-300 hover:shadow-[0_8px_30px_rgba(11,21,32,0.15)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10 flex items-center gap-2.5">
                      {status === "sending" ? (
                        <>
                          <svg className="w-4 h-4 animate-spin text-muted-gold" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4 text-muted-gold transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
