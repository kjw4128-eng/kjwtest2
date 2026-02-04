
const lottoNumbersDiv = document.getElementById("lotto-numbers");
const generateBtn = document.getElementById("generate-btn");

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
