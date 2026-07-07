/* =========================================================
   KeiScanlation
   Dark Mode JS
   ========================================================= */

"use strict";

/* =========================================================
   Config
   ========================================================= */

const KS_THEME_KEY = "KeiScanlation.Theme";

/* =========================================================
   Dark Mode
   ========================================================= */

function initDarkMode(){

    const root = document.documentElement;
    const button = document.querySelector(".ks-darkmode");

    if(!button){
        return;
    }

    const savedTheme = localStorage.getItem(KS_THEME_KEY);

    if(savedTheme){

        applyTheme(savedTheme);

    }else{

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        applyTheme(prefersDark ? "dark" : "light");

    }

    button.addEventListener("click",toggleTheme);

}

/* =========================================================
   Toggle
   ========================================================= */

function toggleTheme(){

    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";

    const nextTheme = currentTheme === "dark"
        ? "light"
        : "dark";

    applyTheme(nextTheme);

}

/* =========================================================
   Apply Theme
   ========================================================= */

function applyTheme(theme){

    const root = document.documentElement;
    const button = document.querySelector(".ks-darkmode");

    root.setAttribute("data-theme",theme);

    localStorage.setItem(KS_THEME_KEY,theme);

    if(button){

        button.textContent = theme === "dark"
            ? "☀️"
            : "🌙";

        button.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Light Mode"
                : "Dark Mode"
        );

    }

}