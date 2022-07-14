
import { Client } from '@elastic/elasticsearch'
import { ElasticsearchUtils } from '../src/service/elastisearchUtils';

const INDEX = 'us-east-develop.oncamdev.com-app-2022.06';

const localClient = new Client({
    node: 'http://localhost:9200'
})
const elasticsearchUtils = new ElasticsearchUtils(localClient);


describe('Unit test for elasticsearchUtils ', () => {

    it('should be able to search elasticsearch', async () => {
        const result = await elasticsearchUtils.search(INDEX)
        // console.log('Versions : ', result.hits.hits[0]._source.action.Services);
        console.log('Versions : ', JSON.stringify(result, null, 2));

    });

});

