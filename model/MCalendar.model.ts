import { Day } from './TDay.model'
import CalendarSample from './MCalendarSample.model'

export default class Calendar {
	days: Day[]

	constructor() {
		// copy all data from MCalendarSample
		const calendarSample = new CalendarSample()
		this.days = calendarSample.days
	}
}
