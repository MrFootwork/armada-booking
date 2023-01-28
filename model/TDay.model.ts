export type Day = {
	date: Date
	halls: {
		name: string
		slots: {
			start: Date
			end: Date
		}[]
	}[]
}
