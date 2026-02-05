
const lottoNumbersDiv = document.getElementById("lotto-numbers");
const generateBtn = document.getElementById("generate-btn");
const themeToggle = document.getElementById("theme-toggle"); // Now a button
const languageSwitcher = document.getElementById("language-switcher");

let translations = {};

// Fetch translations
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        const savedLanguage = localStorage.getItem("language") || "en";
        setLanguage(savedLanguage);
    } catch (error) {
        console.error("Could not load translations:", error);
    }
}

// Function to set the language
function setLanguage(lang) {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update Page Title and Meta Description for SEO
    if (translations[lang]) {
        if (translations[lang].title) {
            document.title = translations[lang].title + " - Lotto Number Generator";
        }
        if (translations[lang].metaDescription) {
            let metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute("content", translations[lang].metaDescription);
            }
        }
    }

    languageSwitcher.value = lang;
    document.documentElement.lang = lang; // Update the lang attribute of the html tag
}

// Event listener for language switcher
languageSwitcher.addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
});


// Function to apply the theme
function applyTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);
    themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
}

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    applyTheme(true);
} else if (savedTheme === "light") {
    applyTheme(false);
} else {
    // If no preference, check system preference
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDarkMode);
}

// Event listener for theme toggle button
themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");
    applyTheme(!isDarkMode); // Toggle the theme
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
});

generateBtn.addEventListener("click", () => {
    lottoNumbersDiv.innerHTML = ""; // Clear previous numbers

    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    numbers.forEach(number => {
        const numberDiv = document.createElement("div");
        numberDiv.classList.add("number");
        numberDiv.textContent = number;
        lottoNumbersDiv.appendChild(numberDiv);
    });
});

// Initial load
loadTranslations();


