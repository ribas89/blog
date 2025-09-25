{
    "title": "🎓 UEPG",
    "layout": "single"
}
### Full stack Researcher Java 📅 Mar 2015 to Aug 2017  
![UEPG Header](/images/uepg-header.webp)  

# 🌲 Project Treemap {#uepg-project-treemap}  
*Unavailable due to research environment constraints.*  

# 🧱 Tech Stack {#uepg-tech-stack}  
* **Architecture:** Service-Oriented Architecture (SOA)  
* **Build Tools:** Ant, Eclipse IDE  
* **Database:** Firebird, MySQL  
* **Documentation:** Internal Technical Guides, UML Models  
* **Environment:** Windows,Debian Linux, VirtualBox  
* **Frameworks:** Apache Struts, FrameMK, JUnit  
* **Integration:** REST, SOAP, WSDL  
* **Languages:** CSS, HTML, Java, JSP, SQL, XML  
* **Modeling:** UML (Use Case, Class, Package, Activity Diagrams)  
* **Testing:** JUnit (Unit and Persistence Layer Tests)  
* **Version Control:** Manual dependency management, SVN  
* **Web Services:** REST APIs, SOAP/WSDL for ERP Integration  

# 🌟 STAR Cases  

### STAR Case - Fragmented Research Environment
### Situation  
The **framework** ran on a **legacy Java Struts architecture** with **complex dependencies**, **Firebird databases**, and **distributed tools**. Each contributor **manually configured environments by himself**, resulting in **version drift**, **failed builds**, and **long onboarding times**.

### Task  
Design a **reproducible environment** that **unified all dependencies**, databases, tools, JUnit test automation, and SOA integration workflows **across all machines**.

### Action  
**Packaged the full** research stack **into a virtual machine image** containing Java SDK, Apache Struts, Ant, JUnit, Firebird, and SVN integration. Embedded **startup scripts** to initialize the database, **compile the framework, and deploy local web services**. Consolidated all UML diagrams, documents, and guides inside the VM for self-contained reproducibility.

### Results  
1. **Reduced setup time**: full onboarding decreased from **weeks to one hour**.
2. **Standardized research execution**: all contributors operated within a **consistent and controlled environment**.
4. **Unified dependencies and tooling**: **all components** integrated into a **single virtual machine image**.
5. **Preserved research continuity**: versioned VM snapshots and SVN references maintained **long-term environment** parity.
