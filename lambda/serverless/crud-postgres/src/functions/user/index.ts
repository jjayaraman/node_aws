import user from './schema'
import { handlerPath } from '@libs/handler-resolver'
import env from './../../../env.json'

export default {
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
  vpc: env.vpc,
}
