import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/ui/Icons";
import { COMPANY_INFO, CORE_SERVICES } from "@/data/tethlogsData";

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Company & Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block bg-white p-2.5 rounded-lg shadow-sm">
              <Image
                src="/images/logo1.jpg"
                alt="TETHLOGS Services Limited"
                width={150}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              TETHLOGS Services Limited is a premier technical engineering provider specializing exclusively in Ricoh multifunction printers, production copiers, preventive maintenance, and digital document workflows.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 w-fit">
              <span className="text-[#E51937] font-bold text-sm">ט</span>
              <span>Rooted in technical integrity and reliable uptime.</span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
              >
                <WhatsAppIcon size={16} />
                <span>Instant WhatsApp Dispatch</span>
              </a>
            </div>
          </div>

          {/* Column 2: Technical Services */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
              Core Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              {CORE_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="hover:text-white transition-colors flex items-center gap-1 group text-slate-400"
                  >
                    <ArrowRightIcon size={12} className="opacity-0 group-hover:opacity-100 text-[#0052CC] transition-opacity" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ricoh Equipment Fleet */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
              Ricoh Equipment
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/products?cat=mfp" className="hover:text-white transition-colors">
                  Multifunction Printers (A3 & A4)
                </Link>
              </li>
              <li>
                <Link href="/products?cat=office" className="hover:text-white transition-colors">
                  Office Workgroup Printers
                </Link>
              </li>
              <li>
                <Link href="/products?cat=production" className="hover:text-white transition-colors">
                  Commercial Production Systems
                </Link>
              </li>
              <li>
                <Link href="/products?cat=copier" className="hover:text-white transition-colors">
                  High-Speed Heavy Copiers
                </Link>
              </li>
              <li>
                <Link href="/products?cat=scanner" className="hover:text-white transition-colors">
                  Enterprise Document Scanners
                </Link>
              </li>
              <li>
                <Link href="/products?cat=supplies" className="hover:text-white transition-colors">
                  100% Genuine Ricoh Toners & Spares
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & SLA */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
              Emergency & Support
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <PhoneIcon size={16} className="text-[#0052CC] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">WhatsApp Lines</div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white block">
                    {COMPANY_INFO.phone}
                  </a>
                  <a href={`tel:${COMPANY_INFO.phone2}`} className="hover:text-white block">
                    {COMPANY_INFO.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MailIcon size={16} className="text-[#0052CC] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Support Desk</div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon size={16} className="text-[#0052CC] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Operational SLA</div>
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon size={16} className="text-[#0052CC] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Office</div>
                  <span>{COMPANY_INFO.officeAddress}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} TETHLOGS Services Limited. All rights reserved.</span>
            <span>•</span>
            <span className="text-slate-400">Dedicated Ricoh Specialists</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/request-service" className="text-slate-400 hover:text-white transition-colors">
              Request a Service
            </Link>
            <Link href="/quote" className="text-slate-400 hover:text-white transition-colors">
              Get a Quote
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
              Support Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
