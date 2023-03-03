import { Day } from './TDay.model'

export default class Calendar {
	days: Day[]

	constructor() {
		const year = 2023
		const month = new Date().getMonth()
		const firstDay = new Date().getDate()

		const today_0 = new Date(year, month, firstDay)
		const today_1 = new Date(year, month, firstDay + 1)
		const today_2 = new Date(year, month, firstDay + 2)
		const today_3 = new Date(year, month, firstDay + 3)
		const today_4 = new Date(year, month, firstDay + 4)
		const today_5 = new Date(year, month, firstDay + 5)
		const today_6 = new Date(year, month, firstDay + 6)

		const hallID1 = 'antilopa'
		const hallID2 = 'sun-plaza'
		const hall1 = 'Antilopa'
		const hall2 = 'Sun Plaza'

		this.days = [
			{
				date: today_0,
				gyms: [
					{
						id: 'antilopa',
						name: hall1,
						place: `${hall1} Place`,
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
											13,
											59
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
						id: 'sun-plaza',
						name: hall2,
						place: `${hall2} Place`,
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
						id: 'antilopa',
						name: hall1,
						place: `${hall1} Place`,
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
						id: 'sun-plaza',
						name: hall2,
						place: `${hall2} Place`,
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
			},
			{
				date: today_3,
			},
			{
				date: today_4,
			},
			{
				date: today_5,
			},
			{
				date: today_6,
			},
		]
	}
}
