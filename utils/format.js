const getPowers = (factors) => {
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
	return countList;
}

const factorText = (numbers, powers) => {
	let stringReturn = "";
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

const formatText = (factors) => {
	const powers = getPowers(factors);
	return factorText(factors, powers);
}

export default formatText;
