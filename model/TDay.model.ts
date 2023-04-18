import { Gym } from '@/model/TGym.model'

export type Day = {
	date: Date
	gyms: Gym[]
	// gyms: {
	// 	id: string
	// 	name: string
	// 	place: string
	// 	start?: number
	// 	end?: number
	// 	courts: {
	// 		id: string
	// 		courtName: string
	// 		slots: {
	// 			id: string
	// 			hourIndex: number
	// 			coach?: {
	// 				id: string
	// 				name: string
	// 			}
	// 			start: Date
	// 			end: Date
	// 			bookingDate: Date
	// 			player: {
	// 				id: string
	// 				name: string
	// 				bookedBy: string
	// 			}[]
	// 		}[]
	// 	}[]
	// }[]
}
