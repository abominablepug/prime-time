import primeFactorization from "./utils/factor.js";
import { showPopup, removePopup } from "./utils/popup.js";
import formatText from "./utils/format.js";

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

			const popupElement = showPopup(
				`Prime Factors of ${selectedText}: ${formatText(factors)}`,
			);

			startHideTimer();

			if (popupElement) {
				popupElement.addEventListener("mouseenter", () => {
					clearInterval(timeoutId);
				});

				popupElement.addEventListener("mouseleave", () => {
					startHideTimer();
				});
			}
		};
	};
});

const startHideTimer = () => {
	clearInterval(timeoutId);
	timeoutId = setTimeout(() => {
		removePopup();
	}, 3000);
}

// Remove popup when selection changes
window.addEventListener("selectionchange", function() {
	let selectedText = document.getSelection().toString().trim();
	if (!/^\d+$/.test(selectedText)) {
		removePopup();
	}
});

