import { ref, onMounted, onUnmounted } from 'vue'
import { Day } from '@/model/TDay.model'

export default function useSlot(slot: Day['halls'][number]['slots'][number]) {
	// how many seats in slot are taken?
	const seatsTaken = slot.players.reduce((count, player) => {
		const countFriends =
			player.friends?.reduce((count, friend) => {
				return count + (friend.active ? 1 : 0)
			}, 0) || 0
		return count + (player.active ? 1 : 0) + countFriends
	}, 0)

	// how many seats in slot are free?
	const seatsFree = slot.limit - seatsTaken

	return { seatsTaken, seatsFree }
}
