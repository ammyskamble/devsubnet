import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const curriculumPath = path.join(rootDir, 'scratch', 'daily_content_curriculum.json');
const learnIndexPath = path.join(rootDir, 'src', 'pages', 'learn', 'index.astro');

if (!fs.existsSync(curriculumPath)) {
  console.error(`Curriculum not found at: ${curriculumPath}`);
  process.exit(1);
}

const curriculum = JSON.parse(fs.readFileSync(curriculumPath, 'utf8'));
const nextTopic = curriculum.topics.find((t) => t.status === 'pending');

if (!nextTopic) {
  console.log('All scheduled topics have already been published!');
  process.exit(0);
}

console.log(`\n==============================================`);
console.log(`Processing Topic #${nextTopic.id}: ${nextTopic.title}`);
console.log(`Slug: ${nextTopic.slug}`);
console.log(`Category: ${nextTopic.category}`);
console.log(`==============================================\n`);

const articleTargetFile = path.join(rootDir, 'src', 'pages', 'learn', `${nextTopic.slug}.astro`);

// Topic-specific curriculum content templates satisfying all Student Content Writer guidelines
const topicTemplates = {
  'default-gateway-explained-simply': {
    readingTime: '6 min read',
    description: 'Understand default gateways with the office turnstile analogy. Learn why your computer can talk locally without a gateway, but needs one the millisecond it visits google.com.',
    badgeIcon: '🚪',
    headerAnalogyTitle: 'The Office Turnstile & Security Guard Analogy',
    analogyText: `
      Imagine working in a secure office building:
      <ul>
        <li><strong>Inside the Room (Local Network):</strong> When talking to coworkers at adjacent desks, you hand documents directly to them. No security guards or passports required.</li>
        <li><strong>Leaving the Building (The Internet):</strong> To send a parcel to another city or branch office, you CANNOT throw it across the street. You must walk to the <strong>lobby turnstile (The Default Gateway)</strong> and hand it to the courier guard, who routes it out into the public world.</li>
      </ul>
    `,
    comparisonRows: [
      ['Analogy', 'Direct Desk-to-Desk Hand-off', 'Lobby Security Turnstile / Exit Guard'],
      ['Network Target', 'Same Subnet (e.g. 192.168.1.50 -> 192.168.1.75)', 'Remote Subnet / Internet (e.g. 192.168.1.50 -> 8.8.8.8)'],
      ['Gateway Involved?', 'No. ARP resolves destination MAC directly on switch', 'Yes! Packet destination MAC is set to Gateway router'],
      ['Routing Table Flag', 'Local On-link / Directly Connected', 'Default Route (0.0.0.0/0) pointing to Gateway IP']
    ],
    mathTitle: 'How Your Device Decides: The Bitwise AND Test',
    mathCalculations: [
      ['Source IP & Mask:', '192.168.1.50 & 255.255.255.0 = 192.168.1.0'],
      ['Target A (Local):', '192.168.1.90 & 255.255.255.0 = 192.168.1.0 (MATCH! Send directly)'],
      ['Target B (Google):', '142.250.190.46 & 255.255.255.0 = 142.250.190.0 (NO MATCH! Forward to Gateway 192.168.1.1)']
    ],
    quizQuestions: [
      {
        q: 'What happens if your default gateway is configured with the wrong IP address?',
        a: 'You can still talk to other computers and printers on your local Wi-Fi/switch, but you will completely lose internet access (no Google, no external servers) because outbound packets cannot leave the subnet.'
      },
      {
        q: 'What is the default route CIDR notation representing "all internet traffic"?',
        a: '0.0.0.0/0 with a subnet mask of 0.0.0.0. It acts as the catch-all wildcard for any packet whose destination does not match a more specific local subnet route.'
      }
    ],
    takeaways: [
      'The Default Gateway is your local network\'s exit door—typically your home Wi-Fi router (like 192.168.1.1).',
      'Local communication never touches the gateway; only traffic destined for external networks gets handed to it.',
      'Routers evaluate every destination IP with a bitwise AND mask to decide whether to deliver locally or forward to the gateway.'
    ]
  },
  'dns-explained-the-internet-phonebook': {
    readingTime: '7 min read',
    description: 'Discover how DNS translates human domain names into computer IP addresses using the giant phonebook analogy, from browser cache to root nameservers.',
    badgeIcon: '📖',
    headerAnalogyTitle: 'The Smartphone Contacts List Analogy',
    analogyText: `
      Think of your smartphone\'s contact list:
      <ul>
        <li><strong>Human Names:</strong> You tap "Mom" or "Alex" because human brains are great at remembering names.</li>
        <li><strong>Phone Numbers:</strong> The telecom cellular towers don\'t understand who "Mom" is—they require digits like +1-555-0199 to connect the circuit.</li>
        <li><strong>DNS is the translation engine:</strong> It takes names like <code>devsubnet.com</code> and immediately finds the numerical IP address <code>172.67.182.100</code> so your router can fetch the webpage.</li>
      </ul>
    `,
    comparisonRows: [
      ['Analogy', 'Contact Name ("Mom")', 'Dialable Number (+1-555-0199)'],
      ['Technical Term', 'Fully Qualified Domain Name (FQDN)', 'IPv4 or IPv6 Address (A / AAAA Record)'],
      ['Server Handling', 'Authoritative Nameserver / Root Server', 'Resolver / ISP Cache (1.1.1.1 or 8.8.8.8)'],
      ['Latency Impact', 'Instant if cached in phone memory', '10-50ms if traversing recursive query hierarchy']
    ],
    mathTitle: 'The DNS Query Hierarchy: Step-by-Step Resolution',
    mathCalculations: [
      ['Step 1: Browser / OS Cache', 'Check local cache (0ms latency)'],
      ['Step 2: Recursive Resolver', 'Ask ISP / 1.1.1.1 / 8.8.8.8'],
      ['Step 3: Root Nameservers (.)', '13 root server clusters direct to TLD (.com)'],
      ['Step 4: Authoritative Server', 'Returns final A Record: 172.67.182.100 (Cached with TTL seconds)']
    ],
    quizQuestions: [
      {
        q: 'What is a DNS TTL (Time To Live)?',
        a: 'A TTL is a counter in seconds indicating how long recursive resolvers and browsers are allowed to cache an IP address before asking the authoritative server again.'
      },
      {
        q: 'What is the difference between an A record and an AAAA record?',
        a: 'An "A" record maps a domain name to a 32-bit IPv4 address, while an "AAAA" (quad-A) record maps a domain name to a 128-bit IPv6 address.'
      }
    ],
    takeaways: [
      'DNS translates human-readable domain names into machine-routable IP addresses.',
      'Resolution cascades through browser cache, OS resolver, root servers, TLD servers, and authoritative nameservers.',
      'TTL settings balance caching performance with the speed of updating server IP changes.'
    ]
  }
};

const templateData = topicTemplates[nextTopic.slug] || {
  readingTime: '6 min read',
  description: `${nextTopic.title}. An intuitive, step-by-step networking guide for students and developers.`,
  badgeIcon: '💡',
  headerAnalogyTitle: 'The Intuitive Real-World Analogy',
  analogyText: `<p><strong>Analogy:</strong> ${nextTopic.analogy}</p>`,
  comparisonRows: [
    ['Concept Element', 'Everyday Analogy', 'Networking Reality'],
    ['Core Focus', nextTopic.analogy.split(';')[0] || 'Physical representation', 'Underlying protocol mechanism'],
    ['Scope', 'Local tangible environment', 'Global distributed internet architecture']
  ],
  mathTitle: 'Technical Architecture & Step-by-Step Breakdown',
  mathCalculations: [
    ['Key Protocol:', nextTopic.title],
    ['Category:', nextTopic.categoryLabel || 'Architecture & RFCs'],
    ['Target Concept:', (nextTopic.targetKeywords || []).join(', ')]
  ],
  quizQuestions: [
    {
      q: `Why is understanding ${nextTopic.title} critical for network engineering?`,
      a: 'It establishes the core architectural boundary between local link transmission and global routed protocols, preventing routing anomalies and data collisions.'
    },
    {
      q: 'How does this concept directly apply to everyday computer troubleshooting?',
      a: 'Recognizing whether a failure occurs at the physical/link layer or the logical addressing layer immediately isolates the hardware or configuration problem.'
    }
  ],
  takeaways: [
    `${nextTopic.title} is a cornerstone concept in computer networking.`,
    `Understanding the analogy (${nextTopic.analogy}) ensures you retain the architectural mental model.`,
    'Mastering these fundamentals enables fast diagnosing of local and cloud subnet routing.'
  ]
};

const articleSource = `---
import Layout from '../../layouts/Layout.astro';
import NavBar from '../../components/NavBar.astro';
import Footer from '../../components/Footer.astro';
import ArticleHeader from '../../components/learn/ArticleHeader.astro';
import RelatedToolsCard from '../../components/learn/RelatedToolsCard.astro';
import { type SupportedLanguage } from '../../utils/i18n';

const lang = (Astro.currentLocale as SupportedLanguage) || 'en';

const articleKeywords = ${JSON.stringify(nextTopic.targetKeywords || ['Networking', 'Subnetting', 'Learn'])};
---

<Layout
  lang={lang}
  title="${nextTopic.title} | DevSubnet Learn"
  description="${templateData.description}"
>
  <div class="app-shell">
    <NavBar lang={lang} path="learn" />

    <main class="page-main">
      <article class="content-container article-layout">
        <ArticleHeader
          category="${nextTopic.category}"
          title="${nextTopic.title}"
          description="${templateData.description}"
          publishDate="September 2026"
          readingTime="${templateData.readingTime}"
          keywords={articleKeywords}
        />

        <div class="article-content">
          <!-- Section 1: Real-World Anchor -->
          <section class="content-section">
            <h2>The Real-World Anchor: Building the Mental Model</h2>
            <div class="analogy-banner">
              <div class="analogy-icon">${templateData.badgeIcon}</div>
              <div class="analogy-text">
                <h3>${templateData.headerAnalogyTitle}</h3>
                ${templateData.analogyText}
              </div>
            </div>
          </section>

          <!-- Section 2: Side-by-Side Comparison -->
          <section class="content-section">
            <h2>Think of It Like This: Side-by-Side Comparison</h2>
            <div class="table-responsive">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Real-World Mental Model</th>
                    <th>Networking Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  ${templateData.comparisonRows
                    .map(
                      (row) => `
                  <tr>
                    <td><strong>${row[0]}</strong></td>
                    <td>${row[1]}</td>
                    <td>${row[2]}</td>
                  </tr>`
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
          </section>

          <!-- Section 3: Numerical & Technical Breakdown -->
          <section class="content-section">
            <h2>Under the Hood: ${templateData.mathTitle}</h2>
            <div class="math-card">
              <div class="math-body">
                ${templateData.mathCalculations
                  .map(
                    (calc) => `
                <div class="calc-row">
                  <span class="calc-label">${calc[0]}</span>
                  <code>${calc[1]}</code>
                </div>`
                  )
                  .join('')}
              </div>
            </div>
          </section>

          <!-- Section 4: Quick Knowledge Check -->
          <section class="content-section">
            <h2>Quick Knowledge Check (Test Your Understanding)</h2>
            <p>Click each question to test if you've mastered this concept:</p>
            <div class="quiz-container">
              ${templateData.quizQuestions
                .map(
                  (q, idx) => `
              <details class="quiz-item">
                <summary class="quiz-question">
                  <span class="quiz-q-num">Q${idx + 1}</span>
                  <span>${q.q}</span>
                </summary>
                <div class="quiz-answer">
                  <p><strong>Answer:</strong> ${q.a}</p>
                </div>
              </details>`
                )
                .join('')}
            </div>
          </section>

          <!-- Section 5: Key Takeaways -->
          <section class="content-section">
            <div class="takeaways-card">
              <div class="takeaways-header">
                <span class="takeaways-icon">🎯</span>
                <h3>3 Key Takeaways to Remember</h3>
              </div>
              <ul class="takeaways-list">
                ${templateData.takeaways.map((t) => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          </section>

          <!-- Section 6: Related Tools Bridge -->
          <RelatedToolsCard
            tools={[
              {
                title: 'IPv4 Subnet Calculator',
                description: 'Explore subnet boundaries, host counts, and network masks with live bitwise calculations.',
                href: '/',
                icon: '⚡',
                tag: 'Popular'
              },
              {
                title: 'Subnet Cheat Sheet',
                description: 'Fast lookup guide for /1 through /32 prefix sizes and netmasks.',
                href: '/subnet-cheat-sheet',
                icon: '📋',
                tag: 'Reference'
              },
              {
                title: 'What is a Subnet Guide',
                description: 'Foundational guide explaining prefix lengths, network IDs, and broadcast addresses.',
                href: '/what-is-a-subnet',
                icon: '💡',
                tag: 'Concepts'
              }
            ]}
          />
        </div>
      </article>
    </main>

    <Footer lang={lang} />
  </div>
</Layout>

<style>
  .article-layout {
    max-width: 840px;
    margin: 0 auto;
    padding: 2rem 1.25rem 5rem 1.25rem;
  }

  .article-content {
    font-size: 1.05rem;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .content-section {
    margin-bottom: 3rem;
  }

  .content-section h2 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 2.25rem 0 1rem 0;
    letter-spacing: -0.015em;
  }

  .analogy-banner {
    display: flex;
    gap: 1.25rem;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%);
    border: 1px solid rgba(59, 130, 246, 0.25);
    border-radius: var(--radius-md);
    padding: 1.5rem;
    margin: 1.75rem 0;
  }

  .analogy-icon {
    font-size: 2.25rem;
    flex-shrink: 0;
    line-height: 1;
  }

  .analogy-text h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
    font-size: 1.25rem;
  }

  .table-responsive {
    overflow-x: auto;
    margin: 1.75rem 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--bg-surface);
    font-size: 0.92rem;
    text-align: left;
  }

  .comparison-table th, .comparison-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  .comparison-table th {
    background: rgba(0, 0, 0, 0.25);
    font-weight: 600;
    color: var(--text-muted);
    font-size: 0.8125rem;
    text-transform: uppercase;
  }

  .math-card {
    background: var(--panel-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1.25rem 1.5rem;
    margin: 1.5rem 0;
  }

  .calc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.45rem 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  }

  .calc-row:last-child {
    border-bottom: none;
  }

  .calc-label {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .calc-row code {
    font-family: var(--font-mono);
    color: #a78bfa;
    background: rgba(167, 139, 250, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius-sm);
  }

  .quiz-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .quiz-item {
    background: var(--panel-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .quiz-question {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    cursor: pointer;
    font-weight: 600;
    color: var(--text-primary);
  }

  .quiz-q-num {
    background: rgba(59, 130, 246, 0.15);
    color: #60a5fa;
    padding: 0.2rem 0.55rem;
    border-radius: var(--radius-sm);
    font-size: 0.8rem;
    font-weight: 700;
  }

  .quiz-answer {
    padding: 1rem 1.25rem;
    background: rgba(0, 0, 0, 0.2);
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
  }

  .takeaways-card {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: var(--radius-md);
    padding: 1.75rem;
    margin: 2rem 0;
  }

  .takeaways-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .takeaways-header h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #34d399;
  }

  .takeaways-list {
    margin: 0;
    padding-left: 1.25rem;
  }

  .takeaways-list li {
    margin-bottom: 0.75rem;
    font-size: 0.98rem;
    color: var(--text-primary);
  }
</style>
`;

fs.writeFileSync(articleTargetFile, articleSource, 'utf8');
console.log(`Created article at: ${articleTargetFile}`);

// Update learn/index.astro
let learnIndexContent = fs.readFileSync(learnIndexPath, 'utf8');

const newArticleEntry = `  {
    slug: '/learn/${nextTopic.slug}',
    title: '${nextTopic.title.replace(/'/g, "\\'")}',
    description: '${templateData.description.replace(/'/g, "\\'")}',
    category: '${nextTopic.category}',
    categoryLabel: '${nextTopic.categoryLabel || 'Architecture & RFCs'}',
    categoryIcon: '${templateData.badgeIcon}',
    readingTime: '${templateData.readingTime}',
    date: 'September 2026',
    keywords: ${JSON.stringify(nextTopic.targetKeywords || [])}
  },`;

learnIndexContent = learnIndexContent.replace(
  'const articles = [\n',
  `const articles = [\n${newArticleEntry}\n`
);

fs.writeFileSync(learnIndexPath, learnIndexContent, 'utf8');
console.log(`Registered article in: ${learnIndexPath}`);

// Update curriculum
nextTopic.status = 'published';
nextTopic.publishedDate = new Date().toISOString();

fs.writeFileSync(curriculumPath, JSON.stringify(curriculum, null, 2), 'utf8');
console.log(`Marked topic #${nextTopic.id} as published in curriculum.`);

console.log('\nRunning build validation...');
try {
  execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
  console.log('\nBuild verification successful!');
} catch (err) {
  console.error('Build verification failed:', err.message);
  process.exit(1);
}
