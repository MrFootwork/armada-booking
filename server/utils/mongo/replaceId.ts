/**
 * Turns the property name of all objects in an array from "_id" to "id".
 * @example
 * [{ "_id": "123" }, { "_id": "456" }]
 *  becomes
 * [{ "id": "123" }, { "id": "456" }]
 * @param   {Array}  objects an array of objects
 * @return  {Array}  an array of objects with altered id properties
 */
export default function (objects: Day[]) {
	return objects.map(object => {
		object.id = object._id
		delete object._id
		return object
	})
}
