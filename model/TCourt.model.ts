import { Slot } from '@/model/TSlot.model'

export type Court = {
	id: string
	courtName: string
	slots: Slot[]
}
