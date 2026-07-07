/* =========================================================
   KeiScanlation
   Reader JS
   ========================================================= */

"use strict";

/* =========================================================
   Config
   ========================================================= */

let saveProgressTimer = null;
const KS_READER_KEY = "KeiScanlation.Reader";

/* =========================================================
   Reader
   ========================================================= */

function initReader(){

    const reader = document.querySelector(".ks-reader");

    if(!reader){
        return;
    }

    createProgressBar();

    createBackToTop();

    restoreSettings();

    window.addEventListener("scroll",handleScroll);

    document.addEventListener("visibilitychange",()=>{

        if(document.visibilityState === "hidden"){

            saveProgress();

        }

    });

}

/* =========================================================
   Scroll
   ========================================================= */

function handleScroll(){

    updateProgress();

    toggleBackToTop();

    clearTimeout(saveProgressTimer);

    saveProgressTimer = setTimeout(()=>{

        saveProgress();

    },300);

}

/* =========================================================
   Progress
   ========================================================= */

function updateProgress(){

    const reader = document.querySelector(".ks-reader");

    if(!reader){
        return;
    }

    const progressBar = document.querySelector(".ks-progress-fill");

    if(!progressBar){
        return;
    }

    const rect = reader.getBoundingClientRect();

    const total = rect.height;

    const visible = Math.min(
        total,
        Math.max(0,-rect.top)
    );

    const percent = Math.max(
        0,
        Math.min(
            100,
            visible / total * 100
        )
    );

    progressBar.style.width = percent + "%";

}

/* =========================================================
   Save Progress
   ========================================================= */

function saveProgress(){

    const reader = document.querySelector(".ks-reader");

    if(!reader){
        return;
    }

    const data = {

        url:location.pathname,

        scroll:window.scrollY,

        date:Date.now()

    };

    localStorage.setItem(
        KS_READER_KEY,
        JSON.stringify(data)
    );

}

/* =========================================================
   Restore
   ========================================================= */

function restoreSettings(){

    const data = JSON.parse(
        localStorage.getItem(KS_READER_KEY)
    );

    if(!data){
        return;
    }

    if(data.url !== location.pathname){
        return;
    }

    requestAnimationFrame(()=>{

        window.scrollTo({

            top:data.scroll,

            behavior: "auto"

        });

    });

}

/* =========================================================
   Progress Bar
   ========================================================= */

function createProgressBar(){

    if(document.querySelector(".ks-progress")){
        return;
    }

    const progress = document.createElement("div");

    progress.className = "ks-progress";

    const fill = document.createElement("div");

    fill.className = "ks-progress-fill";

    progress.appendChild(fill);

    document.body.appendChild(progress);

}

/* =========================================================
   Back To Top
   ========================================================= */

function createBackToTop(){

    if(document.querySelector(".ks-backtop")){
        return;
    }

    const button = document.createElement("button");

    button.className = "ks-backtop";

    button.innerHTML = "↑";

    button.setAttribute(
        "aria-label",
        "Back to Top"
    );

    button.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    document.body.appendChild(button);

}

/* =========================================================
   Toggle Back To Top
   ========================================================= */

function toggleBackToTop(){

    const button = document.querySelector(".ks-backtop");

    if(!button){
        return;
    }

    button.classList.toggle(

        "is-visible",

        window.scrollY > 500

    );

}