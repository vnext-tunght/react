/**
 * Core Extensions
 *
 * Import this file to enable all built-in type extensions.
 *
 * Usage:
 * ```typescript
 * import '@core'
 *
 * // Now you can use extensions
 * const today = Date.today()
 * const rounded = (3.14159).round(2)
 * const capitalized = "hello world".capitalize()
 * const unique = [1, 2, 2, 3].unique()
 * ```
 */

import './date.extensions'
import './number.extensions'
import './string.extensions'
import './array.extensions'
import './object.extensions'

// Helper utility for checking if extensions are loaded
export const CoreExtensions = {
  version: '1.0.0',
  loaded: true,
  extensions: ['Date', 'Number', 'String', 'Array', 'Object'],
} as const

export default CoreExtensions
