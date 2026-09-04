import type { SupportedLanguage } from './i18n';

export const pageCommonI18n: Record<SupportedLanguage, {
  home: string;
  backToHome: string;
  backToCalc: string;
}> = {
  en: { home: "Home", backToHome: "Back to Home", backToCalc: "Start Subnet Calculation" },
  de: { home: "Startseite", backToHome: "Zurück zur Startseite", backToCalc: "Subnetzberechnung starten" },
  es: { home: "Inicio", backToHome: "Volver al inicio", backToCalc: "Iniciar cálculo de subred" },
  ja: { home: "ホーム", backToHome: "ホームに戻る", backToCalc: "サブネット計算を開始" },
  fr: { home: "Accueil", backToHome: "Retour à l'accueil", backToCalc: "Démarrer le calcul de sous-réseau" },
  pt: { home: "Início", backToHome: "Voltar ao início", backToCalc: "Iniciar cálculo de sub-rede" },
  ko: { home: "홈", backToHome: "홈으로 돌아가기", backToCalc: "서브넷 계산 시작하기" },
  it: { home: "Home", backToHome: "Torna alla home", backToCalc: "Inizia il calcolo della subnet" },
};

export const whatIsSubnetPageI18n: Record<SupportedLanguage, {
  title: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  lede: string;
  sec1Title: string;
  sec1Desc: string;
  sec2Title: string;
  sec2Desc: string;
  cheatSheetPrompt: string;
  cheatSheetLink: string;
}> = {
  en: {
    title: "What is a Subnet? Prefix Length & Subnet Mask Cheat Sheet | DevSubnet",
    metaDesc: "Learn what a subnet is, how subnet prefix lengths work, and access our quick subnet mask cheat sheet for network planning.",
    eyebrow: "NETWORKING BASICS",
    h1: "What is a Subnet?",
    lede: "A subnet (subnetwork) is a logical subdivision of an IP network that divides a larger network into smaller, more efficient subnetworks. Subnet prefix lengths determine network size and host capacities.",
    sec1Title: "Understanding Subnetworks",
    sec1Desc: "Subnetting reduces network traffic, optimizes performance, and enhances security by isolating host groups. Instead of all packets traversing the entire network, local traffic stays within its designated subnet boundary.",
    sec2Title: "Understanding Subnet Prefix Length",
    sec2Desc: "A subnet prefix length (written in CIDR notation, such as /24 or /16) specifies the number of bits allocated to the network portion of an IP address. The remaining bits belong to the host portion.",
    cheatSheetPrompt: "Need a fast reference chart? View our complete",
    cheatSheetLink: "Subnet Mask Cheat Sheet"
  },
  de: {
    title: "Was ist ein Subnetz? Präfixlänge & Subnetzmasken-Spickzettel | DevSubnet",
    metaDesc: "Erfahren Sie, was ein Subnetz ist, wie Präfixlängen funktionieren und nutzen Sie unseren Subnetzmasken-Spickzettel für die Netzwerkplanung.",
    eyebrow: "NETZWERK-GRUNDLAGEN",
    h1: "Was ist ein Subnetz?",
    lede: "Ein Subnetz (Teilnetzwerk) ist eine logische Unterteilung eines IP-Netzwerks, die ein größeres Netz in kleinere, effizientere Teilnetze gliedert. Präfixlängen bestimmen die Netzgröße und Host-Kapazitäten.",
    sec1Title: "Subnetze verstehen",
    sec1Desc: "Subnetting reduziert den Netzwerkverkehr, optimiert die Geschwindigkeit und stärkt die Sicherheit durch Isolation von Host-Gruppen. Lokaler Datenverkehr verbleibt innerhalb seiner Subnetz-Grenzen.",
    sec2Title: "Subnetz-Präfixlänge verstehen",
    sec2Desc: "Eine Präfixlänge in CIDR-Notation (z. B. /24 oder /16) legt die Anzahl der Netzwerkbits einer IP-Adresse fest. Die restlichen Bits gehören zum Host-Bereich.",
    cheatSheetPrompt: "Brauchen Sie eine schnelle Übersichtstabelle? Besuchen Sie unseren",
    cheatSheetLink: "Subnetzmasken-Spickzettel"
  },
  es: {
    title: "¿Qué es una subred? Longitud de prefijo y tabla de máscaras | DevSubnet",
    metaDesc: "Aprenda qué es una subred, cómo funcionan las longitudes de prefijo y acceda a nuestra tabla de referencia para diseño de redes.",
    eyebrow: "FUNDAMENTOS DE REDES",
    h1: "¿Qué es una subred?",
    lede: "Una subred es una división lógica de una red IP que organiza una red grande en subredes más pequeñas y eficientes para optimizar tráfico y seguridad.",
    sec1Title: "Comprendiendo las Subredes",
    sec1Desc: "La creación de subredes reduce la congestión de tráfico, optimiza el rendimiento y fortalece la seguridad al aislar segmentos lógicos.",
    sec2Title: "Longitud de Prefijo de Subred",
    sec2Desc: "La longitud del prefijo en notación CIDR (/24, /16) indica cuántos bits representan la red y cuántos se asignan a hosts individuales.",
    cheatSheetPrompt: "¿Necesita una tabla de referencia rápida? Consulte nuestra",
    cheatSheetLink: "Tabla de Máscaras de Subred"
  },
  ja: {
    title: "サブネットとは？プレフィックス長とサブネットマスク一覧 | DevSubnet",
    metaDesc: "サブネットの仕組み、プレフィックス長の計算方法、ネットワーク設計に役立つ早見表を解説します。",
    eyebrow: "ネットワーク基礎知識",
    h1: "サブネットとは？",
    lede: "サブネット（サブネットワーク）とは、大きなIPネットワークを論理的に分割した小さなネットワーク単位です。プレフィックス長によりネットワーク規模とホスト数が決まります。",
    sec1Title: "サブネットの仕組みと目的",
    sec1Desc: "サブネット化により、不要なブロードキャストトラフィックを抑え、パフォーマンス向上とセキュリティ強化を実現できます。",
    sec2Title: "プレフィックス長（CIDR）の理解",
    sec2Desc: "CIDR表記（/24や/16など）は、32ビットアドレスのうちネットワーク部に割り当てられるビット数を示します。",
    cheatSheetPrompt: "完全な早見表をお探しですか？こちらの",
    cheatSheetLink: "サブネットマスク早見表をご覧ください"
  },
  fr: {
    title: "Qu'est-ce qu'un sous-réseau ? Longueur de préfixe & Masque | DevSubnet",
    metaDesc: "Découvrez la définition d'un sous-réseau, le calcul des préfixes CIDR et consultez notre aide-mémoire complet.",
    eyebrow: "BASES DU RÉSEAU",
    h1: "Qu'est-ce qu'un sous-réseau ?",
    lede: "Un sous-réseau est une subdivision logique d'un réseau IP qui segmente un espace d'adressage en blocs plus petits et plus performants.",
    sec1Title: "Comprendre les sous-réseaux",
    sec1Desc: "Le découpage en sous-réseaux réduit le trafic global, optimise les performances et améliore la sécurité en isolant les flux.",
    sec2Title: "Comprendre la longueur de préfixe",
    sec2Desc: "La notation CIDR (/24, /16) spécifie le nombre de bits réseau d'une adresse IP, les bits restants étant alloués aux hôtes.",
    cheatSheetPrompt: "Besoin d'un tableau récapitulatif ? Consultez notre",
    cheatSheetLink: "Aide-mémoire des masques de sous-réseau"
  },
  pt: {
    title: "O que é uma sub-rede? Comprimento de prefixo e tabela | DevSubnet",
    metaDesc: "Entenda o que é uma sub-rede, como funcionam os prefixos CIDR e utilize nossa tabela de consulta para planejamento de rede.",
    eyebrow: "FUNDAMENTOS DE REDE",
    h1: "O que é uma sub-rede?",
    lede: "Uma sub-rede é uma partição lógica de uma rede IP maior em redes menores e eficientes, garantindo controle de tráfego e isolamento.",
    sec1Title: "Entendendo as sub-redes",
    sec1Desc: "Sub-redes reduzem o tráfego de broadcast, otimizam a velocidade e melhoram a segurança isolando departamentos e sistemas.",
    sec2Title: "Comprimento do Prefixo de Sub-rede",
    sec2Desc: "A notação CIDR (/24, /16) define quantos bits identificam a rede e quantos sobram para endereços de hosts utilizáveis.",
    cheatSheetPrompt: "Precisa de uma tabela prática? Veja nossa",
    cheatSheetLink: "Tabela de Máscaras de Sub-rede"
  },
  ko: {
    title: "서브넷이란? 서브넷 마스크 및 접두사 길이 가이드 | DevSubnet",
    metaDesc: "서브넷의 개념, CIDR 접두사 계산법 및 네트워크 설계용 서브넷 마스크 요약표를 확인하세요.",
    eyebrow: "네트워킹 기초",
    h1: "서브넷이란 무엇인가요?",
    lede: "서브넷(서브네트워크)은 대규모 IP 네트워크를 논리적으로 분할한 더 작고 효율적인 네트워크 단위입니다.",
    sec1Title: "서브넷의 목적과 이점",
    sec1Desc: "서브넷 분할은 브로드캐스트 트래픽을 격리하여 네트워크 성능을 최적화하고 보안을 강화합니다.",
    sec2Title: "서브넷 접두사 길이(CIDR) 이해",
    sec2Desc: "CIDR 표기법(/24, /16)은 32비트 IP 주소 중 네트워크 부분에 할당된 비트 수를 나타냅니다.",
    cheatSheetPrompt: "빠른 참조 표가 필요하신가요? 저희의",
    cheatSheetLink: "서브넷 마스크 요약표를 확인하세요"
  },
  it: {
    title: "Cos'è una subnet? Lunghezza prefisso e guida maschere | DevSubnet",
    metaDesc: "Scopri cos'è una subnet, come funzionano i prefissi CIDR e consulta la tabella completa delle maschere di sottorete.",
    eyebrow: "FONDAMENTI DI RETE",
    h1: "Cos'è una subnet?",
    lede: "Una subnet (sottorete) è una suddivisione logica di una rete IP che ottimizza l'instradamento e migliora la sicurezza.",
    sec1Title: "Comprendere le sottoreti",
    sec1Desc: "La segmentazione in subnet riduce il traffico broadcast e migliora la sicurezza isolando i gruppi di host.",
    sec2Title: "Lunghezza del prefisso di subnet",
    sec2Desc: "La notazione CIDR (/24, /16) specifica quanti bit appartengono alla rete e quanti identificano gli host utilizzabili.",
    cheatSheetPrompt: "Ti serve una tabella rapida? Consulta il nostro",
    cheatSheetLink: "Prontuario delle maschere di subnet"
  }
};
