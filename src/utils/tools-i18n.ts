import type { SupportedLanguage } from './i18n';

export interface SplitterTranslations {
  step1: string;
  title: string;
  badge: string;
  desc: string;
  baseIpLabel: string;
  resetBtn: string;
  presetLabel: string;
  presetDefault: string;
  presetAws: string;
  presetHub: string;
  presetK8s: string;
  dualStackLabel: string;
  dualStackHint: string;
  v6BaseLabel: string;
  errorInvalid: string;
  allocatedSpace: string;
  step2: string;
  subnetsList: string;
  copyJson: string;
  thLabel: string;
  thCidr: string;
  thUsable: string;
  thHosts: string;
  thAction: string;
  btnSplit: string;
  btnMerge: string;
  asideKicker: string;
  asideTitle: string;
  asideDesc: string;
  copyCode: string;
  copied: string;
}

export interface K8sTranslations {
  step1: string;
  title: string;
  badge: string;
  podCidrLabel: string;
  podsPerNodeLabel: string;
  podsOption30: string;
  podsOption64: string;
  podsOption110: string;
  podsOption250: string;
  nodeScaleLabel: string;
  nodeSuffix: string;
  serviceCidrLabel: string;
  step2: string;
  allocationTitle: string;
  copyJson: string;
  nodeAllocLabel: string;
  nodeAllocSuffix: string;
  maxNodesLabel: string;
  statusSupported: string;
  statusRisk: string;
  maxPodScaleLabel: string;
  usablePodsNote: string;
  asideKicker: string;
  asideTitle: string;
  asideDesc: string;
  totalCapacityLabel: string;
  addressesTotal: string;
  utilLabel: string;
  statusSafe: string;
  statusTight: string;
  statusCritical: string;
  copied: string;
}

export interface IPv6Translations {
  step1: string;
  title: string;
  badge: string;
  ipLabel: string;
  prefixLabel: string;
  errorInvalid: string;
  step2: string;
  detailsTitle: string;
  copyJson: string;
  compressedLabel: string;
  boundsLabel: string;
  typeLabel: string;
  capacityLabel: string;
  expandedLabel: string;
  asideKicker: string;
  asideTitle: string;
  asideDesc: string;
  targetPrefixLabel: string;
  option48: string;
  option56: string;
  option64: string;
  option128: string;
  delegatedTotal: string;
  subnetsUnit: string;
  firstRangesTitle: string;
  copied: string;
}

export interface VlsmTranslations {
  step1: string;
  title: string;
  badge: string;
  baseIpLabel: string;
  step2: string;
  requirementsTitle: string;
  thName: string;
  thHosts: string;
  thActions: string;
  placeholderName: string;
  btnAddSegment: string;
  btnCalculate: string;
  errorNotEnough: string;
  asideKicker: string;
  asideTitle: string;
  asideDesc: string;
  thCidr: string;
  thUsable: string;
  thWasted: string;
  initialPrompt: string;
  copyCode: string;
  copied: string;
}

export interface OverlapTranslations {
  step1: string;
  title: string;
  badge: string;
  tabSingle: string;
  tabGroups: string;
  inputLabel: string;
  groupALabel: string;
  groupBLabel: string;
  btnCheck: string;
  btnClear: string;
  errorInvalid: string;
  asideKicker: string;
  asideTitle: string;
  asideDesc: string;
  thSubnetA: string;
  thSubnetB: string;
  thRelationship: string;
  initialPrompt: string;
  noConflicts: string;
  conflictsFound: string;
  relIdentical: string;
  relContains: string;
  relOverlaps: string;
}

export interface SupernetTranslations {
  step1: string;
  title: string;
  badge: string;
  inputLabel: string;
  btnAggregate: string;
  btnClear: string;
  errorInvalid: string;
  asideKicker: string;
  asideTitle: string;
  asideDesc: string;
  bgpCardTitle: string;
  supernetCidrLabel: string;
  ipRangeLabel: string;
  efficiencyLabel: string;
  thCidr: string;
  thRange: string;
  initialPrompt: string;
  copyCode: string;
  copied: string;
}

export interface CloudIntroTranslations {
  aws: { eyebrow: string; title: string; lede: string };
  azure: { eyebrow: string; title: string; lede: string };
  gcp: { eyebrow: string; title: string; lede: string };
}

export interface ToolsTranslationBundle {
  splitter: SplitterTranslations;
  k8s: K8sTranslations;
  ipv6: IPv6Translations;
  vlsm: VlsmTranslations;
  overlap: OverlapTranslations;
  supernet: SupernetTranslations;
  cloudIntros: CloudIntroTranslations;
}

export const toolsI18n: Record<SupportedLanguage, ToolsTranslationBundle> = {
  en: {
    splitter: {
      step1: "01",
      title: "Interactive Subnet Splitter",
      badge: "VISUAL TREE DESIGNER",
      desc: "Divide your address block into custom network segments. Click Split to partition a block in half, edit segment names (e.g., 'Web', 'DB'), or click Merge to combine adjacent siblings back.",
      baseIpLabel: "VPC Base CIDR IP Block",
      resetBtn: "Reset Block",
      presetLabel: "Load Standard Architecture Preset",
      presetDefault: "-- Select a Preset Topology --",
      presetAws: "3-Tier AWS VPC across 3 Availability Zones",
      presetHub: "Hub-and-Spoke VPN Pool",
      presetK8s: "Small Kubernetes Cluster",
      dualStackLabel: "Enable Dual-Stack (IPv4 / IPv6) Planning",
      dualStackHint: "Auto-allocate sequential /64 IPv6 ranges side-by-side with IPv4 subnets.",
      v6BaseLabel: "IPv6 Base CIDR Block",
      errorInvalid: "Invalid IPv4 address base network range.",
      allocatedSpace: "Allocated Network Space",
      step2: "02",
      subnetsList: "Allocated Subnets List",
      copyJson: "Copy JSON",
      thLabel: "Label",
      thCidr: "CIDR Range",
      thUsable: "Usable IP Range",
      thHosts: "Usable Hosts",
      thAction: "Split/Merge",
      btnSplit: "Split",
      btnMerge: "Merge",
      asideKicker: "INFRASTRUCTURE EXPORTER",
      asideTitle: "IaC Manifest",
      asideDesc: "Generate and export structural subnets configs. Ideal for pasting into DevOps automation templates.",
      copyCode: "Copy Code",
      copied: "Copied!"
    },
    k8s: {
      step1: "01",
      title: "Kubernetes Cluster Parameters",
      badge: "K8S PRE-FLIGHT",
      podCidrLabel: "Pod Network CIDR Block",
      podsPerNodeLabel: "Max Pods / Node",
      podsOption30: "30 (GCP Default / Small VMs)",
      podsOption64: "64 (Azure Default)",
      podsOption110: "110 (Standard Default)",
      podsOption250: "250 (High Density Cluster)",
      nodeScaleLabel: "Target Node Capacity Scale",
      nodeSuffix: "Nodes",
      serviceCidrLabel: "Service CIDR Range (ClusterIPs)",
      step2: "02",
      allocationTitle: "Cluster Allocation Capacity",
      copyJson: "Copy JSON",
      nodeAllocLabel: "Node IP Allocation",
      nodeAllocSuffix: "IPs per Node",
      maxNodesLabel: "Max Node Capacity",
      statusSupported: "Supported",
      statusRisk: "Capacity Limit Risk",
      maxPodScaleLabel: "Max Pod Scale",
      usablePodsNote: "Total usable pod IPs",
      asideKicker: "KUBERNETES ANALYSIS",
      asideTitle: "IP Allocation Grid",
      asideDesc: "Visualization of cluster Pod CIDR range usage. High utilization indicates potential scaling limits.",
      totalCapacityLabel: "TOTAL CIDR IP CAPACITY",
      addressesTotal: "Addresses total",
      utilLabel: "CLUSTER IP UTILISATION",
      statusSafe: "Safe",
      statusTight: "Tight",
      statusCritical: "Critical",
      copied: "Copied!"
    },
    ipv6: {
      step1: "01",
      title: "IPv6 Address Parameters",
      badge: "IPv6 STACK",
      ipLabel: "IPv6 Address",
      prefixLabel: "Prefix Length",
      errorInvalid: "Invalid IPv6 address format. Enter valid hexadecimal blocks separated by colons.",
      step2: "02",
      detailsTitle: "Subnet Range Details",
      copyJson: "Copy JSON",
      compressedLabel: "Compressed IPv6 Address",
      boundsLabel: "Address Range Bounds",
      typeLabel: "Address Type Classification",
      capacityLabel: "Total Address Capacity",
      expandedLabel: "Expanded (Uncompressed) IPv6 Form",
      asideKicker: "PREFIX DELEGATION PLANNER",
      asideTitle: "Delegated Blocks",
      asideDesc: "Split your IPv6 block into smaller standard prefixes (like /48, /56, or /64) for sub-allocation.",
      targetPrefixLabel: "Target Prefix Length",
      option48: "/48 (Large Organization Sites)",
      option56: "/56 (Medium Enterprise / Customer sites)",
      option64: "/64 (Standard Local Subnet)",
      option128: "/128 (Single Host Allocations)",
      delegatedTotal: "TOTAL DELEGATED BLOCKS",
      subnetsUnit: "Subnets",
      firstRangesTitle: "First Subnet Ranges",
      copied: "Copied!"
    },
    vlsm: {
      step1: "01",
      title: "VLSM Planner Parameters",
      badge: "VARIABLE-LENGTH SUBNET MASKING",
      baseIpLabel: "Base CIDR Block",
      step2: "02",
      requirementsTitle: "Segment Requirements",
      thName: "Name",
      thHosts: "Hosts Needed",
      thActions: "Actions",
      placeholderName: "Segment name",
      btnAddSegment: "+ Add Segment",
      btnCalculate: "Calculate VLSM",
      errorNotEnough: "Not enough address space to satisfy all segment requirements. Reduce host counts or use a larger base block.",
      asideKicker: "VLSM ALLOCATION",
      asideTitle: "Allocated Subnets",
      asideDesc: "Subnets are allocated from largest to smallest with minimal wasted space.",
      thCidr: "CIDR",
      thUsable: "Usable",
      thWasted: "Wasted",
      initialPrompt: "Enter segment requirements and click Calculate VLSM.",
      copyCode: "Copy Code",
      copied: "Copied!"
    },
    overlap: {
      step1: "01",
      title: "Overlap Mode & Subnets",
      badge: "OVERLAP DETECTOR",
      tabSingle: "Single List Check",
      tabGroups: "VPC Peering (Two Groups)",
      inputLabel: "CIDR Blocks (one per line, e.g. 10.0.0.0/24 or 2001:db8::/48)",
      groupALabel: "Group A: On-Premises or VPC 1 CIDRs",
      groupBLabel: "Group B: AWS Transit Gateway or VPC 2 CIDRs",
      btnCheck: "Check Conflicts",
      btnClear: "Clear",
      errorInvalid: "One or more entries are not valid CIDR blocks. Format: IP/prefix.",
      asideKicker: "CONFLICT ANALYSIS",
      asideTitle: "Relationships Detected",
      asideDesc: "Compiling address bounds to identify overlapping, duplicate, or nested routing boundaries.",
      thSubnetA: "Subnet A",
      thSubnetB: "Subnet B",
      thRelationship: "Relationship",
      initialPrompt: "Enter CIDRs and click Check Conflicts.",
      noConflicts: "No overlapping CIDRs detected across evaluated ranges.",
      conflictsFound: "Conflicts detected between network boundaries!",
      relIdentical: "Identical Duplicate",
      relContains: "Encloses Subnet",
      relOverlaps: "Collides / Overlaps"
    },
    supernet: {
      step1: "01",
      title: "Networks to Aggregate",
      badge: "SUPERNETTING / ROUTE SUMMARIZATION",
      inputLabel: "Contiguous CIDR blocks (one per line)",
      btnAggregate: "Aggregate",
      btnClear: "Clear",
      errorInvalid: "Enter valid CIDR blocks — one per line.",
      asideKicker: "SUMMARY ROUTES",
      asideTitle: "Aggregated Result",
      asideDesc: "A single summary route reduces routing table size and accelerates convergence.",
      bgpCardTitle: "Smallest Bounding Supernet (BGP Summary)",
      supernetCidrLabel: "Supernet CIDR:",
      ipRangeLabel: "IP Range:",
      efficiencyLabel: "Space Efficiency:",
      thCidr: "CIDR",
      thRange: "Range",
      initialPrompt: "Enter CIDR blocks and click Aggregate.",
      copyCode: "Copy",
      copied: "Copied!"
    },
    cloudIntros: {
      aws: {
        eyebrow: "AWS VPC NETWORKING / 5 RESERVED IPS",
        title: "AWS VPC Subnet Calculator & CIDR Planner",
        lede: "Calculate AWS VPC subnets with automatic accounting for the 5 reserved IP addresses in every subnet (network, VPC router, DNS, future use, and broadcast)."
      },
      azure: {
        eyebrow: "AZURE VNET NETWORKING / 5 RESERVED IPS",
        title: "Azure VNet Subnet Calculator & CIDR Planner",
        lede: "Plan Azure Virtual Network subnets accounting for Azure's 5 reserved IP addresses per subnet, GatewaySubnet requirements, and peering boundaries."
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4 RESERVED IPS",
        title: "Google Cloud (GCP) VPC Subnet Calculator",
        lede: "Design GCP VPC subnets with automatic deduction of the 4 reserved IPs (network, gateway, future reservation, and broadcast) across regional CIDR ranges."
      }
    }
  },
  de: {
    splitter: {
      step1: "01",
      title: "Interaktiver Subnetz-Splitter",
      badge: "VISUELLER BAUM-DESIGNER",
      desc: "Teilen Sie Ihren Adressblock in benutzerdefinierte Netzwerksegmente auf. Klicken Sie auf Teilen, um einen Block zu halbieren, oder auf Zusammenführen, um benachbarte Segmente wieder zu vereinen.",
      baseIpLabel: "VPC-Basis-CIDR IP-Block",
      resetBtn: "Block zurücksetzen",
      presetLabel: "Standard-Architektur-Vorlage laden",
      presetDefault: "-- Wählen Sie eine Vorlage --",
      presetAws: "3-Tier AWS VPC über 3 Verfügbarkeitszonen",
      presetHub: "Hub-and-Spoke VPN-Pool",
      presetK8s: "Kleiner Kubernetes-Cluster",
      dualStackLabel: "Dual-Stack (IPv4 / IPv6) Planung aktivieren",
      dualStackHint: "Automatische Zuweisung sequenzieller /64 IPv6-Bereiche parallel zu IPv4-Subnetzen.",
      v6BaseLabel: "IPv6-Basis-CIDR-Block",
      errorInvalid: "Ungültiger IPv4-Basis-Netzwerkbereich.",
      allocatedSpace: "Zugewiesener Netzwerk-Adressraum",
      step2: "02",
      subnetsList: "Liste zugewiesener Subnetze",
      copyJson: "JSON kopieren",
      thLabel: "Bezeichnung",
      thCidr: "CIDR-Bereich",
      thUsable: "Nutzbarer IP-Bereich",
      thHosts: "Nutzbare Hosts",
      thAction: "Teilen/Zusammenführen",
      btnSplit: "Teilen",
      btnMerge: "Zusammenführen",
      asideKicker: "INFRASTRUKTUR-EXPORTER",
      asideTitle: "IaC-Manifest",
      asideDesc: "Strukturierte Subnetz-Konfigurationen generieren und exportieren. Ideal für DevOps-Automatisierung.",
      copyCode: "Code kopieren",
      copied: "Kopiert!"
    },
    k8s: {
      step1: "01",
      title: "Kubernetes-Cluster-Parameter",
      badge: "K8S PRE-FLIGHT",
      podCidrLabel: "Pod-Netzwerk CIDR-Block",
      podsPerNodeLabel: "Max. Pods pro Node",
      podsOption30: "30 (GCP Standard / Kleine VMs)",
      podsOption64: "64 (Azure Standard)",
      podsOption110: "110 (Kubernetes Standard / EKS)",
      podsOption250: "250 (High-Density Cluster)",
      nodeScaleLabel: "Ziel-Node-Kapazität",
      nodeSuffix: "Nodes",
      serviceCidrLabel: "Service-CIDR-Bereich (ClusterIPs)",
      step2: "02",
      allocationTitle: "Cluster-Zuweisungskapazität",
      copyJson: "JSON kopieren",
      nodeAllocLabel: "Node-IP-Zuweisung",
      nodeAllocSuffix: "IPs pro Node",
      maxNodesLabel: "Max. Node-Kapazität",
      statusSupported: "Unterstützt",
      statusRisk: "Kapazitätsgrenzen-Risiko",
      maxPodScaleLabel: "Max. Pod-Skalierung",
      usablePodsNote: "Gesamte nutzbare Pod-IPs",
      asideKicker: "KUBERNETES-ANALYSE",
      asideTitle: "IP-Zuweisungsraster",
      asideDesc: "Visualisierung der Auslastung des Cluster-Pod-CIDR-Bereichs.",
      totalCapacityLabel: "GESAMTE CIDR-IP-KAPAZITÄT",
      addressesTotal: "Adressen gesamt",
      utilLabel: "CLUSTER-IP-AUSLASTUNG",
      statusSafe: "Sicher",
      statusTight: "Knapp",
      statusCritical: "Kritisch",
      copied: "Kopiert!"
    },
    ipv6: {
      step1: "01",
      title: "IPv6-Adressparameter",
      badge: "IPv6-STACK",
      ipLabel: "IPv6-Adresse",
      prefixLabel: "Präfixlänge",
      errorInvalid: "Ungültiges IPv6-Format. Geben Sie hexadezimale Blöcke getrennt durch Doppelpunkte ein.",
      step2: "02",
      detailsTitle: "Subnetz-Bereichsdetails",
      copyJson: "JSON kopieren",
      compressedLabel: "Komprimierte IPv6-Adresse",
      boundsLabel: "Adressbereichs-Grenzen",
      typeLabel: "Adresstyp-Klassifizierung",
      capacityLabel: "Gesamte Adresskapazität",
      expandedLabel: "Erweiterte (unkomprimierte) IPv6-Form",
      asideKicker: "PRÄFIX-DELEGATIONS-PLANER",
      asideTitle: "Delegierte Blöcke",
      asideDesc: "Teilen Sie Ihren IPv6-Block in kleinere Standardpräfixe (z. B. /48, /56 oder /64) auf.",
      targetPrefixLabel: "Ziel-Präfixlänge",
      option48: "/48 (Große Unternehmensstandorte)",
      option56: "/56 (Mittelständische Unternehmen / Kunden)",
      option64: "/64 (Standard-Lokal-Subnetz)",
      option128: "/128 (Einzelne Host-Zuweisung)",
      delegatedTotal: "GESAMT DELEGIERTE BLÖCKE",
      subnetsUnit: "Subnetze",
      firstRangesTitle: "Erste Subnetz-Bereiche",
      copied: "Kopiert!"
    },
    vlsm: {
      step1: "01",
      title: "VLSM-Planer-Parameter",
      badge: "VARIABLE-LENGTH SUBNET MASKING",
      baseIpLabel: "Basis-CIDR-Block",
      step2: "02",
      requirementsTitle: "Segment-Anforderungen",
      thName: "Name",
      thHosts: "Benötigte Hosts",
      thActions: "Aktionen",
      placeholderName: "Segment-Name",
      btnAddSegment: "+ Segment hinzufügen",
      btnCalculate: "VLSM berechnen",
      errorNotEnough: "Nicht genügend Adressraum für alle Segmente. Reduzieren Sie die Host-Zahlen oder vergrößern Sie den Basis-Block.",
      asideKicker: "VLSM-ZUWEISUNG",
      asideTitle: "Zugewiesene Subnetze",
      asideDesc: "Subnetze werden vom größten zum kleinsten segmentiert, um Adressverschwendung zu minimieren.",
      thCidr: "CIDR",
      thUsable: "Nutzbar",
      thWasted: "Ungenutzt",
      initialPrompt: "Geben Sie Anforderungen ein und klicken Sie auf VLSM berechnen.",
      copyCode: "Code kopieren",
      copied: "Kopiert!"
    },
    overlap: {
      step1: "01",
      title: "Überlappungsmodus & Subnetze",
      badge: "ÜBERLAPPUNGS-DETEKTOR",
      tabSingle: "Einzellisten-Prüfung",
      tabGroups: "VPC-Peering (Zwei Gruppen)",
      inputLabel: "CIDR-Blöcke (einer pro Zeile, z. B. 10.0.0.0/24 oder 2001:db8::/48)",
      groupALabel: "Gruppe A: On-Premises oder VPC 1 CIDRs",
      groupBLabel: "Gruppe B: AWS Transit Gateway oder VPC 2 CIDRs",
      btnCheck: "Konflikte prüfen",
      btnClear: "Löschen",
      errorInvalid: "Ein oder mehrere Einträge sind ungültige CIDR-Blöcke.",
      asideKicker: "KONFLIKT-ANALYSE",
      asideTitle: "Erkannte Beziehungen",
      asideDesc: "Adressgrenzen abgleichen, um überlappende, doppelte oder verschachtelte Routing-Grenzen zu identifizieren.",
      thSubnetA: "Subnetz A",
      thSubnetB: "Subnetz B",
      thRelationship: "Beziehung",
      initialPrompt: "CIDRs eingeben und auf Konflikte prüfen klicken.",
      noConflicts: "Keine überlappenden CIDRs in den geprüften Bereichen erkannt.",
      conflictsFound: "Konflikte zwischen Netzwerkgrenzen erkannt!",
      relIdentical: "Identisches Duplikat",
      relContains: "Umschließt Subnetz",
      relOverlaps: "Kollidiert / Überlappt"
    },
    supernet: {
      step1: "01",
      title: "Zu aggregierende Netzwerke",
      badge: "SUPERNETTING / ROUTEN-AGGREGATION",
      inputLabel: "Zusammenhängende CIDR-Blöcke (einer pro Zeile)",
      btnAggregate: "Aggregieren",
      btnClear: "Löschen",
      errorInvalid: "Gültige CIDR-Blöcke eingeben — einer pro Zeile.",
      asideKicker: "ROUTEN-ZUSAMMENFASSUNG",
      asideTitle: "Aggregiertes Ergebnis",
      asideDesc: "Eine zusammenfassende Route reduziert Routingtabellen-Größen und beschleunigt die Konvergenz.",
      bgpCardTitle: "Kleinstes begrenzendes Supernetz (BGP-Zusammenfassung)",
      supernetCidrLabel: "Supernetz CIDR:",
      ipRangeLabel: "IP-Bereich:",
      efficiencyLabel: "Raumeffizienz:",
      thCidr: "CIDR",
      thRange: "Bereich",
      initialPrompt: "CIDR-Blöcke eingeben und auf Aggregieren klicken.",
      copyCode: "Kopieren",
      copied: "Kopiert!"
    },
    cloudIntros: {
      aws: {
        eyebrow: "AWS VPC NETZWERK / 5 RESERVIERTE IPS",
        title: "AWS VPC Subnetz-Rechner & CIDR-Planer",
        lede: "Berechnen Sie AWS VPC-Subnetze unter automatischer Berücksichtigung der 5 reservierten IP-Adressen in jedem Subnetz (Netzwerk, VPC-Router, DNS, Zukunft und Broadcast)."
      },
      azure: {
        eyebrow: "AZURE VNET NETZWERK / 5 RESERVIERTE IPS",
        title: "Azure VNet Subnetz-Rechner & CIDR-Planer",
        lede: "Planen Sie Azure Virtual Network-Subnetze unter Berücksichtigung der 5 reservierten IP-Adressen von Azure, GatewaySubnet-Anforderungen und Peering-Grenzen."
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4 RESERVIERTE IPS",
        title: "Google Cloud (GCP) VPC Subnetz-Rechner",
        lede: "Entwerfen Sie GCP VPC-Subnetze mit automatischem Abzug der 4 reservierten IPs (Netzwerk, Gateway, Zukunft und Broadcast) über regionale CIDR-Bereiche."
      }
    }
  },
  es: {
    splitter: {
      step1: "01",
      title: "Divisor Interactivo de Subredes",
      badge: "DISEÑADOR DE ÁRBOL VISUAL",
      desc: "Divida su bloque de direcciones en segmentos personalizados. Haga clic en Dividir para partir un bloque por la mitad, o en Unir para recombinar segmentos adyacentes.",
      baseIpLabel: "Bloque IP CIDR Base de VPC",
      resetBtn: "Restablecer Bloque",
      presetLabel: "Cargar Plantilla de Arquitectura Estándar",
      presetDefault: "-- Seleccione una Topología --",
      presetAws: "VPC AWS de 3 Niveles en 3 Zonas de Disponibilidad",
      presetHub: "Pool VPN Hub-and-Spoke",
      presetK8s: "Cluster Pequeño de Kubernetes",
      dualStackLabel: "Habilitar Planificación Dual-Stack (IPv4 / IPv6)",
      dualStackHint: "Asigna automáticamente rangos IPv6 /64 secuenciales junto a las subredes IPv4.",
      v6BaseLabel: "Bloque CIDR Base IPv6",
      errorInvalid: "Rango de red base IPv4 inválido.",
      allocatedSpace: "Espacio de Red Asignado",
      step2: "02",
      subnetsList: "Lista de Subredes Asignadas",
      copyJson: "Copiar JSON",
      thLabel: "Etiqueta",
      thCidr: "Rango CIDR",
      thUsable: "Rango de IPs Usables",
      thHosts: "Hosts Usables",
      thAction: "Dividir/Unir",
      btnSplit: "Dividir",
      btnMerge: "Unir",
      asideKicker: "EXPORTADOR DE INFRAESTRUCTURA",
      asideTitle: "Manifiesto IaC",
      asideDesc: "Genere y exporte configuraciones de subredes. Ideal para automatización en DevOps.",
      copyCode: "Copiar Código",
      copied: "¡Copiado!"
    },
    k8s: {
      step1: "01",
      title: "Parámetros del Clúster Kubernetes",
      badge: "K8S PRE-FLIGHT",
      podCidrLabel: "Bloque CIDR de Red de Pods",
      podsPerNodeLabel: "Pods Máx. por Nodo",
      podsOption30: "30 (Predeterminado GCP / VMs Pequeñas)",
      podsOption64: "64 (Predeterminado Azure)",
      podsOption110: "110 (Predeterminado Estándar / EKS)",
      podsOption250: "250 (Clúster de Alta Densidad)",
      nodeScaleLabel: "Escala Objetivo de Capacidad de Nodos",
      nodeSuffix: "Nodos",
      serviceCidrLabel: "Rango CIDR de Servicios (ClusterIPs)",
      step2: "02",
      allocationTitle: "Capacidad de Asignación del Clúster",
      copyJson: "Copiar JSON",
      nodeAllocLabel: "Asignación de IP por Nodo",
      nodeAllocSuffix: "IPs por Nodo",
      maxNodesLabel: "Capacidad Máx. de Nodos",
      statusSupported: "Soportado",
      statusRisk: "Riesgo de Límite",
      maxPodScaleLabel: "Escala Máxima de Pods",
      usablePodsNote: "Total de IPs útiles para pods",
      asideKicker: "ANÁLISIS DE KUBERNETES",
      asideTitle: "Cuadrícula de Asignación de IP",
      asideDesc: "Visualización del uso del rango CIDR de Pods del clúster.",
      totalCapacityLabel: "CAPACIDAD TOTAL DE IP CIDR",
      addressesTotal: "Direcciones en total",
      utilLabel: "UTILIZACIÓN DE IP DEL CLÚSTER",
      statusSafe: "Seguro",
      statusTight: "Ajustado",
      statusCritical: "Crítico",
      copied: "¡Copiado!"
    },
    ipv6: {
      step1: "01",
      title: "Parámetros de Dirección IPv6",
      badge: "PILA IPv6",
      ipLabel: "Dirección IPv6",
      prefixLabel: "Longitud del Prefijo",
      errorInvalid: "Formato IPv6 inválido. Ingrese bloques hexadecimales separados por dos puntos.",
      step2: "02",
      detailsTitle: "Detalles del Rango de Subred",
      copyJson: "Copiar JSON",
      compressedLabel: "Dirección IPv6 Comprimida",
      boundsLabel: "Límites del Rango de Direcciones",
      typeLabel: "Clasificación de Tipo de Dirección",
      capacityLabel: "Capacidad Total de Direcciones",
      expandedLabel: "Forma IPv6 Expandida (Sin comprimir)",
      asideKicker: "PLANIFICADOR DE DELEGACIÓN DE PREFIJOS",
      asideTitle: "Bloques Delegados",
      asideDesc: "Divida su bloque IPv6 en prefijos estándar menores (/48, /56 o /64) para subasignación.",
      targetPrefixLabel: "Longitud del Prefijo Objetivo",
      option48: "/48 (Grandes Organizaciones)",
      option56: "/56 (Empresas Medianas / Clientes)",
      option64: "/64 (Subred Local Estándar)",
      option128: "/128 (Asignación de Host Individual)",
      delegatedTotal: "TOTAL DE BLOQUES DELEGADOS",
      subnetsUnit: "Subredes",
      firstRangesTitle: "Primeros Rangos de Subred",
      copied: "¡Copiado!"
    },
    vlsm: {
      step1: "01",
      title: "Parámetros del Planificador VLSM",
      badge: "VARIABLE-LENGTH SUBNET MASKING",
      baseIpLabel: "Bloque CIDR Base",
      step2: "02",
      requirementsTitle: "Requisitos de Segmentos",
      thName: "Nombre",
      thHosts: "Hosts Necesarios",
      thActions: "Acciones",
      placeholderName: "Nombre del segmento",
      btnAddSegment: "+ Agregar Segmento",
      btnCalculate: "Calcular VLSM",
      errorNotEnough: "Espacio insuficiente para todos los segmentos. Reduzca hosts o amplíe el bloque base.",
      asideKicker: "ASIGNACIÓN VLSM",
      asideTitle: "Subredes Asignadas",
      asideDesc: "Las subredes se asignan de mayor a menor con el mínimo desperdicio de direcciones.",
      thCidr: "CIDR",
      thUsable: "Usable",
      thWasted: "Desperdiciado",
      initialPrompt: "Ingrese requisitos y haga clic en Calcular VLSM.",
      copyCode: "Copiar Código",
      copied: "¡Copiado!"
    },
    overlap: {
      step1: "01",
      title: "Modo de Superposición y Subredes",
      badge: "DETECTOR DE SUPERPOSICIONES",
      tabSingle: "Verificación de Lista Única",
      tabGroups: "VPC Peering (Dos Grupos)",
      inputLabel: "Bloques CIDR (uno por línea, ej. 10.0.0.0/24 o 2001:db8::/48)",
      groupALabel: "Grupo A: CIDRs On-Premises o VPC 1",
      groupBLabel: "Grupo B: CIDRs AWS Transit Gateway o VPC 2",
      btnCheck: "Comprobar Conflictos",
      btnClear: "Borrar",
      errorInvalid: "Una o más entradas no son bloques CIDR válidos.",
      asideKicker: "ANÁLISIS DE CONFLICTOS",
      asideTitle: "Relaciones Detectadas",
      asideDesc: "Compilando límites de direcciones para identificar colisiones o duplicados de enrutamiento.",
      thSubnetA: "Subred A",
      thSubnetB: "Subred B",
      thRelationship: "Relación",
      initialPrompt: "Ingrese CIDRs y haga clic en Comprobar Conflictos.",
      noConflicts: "No se detectaron CIDRs superpuestos en los rangos evaluados.",
      conflictsFound: "¡Se detectaron conflictos entre límites de red!",
      relIdentical: "Duplicado Idéntico",
      relContains: "Contiene Subred",
      relOverlaps: "Colisiona / Se superpone"
    },
    supernet: {
      step1: "01",
      title: "Redes a Agregar",
      badge: "SUPERREDES / RESUMEN DE RUTAS",
      inputLabel: "Bloques CIDR contiguos (uno por línea)",
      btnAggregate: "Agregar",
      btnClear: "Borrar",
      errorInvalid: "Ingrese bloques CIDR válidos — uno por línea.",
      asideKicker: "RUTAS DE RESUMEN",
      asideTitle: "Resultado Agregado",
      asideDesc: "Una ruta de resumen única reduce el tamaño de las tablas de enrutamiento y acelera la convergencia.",
      bgpCardTitle: "Superred Delimitadora Menor (Resumen BGP)",
      supernetCidrLabel: "CIDR de Superred:",
      ipRangeLabel: "Rango de IP:",
      efficiencyLabel: "Eficiencia de Espacio:",
      thCidr: "CIDR",
      thRange: "Rango",
      initialPrompt: "Ingrese bloques CIDR y haga clic en Agregar.",
      copyCode: "Copiar",
      copied: "¡Copiado!"
    },
    cloudIntros: {
      aws: {
        eyebrow: "REDES AWS VPC / 5 IPS RESERVADAS",
        title: "Calculadora de Subredes AWS VPC y Planificador CIDR",
        lede: "Calcule subredes AWS VPC considerando automáticamente las 5 direcciones IP reservadas en cada subred (red, router VPC, DNS, uso futuro y broadcast)."
      },
      azure: {
        eyebrow: "REDES AZURE VNET / 5 IPS RESERVADAS",
        title: "Calculadora de Subredes Azure VNet y Planificador CIDR",
        lede: "Planifique subredes Azure Virtual Network considerando las 5 direcciones IP reservadas por Azure, requisitos de GatewaySubnet y límites de peering."
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4 IPS RESERVADAS",
        title: "Calculadora de Subredes Google Cloud (GCP) VPC",
        lede: "Diseñe subredes VPC de Google Cloud deduciendo automáticamente las 4 IPs reservadas (red, gateway, reserva futura y broadcast) a través de rangos regionales."
      }
    }
  },
  ja: {
    splitter: {
      step1: "01",
      title: "インタラクティブ・サブネットスプリッター",
      badge: "ビジュアルツリーデザイナー",
      desc: "ネットワークブロックをカスタムセグメントに分割します。「分割」で半分に分け、「結合」で元に戻せます。",
      baseIpLabel: "VPCベースCIDR IPブロック",
      resetBtn: "ブロックをリセット",
      presetLabel: "標準アーキテクチャプリセットを読み込む",
      presetDefault: "-- プリセット構成を選択 --",
      presetAws: "3AZ構成の3層AWS VPC",
      presetHub: "ハブ＆スポーク型VPNプール",
      presetK8s: "小規模Kubernetesクラスター",
      dualStackLabel: "デュアルスタック (IPv4 / IPv6) 計画を有効化",
      dualStackHint: "IPv4サブネットと並行して順次/64 IPv6範囲を自動割り当てします。",
      v6BaseLabel: "IPv6ベースCIDRブロック",
      errorInvalid: "無効なIPv4ベースネットワーク範囲です。",
      allocatedSpace: "割り当て済みネットワーク空間",
      step2: "02",
      subnetsList: "割り当て済みサブネット一覧",
      copyJson: "JSONをコピー",
      thLabel: "ラベル",
      thCidr: "CIDR範囲",
      thUsable: "利用可能IP範囲",
      thHosts: "利用可能ホスト",
      thAction: "分割/結合",
      btnSplit: "分割",
      btnMerge: "結合",
      asideKicker: "インフラストラクチャエクスポート",
      asideTitle: "IaCマニフェスト",
      asideDesc: "構造化サブネット設定を生成・エクスポート。DevOps自動化に最適です。",
      copyCode: "コードをコピー",
      copied: "コピーしました！"
    },
    k8s: {
      step1: "01",
      title: "Kubernetes クラスター パラメーター",
      badge: "K8S プレフライト",
      podCidrLabel: "PodネットワークCIDRブロック",
      podsPerNodeLabel: "ノードあたり最大Pod数",
      podsOption30: "30 (GCP標準 / 小型VM)",
      podsOption64: "64 (Azure標準)",
      podsOption110: "110 (Kubernetes標準 / EKS)",
      podsOption250: "250 (高密度クラスター)",
      nodeScaleLabel: "目標ノード数規模",
      nodeSuffix: "ノード",
      serviceCidrLabel: "Service CIDR範囲 (ClusterIPs)",
      step2: "02",
      allocationTitle: "クラスター割り当てキャパシティ",
      copyJson: "JSONをコピー",
      nodeAllocLabel: "ノードIP割り当て",
      nodeAllocSuffix: "IP/ノード",
      maxNodesLabel: "最大ノード容量",
      statusSupported: "対応",
      statusRisk: "容量上限リスク",
      maxPodScaleLabel: "最大Pod規模",
      usablePodsNote: "総利用可能Pod IP数",
      asideKicker: "KUBERNETES 分析",
      asideTitle: "IP割り当てグリッド",
      asideDesc: "クラスターPod CIDR範囲の使用率の可視化。",
      totalCapacityLabel: "総CIDR IP容量",
      addressesTotal: "アドレス総数",
      utilLabel: "クラスターIP使用率",
      statusSafe: "安全",
      statusTight: "注意",
      statusCritical: "危険",
      copied: "コピーしました！"
    },
    ipv6: {
      step1: "01",
      title: "IPv6 アドレス パラメーター",
      badge: "IPv6 スタック",
      ipLabel: "IPv6 アドレス",
      prefixLabel: "プレフィックス長",
      errorInvalid: "無効なIPv6アドレス形式です。コロンで区切られた16進数を入力してください。",
      step2: "02",
      detailsTitle: "サブネット範囲詳細",
      copyJson: "JSONをコピー",
      compressedLabel: "圧縮表記 IPv6 アドレス",
      boundsLabel: "アドレス範囲境界",
      typeLabel: "アドレス種別分類",
      capacityLabel: "総アドレス容量",
      expandedLabel: "非圧縮（完全展開）形式",
      asideKicker: "プレフィックス移任プランナー",
      asideTitle: "委任ブロック",
      asideDesc: "IPv6ブロックを小さな標準プレフィックス（/48、/56、/64など）に分割。",
      targetPrefixLabel: "目標プレフィックス長",
      option48: "/48 (大規模組織拠点)",
      option56: "/56 (中規模エンタープライズ / 顧客)",
      option64: "/64 (標準ローカルサブネット)",
      option128: "/128 (個別ホスト割り当て)",
      delegatedTotal: "総委任ブロック数",
      subnetsUnit: "サブネット",
      firstRangesTitle: "先頭サブネット範囲",
      copied: "コピーしました！"
    },
    vlsm: {
      step1: "01",
      title: "VLSM プランナー パラメーター",
      badge: "可変長サブネットマスク (VLSM)",
      baseIpLabel: "ベースCIDRブロック",
      step2: "02",
      requirementsTitle: "セグメント要件",
      thName: "名称",
      thHosts: "必要ホスト数",
      thActions: "操作",
      placeholderName: "セグメント名",
      btnAddSegment: "+ セグメントを追加",
      btnCalculate: "VLSMを計算",
      errorNotEnough: "アドレス空間が不足しています。ホスト数を減らすか親ブロックを拡大してください。",
      asideKicker: "VLSM 割り当て",
      asideTitle: "割り当てサブネット",
      asideDesc: "アドレス無駄を最小限に抑え、大きいセグメントから順に割り当てます。",
      thCidr: "CIDR",
      thUsable: "利用可能",
      thWasted: "余剰/無駄",
      initialPrompt: "要件を入力して「VLSMを計算」をクリックしてください。",
      copyCode: "コードをコピー",
      copied: "コピーしました！"
    },
    overlap: {
      step1: "01",
      title: "重複判定モード & サブネット",
      badge: "重複検出ツール",
      tabSingle: "単一リスト検証",
      tabGroups: "VPCピアリング (2グループ)",
      inputLabel: "CIDRブロック (1行に1つ、例: 10.0.0.0/24 または 2001:db8::/48)",
      groupALabel: "グループA: オンプレミスまたはVPC 1 CIDR",
      groupBLabel: "グループB: AWS Transit GatewayまたはVPC 2 CIDR",
      btnCheck: "競合をチェック",
      btnClear: "クリア",
      errorInvalid: "無効なCIDRブロックが含まれています。",
      asideKicker: "競合分析",
      asideTitle: "検出された関係性",
      asideDesc: "重複、包含、重複ルーティング境界を分析します。",
      thSubnetA: "サブネット A",
      thSubnetB: "サブネット B",
      thRelationship: "関係性",
      initialPrompt: "CIDRを入力して「競合をチェック」をクリックしてください。",
      noConflicts: "評価された範囲内にCIDRの重複は検出されませんでした。",
      conflictsFound: "ネットワーク境界間で競合が検出されました！",
      relIdentical: "同一の重複",
      relContains: "サブネットを包含",
      relOverlaps: "衝突 / 重複"
    },
    supernet: {
      step1: "01",
      title: "集約対象ネットワーク",
      badge: "スーパーネッティング / 経路集約",
      inputLabel: "連続するCIDRブロック (1行に1つ)",
      btnAggregate: "集約を実行",
      btnClear: "クリア",
      errorInvalid: "有効なCIDRブロックを1行に入力してください。",
      asideKicker: "集約ルート",
      asideTitle: "集約結果",
      asideDesc: "単一の集約ルートによりルーティングテーブルを削減し収束を高速化します。",
      bgpCardTitle: "最小境界スーパーネット (BGP集約)",
      supernetCidrLabel: "スーパーネット CIDR:",
      ipRangeLabel: "IP範囲:",
      efficiencyLabel: "空間効率:",
      thCidr: "CIDR",
      thRange: "範囲",
      initialPrompt: "CIDRを入力して「集約を実行」をクリックしてください。",
      copyCode: "コピー",
      copied: "コピーしました！"
    },
    cloudIntros: {
      aws: {
        eyebrow: "AWS VPC ネットワーク / 5個の予約IP",
        title: "AWS VPC サブネット計算機 & CIDRプランナー",
        lede: "サブネットごとにAWSが予約する5個のIP（ネットワーク、VPCルーター、DNS、将来予約、ブロードキャスト）を自動考慮して計算。"
      },
      azure: {
        eyebrow: "AZURE VNET ネットワーク / 5個の予約IP",
        title: "Azure VNet サブネット計算機 & CIDRプランナー",
        lede: "Azureが予約する5個のIP、GatewaySubnetの要件、ピアリング境界を考慮してVNetサブネットを設計。"
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4個の予約IP",
        title: "Google Cloud (GCP) VPC サブネット計算機",
        lede: "GCPで予約される4個のIP（ネットワーク、ゲートウェイ、予約、ブロードキャスト）を差し引いた正確な利用可能ホスト数を計算。"
      }
    }
  },
  fr: {
    splitter: {
      step1: "01",
      title: "Diviseur Interactif de Sous-réseau",
      badge: "CONCEPTEUR ARBORESCENT",
      desc: "Divisez votre bloc d'adresses en segments personnalisés. Cliquez sur Diviser pour diviser un bloc par deux, ou sur Fusionner pour recombiner les segments.",
      baseIpLabel: "Bloc IP CIDR de Base VPC",
      resetBtn: "Réinitialiser",
      presetLabel: "Charger un Modèle d'Architecture Standard",
      presetDefault: "-- Sélectionner une Topologie --",
      presetAws: "VPC AWS 3-Tiers sur 3 Zones de Disponibilité",
      presetHub: "Pool VPN Hub-and-Spoke",
      presetK8s: "Petit Cluster Kubernetes",
      dualStackLabel: "Activer la Planification Dual-Stack (IPv4 / IPv6)",
      dualStackHint: "Allouer automatiquement des plages IPv6 /64 en parallèle des sous-réseaux IPv4.",
      v6BaseLabel: "Bloc CIDR de Base IPv6",
      errorInvalid: "Plage réseau IPv4 invalide.",
      allocatedSpace: "Espace Réseau Alloué",
      step2: "02",
      subnetsList: "Liste des Sous-réseaux Alloués",
      copyJson: "Copier JSON",
      thLabel: "Libellé",
      thCidr: "Plage CIDR",
      thUsable: "Plage d'IP Utiles",
      thHosts: "Hôtes Utiles",
      thAction: "Diviser/Fusionner",
      btnSplit: "Diviser",
      btnMerge: "Fusionner",
      asideKicker: "EXPORTATEUR D'INFRASTRUCTURE",
      asideTitle: "Manifeste IaC",
      asideDesc: "Générez et exportez des configurations de sous-réseaux. Idéal pour les modèles DevOps.",
      copyCode: "Copier le Code",
      copied: "Copié !"
    },
    k8s: {
      step1: "01",
      title: "Paramètres du Cluster Kubernetes",
      badge: "K8S PRE-FLIGHT",
      podCidrLabel: "Bloc CIDR Réseau de Pods",
      podsPerNodeLabel: "Pods Max. par Nœud",
      podsOption30: "30 (Par défaut GCP / Petites VMs)",
      podsOption64: "64 (Par défaut Azure)",
      podsOption110: "110 (Standard / EKS)",
      podsOption250: "250 (Haute Densité)",
      nodeScaleLabel: "Capacité Cible de Nœuds",
      nodeSuffix: "Nœuds",
      serviceCidrLabel: "Plage CIDR de Services (ClusterIPs)",
      step2: "02",
      allocationTitle: "Capacité d'Allocation du Cluster",
      copyJson: "Copier JSON",
      nodeAllocLabel: "Allocation IP par Nœud",
      nodeAllocSuffix: "IPs par Nœud",
      maxNodesLabel: "Capacité Max. de Nœuds",
      statusSupported: "Pris en charge",
      statusRisk: "Risque de Saturation",
      maxPodScaleLabel: "Échelle Max. de Pods",
      usablePodsNote: "Total d'IPs utiles pour pods",
      asideKicker: "ANALYSE KUBERNETES",
      asideTitle: "Grille d'Allocation IP",
      asideDesc: "Visualisation de l'utilisation du bloc CIDR de Pods du cluster.",
      totalCapacityLabel: "CAPACITÉ TOTALE IP CIDR",
      addressesTotal: "Adresses au total",
      utilLabel: "UTILISATION IP DU CLUSTER",
      statusSafe: "Sûr",
      statusTight: "Serré",
      statusCritical: "Critique",
      copied: "Copié !"
    },
    ipv6: {
      step1: "01",
      title: "Paramètres d'Adresse IPv6",
      badge: "PILE IPv6",
      ipLabel: "Adresse IPv6",
      prefixLabel: "Longueur de Préfixe",
      errorInvalid: "Format IPv6 invalide. Entrez des blocs hexadécimaux séparés par des deux-points.",
      step2: "02",
      detailsTitle: "Détails de la Plage de Sous-réseau",
      copyJson: "Copier JSON",
      compressedLabel: "Adresse IPv6 Compressée",
      boundsLabel: "Limites de la Plage d'Adresses",
      typeLabel: "Classification du Type d'Adresse",
      capacityLabel: "Capacité Totale d'Adresses",
      expandedLabel: "Forme IPv6 Développée (Non compressée)",
      asideKicker: "PLANIFICATEUR DE DÉLÉGATION DE PRÉFIXES",
      asideTitle: "Blocs Délégués",
      asideDesc: "Divisez votre bloc IPv6 en sous-préfixes standards (/48, /56 ou /64).",
      targetPrefixLabel: "Longueur de Préfixe Cible",
      option48: "/48 (Grands Sites d'Entreprise)",
      option56: "/56 (Moyennes Entreprises / Clients)",
      option64: "/64 (Sous-réseau Local Standard)",
      option128: "/128 (Allocation d'Hôte Unique)",
      delegatedTotal: "TOTAL DES BLOCS DÉLÉGUÉS",
      subnetsUnit: "Sous-réseaux",
      firstRangesTitle: "Premières Plages de Sous-réseaux",
      copied: "Copié !"
    },
    vlsm: {
      step1: "01",
      title: "Paramètres du Planificateur VLSM",
      badge: "VARIABLE-LENGTH SUBNET MASKING",
      baseIpLabel: "Bloc CIDR de Base",
      step2: "02",
      requirementsTitle: "Besoins par Segment",
      thName: "Nom",
      thHosts: "Hôtes Requis",
      thActions: "Actions",
      placeholderName: "Nom du segment",
      btnAddSegment: "+ Ajouter un Segment",
      btnCalculate: "Calculer VLSM",
      errorNotEnough: "Espace insuffisant pour tous les segments. Réduisez les hôtes ou augmentez le bloc de base.",
      asideKicker: "ALLOCATION VLSM",
      asideTitle: "Sous-réseaux Alloués",
      asideDesc: "Les sous-réseaux sont alloués du plus grand au plus petit avec un gaspillage minimal.",
      thCidr: "CIDR",
      thUsable: "Utile",
      thWasted: "Gaspillé",
      initialPrompt: "Saisissez les besoins et cliquez sur Calculer VLSM.",
      copyCode: "Copier le Code",
      copied: "Copié !"
    },
    overlap: {
      step1: "01",
      title: "Mode de Chevauchement & Sous-réseaux",
      badge: "DÉTECTEUR DE CONFLITS",
      tabSingle: "Vérification Liste Unique",
      tabGroups: "Peering VPC (Deux Groupes)",
      inputLabel: "Blocs CIDR (un par ligne, ex. 10.0.0.0/24 ou 2001:db8::/48)",
      groupALabel: "Groupe A: CIDRs Sur site ou VPC 1",
      groupBLabel: "Groupe B: CIDRs Transit Gateway ou VPC 2",
      btnCheck: "Vérifier les Conflits",
      btnClear: "Effacer",
      errorInvalid: "Une ou plusieurs entrées ne sont pas des blocs CIDR valides.",
      asideKicker: "ANALYSE DE CONFLITS",
      asideTitle: "Relations Détectées",
      asideDesc: "Compilation des limites d'adresses pour identifier les chevauchements et doublons.",
      thSubnetA: "Sous-réseau A",
      thSubnetB: "Sous-réseau B",
      thRelationship: "Relation",
      initialPrompt: "Entrez des CIDR et cliquez sur Vérifier les Conflits.",
      noConflicts: "Aucun chevauchement détecté dans les plages évaluées.",
      conflictsFound: "Conflits détectés entre les limites de réseau !",
      relIdentical: "Doublon Identique",
      relContains: "Englobe le Sous-réseau",
      relOverlaps: "Entre en Collision / Se Chevauche"
    },
    supernet: {
      step1: "01",
      title: "Réseaux à Agréger",
      badge: "SUPERNETTING / AGRÉGATION DE ROUTES",
      inputLabel: "Blocs CIDR contigus (un par ligne)",
      btnAggregate: "Agréger",
      btnClear: "Effacer",
      errorInvalid: "Entrez des blocs CIDR valides — un par ligne.",
      asideKicker: "ROUTES RÉSUMÉES",
      asideTitle: "Résultat Agrégé",
      asideDesc: "Une route résumée unique réduit la taille des tables de routage.",
      bgpCardTitle: "Plus Petit Super-réseau Délimitant (Résumé BGP)",
      supernetCidrLabel: "CIDR de Super-réseau :",
      ipRangeLabel: "Plage IP :",
      efficiencyLabel: "Efficacité d'Espace :",
      thCidr: "CIDR",
      thRange: "Plage",
      initialPrompt: "Entrez les blocs CIDR et cliquez sur Agréger.",
      copyCode: "Copier",
      copied: "Copié !"
    },
    cloudIntros: {
      aws: {
        eyebrow: "RÉSEAU AWS VPC / 5 IPS RÉSERVÉES",
        title: "Calculateur de Sous-réseau AWS VPC & Planificateur CIDR",
        lede: "Calculez les sous-réseaux AWS VPC en tenant compte automatiquement des 5 adresses IP réservées par sous-réseau (réseau, routeur VPC, DNS, futur, broadcast)."
      },
      azure: {
        eyebrow: "RÉSEAU AZURE VNET / 5 IPS RÉSERVÉES",
        title: "Calculateur de Sous-réseau Azure VNet & Planificateur CIDR",
        lede: "Planifiez les sous-réseaux Azure Virtual Network en tenant compte des 5 IP réservées par Azure, des exigences GatewaySubnet et du peering."
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4 IPS RÉSERVÉES",
        title: "Calculateur de Sous-réseau Google Cloud (GCP) VPC",
        lede: "Concevez des sous-réseaux GCP VPC avec déduction automatique des 4 IP réservées (réseau, passerelle, future réservation, broadcast)."
      }
    }
  },
  pt: {
    splitter: {
      step1: "01",
      title: "Divisor Interativo de Sub-redes",
      badge: "DESIGNER VISUAL EM ÁRVORE",
      desc: "Divida seu bloco de endereços em segmentos de rede personalizados. Clique em Dividir para partir um bloco ao meio, ou em Mesclar para recombinar.",
      baseIpLabel: "Bloco IP CIDR Base da VPC",
      resetBtn: "Redefinir Bloco",
      presetLabel: "Carregar Modelo de Arquitetura Padrão",
      presetDefault: "-- Selecione uma Topologia --",
      presetAws: "VPC AWS de 3 Camadas em 3 Zonas de Disponibilidade",
      presetHub: "Pool de VPN Hub-and-Spoke",
      presetK8s: "Cluster Pequeno de Kubernetes",
      dualStackLabel: "Habilitar Planejamento Dual-Stack (IPv4 / IPv6)",
      dualStackHint: "Aloca automaticamente faixas IPv6 /64 sequenciais lado a lado com sub-redes IPv4.",
      v6BaseLabel: "Bloco CIDR Base IPv6",
      errorInvalid: "Faixa de rede base IPv4 inválida.",
      allocatedSpace: "Espaço de Rede Alocado",
      step2: "02",
      subnetsList: "Lista de Sub-redes Alocadas",
      copyJson: "Copiar JSON",
      thLabel: "Rótulo",
      thCidr: "Faixa CIDR",
      thUsable: "Faixa de IPs Úteis",
      thHosts: "Hosts Úteis",
      thAction: "Dividir/Mesclar",
      btnSplit: "Dividir",
      btnMerge: "Mesclar",
      asideKicker: "EXPORTADOR DE INFRAESTRUTURA",
      asideTitle: "Manifesto IaC",
      asideDesc: "Gere e exporte configurações estruturadas de sub-redes. Ideal para automações em DevOps.",
      copyCode: "Copiar Código",
      copied: "Copiado!"
    },
    k8s: {
      step1: "01",
      title: "Parâmetros do Cluster Kubernetes",
      badge: "K8S PRE-FLIGHT",
      podCidrLabel: "Bloco CIDR da Rede de Pods",
      podsPerNodeLabel: "Pods Máx. por Nó",
      podsOption30: "30 (Padrão GCP / VMs Pequenas)",
      podsOption64: "64 (Padrão Azure)",
      podsOption110: "110 (Padrão Kubernetes / EKS)",
      podsOption250: "250 (Alta Densidade)",
      nodeScaleLabel: "Escala Alvo de Capacidade de Nós",
      nodeSuffix: "Nós",
      serviceCidrLabel: "Faixa CIDR de Serviços (ClusterIPs)",
      step2: "02",
      allocationTitle: "Capacidade de Alocação do Cluster",
      copyJson: "Copiar JSON",
      nodeAllocLabel: "Alocação de IP por Nó",
      nodeAllocSuffix: "IPs por Nó",
      maxNodesLabel: "Capacidade Máx. de Nós",
      statusSupported: "Suportado",
      statusRisk: "Risco de Limite",
      maxPodScaleLabel: "Escala Máxima de Pods",
      usablePodsNote: "Total de IPs úteis para pods",
      asideKicker: "ANÁLISE DO KUBERNETES",
      asideTitle: "Grade de Alocação de IP",
      asideDesc: "Visualização do uso da faixa CIDR de Pods do cluster.",
      totalCapacityLabel: "CAPACIDADE TOTAL DE IP CIDR",
      addressesTotal: "Endereços no total",
      utilLabel: "UTILIZAÇÃO DE IP DO CLUSTER",
      statusSafe: "Seguro",
      statusTight: "Apertado",
      statusCritical: "Crítico",
      copied: "Copiado!"
    },
    ipv6: {
      step1: "01",
      title: "Parâmetros de Endereço IPv6",
      badge: "PILHA IPv6",
      ipLabel: "Endereço IPv6",
      prefixLabel: "Comprimento do Prefixo",
      errorInvalid: "Formato IPv6 inválido. Digite blocos hexadecimais separados por dois pontos.",
      step2: "02",
      detailsTitle: "Detalhes da Faixa de Sub-rede",
      copyJson: "Copiar JSON",
      compressedLabel: "Endereço IPv6 Comprimido",
      boundsLabel: "Limites da Faixa de Endereços",
      typeLabel: "Classificação do Tipo de Endereço",
      capacityLabel: "Capacidade Total de Endereços",
      expandedLabel: "Forma IPv6 Expandida (Não comprimida)",
      asideKicker: "PLANEJADOR DE DELEGAÇÃO DE PREFIXO",
      asideTitle: "Blocos Delegados",
      asideDesc: "Divida seu bloco IPv6 em prefixos padrão menores (/48, /56 ou /64).",
      targetPrefixLabel: "Comprimento do Prefixo Alvo",
      option48: "/48 (Grandes Organizações)",
      option56: "/56 (Médias Empresas / Clientes)",
      option64: "/64 (Sub-rede Local Padrão)",
      option128: "/128 (Alocação de Host Único)",
      delegatedTotal: "TOTAL DE BLOCOS DELEGADOS",
      subnetsUnit: "Sub-redes",
      firstRangesTitle: "Primeiras Faixas de Sub-redes",
      copied: "Copiado!"
    },
    vlsm: {
      step1: "01",
      title: "Parâmetros do Planejador VLSM",
      badge: "VARIABLE-LENGTH SUBNET MASKING",
      baseIpLabel: "Bloco CIDR Base",
      step2: "02",
      requirementsTitle: "Requisitos de Segmentos",
      thName: "Nome",
      thHosts: "Hosts Necessários",
      thActions: "Ações",
      placeholderName: "Nome do segmento",
      btnAddSegment: "+ Adicionar Segmento",
      btnCalculate: "Calcular VLSM",
      errorNotEnough: "Espaço insuficiente para todos os segmentos. Reduza hosts ou aumente o bloco base.",
      asideKicker: "ALOCAÇÃO VLSM",
      asideTitle: "Sub-redes Alocadas",
      asideDesc: "Sub-redes são alocadas do maior para o menor com desperdício mínimo.",
      thCidr: "CIDR",
      thUsable: "Útil",
      thWasted: "Desperdiçado",
      initialPrompt: "Insira os requisitos e clique em Calcular VLSM.",
      copyCode: "Copiar Código",
      copied: "Copiado!"
    },
    overlap: {
      step1: "01",
      title: "Modo de Sobreposição & Sub-redes",
      badge: "DETECTOR DE SOBREPOSIÇÃO",
      tabSingle: "Verificação em Lista Única",
      tabGroups: "VPC Peering (Dois Grupos)",
      inputLabel: "Blocos CIDR (um por linha, ex: 10.0.0.0/24 ou 2001:db8::/48)",
      groupALabel: "Grupo A: CIDRs Locais ou VPC 1",
      groupBLabel: "Grupo B: CIDRs AWS Transit Gateway ou VPC 2",
      btnCheck: "Verificar Conflitos",
      btnClear: "Limpar",
      errorInvalid: "Uma ou mais entradas não são blocos CIDR válidos.",
      asideKicker: "ANÁLISE DE CONFLITOS",
      asideTitle: "Relações Detectadas",
      asideDesc: "Compilando limites de endereços para identificar conflitos e duplicatas de roteamento.",
      thSubnetA: "Sub-rede A",
      thSubnetB: "Sub-rede B",
      thRelationship: "Relação",
      initialPrompt: "Insira os CIDRs e clique em Verificar Conflitos.",
      noConflicts: "Nenhuma sobreposição de CIDRs detectada nas faixas avaliadas.",
      conflictsFound: "Conflitos detectados entre os limites de rede!",
      relIdentical: "Duplicata Idêntica",
      relContains: "Contém Sub-rede",
      relOverlaps: "Colide / Sobrepõe"
    },
    supernet: {
      step1: "01",
      title: "Redes para Agregar",
      badge: "SUPER-REDES / RESUMO DE ROTAS",
      inputLabel: "Blocos CIDR contíguos (um por linha)",
      btnAggregate: "Agregar",
      btnClear: "Limpar",
      errorInvalid: "Insira blocos CIDR válidos — um por linha.",
      asideKicker: "ROTAS RESUMIDAS",
      asideTitle: "Resultado Agregado",
      asideDesc: "Uma rota de resumo única reduz o tamanho da tabela de roteamento.",
      bgpCardTitle: "Menor Super-rede Limitante (Resumo BGP)",
      supernetCidrLabel: "CIDR da Super-rede:",
      ipRangeLabel: "Faixa de IP:",
      efficiencyLabel: "Eficiência de Espaço:",
      thCidr: "CIDR",
      thRange: "Faixa",
      initialPrompt: "Insira blocos CIDR e clique em Agregar.",
      copyCode: "Copiar",
      copied: "Copiado!"
    },
    cloudIntros: {
      aws: {
        eyebrow: "REDE AWS VPC / 5 IPS RESERVADOS",
        title: "Calculadora de Sub-rede AWS VPC & Planejador CIDR",
        lede: "Calcule sub-redes AWS VPC considerando automaticamente os 5 endereços IP reservados em cada sub-rede (rede, roteador VPC, DNS, uso futuro e broadcast)."
      },
      azure: {
        eyebrow: "REDE AZURE VNET / 5 IPS RESERVADOS",
        title: "Calculadora de Sub-rede Azure VNet & Planejador CIDR",
        lede: "Planeje sub-redes Azure Virtual Network considerando os 5 IPs reservados da Azure, requisitos de GatewaySubnet e limites de emparelhamento."
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4 IPS RESERVADOS",
        title: "Calculadora de Sub-rede Google Cloud (GCP) VPC",
        lede: "Projete sub-redes VPC do GCP deduzindo automaticamente os 4 IPs reservados (rede, gateway, reserva futura e broadcast) em faixas regionais."
      }
    }
  },
  ko: {
    splitter: {
      step1: "01",
      title: "대화형 서브넷 분할기",
      badge: "비주얼 트리 디자이너",
      desc: "주소 블록을 사용자 지정 네트워크 세그먼트로 분할합니다. '분할'을 클릭하여 블록을 반으로 나누거나 '병합'을 클릭하여 다시 결합할 수 있습니다.",
      baseIpLabel: "VPC 기본 CIDR IP 블록",
      resetBtn: "블록 재설정",
      presetLabel: "표준 아키텍처 사전 설정 불러오기",
      presetDefault: "-- 사전 설정 토폴로지 선택 --",
      presetAws: "3개 가용 영역에 걸친 3계층 AWS VPC",
      presetHub: "허브 앤 스포크 VPN 풀",
      presetK8s: "소규모 Kubernetes 클러스터",
      dualStackLabel: "듀얼 스택 (IPv4 / IPv6) 계획 활성화",
      dualStackHint: "IPv4 서브넷과 함께 순차적인 /64 IPv6 범위를 자동 할당합니다.",
      v6BaseLabel: "IPv6 기본 CIDR 블록",
      errorInvalid: "유효하지 않은 IPv4 기본 네트워크 범위입니다.",
      allocatedSpace: "할당된 네트워크 공간",
      step2: "02",
      subnetsList: "할당된 서브넷 목록",
      copyJson: "JSON 복사",
      thLabel: "레이블",
      thCidr: "CIDR 범위",
      thUsable: "사용 가능 IP 범위",
      thHosts: "사용 가능 호스트",
      thAction: "분할/병합",
      btnSplit: "분할",
      btnMerge: "병합",
      asideKicker: "인프라 내보내기",
      asideTitle: "IaC 매니페스트",
      asideDesc: "구조화된 서브넷 구성을 생성하고 내보냅니다. DevOps 템플릿에 이상적입니다.",
      copyCode: "코드 복사",
      copied: "복사됨!"
    },
    k8s: {
      step1: "01",
      title: "Kubernetes 클러스터 매개변수",
      badge: "K8S 사전 점검",
      podCidrLabel: "Pod 네트워크 CIDR 블록",
      podsPerNodeLabel: "노드당 최대 Pod 수",
      podsOption30: "30 (GCP 기본값 / 소형 VM)",
      podsOption64: "64 (Azure 기본값)",
      podsOption110: "110 (표준 기본값 / EKS)",
      podsOption250: "250 (고밀도 클러스터)",
      nodeScaleLabel: "목표 노드 용량 규모",
      nodeSuffix: "노드",
      serviceCidrLabel: "Service CIDR 범위 (ClusterIPs)",
      step2: "02",
      allocationTitle: "클러스터 할당 용량",
      copyJson: "JSON 복사",
      nodeAllocLabel: "노드 IP 할당",
      nodeAllocSuffix: "IP / 노드",
      maxNodesLabel: "최대 노드 용량",
      statusSupported: "지원됨",
      statusRisk: "용량 한계 위험",
      maxPodScaleLabel: "최대 Pod 규모",
      usablePodsNote: "총 사용 가능 Pod IP 수",
      asideKicker: "KUBERNETES 분석",
      asideTitle: "IP 할당 그리드",
      asideDesc: "클러스터 Pod CIDR 범위 사용률 시각화.",
      totalCapacityLabel: "총 CIDR IP 용량",
      addressesTotal: "총 주소 수",
      utilLabel: "클러스터 IP 사용률",
      statusSafe: "안전",
      statusTight: "주의",
      statusCritical: "위험",
      copied: "복사됨!"
    },
    ipv6: {
      step1: "01",
      title: "IPv6 주소 매개변수",
      badge: "IPv6 스택",
      ipLabel: "IPv6 주소",
      prefixLabel: "접두사 길이",
      errorInvalid: "유효하지 않은 IPv6 주소 형식입니다. 콜론으로 구분된 16진수 블록을 입력하세요.",
      step2: "02",
      detailsTitle: "서브넷 범위 세부 정보",
      copyJson: "JSON 복사",
      compressedLabel: "압축된 IPv6 주소",
      boundsLabel: "주소 범위 경계",
      typeLabel: "주소 유형 분류",
      capacityLabel: "총 주소 용량",
      expandedLabel: "확장된(비압축) IPv6 형식",
      asideKicker: "접두사 위임 플래너",
      asideTitle: "위임된 블록",
      asideDesc: "IPv6 블록을 작은 표준 접두사(/48, /56 또는 /64)로 분할합니다.",
      targetPrefixLabel: "목표 접두사 길이",
      option48: "/48 (대규모 조직 사이트)",
      option56: "/56 (중형 기업 / 고객 사이트)",
      option64: "/64 (표준 로컬 서브넷)",
      option128: "/128 (단일 호스트 할당)",
      delegatedTotal: "총 위임 블록 수",
      subnetsUnit: "서브넷",
      firstRangesTitle: "첫 번째 서브넷 범위",
      copied: "복사됨!"
    },
    vlsm: {
      step1: "01",
      title: "VLSM 플래너 매개변수",
      badge: "가변 길이 서브넷 마스킹",
      baseIpLabel: "기본 CIDR 블록",
      step2: "02",
      requirementsTitle: "세그먼트 요구 사항",
      thName: "이름",
      thHosts: "필요 호스트 수",
      thActions: "작업",
      placeholderName: "세그먼트 이름",
      btnAddSegment: "+ 세그먼트 추가",
      btnCalculate: "VLSM 계산",
      errorNotEnough: "주소 공간이 부족합니다. 호스트 수를 줄이거나 더 큰 기본 블록을 사용하세요.",
      asideKicker: "VLSM 할당",
      asideTitle: "할당된 서브넷",
      asideDesc: "낭비를 최소화하면서 가장 큰 세그먼트부터 차례로 서브넷을 할당합니다.",
      thCidr: "CIDR",
      thUsable: "사용 가능",
      thWasted: "낭비/유휴",
      initialPrompt: "요구 사항을 입력하고 VLSM 계산을 클릭하세요.",
      copyCode: "코드 복사",
      copied: "복사됨!"
    },
    overlap: {
      step1: "01",
      title: "중복 모드 & 서브넷",
      badge: "중복 탐지기",
      tabSingle: "단일 목록 확인",
      tabGroups: "VPC 피어링 (두 그룹)",
      inputLabel: "CIDR 블록 (한 줄에 하나씩, 예: 10.0.0.0/24 또는 2001:db8::/48)",
      groupALabel: "그룹 A: 온프레미스 또는 VPC 1 CIDR",
      groupBLabel: "그룹 B: AWS Transit Gateway 또는 VPC 2 CIDR",
      btnCheck: "충돌 확인",
      btnClear: "지우기",
      errorInvalid: "하나 이상의 항목이 유효한 CIDR 블록이 아닙니다.",
      asideKicker: "충돌 분석",
      asideTitle: "감지된 관계",
      asideDesc: "중복, 포함 또는 충돌 라우팅 경계를 식별하기 위해 주소 경계를 컴파일합니다.",
      thSubnetA: "서브넷 A",
      thSubnetB: "서브넷 B",
      thRelationship: "관계",
      initialPrompt: "CIDR을 입력하고 충돌 확인을 클릭하세요.",
      noConflicts: "평가된 범위에서 중복되는 CIDR이 감지되지 않았습니다.",
      conflictsFound: "네트워크 경계 간에 충돌이 감지되었습니다!",
      relIdentical: "동일한 중복",
      relContains: "서브넷 포함",
      relOverlaps: "충돌 / 겹침"
    },
    supernet: {
      step1: "01",
      title: "집계할 네트워크",
      badge: "슈퍼네팅 / 경로 요약",
      inputLabel: "연속 CIDR 블록 (한 줄에 하나씩)",
      btnAggregate: "집계 실행",
      btnClear: "지우기",
      errorInvalid: "유효한 CIDR 블록을 한 줄에 하나씩 입력하세요.",
      asideKicker: "요약 경로",
      asideTitle: "집계 결과",
      asideDesc: "단일 요약 경로는 라우팅 테이블 크기를 줄이고 수렴 속도를 높입니다.",
      bgpCardTitle: "가장 작은 경계 슈퍼넷 (BGP 요약)",
      supernetCidrLabel: "슈퍼넷 CIDR:",
      ipRangeLabel: "IP 범위:",
      efficiencyLabel: "공간 효율성:",
      thCidr: "CIDR",
      thRange: "범위",
      initialPrompt: "CIDR 블록을 입력하고 집계 실행을 클릭하세요.",
      copyCode: "복사",
      copied: "복사됨!"
    },
    cloudIntros: {
      aws: {
        eyebrow: "AWS VPC 네트워킹 / 5개 예약 IP",
        title: "AWS VPC 서브넷 계산기 & CIDR 플래너",
        lede: "모든 서브넷에서 AWS가 예약하는 5개 IP 주소(네트워크, VPC 라우터, DNS, 미래 예약, 브로드캐스트)를 자동으로 계산합니다."
      },
      azure: {
        eyebrow: "AZURE VNET 네트워킹 / 5개 예약 IP",
        title: "Azure VNet 서브넷 계산기 & CIDR 플래너",
        lede: "Azure 서브넷당 5개의 예약 IP 주소, GatewaySubnet 요구 사항 및 피어링 경계를 고려하여 계획합니다."
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4개 예약 IP",
        title: "Google Cloud (GCP) VPC 서브넷 계산기",
        lede: "리전별 CIDR 범위에서 4개의 예약 IP(네트워크, 게이트웨이, 미래 예약, 브로드캐스트)를 자동으로 공제하여 계산합니다."
      }
    }
  },
  it: {
    splitter: {
      step1: "01",
      title: "Divisore Interattivo di Subnet",
      badge: "PROGETTATORE AD ALBERO",
      desc: "Dividi il blocco di indirizzi in segmenti di rete personalizzati. Fai clic su Dividi per dimezzare un blocco o su Unisci per ricombinare segmenti adiacenti.",
      baseIpLabel: "Blocco IP CIDR Base VPC",
      resetBtn: "Reimposta Blocco",
      presetLabel: "Carica Modello di Architettura Standard",
      presetDefault: "-- Seleziona una Topologia --",
      presetAws: "VPC AWS a 3 Livelli su 3 Zone di Disponibilità",
      presetHub: "Pool VPN Hub-and-Spoke",
      presetK8s: "Piccolo Cluster Kubernetes",
      dualStackLabel: "Abilita Pianificazione Dual-Stack (IPv4 / IPv6)",
      dualStackHint: "Alloca automaticamente intervalli IPv6 /64 sequenziali parallelamente alle subnet IPv4.",
      v6BaseLabel: "Blocco CIDR Base IPv6",
      errorInvalid: "Intervallo di rete base IPv4 non valido.",
      allocatedSpace: "Spazio di Rete Allocato",
      step2: "02",
      subnetsList: "Elenco Subnet Allocate",
      copyJson: "Copia JSON",
      thLabel: "Etichetta",
      thCidr: "Intervallo CIDR",
      thUsable: "Intervallo IP Utili",
      thHosts: "Host Utili",
      thAction: "Dividi/Unisci",
      btnSplit: "Dividi",
      btnMerge: "Unisci",
      asideKicker: "ESPORTATORE INFRASTRUTTURA",
      asideTitle: "Manifesto IaC",
      asideDesc: "Genera ed esporta configurazioni di subnet strutturate. Ideale per DevOps.",
      copyCode: "Copia Codice",
      copied: "Copiato!"
    },
    k8s: {
      step1: "01",
      title: "Parametri Cluster Kubernetes",
      badge: "K8S PRE-FLIGHT",
      podCidrLabel: "Blocco CIDR Rete Pod",
      podsPerNodeLabel: "Max Pod per Nodo",
      podsOption30: "30 (Predefinito GCP / Piccole VM)",
      podsOption64: "64 (Predefinito Azure)",
      podsOption110: "110 (Predefinito Standard / EKS)",
      podsOption250: "250 (Cluster ad Alta Densità)",
      nodeScaleLabel: "Capacità Nodi Prevista",
      nodeSuffix: "Nodi",
      serviceCidrLabel: "Intervallo CIDR Servizi (ClusterIP)",
      step2: "02",
      allocationTitle: "Capacità Allocazione Cluster",
      copyJson: "Copia JSON",
      nodeAllocLabel: "Allocazione IP Nodo",
      nodeAllocSuffix: "IP per Nodo",
      maxNodesLabel: "Capacità Max Nodi",
      statusSupported: "Supportato",
      statusRisk: "Rischio Limite Capacità",
      maxPodScaleLabel: "Scala Massima Pod",
      usablePodsNote: "Totale IP utili per pod",
      asideKicker: "ANALISI KUBERNETES",
      asideTitle: "Griglia Allocazione IP",
      asideDesc: "Visualizzazione dell'utilizzo dell'intervallo CIDR Pod del cluster.",
      totalCapacityLabel: "CAPACITÀ TOTALE IP CIDR",
      addressesTotal: "Indirizzi totali",
      utilLabel: "UTILIZZO IP CLUSTER",
      statusSafe: "Sicuro",
      statusTight: "Ristretto",
      statusCritical: "Critico",
      copied: "Copiato!"
    },
    ipv6: {
      step1: "01",
      title: "Parametri Indirizzo IPv6",
      badge: "STACK IPv6",
      ipLabel: "Indirizzo IPv6",
      prefixLabel: "Lunghezza Prefisso",
      errorInvalid: "Formato IPv6 non valido. Inserisci blocchi esadecimali separati da due punti.",
      step2: "02",
      detailsTitle: "Dettagli Intervallo Subnet",
      copyJson: "Copia JSON",
      compressedLabel: "Indirizzo IPv6 Compresso",
      boundsLabel: "Limiti Intervallo Indirizzi",
      typeLabel: "Classificazione Tipo Indirizzo",
      capacityLabel: "Capacità Totale Indirizzi",
      expandedLabel: "Forma IPv6 Estesa (Non compressa)",
      asideKicker: "PIANIFICATORE DELEGA PREFISSI",
      asideTitle: "Blocchi Delegati",
      asideDesc: "Dividi il tuo blocco IPv6 in prefissi standard minori (/48, /56 o /64).",
      targetPrefixLabel: "Lunghezza Prefisso Obiettivo",
      option48: "/48 (Grandi Sedi Aziendali)",
      option56: "/56 (Medie Imprese / Clienti)",
      option64: "/64 (Subnet Locale Standard)",
      option128: "/128 (Allocazione Singolo Host)",
      delegatedTotal: "TOTALE BLOCCHI DELEGATI",
      subnetsUnit: "Subnet",
      firstRangesTitle: "Primi Intervalli Subnet",
      copied: "Copiato!"
    },
    vlsm: {
      step1: "01",
      title: "Parametri Pianificatore VLSM",
      badge: "VARIABLE-LENGTH SUBNET MASKING",
      baseIpLabel: "Blocco CIDR Base",
      step2: "02",
      requirementsTitle: "Requisiti Segmenti",
      thName: "Nome",
      thHosts: "Host Richiesti",
      thActions: "Azioni",
      placeholderName: "Nome segmento",
      btnAddSegment: "+ Aggiungi Segmento",
      btnCalculate: "Calcola VLSM",
      errorNotEnough: "Spazio insufficiente per tutti i segmenti. Riduci gli host o allarga il blocco base.",
      asideKicker: "ALLOCAZIONE VLSM",
      asideTitle: "Subnet Allocate",
      asideDesc: "Le subnet sono allocate dalla più grande alla più piccola con il minimo spreco.",
      thCidr: "CIDR",
      thUsable: "Utile",
      thWasted: "Sprecato",
      initialPrompt: "Inserisci i requisiti e fai clic su Calcola VLSM.",
      copyCode: "Copia Codice",
      copied: "Copiato!"
    },
    overlap: {
      step1: "01",
      title: "Modalità Sovrapposizione & Subnet",
      badge: "RILEVATORE SOVRAPPOSIZIONI",
      tabSingle: "Controllo Lista Singola",
      tabGroups: "Peering VPC (Due Gruppi)",
      inputLabel: "Blocchi CIDR (uno per riga, es. 10.0.0.0/24 o 2001:db8::/48)",
      groupALabel: "Gruppo A: CIDR On-Premises o VPC 1",
      groupBLabel: "Gruppo B: CIDR AWS Transit Gateway o VPC 2",
      btnCheck: "Controlla Conflitti",
      btnClear: "Cancella",
      errorInvalid: "Una o più voci non sono blocchi CIDR validi.",
      asideKicker: "ANALISI CONFLITTI",
      asideTitle: "Relazioni Rilevate",
      asideDesc: "Compilazione limiti di indirizzi per identificare sovrapposizioni e duplicati di routing.",
      thSubnetA: "Subnet A",
      thSubnetB: "Subnet B",
      thRelationship: "Relazione",
      initialPrompt: "Inserisci CIDR e fai clic su Controlla Conflitti.",
      noConflicts: "Nessuna sovrapposizione CIDR rilevata negli intervalli valutati.",
      conflictsFound: "Conflitti rilevati tra confini di rete!",
      relIdentical: "Duplicato Identico",
      relContains: "Contiene Subnet",
      relOverlaps: "Collidere / Sovrapposto"
    },
    supernet: {
      step1: "01",
      title: "Reti da Aggregare",
      badge: "SUPERNETTING / AGGREGAZIONE ROTTE",
      inputLabel: "Blocchi CIDR contigui (uno per riga)",
      btnAggregate: "Aggrega",
      btnClear: "Cancella",
      errorInvalid: "Inserisci blocchi CIDR validi — uno per riga.",
      asideKicker: "ROTTE DI RIEPILOGO",
      asideTitle: "Risultato Aggregato",
      asideDesc: "Una rotta di riepilogo singola riduce le dimensioni della tabella di routing.",
      bgpCardTitle: "Supernet Delimitante Minima (Riepilogo BGP)",
      supernetCidrLabel: "CIDR Supernet:",
      ipRangeLabel: "Intervallo IP:",
      efficiencyLabel: "Efficienza Spazio:",
      thCidr: "CIDR",
      thRange: "Intervallo",
      initialPrompt: "Inserisci blocchi CIDR e fai clic su Aggrega.",
      copyCode: "Copia",
      copied: "Copiato!"
    },
    cloudIntros: {
      aws: {
        eyebrow: "RETE AWS VPC / 5 IP RISERVATI",
        title: "Calcolatore Subnet AWS VPC & Pianificatore CIDR",
        lede: "Calcola le subnet AWS VPC tenendo automaticamente conto dei 5 indirizzi IP riservati in ogni subnet (rete, router VPC, DNS, futuro, broadcast)."
      },
      azure: {
        eyebrow: "RETE AZURE VNET / 5 IP RISERVATI",
        title: "Calcolatore Subnet Azure VNet & Pianificatore CIDR",
        lede: "Pianifica le subnet Azure Virtual Network considerando i 5 IP riservati di Azure, i requisiti GatewaySubnet e i confini di peering."
      },
      gcp: {
        eyebrow: "GOOGLE CLOUD VPC / 4 IP RISERVATI",
        title: "Calcolatore Subnet Google Cloud (GCP) VPC",
        lede: "Progetta subnet VPC Google Cloud con deduzione automatica dei 4 IP riservati (rete, gateway, futuro, broadcast) su intervalli regionali."
      }
    }
  }
};
