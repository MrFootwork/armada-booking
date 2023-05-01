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
