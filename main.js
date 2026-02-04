
const lottoNumbersDiv = document.getElementById("lotto-numbers");
const generateBtn = document.getElementById("generate-btn");
const themeToggle = document.getElementById("theme-toggle"); // Now a button

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

