# Vitest Quick Reference - Commands & Examples

## 🚀 Quick Start Commands

```bash
# Run tests in watch mode (auto-rerun on file changes)
npm test

# Run tests once and exit
npm test -- --run

# Run specific test file
npm test -- src/examples/__tests__/vitest-basics.test.ts

# Run tests with UI (visual interface)
npm test:ui

# Run tests with coverage report
npm test -- --coverage

# Run tests matching a pattern
npm test -- --grep "dateUtil"
```

## 📝 Basic Test Syntax

```typescript
import { describe, it, expect } from 'vitest'

describe('Feature Name', () => {
  it('should do something', () => {
    expect(actual).toBe(expected)
  })
})
```

## ✅ Common Assertions (Matchers)

```typescript
// Equality
expect(value).toBe(4)                    // Exact match (===)
expect(obj).toEqual({ a: 1 })           // Deep equality
expect(arr).toContain(2)                // Array/string contains

// Truthiness
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()

// Numbers
expect(value).toBeGreaterThan(5)
expect(value).toBeLessThan(10)
expect(value).toBeCloseTo(0.3, 2)      // Floating point

// Strings
expect(str).toMatch(/pattern/)
expect(str).toContain('substring')

// Errors
expect(() => fn()).toThrow('error message')

// Objects
expect(obj).toHaveProperty('key')
expect(obj).toHaveProperty('key', value)
```

## 🔄 Async Testing

```typescript
// With await
it('should handle async', async () => {
  const result = await asyncFunction()
  expect(result).toBe('expected')
})

// Promise matchers
await expect(promise).resolves.toBe('value')
await expect(promise).rejects.toThrow('error')
```

## 🎭 Mocking

```typescript
import { vi } from 'vitest'

// Create mock function
const mockFn = vi.fn()

// Mock return value
mockFn.mockReturnValue(42)
expect(mockFn()).toBe(42)

// Mock async
const asyncMock = vi.fn().mockResolvedValue('data')
const result = await asyncMock()

// Check calls
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledTimes(2)
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
```

## 🧹 Setup & Teardown

```typescript
beforeAll(() => {
  // Runs once before all tests
})

afterAll(() => {
  // Runs once after all tests
})

beforeEach(() => {
  // Runs before each test
})

afterEach(() => {
  // Runs after each test
})
```

## 📁 File Structure

```
src/
├── utils/
│   ├── dateUtil.ts
│   └── __tests__/
│       └── dateUtil.test.ts    ← Test file
```

## 🎯 Watch Mode Shortcuts

When running `npm test` (watch mode):
- `a` - Run all tests
- `f` - Run only failed tests
- `p` - Filter by filename pattern
- `t` - Filter by test name pattern
- `q` - Quit
- `u` - Update snapshots

## 📚 Example Test File

See: `src/examples/__tests__/vitest-basics.test.ts`

Run it: `npm test -- --run src/examples/__tests__/vitest-basics.test.ts`

## 🔗 More Resources

- Full Guide: `VITEST_QUICKSTART.md`
- Testing Guide: `TESTING_GUIDE.md`
- [Vitest Docs](https://vitest.dev/)
