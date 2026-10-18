document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    let headerPath = "components/header.html";
    let footerPath = "components/footer.html";

    if (path.includes("/pages/")) {
        headerPath = "../components/header.html";
        footerPath = "../components/footer.html";
    }

    // Fetch Header
    const header = document.getElementById("header");

    if (header) {
        fetch(headerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Header HTTP error: ${response.status}`);
                }

                return response.text();
            })
            .then(data => {
                header.innerHTML = data;
                // Hamburger menu functionality
                const menuToggle = header.querySelector(".menu-toggle");
                const navLinks = header.querySelector(".navlinks");

                if (menuToggle && navLinks) {
                    menuToggle.addEventListener("click", () => {
                        const isOpen = navLinks.classList.toggle("open");

                        menuToggle.classList.toggle("active", isOpen);
                        menuToggle.setAttribute("aria-expanded", isOpen);
                        menuToggle.setAttribute(
                            "aria-label",
                            isOpen ? "Close navigation menu" : "Open navigation menu"
                        );
                    });

                    // Close the menu after selecting a navigation link
                    navLinks.querySelectorAll("a").forEach(link => {
                        link.addEventListener("click", () => {
                            navLinks.classList.remove("open");
                            menuToggle.classList.remove("active");
                            menuToggle.setAttribute("aria-expanded", "false");
                            menuToggle.setAttribute(
                                "aria-label",
                                "Open navigation menu"
                            );
                        });
                    });

                    // Close the menu when Escape is pressed
                    document.addEventListener("keydown", event => {
                        if (event.key === "Escape") {
                            navLinks.classList.remove("open");
                            menuToggle.classList.remove("active");
                            menuToggle.setAttribute("aria-expanded", "false");
                            menuToggle.setAttribute(
                                "aria-label",
                                "Open navigation menu"
                            );
                        }
                    });
                }

                // Get current page
                const currentPage = path.split("/").pop();

                // Add active class
                document.querySelectorAll(".navlinks a").forEach(link => {
                    const page = link.dataset.page;

                    // Home
                    if (
                        (currentPage === "index.html" || currentPage === "") &&
                        page === "home"
                    ) {
                        link.classList.add("active");
                    }

                    // About
                    else if (
                        currentPage === "about.html" &&
                        page === "about"
                    ) {
                        link.classList.add("active");
                    }

                    // Key Areas and child pages
                    else if (
                        [
                            "key-areas.html",
                            "boer-kranti.html",
                            "silage.html",
                            "fertilizer.html"
                        ].includes(currentPage) &&
                        page === "key-areas"
                    ) {
                        link.classList.add("active");
                    }
                    else if (
                        currentPage === "services.html" &&
                        page === "services"
                    ) {
                        link.classList.add("active");
                    }

                    // Contact
                    else if (
                        currentPage === "contact.html" &&
                        page === "contact"
                    ) {
                        link.classList.add("active");
                    }
                });
            })
            .catch(error => {
                console.error("Failed to load header:", error);
            });
    }

    // Fetch Footer
    const footer = document.getElementById("footer");

    if (footer) {
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Footer HTTP error: ${response.status}`);
                }

                return response.text();
            })
            .then(data => {
                footer.innerHTML = data;
            })
            .catch(error => {
                console.error("Failed to load footer:", error);
            });
    }
});