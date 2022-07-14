import { Client } from '@elastic/elasticsearch'
import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import moment = require('moment');
const Mock = require('@elastic/elasticsearch-mock')

const fs = require('fs');

const mock = new Mock()
const client = new Client({
    node: 'http://localhost:9200',
    Connection: mock.getConnection()
})

const index = 'us-east-develop.oncamdev.com-app-2022.06'

const buildQuery = () => {
    const currentdate = moment().format('YYYY-MM-DD')
    const pastDate = moment().subtract(150, 'days').format('YYYY-MM-DD')

    const query: Object = {
        "bool": {
            "filter": [{
                "term": {
                    "channelName.keyword": "siteStatus"
                }
            }, {
                "term": {
                    "status.keyword": "cloudversion"
                }
            }, {
                "range": {
                    "@timestamp": {
                        "gte": pastDate,
                        "lte": currentdate
                    }
                }
            }],
            "must_not": []
        }
    }

    return query;
}


// mock.add({
//     method: 'GET',
//     path: '/_cat/health'
// }, () => {
//     return { status: 'ok' }
// })

// it('default test', async () => {
//     client.cat.health()
//         .then(console.log)
//         .catch(console.log)
// })



mock.add({
    method: 'POST',
    path: '/us-east-develop.oncamdev.com-app-2022.06/_search',
    body: { query: { match_all: {} } }
}, () => {
    let rawdata = fs.readFileSync('test/result.json');
    let result = JSON.parse(rawdata);
    return { status: 'ok', result }
})


xit('should search data from us-east-develop.oncamdev.com-app-2022.06 index', async () => {

    const result = await client.search(
        {
            index: 'us-east-develop.oncamdev.com-app-2022.06',
            query: { match_all: {} }
        }
    )
    console.log(JSON.stringify(result, null, 2))
})




// mock.add({
//     method: 'POST',
//     path: '/indexName/_search',
//     body: { query: { match_all: {} } }
// }, () => {
//     return {
//         hits: {
//             total: { value: 1, relation: 'eq' },
//             hits: [{ _source: { baz: 'faz' } }]
//         }
//     }
// })


// it('should return correct', async () => {
//     // const result = await client.search(searchRequest)
//     // await client.search(searchRequest)
//     //     .then(console.log)
//     //     .catch(console.log)

//     await client.cat.health()
//         .then(console.log)
//         .catch(console.log)
// })



// mock.add({
//     method: 'GET',
//     path: '/foo/_search'
// }, () => {
//     return { aa: 42 }
// })



// it('should return correct', async () => {

//     await client.search({ index: 'foo' })
//         .then(console.log) // => { count: 42 }
//         .catch(console.log)

//     await client.count({ index: 'bar' })
//         .then(console.log) // => { count: 42 }
//         .catch(console.log)
// })

