export default function todayInRomania() {
	// today in Romania
	const todayRomanianExactString = new Date(
		new Date().toLocaleString('en-US', {
			timeZone: 'Europe/Bucharest',
		})
	)

	const { year, month, day } = {
		year: todayRomanianExactString.getFullYear(),
		month: todayRomanianExactString.getMonth(),
		day: todayRomanianExactString.getDate(),
	}

	// server side today in Romanian timezone
	return new Date(year, month, day)
}
