import React from 'react';

export const ExtendedTools: React.FC = () => {
  return (
    <div className="extended-tools-container" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
      <div className="panel-heading" style={{ marginBottom: '1rem' }}>
        <div>
          <span className="step" style={{ background: 'rgba(145, 80, 245, 0.15)', color: 'var(--accent-host)' }}>03</span>
          <h2>Extended Developer & Network Tools</h2>
        </div>
        <span className="live-label" style={{ background: 'rgba(145, 80, 245, 0.12)', color: 'var(--accent-host)' }}>DNS & WHOIS UTILITIES</span>
      </div>

      <p className="aside-copy" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
        Perform domain resolution, IP ownership lookups, and reverse DNS records directly via authoritative queries:
      </p>

      <div className="tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.875rem' }}>
        <a
          href="https://dns.google/"
          target="_blank"
          rel="noopener noreferrer"
          className="tool-card-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600 }}
        >
          <span>Google DNS Lookup</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>dns.google ↗</span>
        </a>

        <a
          href="https://whois.arin.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="tool-card-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600 }}
        >
          <span>ARIN WHOIS Registry</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>arin.net ↗</span>
        </a>

        <a
          href="https://one.one.one.one/"
          target="_blank"
          rel="noopener noreferrer"
          className="tool-card-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600 }}
        >
          <span>Cloudflare 1.1.1.1 DNS</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>1.1.1.1 ↗</span>
        </a>

        <a
          href="https://bgp.he.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="tool-card-btn"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 600 }}
        >
          <span>BGP Route Inspector</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>he.net ↗</span>
        </a>
      </div>
    </div>
  );
};

export default ExtendedTools;
