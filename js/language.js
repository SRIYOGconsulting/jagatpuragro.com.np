
(() => {
    const STORAGE_KEY = "jagatpuragro-language";

    function applyLanguage(language) {
        const dictionary = window.translations?.[language];

        if (!dictionary) return;

        document.documentElement.lang = language;

        // Translate only elements that have translation keys
        document.querySelectorAll("#header [data-i18n]").forEach(element => {
            const key = element.dataset.i18n;

            if (dictionary[key] !== undefined) {
                element.textContent = dictionary[key];
            }
        });

        // Update the selected language button
        document.querySelectorAll("#header [data-lang]").forEach(button => {
            const selected = button.dataset.lang === language;

            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        localStorage.setItem(STORAGE_KEY, language);
    }

    function initLanguageSwitcher() {
        const header = document.getElementById("header");

        if (!header) return;

        header.querySelectorAll("[data-lang]").forEach(button => {
            // Avoid attaching duplicate click handlers
            if (button.dataset.languageInitialized === "true") return;

            button.dataset.languageInitialized = "true";

            button.addEventListener("click", () => {
                applyLanguage(button.dataset.lang);
            });
        });

        applyLanguage(localStorage.getItem(STORAGE_KEY) || "en");
    }

    window.initLanguageSwitcher = initLanguageSwitcher;
    window.applySiteLanguage = applyLanguage;
})();
