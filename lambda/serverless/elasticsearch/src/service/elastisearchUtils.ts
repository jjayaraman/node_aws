import { Client } from '@elastic/elasticsearch'
import * as moment from "moment";

export class ElasticsearchUtils {

    constructor(private client: Client) { }

    // Buils the Elasticsearch query object.
    // @timestamp lte should be current data in YYYY-MM-DD format
    // @timestamp gte should be 150 before the current data in YYYY-MM-DD format
    buildQuery = () => {
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

    sort = [{
        "@timestamp": "desc"
    }]

    size = 1


    search = async (index: string): Promise<any> => {
        const query = this.buildQuery()
        const sort = JSON.stringify(this.sort)
        const size = this.size
        return this.searchWithArgs(index, query, sort, size);
    }


    searchWithArgs = async (index: string, query: Object, sort: string, size: number): Promise<any> => {

        console.debug(`index : ${index}, query: ${JSON.stringify(query)}, sort: ${JSON.stringify(sort)}, size: ${size}`);
        await this.client.indices.refresh({ index })
        const result = await this.client.search({
            index
            // query,
            // sort,
            // size
        })
        return result;
    }

}

