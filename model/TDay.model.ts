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
				start: Date
				end: Date
				bookingDate: Date
				player: {
					ID: string
					name: string
					friends: {
						ID: string
						name: string
					}[]
				}
			}[]
		}[]
	}[]
}
