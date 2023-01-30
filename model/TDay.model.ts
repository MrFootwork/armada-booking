export type Day = {
	date: Date
	halls: {
		name: string
		limit: number
		slots: {
			start: Date
			end: Date
			hall: string
			limit: number
			players: {
				name: string
				active: boolean
			}[]
		}[]
	}[]
}
