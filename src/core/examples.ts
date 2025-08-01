/**
 * Core Extensions Examples
 *
 * This file demonstrates usage of all core extensions.
 * Import '@core' before using these examples.
 */

// Date Extensions Examples
export const dateExamples = {
  // Static methods
  today: () => Date.today(),
  yesterday: () => Date.yesterday(),
  tomorrow: () => Date.tomorrow(),
  fromISO: () => Date.fromISO('2025-08-01T00:00:00.000Z'),
  isBefore: () => Date.isBefore(new Date('2025-01-01'), new Date('2025-12-31')),

  // Instance methods
  formatting: () => {
    const date = new Date('2025-08-01T14:30:00')
    return {
      dateString: date.toDateString(), // 01/08/2025
      dateTimeString: date.toDateTimeString(), // 01/08/2025 14:30
      timeString: date.toTimeString(), // 14:30
    }
  },

  manipulation: () => {
    const date = new Date('2025-08-01')
    return {
      addDays: date.addDays(7),
      addMonths: date.addMonths(1),
      addYears: date.addYears(1),
      startOfDay: date.startOfDay(),
      endOfDay: date.endOfDay(),
    }
  },
}

// Number Extensions Examples
export const numberExamples = {
  formatting: () => {
    const num = 123456.789
    return {
      rounded: num.round(2), // 123456.79
      currency: num.toCurrency('USD'), // $123,456.79
      percent: (0.1234).toPercent(2), // 12.34%
      formatted: num.toFormatted(), // 123,456.789
      vnd: num.toVND(), // ₫123,456.79
    }
  },

  utilities: () => {
    const num = 42
    return {
      between: num.between(1, 100), // true
      clamp: (150).clamp(1, 100), // 100
      isEven: num.isEven(), // true
      isOdd: num.isOdd(), // false
      abs: (-42).abs(), // 42
    }
  },
}

// String Extensions Examples
export const stringExamples = {
  casing: () => {
    const str = 'hello world'
    return {
      capitalize: str.capitalize(), // Hello world
      camelCase: str.toCamelCase(), // helloWorld
      pascalCase: str.toPascalCase(), // HelloWorld
      kebabCase: str.toKebabCase(), // hello-world
      snakeCase: str.toSnakeCase(), // hello_world
      titleCase: str.toTitleCase(), // Hello World
    }
  },

  utilities: () => {
    const str = 'Hello World! How are you?'
    return {
      truncate: str.truncate(10), // Hello W...
      reverse: str.reverse(), // ?uoy era woH !dlroW olleH
      count: str.count('o'), // 3
      isEmail: 'test@example.com'.isEmail(), // true
      mask: '1234567890'.mask(4), // ******7890
    }
  },

  vietnamese: () => {
    const vietnamese = 'Xin chào thế giới!'
    return {
      nonAccented: vietnamese.toNonAccented(), // Xin chao the gioi!
      phoneFormat: '0123456789'.toPhoneFormat(), // 0123 456 789
    }
  },
}

// Array Extensions Examples
export const arrayExamples = {
  basic: () => {
    const arr = [1, 2, 3, 2, 4, 5]
    return {
      unique: arr.unique(), // [1, 2, 3, 4, 5]
      first: arr.first(), // 1
      last: arr.last(), // 5
      random: arr.random(), // random element
      shuffle: arr.shuffle(), // randomly shuffled
    }
  },

  manipulation: () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return {
      chunk: arr.chunk(3), // [[1,2,3], [4,5,6], [7,8,9], [10]]
      take: arr.take(3), // [1, 2, 3]
      skip: arr.skip(3), // [4, 5, 6, 7, 8, 9, 10]
      removeAt: arr.removeAt(2), // [1, 2, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  aggregation: () => {
    const numbers = [1, 2, 3, 4, 5]
    return {
      sum: numbers.sum(), // 15
      average: numbers.average(), // 3
      min: numbers.min(), // 1
      max: numbers.max(), // 5
    }
  },

  grouping: () => {
    const people = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 25 },
    ]
    return {
      groupByAge: people.groupBy(p => p.age),
      partition: [1, 2, 3, 4, 5].partition(x => x % 2 === 0), // [[2, 4], [1, 3, 5]]
    }
  },
}

// Object Extensions Examples
export const objectExamples = {
  utilities: () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } }
    return {
      isEmpty: Object.isEmpty({}), // true
      get: Object.get(obj, 'b.d.e'), // 3
      deepClone: Object.deepClone(obj),
      pick: Object.pick(obj, ['a']), // { a: 1 }
      omit: Object.omit(obj, ['b']), // { a: 1 }
    }
  },

  queryString: () => {
    const params = { name: 'John', age: 25, hobbies: ['reading', 'coding'] }
    const queryString = Object.toQueryString(params)
    const parsed = Object.fromQueryString(queryString)
    return { queryString, parsed }
  },

  mapping: () => {
    const obj = { a: 1, b: 2, c: 3 }
    return {
      mapValues: Object.mapValues(obj, v => v * 2), // { a: 2, b: 4, c: 6 }
      mapKeys: Object.mapKeys(obj, k => k.toUpperCase()), // { A: 1, B: 2, C: 3 }
    }
  },
}

// Complete usage example
export const completeExample = () => {
  // Date operations
  const today = Date.today()
  const nextWeek = today.addDays(7)
  const formatted = nextWeek.toDateString()

  // Number operations
  const price = 123456.789
  const roundedPrice = price.round(2)
  const formattedPrice = roundedPrice.toVND()

  // String operations
  const productName = 'áo sơ mi cao cấp'
  const slug = productName.toNonAccented().toKebabCase()

  // Array operations
  const ratings = [4.5, 3.8, 4.2, 4.9, 3.5, 4.1]
  const averageRating = ratings.average().round(1)
  const topRatings = ratings
    .filter(r => r >= 4)
    .sort()
    .reverse()

  // Object operations
  const product = {
    id: 1,
    name: productName,
    price: roundedPrice,
    ratings: ratings,
    createdAt: today.toISOString(),
    metadata: {
      category: 'clothing',
      tags: ['shirt', 'casual', 'premium'],
    },
  }

  const productSummary = Object.pick(product, ['id', 'name', 'price'])
  const queryParams = Object.toQueryString(productSummary)

  return {
    today: formatted,
    price: formattedPrice,
    slug,
    averageRating,
    topRatings,
    productSummary,
    queryParams,
  }
}

export default {
  dateExamples,
  numberExamples,
  stringExamples,
  arrayExamples,
  objectExamples,
  completeExample,
}
