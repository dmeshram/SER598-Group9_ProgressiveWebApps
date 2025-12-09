# Progressive Web Apps (PWA) Tutorial  
### SER598 — Group 09 · Arizona State University

This repository contains a structured instructional tutorial introducing the fundamentals of **Progressive Web Apps (PWAs)**. It covers core PWA concepts including the Web App Manifest, Service Workers, caching strategies, offline-first design, installability, evaluation metrics, and hands-on practice activities.

Alongside the tutorial, this repository also references **GreenLoop**, a lifestyle-tracking web application we converted into a fully functional PWA.

---

## Tutorial Structure

This tutorial includes the following sections:

- **Home** — Overview of PWAs  
- **Introduction** — What PWAs are and why they matter  
- **History** — Evolution and key milestones  
- **Analytical Overview** — When PWAs are useful, pros/cons, and evaluation metrics  
- **Implementation** — Repo link, backend/frontend setup instructions  
- **Student Activities** — Labs, exercises, quizzes  
- **References** — Canonical PWA resources  

Shared assets within this tutorial:
css/styles.css
js/site.js
js/copy.js
js/activities.js
samples/ (manifest.example.json, service-worker.example.js, offline.example.html)

---

## GreenLoop — Demo PWA

**GreenLoop** is our demo lifestyle tracking application that showcases real-world PWA concepts:

- Offline operation  
- Installability on mobile & desktop  
- Caching of static resources  
- Responsive web app layout  

🔗 **GreenLoop Repository:**  
https://github.com/dmeshram/Group9-SER598-AdvancedProject-AppImplementation.git  

---

## ▶ Running the Tutorial Locally

No backend required — simply open `index.html` in a browser.

If the browser blocks local file access, start a simple server:

```bash
npx serve

------------------------------------------------------------------------------------------------------------------------

▶ Running the GreenLoop Demo App
Backend (Spring Boot)
mvn spring-boot:run

Frontend (Node / npm)
npm install
npm run dev

------------------------------------------------------------------------------------------------------------------------
References Used

web.dev — PWA learning modules

MDN Web Docs — PWA documentation

PWABuilder Blog

W3C Specifications — Service Workers & Web App Manifest

Google Workbox & Lighthouse tools

------------------------------------------------------------------------------------------------------------------------
Contributors

Group 09 — SER598
Arizona State University