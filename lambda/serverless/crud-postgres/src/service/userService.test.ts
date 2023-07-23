import { DatabaseConfig } from 'src/utils/postgresUtils'
import { UserService } from './userService'
import env from './../../env.json'
var os = require('os')

describe('Test suite to test userService', () => {
  // Use Local DB for locahost testing and cloud db for pipelines testing
  const isLocal = os.hostname().indexOf('local') > -1
  const host = isLocal ? 'localhost' : process.env.PG_HOST
  let portString = process.env.PG_PORT || env.PG_PORT
  const database = process.env.PG_DB || env.PG_DB
  const user = isLocal ? '' : process.env.PG_USER
  const password = isLocal ? '' : process.env.PG_PWD
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

  it('should create a table', async () => {
    const res = await userService.createTable('User')
    expect(res).toBeTruthy()
  })

  it('should create a record', async () => {
    // await createUserTable()
    const res = await userService.createUser('jay_' + new Date())
    expect(res).toBeTruthy()
  })

  it('should read all data', async () => {
    const usersRes = await userService.getUsers()
    const users = usersRes?.rows
    expect(users).toBeTruthy()
  })
})
