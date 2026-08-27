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
  return regex.test(ip);
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
