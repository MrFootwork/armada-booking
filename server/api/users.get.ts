import { MongoClient } from 'mongodb'

// FIXME use middleware/auth to decide,
// whether this endpoint can be used or not
export default defineEventHandler(async event => {
	console.log('server is hit to get users')

	// // Check if user is authenticated
	// if (!isAuthenticated(event)) {
	// 	return { error: 'Unauthorized', message: 'User is not authenticated' }
	// }

	// // Check if user is authorized
	// if (!isAuthorized(event)) {
	// 	return { error: 'Forbidden', message: 'User is not authorized' }
	// }

	const query = getQuery(event)
	const users = await fetchUsers()

	console.table(users)

	return {
		api: 'works',
		in: query,
		out: users,
	}
})

async function fetchUsers() {
	const { mongoURI } = useRuntimeConfig()
	const mongoClient = new MongoClient(mongoURI)

	try {
		await mongoClient.connect()
		const db = mongoClient.db('security')
		const users = await db.collection('users').find({}).toArray()

		return users
	} catch (e) {
		console.error('could not read users from database. ', e)
	} finally {
		await mongoClient.close()
	}
}

// Helper function to check if user is authenticated
function isAuthenticated(event) {
	// Implement your authentication logic here
	// For example, check if the event object contains a valid token or session
	// If not authenticated, return false; otherwise, return true
	// You can also set the appropriate status code and error message in the response
	return true // Placeholder, replace with your actual authentication logic
}

// Helper function to check if user is authorized
function isAuthorized(event) {
	// Implement your authorization logic here
	// For example, check if the user has the necessary permissions or role
	// If not authorized, return false; otherwise, return true
	// You can also set the appropriate status code and error message in the response
	return true // Placeholder, replace with your actual authorization logic
}
