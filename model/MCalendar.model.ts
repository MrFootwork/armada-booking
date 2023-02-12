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
						courts: [],
					},
					{
						id: '222',
						name: hall2,
						place: `${hall2} Place`,
						slots: [
							{
								start: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									11
								),
								end: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									13
								),
								gym: hall2,
								players: [
									{
										name: 'Peter',
										active: true,
									},
									{
										name: 'Jenny',
										active: true,
									},
									{
										name: 'Lisa',
										active: true,
									},
									{
										name: 'Michael',
										active: true,
									},
								],
							},
							{
								start: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									15
								),
								end: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									17
								),
								gym: hall2,
								players: [
									{
										name: 'Jenny',
										active: false,
									},
									{
										name: 'Lisa',
										active: true,
									},
									{
										name: 'Peter',
										active: true,
									},
								],
							},
							{
								start: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									18
								),
								end: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									20
								),
								gym: hall2,
								players: [
									{
										name: 'Michael',
										active: true,
									},
									{
										name: 'Jenny',
										active: false,
									},
									{
										name: 'Lisa',
										active: true,
									},
									{
										name: 'Peter',
										active: true,
									},
								],
							},
						],
					},
				],
			},
			{
				date: today_1,
				halls: [
					{
						name: hall1,
						slots: [
							{
								start: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate() + 1,
									8
								),
								end: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate() + 1,
									10
								),
								gym: hall1,
								players: [
									{
										name: 'Peter',
										active: true,
									},
									{
										name: 'Michael',
										active: true,
									},
									{
										name: 'Jenny',
										active: true,
									},
								],
							},
							{
								start: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate() + 1,
									12
								),
								end: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate() + 1,
									14
								),
								gym: hall1,
								players: [
									{
										name: 'Peter',
										active: true,
									},
									{
										name: 'Jenny',
										active: true,
									},
									{
										name: 'Lisa',
										active: true,
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
