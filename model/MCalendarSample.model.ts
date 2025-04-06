import { Day } from './TDay.model'

export default class CalendarSample {
	days: Day[]

	constructor() {
		const year = 2025
		const month = new Date().getMonth()
		const firstDay = new Date().getDate()

		const today_0 = new Date(year, month, firstDay)
		const today_1 = new Date(year, month, firstDay + 1)
		const today_2 = new Date(year, month, firstDay + 2)
		const today_3 = new Date(year, month, firstDay + 3)
		const today_4 = new Date(year, month, firstDay + 4)
		const today_5 = new Date(year, month, firstDay + 5)
		const today_6 = new Date(year, month, firstDay + 6)

		const hallID1 = '63dfe7d99d49df953437b274'
		const hallID2 = '63e01a8504594f501f829e51'
		const hall1 = 'antilopa'
		const hall2 = 'sun-plaza'

		this.days = [
			{
				date: today_0,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						start: 8,
						end: 21,
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											8
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											11
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											12
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											14
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Jan',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Julia',
												bookedBy: '222',
											},
										],
									},
								],
							},
							{ id: '3', courtName: '3', slots: [] },
							{ id: '4', courtName: '4', slots: [] },
							{ id: '5', courtName: '5', slots: [] },
							{ id: '6', courtName: '6', slots: [] },
							{ id: '7', courtName: '7', slots: [] },
							{ id: '8', courtName: '8', slots: [] },
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											15
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Norbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											18
										),
										player: [
											{
												id: '444',
												name: 'Romeo',
												bookedBy: '444',
											},
											{
												id: '333',
												name: 'Julietta',
												bookedBy: '444',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_1,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						start: 8,
						end: 21,
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											8
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											11
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											12
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											14
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Jan',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Julia',
												bookedBy: '222',
											},
										],
									},
								],
							},
							{ id: '3', courtName: '3', slots: [] },
							{ id: '4', courtName: '4', slots: [] },
							{ id: '5', courtName: '5', slots: [] },
							{ id: '6', courtName: '6', slots: [] },
							{ id: '7', courtName: '7', slots: [] },
							{ id: '8', courtName: '8', slots: [] },
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											15
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Norbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											18
										),
										player: [
											{
												id: '444',
												name: 'Romeo',
												bookedBy: '444',
											},
											{
												id: '333',
												name: 'Julietta',
												bookedBy: '444',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_1,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Wolfgang',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											12
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Amadeus',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Mozart',
												bookedBy: '222',
											},
										],
									},
								],
							},
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											8
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											11
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Siegbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											12
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Emily',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Elaine',
												bookedBy: '222',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_2,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						start: 8,
						end: 21,
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											8
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											11
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											12
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											14
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Jan',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Julia',
												bookedBy: '222',
											},
										],
									},
								],
							},
							{ id: '3', courtName: '3', slots: [] },
							{ id: '4', courtName: '4', slots: [] },
							{ id: '5', courtName: '5', slots: [] },
							{ id: '6', courtName: '6', slots: [] },
							{ id: '7', courtName: '7', slots: [] },
							{ id: '8', courtName: '8', slots: [] },
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											15
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Norbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											18
										),
										player: [
											{
												id: '444',
												name: 'Romeo',
												bookedBy: '444',
											},
											{
												id: '333',
												name: 'Julietta',
												bookedBy: '444',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_3,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						start: 8,
						end: 21,
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											8
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											11
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											12
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											14
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Jan',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Julia',
												bookedBy: '222',
											},
										],
									},
								],
							},
							{ id: '3', courtName: '3', slots: [] },
							{ id: '4', courtName: '4', slots: [] },
							{ id: '5', courtName: '5', slots: [] },
							{ id: '6', courtName: '6', slots: [] },
							{ id: '7', courtName: '7', slots: [] },
							{ id: '8', courtName: '8', slots: [] },
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											15
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Norbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											18
										),
										player: [
											{
												id: '444',
												name: 'Romeo',
												bookedBy: '444',
											},
											{
												id: '333',
												name: 'Julietta',
												bookedBy: '444',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_4,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						start: 8,
						end: 21,
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											8
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											11
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											12
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											14
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Jan',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Julia',
												bookedBy: '222',
											},
										],
									},
								],
							},
							{ id: '3', courtName: '3', slots: [] },
							{ id: '4', courtName: '4', slots: [] },
							{ id: '5', courtName: '5', slots: [] },
							{ id: '6', courtName: '6', slots: [] },
							{ id: '7', courtName: '7', slots: [] },
							{ id: '8', courtName: '8', slots: [] },
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											15
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Norbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											18
										),
										player: [
											{
												id: '444',
												name: 'Romeo',
												bookedBy: '444',
											},
											{
												id: '333',
												name: 'Julietta',
												bookedBy: '444',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_5,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						start: 8,
						end: 21,
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											8
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											11
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											12
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											14
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Jan',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Julia',
												bookedBy: '222',
											},
										],
									},
								],
							},
							{ id: '3', courtName: '3', slots: [] },
							{ id: '4', courtName: '4', slots: [] },
							{ id: '5', courtName: '5', slots: [] },
							{ id: '6', courtName: '6', slots: [] },
							{ id: '7', courtName: '7', slots: [] },
							{ id: '8', courtName: '8', slots: [] },
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											15
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Norbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											18
										),
										player: [
											{
												id: '444',
												name: 'Romeo',
												bookedBy: '444',
											},
											{
												id: '333',
												name: 'Julietta',
												bookedBy: '444',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_6,
				gyms: [
					{
						id: '63dfe7d99d49df953437b274',
						nameCode: hall1,
						place: 'Badminton Armada Arena',
						start: 8,
						end: 21,
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											8
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											11
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											20
										),
										player: [
											{
												id: '123',
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											12
										),
										end: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate(),
											14
										),
										bookingDate: new Date(
											today_0.getFullYear(),
											today_0.getMonth(),
											today_0.getDate() - 5,
											16
										),
										player: [
											{
												id: '222',
												name: 'Jan',
												bookedBy: '222',
											},
											{
												id: '333',
												name: 'Julia',
												bookedBy: '222',
											},
										],
									},
								],
							},
							{ id: '3', courtName: '3', slots: [] },
							{ id: '4', courtName: '4', slots: [] },
							{ id: '5', courtName: '5', slots: [] },
							{ id: '6', courtName: '6', slots: [] },
							{ id: '7', courtName: '7', slots: [] },
							{ id: '8', courtName: '8', slots: [] },
						],
					},
					{
						id: '63e01a8504594f501f829e51',
						nameCode: hall2,
						place: 'Sala De Sport ELITE',
						courts: [
							{
								id: '1',
								courtName: '1',
								slots: [
									{
										id: '0001',
										hourIndex: 8,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											14
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											15
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											13
										),
										player: [
											{
												id: '123',
												name: 'Norbert',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtName: '2',
								slots: [
									{
										id: '0011',
										hourIndex: 12,
										start: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13
										),
										end: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate(),
											13,
											59
										),
										bookingDate: new Date(
											today_1.getFullYear(),
											today_1.getMonth(),
											today_1.getDate() - 5,
											18
										),
										player: [
											{
												id: '444',
												name: 'Romeo',
												bookedBy: '444',
											},
											{
												id: '333',
												name: 'Julietta',
												bookedBy: '444',
											},
										],
									},
								],
							},
						],
					},
				],
			},
		]
	}
}
