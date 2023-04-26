export type Slot = {
	id: string
	hourIndex: number
	coach?: {
		id: string
		name: string
	}
	start: Date
	end: Date
	bookingDate: Date
	player: {
		id: string
		name: string
		bookedBy: string
	}[]
}
