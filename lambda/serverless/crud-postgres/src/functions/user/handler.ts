import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'

import schema from './schema'
import { DatabaseConfig } from 'src/utils/postgresUtils'
import { UserService } from 'src/service/userService'
import env from './../../../env.json'

const host = process.env.PG_HOST || env.PG_HOST
let portString = process.env.PG_PORT || env.PG_PORT
const database = process.env.PG_DB || env.PG_DB
const user = process.env.PG_USER || env.PG_USER
const password = process.env.PG_PWD || env.PG_PWD
const port = Number.parseInt(portString)
const max = 1 // pool size

const config: DatabaseConfig = {
  host,
  port,
  user,
  password,
  database,
  max,
}

const userService = new UserService(config)

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const userName = event.body.name

  console.log(`creating user ${userName}`)
  const createRes = await userService.createTable('User')
  console.log(`created user table resp: ${createRes}`)

  const insertRes = await userService.createUser(
    userName + '_' + new Date().toISOString()
  )
  console.log(`insert user table resp: ${insertRes}`)

  const res = await userService.getUsers()
  const users = res?.rows
  console.log(`get users response: ${JSON.stringify(users)}`)
  return formatJSONResponse({
    users,
  })
}

export const createuser = middyfy(create)
