import React, { useState, useMemo, useTransition, useEffect } from 'react';
import { calculateSubnet } from '../utils/subnetMath';

interface SubnetCalculatorProps {
  userType?: 'student' | 'business';
}

export const SubnetCalculator: React.FC<SubnetCalculatorProps> = ({
  userType = 'student'
}) => {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState(24);
  const [cloud, setCloud] = useState<'standard' | 'aws' | 'azure' | 'gcp'>('standard');
  const showCloudSelector = userType === 'business';
  const showSteps = userType === 'student';
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

      {showCloudSelector && (
        <div className="input-group">
          <label htmlFor="react-cloud">Cloud Rules</label>
          <select
            id="react-cloud"
            value={cloud}
            onChange={(e) => setCloud(e.target.value as 'standard' | 'aws' | 'azure' | 'gcp')}
          >
            <option value="standard">Standard</option>
            <option value="aws">AWS (reserves 5 IPs)</option>
            <option value="azure">Azure (reserves 5 IPs)</option>
            <option value="gcp">GCP (reserves 4 IPs)</option>
          </select>
        </div>
      )}

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

      {showSteps && <p className="steps-note">Calculation steps: Network ID → Broadcast → First usable → Last usable → Total addresses</p>}

      {isPending && <div className="calculating-spinner">Updating calculations...</div>}

      <div className="results-summary">
        <p><strong>Network:</strong> {result.network}/{cidr}</p>
        <p><strong>Netmask:</strong> {result.netmask}</p>
        {showSteps && <p><strong>Broadcast:</strong> {result.broadcast}</p>}
        {showSteps && <p><strong>First Usable:</strong> {result.firstUsable}</p>}
        {showSteps && <p><strong>Last Usable:</strong> {result.lastUsable}</p>}
        <p><strong>Usable Hosts:</strong> {result.usableHosts.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SubnetCalculator;
