import { Pool, QueryConfig, QueryResult } from 'pg'

export interface DatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  max?: number
}

export class PostgresUtils {
  private pool: Pool

  constructor(connectionConfig: DatabaseConfig) {
    // console.log(`connectionConfig : ${JSON.stringify(connectionConfig)}`)
    this.pool = new Pool(connectionConfig)
  }
  async executeQuery(queryConfig: QueryConfig): Promise<QueryResult> {
    const client = await this.pool.connect()

    try {
      const result = await client.query(queryConfig)
      return result
    } catch (error) {
      throw new Error(`Error executing query: ${error}`)
    } finally {
      client.release()
    }
  }
}
