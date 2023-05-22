// FIXME api endpoint for posting a single specific slot

export default defineEventHandler(async event => {
	const queryObject = getQuery(event)
	console.log('api ', queryObject)

	// use queryobject to navigate document on MongoDB
	// update document on MongoDB
	// return updated document

	// const slotInserted = await insertDay(newDate)
	const slotInserted = 'that worked 🙌🥳🥂🥂'

	return {
		api: 'slot.put',
		in: queryObject,
		out: slotInserted,
	}
})
