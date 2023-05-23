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
