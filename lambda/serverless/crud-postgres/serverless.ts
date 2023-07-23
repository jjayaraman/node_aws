import type { AWS } from '@serverless/typescript'
import user from '@functions/user'
import env from './env.json'

const serverlessConfiguration: AWS = {
  service: 'crud-postgres',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dotenv-plugin',
    'serverless-deployment-bucket',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-west-2',
    architecture: 'x86_64',
    memorySize: 128,
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: env.PG_HOST,
      PG_PORT: env.PG_PORT,
      PG_DB: env.PG_DB,
      PG_USER: env.PG_USER,
      PG_PWD: env.PG_PWD,
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { user },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dotenv: {
      file: 'env.json',
    },
  },
}

module.exports = serverlessConfiguration
