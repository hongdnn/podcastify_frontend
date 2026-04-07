# Vitest Quick Start Guide

## What is Vitest?

Vitest is a fast unit test framework powered by Vite. It's designed to work seamlessly with Vite projects and provides:
- ⚡ Fast execution (powered by Vite)
- 🔄 Hot Module Replacement (HMR) for tests
- 📦 Zero config needed (uses your Vite config)
- 🎯 Jest-compatible API

## Basic Test Syntax

### 1. Simple Test

```typescript
import { describe, it, expect } from 'vitest'

describe('Basic Math', () => {
  it('should add two numbers', () => {
    expect(1 + 1).toBe(2)
  })

  it('should multiply numbers', () => {
    expect(2 * 3).toBe(6)
  })
})
```

### 2. Test Structure

```typescript
import { describe, it, expect } from 'vitest'

// describe: Groups related tests together
describe('My Feature', () => {
  // it or test: Individual test case
  it('should do something', () => {
    // expect: Assertion (what you're testing)
    expect(actualValue).toBe(expectedValue)
  })
})
```

### 3. Common Matchers (Assertions)

```typescript
import { describe, it, expect } from 'vitest'

describe('Matchers Examples', () => {
  it('toBe - exact equality', () => {
    expect(2 + 2).toBe(4)
    expect('hello').toBe('hello')
  })

  it('toEqual - deep equality', () => {
    expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
    expect([1, 2, 3]).toEqual([1, 2, 3])
  })

  it('toContain - arrays/strings', () => {
    expect([1, 2, 3]).toContain(2)
    expect('hello world').toContain('world')
  })

  it('toBeTruthy / toBeFalsy', () => {
    expect(true).toBeTruthy()
    expect(false).toBeFalsy()
    expect(0).toBeFalsy()
    expect(1).toBeTruthy()
  })

  it('toBeNull / toBeUndefined', () => {
    expect(null).toBeNull()
    expect(undefined).toBeUndefined()
  })

  it('toMatch - regex', () => {
    expect('hello@example.com').toMatch(/^[\w-]+@[\w-]+\.\w+$/)
  })

  it('toThrow - errors', () => {
    expect(() => {
      throw new Error('Something went wrong')
    }).toThrow('Something went wrong')
  })
})
```

### 4. Testing Functions

```typescript
import { describe, it, expect } from 'vitest'

// Function to test
function add(a: number, b: number): number {
  return a + b
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero')
  }
  return a / b
}

describe('Math Functions', () => {
  describe('add', () => {
    it('should add positive numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5)
    })

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5)
    })
  })

  describe('divide', () => {
    it('should divide numbers correctly', () => {
      expect(divide(10, 2)).toBe(5)
    })

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero')
    })
  })
})
```

### 5. Async Tests

```typescript
import { describe, it, expect } from 'vitest'

// Async function
async function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve('data'), 100)
  })
}

describe('Async Functions', () => {
  it('should handle async operations', async () => {
    const result = await fetchData()
    expect(result).toBe('data')
  })

  it('should handle promises', async () => {
    await expect(fetchData()).resolves.toBe('data')
  })

  it('should handle promise rejections', async () => {
    const failingPromise = Promise.reject(new Error('Failed'))
    await expect(failingPromise).rejects.toThrow('Failed')
  })
})
```

### 6. Setup and Teardown

```typescript
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'

describe('Setup and Teardown', () => {
  let counter = 0

  // Runs once before all tests in this describe block
  beforeAll(() => {
    console.log('Before all tests')
  })

  // Runs once after all tests in this describe block
  afterAll(() => {
    console.log('After all tests')
  })

  // Runs before each test
  beforeEach(() => {
    counter = 0
    console.log('Before each test')
  })

  // Runs after each test
  afterEach(() => {
    console.log('After each test')
  })

  it('test 1', () => {
    counter++
    expect(counter).toBe(1)
  })

  it('test 2', () => {
    counter++
    expect(counter).toBe(1) // Still 1 because beforeEach reset it
  })
})
```

### 7. Mocking

```typescript
import { describe, it, expect, vi } from 'vitest'

// Mock a function
const mockFn = vi.fn()

describe('Mocking', () => {
  it('should call mock function', () => {
    mockFn('hello')
    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith('hello')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should return mocked value', () => {
    mockFn.mockReturnValue(42)
    expect(mockFn()).toBe(42)
  })

  it('should mock async function', async () => {
    const asyncMock = vi.fn().mockResolvedValue('result')
    const result = await asyncMock()
    expect(result).toBe('result')
  })
})
```

### 8. Testing Objects and Arrays

```typescript
import { describe, it, expect } from 'vitest'

describe('Objects and Arrays', () => {
  const user = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  }

  const numbers = [1, 2, 3, 4, 5]

  it('should check object properties', () => {
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('age', 30)
    expect(user.name).toBe('John')
  })

  it('should check array length', () => {
    expect(numbers).toHaveLength(5)
  })

  it('should check array contains', () => {
    expect(numbers).toContain(3)
    expect(numbers).not.toContain(10)
  })

  it('should check array elements', () => {
    expect(numbers[0]).toBe(1)
    expect(numbers[numbers.length - 1]).toBe(5)
  })
})
```

## Running Tests

### Basic Commands

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once and exit
npm test -- --run

# Run specific test file
npm test -- src/utils/__tests__/dateUtil.test.ts

# Run tests matching a pattern
npm test -- --grep "dateUtil"

# Run tests with UI (visual interface)
npm test:ui

# Run tests with coverage
npm test -- --coverage
```

### Watch Mode

When you run `npm test`, Vitest enters watch mode:
- Press `a` to run all tests
- Press `f` to run only failed tests
- Press `p` to filter by filename pattern
- Press `t` to filter by test name pattern
- Press `q` to quit
- Press `u` to update snapshots

## Example: Complete Test File

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'

// The function we're testing
function calculateTotal(items: { price: number; quantity: number }[]): number {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

describe('Shopping Cart', () => {
  describe('calculateTotal', () => {
    it('should calculate total for single item', () => {
      const items = [{ price: 10, quantity: 2 }]
      expect(calculateTotal(items)).toBe(20)
    })

    it('should calculate total for multiple items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
      ]
      expect(calculateTotal(items)).toBe(35)
    })

    it('should return 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0)
    })
  })

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })
})
```

## Key Vitest Features

### 1. Globals (No imports needed)

With `globals: true` in config, you don't need to import:
- `describe`, `it`, `test`, `expect`, `beforeEach`, etc.

But it's good practice to import them explicitly for clarity.

### 2. TypeScript Support

Vitest works great with TypeScript out of the box - no extra configuration needed!

### 3. Fast Execution

Vitest uses Vite's fast HMR, so tests run quickly and update instantly.

### 4. Coverage

```bash
npm test -- --coverage
```

## Next Steps

1. **Try the examples above** - Create a test file and run it
2. **Test your own functions** - Start with simple utility functions
3. **Read the full guide** - Check `TESTING_GUIDE.md` for advanced patterns
4. **Explore the example tests** - Look at the test files in `__tests__` directories

## Common Patterns

### Test Structure
```typescript
describe('Feature Name', () => {
  describe('specific function or behavior', () => {
    it('should do something specific', () => {
      // Arrange: Set up test data
      const input = 'test'
      
      // Act: Execute the function
      const result = myFunction(input)
      
      // Assert: Check the result
      expect(result).toBe('expected')
    })
  })
})
```

### Testing Edge Cases
```typescript
describe('Edge Cases', () => {
  it('should handle empty input', () => {})
  it('should handle null/undefined', () => {})
  it('should handle very large numbers', () => {})
  it('should handle special characters', () => {})
})
```

Happy Testing! 🚀
