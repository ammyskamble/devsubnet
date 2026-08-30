export type SupportedLanguage = 'en' | 'de' | 'es' | 'ja' | 'nl';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
  prefix: string;
}

export const languages: Record<SupportedLanguage, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    locale: 'en_US',
    prefix: ''
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    locale: 'de_DE',
    prefix: '/de'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    locale: 'es_ES',
    prefix: '/es'
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    locale: 'ja_JP',
    prefix: '/ja'
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    locale: 'nl_NL',
    prefix: '/nl'
  }
};

export interface HreflangAlternate {
  lang: string;
  href: string;
}

/**
 * Generates regional and global reciprocal hreflang links covering all priority countries:
 * US, India, UK, Canada, Australia, Germany, Philippines, Singapore, Netherlands, South Africa, Spain, Japan
 */

// Routes that have localized versions available. Pages outside this set only
// have an English version, so no /lang/ hreflang alternates are emitted for them.
const LOCALIZED_ROUTES = new Set([
  '/',
  '/faq',
  '/cidr-cheat-sheet',
  '/visual-subnet-splitter',
  '/kubernetes-subnet-planner',
  '/ipv6-subnet-calculator'
]);

export function getHrefLangAlternates(pathname: string, siteUrl: string = 'https://devsubnet.com'): HreflangAlternate[] {
  let cleanPath = pathname;
  for (const lang of ['de', 'es', 'ja', 'nl']) {
    if (cleanPath === `/${lang}` || cleanPath === `/${lang}/`) {
      cleanPath = '/';
      break;
    }
    if (cleanPath.startsWith(`/${lang}/`)) {
      cleanPath = cleanPath.slice(lang.length + 1);
      break;
    }
  }

  const normalizedPath = cleanPath === '/' ? '/' : (cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`);
  const pathWithoutRootSlash = normalizedPath === '/' ? '' : normalizedPath;
  const route = pathWithoutRootSlash === '' ? '/' : pathWithoutRootSlash.replace(/\/$/, '');
  const hasLocalizedVersion = LOCALIZED_ROUTES.has(route);
  const enUrl = `${siteUrl}${pathWithoutRootSlash || '/'}`;
  const deUrl = `${siteUrl}/de${pathWithoutRootSlash}`;
  const esUrl = `${siteUrl}/es${pathWithoutRootSlash}`;
  const jaUrl = `${siteUrl}/ja${pathWithoutRootSlash}`;
  const nlUrl = `${siteUrl}/nl${pathWithoutRootSlash}`;

  const alternates: HreflangAlternate[] = [
    // Global generic languages
    { lang: 'en', href: enUrl },
  ];

  if (hasLocalizedVersion) {
    alternates.push(
      { lang: 'de', href: deUrl },
      { lang: 'es', href: esUrl },
      { lang: 'ja', href: jaUrl },
      { lang: 'nl', href: nlUrl },
    );
  }

  alternates.push(
    // Priority Country-Specific English Regions
    { lang: 'en-US', href: enUrl }, // United States
    { lang: 'en-IN', href: enUrl }, // India
    { lang: 'en-GB', href: enUrl }, // United Kingdom
    { lang: 'en-CA', href: enUrl }, // Canada
    { lang: 'en-AU', href: enUrl }, // Australia
    { lang: 'en-SG', href: enUrl }, // Singapore
    { lang: 'en-PH', href: enUrl }, // Philippines
    { lang: 'en-ZA', href: enUrl }, // South Africa
  );

  if (hasLocalizedVersion) {
    alternates.push(
      // Priority Regional European & Asian Locales
      { lang: 'de-DE', href: deUrl }, // Germany
      { lang: 'nl-NL', href: nlUrl }, // Netherlands (AMS-IX)
      { lang: 'es-ES', href: esUrl }, // Spain
      { lang: 'ja-JP', href: jaUrl }, // Japan
    );
  }

  // Fallback default
  alternates.push({ lang: 'x-default', href: enUrl });

  return alternates;
}

/**
 * Returns localized path given a base route and target language
 */
export function getLocalizedPath(currentPath: string, targetLang: SupportedLanguage): string {
  let cleanPath = currentPath;
  for (const lang of ['de', 'es', 'ja', 'nl']) {
    if (cleanPath === `/${lang}` || cleanPath === `/${lang}/`) {
      cleanPath = '/';
      break;
    }
    if (cleanPath.startsWith(`/${lang}/`)) {
      cleanPath = cleanPath.slice(lang.length + 1);
      break;
    }
  }

  const normalizedPath = cleanPath === '/' ? '' : (cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`);
  const route = normalizedPath.length > 1 && normalizedPath.endsWith('/') ? normalizedPath.slice(0, -1) : (normalizedPath || '/');

  if (targetLang === 'en' || !LOCALIZED_ROUTES.has(route)) {
    return route === '/' ? '/' : route;
  }
  if (route === '/') {
    return `/${targetLang}/`;
  }
  return `/${targetLang}${route}`;
}

export interface TranslationDictionary {
  nav: {
    ipv4: string;
    splitter: string;
    k8s: string;
    ipv6: string;
    moreTools: string;
    vlsm: string;
    overlap: string;
    supernet: string;
    cheatsheet: string;
    aws: string;
    azure: string;
    gcp: string;
    terraform: string;
    k8sCidr: string;
  };
  intro: {
    ipv4: { title: string; eyebrow: string; lede: string };
    splitter: { title: string; eyebrow: string; lede: string };
    k8s: { title: string; eyebrow: string; lede: string };
    ipv6: { title: string; eyebrow: string; lede: string };
    terraform: { title: string; eyebrow: string; lede: string };
    k8sCidr: { title: string; eyebrow: string; lede: string };
  };
  meta: {
    defaultTitle: string;
    defaultDesc: string;
  };
  guide: {
    title: string;
    lead: string;
    exploreTitle: string;
    cards: Array<{ title: string; desc: string; linkText: string; href: string }>;
    prefixTableTitle: string;
    prefixTableDesc: string;
    comparisonTitle: string;
    comparisonDesc: string;
    faqTitle: string;
    faqViewAll: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  footer: {
    tagline: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    faq: string;
    noData: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    nav: {
      ipv4: "IPv4 Calculator",
      splitter: "Visual Splitter",
      k8s: "K8s IP Planner",
      ipv6: "IPv6 Calculator",
      moreTools: "More Tools",
      vlsm: "VLSM Calculator",
      overlap: "Subnet Overlap Checker",
      supernet: "CIDR Supernet Calculator",
      cheatsheet: "CIDR Cheat Sheet",
      aws: "AWS VPC Calculator",
      azure: "Azure VNet Calculator",
      gcp: "GCP VPC Calculator",
      terraform: "Terraform Subnet Planner",
      k8sCidr: "K8s CIDR Calculator"
    },
    intro: {
      ipv4: {
        title: "IPv4 Subnet Calculator & CIDR Planner",
        eyebrow: "FREE NETWORK TOOL / IPv4 & CCNA / CCNP",
        lede: "Compute host ranges, subnet masks, broadcast addresses, wildcard boundaries, and cloud VPC CIDR reservations for AWS, Azure, and GCP instantly."
      },
      splitter: {
        title: "Visual Subnet Splitter & CIDR Partitioner",
        eyebrow: "CIDR PARTITIONING / SPLITTER",
        lede: "Divide a network block visually into custom subnets with descriptive labels and export copy-pasteable IaC configurations."
      },
      k8s: {
        title: "Kubernetes Subnet Planner & Pod IP Calculator",
        eyebrow: "KUBERNETES PLANNER / PODS & NODES",
        lede: "Assess cluster size guidelines, node assignments, pod density constraints, and identify IP exhaustion risks early."
      },
      ipv6: {
        title: "IPv6 Subnet Calculator & Prefix Delegation",
        eyebrow: "SUBNET CALCULATOR / IPv6",
        lede: "Compress, expand, and classify 128-bit addresses. Instantly generate prefix delegation block increments."
      },
      terraform: {
        title: "Terraform Subnet Planner & cidrsubnet Calculator",
        eyebrow: "INFRASTRUCTURE AS CODE / TERRAFORM",
        lede: "Plan VPC subnets with Terraform cidrsubnet() math. Generate ready-to-use HCL blocks for AWS, Azure, and GCP without CIDR overlap bugs."
      },
      k8sCidr: {
        title: "Kubernetes CIDR Calculator & CNI Sizing Tool",
        eyebrow: "KUBERNETES NETWORKING / CNI SIZING",
        lede: "Calculate Pod CIDRs, Service ranges, and Node allocations for Cilium, Calico, AWS VPC CNI, and Azure CNI with zero IP exhaustion."
      }
    },
    meta: {
      defaultTitle: "Free IP Subnet Calculator & CIDR Planner | DevSubnet",
      defaultDesc: "Free online IPv4 and IPv6 subnet calculator. Calculate network ranges, subnet masks, broadcast addresses, usable hosts, and cloud VPC reservations for AWS, Azure, and GCP instantly."
    },
    guide: {
      title: "Play with Networks – Classic Calculations, Cloud VPCs, and Subnetting Strategies",
      lead: "Welcome to the premium home for network topology planners, CCNA/CCNP candidates, and DevOps engineers worldwide across the United States, India, United Kingdom, Canada, Australia, Singapore, Philippines, and South Africa.",
      exploreTitle: "Explore Modern Subnet Planning Topics",
      cards: [
        {
          title: "Understanding the Core IP Subnet",
          desc: "An IP subnet is a logical subdivision of an IP network. Essential for CCNA/CCNP exams, security zoning, and enterprise traffic routing.",
          linkText: "Calculate Standard Subnets →",
          href: "/"
        },
        {
          title: "The Usable Host Calculator",
          desc: "Calculate usable host ranges using dedicated algorithms. Under standard RFC rules, every subnet subtracts 2 addresses for network and broadcast.",
          linkText: "Plan VLSM segments →",
          href: "/vlsm-calculator"
        },
        {
          title: "Demystifying IP Ranges & Subnet Masks",
          desc: "A subnet mask defines which portion of an IP belongs to the network vs host. Visualize this split dynamically using binary grids.",
          linkText: "Open Subnet Mask Visualizer →",
          href: "/"
        },
        {
          title: "Translating CIDR Notation",
          desc: "Classless Inter-Domain Routing (CIDR) maps slash notation (/24, /28) into subnet masks and boundaries in real time.",
          linkText: "View CIDR cheat sheet →",
          href: "/cidr-cheat-sheet"
        },
        {
          title: "Terraform Subnet Planning",
          desc: "Avoid IP collision bugs in Terraform IaC. Generate accurate cidrsubnet() calculations for multi-AZ VPC architecture.",
          linkText: "Open Terraform Planner →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & CNI CIDR Sizing",
          desc: "Size Pod and Service CIDR blocks for Cilium, Calico, and AWS VPC CNI to prevent pod scheduling failures.",
          linkText: "Calculate K8s CIDR Blocks →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "IPv4 Subnet Prefix Reference Table",
      prefixTableDesc: "Lookup table mapping common prefix lengths to subnet masks, wildcard masks, and usable host capacities.",
      comparisonTitle: "How DevSubnet Compares to Other Subnet Calculators",
      comparisonDesc: "Most calculators only handle basic RFC math. DevSubnet integrates cloud reservations, IaC generation, and K8s sizing.",
      faqTitle: "Frequently Asked Questions (FAQ)",
      faqViewAll: "View All Questions →",
      ctaPrimary: "Start Subnet Calculation",
      ctaSecondary: "Try Visual Partitioning"
    },
    footer: {
      tagline: "DEVSUBNET.COM / ENGINEERED FOR CLEAR NETWORKS",
      about: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      faq: "FAQ",
      noData: "NO DATA LEAVES YOUR DEVICE"
    }
  },
  de: {
    nav: {
      ipv4: "IPv4 Rechner",
      splitter: "Visueller Splitter",
      k8s: "K8s IP-Planer",
      ipv6: "IPv6 Rechner",
      moreTools: "Weitere Tools",
      vlsm: "VLSM Rechner",
      overlap: "Subnetz-Überlappung",
      supernet: "CIDR Supernetting",
      cheatsheet: "CIDR Spickzettel",
      aws: "AWS VPC Rechner",
      azure: "Azure VNet Rechner",
      gcp: "GCP VPC Rechner",
      terraform: "Terraform Subnetz-Planer",
      k8sCidr: "K8s CIDR Rechner"
    },
    intro: {
      ipv4: {
        title: "IPv4 Subnetz-Rechner & CIDR-Planer",
        eyebrow: "KOSTENLOSES NETZWERK-TOOL / IPv4 & RECHENZENTREN",
        lede: "Berechnen Sie Host-Bereiche, Subnetzmasken, Broadcast-Adressen, Wildcard-Grenzen und Cloud-VPC-Reservierungen für AWS, Azure und GCP sofort."
      },
      splitter: {
        title: "Visueller Subnetz-Splitter & CIDR-Partitionierer",
        eyebrow: "CIDR-PARTITIONIERUNG / SPLITTER",
        lede: "Teilen Sie Netzwerkblöcke visuell in Subnetze auf und exportieren Sie kopierbare IaC-Konfigurationen für Terraform."
      },
      k8s: {
        title: "Kubernetes Subnetz-Planer & Pod-IP-Rechner",
        eyebrow: "KUBERNETES PLANER / PODS & NODES",
        lede: "Prüfen Sie Cluster-Größen, Node-Zuweisungen und Pod-Dichte-Beschränkungen, um IP-Erschöpfung frühzeitig zu vermeiden."
      },
      ipv6: {
        title: "IPv6 Subnetz-Rechner & Prefix-Delegation",
        eyebrow: "SUBMETZ-RECHNER / IPv6",
        lede: "Komprimieren, erweitern und klassifizieren Sie 128-Bit-Adressen. Berechnen Sie Prefix-Delegation-Blöcke in Echtzeit."
      },
      terraform: {
        title: "Terraform Subnetz-Planer & cidrsubnet-Rechner",
        eyebrow: "INFRASTRUCTURE AS CODE / TERRAFORM",
        lede: "Planen Sie VPC-Subnetze mit Terraform cidrsubnet()-Logik. Generieren Sie fehlerfreie HCL-Blöcke für AWS, Azure und GCP."
      },
      k8sCidr: {
        title: "Kubernetes CIDR-Rechner & CNI-Dimensionierung",
        eyebrow: "KUBERNETES NETZWERK / CNI",
        lede: "Berechnen Sie Pod- und Service-CIDRs für Cilium, Calico und AWS VPC CNI ohne Risiko von IP-Erschöpfung."
      }
    },
    meta: {
      defaultTitle: "Kostenloser IP Subnetz-Rechner & CIDR-Planer | DevSubnet",
      defaultDesc: "Kostenloser Online IPv4 & IPv6 Subnetz-Rechner. Berechnen Sie Netzwerkbereiche, Subnetzmasken, Broadcast-Adressen und Cloud-VPC-Reservierungen in Deutschland, Österreich und der Schweiz."
    },
    guide: {
      title: "Netzwerk-Planung – Klassische Berechnungen, Cloud-VPCs und Subnetz-Strategien",
      lead: "Willkommen beim modernen Tool für Netzwerk- und Cloud-Architekten in Deutschland, Europa und weltweit. Berechnen Sie IP-Bereiche sauber und browserbasiert ohne Datentransfer.",
      exploreTitle: "Moderne Subnetz-Planungsthemen",
      cards: [
        {
          title: "Grundlagen von IP-Subnetzen",
          desc: "Ein Subnetz teilt ein IP-Netzwerk logisch auf. Eine saubere Struktur ist essenziell für Sicherheit und Routing.",
          linkText: "Standard-Subnetze berechnen →",
          href: "/de/"
        },
        {
          title: "Nutzbare Hosts berechnen",
          desc: "Berechnen Sie nutzbare IP-Bereiche präzise nach RFC-Standards unter Abzug von Netzwerk- und Broadcast-Adresse.",
          linkText: "VLSM-Segmente planen →",
          href: "/vlsm-calculator"
        },
        {
          title: "IP-Bereiche & Subnetzmasken",
          desc: "Subnetzmasken trennen Netzwerk- und Host-Bits. Visualisieren Sie dies interaktiv mit der Binäransicht.",
          linkText: "Masken-Visualisierer öffnen →",
          href: "/de/"
        },
        {
          title: "CIDR-Notation verstehen",
          desc: "Klassenloses Routing (CIDR) übersetzt Slash-Notationen (/24, /28) blitzschnell in Netzwerkgrenzen.",
          linkText: "CIDR-Spickzettel ansehen →",
          href: "/de/cidr-cheat-sheet"
        },
        {
          title: "Terraform Subnetz-Planung",
          desc: "Vermeiden Sie IP-Kollisionen in Terraform. Berechnen Sie cidrsubnet() für AWS/Azure VPCs automatisiert.",
          linkText: "Terraform-Planer öffnen →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & CNI Dimensionierung",
          desc: "Planen Sie Pod- und Service-CIDRs für Cilium, Calico und AWS VPC CNI zur Vermeidung von Engpässen.",
          linkText: "K8s CIDRs berechnen →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "IPv4 Subnetz-Präfix-Referenztabelle",
      prefixTableDesc: "Übersicht gängiger Präfixlängen, Subnetzmasken, Wildcard-Masken und nutzbarer Host-Kapazitäten.",
      comparisonTitle: "DevSubnet im Vergleich zu anderen Rechnern",
      comparisonDesc: "Klassische Rechner decken nur RFC-Mathematik ab. DevSubnet integriert Cloud-VPC-Reservierungen, IaC-Export und K8s-Planung.",
      faqTitle: "Häufig gestellte Fragen (FAQ)",
      faqViewAll: "Alle Fragen anzeigen →",
      ctaPrimary: "Subnetz-Berechnung starten",
      ctaSecondary: "Visuellen Splitter testen"
    },
    footer: {
      tagline: "DEVSUBNET.COM / FÜR KLARE NETZWERKE ENTWICKELT",
      about: "Über uns",
      contact: "Kontakt",
      privacy: "Datenschutz",
      terms: "AGB",
      faq: "FAQ",
      noData: "KEINE DATEN VERLASSEN IHR GERÄT"
    }
  },
  nl: {
    nav: {
      ipv4: "IPv4 Calculator",
      splitter: "Visuele Splitter",
      k8s: "K8s IP-Planner",
      ipv6: "IPv6 Calculator",
      moreTools: "Meer Tools",
      vlsm: "VLSM Calculator",
      overlap: "Subnet Overlap Checker",
      supernet: "CIDR Supernetting",
      cheatsheet: "CIDR Cheat Sheet",
      aws: "AWS VPC Calculator",
      azure: "Azure VNet Calculator",
      gcp: "GCP VPC Calculator",
      terraform: "Terraform Subnet Planner",
      k8sCidr: "K8s CIDR Calculator"
    },
    intro: {
      ipv4: {
        title: "IPv4 Subnet Calculator & CIDR Planner",
        eyebrow: "GRATIS NETWERK TOOL / IPv4 & AMS-IX HUBS",
        lede: "Bereken hostbereiken, subnetmaskers, broadcastadressen, wildcardgrenzen en cloud VPC-reserveringen voor AWS, Azure en GCP direct."
      },
      splitter: {
        title: "Visuele Subnet Splitter & CIDR Partitioner",
        eyebrow: "CIDR PARTITIONERING / SPLITTER",
        lede: "Verdeel netwerkblokken visueel in subnetten en exporteer kant-en-klare IaC-configuraties voor Terraform en Ansible."
      },
      k8s: {
        title: "Kubernetes Subnet Planner & Pod IP Calculator",
        eyebrow: "KUBERNETES PLANNER / PODS & NODES",
        lede: "Evalueer clustergroottes, node-toewijzingen en pod-dichtheidslimieten om IP-uitputting vroegtijdig te voorkomen."
      },
      ipv6: {
        title: "IPv6 Subnet Calculator & Prefix Delegation",
        eyebrow: "SUBNET CALCULATOR / IPv6",
        lede: "Comprimeer, expandeer en classificeer 128-bits adressen. Bereken prefix delegation blokken in real-time."
      },
      terraform: {
        title: "Terraform Subnet Planner & cidrsubnet Calculator",
        eyebrow: "INFRASTRUCTURE AS CODE / TERRAFORM",
        lede: "Plan VPC-subnetten met Terraform cidrsubnet() logica. Genereer foutloze HCL-blokken voor AWS, Azure en GCP."
      },
      k8sCidr: {
        title: "Kubernetes CIDR Calculator & CNI Sizing",
        eyebrow: "KUBERNETES NETWERKEN / CNI SIZING",
        lede: "Bereken Pod- en Service-CIDRs voor Cilium, Calico en AWS VPC CNI zonder risico op IP-uitputting."
      }
    },
    meta: {
      defaultTitle: "Gratis IP Subnet Calculator & CIDR Planner | DevSubnet",
      defaultDesc: "Gratis online IPv4 en IPv6 subnet calculator. Bereken netwerkbereiken, subnetmaskers, broadcast en cloud VPC reserveringen in Nederland, België en Europa."
    },
    guide: {
      title: "Netwerkplanning – Klassieke Berekeningen, Cloud VPCs en CIDR Strategieën",
      lead: "Welkom bij de tool voor netwerk engineers, AMS-IX specialisten en cloud architecten in Nederland en wereldwijd. Bereken IP-reeksen veilig en 100% in uw browser.",
      exploreTitle: "Moderne Subnet Planningsonderwerpen",
      cards: [
        {
          title: "Basisprincipes van IP Subnetten",
          desc: "Een IP-subnet deelt een netwerk logisch op. Essentieel voor routing, data centers en enterprise netwerkbeheer.",
          linkText: "Standaard Subnetten Berekenen →",
          href: "/nl/"
        },
        {
          title: "Bruikbare Hosts Berekenen",
          desc: "Bereken bruikbare hostreeksen via RFC-standaarden waarbij netwerk- en broadcastadres worden afgetrokken.",
          linkText: "VLSM Segmenten Plannen →",
          href: "/vlsm-calculator"
        },
        {
          title: "IP-bereiken & Subnetmaskers",
          desc: "Het subnetmasker scheidt netwerk- en hostbits. Visualiseer dit interactief met ons live binaire raster.",
          linkText: "Masker Visualizer Openen →",
          href: "/nl/"
        },
        {
          title: "CIDR-notatie Begrijpen",
          desc: "Classless Inter-Domain Routing (CIDR) vertaalt slash-notaties (/24, /28) direct naar netwerkgrenzen.",
          linkText: "Bekijk CIDR Cheat Sheet →",
          href: "/nl/cidr-cheat-sheet"
        },
        {
          title: "Terraform Subnet Planning",
          desc: "Voorkom IP-conflicten in Terraform. Bereken automatisch cidrsubnet() voor AWS/Azure multi-AZ setups.",
          linkText: "Open Terraform Planner →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & CNI Sizing",
          desc: "Dimensioneer Pod- en Service-CIDRs voor Cilium, Calico en AWS VPC CNI om planningsfouten te voorkomen.",
          linkText: "K8s CIDRs Berekenen →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "IPv4 Subnet Prefix Referentietabel",
      prefixTableDesc: "Overzicht van prefixlengtes, subnetmaskers, wildcard-maskers en bruikbare hostcapaciteiten.",
      comparisonTitle: "DevSubnet Vergeleken met Andere Calculators",
      comparisonDesc: "Klassieke tools ondersteunen enkel basiswiskunde. DevSubnet integreert cloud-reserveringen, IaC-export en K8s-architectuur.",
      faqTitle: "Veelgestelde Vragen (FAQ)",
      faqViewAll: "Bekijk Alle Vragen →",
      ctaPrimary: "Start Subnet Berekening",
      ctaSecondary: "Probeer Visuele Splitter"
    },
    footer: {
      tagline: "DEVSUBNET.COM / GEBOUWD VOOR HELDERE NETWERKEN",
      about: "Over Ons",
      contact: "Contact",
      privacy: "Privacybeleid",
      terms: "Voorwaarden",
      faq: "FAQ",
      noData: "ER VERLAAT GEEN DATA UW APPARAAT"
    }
  },
  es: {
    nav: {
      ipv4: "Calculadora IPv4",
      splitter: "Divisor Visual",
      k8s: "Planificador K8s",
      ipv6: "Calculadora IPv6",
      moreTools: "Más Herramientas",
      vlsm: "Calculadora VLSM",
      overlap: "Superposición de Subredes",
      supernet: "Superredes CIDR",
      cheatsheet: "Tabla CIDR",
      aws: "Calculadora AWS VPC",
      azure: "Calculadora Azure VNet",
      gcp: "Calculadora GCP VPC",
      terraform: "Planificador Terraform",
      k8sCidr: "Calculadora CIDR K8s"
    },
    intro: {
      ipv4: {
        title: "Calculadora de Subredes IPv4 y Planificador CIDR",
        eyebrow: "HERRAMIENTA DE RED GRATUITA / IPv4",
        lede: "Calcule rangos de hosts, máscaras de subred, direcciones de broadcast, límites wildcard y reservas VPC en AWS, Azure y GCP al instante."
      },
      splitter: {
        title: "Divisor Visual de Subredes y Particionador CIDR",
        eyebrow: "PARTICIONAMIENTO CIDR / DIVISOR",
        lede: "Divida bloques de red visualmente en subredes personalizadas y exporte configuraciones de IaC para Terraform y Ansible."
      },
      k8s: {
        title: "Planificador de Subredes Kubernetes e IPs de Pods",
        eyebrow: "PLANIFICADOR KUBERNETES / PODS Y NODOS",
        lede: "Evalúe guías de tamaño de clúster, asignación de nodos y densidad de pods para prevenir el agotamiento de IPs."
      },
      ipv6: {
        title: "Calculadora de Subredes IPv6 y Delegación de Prefijos",
        eyebrow: "CALCULADORA DE SUBREDES / IPv6",
        lede: "Comprima, expanda y clasifique direcciones de 128 bits. Genere bloques de delegación de prefijos en tiempo real."
      },
      terraform: {
        title: "Planificador de Subredes Terraform y Calculadora cidrsubnet",
        eyebrow: "INFRAESTRUCTURA COMO CÓDIGO / TERRAFORM",
        lede: "Planifique subredes VPC con la función cidrsubnet() de Terraform. Genere bloques HCL para AWS, Azure y GCP sin solapamiento."
      },
      k8sCidr: {
        title: "Calculadora de CIDR para Kubernetes y CNI",
        eyebrow: "REDES KUBERNETES / DIMENSIONAMIENTO CNI",
        lede: "Calcule rangos CIDR de Pods y Servicios para Cilium, Calico y AWS VPC CNI evitando fallos de scheduling."
      }
    },
    meta: {
      defaultTitle: "Calculadora de Subredes IP y Planificador CIDR Gratis | DevSubnet",
      defaultDesc: "Calculadora de subredes IPv4 e IPv6 gratuita en línea. Calcule rangos de red, máscaras, broadcast y reservas VPC de AWS, Azure y GCP."
    },
    guide: {
      title: "Planificación de Redes – Cálculos Clásicos, VPCs Cloud y Estrategias CIDR",
      lead: "Bienvenido a la plataforma para ingenieros de redes y especialistas DevOps. Diseñe topologías de red y calcule rangos de IP directamente en su navegador, 100% privado y sin límites.",
      exploreTitle: "Temas Clave de Subredes y Redes Cloud",
      cards: [
        {
          title: "Comprendiendo la Subred IP",
          desc: "Una subred divide lógicamente una red IP. Diseñar una estructura limpia es clave para la seguridad y el enrutamiento eficiente.",
          linkText: "Calcular Subredes Estándar →",
          href: "/es/"
        },
        {
          title: "Calculadora de Hosts Útiles",
          desc: "Calcule rangos de hosts útiles bajo estándares RFC restando la dirección de red y la de broadcast de forma precisa.",
          linkText: "Planificar segmentos VLSM →",
          href: "/vlsm-calculator"
        },
        {
          title: "Rangos de IP y Máscaras de Subred",
          desc: "La máscara de subred define la porción de red y de hosts. Visualice la división mediante gráficos binarios dinámicos.",
          linkText: "Abrir Visualizador de Máscara →",
          href: "/es/"
        },
        {
          title: "Traduciendo Notación CIDR",
          desc: "El enrutamiento sin clases (CIDR) traduce la notación diagonal (/24, /28) en máscaras y límites en tiempo real.",
          linkText: "Ver Tabla CIDR →",
          href: "/es/cidr-cheat-sheet"
        },
        {
          title: "Planificación de Subredes con Terraform",
          desc: "Evite errores de solapamiento en Terraform. Genere cálculos con cidrsubnet() para arquitecturas multi-AZ.",
          linkText: "Abrir Planificador Terraform →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Dimensionamiento CIDR en Kubernetes",
          desc: "Dimensione bloques CIDR de Pods y Servicios para Cilium, Calico y AWS VPC CNI evitando el agotamiento de IPs.",
          linkText: "Calcular CIDRs de K8s →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "Tabla de Referencia de Prefijos IPv4",
      prefixTableDesc: "Tabla de correspondencia entre longitud de prefijos, máscara de subred, máscara wildcard y capacidad de hosts.",
      comparisonTitle: "Comparativa de DevSubnet frente a otras calculadoras",
      comparisonDesc: "Las herramientas básicas solo hacen cálculos estándar. DevSubnet añade reservas cloud, exportación IaC y cálculo K8s.",
      faqTitle: "Preguntas Frecuentes (FAQ)",
      faqViewAll: "Ver Todas las Preguntas →",
      ctaPrimary: "Iniciar Cálculo de Subred",
      ctaSecondary: "Probar Partición Visual"
    },
    footer: {
      tagline: "DEVSUBNET.COM / DISEÑADO PARA REDES CLARAS",
      about: "Sobre Nosotros",
      contact: "Contacto",
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      faq: "Preguntas Frecuentes",
      noData: "NINGÚN DATO SALE DE TU DISPOSITIVO"
    }
  },
  ja: {
    nav: {
      ipv4: "IPv4 サブネット計算",
      splitter: "ビジュアル分割ツール",
      k8s: "K8s IPプランナー",
      ipv6: "IPv6 計算ツール",
      moreTools: "その他のツール",
      vlsm: "VLSM 計算機",
      overlap: "サブネット重複チェッカー",
      supernet: "CIDR スーパーネット計算",
      cheatsheet: "CIDR 早見表",
      aws: "AWS VPC 計算機",
      azure: "Azure VNet 計算機",
      gcp: "GCP VPC 計算機",
      terraform: "Terraform サブネットプランナー",
      k8sCidr: "K8s CIDR 計算ツール"
    },
    intro: {
      ipv4: {
        title: "IPv4 サブネット計算機 & CIDR プランナー",
        eyebrow: "無料ネットワークツール / IPv4",
        lede: "ホスト範囲、サブネットマスク、ブロードキャストアドレス、AWS/Azure/GCPのクラウドVPC予約IPを瞬時に計算します。"
      },
      splitter: {
        title: "ビジュアル サブネット分割 & CIDR パーティショナー",
        eyebrow: "CIDR 分割 / スプリッター",
        lede: "ネットワークブロックを視覚的にサブネットに分割し、TerraformやAnsibleのIaCコードを即座に出力します。"
      },
      k8s: {
        title: "Kubernetes サブネットプランナー & Pod IP 計算",
        eyebrow: "KUBERNETES プランナー / POD & NODE",
        lede: "クラスタ規模、ノード割り当て、Pod密度の制限を評価し、IP枯渇リスクを未然に防ぎます。"
      },
      ipv6: {
        title: "IPv6 サブネット計算 & プレフィックス委譲",
        eyebrow: "サブネット計算 / IPv6",
        lede: "128ビットアドレスの圧縮・展開・分類と、プレフィックス委譲ブロックの計算をリアルタイムで行います。"
      },
      terraform: {
        title: "Terraform サブネットプランナー & cidrsubnet 計算ツール",
        eyebrow: "INFRASTRUCTURE AS CODE / TERRAFORM",
        lede: "Terraformのcidrsubnet()関数によるサブネット設計。AWS・Azure・GCP用のHCL設定ブロックを重複なく自動生成します。"
      },
      k8sCidr: {
        title: "Kubernetes CIDR 計算ツール & CNI サイジング",
        eyebrow: "KUBERNETES ネットワーキング / CNI",
        lede: "Cilium、Calico、AWS VPC CNI、Azure CNI向けにPod・Service CIDRとノード割り当てを正確にサイジングします。"
      }
    },
    meta: {
      defaultTitle: "無料 IP サブネット計算ツール & CIDR プランナー | DevSubnet",
      defaultDesc: "無料のオンラインIPv4・IPv6サブネット計算機。ネットワーク範囲、サブネットマスク、ブロードキャスト、AWS/Azure/GCPクラウドVPC予約IPを即座に計算。"
    },
    guide: {
      title: "ネットワーク設計 – クラシック計算、クラウドVPC、CIDRサブネット戦略",
      lead: "ネットワークエンジニアやDevOpsエンジニアのための高機能サブネット設計ツール。ブラウザ上で完全に動作し、外部へデータを送信することなく安全に計算できます。",
      exploreTitle: "モダンなサブネット設計トピック",
      cards: [
        {
          title: "IPサブネットの基礎知識",
          desc: "サブネットはIPネットワークを論理的に分割する仕組みです。適切な設計によりセキュリティとルーティング効率を高めます。",
          linkText: "標準サブネットを計算する →",
          href: "/ja/"
        },
        {
          title: "使用可能ホストの計算",
          desc: "RFC標準に従い、ネットワークアドレスとブロードキャストアドレスを除いた実効ホスト数を正確に算出します。",
          linkText: "VLSMセグメントを計画 →",
          href: "/vlsm-calculator"
        },
        {
          title: "IP範囲とサブネットマスク",
          desc: "サブネットマスクはネットワーク部とホスト部を定義します。バイナリグリッドで視覚的に確認できます。",
          linkText: "マスク可視化ツールを開く →",
          href: "/ja/"
        },
        {
          title: "CIDR表記の変換",
          desc: "スラッシュ表記（/24、/28など）をリアルタイムでサブネットマスクと境界アドレスに変換します。",
          linkText: "CIDR早見表を見る →",
          href: "/ja/cidr-cheat-sheet"
        },
        {
          title: "Terraform サブネット設計",
          desc: "TerraformでのIP重複ミスを防止。cidrsubnet()によるマルチAZ VPC設計コードを自動生成します。",
          linkText: "Terraformプランナーを開く →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & CNI CIDR設計",
          desc: "Cilium、Calico、AWS VPC CNIにおけるPod・Service CIDRを適正化し、Pod起動不能トラブルを防ぎます。",
          linkText: "K8s CIDRを計算する →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "IPv4 サブネットプレフィックス早見表",
      prefixTableDesc: "主要なプレフィックス長、サブネットマスク、ワイルドカードマスク、使用可能ホスト数の対応表です。",
      comparisonTitle: "他社計算ツールとの機能比較",
      comparisonDesc: "一般的なツールはRFC標準計算のみですが、DevSubnetはAWS/Azure/GCPの予約IP、IaCコード出力、K8s設計に対応しています。",
      faqTitle: "よくある質問 (FAQ)",
      faqViewAll: "すべての質問を見る →",
      ctaPrimary: "サブネット計算を開始",
      ctaSecondary: "ビジュアル分割ツールを試す"
    },
    footer: {
      tagline: "DEVSUBNET.COM / 明快なネットワーク設計のために",
      about: "運営情報",
      contact: "お問い合わせ",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
      faq: "よくある質問",
      noData: "データはお使いのブラウザ内でのみ処理されます"
    }
  }
};
