'use strict';

import * as aws from 'aws-sdk';
const iot = new aws.Iot();

export const hello = async (event) => {
  const nextToken = event?.queryStringParameters?.nextToken;
  const maxResultsString = event?.queryStringParameters?.maxResults;

  let maxResults: number = 1;
  if (maxResultsString) {
    maxResults = parseInt(maxResultsString);
  }
  const result = await listThings(nextToken, maxResults);
  console.log('result: ', JSON.stringify(result));

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};

// List all iotThings based on search criteria in listThingsRequest
const listThings = async (nextToken: string, maxResults: number) => {
  var listThingsRequest = {
    nextToken: nextToken ? nextToken : undefined,
    maxResults: maxResults ? maxResults : 1, // Defaults to 1
  };
  console.log(`listThingsRequest : `, JSON.stringify(listThingsRequest));
  return iot.listThings(listThingsRequest).promise();
};
