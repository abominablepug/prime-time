let popupId = null;

function showPopup(text) {
	removePopup();

	let popup = document.createElement("div");
	popupId = `primeTime-${Date.now()}`;
	popup.id = popupId;
	popup.innerHTML = text;

	// Apply positioning based on cursor location
	popup.style.position = "fixed";
	popup.style.left = `20px`; // Use mouse X position
	popup.style.top = `20px`; // Use mouse Y position
	popup.style.backgroundColor = "white";
	popup.style.color = "black";
	popup.style.padding = "10px";
	popup.style.border = "1px solid black";
	popup.style.borderRadius = "5px";
	popup.style.zIndex = "999999";

	document.body.appendChild(popup);
}

function removePopup() {
	if (popupId) {
		document.getElementById(popupId)?.remove();
		popupId = null;
	}
}

function popupText(numbers, powers) {
	stringReturn = "";
	for (let i = 0; i < numbers.length; i++) {
		stringReturn += " " + String(numbers[i]);
		if (powers[i] > 1) {
			stringReturn += `<sup>${powers[i]}</sup> `;
		} else {
			stringReturn += " ";
		}
		if (numbers[i] !== numbers[numbers.length - 1]) {
			stringReturn += "\u00D7";
		}
	}
	return stringReturn.trim();
}

export { showPopup, removePopup, popupText };
