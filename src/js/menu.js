/* =========================================================
   KeiScanlation
   Menu JS
   ========================================================= */

"use strict";

/* =========================================================
   Menu
   ========================================================= */

function initMenu(){

    const toggle = document.querySelector(".ks-menu-toggle");
    const nav = document.querySelector(".ks-nav");

    if(!toggle || !nav){
        return;
    }

    createOverlay();

    const overlay = document.querySelector(".ks-menu-overlay");

    toggle.addEventListener("click",toggleMenu);

    overlay.addEventListener("click",closeMenu);

    document.addEventListener("keydown",(event)=>{

        if(event.key === "Escape"){

            closeMenu();

        }

    });

}

/* =========================================================
   Toggle
   ========================================================= */

function toggleMenu(){

    const nav = document.querySelector(".ks-nav");
    const overlay = document.querySelector(".ks-menu-overlay");

    const isOpen = nav.classList.contains("is-open");

    if(isOpen){

        closeMenu();

        return;

    }

    nav.classList.add("is-open");

    overlay.classList.add("is-active");

    document.body.classList.add("ks-menu-open");

}

/* =========================================================
   Close
   ========================================================= */

function closeMenu(){

    const nav = document.querySelector(".ks-nav");
    const overlay = document.querySelector(".ks-menu-overlay");

    nav.classList.remove("is-open");

    overlay.classList.remove("is-active");

    document.body.classList.remove("ks-menu-open");

}

/* =========================================================
   Overlay
   ========================================================= */

function createOverlay(){

    if(document.querySelector(".ks-menu-overlay")){
        return;
    }

    const overlay = document.createElement("div");

    overlay.className = "ks-menu-overlay";

    document.body.appendChild(overlay);

}