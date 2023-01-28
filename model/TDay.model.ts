export type Day = {
	date: Date
	halls: {
		name: string
		limit: number
		slots: {
			start: Date
			end: Date
			players: {
				name: string
				withdrawn: boolean
			}[]
		}[]
	}[]
}
