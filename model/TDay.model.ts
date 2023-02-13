export type Day = {
	date: Date
	gyms: {
		id: string
		name: string
		place: string
		courts: {
			id: string
			courtNumber: string
			slots: {
				id: string
				hourIndex: number
				coach: {
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
			}[]
		}[]
	}[]
}
