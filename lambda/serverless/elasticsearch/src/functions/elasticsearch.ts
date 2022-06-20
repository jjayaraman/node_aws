import { Client } from '@elastic/elasticsearch';
import { ElasticsearchUtils } from './../service/elastisearchUtils';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';


export const search = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const ES_DOMAIN = process.env.ES_DOMAIN as string;
    const ES_INDEX = process.env.ES_INDEX as string

    console.log(`domain : ${ES_DOMAIN}`);
    if (!ES_DOMAIN) {
        console.error(`No env variable found for ES_DOMAIN`);

        return {
            statusCode: 401,
            body: JSON.stringify('No env variable found for ES_DOMAIN'),
        }
    }

    if (!ES_INDEX) {
        console.error(`No env variable found for ES_INDEX`);

        return {
            statusCode: 401,
            body: JSON.stringify('No env variable found for ES_INDEX'),
        }
    }

    const client = new Client({
        node: ES_DOMAIN
    })

    let result = ''
    try {

        const es = new ElasticsearchUtils(client)
        result = await es.search(ES_INDEX)
        console.debug(`Search results: ${result}`)

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 401,
            body: `And error occured: ${JSON.stringify(error.message)}`,
        }
    }


};