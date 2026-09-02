export type SupportedLanguage = 'en' | 'de' | 'es' | 'ja' | 'fr' | 'pt' | 'ko' | 'it';

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
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    locale: 'fr_FR',
    prefix: '/fr'
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    locale: 'pt_PT',
    prefix: '/pt'
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    locale: 'ko_KR',
    prefix: '/ko'
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    locale: 'it_IT',
    prefix: '/it'
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
  const nonDefaultLangs = Object.keys(languages).filter(l => l !== 'en');
  let cleanPath = pathname;
  for (const lang of nonDefaultLangs) {
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
  const hasLocalizedVersion = true;
  const enUrl = `${siteUrl}${pathWithoutRootSlash || '/'}`;
  const deUrl = `${siteUrl}/de${pathWithoutRootSlash}`;
  const esUrl = `${siteUrl}/es${pathWithoutRootSlash}`;
  const jaUrl = `${siteUrl}/ja${pathWithoutRootSlash}`;
  const frUrl = `${siteUrl}/fr${pathWithoutRootSlash}`;
  const ptUrl = `${siteUrl}/pt${pathWithoutRootSlash}`;
  const koUrl = `${siteUrl}/ko${pathWithoutRootSlash}`;
  const itUrl = `${siteUrl}/it${pathWithoutRootSlash}`;

  const alternates: HreflangAlternate[] = [
    // Global generic languages
    { lang: 'en', href: enUrl },
  ];

  if (hasLocalizedVersion) {
    alternates.push(
      { lang: 'de', href: deUrl },
      { lang: 'es', href: esUrl },
      { lang: 'ja', href: jaUrl },
      { lang: 'fr', href: frUrl },
      { lang: 'pt', href: ptUrl },
      { lang: 'ko', href: koUrl },
      { lang: 'it', href: itUrl },
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
    { lang: 'en-CH', href: enUrl }, // Switzerland (English)
  );

  if (hasLocalizedVersion) {
    alternates.push(
      // Priority Regional European & Asian Locales
      { lang: 'de-DE', href: deUrl }, // Germany
      { lang: 'es-ES', href: esUrl }, // Spain
      { lang: 'ja-JP', href: jaUrl }, // Japan
      { lang: 'fr-FR', href: frUrl }, // France
      { lang: 'fr-CA', href: frUrl }, // Canada (French)
      { lang: 'fr-BE', href: frUrl }, // Belgium (French)
      { lang: 'fr-CH', href: frUrl }, // Switzerland (French)
      { lang: 'pt-BR', href: ptUrl }, // Brazil
      { lang: 'pt-PT', href: ptUrl }, // Portugal
      { lang: 'ko-KR', href: koUrl }, // South Korea
      { lang: 'it-IT', href: itUrl }, // Italy
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
  const nonDefaultLangs = Object.keys(languages).filter(l => l !== 'en');
  let cleanPath = currentPath;
  for (const lang of nonDefaultLangs) {
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

  if (targetLang === 'en') {
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
    cookiePolicy: string;
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
      cookiePolicy: "Cookie Policy",
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
      cookiePolicy: "Cookie-Richtlinie",
      faq: "FAQ",
      noData: "KEINE DATEN VERLASSEN IHR GERÄT"
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
      cookiePolicy: "Política de Cookies",
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
      cookiePolicy: "クッキーポリシー",
      faq: "よくある質問",
      noData: "データはお使いのブラウザ内でのみ処理されます"
    }
  },
  fr: {
    nav: {
      ipv4: "Calculateur IPv4",
      splitter: "Diviseur Visuel",
      k8s: "Planificateur d'IP K8s",
      ipv6: "Calculateur IPv6",
      moreTools: "Plus d'outils",
      vlsm: "Calculateur VLSM",
      overlap: "Vérificateur de chevauchement",
      supernet: "Calculateur de super-réseau CIDR",
      cheatsheet: "Aide-mémoire CIDR",
      aws: "Calculateur AWS VPC",
      azure: "Calculateur Azure VNet",
      gcp: "Calculateur GCP VPC",
      terraform: "Planificateur de sous-réseau Terraform",
      k8sCidr: "Calculateur CIDR K8s"
    },
    intro: {
      ipv4: {
        title: "Calculateur de sous-réseau IPv4 et planificateur CIDR",
        eyebrow: "OUTIL RÉSEAU GRATUIT / IPv4 & CCNA / CCNP",
        lede: "Calculez instantanément les plages d'hôtes, les masques de sous-réseau, les adresses de diffusion, les limites de masque générique et les réservations cloud VPC pour AWS, Azure et GCP."
      },
      splitter: {
        title: "Diviseur de sous-réseau visuel et partitionneur CIDR",
        eyebrow: "PARTITIONNEMENT CIDR / DIVISEUR",
        lede: "Divisez visuellement un bloc réseau en sous-réseaux personnalisés avec des étiquettes descriptives et exportez des configurations IaC prêtes à l'emploi."
      },
      k8s: {
        title: "Planificateur de sous-réseau Kubernetes et calculateur d'IP de Pod",
        eyebrow: "PLANIFICATEUR KUBERNETES / PODS & NŒUDS",
        lede: "Évaluez les directives de taille de cluster, les allocations de nœuds, les contraintes de densité de pods et identifiez tôt les risques d'épuisement d'IP."
      },
      ipv6: {
        title: "Calculateur de sous-réseau IPv6 et délégation de préfixe",
        eyebrow: "CALCULATEUR DE SOUS-RÉSEAU / IPv6",
        lede: "Compressez, développez et classifiez les adresses 128 bits. Générez instantanément des incréments de blocs de délégation de préfixe."
      },
      terraform: {
        title: "Planificateur de sous-réseau Terraform et calculateur cidrsubnet",
        eyebrow: "INFRASTRUCTURE AS CODE / TERRAFORM",
        lede: "Planifiez des sous-réseaux VPC avec la fonction mathématique cidrsubnet() de Terraform. Générez des blocs HCL prêts à l'emploi pour AWS, Azure et GCP sans bug de chevauchement."
      },
      k8sCidr: {
        title: "Calculateur CIDR Kubernetes et outil de dimensionnement CNI",
        eyebrow: "RÉSEAU KUBERNETES / DIMENSIONNEMENT CNI",
        lede: "Calculez les CIDR de Pods, les plages de Services et les allocations de Nœuds pour Cilium, Calico, AWS VPC CNI et Azure CNI avec zéro épuisement d'IP."
      }
    },
    meta: {
      defaultTitle: "Calculateur de sous-réseau IP et planificateur CIDR gratuit | DevSubnet",
      defaultDesc: "Calculateur de sous-réseau IPv4 et IPv6 gratuit en ligne. Calculez instantanément les plages réseau, les masques de sous-réseau, les adresses de diffusion, les hôtes utilisables et les réservations cloud VPC pour AWS, Azure et GCP."
    },
    guide: {
      title: "Jouez avec les réseaux – Calculs classiques, VPC cloud et stratégies de sous-réseau",
      lead: "Bienvenue sur le site de référence pour les planificateurs de topologie réseau, les candidats CCNA/CCNP et les ingénieurs DevOps du monde entier en France, au Canada, en Belgique et en Suisse.",
      exploreTitle: "Explorez les sujets modernes de planification de sous-réseau",
      cards: [
        {
          title: "Comprendre le cœur du sous-réseau IP",
          desc: "Un sous-réseau IP est une subdivision logique d'un réseau IP. Essentiel pour les examens CCNA/CCNP, le zonage de sécurité et le routage du trafic d'entreprise.",
          linkText: "Calculer des sous-réseaux standard →",
          href: "/fr/"
        },
        {
          title: "Le calculateur d'hôtes utilisables",
          desc: "Calculez les plages d'hôtes utilisables à l'aide d'algorithmes dédiés. Selon les règles standard de la RFC, chaque sous-réseau soustrait 2 adresses pour le réseau et la diffusion.",
          linkText: "Planifier des segments VLSM →",
          href: "/vlsm-calculator"
        },
        {
          title: "Démystifier les plages IP et les masques de sous-réseau",
          desc: "Un masque de sous-réseau définit quelle partie d'une IP appartient au réseau par rapport à l'hôte. Visualisez cette répartition de manière dynamique à l'aide de grilles binaires.",
          linkText: "Ouvrir le visualisateur de masque de sous-réseau →",
          href: "/fr/"
        },
        {
          title: "Traduction de la notation CIDR",
          desc: "Le routage inter-domaines sans classe (CIDR) associe en temps réel la notation avec barre oblique (/24, /28) aux masques et aux limites de sous-réseau.",
          linkText: "Voir l'aide-mémoire CIDR →",
          href: "/fr/cidr-cheat-sheet"
        },
        {
          title: "Planification de sous-réseaux Terraform",
          desc: "Évitez les bugs de collision IP dans l'IaC Terraform. Générez des calculs cidrsubnet() précis pour l'architecture VPC multi-AZ.",
          linkText: "Ouvrir le planificateur Terraform →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & dimensionnement du CIDR CNI",
          desc: "Dimensionnez les blocs CIDR de Pods et de Services pour Cilium, Calico et AWS VPC CNI pour éviter les échecs de planification de pods.",
          linkText: "Calculer les blocs CIDR K8s →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "Table de référence des préfixes de sous-réseau IPv4",
      prefixTableDesc: "Table de correspondance associant les longueurs de préfixes courantes aux masques de sous-réseau, masques génériques et capacités d'hôtes utilisables.",
      comparisonTitle: "Comment DevSubnet se compare aux autres calculateurs",
      comparisonDesc: "La plupart des calculateurs ne gèrent que les mathématiques RFC de base. DevSubnet intègre les réservations cloud, la génération d'IaC et le dimensionnement K8s.",
      faqTitle: "Foire aux questions (FAQ)",
      faqViewAll: "Voir toutes les questions →",
      ctaPrimary: "Démarrer le calcul de sous-réseau",
      ctaSecondary: "Essayer le partitionnement visuel"
    },
    footer: {
      tagline: "DEVSUBNET.COM / CONÇU POUR DES RÉSEAUX CLAIRS",
      about: "À propos",
      contact: "Contact",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      cookiePolicy: "Politique des cookies",
      faq: "FAQ",
      noData: "AUCUNE DONNÉE NE QUITTE VOTRE APPAREIL"
    }
  },
  pt: {
    nav: {
      ipv4: "Calculadora IPv4",
      splitter: "Divisor Visual",
      k8s: "Planificador de IP K8s",
      ipv6: "Calculadora IPv6",
      moreTools: "Mais Ferramentas",
      vlsm: "Calculadora VLSM",
      overlap: "Verificador de Sobreposição",
      supernet: "Calculadora de Super-rede CIDR",
      cheatsheet: "Tabela de Referência CIDR",
      aws: "Calculadora AWS VPC",
      azure: "Calculadora Azure VNet",
      gcp: "Calculadora GCP VPC",
      terraform: "Planificador de Sub-rede Terraform",
      k8sCidr: "Calculadora CIDR K8s"
    },
    intro: {
      ipv4: {
        title: "Calculadora de Sub-rede IPv4 e Planificador CIDR",
        eyebrow: "FERRAMENTA DE REDE GRATUITA / IPv4 & CCNA / CCNP",
        lede: "Calcule instantaneamente intervalos de hosts, máscaras de sub-rede, endereços de broadcast, limites de máscara curinga e reservas de VPC em nuvem para AWS, Azure e GCP."
      },
      splitter: {
        title: "Divisor de Sub-rede Visual e Particionador CIDR",
        eyebrow: "PARTICIONAMENTO CIDR / DIVISOR",
        lede: "Divida visualmente um bloco de rede em sub-redes personalizadas com rótulos descritivos e exporte configurações IaC prontas para uso."
      },
      k8s: {
        title: "Planificador de Sub-rede Kubernetes e Calculadora de IP de Pod",
        eyebrow: "PLANIFICADOR KUBERNETES / PODS & NÓS",
        lede: "Avalie as diretrizes de tamanho do cluster, alocações de nós, restrições de densidade de pods e identifique riscos de esgotamento de IP precocemente."
      },
      ipv6: {
        title: "Calculadora de Sub-rede IPv6 e Delegação de Prefixo",
        eyebrow: "CALCULADORA DE SUB-REDE / IPv6",
        lede: "Comprima, expanda e classifique endereços de 128 bits. Gere instantaneamente incrementos de bloco de delegação de prefixo."
      },
      terraform: {
        title: "Planificador de Sub-rede Terraform e Calculadora cidrsubnet",
        eyebrow: "INFRAESTRUTURA COMO CÓDIGO / TERRAFORM",
        lede: "Planeje sub-redes VPC com a lógica matemática cidrsubnet() do Terraform. Gere blocos HCL prontos para uso para AWS, Azure e GCP sem bugs de sobreposição."
      },
      k8sCidr: {
        title: "Calculadora CIDR Kubernetes e Dimensionamento CNI",
        eyebrow: "REDE KUBERNETES / DIMENSIONAMENTO CNI",
        lede: "Calcule CIDRs de Pods, intervalos de Serviços e alocações de Nós para Cilium, Calico, AWS VPC CNI e Azure CNI com zero esgotamento de IP."
      }
    },
    meta: {
      defaultTitle: "Calculadora de Sub-rede IP e Planificador CIDR Grátis | DevSubnet",
      defaultDesc: "Calculadora de sub-rede IPv4 e IPv6 online gratuita. Calcule intervalos de rede, máscaras de sub-rede, endereços de broadcast, hosts utilizáveis e reservas de VPC em nuvem para AWS, Azure e GCP."
    },
    guide: {
      title: "Brinque com Redes – Cálculos Clássicos, VPCs em Nuvem e Estratégias de Sub-rede",
      lead: "Bem-vindo ao lar premium para planejadores de topologia de rede, candidatos CCNA/CCNP e engenheiros DevOps em todo o mundo no Brasil, Portugal, Angola e Moçambique.",
      exploreTitle: "Explore Tópicos Modernos de Planejamento de Sub-rede",
      cards: [
        {
          title: "Compreendendo o Núcleo da Sub-rede IP",
          desc: "Uma sub-rede IP é uma subdivisão lógica de uma rede IP. Essencial para exames CCNA/CCNP, zoneamento de segurança e roteamento de tráfego corporativo.",
          linkText: "Calcular sub-redes padrão →",
          href: "/pt/"
        },
        {
          title: "A Calculadora de Hosts Utilizáveis",
          desc: "Calcule intervalos de hosts utilizáveis usando algoritmos dedicados. Sob as regras padrão da RFC, cada sub-rede subtrai 2 endereços para rede e broadcast.",
          linkText: "Planejar segmentos VLSM →",
          href: "/vlsm-calculator"
        },
        {
          title: "Desmistificando Intervalos de IP e Máscaras de Sub-rede",
          desc: "Uma máscara de sub-rede define qual parte de um IP pertence à rede em comparação ao host. Visualize essa divisão dinamicamente usando grades binárias.",
          linkText: "Abrir Visualizador de Máscara de Sub-rede →",
          href: "/pt/"
        },
        {
          title: "Traduzindo Notação CIDR",
          desc: "O Roteamento Interdomínio Sem Classe (CIDR) mapeia a notação de barra (/24, /28) em máscaras de sub-rede e limites em tempo real.",
          linkText: "Ver tabela de referência CIDR →",
          href: "/pt/cidr-cheat-sheet"
        },
        {
          title: "Planejamento de Sub-rede com Terraform",
          desc: "Evite erros de colisão de IP no Terraform IaC. Gere cálculos cidrsubnet() precisos para arquitetura VPC multi-AZ.",
          linkText: "Abrir Planificador Terraform →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & Dimensionamento de CIDR CNI",
          desc: "Dimensione blocos CIDR de Pods e Serviços para Cilium, Calico e AWS VPC CNI para evitar falhas no agendamento de pods.",
          linkText: "Calcular Blocos CIDR K8s →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "Tabela de Referência de Prefixo de Sub-rede IPv4",
      prefixTableDesc: "Tabela de consulta que mapeia comprimentos de prefixo comuns a máscaras de sub-rede, máscaras curinga e capacidades de hosts utilizáveis.",
      comparisonTitle: "Como o DevSubnet se Compara a Outras Calculadoras",
      comparisonDesc: "A maioria das calculadoras lida apenas com matemática básica da RFC. O DevSubnet integra reservas de nuvem, geração de IaC e dimensionamento de K8s.",
      faqTitle: "Perguntas Frequentes (FAQ)",
      faqViewAll: "Ver Todas as Perguntas →",
      ctaPrimary: "Iniciar Cálculo de Sub-rede",
      ctaSecondary: "Experimentar Particionamento Visual"
    },
    footer: {
      tagline: "DEVSUBNET.COM / PROJETADO PARA REDES CLARAS",
      about: "Sobre Nós",
      contact: "Contato",
      privacy: "Política de Privacidade",
      terms: "Terminos e Condições",
      cookiePolicy: "Política de Cookies",
      faq: "FAQ",
      noData: "NENHUM DADO SAI DO SEU DISPOSITIVO"
    }
  },
  ko: {
    nav: {
      ipv4: "IPv4 서브넷 계산기",
      splitter: "비주얼 분할기",
      k8s: "K8s IP 플래너",
      ipv6: "IPv6 계산기",
      moreTools: "기타 도구",
      vlsm: "VLSM 계산기",
      overlap: "서브넷 중복 확인기",
      supernet: "CIDR 슈퍼넷 계산기",
      cheatsheet: "CIDR 치트 시트",
      aws: "AWS VPC 계산기",
      azure: "Azure VNet 계산기",
      gcp: "GCP VPC 계산기",
      terraform: "Terraform 서브넷 플래너",
      k8sCidr: "K8s CIDR 계산기"
    },
    intro: {
      ipv4: {
        title: "IPv4 서브넷 계산기 & CIDR 플래너",
        eyebrow: "무료 네트워크 도구 / IPv4 & CCNA / CCNP",
        lede: "AWS, Azure, GCP용 호스트 범위, 서브넷 마스크, 브로드캐스트 주소, 와일드카드 경계 및 클라우드 VPC CIDR 예약을 즉시 계산합니다."
      },
      splitter: {
        title: "비주얼 서브넷 분할기 & CIDR 파티셔너",
        eyebrow: "CIDR 파티셔닝 / 분할기",
        lede: "네트워크 블록을 비주얼 방식으로 서브넷으로 분할하고 설명 레이블을 단 뒤 바로 사용할 수 있는 IaC 코드로 내보내세요."
      },
      k8s: {
        title: "Kubernetes 서브넷 플래너 & Pod IP 계산기",
        eyebrow: "KUBERNETES 플래너 / POD & 노드",
        lede: "클러스터 크기 지침, 노드 할당, Pod 밀도 제약을 평가하고 IP 고갈 위험을 조기에 파악합니다."
      },
      ipv6: {
        title: "IPv6 서브넷 계산기 & 접두사 위임",
        eyebrow: "서브넷 계산기 / IPv6",
        lede: "128비트 주소를 압축, 확장 및 분류합니다. 접두사 위임 블록 증가량을 실시간으로 자동 계산합니다."
      },
      terraform: {
        title: "Terraform 서브넷 플래너 & cidrsubnet 계산기",
        eyebrow: "코드형 인프라 / TERRAFORM",
        lede: "Terraform의 cidrsubnet() 함수를 사용해 VPC 서브넷을 설계하세요. CIDR 중복 오류 없는 AWS, Azure, GCP용 HCL 설정 블록을 자동 생성합니다."
      },
      k8sCidr: {
        title: "Kubernetes CIDR 계산기 & CNI 사이징 도구",
        eyebrow: "KUBERNETES 네트워킹 / CNI 사이징",
        lede: "IP 고갈 위험 없이 Cilium, Calico, AWS VPC CNI, Azure CNI용 Pod CIDR, Service 범위 및 노드 할당을 계산합니다."
      }
    },
    meta: {
      defaultTitle: "무료 IP 서브넷 계산기 & CIDR 플래너 | DevSubnet",
      defaultDesc: "무료 온라인 IPv4 및 IPv6 서브넷 계산기. 네트워크 범위, 서브넷 마스크, 브로드캐스트 주소, 사용 가능한 호스트 및 AWS, Azure, GCP 클라우드 VPC 예약을 즉시 계산합니다."
    },
    guide: {
      title: "네트워크와 놀기 – 클래식 계산, 클라우드 VPC 및 서브넷 전략",
      lead: "대한민국을 비롯한 전 세계의 네트워크 토폴로지 설계자, CCNA/CCNP 수험생, DevOps 엔지니어를 위한 최고의 서브넷 기획 도구입니다.",
      exploreTitle: "최신 서브넷 설계 주제 살펴보기",
      cards: [
        {
          title: "IP 서브넷의 핵심 이해하기",
          desc: "IP 서브넷은 IP 네트워크의 논리적 하위 분할입니다. CCNA/CCNP 시험, 보안 영역 분할 및 기업 트래픽 라우팅에 필수적입니다.",
          linkText: "표준 서브넷 계산하기 →",
          href: "/ko/"
        },
        {
          title: "사용 가능한 호스트 계산기",
          desc: "전용 알고리즘을 사용해 사용 가능한 호스트 범위를 계산합니다. 표준 RFC 규칙에 따라 모든 서브넷은 네트워크와 브로드캐스트 주소용으로 2개를 제외합니다.",
          linkText: "VLSM 세그먼트 설계 →",
          href: "/vlsm-calculator"
        },
        {
          title: "IP 범위 & 서브넷 마스크 해부",
          desc: "서브넷 마스크는 IP의 어느 부분이 네트워크에 속하고 어느 부분이 호스트에 속하는지 정의합니다. 2진수 그리드로 이 구분을 동적으로 시각화하세요.",
          linkText: "서브넷 마스크 비주얼라이저 열기 →",
          href: "/ko/"
        },
        {
          title: "CIDR 표기법 변환",
          desc: "무클래스 간 도메인 라우팅(CIDR)은 슬래시 표기법(/24, /28 등)을 서브넷 마스크와 경계 주소로 실시간 매핑합니다.",
          linkText: "CIDR 치트 시트 보기 →",
          href: "/ko/cidr-cheat-sheet"
        },
        {
          title: "Terraform 서브넷 설계",
          desc: "Terraform IaC에서 IP 충돌 버그를 방지합니다. 멀티 AZ VPC 아키텍처를 위해 정확한 cidrsubnet() 계산 코드를 생성합니다.",
          linkText: "Terraform 플래너 열기 →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & CNI CIDR 사이징",
          desc: "Pod 스케줄링 실패를 예방하기 위해 Cilium, Calico 및 AWS VPC CNI용 Pod 및 Service CIDR 블록의 크기를 적절히 산정합니다.",
          linkText: "K8s CIDR 블록 계산하기 →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "IPv4 서브넷 접두사 참조 테이블",
      prefixTableDesc: "일반적인 접두사 길이를 서브넷 마스크, 와일드카드 마스크 및 사용 가능한 호스트 용량에 매핑한 조회 테이블입니다.",
      comparisonTitle: "DevSubnet과 다른 서브넷 계산기 비교",
      comparisonDesc: "대부분의 계산기는 기본 RFC 수학만 처리하지만, DevSubnet은 클라우드 예약 IP, IaC 생성 및 K8s 사이징을 통합하여 지원합니다.",
      faqTitle: "자주 묻는 질문 (FAQ)",
      faqViewAll: "모든 질문 보기 →",
      ctaPrimary: "서브넷 계산 시작",
      ctaSecondary: "비주얼 파티셔닝 테스트"
    },
    footer: {
      tagline: "DEVSUBNET.COM / 명확한 네트워크 설계를 위해 설계됨",
      about: "소개",
      contact: "문의",
      privacy: "개인정보처리방침",
      terms: "이용약관",
      cookiePolicy: "쿠키 정책",
      faq: "FAQ",
      noData: "어떤 데이터도 장치를 벗어나지 않습니다"
    }
  },
  it: {
    nav: {
      ipv4: "Calcolatore IPv4",
      splitter: "Visual Splitter",
      k8s: "Pianificatore IP K8s",
      ipv6: "Calcolatore IPv6",
      moreTools: "Altri Strumenti",
      vlsm: "Calcolatore VLSM",
      overlap: "Controllo Sovrapposizione",
      supernet: "Calcolatore Supernetting CIDR",
      cheatsheet: "Tabella CIDR",
      aws: "Calcolatore AWS VPC",
      azure: "Calcolatore Azure VNet",
      gcp: "Calcolatore GCP VPC",
      terraform: "Pianificatore Subnet Terraform",
      k8sCidr: "Calcolatore CIDR K8s"
    },
    intro: {
      ipv4: {
        title: "Calcolatore di subnet IPv4 e pianificatore CIDR",
        eyebrow: "STRUMENTO DI RETE GRATUITO / IPv4 & CCNA / CCNP",
        lede: "Calcola all'istante intervalli di host, maschere di subnet, indirizzi broadcast, limiti wildcard e prenotazioni VPC cloud per AWS, Azure e GCP."
      },
      splitter: {
        title: "Subnet Splitter visivo e partizionatore CIDR",
        eyebrow: "PARTIZIONAMENTO CIDR / SPLITTER",
        lede: "Suddividi visivamente un blocco di rete in subnet personalizzate con etichette descrittive ed esporta configurazioni IaC pronte per l'uso."
      },
      k8s: {
        title: "Pianificatore di subnet Kubernetes e calcolatore IP Pod",
        eyebrow: "PIANIFICATORE KUBERNETES / PODS & NODI",
        lede: "Valuta le linee guida sulla dimensione del cluster, le allocazioni dei nodi, i vincoli di densità dei pod e identifica in anticipo i rischi di esaurimento degli IP."
      },
      ipv6: {
        title: "Calcolatore di subnet IPv6 e delega dei prefissi",
        eyebrow: "CALCULATORE SUBNET / IPv6",
        lede: "Comprimi, espandi e classifica gli indirizzi a 128 bit. Genera istantaneamente incrementi dei blocchi di delega dei prefissi."
      },
      terraform: {
        title: "Pianificatore di subnet Terraform e calcolatore cidrsubnet",
        eyebrow: "INFRASTRUCTURE AS CODE / TERRAFORM",
        lede: "Pianifica le subnet VPC con la funzione matematica cidrsubnet() di Terraform. Genera blocchi HCL pronti per AWS, Azure e GCP senza bug di sovrapposizione."
      },
      k8sCidr: {
        title: "Calcolatore CIDR Kubernetes e dimensionamento CNI",
        eyebrow: "RETE KUBERNETES / DIMENSIONAMENTO CNI",
        lede: "Calcola i CIDR dei Pod, gli intervalli dei Servizi e le allocazioni dei Nodi per Cilium, Calico, AWS VPC CNI e Azure CNI senza esaurimento degli IP."
      }
    },
    meta: {
      defaultTitle: "Calcolatore di Subnet IP e Pianificatore CIDR Gratis | DevSubnet",
      defaultDesc: "Calcolatore di subnet IPv4 e IPv6 gratuito online. Calcola intervalli di rete, maschere di subnet, indirizzi broadcast, host utilizzabili e prenotazioni VPC cloud per AWS, Azure e GCP."
    },
    guide: {
      title: "Gioca con le reti – Calcoli classici, VPC cloud e strategie di subnetting",
      lead: "Benvenuto nella risorsa premium per progettisti di topologia di rete, candidati CCNA/CCNP e ingegneri DevOps in Italia, Svizzera e in tutto il mondo.",
      exploreTitle: "Esplora argomenti moderni di pianificazione delle subnet",
      cards: [
        {
          title: "Comprendere il nucleo della subnet IP",
          desc: "Una subnet IP è una suddivisione logica di una rete IP. Essenziale per gli esami CCNA/CCNP, la segmentazione della sicurezza e il routing del traffico aziendale.",
          linkText: "Calcola subnet standard →",
          href: "/it/"
        },
        {
          title: "Il calcolatore di host utilizzabili",
          desc: "Calcola gli intervalli di host utilizzabili tramite algoritmi dedicati. In base alle regole RFC standard, ogni subnet sottrae 2 indirizzi per rete e broadcast.",
          linkText: "Pianifica segmenti VLSM →",
          href: "/vlsm-calculator"
        },
        {
          title: "Demistificare gli intervalli IP e le maschere di subnet",
          desc: "Una maschera di subnet definisce quale parte di un IP appartiene alla rete rispetto all'host. Visualizza questa suddivisione in modo dinamico tramite griglie binarie.",
          linkText: "Apri il visualizzatore di maschera di subnet →",
          href: "/it/"
        },
        {
          title: "Tradurre la notazione CIDR",
          desc: "Il Classless Inter-Domain Routing (CIDR) associa la notazione con barra (/24, /28) in maschere di subnet e limiti in tempo reale.",
          linkText: "Visualizza la tabella CIDR →",
          href: "/it/cidr-cheat-sheet"
        },
        {
          title: "Pianificazione delle subnet con Terraform",
          desc: "Evita bug di collisione IP in Terraform IaC. Genera calcoli cidrsubnet() accurati per architetture VPC multi-AZ.",
          linkText: "Apri il pianificatore Terraform →",
          href: "/terraform-subnet-planner"
        },
        {
          title: "Kubernetes & Dimensionamento del CIDR CNI",
          desc: "Calcola le dimensioni dei blocchi CIDR per Pod e Servizi per Cilium, Calico e AWS VPC CNI per evitare errori di schedulazione dei pod.",
          linkText: "Calcola blocchi CIDR K8s →",
          href: "/k8s-cidr-calculator"
        }
      ],
      prefixTableTitle: "Tabella di riferimento dei prefissi di subnet IPv4",
      prefixTableDesc: "Tabella di corrispondenza che associa le lunghezze dei prefissi comuni alle maschere di subnet, maschere wildcard e capacità degli host utilizzabili.",
      comparisonTitle: "Confronto tra DevSubnet e altri calcolatori",
      comparisonDesc: "La maggior parte dei calcolatori gestisce solo calcoli matematici RFC di base. DevSubnet integra prenotazioni cloud, generazione IaC e dimensionamento K8s.",
      faqTitle: "Domande frequenti (FAQ)",
      faqViewAll: "Visualizza tutte le domande →",
      ctaPrimary: "Avvia calcolo subnet",
      ctaSecondary: "Prova partizionamento visivo"
    },
    footer: {
      tagline: "DEVSUBNET.COM / PROGETTATO PER RETI CHIARE",
      about: "Chi Siamo",
      contact: "Contatti",
      privacy: "Informativa sulla privacy",
      terms: "Termini di servizio",
      cookiePolicy: "Informativa sui cookie",
      faq: "FAQ",
      noData: "NESSUN DATO LASCIA IL TUO DISPOSITIVO"
    }
  }
};
