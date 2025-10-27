import { queryOptions } from '@tanstack/react-query'
import ky from 'ky'

export type User = {
  id: number
  name: string
  email: string
}

export const DEPLOY_URL = 'http://localhost:3000'

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: () =>
      ky
        .get<Array<User>>(DEPLOY_URL + '/api/users')
        .json()
        .catch(() => {
          throw new Error('Failed to fetch users')
        }),
  })

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: () =>
      ky
        .get<User>(DEPLOY_URL + '/api/users/' + id)
        .json()
        .catch(() => {
          throw new Error('Failed to fetch user')
        }),
  })
