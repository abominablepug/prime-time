import primeFactorization from "./factor.js"
import formatText from "./format.js";

const factorInput = () => {
	const input = document.querySelector(".menuInput");
	const button = document.querySelector(".menuBtn");
	const output = document.querySelector(".menuOutput");

	button.addEventListener("click", () => {

		const inputValue = input.value;

		const factors = primeFactorization(inputValue)

		output.textContent = formatText(factors);
	});
}

factorInput();
