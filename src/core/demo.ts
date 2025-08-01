/**
 * Core Extensions Test
 * This is a quick demo to verify all core extensions are working
 */

import '@core' // Make sure extensions are loaded

// Test Date extensions
const testDateExtensions = () => {
  console.log('🗓️ Date Extensions Demo:')

  const today = Date.today()
  console.log(`Today: ${today.toDateString()}`)

  const nextWeek = today.addDays(7)
  console.log(`Next week: ${nextWeek.toDateTimeString()}`)

  const isToday = today.isToday()
  console.log(`Is today?: ${isToday}`)
}

// Test Number extensions
const testNumberExtensions = () => {
  console.log('\n🔢 Number Extensions Demo:')

  const price = 123456.789
  console.log(`Original: ${price}`)
  console.log(`Rounded: ${price.round(2)}`)
  console.log(`Currency VND: ${price.toVND()}`)
  console.log(`Is even: ${(42).isEven()}`)
  console.log(`Clamped: ${(150).clamp(1, 100)}`)
}

// Test String extensions
const testStringExtensions = () => {
  console.log('\n🔤 String Extensions Demo:')

  const text = 'xin chào thế giới'
  console.log(`Original: "${text}"`)
  console.log(`Capitalized: "${text.capitalize()}"`)
  console.log(`CamelCase: "${text.toCamelCase()}"`)
  console.log(`Non-accented: "${text.toNonAccented()}"`)
  console.log(`Truncated: "${text.truncate(10)}"`)

  const email = 'test@example.com'
  console.log(`Is email valid: ${email.isEmail()}`)

  const phone = '0123456789'
  console.log(`Phone formatted: ${phone.toPhoneFormat()}`)
}

// Test Array extensions
const testArrayExtensions = () => {
  console.log('\n📋 Array Extensions Demo:')

  const numbers = [1, 2, 3, 2, 4, 5, 6, 7, 8, 9, 10]
  console.log(`Original: [${numbers.join(', ')}]`)
  console.log(`Unique: [${numbers.unique().join(', ')}]`)
  console.log(`First: ${numbers.first()}`)
  console.log(`Last: ${numbers.last()}`)
  console.log(`Sum: ${numbers.sum()}`)
  console.log(`Average: ${numbers.average().round(2)}`)
  console.log(`Chunked by 3:`, numbers.chunk(3))

  const people = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 25 },
  ]
  console.log(
    `Grouped by age:`,
    people.groupBy(p => p.age)
  )
}

// Test Object extensions
const testObjectExtensions = () => {
  console.log('\n🗂️ Object Extensions Demo:')

  const user = {
    profile: {
      personal: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    },
    settings: {
      theme: 'dark',
    },
  }

  console.log(`Deep get name: "${Object.get(user, 'profile.personal.name')}"`)
  console.log(
    `Deep get missing: "${Object.get(user, 'profile.missing.key', 'default')}"`
  )
  console.log(`Is empty: ${Object.isEmpty({})}`)
  console.log(`Is not empty: ${Object.isNotEmpty(user)}`)

  const picked = Object.pick(user, ['settings'])
  console.log(`Picked settings:`, picked)

  const params = { name: 'John', age: 25, active: true }
  const queryString = Object.toQueryString(params)
  console.log(`Query string: "${queryString}"`)
  console.log(`Parsed back:`, Object.fromQueryString(queryString))
}

// Run all tests
export const runCoreExtensionsDemo = () => {
  console.log('🚀 Running Core Extensions Demo...\n')

  testDateExtensions()
  testNumberExtensions()
  testStringExtensions()
  testArrayExtensions()
  testObjectExtensions()

  console.log('\n✅ All core extensions are working!')
}

// Auto-run in development
if (import.meta.env.DEV) {
  // Uncomment to see demo in console
  // runCoreExtensionsDemo()
}

export default runCoreExtensionsDemo
