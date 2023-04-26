import { Exception } from '@/model/TException.model'
import { Court } from '@/model/TCourt.model'

export type GymInput = Pick<
	Gym,
	'nameCode' | 'nameShort' | 'place' | 'start' | 'end'
>

export type Gym = {
	id: string
	nameCode: string
	nameShort: string
	place: string
	courtCount: number
	start?: number
	end?: number
	exceptions?: {
		id: string
		date: Date
		frequency: 'daily' | 'weekly' | 'every 2 weeks' | 'once'
		GymId: Gym.id
		court: 'all' | string
		mode: 'playable' | 'restricted'
		start?: Date
		end?: Date
		isActive: boolean
	}[]
	courts?: {
		id: string
		courtName: string
		slots: {
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
		}[]
	}[]
}
