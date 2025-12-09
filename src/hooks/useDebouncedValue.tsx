'use client'

import { debounceDelay } from '@/utils'
import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay = debounceDelay): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timeout to update the debounced value
    const handle = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function that clears the timeout if the value changes before delay completes
    return () => clearTimeout(handle)
  }, [value, delay])

  // Return the current debounced value
  return debouncedValue
}
