import { BasicObject, InputObject } from './types'

// Returns a specific property or index (e.g. application.name) from a nested Object
const extractProperty = (
  inputObj: InputObject,
  properties: string | number | (string | number)[],
  fallback?: any
): BasicObject | string | number | boolean | any[] | InputObject | Function => {
  const propertyPathArray = Array.isArray(properties)
    ? properties
    : splitPropertyString(properties as string)

  const currentProperty = propertyPathArray[0]

  if (currentProperty === '') return inputObj

  if (Array.isArray(inputObj) && typeof currentProperty !== 'number')
    return inputObj.map((item) => extractProperty(item, propertyPathArray, fallback))

  if (typeof inputObj !== 'object' || inputObj === null || !(currentProperty in inputObj))
    return fallbackOrError(inputObj, currentProperty, fallback)

  //  @ts-ignore -- we've already checked for values that could cause problems
  const newObj = inputObj[currentProperty]
  if (propertyPathArray.length === 1) {
    return newObj
  } else {
    return extractProperty(newObj, propertyPathArray.slice(1), fallback)
  }
}

// Splits a string representing a (nested) property/index on an Object or Array
// into array of strings/indexes
// e.g. "data.organisations.nodes[0]" => ["data","organisations", "nodes", 0]
const splitPropertyString = (propertyPath: string) => {
  const arr = propertyPath.split('.').map((part) => {
    const match = /(.*)\[(\d)\]$/.exec(part)
    return !match ? part : [match[1], Number(match[2])].filter((val) => val !== '')
  })
  return arr.flat()
}

const fallbackOrError = (obj: InputObject, property: string | number, fallback: any) => {
  if (fallback === undefined)
    throw new Error(`Unable to extract object property
Looking for property: ${property}
In object: ${JSON.stringify(obj)}`)
  else return fallback
}

export default extractProperty
