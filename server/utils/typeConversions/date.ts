import { ISODateString } from 'next-auth'

/**
 * Calculates a valid ISO Date from just the dateISO
 * @param dateISO e.g. 2024-05-01
 * @returns e.g. 2024-05-01T22:00:00.000Z
 */
export function dateISOToFullISO(
	dateISO: ISODateString = objDate.toISOString().substring(0, 10)
) {
	const dateYear = dateISO.substring(0, 3)
	const dateMonth = dateISO.substring(5, 6)
	const dateDay = dateISO.substring(8, 9)
	return new Date(dateYear, dateMonth, dateDay).toISOString()
}

/**
 *	Converts an object with date components as properties into a JS Date.
 * @param {string} year	- year e.g. 2016
 * @param {string} month	- 0-based month e.g. 1 = February
 * @param {string} day	- day e.g. 30
 * @returns	{Date} A Date object
 */
export function dateComponentToJSDate({
	year,
	month,
	day,
}: {
	year: string
	month: string
	day: string
}) {
	const jsDate = new Date()
	jsDate.setUTCFullYear(year)
	jsDate.setUTCMonth(month)
	jsDate.setUTCDate(day)
	jsDate.setUTCHours(0)
	jsDate.setUTCMinutes(0)
	jsDate.setUTCSeconds(0)
	jsDate.setUTCMilliseconds(0)

	return jsDate
}
