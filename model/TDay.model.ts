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
					// BUG @Cristi:
					// Are friends user objects or just strings?
					friends: {
						id: string
						name: string
					}[]
				}
				// BUG alternative, if each user needs a valid account
				players: {
					id: string
					name: string
				}[]
			}[]
		}[]
	}[]
}
