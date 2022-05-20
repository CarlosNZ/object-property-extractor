import extract from '../extract'

const testObj1 = {
  a: 1,
  b: {
    inner: 'this',
    inner2: 45,
    inner3: {
      innerDeep: 2.4,
      innerDeep2: [1, 2, 3],
      innerBool: false,
      innerArray: [
        { one: 1, two: 'two', three: true, four: null, five: true },
        { one: 'one', two: 2, three: 3, four: { one: 1 } },
      ],
    },
  },
  cee: null,
  dee: { 1: true, 2: 'two' },
  ee: [1, 'two', { three: 4 }, false, undefined, null],
  fun: (n: number) => n * 2,
}

const arrayObj = [
  1,
  2,
  {
    one: [
      { x: 'Ex', y: 'Why' },
      { x: 'XXX', y: 'YYY' },
    ],
  },
]

const data = {
  user: {
    name: { first: 'Jango', last: 'Fett' },
    children: ['Boba', 'Clone 1', 'Clone 2'],
    weapons: [
      { name: 'Blaster', description: 'For shooting stuff' },
      { name: 'Seismic charge', description: '...BWAAAAAANG' },
    ],
  },
}

console.log(extract(data, 'user.weapons.name'))
console.log((extract(data, 'user.weapons') as any[]).map((weapon) => weapon.name))
