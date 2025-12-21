let currentId = 0;
let popupId = null;
let timeoutId;

window.addEventListener("keydown", (event) => {
	if (event.key !== ")" || !event.ctrlKey) { return }
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

// Function to get prime factors
function primeFactorization(n) {
  if (n === 1 || n === 0) return ["No Prime Factors"];
  let factors = [];
  let i = 2;
  while (i * i <= n) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
    i++;
  }
  if (n > 1) factors.push(n);
  return factors;
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

// Remove popup when selection changes
window.addEventListener("selectionchange", function () {
  let selectedText = document.getSelection().toString().trim();
  if (!/^\d+$/.test(selectedText)) {
    removePopup();
  }
});

function removePopup() {
  if (popupId) {
    document.getElementById(popupId)?.remove();
    popupId = null;
  }
}
