import { user } from './schema'
import { handlerPath } from '@libs/handler-resolver'
import { vpc } from './../../../env.json'

export const createUser = {
  handler: `${handlerPath(__dirname)}/handler.createuser`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user',
        request: {
          schemas: {
            'application/json': user,
          },
        },
      },
    },
  ],
  vpc,
}

export const getUsers = {
  handler: `${handlerPath(__dirname)}/handler.users`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'users',
      },
    },
  ],
  vpc,
}
