import React, { useState, useMemo, useTransition, useEffect } from 'react';
import { calculateSubnet } from '../utils/subnetMath';

export const SubnetCalculator: React.FC = () => {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState(24);
  const [cloud, setCloud] = useState<'standard' | 'aws' | 'azure' | 'gcp'>('standard');
  const [isPending, startTransition] = useTransition();

  // Strict URL bar cleaning on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  // Wrap calculation math inside useMemo to eliminate main-thread blocking (TBT)
  const result = useMemo(() => {
    return calculateSubnet(ip, cidr, cloud);
  }, [ip, cidr, cloud]);

  // Non-blocking IP text input handler using useTransition
  const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    startTransition(() => {
      setIp(val);
    });
  };

  // Non-blocking CIDR slider/input handler
  const handleCidrChange = (newCidr: number) => {
    startTransition(() => {
      setCidr(newCidr);
    });
  };

  return (
    <div className="subnet-calculator-react">
      <div className="input-group">
        <label htmlFor="react-ip">IPv4 Address</label>
        <input
          id="react-ip"
          type="text"
          value={ip}
          onChange={handleIpChange}
          placeholder="e.g. 10.0.0.0"
        />
      </div>

      <div className="input-group">
        <label htmlFor="react-cidr">CIDR Prefix (/{cidr})</label>
        <input
          id="react-cidr"
          type="range"
          min={0}
          max={32}
          value={cidr}
          onChange={(e) => handleCidrChange(parseInt(e.target.value, 10))}
        />
      </div>

      {isPending && <div className="calculating-spinner">Updating calculations...</div>}

      <div className="results-summary">
        <p><strong>Network:</strong> {result.network}/{cidr}</p>
        <p><strong>Netmask:</strong> {result.subnetMask}</p>
        <p><strong>Usable Hosts:</strong> {result.usableHosts.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SubnetCalculator;
