// Object containing house features to be tested
import * as moment from "moment";
const query =
{
    "bool": {
        "filter": [
            {
                "term": {
                    "channelName.keyword": "siteStatus"
                }
            },
            {
                "term": {
                    "status.keyword": "cloudversion"
                }
            },
            {
                "range": {
                    "@timestamp": {
                        "gte": "2022-01-23",
                        "lte": "2022-06-22"
                    }
                }
            }
        ],
        "must_not": [

        ]
    }
}


xdescribe('test query', () => {

    const currentdate = moment().format('YYYY-MM-DD')
    const pastDate = moment().subtract(150, 'days').format('YYYY-MM-DD')

    it('this house has my desired features', () => {
        expect(query).toHaveProperty('bool.filter[2].range.@timestamp.lte', currentdate)
        expect(query).toHaveProperty('bool.filter[2].range.@timestamp.gte', pastDate)
    });
})


