# AegisFamily — Parental Control System & Mobile Companion Platform

A premium, interactive demonstration of a modern family safety and digital wellbeing platform. Built with React, TypeScript, Tailwind CSS, Framer Motion, and Recharts.

---

## 🚀 Live Demo & Environments

The platform consists of three interconnected environments:
1. **Public Marketing Website (`/`)**: Feature showcases, interactive previews, platform compatibility, and FAQ.
2. **Owner Central Admin Panel (`/admin`)**: Account management, subscription tier control, device registry, live telemetry logs, and access revocation.
3. **Parent Control Dashboard (`/parent`)**: Live family location map, customizable screen-time goals, aggregate privacy-safe activity reports, and notification alerts.
4. **Child Companion Mobile App (`/child`)**: Consent-based mobile companion preview with a 5-step transparent device enrollment flow, privacy permissions, and wellbeing progress meters.

---

## 🔑 Demonstration Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Parent Account** | `parent@demo.com` | `demo123` |
| **Owner Admin** | `admin@demo.com` | `admin123` |

*(One-click auto-fill buttons are available on the login page)*

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom warm-neutral palette (`#F8F8F5`, `#252B2A`, `#58786B`, `#405E53`)
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Visualizations**: Recharts (Screen Time, Telemetry Area Charts, Subscriber Distribution)
- **Deployment**: Configured for seamless one-click Netlify hosting with `netlify.toml` and SPA redirect rules.

---

## 📦 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Preview build locally
npm run preview
```

---

## 🌐 Netlify Deployment

This repository is pre-configured with `netlify.toml` and `public/_redirects`:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **SPA Fallback**: Configured to route all paths to `/index.html` with status `200`
