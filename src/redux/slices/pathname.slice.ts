import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PathnameReduxState = {
  currentRoot: string | null
  fullPath: string
}

const initialState: PathnameReduxState = { currentRoot: null, fullPath: '' }

export const pathnameSlice = createSlice({
  name: 'pathname',
  initialState,
  reducers: {
    setFromPathname(state, action: PayloadAction<string | null>) {
      const path = action.payload
      if (!path) {
        state.currentRoot = null
        state.fullPath = ''
      } else {
        const parts = path.split('/')
        state.currentRoot = parts[1] || null
        state.fullPath = path
      }
    },
  },
})

export const { setFromPathname } = pathnameSlice.actions
export default pathnameSlice.reducer
