'use client'

import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay = 150): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handle)
  }, [value, delay])

  return debouncedValue
}
