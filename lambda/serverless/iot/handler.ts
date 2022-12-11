'use strict';

import * as aws from 'aws-sdk';
const iot = new aws.Iot();

export const hello = async (event) => {
  const nextToken = event?.queryStringParameters?.nextToken;
  const result = await listThings(nextToken);
  console.log('result: ', JSON.stringify(result));

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};

// List all iotThings based on search criteria in listThingsRequest
const listThings = async (nextToken) => {
  var listThingsRequest = {
    nextToken: nextToken ? nextToken : undefined,
    maxResults: 1, // Defaults to max allowed value 250
  };

  return iot.listThings(listThingsRequest).promise();
};
