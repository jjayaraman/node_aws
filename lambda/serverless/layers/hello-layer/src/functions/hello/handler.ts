import { add } from './../../../nodejs/calulator-layer/calculator';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('event: ' + JSON.stringify(event));
  const { x, y } = event.body
  const sum = add(x, y)
  console.log('add : ', sum)
  return formatJSONResponse({
    message: `Sum is ${sum}`
  });
};

export const main = middyfy(hello);
