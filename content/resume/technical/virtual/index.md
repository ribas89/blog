{
    "title": "🏢 Virtual Software for Insurances",
    "layout": "single"
}
### Full-stack Engineer - Delphi / MEAN 📅 May 2013 – Mar 2015  
![Virtual Header](/images/virtual-header.webp)  

# 🌲 Project Treemap {#virtual-project-treemap}  
*Unavailable due to development constrained on the company internal environment.*  

# 🧱 Tech Stack {#virtual-tech-stack}  
* **Languages:** Delphi, JavaScript, TypeScript, SQL, HTML  
* **Frontend:** AngularJS  
* **Backend:** Node.js  
* **Databases:** MongoDB, Microsoft SQL Server  
* **Reporting:** QuickReport, Dephi  
* **Project Management:** Scrum  

# 🌟 STAR Cases  

### STAR Case - Code Ossification
### Situation  
The insurance management **system relied** on a Delphi-based **PDF parser** that converted **files into plain text** and navigated fields using **company-made** custom **parse functions**.  
For more than a decade, the team maintained this **fragile approach**, a clear case of **code ossification** that prevented **simpler and more maintainable** solutions like regular expressions from **being adopted**.

### Task  
Enable **reliable automated** extraction of data **without breaking** existing parsers.

### Action  
After a **few months** adjusting the parser through the **company’s custom functions**, I **proposed introducing regular expressions** to simplify data extraction. The idea faced **initial resistance** due to years of **code ossification** and comfort with the old cursor logic.  
After **repeated attempts and personal insistence**, I finally **got approval to add** the regex function to the core parser. Once integrated, **it quickly proved its value**, successfully parsing complex document sequences that previously required extensive manual position tracking.  
With those results, I was **asked to help the team** on writing and maintaining **regex-based** extraction **rules** for other document schemas, **formalizing pattern usage as the new standard** for PDF parsing **within the system**.

### Results  
1. **Stabilized PDF extraction logic**: improved fragile custom parsing with **regex-driven matching**, eliminating data loss from manual offsets.  
2. **Reduced maintenance overhead**: legacy functions were **gradually deprecated**, simplifying debugging and onboarding for new developers.  
3. **Improved document coverage**: the new regex parser **handled multiple schema variations** that were previously **unsupported by** cursor logic.  
4. **Enabled team-wide adoption**: after internal training, regex usage **became a standard practice** for **all document** parsing routines.  
5. **Transformed legacy mindset**: the function **broke a decade of code ossification**, proving modernization could happen without risking stability.  
