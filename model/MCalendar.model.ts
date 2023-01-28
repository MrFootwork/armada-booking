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

		this.days = [
			{
				date: today_0,
				halls: [
					{
						name: 'Hall 1',
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
							},
						],
					},
					{
						name: 'Hall 2',
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
							},
						],
					},
				],
			},
			{
				date: today_1,
				halls: [
					{
						name: 'Hall 1',
						slots: [
							{
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
									10
								),
							},
							{
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
