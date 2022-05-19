type BasicObject = {
  [key: string]: any
}

// Returns a specific property or index (e.g. application.name) from a nested Object
const extractProperty = (
  object: BasicObject | BasicObject[],
  property: string | number | (string | number)[],
  fallback: any = undefined
): BasicObject | string | number | boolean | BasicObject[] | Function => {
  if (typeof object === 'undefined') {
    if (fallback !== undefined) return fallback
    else throw new Error('Object property not found')
  }
  const propertyPathArray = Array.isArray(property)
    ? property
    : splitPropertyString(property as string)

  const currentProperty = propertyPathArray[0]
  if (Array.isArray(object)) {
    if (typeof currentProperty === 'number')
      if (propertyPathArray.length === 1)
        if (object?.[currentProperty] === undefined) {
          if (fallback !== undefined) return fallback
          else throw new Error('Object property not found')
        } else return object[currentProperty]
      else return extractProperty(object[currentProperty], propertyPathArray.slice(1), fallback)
    // If an array, extract the property from *each item*
    return object.map((item) => extractProperty(item, propertyPathArray, fallback))
  }

  if (propertyPathArray.length === 1)
    if (typeof currentProperty === 'number') {
      if (fallback !== undefined) return fallback
      else throw new Error('Object not index-able')
    } else {
      if (object?.[currentProperty] === undefined) {
        if (fallback !== undefined) return fallback
        else throw new Error('Object property not found')
      } else return object[currentProperty]
    }
  else return extractProperty(object?.[currentProperty], propertyPathArray.slice(1), fallback)
}

// Splits a string representing a (nested) property/index on an Object or Array
// into array of strings/indexes
// e.g. "data.organisations.nodes[0]" => ["data","organisations", "nodes", 0]
const splitPropertyString = (propertyPath: string) => {
  const arr = propertyPath.split('.').map((part) => {
    const match = /([A-Za-z]+)\[(\d)\]/g.exec(part)
    return !match ? part : [match[1], Number(match[2])]
  })
  return arr.flat()
}

// If Object has only 1 property, return just the value of that property,
// else return the whole object.
const simplifyObject = (item: number | string | boolean | BasicObject) => {
  return typeof item === 'object' && Object.keys(item).length === 1 ? Object.values(item)[0] : item
}

export default extractProperty
