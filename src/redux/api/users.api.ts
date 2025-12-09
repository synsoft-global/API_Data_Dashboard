import { UserListDTO } from '@/dto'
import { api } from './api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userList: builder.query<UserListDTO, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
      providesTags: ['users'],
    }),
  }),
})

export const { useUserListQuery } = extendedApi
