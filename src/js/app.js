/* =========================================================
   KeiScanlation
   App JS
   ========================================================= */

"use strict";

/* =========================================================
   App
   ========================================================= */

const KeiScanlation = {

    init(){

        this.initModules();

    },

    initModules(){

        if(typeof initDarkMode === "function"){
            initDarkMode();
        }

        if(typeof initMenu === "function"){
            initMenu();
        }

        if(typeof initReader === "function"){
            initReader();
        }

    }

};

/* =========================================================
   Start
   ========================================================= */

document.addEventListener("DOMContentLoaded",()=>{

    KeiScanlation.init();

});