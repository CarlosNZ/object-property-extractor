export type BasicObject = {
  [key: string]: BasicObject | unknown | (BasicObject | unknown)[]
}

export type BasicArray = (BasicObject | unknown)[]

export type InputObject = BasicObject | BasicArray | unknown
