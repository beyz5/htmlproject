# Spotify Music Analyzer & Personality Test

## Table of Contents
1. [Team Members and Responsibilities](#-team-members-and-responsibilities)
2. [Project Overview](#-project-overview)
3. [Key Features](#-key-features)
4. [System Architecture & Under the Hood](#-system-architecture--under-the-hood)
5. [Design & UI/UX Process](#-design--uiux-process)
6. [Technology Stack](#-technology-stack)

---

## Team Members and Responsibilities

| Student ID | Name | Role / Contribution |
| :--- | :--- | :--- |
| b241202044 | Beyzanur Kacır | Technical Architecture, UI/UX Design, Front-end Logic (JavaScript) |
| b251202001 | Bilge Arslantaş | Spotify API & OAuth Integration, Custom CSS Architecture, Front-end Logic (JavaScript) |

---

## Project Overview
The objective of this project is to create an interactive, visually striking web platform that analyzes users based on their music preferences. By integrating the Spotify Web API, the application fetches the user's "Top Items" (specifically focusing on data from the **last 4 weeks**) to generate a dynamic, highly personalized web experience. 

Targeting music enthusiasts, the platform goes beyond simple data visualization. It offers a data-driven personality test, an entertaining "roast" of their music taste, and detailed short-term listening statistics, all wrapped in a premium user interface.

---

## Key Features
* **Secure Spotify Authentication:** Implemented a robust OAuth 2.0 flow to ensure secure, seamless, and read-only access to user data.
* **Short-Term Music Stats:** Real-time data visualization of the user's listening habits, fetching and analyzing their top tracks, artists, and genres from the last month.
* **The "Roast" Generator:** A creative algorithmic feature that analyzes the user's most listened-to genres and tracks to dynamically generate a humorous, customized "roast" of their current music taste.
* **"Which Singer Are You?" Personality Test:** A unique logic engine that processes the user's Spotify data (tempo, genre, top artists) to assign them a specific singer/artist persona that best matches their current vibe.
* **Fully Responsive Design:** Fluid layouts compatible across all desktop, tablet, and mobile devices.

---

## System Architecture & Under the Hood
The development followed a strict modular approach, separating the data fetching logic from the UI rendering components. 

* **Authentication Module:** Handles the redirect to Spotify's authorization page and manages the returned access tokens.
* **Data Fetching Module:** Utilizes the access token to make asynchronous `fetch()` requests to Spotify's `/me/top/artists` and `/me/top/tracks` endpoints.
* **Logic Engine:** * The *Roast Algorithm* checks for specific keyword combinations in the user's top genres (e.g., matching "sad indie" with specific roast templates).
  * The *Personality Algorithm* calculates a dominant trait based on the aggregation of the top 10 artists and outputs a matching profile.

---

## Design & UI/UX Process
A massive emphasis was placed on the visual aesthetics of the website to ensure a premium feel. 
* **Custom CSS Styling:** We prioritized writing highly detailed, custom CSS rather than relying solely on heavy frameworks. This allowed for pixel-perfect adjustments.
* **Visual Identity:** A sleek, modern, dark-themed aesthetic was meticulously designed to align with Spotify's brand identity while maintaining our unique project vibe. 
* **Animations & Layout:** Smooth CSS transitions, hover states, and a well-structured Flexbox/Grid layout were implemented to make the data presentation engaging, interactive, and easy to read.

---

## Technology Stack
* **Frontend:** HTML5, CSS3, JavaScript (ES6+).
* **API:** Spotify Web API.
* **Architecture:** Vanilla JS with asynchronous API handling (Promises/Async-Await).

---

## Contact
If you have any questions or feedback regarding this project, feel free to reach out:
* **Beyzanur Kacır** - https://github.com/beyz5
* **Bilge Arslantaş** - https://github.com/bilge-7