export type BasicValue = string | number | boolean | null | undefined | Function

export type BasicObject = {
  [key: string]: BasicValue | BasicObject | (BasicObject | BasicValue)[]
}

export type BasicArray = (BasicObject | BasicValue)[]

export type InputObject = BasicObject | BasicValue | BasicArray
