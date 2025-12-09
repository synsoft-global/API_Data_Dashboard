import { UserDTO } from '@/dto'

export const languagesOptions = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
]

export const debounceDelay = 150

export const extractUserArray = (data: unknown): UserDTO[] => {
  if (!data) return []

  if (Array.isArray(data)) return data as UserDTO[]

  if (typeof data === 'object') {
    const obj = data as Record<string, unknown>

    if (Array.isArray(obj.users)) return obj.users as UserDTO[]
    if (Array.isArray(obj.data)) return obj.data as UserDTO[]

    const values = Object.values(obj)
    for (const v of values) {
      if (Array.isArray(v)) return v as UserDTO[]
    }
  }

  return []
}
