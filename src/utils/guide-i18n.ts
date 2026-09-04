import type { SupportedLanguage } from './i18n';

export interface GuideFaqItem {
  q: string;
  a: string;
}

export interface GuideWhyCard {
  title: string;
  desc: string;
}

export interface GuideCompRow {
  feature: string;
  devsubnet: string;
  basic: string;
}

export interface GuideTranslation {
  prefixTableHeaders: {
    cidr: string;
    mask: string;
    wildcard: string;
    usable: string;
  };
  units: {
    host: string;
    hosts: string;
    pointToPoint: string;
  };
  compHeaders: {
    feature: string;
    devsubnet: string;
    basic: string;
  };
  compRows: GuideCompRow[];
  whyTitle: string;
  whyIntro: string;
  whyCards: GuideWhyCard[];
  faqs: GuideFaqItem[];
}

export const guideTranslations: Record<SupportedLanguage, GuideTranslation> = {
  en: {
    prefixTableHeaders: {
      cidr: "CIDR Prefix",
      mask: "Subnet Mask",
      wildcard: "Wildcard Mask",
      usable: "Usable Hosts (Standard)"
    },
    units: {
      host: "Host",
      hosts: "Hosts",
      pointToPoint: "Hosts (Point-to-point)"
    },
    compHeaders: {
      feature: "Feature / Capability",
      devsubnet: "DevSubnet",
      basic: "Basic calculators"
    },
    compRows: [
      { feature: "Cloud-aware VPC (AWS / Azure / GCP)", devsubnet: "Yes", basic: "No" },
      { feature: "IPv4 + IPv6 Dual-Stack", devsubnet: "Yes", basic: "Often IPv4 only" },
      { feature: "Terraform cidrsubnet() planning", devsubnet: "Yes", basic: "No" },
      { feature: "Kubernetes & CNI cluster planning", devsubnet: "Yes", basic: "No" },
      { feature: "VLSM segmentation", devsubnet: "Yes", basic: "No" },
      { feature: "Subnet overlap conflict detection", devsubnet: "Yes", basic: "No" },
      { feature: "CIDR supernetting / aggregation", devsubnet: "Yes", basic: "No" },
      { feature: "Binary grid visualization", devsubnet: "Yes", basic: "Rare" },
      { feature: "No signup, 100% in-browser security", devsubnet: "Yes", basic: "Varies" }
    ],
    whyTitle: "Why Use an Online IP Subnet Calculator & CIDR Calculator?",
    whyIntro: "Whether designing enterprise cloud VPCs or studying for CCNA/CCNP certifications, an online IP subnet calculator eliminates human arithmetic errors and translates slash notation into masks, ranges, and offsets instantly.",
    whyCards: [
      {
        title: "Fast In-Browser Subnet Calculator",
        desc: "Traditional calculators transmit your topology to remote servers. DevSubnet runs 100% client-side via JavaScript, keeping corporate IP schemas completely private."
      },
      {
        title: "Precise CIDR Calculator Online",
        desc: "Automatically accounts for vendor-specific reserved IPs across AWS (5 IPs), Azure VNet (5 IPs), and Google Cloud (4 IPs) to prevent IP collisions."
      },
      {
        title: "CIDR Calculator to Subnet Mask Conversion",
        desc: "Instantly map any prefix with our bitwise visualizer. View binary breakdowns, wildcard masks, and usable host ranges with zero server delay."
      },
      {
        title: "Multi-Region Cloud Architecture",
        desc: "Engineered for global DevOps infrastructure. Plan non-overlapping CIDR blocks with confidence across multi-tier availability zones."
      }
    ],
    faqs: [
      {
        q: "What is a subnet calculator and how does it work?",
        a: "A subnet calculator is a software utility used by network engineers, IT professionals, and students to divide IP networks into smaller subnets. By entering an IP address and CIDR prefix, it automates binary math to output network addresses, broadcast addresses, subnet masks, usable host ranges, and cloud VPC reservations."
      },
      {
        q: "How do I calculate subnets using an IP subnet calculator online?",
        a: "Enter your IPv4 or IPv6 network address and select your CIDR prefix length. The tool calculates network boundaries, broadcast addresses, and usable host ranges instantly without manual binary arithmetic."
      },
      {
        q: "What is a subnet mask and how does it work?",
        a: "A subnet mask is a 32-bit number used to divide an IP address into network and host portions. It works by performing a bitwise AND operation on the IP address, where binary 1s represent the network and binary 0s represent hosts."
      },
      {
        q: "How do I calculate subnets from an IP address?",
        a: "Convert CIDR slash notation or subnet mask to binary. The number of subnets you can create is 2^n (borrowed bits) and usable hosts per subnet is 2^h - 2."
      },
      {
        q: "What is CIDR notation and how is it used?",
        a: "CIDR (Classless Inter-Domain Routing) notation represents an IP address and its routing prefix length (e.g., /24 implies 24 network bits) to replace rigid legacy classful addressing."
      },
      {
        q: "How many usable hosts are in a /24 subnet?",
        a: "A /24 subnet has 256 total IP addresses. After subtracting the network address (first IP) and broadcast address (last IP), exactly 254 usable host IP addresses remain."
      }
    ]
  },
  de: {
    prefixTableHeaders: {
      cidr: "CIDR-Präfix",
      mask: "Subnetzmaske",
      wildcard: "Wildcard-Maske",
      usable: "Nutzbare Hosts (Standard)"
    },
    units: {
      host: "Host",
      hosts: "Hosts",
      pointToPoint: "Hosts (Punkt-zu-Punkt)"
    },
    compHeaders: {
      feature: "Funktion / Feature",
      devsubnet: "DevSubnet",
      basic: "Einfache Rechner"
    },
    compRows: [
      { feature: "Cloud-VPC-Reservierungen (AWS / Azure / GCP)", devsubnet: "Ja", basic: "Nein" },
      { feature: "IPv4 + IPv6 Dual-Stack", devsubnet: "Ja", basic: "Oft nur IPv4" },
      { feature: "Terraform cidrsubnet() Planung", devsubnet: "Ja", basic: "Nein" },
      { feature: "Kubernetes & CNI Cluster-Planung", devsubnet: "Ja", basic: "Nein" },
      { feature: "VLSM-Segmentierung", devsubnet: "Ja", basic: "Nein" },
      { feature: "Erkennung von Subnetz-Überlappungen", devsubnet: "Ja", basic: "Nein" },
      { feature: "CIDR-Supernetting / Aggregation", devsubnet: "Ja", basic: "Nein" },
      { feature: "Binäre Grid-Visualisierung", devsubnet: "Ja", basic: "Selten" },
      { feature: "Keine Registrierung, 100% im Browser", devsubnet: "Ja", basic: "Variiert" }
    ],
    whyTitle: "Warum einen Online-IP-Subnetz-Rechner nutzen?",
    whyIntro: "Egal ob beim Design von Enterprise-Cloud-VPCs oder bei der Vorbereitung auf Zertifizierungen: Ein browserbasierter Subnetz-Rechner verhindert Rechenfehler und berechnet Netzmasken, Host-Bereiche und Offsets in Millisekunden.",
    whyCards: [
      {
        title: "Schneller Rechner direkt im Browser",
        desc: "Klassische Rechner übertragen IP-Topologien an Server. DevSubnet läuft zu 100 % clientseitig via JavaScript – vertrauliche Schemas bleiben privat."
      },
      {
        title: "Präzise CIDR-Berechnung mit Cloud-Offsets",
        desc: "Berücksichtigt automatisch reservierte IPs in AWS (5 IPs), Azure (5 IPs) und Google Cloud (4 IPs), um Adressierungsfehler zu vermeiden."
      },
      {
        title: "CIDR in Subnetzmaske umrechnen",
        desc: "Präfixe blitzschnell zuordnen. Binäre Aufteilung, Wildcard-Maske und nutzbare Hosts ohne Serververzögerung einsehen."
      },
      {
        title: "Multi-Region Cloud-Architektur",
        desc: "Entwickelt für DevOps-Infrastrukturen. Planen Sie überlappungsfreie CIDR-Blöcke über mehrere Verfügbarkeitszonen hinweg."
      }
    ],
    faqs: [
      {
        q: "Was ist ein Subnetz-Rechner und wie funktioniert er?",
        a: "Ein Subnetz-Rechner teilt IP-Netzwerke in kleinere Teilnetze auf. Durch Eingabe von IP und CIDR berechnet das Tool automatisch Netzwerkadresse, Broadcast, Subnetzmaske, Host-Bereich und Cloud-Reservierungen."
      },
      {
        q: "Wie berechne ich Subnetze online?",
        a: "Geben Sie die IPv4- oder IPv6-Adresse ein und wählen Sie das CIDR-Präfix. Das Tool ermittelt sofort alle Adressgrenzen ohne manuelle Binärberechnung."
      },
      {
        q: "Was ist eine Subnetzmaske?",
        a: "Eine 32-Bit-Zahl, die eine IP-Adresse in Netzwerk- und Host-Teil trennt. Bei der bitweisen UND-Verknüpfung stehen 1er für das Netzwerk und 0er für Hosts."
      },
      {
        q: "Wie berechne ich Subnetze aus einer IP-Adresse?",
        a: "CIDR oder Subnetzmaske binär darstellen. Die Anzahl der Subnetze ist 2^n (geborgte Bits) und nutzbare Hosts 2^h - 2."
      },
      {
        q: "Was bedeutet CIDR-Notation?",
        a: "CIDR steht für Classless Inter-Domain Routing. Die Zahl hinter dem Schrägstrich (z.B. /24) gibt an, wie viele Bits das Netzwerk definieren."
      },
      {
        q: "Wie viele nutzbare Hosts hat ein /24-Subnetz?",
        a: "Ein /24-Subnetz umfasst 256 IP-Adressen. Nach Abzug von Netzwerkkennung und Broadcast verbleiben genau 254 nutzbare Host-Adressen."
      }
    ]
  },
  es: {
    prefixTableHeaders: {
      cidr: "Prefijo CIDR",
      mask: "Máscara de Subred",
      wildcard: "Máscara Wildcard",
      usable: "Hosts Usables (Estándar)"
    },
    units: {
      host: "Host",
      hosts: "Hosts",
      pointToPoint: "Hosts (Punto a punto)"
    },
    compHeaders: {
      feature: "Característica / Capacidad",
      devsubnet: "DevSubnet",
      basic: "Calculadoras básicas"
    },
    compRows: [
      { feature: "VPC Cloud (AWS / Azure / GCP)", devsubnet: "Sí", basic: "No" },
      { feature: "Doble pila IPv4 + IPv6", devsubnet: "Sí", basic: "Solo IPv4" },
      { feature: "Planificación Terraform cidrsubnet()", devsubnet: "Sí", basic: "No" },
      { feature: "Planificación Kubernetes y CNI", devsubnet: "Sí", basic: "No" },
      { feature: "Segmentación VLSM", devsubnet: "Sí", basic: "No" },
      { feature: "Detección de conflictos de superposición", devsubnet: "Sí", basic: "No" },
      { feature: "Superredes CIDR / Agregación", devsubnet: "Sí", basic: "No" },
      { feature: "Visualización en cuadrícula binaria", devsubnet: "Sí", basic: "Raro" },
      { feature: "Sin registro, 100% en el navegador", devsubnet: "Sí", basic: "Varía" }
    ],
    whyTitle: "¿Por qué utilizar una calculadora de subredes online?",
    whyIntro: "Ya sea diseñando VPCs empresariales en la nube o preparándose para exámenes de redes, una calculadora de subredes elimina errores de cálculo manual y convierte la notación de barra al instante.",
    whyCards: [
      {
        title: "Calculadora rápida en el navegador",
        desc: "Las herramientas tradicionales envían datos a servidores remotos. DevSubnet funciona 100% en su navegador mediante JavaScript, protegiendo su esquema de red."
      },
      {
        title: "Cálculo CIDR preciso con offsets Cloud",
        desc: "Considera automáticamente las IPs reservadas de AWS (5 IPs), Azure (5 IPs) y Google Cloud (4 IPs) para evitar solapamientos de direccionamiento."
      },
      {
        title: "Conversión de CIDR a Máscara",
        desc: "Asocie cualquier prefijo en milisegundos. Vea desgloses binarios, máscaras wildcard y rangos disponibles sin demoras de servidor."
      },
      {
        title: "Arquitectura Cloud Multirregión",
        desc: "Diseñada para entornos DevOps. Planifique bloques sin conflictos entre zonas de disponibilidad de alta redundancia."
      }
    ],
    faqs: [
      {
        q: "¿Qué es una calculadora de subredes y cómo funciona?",
        a: "Es una herramienta de software que ayuda a dividir una red IP en subredes más pequeñas. Calcula automáticamente direcciones de red, broadcast, máscaras y reservas de VPC en la nube."
      },
      {
        q: "¿Cómo calculo subredes online?",
        a: "Ingrese la dirección IPv4 o IPv6 y elija la longitud del prefijo CIDR. La herramienta computa límites y rangos de hosts usables al instante."
      },
      {
        q: "¿Qué es una máscara de subred y cómo funciona?",
        a: "Es un número de 32 bits que separa la parte de red de la parte de host mediante una operación lógica AND, donde los bits 1 representan la red y los 0 representan los hosts."
      },
      {
        q: "¿Cómo calcular subredes a partir de una IP?",
        a: "Pase la notación CIDR o máscara a binario. El número de subredes posibles es 2^n (bits prestados) y los hosts utilizables son 2^h - 2."
      },
      {
        q: "¿Qué es la notación CIDR y cómo se usa?",
        a: "CIDR (Classless Inter-Domain Routing) indica los bits asignados al prefijo de red mediante una barra (ejemplo: /24 indica 24 bits de red)."
      },
      {
        q: "¿Cuántos hosts utilizables tiene una subred /24?",
        a: "Una subred /24 contiene 256 IPs en total. Descontando la red y el broadcast, quedan exactamente 254 direcciones utilizables para dispositivos."
      }
    ]
  },
  ja: {
    prefixTableHeaders: {
      cidr: "CIDRプレフィックス",
      mask: "サブネットマスク",
      wildcard: "ワイルドカードマスク",
      usable: "利用可能ホスト数 (標準)"
    },
    units: {
      host: "ホスト",
      hosts: "ホスト",
      pointToPoint: "ホスト (PtoPリンク)"
    },
    compHeaders: {
      feature: "機能・性能",
      devsubnet: "DevSubnet",
      basic: "一般的な計算機"
    },
    compRows: [
      { feature: "クラウド対応VPC (AWS / Azure / GCP)", devsubnet: "対応", basic: "非対応" },
      { feature: "IPv4 + IPv6 デュアルスタック", devsubnet: "対応", basic: "IPv4のみが多い" },
      { feature: "Terraform cidrsubnet() 設計", devsubnet: "対応", basic: "非対応" },
      { feature: "Kubernetes & CNI クラスター設計", devsubnet: "対応", basic: "非対応" },
      { feature: "VLSMセグメンテーション", devsubnet: "対応", basic: "非対応" },
      { feature: "サブネット重複・衝突検出", devsubnet: "対応", basic: "非対応" },
      { feature: "CIDRスーパーネット集約", devsubnet: "対応", basic: "非対応" },
      { feature: "バイナリグリッド可視化", devsubnet: "対応", basic: "稀" },
      { feature: "登録不要・完全ブラウザ内完結", devsubnet: "対応", basic: "サービスによる" }
    ],
    whyTitle: "オンラインIPサブネット計算機を使う理由",
    whyIntro: "クラウドVPCの設計や資格試験の学習において、ブラウザ完結型のサブネット計算機は計算ミスをなくし、プレフィックスからIP範囲や予約アドレスを瞬時に算出します。",
    whyCards: [
      {
        title: "高速・完全ブラウザ完結の計算機",
        desc: "従来の計算ツールはネットワーク設計を外部サーバーに送信します。DevSubnetはJavaScriptで100%クライアント側で動作するため、機密情報が外部に漏れません。"
      },
      {
        title: "クラウド予約IPを考慮した高精度設計",
        desc: "AWS(5個)、Azure(5個)、GCP(4個)のクラウドベンダー固有の予約アドレスを自動計算し、IP枯渇やルーティング衝突を防ぎます。"
      },
      {
        title: "CIDRからサブネットマスクへの即時変換",
        desc: "スライダと連動したバイナリ分解機能。ワイルドカードマスクや利用可能ホスト範囲を待ち時間ゼロで可視化します。"
      },
      {
        title: "マルチリージョン対応のクラウド設計",
        desc: "世界規模のDevOpsインフラ向けに設計。複数AZにわたる重複のないCIDR設計を安全に行えます。"
      }
    ],
    faqs: [
      {
        q: "サブネット計算機とは何ですか？どのように動きますか？",
        a: "IPネットワークを小さく分割するためのツールです。IPアドレスとCIDRプレフィックスを入力することで、ネットワークアドレス、ブロードキャスト、マスク、予約IPを自動計算します。"
      },
      {
        q: "オンラインでのサブネット計算方法は？",
        a: "IPv4またはIPv6アドレスを入力し、プレフィックスを選択するだけで、手動の2進数計算を行うことなく境界と利用可能範囲が即座に表示されます。"
      },
      {
        q: "サブネットマスクとは何ですか？",
        a: "IPアドレスをネットワーク部とホスト部に分割する32ビットの数値です。ビット論理積(AND)を用いて判定します。"
      },
      {
        q: "IPアドレスからサブネットを計算する方法は？",
        a: "CIDR表記を2進数に変換します。作成可能なサブネット数は2^n、サブネットごとの利用可能ホスト数は2^h - 2となります。"
      },
      {
        q: "CIDR表記とは何ですか？",
        a: "従来のクラス分けに代わり、IPアドレスとネットワーク部のビット長をスラッシュで表す表記法(例: /24)です。"
      },
      {
        q: "/24サブネットの利用可能ホスト数は？",
        a: "全体で256個のアドレスがあり、ネットワークアドレスとブロードキャストアドレスを除く254個が利用可能ホストとなります。"
      }
    ]
  },
  fr: {
    prefixTableHeaders: {
      cidr: "Préfixe CIDR",
      mask: "Masque de Sous-réseau",
      wildcard: "Masque Générique",
      usable: "Hôtes Utilisables (Standard)"
    },
    units: {
      host: "Hôte",
      hosts: "Hôtes",
      pointToPoint: "Hôtes (Point à point)"
    },
    compHeaders: {
      feature: "Fonctionnalité",
      devsubnet: "DevSubnet",
      basic: "Calculateurs basiques"
    },
    compRows: [
      { feature: "VPC Cloud (AWS / Azure / GCP)", devsubnet: "Oui", basic: "Non" },
      { feature: "Double pile IPv4 + IPv6", devsubnet: "Oui", basic: "Souvent IPv4 seul" },
      { feature: "Planification Terraform cidrsubnet()", devsubnet: "Oui", basic: "Non" },
      { feature: "Planification Kubernetes & CNI", devsubnet: "Oui", basic: "Non" },
      { feature: "Segmentation VLSM", devsubnet: "Oui", basic: "Non" },
      { feature: "Détection des chevauchements", devsubnet: "Oui", basic: "Non" },
      { feature: "Super-réseau CIDR / Agrégation", devsubnet: "Oui", basic: "Non" },
      { feature: "Visualisation grille binaire", devsubnet: "Oui", basic: "Rare" },
      { feature: "Sans inscription, 100% dans le navigateur", devsubnet: "Oui", basic: "Variable" }
    ],
    whyTitle: "Pourquoi utiliser un calculateur de sous-réseau en ligne ?",
    whyIntro: "Que ce soit pour concevoir des réseaux cloud d'entreprise ou réviser des certifications, un calculateur élimine les erreurs arithmétiques et convertit la notation CIDR en temps réel.",
    whyCards: [
      {
        title: "Rapide et sécurisé dans votre navigateur",
        desc: "Les outils traditionnels envoient vos topologies sur des serveurs distants. DevSubnet s'exécute à 100 % localement via JavaScript, protégeant vos données d'infrastructure."
      },
      {
        title: "Calculateur CIDR précis avec réserves Cloud",
        desc: "Prend en compte les IPs réservées par AWS (5 IPs), Azure (5 IPs) et GCP (4 IPs) pour éviter l'épuisement d'adresses."
      },
      {
        title: "Conversion CIDR en Masque de sous-réseau",
        desc: "Convertissez n'importe quel préfixe instantanément. Visualisez la structure binaire, les masques inversés et les plages disponibles sans latence."
      },
      {
        title: "Architecture Cloud Multi-Régions",
        desc: "Conçu pour les équipes DevOps. Planifiez des blocs CIDR sans conflits à travers plusieurs zones de disponibilité."
      }
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un calculateur de sous-réseau et comment fonctionne-t-il ?",
        a: "C'est un outil logiciel qui divise un réseau IP en sous-réseaux plus petits. Il automatise le calcul binaire pour fournir les adresses de réseau, de diffusion, les masques et les réservations cloud."
      },
      {
        q: "Comment calculer des sous-réseaux en ligne ?",
        a: "Saisissez l'adresse IPv4 ou IPv6 et sélectionnez la longueur du préfixe CIDR. L'outil calcule les limites et plages d'hôtes immédiatement."
      },
      {
        q: "Qu'est-ce qu'un masque de sous-réseau ?",
        a: "Un nombre de 32 bits séparant la partie réseau de la partie hôte via une opération logique ET binaire."
      },
      {
        q: "Comment calculer les sous-réseaux à partir d'une IP ?",
        a: "Convertissez la notation CIDR en binaire. Le nombre de sous-réseaux est 2^n (bits empruntés) et le nombre d'hôtes utilisables est 2^h - 2."
      },
      {
        q: "Qu'est-ce que la notation CIDR ?",
        a: "La notation CIDR indique le préfixe réseau avec une barre oblique (ex: /24 indique 24 bits réseau), remplaçant l'ancien système de classes."
      },
      {
        q: "Combien d'hôtes utilisables contient un sous-réseau /24 ?",
        a: "Un /24 contient 256 adresses IP au total. En soustrayant le réseau et la diffusion, il reste exactement 254 adresses utilisables pour vos machines."
      }
    ]
  },
  pt: {
    prefixTableHeaders: {
      cidr: "Prefixo CIDR",
      mask: "Máscara de Sub-rede",
      wildcard: "Máscara Curinga",
      usable: "Hosts Utilizáveis (Padrão)"
    },
    units: {
      host: "Host",
      hosts: "Hosts",
      pointToPoint: "Hosts (Ponto a ponto)"
    },
    compHeaders: {
      feature: "Recurso / Capacidade",
      devsubnet: "DevSubnet",
      basic: "Calculadoras básicas"
    },
    compRows: [
      { feature: "VPC Cloud (AWS / Azure / GCP)", devsubnet: "Sim", basic: "Não" },
      { feature: "Pilha Dupla IPv4 + IPv6", devsubnet: "Sim", basic: "Geralmente só IPv4" },
      { feature: "Planejamento Terraform cidrsubnet()", devsubnet: "Sim", basic: "Não" },
      { feature: "Planejamento Kubernetes e CNI", devsubnet: "Sim", basic: "Não" },
      { feature: "Segmentação VLSM", devsubnet: "Sim", basic: "Não" },
      { feature: "Detecção de sobreposição de sub-redes", devsubnet: "Sim", basic: "Não" },
      { feature: "Super-redes CIDR / Agregação", devsubnet: "Sim", basic: "Não" },
      { feature: "Visualização em grade binária", devsubnet: "Sim", basic: "Raro" },
      { feature: "Sem registro, 100% no navegador", devsubnet: "Sim", basic: "Varia" }
    ],
    whyTitle: "Por que usar uma calculadora de sub-rede online?",
    whyIntro: "Seja desenhando redes corporativas em nuvem ou estudando para certificações, uma calculadora de sub-rede elimina erros humanos e calcula máscaras e faixas de IPs instantaneamente.",
    whyCards: [
      {
        title: "Rápida e 100% no navegador",
        desc: "Ferramentas tradicionais enviam esquemas de rede para servidores externos. O DevSubnet roda inteiramente no cliente via JavaScript, mantendo seus dados privados."
      },
      {
        title: "Cálculo CIDR preciso com reservas de nuvem",
        desc: "Considera automaticamente IPs reservados na AWS (5 IPs), Azure (5 IPs) e GCP (4 IPs) para evitar conflitos de endereçamento."
      },
      {
        title: "Conversão de CIDR para Máscara de Sub-rede",
        desc: "Mapeie qualquer prefixo sem demora. Veja divisões binárias, máscaras curinga e capacidades de hosts sem latência de servidor."
      },
      {
        title: "Arquitetura Cloud Multirregião",
        desc: "Criado para infraestrutura DevOps moderna. Planeje blocos CIDR sem sobreposição entre múltiplas zonas de disponibilidade."
      }
    ],
    faqs: [
      {
        q: "O que é uma calculadora de sub-rede e como funciona?",
        a: "É um utilitário de software para dividir redes IP em sub-redes menores. Ela automatiza cálculos binários para fornecer endereços de rede, broadcast, máscaras e reservas em nuvem."
      },
      {
        q: "Como calcular sub-redes online?",
        a: "Insira o endereço IPv4 ou IPv6 e selecione o tamanho do prefixo CIDR. O sistema calcula faixas e capacidades imediatamente sem necessidade de contas manuais."
      },
      {
        q: "O que é uma máscara de sub-rede?",
        a: "É um número de 32 bits que separa a parte de rede da parte de host por meio de uma operação lógica AND, onde 1s definem a rede e 0s os hosts."
      },
      {
        q: "Como calcular sub-redes a partir de um IP?",
        a: "Converta a notação CIDR ou máscara para binário. O número de sub-redes é 2^n (bits emprestados) e os hosts utilizáveis são 2^h - 2."
      },
      {
        q: "O que é notação CIDR?",
        a: "CIDR é a notação que representa o prefixo de rede com uma barra (ex: /24 significa 24 bits de rede), substituindo as antigas classes de IP."
      },
      {
        q: "Quantos hosts utilizáveis existem em uma sub-rede /24?",
        a: "Uma sub-rede /24 tem 256 endereços no total. Subtraindo o endereço de rede e o de broadcast, restam exatamente 254 hosts utilizáveis."
      }
    ]
  },
  ko: {
    prefixTableHeaders: {
      cidr: "CIDR 접두사",
      mask: "서브넷 마스크",
      wildcard: "와일드카드 마스크",
      usable: "사용 가능한 호스트 (표준)"
    },
    units: {
      host: "호스트",
      hosts: "호스트",
      pointToPoint: "호스트 (포인트 투 포인트)"
    },
    compHeaders: {
      feature: "기능 / 특성",
      devsubnet: "DevSubnet",
      basic: "기본 계산기"
    },
    compRows: [
      { feature: "클라우드 VPC 예약 지원 (AWS / Azure / GCP)", devsubnet: "지원", basic: "미지원" },
      { feature: "IPv4 + IPv6 듀얼 스택", devsubnet: "지원", basic: "대부분 IPv4만 지원" },
      { feature: "Terraform cidrsubnet() 계획", devsubnet: "지원", basic: "미지원" },
      { feature: "Kubernetes & CNI 클러스터 계획", devsubnet: "지원", basic: "미지원" },
      { feature: "VLSM 세그먼트 분할", devsubnet: "지원", basic: "미지원" },
      { feature: "서브넷 충돌 및 중복 감지", devsubnet: "지원", basic: "미지원" },
      { feature: "CIDR 슈퍼넷 통합", devsubnet: "지원", basic: "미지원" },
      { feature: "이진수 그리드 시각화", devsubnet: "지원", basic: "드묾" },
      { feature: "가입 불필요, 100% 브라우저 내 실행", devsubnet: "지원", basic: "서비스별 상이" }
    ],
    whyTitle: "온라인 IP 서브넷 계산기를 사용하는 이유",
    whyIntro: "클라우드 VPC를 설계하든 네트워크 자격증을 공부하든, 온라인 서브넷 계산기는 계산 실수를 방지하고 CIDR 표기법을 마스크와 IP 범위로 즉시 변환합니다.",
    whyCards: [
      {
        title: "빠르고 안전한 브라우저 내 계산",
        desc: "기존 도구는 네트워크 정보를 외부 서버로 전송합니다. DevSubnet은 JavaScript를 통해 100% 로컬 브라우저에서 실행되어 보안이 완벽합니다."
      },
      {
        title: "클라우드 예약 IP를 반영한 정밀 계산",
        desc: "AWS(5개), Azure(5개), Google Cloud(4개)의 벤더별 예약 IP를 자동으로 계산하여 IP 고갈 및 충돌을 방지합니다."
      },
      {
        title: "CIDR에서 서브넷 마스크로의 즉시 변환",
        desc: "모든 접두사를 즉시 매핑하세요. 이진수 분석, 와일드카드 마스크 및 사용 가능한 호스트 범위를 대기 시간 없이 확인할 수 있습니다."
      },
      {
        title: "글로벌 멀티 리전 클라우드 아키텍처",
        desc: "현대적인 DevOps 인프라를 위해 구축되었습니다. 다중 가용 영역에 걸쳐 충돌 없는 CIDR 블록을 안정적으로 계획하세요."
      }
    ],
    faqs: [
      {
        q: "서브넷 계산기란 무엇이며 어떻게 작동하나요?",
        a: "IP 네트워크를 더 작은 하위 네트워크로 분할하는 소프트웨어 도구입니다. IP와 CIDR을 입력하면 네트워크 주소, 브로드캐스트, 마스크, 클라우드 예약을 자동 계산합니다."
      },
      {
        q: "온라인에서 서브넷을 계산하는 방법은?",
        a: "IPv4 또는 IPv6 주소를 입력하고 CIDR 접두사를 선택하면 수동 이진수 계산 없이 네트워크 범위와 사용 가능한 호스트 수가 즉시 표시됩니다."
      },
      {
        q: "서브넷 마스크란 무엇인가요?",
        a: "IP 주소를 네트워크 부분과 호스트 부분으로 나누는 32비트 숫자입니다. 비트 단위 AND 연산을 통해 1은 네트워크, 0은 호스트를 나타냅니다."
      },
      {
        q: "IP 주소에서 서브넷을 계산하는 방법은?",
        a: "CIDR 표기법을 이진수로 변환합니다. 생성 가능한 서브넷 수는 2^n이며, 서브넷당 사용 가능한 호스트 수는 2^h - 2입니다."
      },
      {
        q: "CIDR 표기법이란 무엇인가요?",
        a: "클래스 없는 도메인 간 라우팅(CIDR)은 슬래시(/) 뒤에 네트워크 비트 수를 표시하는 방식(예: /24는 24비트 네트워크)입니다."
      },
      {
        q: "/24 서브넷에서 사용 가능한 호스트 수는 몇 개인가요?",
        a: "/24 서브넷은 총 256개의 IP 주소를 갖습니다. 네트워크 주소와 브로드캐스트 주소를 제외하면 정확히 254개의 사용 가능한 호스트 IP가 남습니다."
      }
    ]
  },
  it: {
    prefixTableHeaders: {
      cidr: "Prefisso CIDR",
      mask: "Maschera di Subnet",
      wildcard: "Maschera Wildcard",
      usable: "Host Utilizzabili (Standard)"
    },
    units: {
      host: "Host",
      hosts: "Host",
      pointToPoint: "Host (Punto a punto)"
    },
    compHeaders: {
      feature: "Funzionalità",
      devsubnet: "DevSubnet",
      basic: "Calcolatori di base"
    },
    compRows: [
      { feature: "VPC Cloud (AWS / Azure / GCP)", devsubnet: "Sì", basic: "No" },
      { feature: "Doppio stack IPv4 + IPv6", devsubnet: "Sì", basic: "Spesso solo IPv4" },
      { feature: "Pianificazione Terraform cidrsubnet()", devsubnet: "Sì", basic: "No" },
      { feature: "Pianificazione Kubernetes & CNI", devsubnet: "Sì", basic: "No" },
      { feature: "Segmentazione VLSM", devsubnet: "Sì", basic: "No" },
      { feature: "Rilevamento conflitti di sovrapposizione", devsubnet: "Sì", basic: "No" },
      { feature: "Supernetting CIDR / Aggregazione", devsubnet: "Sì", basic: "No" },
      { feature: "Visualizzazione griglia binaria", devsubnet: "Sì", basic: "Raro" },
      { feature: "Nessuna registrazione, 100% nel browser", devsubnet: "Sì", basic: "Variabile" }
    ],
    whyTitle: "Perché usare un calcolatore di subnet online?",
    whyIntro: "Che tu stia progettando VPC cloud aziendali o studiando per certificazioni di rete, un calcolatore di subnet online elimina gli errori manuali e calcola intervalli e maschere all'istante.",
    whyCards: [
      {
        title: "Veloce e sicuro nel browser",
        desc: "I tool tradizionali inviano le topologie di rete a server remoti. DevSubnet gira al 100% sul client via JavaScript, mantenendo riservati gli schemi IP."
      },
      {
        title: "Calcolo CIDR preciso con offset Cloud",
        desc: "Include automaticamente gli IP riservati da AWS (5 IP), Azure (5 IP) e Google Cloud (4 IP) per prevenire conflitti di indirizzamento."
      },
      {
        title: "Conversione da CIDR a Maschera di Subnet",
        desc: "Mappa qualsiasi prefisso in nanosecondi. Visualizza scomposizioni binarie, maschere wildcard e capacità host senza latenza del server."
      },
      {
        title: "Architettura Cloud Multi-Regione",
        desc: "Progettato per infrastrutture DevOps globali. Pianifica blocchi CIDR non sovrapposti tra più zone di disponibilità."
      }
    ],
    faqs: [
      {
        q: "Cos'è un calcolatore di subnet e come funziona?",
        a: "È un software che permette di suddividere reti IP in sottoreti più piccole. Calcola automaticamente indirizzi di rete, broadcast, maschere e offset di prenotazione cloud."
      },
      {
        q: "Come calcolare le subnet online?",
        a: "Inserisci l'indirizzo IPv4 o IPv6 e seleziona il prefisso CIDR. Lo strumento restituisce all'istante i confini e le capacità host senza calcoli binari manuali."
      },
      {
        q: "Cos'è una maschera di subnet?",
        a: "Un numero a 32 bit che divide un indirizzo IP in porzione di rete e porzione host tramite un'operazione AND logica bit a bit."
      },
      {
        q: "Come calcolare le subnet da un indirizzo IP?",
        a: "Converti il prefisso CIDR in binario. Il numero di subnet possibili è 2^n (bit presi in prestito) e gli host utilizzabili sono 2^h - 2."
      },
      {
        q: "Cos'è la notazione CIDR?",
        a: "CIDR specifica la lunghezza del prefisso di rete dopo una barra (es: /24 indica 24 bit di rete), sostituendo le vecchie classi rigide."
      },
      {
        q: "Quanti host utilizzabili ci sono in una subnet /24?",
        a: "Una subnet /24 ha 256 indirizzi IP totali. Sottraendo l'indirizzo di rete e quello di broadcast, restano esattamente 254 indirizzi utilizzabili."
      }
    ]
  }
};
