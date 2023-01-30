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
				halls: [
					{
						name: hall1,
						limit: 8,
						slots: [
							{
								start: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									10
								),
								end: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									12
								),
								hall: hall1,
								limit: 8,
								players: [
									{
										name: 'Peter',
										active: false,
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
									16
								),
								end: new Date(
									today_0.getFullYear(),
									today_0.getMonth(),
									today_0.getDate(),
									19
								),
								hall: hall1,
								limit: 8,
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
										name: 'Lisa',
										active: true,
									},
								],
							},
						],
					},
					{
						name: hall2,
						limit: 4,
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
								hall: hall2,
								limit: 4,
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
								hall: hall2,
								limit: 4,
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
								hall: hall2,
								limit: 4,
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
						limit: 8,
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
								hall: hall1,
								limit: 8,
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
								hall: hall1,
								limit: 8,
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
