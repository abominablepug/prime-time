export default function primeFactorization(n, timeLimit) {
	const startTime = Date.now();

	if (n === 1 || n === 0) return ["No Prime Factors"];

	let factors = [];

	while (n % 2 === 0) {
		factors.push(2);
		n /= 2;
	}

	let i = 3;
	let checks = 0;

	while (i * i <= n) {

		if (checks++ % 1000 === 0) {
			if (Date.now() - startTime > timeLimit) {
				return ["Time Limit Exceeded"];
			}
		}

		while (n % i === 0) {
			factors.push(i);
			n /= i;
		}
		i += 2;
	}
	if (n > 1) factors.push(n);
	return factors;
}
