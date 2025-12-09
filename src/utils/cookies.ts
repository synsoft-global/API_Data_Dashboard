// utils/cookies.ts

// Set a cookie
export const setCookie = (name: string, value: string, days = 7, path = '/', sameSite: 'Lax' | 'Strict' | 'None' = 'Lax', secure = window.location.protocol === 'https:') => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  let cookieStr = `${name}=${value}; expires=${date.toUTCString()}; path=${path}; SameSite=${sameSite}`
  if (secure) cookieStr += '; Secure'
  document.cookie = cookieStr
}

// Get a cookie
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

// Remove a cookie
export const removeCookie = (name: string, path = '/') => {
  document.cookie = `${name}=; Max-Age=-1; path=${path}`
}
