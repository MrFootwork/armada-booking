/**
 * Calculates the time difference from timezone to UTC,
 * e.g. ```'Europe/Berlin'``` with GMT+2 returns ```-120```.
 * ```
 * console.log(getOffset("US/Eastern")); // 240
 * console.log(getOffset("Atlantic/Reykjavik")); // 0
 * console.log(getOffset("Europe/Berlin")); // -120
 * console.log(getOffset("Asia/Tokyo")); // -540
 * ```
 * From Weihang Jian https://stackoverflow.com/a/64262840/13608849
 * @param timeZone IANA time zone e.g. ```'Europe/Paris'```
 * @returns UTC offset in seconds
 */
export const getOffset = timeZone => {
	const timeZoneName = Intl.DateTimeFormat('ia', {
		timeZoneName: 'shortOffset',
		timeZone,
	})
		.formatToParts()
		.find(i => i.type === 'timeZoneName').value

	const offset = timeZoneName.slice(3)
	if (!offset) return 0

	const matchData = offset.match(/([+-])(\d+)(?::(\d+))?/)
	if (!matchData) throw `cannot parse timezone name: ${timeZoneName}`

	const [, sign, hour, minute] = matchData
	let result = parseInt(hour) * 60
	if (sign === '+') result *= -1
	if (minute) result += parseInt(minute)

	return result
}

/**
 * Uses the date part of `day` and hour to create a UTC conform date.
 * @param day Date object of targeted day
 * @param hour local hour e.g. `14`
 * @param isoOffset ISO offset e.g. `'+03:00'`
 * @returns ISO date string e.g. `'2023-05-23T14:00:00.000+03:00'`
 */
export const isoDateFrom = (day: Date, hour: number, isoOffset: string) => {
	// save calendar day e.g. 13.05.2024 -> 13
	const targetDay = new Date(day).getDate()
	// create today date object with nulled time
	const targetDate = new Date()
	targetDate.setHours(0, 0, 0, 0)

	// create today iso string
	let isoDateString = targetDate.toISOString()
	// set day and hour in iso string
	isoDateString = isoDateString.replace(
		/\d{2}T\d{2}/,
		`${String(targetDay).padStart(2, '0')}T${hour}`
	)
	// set offset in iso string
	isoDateString = isoDateString.replace(/Z/, isoOffset)

	console.log('timezone.ts isoDateString', isoDateString)

	return isoDateString
}
