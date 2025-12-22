import primeFactorization from "./utils/factor.js";
import { showPopup, removePopup, popupText } from "./utils/popup.js";

let timeoutId;

// Main event listener for Ctrl + F
window.addEventListener("keydown", (event) => {
	if (event.key !== "F" || !event.ctrlKey) { return }
	else {
		let selectedText = window.getSelection().toString().trim();
		selectedText = selectedText.replace(/[.,\s\\]/g, "");
		clearTimeout(timeoutId);
		removePopup();
		if (/^\d+$/.test(selectedText)) {
			let num = parseInt(selectedText, 10);
			let factors = primeFactorization(num);
			let count = 1;
			let pointer = factors[0];
			let countList = [];
			for (let i = 1; i < factors.length; i++) {
				if (factors[i] === pointer) {
					count++;
					factors.splice(i, i);
					i--;
				} else {
					pointer = factors[i];
					countList.push(count);
					count = 1;
				}
			}
			countList.push(count);
			timeoutId = setTimeout(() => {
				removePopup();
			}, 3000);
			showPopup(
				`Prime Factors of ${selectedText}: ${popupText(factors, countList)}`,
			);
		};
	};
});

// Remove popup when selection changes
window.addEventListener("selectionchange", function() {
	let selectedText = document.getSelection().toString().trim();
	if (!/^\d+$/.test(selectedText)) {
		removePopup();
	}
});

