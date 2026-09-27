"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PrinterIcon,
  WrenchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  FileTextIcon,
  BoxIcon,
} from "@/components/ui/Icons";
import { CORE_SERVICES, COMPANY_INFO } from "@/data/tethlogsData";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  const serviceIcons: Record<string, React.ReactNode> = {
    "printer-maintenance": <WrenchIcon size={16} className="text-[#0052CC]" />,
    "printer-repairs": <SettingsIcon size={16} className="text-[#0052CC]" />,
    "installation-setup": <PrinterIcon size={16} className="text-[#0052CC]" />,
    "technical-support": <ShieldCheckIcon size={16} className="text-[#0052CC]" />,
    "document-solutions": <FileTextIcon size={16} className="text-[#0052CC]" />,
    "printer-supplies": <BoxIcon size={16} className="text-[#0052CC]" />,
  };

  const productCategories = [
    { title: "Multifunction Printers", desc: "A3 & A4 Color/Mono enterprise devices", href: "/products?cat=mfp" },
    { title: "Office Printers", desc: "Compact, high-durability workgroup printers", href: "/products?cat=office" },
    { title: "Production Printing", desc: "High-volume commercial graphic systems", href: "/products?cat=production" },
    { title: "Copiers & Dedicated Units", desc: "Heavy continuous duty ledger copy engines", href: "/products?cat=copier" },
    { title: "Enterprise Scanners", desc: "High-speed optical document archiving", href: "/products?cat=scanner" },
    { title: "Supplies & Consumables", desc: "100% Genuine Ricoh toners, drums & spares", href: "/products?cat=supplies" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80"
          : "bg-white border-b border-slate-100"
        }`}
    >
      {/* Top Notification / Specialist Bar */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <span className="text-[#E51937] font-bold">ט</span> TETHLOGS
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Exclusive Ricoh Technical Printing &amp; Document Solutions</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Emergency SLA Dispatch: Mon-Fri 8AM - 6PM</span>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/[^+\d]/g, "")}`}
              className="text-white hover:text-blue-300 font-medium transition-colors"
            >
              {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative h-12 w-32 sm:w-36 flex items-center">
              <Image
                src="/images/logo1.jpg"
                alt="TETHLOGS Logo"
                width={160}
                height={56}
                className="object-contain max-h-12 w-auto"
                priority
              />
            </div>
            <div className="hidden lg:flex flex-col border-l border-slate-200 pl-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Authorized Engineering
              </span>
              <span className="text-xs font-semibold text-[#0052CC] flex items-center gap-1">
                Ricoh Specialist <span className="w-1.5 h-1.5 rounded-full bg-[#E51937]" />
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/"
                  ? "text-[#0052CC] font-bold"
                  : "text-slate-700 hover:text-[#0052CC] hover:bg-slate-50"
                }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith("/services")
                    ? "text-[#0052CC] font-bold"
                    : "text-slate-700 hover:text-[#0052CC] hover:bg-slate-50"
                  }`}
              >
                Services
                <ChevronDownIcon
                  size={14}
                  className={`transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[#0052CC]" : "text-slate-400"
                    }`}
                />
              </Link>

              {/* Mega Dropdown */}
              {servicesOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-2 animate-fade-in z-50">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span>Technical Services</span>
                    <span className="text-[#0052CC] font-bold">ט Ricoh</span>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {CORE_SERVICES.map((s) => (
                      <Link
                        key={s.id}
                        href={`/services#${s.id}`}
                        className="flex items-start gap-2.5 px-3 py-2 rounded-lg hover:bg-blue-50/60 transition-colors group"
                      >
                        <div className="mt-0.5 p-1 rounded bg-blue-50 group-hover:bg-blue-100 transition-colors">
                          {serviceIcons[s.id]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800 group-hover:text-[#0052CC] transition-colors">
                            {s.title}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{s.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1.5 bg-slate-50 rounded-b-lg">
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-[#0052CC] hover:underline flex items-center justify-between"
                    >
                      <span>Explore All Services</span>
                      <ChevronRightIcon size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Ricoh Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <Link
                href="/products"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith("/products")
                    ? "text-[#0052CC] font-bold"
                    : "text-slate-700 hover:text-[#0052CC] hover:bg-slate-50"
                  }`}
              >
                Ricoh Products
                <ChevronDownIcon
                  size={14}
                  className={`transition-transform duration-200 ${productsOpen ? "rotate-180 text-[#0052CC]" : "text-slate-400"
                    }`}
                />
              </Link>

              {/* Products Dropdown Menu */}
              {productsOpen && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-xl shadow-xl border border-slate-200 p-2 animate-fade-in z-50">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                    <span>Ricoh Equipment Fleet</span>
                    <span className="text-[#0052CC] font-bold">100% Genuine</span>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {productCategories.map((p, idx) => (
                      <Link
                        key={idx}
                        href={p.href}
                        className="block px-3 py-2 rounded-lg hover:bg-blue-50/60 transition-colors group"
                      >
                        <div className="text-sm font-medium text-slate-800 group-hover:text-[#0052CC] transition-colors">
                          {p.title}
                        </div>
                        <p className="text-xs text-slate-500">{p.desc}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1.5 bg-slate-50 rounded-b-lg">
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-[#0052CC] hover:underline flex items-center justify-between"
                    >
                      <span>View Full Catalogue</span>
                      <ChevronRightIcon size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/industries"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/industries"
                  ? "text-[#0052CC] font-bold"
                  : "text-slate-700 hover:text-[#0052CC] hover:bg-slate-50"
                }`}
            >
              Industries
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/about"
                  ? "text-[#0052CC] font-bold"
                  : "text-slate-700 hover:text-[#0052CC] hover:bg-slate-50"
                }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/contact"
                  ? "text-[#0052CC] font-bold"
                  : "text-slate-700 hover:text-[#0052CC] hover:bg-slate-50"
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/quote"
              className="text-xs font-semibold text-[#0052CC] border border-[#0052CC]/30 hover:border-[#0052CC] hover:bg-blue-50 px-3.5 py-2.5 rounded-lg transition-all"
            >
              Get a Quote
            </Link>

            <Link
              href="/request-service"
              className="bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 group"
            >
              <WrenchIcon size={14} className="text-white group-hover:rotate-45 transition-transform" />
              <span>Request a Service</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/request-service"
              className="bg-[#0052CC] text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              Request Service
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-fade-in space-y-3 shadow-lg">
          <div className="space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Home
            </Link>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>Services</span>
                <ChevronDownIcon
                  size={16}
                  className={`transition-transform ${servicesOpen ? "rotate-180 text-[#0052CC]" : ""}`}
                />
              </button>
              {servicesOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1">
                  {CORE_SERVICES.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services#${s.id}`}
                      className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#0052CC]"
                    >
                      {s.title}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="block px-3 py-1.5 text-xs font-bold text-[#0052CC]"
                  >
                    View All Services &rarr;
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                <span>Ricoh Products</span>
                <ChevronDownIcon
                  size={16}
                  className={`transition-transform ${productsOpen ? "rotate-180 text-[#0052CC]" : ""}`}
                />
              </button>
              {productsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg mt-1">
                  {productCategories.map((p, idx) => (
                    <Link
                      key={idx}
                      href={p.href}
                      className="block px-3 py-1.5 text-xs text-slate-600 hover:text-[#0052CC]"
                    >
                      {p.title}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="block px-3 py-1.5 text-xs font-bold text-[#0052CC]"
                  >
                    View All Products &rarr;
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/industries"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Industries We Serve
            </Link>

            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              About Tethlogs
            </Link>

            <Link
              href="/contact"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/request-service"
              className="w-full text-center bg-[#0052CC] text-white font-bold py-2.5 rounded-lg shadow-sm"
            >
              Request a Service
            </Link>
            <Link
              href="/quote"
              className="w-full text-center border border-slate-300 text-[#0052CC] font-semibold py-2 rounded-lg hover:bg-slate-50"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
