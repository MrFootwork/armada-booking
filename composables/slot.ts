import { ref, onMounted, onUnmounted } from 'vue'
import { Day } from '@/model/TDay.model'

export default function useSlot(slot: Day['halls'][number]['slots'][number]) {
	const seatsTaken = slot.players.reduce((count, player) => {
		const countFriends = player.friends?.reduce((count, _) => count + 1, 0) || 0
		return count + 1 + countFriends
	}, 0)
	const seatsFree = slot.limit - seatsTaken
	return { seatsTaken, seatsFree }
}
