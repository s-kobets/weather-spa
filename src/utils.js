export convertToPressure = (pressure) => {
	return (pressure * 0.750062).toFixed(2);
}

export convertToCelsius = (degK) => {
	return Math.round(degK - 273.15);
}
