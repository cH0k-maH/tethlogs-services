export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  diagnosticTip: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: "mfp" | "office" | "production" | "copier" | "scanner" | "supplies";
  categoryLabel: string;
  speed: string;
  paperSize: string;
  highlights: string[];
  idealFor: string;
  image: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  commonChallenges: string[];
  solution: string;
}

export const COMPANY_INFO = {
  name: "Tethlogs Services Limited",
  shortName: "TETHLOGS",
  tagline: "Professional Printing & Document Solutions",
  ricohSpecialist: "Exclusive Ricoh Technical Specialists",

  // Primary contact line (first WhatsApp number)
  phone: "+234 806 117 7447",
  phone2: "0708 788 0293",

  // WhatsApp — primary line
  whatsappNumber: "2348061177447",
  whatsappUrl:
    "https://wa.me/2348061177447?text=Hello%20Tethlogs,%20I%20have%20an%20inquiry%20regarding%20Ricoh%20printers.",

  // WhatsApp — secondary line
  whatsappNumber2: "2347087880293",
  whatsappUrl2:
    "https://wa.me/2347087880293?text=Hello%20Tethlogs,%20I%20have%20an%20inquiry%20regarding%20Ricoh%20printers.",

  // Email
  email: "tethlogsservices@gmail.com",
  salesEmail: "tethlogsservices@gmail.com",

  // Office address — Port Harcourt
  officeAddress:
    "No 8 Goshen Street, Dynamic Estate, Army Range, Eneka/Igwuruta Road, Port Harcourt, Rivers State, Nigeria.",

  workingHours: "Monday – Friday: 8:00 AM – 6:00 PM | Emergency SLA: 24/7",
  slaGuarantee: "Same-Day Technical Response Across Corporate Hubs",
  tethMeaning:
    "In Hebrew, the letter Teth (ט) represents goodness, foundational craftsmanship, and integrity. We bring that exact standard to every printer we service.",
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "printer-maintenance",
    slug: "printer-maintenance",
    title: "Printer Maintenance",
    tagline: "Preventive care that stops downtime before it starts.",
    description: "Systematic multi-point inspection, precision optical cleaning, lubrication, roller resurfacing, and scheduled component replacement for Ricoh commercial printers.",
    iconName: "Wrench",
    features: [
      "Preventive maintenance schedules (monthly & quarterly)",
      "Deep cleaning of laser optics, sensors, and transfer belts",
      "Moving parts lubrication and gear wear inspection",
      "Fuser unit & drum condition diagnostics",
      "Firmware updates and print engine calibration",
    ],
    diagnosticTip: "Routine maintenance reduces hardware failure rates by up to 74% and preserves color fidelity.",
  },
  {
    id: "printer-repairs",
    slug: "printer-repairs",
    title: "Printer Repairs",
    tagline: "Fast hardware diagnostics and certified Ricoh component replacement.",
    description: "Emergency troubleshooting and component-level repairs for paper jams, SC error codes, faded prints, motherboard faults, and fuser unit failures.",
    iconName: "Settings",
    features: [
      "Rapid SC-error code diagnosis & board reset",
      "Fuser assembly, transfer roller, & paper feed repairs",
      "Laser scanner unit and optical mirror realignment",
      "Duplex unit jams & sensor replacement",
      "Original Ricoh OEM replacement parts with warranty",
    ],
    diagnosticTip: "Seeing an 'SC' error on your Ricoh screen? Note down the 3-digit code before rebooting to speed up diagnosis.",
  },
  {
    id: "installation-setup",
    slug: "installation-setup",
    title: "Installation & Setup",
    tagline: "Seamless network deployment and fleet configuration.",
    description: "Complete physical installation, static IP assignment, secure network print queues, scan-to-email/folder routing, and departmental accounting codes.",
    iconName: "Printer",
    features: [
      "New Ricoh device unpacking, leveling, and stabilization",
      "Gigabit LAN, Wi-Fi, and server print queue configuration",
      "Scan-to-Email, SMB / FTP scan folder configuration",
      "Department ID codes & print quota setups",
      "Universal print driver deployment across Mac and Windows",
    ],
    diagnosticTip: "Correct network queue setup prevents printing spool bottlenecks during high-volume office hours.",
  },
  {
    id: "technical-support",
    slug: "technical-support",
    title: "Technical Support",
    tagline: "Expert troubleshooting on-site and remote.",
    description: "Dedicated helpdesk providing diagnostics, driver updates, print quality troubleshooting, and rapid-response on-site engineering dispatch.",
    iconName: "ShieldCheck",
    features: [
      "Direct engineer telephone & WhatsApp technical hotline",
      "Remote desktop driver troubleshooting & queue clearing",
      "Color matching and calibration support",
      "Document security and PIN release setup",
      "Priority SLA contracts for business-critical fleets",
    ],
    diagnosticTip: "Stuck print spoolers are frequently driver version mismatches resolved in under 10 minutes remotely.",
  },
  {
    id: "document-solutions",
    slug: "document-solutions",
    title: "Document Solutions",
    tagline: "End-to-end office document workflows and cost governance.",
    description: "Advanced workflow solutions including automated digital archiving, OCR scanning, follow-me printing, and comprehensive print audit tools.",
    iconName: "FileText",
    features: [
      "Follow-Me secure badge release printing",
      "Automated OCR indexing & digital document archiving",
      "Departmental print budgeting and waste-reduction audits",
      "Secure mobile printing for iOS, Android, and laptops",
      "Cloud document connector for SharePoint, Google Drive & OneDrive",
    ],
    diagnosticTip: "Implementing rule-based duplex and mono defaults saves enterprise departments up to 30% annually.",
  },
  {
    id: "printer-supplies",
    slug: "printer-supplies",
    title: "Printer Supplies & Parts",
    tagline: "100% Genuine Ricoh toners, drums, and maintenance kits.",
    description: "Factory-certified Ricoh consumables formulated specifically to protect the developer unit and deliver rich, smear-free blacks and vivid color tones.",
    iconName: "Box",
    features: [
      "Original Ricoh black & CMYK high-yield toner cartridges",
      "Photoconductor drum units and developer powder",
      "Fuser belts, pressure rollers, and thermistors",
      "Paper feed pickup rollers and separation pads",
      "Waste toner collection bottles and staple cartridges",
    ],
    diagnosticTip: "Counterfeit toners cause background toner scatter, premature drum scoring, and void printer warranties.",
  },
];

export const RICOH_PRODUCTS: ProductItem[] = [
  {
    id: "ricoh-im-c3000",
    name: "Ricoh IM C3000 / C3500 Color MFP",
    category: "mfp",
    categoryLabel: "Multifunction Printers",
    speed: "30 - 35 ppm (Color & B/W)",
    paperSize: "Up to A3 / 12\" x 18\"",
    highlights: ["10.1\" Smart Operation Panel", "Single-Pass Document Feeder", "Always Current Technology (ACT)", "Cloud Workflow Ready"],
    idealFor: "Medium to large corporate teams requiring versatile color printing, scanning, and copying.",
    image: "/images/printer.jpg",
  },
  {
    id: "ricoh-im-c6000",
    name: "Ricoh IM C6000 High-Speed Color MFP",
    category: "mfp",
    categoryLabel: "Multifunction Printers",
    speed: "60 ppm (Color & B/W)",
    paperSize: "A3 / SRA3 / Custom Banner",
    highlights: ["High-Volume 4,700-sheet capacity", "240 ipm Duplex Scanning", "Advanced Booklet Finisher", "Internal Multi-Folding Unit"],
    idealFor: "High-demand departmental print hubs, legal firms, and corporate headquarters.",
    image: "/images/printer.jpg",
  },
  {
    id: "ricoh-mp-3055",
    name: "Ricoh MP 3055 Monochrome Workhorse",
    category: "office",
    categoryLabel: "Office Printers",
    speed: "30 ppm (Black & White)",
    paperSize: "Up to A3",
    highlights: ["Ultra-low cost per page", "1,200 x 1,200 dpi resolution", "Quiet, durable mechanical design", "Customizable shortcut icons"],
    idealFor: "Offices needing high-reliability, low-cost monochrome document and report output.",
    image: "/images/printer.jpg",
  },
  {
    id: "ricoh-im-430fb",
    name: "Ricoh IM 430Fb Desktop A4 MFP",
    category: "office",
    categoryLabel: "Office Printers",
    speed: "43 ppm (A4)",
    paperSize: "A4 / Legal",
    highlights: ["Compact footprint", "Full Smart Operation Panel", "Standard Fax, Copy, Print, Scan", "Fast First-Print Speed"],
    idealFor: "Branch offices, executive desks, and SME customer service reception counters.",
    image: "/images/printer.jpg",
  },
  {
    id: "ricoh-pro-c5300s",
    name: "Ricoh Pro C5300s Production Printer",
    category: "production",
    categoryLabel: "Production Printing",
    speed: "65 - 80 ppm",
    paperSize: "Up to 330 x 487 mm (Heavy stocks up to 360gsm)",
    highlights: ["VCSEL 2400 x 4800 dpi laser", "Vacuum-feed paper drawers", "Inline professional trimming & binding", "Color calibration spectrophotometer"],
    idealFor: "Commercial printing houses, university print shops, and high-volume marketing departments.",
    image: "/images/printer.jpg",
  },
  {
    id: "ricoh-sp-8400dn",
    name: "Ricoh Aficio SP 8400DN Heavy-Duty Ledger",
    category: "copier",
    categoryLabel: "Copiers & Dedicated Printers",
    speed: "60 ppm (A4) / 32 ppm (A3)",
    paperSize: "A3, Ledger, Legal",
    highlights: ["Standard Gigabit Ethernet", "Robust paper handling up to 4,400 sheets", "Near-instant warm-up", "Low TEC energy rating"],
    idealFor: "Warehouse logistics, CAD drawing printing, and heavy continuous run cycles.",
    image: "/images/printer.jpg",
  },
  {
    id: "ricoh-fi-8170",
    name: "Ricoh fi-8170 Enterprise Document Scanner",
    category: "scanner",
    categoryLabel: "Scanners",
    speed: "70 ppm / 140 ipm duplex",
    paperSize: "A4, ID cards, Passports, Envelopes",
    highlights: ["Ultrasonic multi-feed detection", "Active Separation Roller", "Clear Image Capture (PFU tech)", "Direct USB 3.2 & Ethernet"],
    idealFor: "Banking archives, medical records scanning, and legal discovery rooms.",
    image: "/images/printer.jpg",
  },
  {
    id: "ricoh-supplies-kit",
    name: "Genuine Ricoh Toners & Maintenance Kits",
    category: "supplies",
    categoryLabel: "Accessories & Consumables",
    speed: "Yields from 15,000 to 45,000 pages",
    paperSize: "All Ricoh Series Models",
    highlights: ["Micro-refined polymerized toner", "Preserves organic photoconductor drum", "Batch certified authentic Ricoh", "Warranty protection"],
    idealFor: "All organizations operating Ricoh color or monochrome equipment fleets.",
    image: "/images/printer.jpg",
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "corporate",
    title: "Corporate Offices",
    icon: "Building",
    description: "Reliable centralized and departmental printing with user authentication, secure PIN release, and cost tracking across business units.",
    commonChallenges: ["High paper wastage", "Unmonitored color usage", "Print bottlenecks during peak hours"],
    solution: "Fleet deployment of Ricoh IM C3500 series with Follow-Me badge printing and departmental quota rules.",
  },
  {
    id: "education",
    title: "Education & Universities",
    icon: "GraduationCap",
    description: "Heavy-duty student assignment printing, high-speed exam paper duplication, and resilient library scanning hubs.",
    commonChallenges: ["Paper jams during exam printing", "High volume abuse", "Inconsistent paper stocks"],
    solution: "Durable high-capacity monochrome units and production presses with scheduled monthly preventive checkups.",
  },
  {
    id: "government",
    title: "Government & Public Sector",
    icon: "Landmark",
    description: "Strict compliance, confidential document safeguarding, and high-volume legislative document archiving.",
    commonChallenges: ["Data security risks", "Hard drive leaks on discarded machines", "Slow manual archiving"],
    solution: "Ricoh devices with DataOverwriteSecurity System (DOSS) encryption and automated optical archiving scanners.",
  },
  {
    id: "healthcare",
    title: "Healthcare & Clinics",
    icon: "Activity",
    description: "Reliable patient records printing, pharmacy label output, diagnostic report copies, and high-uptime nursing station printers.",
    commonChallenges: ["Zero tolerance for printer failure", "Confidential health records handling", "Sterile environments"],
    solution: "Compact desktop Ricoh A4 units paired with same-day emergency SLA technician dispatch.",
  },
  {
    id: "churches",
    title: "Churches & Faith Organizations",
    icon: "Church",
    description: "Vibrant weekly service bulletins, sermon outlines, full-color event programs, and educational booklets on demand.",
    commonChallenges: ["Sudden Friday/Saturday print deadlines", "Budget constraints on color ink", "Volunteer user confusion"],
    solution: "Cost-efficient Ricoh color MFPs with intuitive one-touch copying presets and proactive toner replenishment.",
  },
  {
    id: "sme",
    title: "SMEs & Growing Businesses",
    icon: "Briefcase",
    description: "Flexible, cost-effective all-in-one printer, scanner, and copier solutions that grow alongside business operations.",
    commonChallenges: ["High initial capital outlay", "Lack of internal IT printer know-how", "Expensive retail toner cartridges"],
    solution: "Turnkey equipment supply, maintenance SLA packages, and genuine consumable replenishment contracts.",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Exclusive Ricoh Specialization",
    description: "We don't juggle 20 different printer brands. We specialize strictly in Ricoh engineering, ensuring deep diagnostic accuracy and factory-spec repairs.",
    badge: "Certified Focus",
  },
  {
    title: "Rapid Technical Dispatch",
    description: "Printer breakdowns freeze business workflows. Our on-site technicians respond rapidly with the right diagnostic tools and genuine spares.",
    badge: "Fast Response",
  },
  {
    title: "100% Genuine Ricoh Parts & Consumables",
    description: "We only install authentic Ricoh OEM toners, fusers, drums, and rollers to prevent print quality degradation and equipment damage.",
    badge: "Zero Counterfeits",
  },
  {
    title: "Measurable Business Value",
    description: "From routine preventive maintenance to automated document workflows, we help organizations reduce printing costs and eliminate downtime.",
    badge: "Cost Efficient",
  },
];
