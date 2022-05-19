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
    },
  },
  c: null,
  d: true,
}

test('First level extract', () => {
  expect(extract(testObj1, 'a')).toBe(1)
})

// Deep objects, various types

// Get arrays, various depths

// Extract props from array objects (various, including array at top level)

// Run a function in an object

// Property missing - shallow and deep, various

// Property missing with fallback

// Handle empty object

// Handle empty string
