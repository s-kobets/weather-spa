export const convertToPressure = (pressure) => {
	return (pressure * 0.750062).toFixed(2);
}

export const convertToCelsius = (degK) => {
	return Math.round(degK - 273.15);
}
