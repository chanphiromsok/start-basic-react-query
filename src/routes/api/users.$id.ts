import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import ky from 'ky'
import type { User } from '../../utils/users'

export const Route = createFileRoute('/api/users/$id')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        console.info(`Fetching users by id=${params.id}... @`, request.url)
        try {
          const res = await ky.get<User>(
            'https://jsonplaceholder.typicode.com/users/' + params.id,
          ).json()

          return json({
            id: res.id,
            name: res.name,
            email: res.email,
          })
        } catch (e) {
          console.error(e)
          return json({ error: 'User not found' }, { status: 404 })
        }
      },
    },
  },
})
