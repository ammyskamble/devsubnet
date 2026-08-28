import React from 'react';

interface BitInfo {
  val: string;
  type: 'net' | 'host';
  bitIndex: number;
  octetIndex: number;
}

interface BinaryLayoutGridProps {
  bits: BitInfo[];
}

export const BinaryLayoutGrid: React.FC<BinaryLayoutGridProps> = ({ bits }) => {
  return (
    <div className="binary-auto-wrap-container">
      <div className="binary-legend">
        <span className="legend-item">
          <span className="legend-badge net"></span> Network Bits
        </span>
        <span className="legend-item">
          <span className="legend-badge host"></span> Host Bits
        </span>
      </div>

      {/* 32-Bit Responsive 8-Column Auto-Wrapping Flex Grid */}
      <div className="binary-flex-grid">
        {bits.map((bit, idx) => (
          <div
            key={idx}
            className={`binary-pill-bit ${bit.type}`}
            title={`Octet ${bit.octetIndex}, Bit ${bit.bitIndex + 1}: ${bit.type === 'net' ? 'Network' : 'Host'} Bit`}
          >
            {bit.val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinaryLayoutGrid;
