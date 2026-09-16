// IPv4 Subnet Math Utilities

export interface SubnetResult {
  network: string;
  broadcast: string;
  netmask: string;
  wildcard: string;
  firstUsable: string;
  lastUsable: string;
  totalHosts: number;
  usableHosts: number;
  reservedDetails: string[];
}

export interface BitInfo {
  val: string;
  type: 'net' | 'host';
  octetIndex: number;
  bitIndex: number;
}

// Convert IP string to 32-bit unsigned integer
export function ip2Long(ip: string): number {
  const parts = ip.split('.').map(p => parseInt(p, 10));
  if (parts.length !== 4 || parts.some(isNaN)) return 0;
  return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

// Convert 32-bit unsigned integer to IP string
export function long2Ip(long: number): string {
  return [
    (long >>> 24) & 255,
    (long >>> 16) & 255,
    (long >>> 8) & 255,
    long & 255
  ].join('.');
}

// Validate if IP address format is correct
export function validateIPv4(ip: string): boolean {
  const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ip.trim());
}

// Convert dotted-decimal netmask (e.g. 255.255.255.240) to CIDR (e.g. 28)
export function netmaskToCidr(mask: string): number | null {
  mask = mask.trim();
  if (!validateIPv4(mask)) return null;
  const long = ip2Long(mask);
  const bin = (long >>> 0).toString(2).padStart(32, '0');
  const firstZero = bin.indexOf('0');
  if (firstZero === -1) return 32;
  // All bits after the first zero must be 0
  if (bin.slice(firstZero).includes('1')) return null;
  return firstZero;
}

// Convert wildcard mask (e.g. 0.0.0.15) to CIDR (e.g. 28)
export function wildcardToCidr(wildcard: string): number | null {
  wildcard = wildcard.trim();
  if (!validateIPv4(wildcard)) return null;
  const long = ip2Long(wildcard);
  const maskLong = (~long) >>> 0;
  const bin = maskLong.toString(2).padStart(32, '0');
  const firstZero = bin.indexOf('0');
  if (firstZero === -1) return 32;
  if (bin.slice(firstZero).includes('1')) return null;
  return firstZero;
}

// Smart IP parser: handles "192.168.1.1/24", "192.168.1.1 255.255.255.0", "192.168.1.1 0.0.0.255", or just "192.168.1.1"
export function parseSmartIpInput(input: string): { ip: string; cidr?: number } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Case 1: Slash notation e.g. 192.168.1.1/24 or 192.168.1.1/255.255.255.0
  if (trimmed.includes('/')) {
    const [ipPart, maskPart] = trimmed.split('/');
    if (!validateIPv4(ipPart)) return null;
    const cidrNum = parseInt(maskPart, 10);
    if (!isNaN(cidrNum) && cidrNum >= 0 && cidrNum <= 32 && String(cidrNum) === maskPart.trim()) {
      return { ip: ipPart.trim(), cidr: cidrNum };
    }
    // Mask part might be dotted-decimal netmask or wildcard
    const cidrFromMask = netmaskToCidr(maskPart) ?? wildcardToCidr(maskPart);
    if (cidrFromMask !== null) {
      return { ip: ipPart.trim(), cidr: cidrFromMask };
    }
    return { ip: ipPart.trim() };
  }

  // Case 2: Space separated e.g. "192.168.1.1 255.255.255.0" or "192.168.1.1 0.0.0.255"
  const spaceParts = trimmed.split(/\s+/);
  if (spaceParts.length >= 2) {
    const ipPart = spaceParts[0];
    const maskPart = spaceParts[1];
    if (validateIPv4(ipPart)) {
      const cidrFromMask = netmaskToCidr(maskPart) ?? wildcardToCidr(maskPart);
      if (cidrFromMask !== null) {
        return { ip: ipPart, cidr: cidrFromMask };
      }
    }
  }

  // Case 3: Just IP
  if (validateIPv4(trimmed)) {
    return { ip: trimmed };
  }

  return null;
}

export interface ExamStep {
  stepNumber: number;
  title: string;
  formula: string;
  result: string;
  explanation: string;
}

export interface ExamMathBreakdown {
  ip: string;
  cidr: number;
  ipClass: 'A' | 'B' | 'C' | 'D' | 'E';
  defaultClassCidr: number;
  borrowedBits: number;
  subnetsCreated: number;
  hostBits: number;
  totalAddresses: number;
  usableHosts: number;
  interestingOctetNumber: 1 | 2 | 3 | 4;
  interestingOctetName: string;
  maskOctetValue: number;
  magicNumber: number;
  ipOctetValue: number;
  lowerBoundary: number;
  nextSubnetOctet: number;
  broadcastOctet: number;
  multiples: number[];
  networkIp: string;
  broadcastIp: string;
  firstUsableIp: string;
  lastUsableIp: string;
  isClassfulBoundary: boolean;
  boundaryNote: string;
  stepExplanationStep2: string;
  stepExplanationStep3: string;
  andOperation: {
    ipOctetBin: string;
    maskOctetBin: string;
    andResultBin: string;
    resultDec: number;
  };
  steps: ExamStep[];
}

export function calculateExamMath(ip: string, cidr: number): ExamMathBreakdown {
  if (!validateIPv4(ip)) ip = "192.168.1.0";
  if (cidr < 0) cidr = 0;
  if (cidr > 32) cidr = 32;

  const ipLong = ip2Long(ip);
  const maskLong = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardLong = ~maskLong >>> 0;
  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;

  const ipOctets = [
    (ipLong >>> 24) & 255,
    (ipLong >>> 16) & 255,
    (ipLong >>> 8) & 255,
    ipLong & 255
  ];

  const maskOctets = [
    (maskLong >>> 24) & 255,
    (maskLong >>> 16) & 255,
    (maskLong >>> 8) & 255,
    maskLong & 255
  ];

  const firstOctet = ipOctets[0];
  let ipClass: 'A' | 'B' | 'C' | 'D' | 'E' = 'C';
  let defaultClassCidr = 24;

  if (firstOctet >= 1 && firstOctet <= 126) {
    ipClass = 'A';
    defaultClassCidr = 8;
  } else if (firstOctet >= 128 && firstOctet <= 191) {
    ipClass = 'B';
    defaultClassCidr = 16;
  } else if (firstOctet >= 192 && firstOctet <= 223) {
    ipClass = 'C';
    defaultClassCidr = 24;
  } else if (firstOctet >= 224 && firstOctet <= 239) {
    ipClass = 'D';
    defaultClassCidr = 24;
  } else {
    ipClass = 'E';
    defaultClassCidr = 24;
  }

  const borrowedBits = Math.max(0, cidr - defaultClassCidr);
  const subnetsCreated = Math.pow(2, borrowedBits);
  const hostBits = 32 - cidr;
  const totalAddresses = Math.pow(2, hostBits);
  
  let usableHosts = 0;
  if (cidr === 32) usableHosts = 1;
  else if (cidr === 31) usableHosts = 2;
  else usableHosts = Math.max(0, totalAddresses - 2);

  // Determine Interesting Octet & Magic Number
  // On classless subnets (mask octet between 128 and 254), interesting octet is the one containing the boundary.
  // On classful byte boundaries (/8, /16, /24), the network prefix ends at cidr/8, and the following octet forms the host block (magic number = 256).
  const octetNames = ['1st Octet', '2nd Octet', '3rd Octet', '4th Octet'];
  let interestingIndex = 3;
  let isClassfulBoundary = false;
  let boundaryNote = '';
  let stepExplanationStep2 = '';
  let stepExplanationStep3 = '';
  let magicNumber = 1;
  let maskOctetValue = 0;
  let lowerBoundary = 0;
  let broadcastOctet = 255;
  let nextSubnetOctet = 256;
  const multiples: number[] = [];

  if (cidr % 8 !== 0) {
    // Classless subnetting: boundary falls inside an octet
    interestingIndex = Math.min(3, Math.floor(cidr / 8));
    maskOctetValue = maskOctets[interestingIndex];
    magicNumber = 256 - maskOctetValue;
    const ipVal = ipOctets[interestingIndex];
    lowerBoundary = Math.floor(ipVal / magicNumber) * magicNumber;
    broadcastOctet = Math.min(255, lowerBoundary + magicNumber - 1);
    nextSubnetOctet = lowerBoundary + magicNumber;
    isClassfulBoundary = false;

    for (let m = 0; m <= 256; m += magicNumber) {
      multiples.push(m);
      if (multiples.length > 17) break;
    }

    stepExplanationStep2 = `The subnet boundary falls in the ${octetNames[interestingIndex]}. Subnet blocks increment by multiples of ${magicNumber} (Magic Number = 256 - ${maskOctetValue}).`;
    stepExplanationStep3 = `Octet value is ${ipVal}. It falls between .${lowerBoundary} (Network ID) and .${broadcastOctet} (Broadcast IP).`;
  } else if (cidr === 24) {
    // Classful /24 boundary
    interestingIndex = 3; // 4th Octet is the host field
    maskOctetValue = 0;
    magicNumber = 256;
    lowerBoundary = 0;
    broadcastOctet = 255;
    nextSubnetOctet = 256;
    isClassfulBoundary = true;
    multiples.push(0, 256);

    boundaryNote = `Classful /24 boundary: Network prefix covers the first 3 octets (${ipOctets[0]}.${ipOctets[1]}.${ipOctets[2]}.x). The 4th Octet contains the full host block of 256 IPs (.0 to .255). Consecutive /24 subnets increment by 1 in the 3rd Octet.`;
    stepExplanationStep2 = `Classful /24 boundary: The network prefix ends at the 3rd Octet. The 4th Octet forms a full host block of 256 addresses (Magic Number block size = 256, spanning .0 to .255). Consecutive /24 subnets increment by 1 in the 3rd Octet.`;
    stepExplanationStep3 = `The 4th Octet spans from .0 (Network ID) to .255 (Broadcast ID). The target host IP has .${ipOctets[3]} in this octet.`;
  } else if (cidr === 16) {
    // Classful /16 boundary
    interestingIndex = 2; // 3rd Octet begins host field
    maskOctetValue = 0;
    magicNumber = 256;
    lowerBoundary = 0;
    broadcastOctet = 255;
    nextSubnetOctet = 256;
    isClassfulBoundary = true;
    multiples.push(0, 256);

    boundaryNote = `Classful /16 boundary: Network prefix covers the first 2 octets (${ipOctets[0]}.${ipOctets[1]}.x.x). Octets 3 and 4 form a 65,536 IP block. Consecutive /16 subnets increment by 1 in the 2nd Octet.`;
    stepExplanationStep2 = `Classful /16 boundary: The network prefix ends at the 2nd Octet. Octet 3 forms a 256-block boundary (spans .0.0 to .255.255, 65,536 total IPs). Consecutive /16 subnets increment by 1 in the 2nd Octet.`;
    stepExplanationStep3 = `Octets 3 & 4 span from .0.0 (Network ID) to .255.255 (Broadcast ID). Octet 3 value is ${ipOctets[2]}.`;
  } else if (cidr === 8) {
    // Classful /8 boundary
    interestingIndex = 1;
    maskOctetValue = 0;
    magicNumber = 256;
    lowerBoundary = 0;
    broadcastOctet = 255;
    nextSubnetOctet = 256;
    isClassfulBoundary = true;
    multiples.push(0, 256);

    boundaryNote = `Classful /8 boundary: Network prefix covers the 1st Octet (${ipOctets[0]}.x.x.x). Octets 2, 3, and 4 form a 16,777,216 IP block. Consecutive /8 subnets increment by 1 in the 1st Octet.`;
    stepExplanationStep2 = `Classful /8 boundary: Network prefix ends at the 1st Octet. Octets 2, 3, and 4 provide 16,777,216 addresses. Consecutive /8 blocks increment by 1 in the 1st Octet.`;
    stepExplanationStep3 = `Host field spans .0.0.0 to .255.255.255. Octet 2 value is ${ipOctets[1]}.`;
  } else if (cidr === 32) {
    // Host route /32
    interestingIndex = 3;
    maskOctetValue = 255;
    magicNumber = 1;
    lowerBoundary = ipOctets[3];
    broadcastOctet = ipOctets[3];
    nextSubnetOctet = lowerBoundary + 1;
    isClassfulBoundary = true;
    multiples.push(ipOctets[3]);

    boundaryNote = `Host route (/32): Single IP address with no network or broadcast overhead.`;
    stepExplanationStep2 = `Host route (/32): Subnet mask is 255.255.255.255. Block size is 1 single IP.`;
    stepExplanationStep3 = `Single dedicated host address: ${ip}.`;
  } else {
    // Default route /0
    interestingIndex = 0;
    maskOctetValue = 0;
    magicNumber = 256;
    lowerBoundary = 0;
    broadcastOctet = 255;
    nextSubnetOctet = 256;
    isClassfulBoundary = true;
    multiples.push(0, 256);

    boundaryNote = `Default route (0.0.0.0/0): Covers the entire IPv4 space (4,294,967,296 addresses).`;
    stepExplanationStep2 = `Default route (/0): Subnet mask is 0.0.0.0. Spans all IPv4 addresses.`;
    stepExplanationStep3 = `Entire IPv4 space (0.0.0.0 to 255.255.255.255).`;
  }

  const interestingOctetNumber = (interestingIndex + 1) as 1 | 2 | 3 | 4;
  const interestingOctetName = octetNames[interestingIndex];
  const ipOctetValue = ipOctets[interestingIndex];

  // Bitwise AND demonstration
  const ipOctetBin = ipOctetValue.toString(2).padStart(8, '0');
  const maskOctetBin = maskOctetValue.toString(2).padStart(8, '0');
  const andResultDec = ipOctetValue & maskOctetValue;
  const andResultBin = andResultDec.toString(2).padStart(8, '0');

  const networkIp = long2Ip(networkLong);
  const broadcastIp = long2Ip(broadcastLong);
  const firstUsableIp = cidr === 32 ? networkIp : (cidr === 31 ? networkIp : long2Ip(networkLong + 1));
  const lastUsableIp = cidr === 32 ? networkIp : (cidr === 31 ? broadcastIp : long2Ip(broadcastLong - 1));

  const steps: ExamStep[] = [
    {
      stepNumber: 1,
      title: "Classful Reference & Borrowed Bits (2^s)",
      formula: `2^s = 2^${borrowedBits} = ${subnetsCreated.toLocaleString()} subnets`,
      result: `${borrowedBits} borrowed bits (${subnetsCreated.toLocaleString()} subnets)`,
      explanation: `First octet ${firstOctet} is Class ${ipClass} (default /${defaultClassCidr}). Subnetting to /${cidr} borrows ${borrowedBits} bit(s) from the host field, creating 2^${borrowedBits} = ${subnetsCreated.toLocaleString()} individual subnets.`
    },
    {
      stepNumber: 2,
      title: "Host Bits & Usable Capacity (2^h - 2)",
      formula: `2^h - 2 = 2^${hostBits} - 2 = ${usableHosts.toLocaleString()} usable hosts`,
      result: `${usableHosts.toLocaleString()} usable host IPs`,
      explanation: `With a /${cidr} prefix, 32 - ${cidr} = ${hostBits} host bits remain. Total addresses = 2^${hostBits} = ${totalAddresses.toLocaleString()}. Subtracting 2 (Network ID and Broadcast IP) gives ${usableHosts.toLocaleString()} usable addresses.`
    },
    {
      stepNumber: 3,
      title: "Find the Interesting Octet & Magic Number (Block Size)",
      formula: `Magic Number = 256 - ${maskOctetValue} = ${magicNumber}`,
      result: `Magic Number = ${magicNumber} in ${interestingOctetName}`,
      explanation: stepExplanationStep2
    },
    {
      stepNumber: 4,
      title: "Determine Subnet Boundaries via Boundary Hops",
      formula: `Hop interval: [${lowerBoundary} ... ${broadcastOctet}] (next is ${nextSubnetOctet})`,
      result: `Network ID: ${networkIp} | Broadcast: ${broadcastIp}`,
      explanation: stepExplanationStep3
    },
    {
      stepNumber: 5,
      title: "Bitwise AND Verification",
      formula: `${ipOctetBin} AND ${maskOctetBin} = ${andResultBin} (${andResultDec})`,
      result: `Network Octet = ${andResultDec}`,
      explanation: `Bitwise AND of IP octet (${ipOctetValue}) and Mask octet (${maskOctetValue}) yields ${andResultDec}, validating the Network ID.`
    }
  ];

  return {
    ip,
    cidr,
    ipClass,
    defaultClassCidr,
    borrowedBits,
    subnetsCreated,
    hostBits,
    totalAddresses,
    usableHosts,
    interestingOctetNumber,
    interestingOctetName,
    maskOctetValue,
    magicNumber,
    ipOctetValue,
    lowerBoundary,
    nextSubnetOctet,
    broadcastOctet,
    multiples,
    networkIp,
    broadcastIp,
    firstUsableIp,
    lastUsableIp,
    isClassfulBoundary,
    boundaryNote,
    stepExplanationStep2,
    stepExplanationStep3,
    andOperation: {
      ipOctetBin,
      maskOctetBin,
      andResultBin,
      resultDec: andResultDec
    },
    steps
  };
}

// Calculate details for a subnet
export function calculateSubnet(ip: string, cidr: number, cloud: 'standard' | 'aws' | 'azure' | 'gcp' = 'standard'): SubnetResult {
  if (!validateIPv4(ip)) {
    ip = "0.0.0.0";
  }
  
  if (cidr < 0) cidr = 0;
  if (cidr > 32) cidr = 32;

  const ipLong = ip2Long(ip);
  
  // Calculate mask
  const maskLong = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardLong = ~maskLong >>> 0;
  
  // Calculate network & broadcast addresses
  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | wildcardLong) >>> 0;
  
  const totalHosts = Math.pow(2, 32 - cidr);
  
  let usableHosts = 0;
  let firstUsableLong = 0;
  let lastUsableLong = 0;
  const reservedDetails: string[] = [];

  // Special CIDR cases (RFC 3021 / RFC 1878)
  if (cidr === 32) {
    usableHosts = 1;
    firstUsableLong = networkLong;
    lastUsableLong = networkLong;
    reservedDetails.push("Single Host address (/32). No network or broadcast separations.");
  } else if (cidr === 31) {
    usableHosts = 2;
    firstUsableLong = networkLong;
    lastUsableLong = broadcastLong;
    reservedDetails.push("Point-to-point link (/31). Usable addresses represent network and broadcast boundaries (RFC 3021).");
  } else {
    // Normal CIDR ranges
    if (cloud === 'standard') {
      usableHosts = totalHosts - 2;
      firstUsableLong = networkLong + 1;
      lastUsableLong = broadcastLong - 1;
      reservedDetails.push(`${long2Ip(networkLong)}: Network Address`);
      reservedDetails.push(`${long2Ip(broadcastLong)}: Broadcast Address`);
    } else if (cloud === 'aws') {
      // AWS Reserves 5 IP addresses
      if (totalHosts >= 8) {
        usableHosts = totalHosts - 5;
        firstUsableLong = networkLong + 4;
        lastUsableLong = broadcastLong - 1;
        reservedDetails.push(`${long2Ip(networkLong)}: Network Address`);
        reservedDetails.push(`${long2Ip(networkLong + 1)}: AWS VPC Router / Default Gateway`);
        reservedDetails.push(`${long2Ip(networkLong + 2)}: AWS VPC DNS Server`);
        reservedDetails.push(`${long2Ip(networkLong + 3)}: AWS reserved for future use`);
        reservedDetails.push(`${long2Ip(broadcastLong)}: Broadcast Address`);
      } else {
        usableHosts = 0;
        firstUsableLong = 0;
        lastUsableLong = 0;
        reservedDetails.push(`AWS requires subnets of at least /28 (minimum 8 addresses) to allocate usable IPs. 5 reserved addresses consume the entire range.`);
      }
    } else if (cloud === 'azure') {
      // Azure Reserves 5 IP addresses
      if (totalHosts >= 8) {
        usableHosts = totalHosts - 5;
        firstUsableLong = networkLong + 4;
        lastUsableLong = broadcastLong - 1;
        reservedDetails.push(`${long2Ip(networkLong)}: Network Address`);
        reservedDetails.push(`${long2Ip(networkLong + 1)}: Azure VNet Default Gateway`);
        reservedDetails.push(`${long2Ip(networkLong + 2)}: Azure DNS Server`);
        reservedDetails.push(`${long2Ip(networkLong + 3)}: Azure DHCP / Router mapping`);
        reservedDetails.push(`${long2Ip(broadcastLong)}: Broadcast Address`);
      } else {
        usableHosts = 0;
        firstUsableLong = 0;
        lastUsableLong = 0;
        reservedDetails.push(`Azure requires subnets of at least /28 (minimum 8 addresses) to allocate usable IPs. 5 reserved addresses consume the entire range.`);
      }
    } else if (cloud === 'gcp') {
      // GCP Reserves 4 IP addresses
      if (totalHosts >= 4) {
        usableHosts = totalHosts - 4;
        firstUsableLong = networkLong + 1; // GCP gateway is usually .1
        lastUsableLong = broadcastLong - 2; // GCP second-to-last is reserved
        
        // Wait, let's trace:
        // .0: Network
        // .1: Gateway
        // Last-1: Future use
        // Last: Broadcast
        // Standard range: .2 to Last-2
        // So first usable is networkLong + 2 (since gateway is .1)
        // Wait, standard range is indeed firstUsableLong = networkLong + 2
        // Let's verify GCP usable range:
        // If subnet is 10.0.0.0/24:
        // 10.0.0.0: Network address
        // 10.0.0.1: Default gateway
        // 10.0.0.254: Second-to-last reserved
        // 10.0.0.255: Broadcast
        // Usable are 10.0.0.2 through 10.0.0.253.
        // Yes! So firstUsableLong = networkLong + 2. LastUsableLong = broadcastLong - 2.
        firstUsableLong = networkLong + 2;
        lastUsableLong = broadcastLong - 2;
        
        reservedDetails.push(`${long2Ip(networkLong)}: Network Address`);
        reservedDetails.push(`${long2Ip(networkLong + 1)}: GCP Subnet Default Gateway`);
        reservedDetails.push(`${long2Ip(broadcastLong - 1)}: GCP reserved for future use`);
        reservedDetails.push(`${long2Ip(broadcastLong)}: Broadcast Address`);
      } else {
        usableHosts = 0;
        firstUsableLong = 0;
        lastUsableLong = 0;
        reservedDetails.push(`GCP requires subnets of at least /29 (minimum 8 addresses) to allocate usable IPs.`);
      }
    }
  }

  return {
    network: long2Ip(networkLong),
    broadcast: long2Ip(broadcastLong),
    netmask: long2Ip(maskLong),
    wildcard: long2Ip(wildcardLong),
    firstUsable: firstUsableLong === 0 ? "N/A" : long2Ip(firstUsableLong),
    lastUsable: lastUsableLong === 0 ? "N/A" : long2Ip(lastUsableLong),
    totalHosts,
    usableHosts: Math.max(0, usableHosts),
    reservedDetails
  };
}

// Generate bitwise visualization information
export function getBinaryBits(ip: string, cidr: number): BitInfo[] {
  if (!validateIPv4(ip)) ip = "0.0.0.0";
  const ipLong = ip2Long(ip);
  const binaryString = ipLong.toString(2).padStart(32, '0');
  
  const bits: BitInfo[] = [];
  for (let i = 0; i < 32; i++) {
    const octetIndex = Math.floor(i / 8) + 1;
    const bitIndex = i % 8;
    bits.push({
      val: binaryString[i],
      type: i < cidr ? 'net' : 'host',
      octetIndex,
      bitIndex
    });
  }
  return bits;
}

// Parse IPv6 address into its expanded form
export function expandIPv6(address: string): string {
  address = address.trim();
  
  // Handle double colon compression
  if (address === '::') {
    return Array(8).fill('0000').join(':');
  }
  
  let parts = address.split(':');
  if (parts.length < 8) {
    const emptyIndex = parts.indexOf('');
    if (emptyIndex !== -1) {
      const neededZeros = 8 - (parts.length - 1);
      const zeroFields = Array(neededZeros).fill('0000');
      
      // Check if it's trailing or leading double colon
      if (emptyIndex === 0 && parts[1] === '') {
        parts = [...zeroFields, ...parts.slice(2)];
      } else if (emptyIndex === parts.length - 1 && parts[parts.length - 2] === '') {
        parts = [...parts.slice(0, parts.length - 2), ...zeroFields];
      } else {
        parts = [
          ...parts.slice(0, emptyIndex),
          ...zeroFields,
          ...parts.slice(emptyIndex + 1)
        ];
      }
    }
  }
  
  // Pad each field to 4 hex digits
  return parts.map(part => part.padStart(4, '0')).join(':');
}

// Compress IPv6 address to standard format
export function compressIPv6(expandedAddress: string): string {
  const parts = expandedAddress.split(':').map(part => {
    // Remove leading zeros
    const cleaned = part.replace(/^0+/, '');
    return cleaned === '' ? '0' : cleaned;
  });
  
  // Find the longest run of consecutive '0' fields
  let maxZeroStart = -1;
  let maxZeroLen = 0;
  let currentZeroStart = -1;
  let currentZeroLen = 0;
  
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '0') {
      if (currentZeroStart === -1) {
        currentZeroStart = i;
      }
      currentZeroLen++;
    } else {
      if (currentZeroLen > maxZeroLen) {
        maxZeroLen = currentZeroLen;
        maxZeroStart = currentZeroStart;
      }
      currentZeroStart = -1;
      currentZeroLen = 0;
    }
  }
  
  if (currentZeroLen > maxZeroLen) {
    maxZeroLen = currentZeroLen;
    maxZeroStart = currentZeroStart;
  }
  
  // Replace only if length > 1
  if (maxZeroLen > 1) {
    const left = parts.slice(0, maxZeroStart).join(':');
    const right = parts.slice(maxZeroStart + maxZeroLen).join(':');
    return `${left}::${right}`;
  }
  
  return parts.join(':');
}

// Classify IPv6 address type
export function classifyIPv6(expandedAddress: string): { type: string; description: string } {
  const clean = expandedAddress.toLowerCase();
  
  if (clean === '0000:0000:0000:0000:0000:0000:0000:0001') {
    return { type: "Loopback", description: "Equivalent to 127.0.0.1. Used for system testing." };
  }
  if (clean === '0000:0000:0000:0000:0000:0000:0000:0000') {
    return { type: "Unspecified", description: "Used as dummy address before assigning real IP." };
  }
  if (clean.startsWith('fe80')) {
    return { type: "Link-Local Unicast", description: "Self-configured address used for local network segment only." };
  }
  if (clean.startsWith('fc') || clean.startsWith('fd')) {
    return { type: "Unique Local Unicast", description: "Equivalent to IPv4 private ranges (RFC 4193)." };
  }
  if (clean.startsWith('ff')) {
    return { type: "Multicast", description: "One-to-many communication address." };
  }
  if (clean.startsWith('2') || clean.startsWith('3')) {
    return { type: "Global Unicast", description: "Publicly routable IP address on the internet." };
  }
  return { type: "Reserved / Unknown", description: "Addresses allocated for special standard protocols." };
}

// Split an IPv6 CIDR space
export function splitIPv6Range(address: string, basePrefix: number, targetPrefix: number): string[] {
  const expanded = expandIPv6(address);
  const parts = expanded.split(':').map(field => parseInt(field, 16));
  
  // Convert fields into big integers or custom hex increments
  // Since JS handles up to 53-bit ints safely, and IPv6 is 128-bit,
  // we do operations on the array blocks directly.
  const subnets: string[] = [];
  const subnetCount = Math.min(16, Math.pow(2, targetPrefix - basePrefix));
  
  // Determine which block of 16-bits we are editing
  // e.g., if basePrefix is 48 and targetPrefix is 56, difference is 8 bits (256 subnets).
  // We modify block 3 (fields are 0-indexed: 0, 1, 2, 3 represents bits 48-64)
  for (let i = 0; i < subnetCount; i++) {
    const workingParts = [...parts];
    
    // Simple incremental math for standard delegators (e.g. /48 -> /64)
    // We target the bit range from basePrefix to targetPrefix
    // For visual safety, we'll demonstrate subnet increments on the 16-bit blocks:
    const blockIndex = Math.floor(basePrefix / 16);
    const bitOffset = basePrefix % 16;
    
    // Calculate increment value in the target block
    // E.g. /48 to /56 -> basePrefix 48 is blockIndex 3, bitOffset 0.
    // targetPrefix 56 is in blockIndex 3, offset 8.
    // Increment step is 1 << (16 - (targetPrefix - basePrefix * block boundaries))
    const shift = 16 - (targetPrefix - (blockIndex * 16));
    if (shift >= 0 && shift < 16) {
      const increment = i * (1 << shift);
      workingParts[blockIndex] = (workingParts[blockIndex] + increment) & 0xFFFF;
    } else {
      // Just modify the next block
      const nextBlockIndex = Math.floor(targetPrefix / 16) - 1;
      workingParts[nextBlockIndex] = (workingParts[nextBlockIndex] + i) & 0xFFFF;
    }
    
    const hexParts = workingParts.map(val => val.toString(16).padStart(4, '0'));
    const expAddr = hexParts.join(':');
    subnets.push(compressIPv6(expAddr) + `/${targetPrefix}`);
  }
  
  return subnets;
}
