import { QueryConfig } from 'pg'
import { DatabaseConfig, PostgresUtils } from '../utils/postgresUtils'

export class UserService {
  private pgUtils: PostgresUtils

  constructor(connectionConfig: DatabaseConfig) {
    console.log(`connectionConfig : ${JSON.stringify(connectionConfig)}`)
    this.pgUtils = new PostgresUtils(connectionConfig)
  }

  createTable = async (table: string) => {
    try {
      //Create table if not exists
      const createQuery = `
    CREATE TABLE IF NOT EXISTS "${table}" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    PRIMARY KEY ("id")
    );`
      const queryConfig: QueryConfig = {
        text: createQuery,
      }
      const createResponse = await this.pgUtils.executeQuery(queryConfig)
      console.log(`create table response : ${createResponse}`)
      console.log(`User table created successfully`)
      return createResponse
    } catch (err) {
      console.error(err)
    } finally {
    }
  }

  createUser = async (name: string) => {
    try {
      const queryConfig: QueryConfig = {
        text: 'INSERT INTO public."User" (name) VALUES ($1)',
        values: [name],
      }
      const res = await this.pgUtils.executeQuery(queryConfig)
      console.log(res)
      return res
    } catch (err) {
      console.error(err)
    } finally {
    }
  }

  getUsers = async () => {
    try {
      const queryConfig: QueryConfig = {
        text: 'SELECT * FROM public."User"',
      }
      const res = await this.pgUtils.executeQuery(queryConfig)
      console.log(res)
      return res
    } catch (err) {
      console.error(err)
    } finally {
    }
  }

  deleteUser = async (id: string) => {
    try {
      const queryConfig: QueryConfig = {
        text: 'DELETE FROM public."User" WHERE id = $1',
        values: [id],
      }
      const res = await this.pgUtils.executeQuery(queryConfig)
      console.log(res)
      return res
    } catch (err) {
      console.error(err)
    } finally {
    }
  }
}
