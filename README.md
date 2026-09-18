# DevSubnet 🌐

> Free, 100% client-side IP subnet and CIDR calculator engineered for network engineers, DevOps specialists, and cloud architects.

Live application: **[devsubnet.com](https://devsubnet.com)**

---

## ⚡ Key Features

- **100% Client-Side Execution:** Zero server logging or external telemetry. Internal network schemas and private IP topology never leave your browser.
- **Cloud-Aware VPC Reservations:** Accounts for platform-reserved addresses across AWS VPC (5 IPs), Azure VNet (5 IPs), and Google Cloud VPC (4 IPs).
- **IaC Export:** 1-click syntax generation for Terraform (`cidrsubnet()`), Cisco IOS, Linux `iproute2`, and AWS CloudFormation.
- **Kubernetes CNI Planning:** Sizing tools for Pod and Service CIDR allocations (Cilium, Calico, AWS VPC CNI).
- **Interactive Visual Splitter:** Recursive subnet tree visualization and binary bitwise allocation grids.
- **CCNA/CCNP Exam Derivations:** Step-by-step mathematical breakdowns including magic numbers, block boundaries, and wildcard masks.

---

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build)
- **Language:** TypeScript / JavaScript
- **Styling:** Tailwind CSS
- **Deployment:** Cloudflare Pages / Workers

---

## 🚀 Local Development

git clone https://github.com/ammyskamble/devsubnet.git

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
