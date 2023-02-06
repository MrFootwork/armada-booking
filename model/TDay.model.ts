export type Day = {
	date: Date
	gyms: {
		ID: string
		name: string
		place: string
		courts: {
			ID: string
			courtNumber: string
			slots: {
				ID: string
				hourIndex: number
				coach: {
					ID: string
					name: string
				}
				start: Date
				end: Date
				bookingDate: Date
				player: {
					ID: string
					name: string
					// BUG @Cristi:
					// Are friends user objects or just strings?
					friends: {
						ID: string
						name: string
					}[]
				}
				// BUG alternative, if each user needs a valid account
				players: {
					ID: string
					name: string
				}[]
			}[]
		}[]
	}[]
}
