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

		const hall1 = 'Antilopa'
		const hall2 = 'Sun Plaza'

		this.days = [
			{
				date: today_0,
				gyms: [
					{
						id: '111',
						name: hall1,
						place: `${hall1} Place`,
						courts: [
							{
								id: '1',
								courtNumber: 1,
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
								courtNumber: 2,
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
						],
					},
					{
						id: '222',
						name: hall2,
						place: `${hall2} Place`,
						courts: [
							{
								id: '1',
								courtNumber: 1,
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
												name: 'Peter',
												bookedBy: '123',
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
						id: '111',
						name: hall1,
						place: `${hall1} Place`,
						courts: [
							{
								id: '1',
								courtNumber: 1,
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
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtNumber: 2,
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
						],
					},
					{
						id: '222',
						name: hall2,
						place: `${hall2} Place`,
						courts: [
							{
								id: '1',
								courtNumber: 1,
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
												name: 'Peter',
												bookedBy: '123',
											},
										],
									},
								],
							},
							{
								id: '2',
								courtNumber: 2,
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
