import { Gym } from '@/model/TGym.model'

export type Day = {
	id: string
	date: Date
	gyms: Gym[]
}
