{
    "title": "💵 Safra",
    "layout": "single"
}
### Staff Frontend Engineer - AngularJS 📅 Jun 2019 – Aug 2020
![Safra Header](/images/safra-header.webp)  

# 🌲 Project Treemap {#safra-project-treemap}  
*Unavailable due to development constrained on the company internal environment.*  

# 🧱 Tech Stack {#safra-tech-stack}  
* **Frameworks:** AngularJS, Angular 9  
* **Languages:** TypeScript, JavaScript, HTML5, CSS3, SASS  
* **Build Tools:** Webpack, npm, Node.js  
* **CI/CD:** Jenkins, Git, Custom Git Workflow  
* **Testing:** Jasmine, Karma
* **UI Tools:** Sass, KSS  
* **Version Control:** Git (internal repository)  
* **Project Management:** Jira, Confluence  

# 🌟 STAR Cases  
## STAR Case - Multiple Teams Conflicts Under Tight Deadline  
### Situation  
The project faced an aggressive **6-month deadline** with **30+ frontend engineers** working across **multiple projects** (cards, ATM, onboarding, payments, profile). Each team maintained a **separate codebase**, yet all merged into a **single release pipeline**. The compressed schedule and overlapping workstreams created a **chaotic environment** of frequent overwrites, lost commits, **unstable builds**, and ongoing issues during **quality assurance**.  

### Task  
**Define and implement** a reliable integration and **release model** to restore **environment stability**. The goal was to **reduce merge conflicts**, prevent code loss, and ensure **predictable releases** while meeting the **delivery deadline**.  

### Actions  
I started by **breaking down** the entire release process **from the top**. To understand why the builds kept failing, **I reverse engineered the pipeline**, tracing it **from the App Store approval** steps all the way back **to the developer commits**.  
Once I mapped the flow, **I updated the Jenkins** configuration to build **only from predefined tags**. Since there was **no versioning strategy** in place, I introduced a manual semantic release process that triggered deployments **only when a new tag** was created.  
With the pipeline under control, I **defined a new branching model** inspired by **GitHub Flow and GitFlow**, extended to **handle multiple environments**.  
After **defining the model**, I aligned **with the team leads** about the new process, detailing how developers should create branches, tag releases, and **merge safely** into the shared **pipeline**.  

Below is a simplified diagram of the branching and release model that illustrates how the pipeline operated after those changes.  
![Safrawallet branching model](/images/safra-branch-model.webp)  

### Results  
1. **Controlled rollbacks**: release tags and environment branches **allowed instant restoration** of any previous version.  
2. **Consistent environments**: cascading rebases kept develop, homologation, and preproduction branches **synchronized with master** after each release.  
3. **Cross-team stability**: the new model **reduced merge conflicts from** around **15** per release down to **2** on average.  
4. **Developer safety**: isolated branches **protected individual work** and the shared pipeline.  
5. **Eliminated QA instability**: fixed tags and controlled release candidates **made every change traceable**, ensuring consistent validation across environments.  
6. **Predictable releases**: flexible release candidates included **only main commits and approved features**, ensuring **stable builds** for users and quality assurance.  


## STAR Case - Inconsistent UI Across Teams  
### Situation  
Under **tight deadlines**, each squad had its **own designer** and developers building features with **no alignment across teams**. Without a shared design source or centralized library, teams **recreated the same components** in different ways, leading to **duplicated code**, inconsistent visuals, and a fragmented user experience **across the app**.  

### Task  
Bring visual and structural **consistency back to the product** by creating a **single source of truth** for UI. I needed to **align all squads** around one shared component library that could live inside the **company restricted environment** and be easy for every team to **adopt without slowing delivery**.

### Action  
I **joined the design squad** to understand the centralized work they were creating and **took responsibility** for bridging communication **between designers and developers**. After assessing each team's workflow, I determined that the **most effective way** to standardize the UI was by creating a **framework-agnostic, ready-to-use CSS** component library instead of AngularJS components, allowing squads to **use it in any context**. **I built** the library with **Sass** for consistent styling and **used KSS to document** it with clear visual component references. To **distribute** it within the **restricted network**, I set up a **bare Git repository** on a shared internal resource, enabling **all squads to pull updates directly** into their projects.  

### Results  
1. **Wide adoption achieved**: the system's simplicity and open contribution model **enabled all squads to adopt it within weeks**.  
2. **Design drift eliminated**: shared components and standardized styling **unified behaviors and visuals** across every module.  
3. **Library stability proven**: the architecture **endured three facelifts and two complete redesigns** without major refactoring.  
4. **Documentation standardized**: the KSS guide **became the single reference** for all squads and **defined future documentation practices**.  
