export default function currentWeekInRomania() {
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

	// BUG🐞 +6 for lastDay wouldn't work in last days of a month

	// server side today in Romanian timezone
	return {
		today: new Date(year, month, day),
		lastDay: new Date(year, month, day + 6),
	}
}
