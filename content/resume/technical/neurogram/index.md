{
    "title": "🧠 Neurogram",
    "layout": "single"
}
### Senior Frontend Engineer - React.js 📅 Nov 2023 - Nov 2024  
![Neurogram Header](/images/neurogram-header.webp)  
# 🌲 Project Treemap {#neurogram-project-treemap}  
![Neurogram Treemap](/images/neurogram-treemap.webp)  
# 🧱 Tech Stack {#neurogram-tech-stack}  
- **Backend and Cloud:** Firebase, Google Cloud Platform, Python  
- **Build Tool:** Vite  
- **Charts and Visualization:** Plotly.js (basic-dist, dist), react-minimal-pie-chart, react-plotly.js  
- **CI/CD Platform:** GitHub Actions (2-click deployment, mono-repo integration)  
- **Component Library and UI:** Bootstrap 5, Custom Design System, React Draggable, React Zoom Pan Pinch  
- **Data Fetching and Networking:** Axios, Axios Retry, React Use WebSocket  
- **Date and Time:** Day.js, Moment.js  
- **Documents and PDFs:** @react-pdf/renderer, canvas2image, html2canvas, jspdf, pdfjs-dist, quill-to-pdf, react-pdf  
- **Encryption and Security:** crypto-es (AES), JSEncrypt (RSA)  
- **Forms and Validation:** @hookform/resolvers, React Hook Form, Yup, yup-locales  
- **Internationalization (i18n):** i18next, react-i18next, yup-locales  
- **JavaScript Framework:** React.js 18  
- **Media and Players:** React Player, Video React  
- **Mocking and Testing:** MirageJS, MSW (Mock Service Worker)  
- **Rich Text and Editors:** Suneditor, Suneditor React  
- **Routing:** React Router DOM  
- **State Management:** React Context, React Query (@tanstack/react-query)  
- **Storage:** LocalForage, LocalForage Session Storage Wrapper  
- **Styling and Normalization:** custom reusable modules, modern-normalize  
- **Utilities:** Brazilian Utils, Buffer, Filt, Get User Locale, Lodash, Match Sorter, Randomatic, Shortid, Sort By, Stream Browserify, Retry, UUID  


# 🌟 STAR Cases  



## STAR Case - Fragmented codebase  
### Situation  
The previous codebase combined Rails, React, Tailwind, GraphQL, and Docker across multiple repositories with **duplicated components** and scattered configs. This fragmentation caused **long onboarding** times, inconsistent standards, and clear signs of **vendor lock-in**.

### Task
Given the team's seniority, I set out to **reshape the project's stack**, replacing dependency hell **with an architecture that was simple**, maintainable, and sustainable, pursuing the **following objectives**:
1. **Standardize tooling** into a single, reliable workflow.  
2. **Accelerate onboarding** so developers could focus on building instead of setup.  
3. **Align stack with team skills** rather than forcing over-engineered solutions.  
4. **Prevent future rewrites** by choosing technologies compatible with the existing backend.  

### Actions
My first step was to **assess** what could be **salvaged** from the frontend. After several attempts, I confirmed that **refactoring** would be **slower than starting fresh**. Between **Next.js** and **Vite**, the latter was chosen for its **faster builds**, **simpler configuration**, and better **alignment with the backend stack** based on **Firebase** and **GCP**.  

Instead of leaving **developers** to **wrestle with** separate **Babel**, **PostCSS**, **Tailwind**, and **Docker** setups, I **collapsed dependencies** into one consistent **Vite configuration**. This **dramatically improved setup time** and enabled features like **obfuscation** and **vendor chunking** by default.  

Below is the custom building file I introduced:  
```ts
// vite.build.config.js
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

type buildConfigOptions = {
  manualChunks?: boolean;
  vendors?: string[];
};

export const buildConfig =
  ({ vendors, manualChunks }: buildConfigOptions = {}) =>
  ({ mode, command }) => {
    const isProdBuild = ...;
    const noMinify = ...;
    const minify = ...;

    const vendorPath = [
      "jsencrypt",
      "i18n",
      "yup",
      "lodash",
      "dayjs",
      ...
      "lib-framework/src/fonts",
      "lib-framework/src/icons",
      "lib-framework/src/assets",
      "lib-framework/src/hooks",
      "lib-framework/src/tokens",
      "lib-framework/src/components",
      ...(vendors || []),
    ];

    const config = {
      define: {
        "process.env": {},
      },
      plugins: [
        react(),
        tsconfigPaths(),
        obfuscatorPlugin({
          apply: () => isProdBuild,
          ...
        }),
      ],
      build: {
        minify,
        rollupOptions: {
          treeshake: true,
          output: {
            manualChunks(id: any) {
              if (!manualChunks) {
                return undefined;
              }

              for (const vendor of vendorPath) {
                ...;
              }

              return undefined;
            },
          },
        },
      },
      ...

    return config;
  };
```

### Results
1. **Build security improved**: automated JavaScript obfuscation in production protected intellectual property and reduced reverse-engineering risks.  
2. **Bundle performance optimized**: **vendor chunking** and **tree-shaking** in the Vite configuration reduced payload size and improved runtime efficiency.  
3. **Maintenance costs lowered**: collapsing scattered configs into a **single pipeline** simplified upkeep and reduced time wasted troubleshooting environment inconsistencies.  
4. **New projects bootstrapped quickly**: standardized Vite setup enabled starting fresh projects in **minutes** with all necessary configurations ready to use.  
5. **Onboarding accelerated**: environment setup time dropped from **5 days to 5 minutes**, making it straightforward for developers of any seniority level to start coding immediately.  
6. **Team focus regained**: developers shifted attention back to delivering **features** instead of resolving fragmented build and config issues.  



## STAR Case - Unreliable Deployments  
### Situation  
The deployment pipeline was entirely **controlled by the consultancy**, including the **production and staging environments**. Deployments were **triggered automatically** with every change, **but the maturity** of the software and the team **was not ready** for such automation. As a result, **bugs were** introduced directly **into production**, **breaking the user experience** and creating unnecessary **troubleshooting overhead** for the team.  

### Task  
Shift the **ownership** of the pipeline and environments **back to the company**, simplify the deployment, and give **full control** to the **in-house team**. The objective was to design a **fast, easy, and manual deployment flow** that would only run when a developer explicitly triggered it, reducing accidental breakages in production.  

### Actions  
I redesigned the deployment process using the minimum resources and complexity possible. Since the company was part of the Google for Startups program, the infrastructure of choice was **Firebase**. To make deployments simple and predictable, I created a **GitHub Actions workflow** that consolidated all frontend projects into one script. This ensured the process was manual, quick, and transparent, while eliminating the hidden consultancy-owned pipelines.  

Below is the GitHub Action I authored to handle all frontend projects in one place:  
```yaml
name: manual deploy

on:
  workflow_dispatch:
    inputs:
      project-name:
        type: choice
        ...
      build-type:
        type: choice
        ...
env:
  ...

run-name: ${{ inputs.build-type }} TO ${{ inputs.project-name }} AT ${{ github.event.repository.pushed_at }} WITH ${{ github.sha }}
jobs:
  deploy_firebase:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: ${{ github.workspace }}/proj-${{inputs.project-name}}/

    steps:
      ...
      - name: Deploy
        run: |
          curl -sL https://firebase.tools | bash
          firebase deploy --only hosting:target-${{inputs.project-name}} --token ... --project=project-${{inputs.project-name}}-DEV --config="../lib-framework/firebase.json"
```

### Results  
1. **Auditable and predictable deployments**: GitHub Actions provided **structured logs** and **version traceability**, ensuring every release could be **tracked** and verified.  
2. **Full control of environments**: **staging** and **production ownership** returned to the in-house team, preventing external bottlenecks and **restoring confidence** in releases.  
3. **Independence from external vendors**: embedding the deployment pipeline internally removed reliance on **opaque consultancy infrastructure** and secured long-term ownership.  
4. **Production incidents virtually eliminated**: replacing **consultancy-controlled auto-deploys** with **manual GitHub Actions workflows** reduced the risk of pushing unstable code directly into production.  
5. **Simplified release governance**: a **single reusable workflow** handled all frontend projects, reducing coordination overhead and increasing **team-wide transparency**.  
6. **Streamlined deployment process**: releases became a **two-click manual action**, intentionally designed to be **easy and reliable for any seniority level** on the team.  



## STAR Case - Code duplication  
### Situation  
Multiple projects implemented the same logic for API calls, encryption, i18n, and UI components. This led to frequent code duplication, inconsistencies between projects, and bugs caused by drift in how core features were handled.  

### Task  
Eliminate duplicated logic by creating a **single framework** that standardized core features and could be reused across all projects. The goal was to ensure consistency, reduce maintenance overhead, and accelerate new project setups.  

### Actions  
I authored **lib-framework**, a centralized internal library that included:  
1. A custom **axios layer** with interceptors and typed adapters.  
2. A unified **crypto module** supporting RSA and AES.  
3. Providers for **Firebase, context, i18n, overlay, and query handling**.  
4. Reusable **UI components** and design tokens.  
5. Integrated **MSW mocks** for consistent testing.  

![Neurogram Framework](/images/neurogram-framework.webp)  

### Results  
1. **Core features by default**: i18n, crypto, HTTP, and mocks were included automatically in every project.  
2. **New projects scaffolded in minutes**: a complete baseline setup was instantly available for fresh development.  
3. **Bug rates reduced**: redundant and inconsistent logic was eliminated, lowering maintenance issues.  
4. **Single source of truth**: centralized frontend architecture improved maintainability and accelerated team velocity.  
