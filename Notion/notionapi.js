//notion  api using node js
var axios = require('axios');

function fetcheNotionApi() {

    // if you need to fiter datat from notion use this
    // // var data = JSON.stringify({
    // //   "filter": {
    // //     "or": [
    // //       {
    // //         "property": "Status",
    // //         "select": {
    // //           "equals": "Reading"
    // //         }
    // //       },
    // //       {
    // //         "property": "Publisher",
    // //         "select": {
    // //           "equals": "NYT"
    // //         }
    // //       }
    // //     ]
    // //   },
    // //   "sorts": [
    // //     {
    // //       "property": "Score /5",
    // //       "direction": "ascending"
    // //     }
    // //   ]
    // // });

    var config = {
        method: 'post',
        url: 'https://api.notion.com/v1/databases/411fda3395e64852aeb1dc76fac93865/query',
        headers: {
            'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'Content-Type': 'application/json',
            'Notion-Version': '2022-02-22'
        },
        //   data : data
    };

    axios(config)
        .then(function(response) {
            console.log(response.data.results[0].properties.Name.title[0].plain_text);
        })
        .catch(function(error) {
            console.log(error);
        });
}


fetcheNotionApi()