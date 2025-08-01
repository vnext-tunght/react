# Core Extensions

This folder contains extensions for built-in JavaScript/TypeScript types, adding useful utility methods to Date, Number, String, Array, and Object.

## 🚀 Quick Start

```typescript
// Import extensions (usually done in main entry point)
import '@core'

// Now use the extensions
const today = Date.today()
const rounded = (3.14159).round(2)
const capitalized = 'hello world'.capitalize()
const unique = [1, 2, 2, 3].unique()
```

## 📁 Structure

```
core/
├── index.ts              # Main export file
├── date.extensions.ts    # Date prototype extensions
├── number.extensions.ts  # Number prototype extensions
├── string.extensions.ts  # String prototype extensions
├── array.extensions.ts   # Array prototype extensions
├── object.extensions.ts  # Object static method extensions
├── examples.ts           # Usage examples and demos
└── README.md            # This documentation
```

## 🗓️ Date Extensions

### Static Methods

- `Date.today()` - Get today at midnight
- `Date.yesterday()` - Get yesterday at midnight
- `Date.tomorrow()` - Get tomorrow at midnight
- `Date.fromISO(isoString)` - Safe ISO string parsing
- `Date.isBefore(date1, date2)` - Compare two dates
- `Date.isAfter(date1, date2)` - Compare two dates
- `Date.isSameDay(date1, date2)` - Check if same day

### Instance Methods

- `.toDateString()` - Format as DD/MM/YYYY
- `.toDateTimeString()` - Format as DD/MM/YYYY HH:mm
- `.toTimeString()` - Format as HH:mm
- `.addDays(days)` - Add days to date
- `.addMonths(months)` - Add months to date
- `.addYears(years)` - Add years to date
- `.before(other)` - Check if before another date
- `.after(other)` - Check if after another date
- `.isToday()` - Check if date is today
- `.startOfDay()` - Get start of day (midnight)
- `.endOfDay()` - Get end of day (23:59:59.999)

## 🔢 Number Extensions

- `.round(decimalPoint)` - Round to decimal places
- `.toCurrency(currency, locale)` - Format as currency
- `.toPercent(decimalPlaces)` - Format as percentage
- `.toFormatted(locale)` - Add thousand separators
- `.between(min, max)` - Check if between values
- `.clamp(min, max)` - Clamp between min/max
- `.isEven()` - Check if even number
- `.isOdd()` - Check if odd number
- `.isPositive()` - Check if positive
- `.isNegative()` - Check if negative
- `.isZero()` - Check if zero
- `.abs()` - Get absolute value
- `.toVND()` - Format as Vietnamese currency
- `.toUSD()` - Format as US currency

## 🔤 String Extensions

### Case Conversion

- `.capitalize()` - Capitalize first letter
- `.toCamelCase()` - Convert to camelCase
- `.toPascalCase()` - Convert to PascalCase
- `.toKebabCase()` - Convert to kebab-case
- `.toSnakeCase()` - Convert to snake_case
- `.toTitleCase()` - Convert to Title Case

### Utilities

- `.truncate(length, suffix)` - Truncate with ellipsis
- `.removeWhitespace()` - Remove all whitespace
- `.isNumeric()` - Check if contains only digits
- `.isEmail()` - Check if valid email
- `.isUrl()` - Check if valid URL
- `.isBlank()` - Check if empty or whitespace
- `.reverse()` - Reverse string
- `.count(substring)` - Count occurrences
- `.stripHtml()` - Remove HTML tags
- `.escapeHtml()` - Escape HTML characters
- `.extractNumbers()` - Extract numbers from string
- `.mask(visibleChars, maskChar)` - Mask string

### Vietnamese Support

- `.toNonAccented()` - Remove Vietnamese accents
- `.toPhoneFormat()` - Format as Vietnamese phone

## 📋 Array Extensions

### Basic Operations

- `.unique()` - Remove duplicates
- `.first()` - Get first element
- `.last()` - Get last element
- `.random()` - Get random element
- `.shuffle()` - Shuffle randomly
- `.isEmpty()` - Check if empty
- `.isNotEmpty()` - Check if not empty

### Manipulation

- `.chunk(size)` - Split into chunks
- `.compact()` - Remove falsy values
- `.flatten()` - Flatten nested arrays
- `.removeAt(index)` - Remove at index
- `.remove(value)` - Remove all occurrences
- `.insertAt(index, value)` - Insert at index
- `.take(count)` - Take first n elements
- `.skip(count)` - Skip first n elements

### Aggregation (for number arrays)

- `.sum()` - Sum all values
- `.average()` - Calculate average
- `.min()` - Find minimum
- `.max()` - Find maximum

### Advanced Operations

- `.groupBy(keyFn)` - Group by key function
- `.partition(predicate)` - Split by condition
- `.intersect(other)` - Find intersection
- `.difference(other)` - Find difference
- `.union(other)` - Find union
- `.count()` - Count occurrences

## 🗂️ Object Extensions

### Utilities

- `Object.isEmpty(obj)` - Check if empty
- `Object.isNotEmpty(obj)` - Check if not empty
- `Object.get(obj, path, defaultValue)` - Safe nested access
- `Object.set(obj, path, value)` - Safe nested setting
- `Object.deepClone(obj)` - Deep clone object
- `Object.deepMerge(...objects)` - Deep merge objects

### Manipulation

- `Object.pick(obj, keys)` - Pick specified keys
- `Object.omit(obj, keys)` - Omit specified keys
- `Object.mapValues(obj, fn)` - Map values
- `Object.mapKeys(obj, fn)` - Map keys

### Query String

- `Object.toQueryString(obj)` - Convert to query string
- `Object.fromQueryString(str)` - Parse query string

## 💡 Usage Examples

```typescript
// Date operations
const today = Date.today()
const nextWeek = today.addDays(7)
const formatted = nextWeek.toDateString() // "08/08/2025"

// Number operations
const price = 123456.789
const rounded = price.round(2) // 123456.79
const currency = rounded.toVND() // "₫123,456.79"

// String operations
const text = 'áo sơ mi cao cấp'
const slug = text.toNonAccented().toKebabCase() // "ao-so-mi-cao-cap"

// Array operations
const numbers = [1, 2, 3, 2, 4, 5]
const unique = numbers.unique() // [1, 2, 3, 4, 5]
const average = numbers.average() // 2.83

// Object operations
const data = { user: { profile: { name: 'John' } } }
const name = Object.get(data, 'user.profile.name') // "John"
```

## ⚠️ Important Notes

1. **Global Extensions**: These extensions modify global prototypes. Import only once in your app's entry point.

2. **TypeScript Support**: Full TypeScript definitions are included.

3. **Side Effects**: Importing these extensions has side effects (modifies global objects).

4. **Performance**: Extensions are added using `Object.defineProperty` with `enumerable: false` to avoid showing in object iterations.

5. **Conflict Prevention**: All methods are safely added and won't override existing functionality.

## 🔧 Configuration

Extensions are automatically loaded when you import the core module:

```typescript
// In your main entry file (index.tsx)
import '@core'
```

The extensions are now available globally throughout your application.

## 📝 Contributing

When adding new extensions:

1. Add the method to the appropriate `.extensions.ts` file
2. Update the TypeScript declarations
3. Add examples to `examples.ts`
4. Update this README
5. Write tests if needed

## 🧪 Testing

See `examples.ts` for comprehensive usage examples and test cases for all extension methods.
