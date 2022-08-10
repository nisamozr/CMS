# CMS




 ## Airtable
 >  [Airtable API Doce](https://airtable.com/api)

 vanilla javascript Airtable cms

```
async function fetvhAirtable() {
    // url : https://api.airtable.com/v0/BASEID/Table%201?maxRecords=300&view=Grid%20view
    // BASEID : your base id of the database in airtable

    const res = await fetch('https://api.airtable.com/v0/appEAr8rtZdB0N0oH/Table%201?maxRecords=300&view=Grid%20view', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer xxxxxxxxxxxxxxxx', // your airtable api key Eg: 'Bearer xxxxxxxxxxxxxxxx'
            'Content-Type': 'application/json'
        },
    })
    const data = await res.json()
    console.log(data.records)
}
fetvhAirtable()

```
Airtable with nodejs

```
var Airtable = require('airtable');
const APIKEY = ""; // airtable apikey
const BASEID = "" // airtable base id

var base = new Airtable({ apiKey: APIKEY }).base(BASEID);

base('Table 1').select({
    // Selecting the first 10 records in Grid view you can change that
    maxRecords: 10,
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved', record);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});

```

### Webflow CMS items with Airtable Scripts

> Ref : [https://www.connorfinlayson.com/account/scripts](https://www.connorfinlayson.com/account/scripts)

> Insertion
```

// Change this name to use a different table
let table = base.getTable("Table 2");
// Prompt the user to pick a record 
// If this script is run from a button field, this will use the button's record instead.
let record = await input.recordAsync('Select a record to use', table);

if (record) {
    let calltoWebflow = await remoteFetchAsync(`https://api.webflow.com/collections/:collocinionId/items?live=true`, {
        method: 'POST',
        body: JSON.stringify({
            fields: {
                "name": record.getCellValue("name"),
                "page-title": record.getCellValue("tittlw"),
                "_archived": false,
                "_draft": false,
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ',
            'accept-version': '1.0.0'
        }
    });

    let calltoWebflowparsed = await calltoWebflow.json();
    //  after insertion complide updatin web flow item id and other information to airtable
    await table.updateRecordAsync(record, {
        "Webflow Item ID": calltoWebflowparsed["_id"],
        "Slug": calltoWebflowparsed["slug"],
    });

    //Add check to Script updated if successful and update date

    await table.updateRecordAsync(record, {
        "Last Updated": calltoWebflowparsed["updated-on"],
    })

    output.text(`You selected this record: ${record.name}`);
} else {
    output.text('No record was selected');
}

```
>Update
```
// Change this name to use a different table
let table = base.getTable("City");
// Prompt the user to pick a record 
// If this script is run from a button field, this will use the button's record instead.
let record = await input.recordAsync('Select a record to use', table);
let cityID = record.getCellValue("Webflow Item ID");
console.log(cityID);

if (record) {
    let calltoWebflow = await remoteFetchAsync(`https://api.webflow.com/collections//items/${cityID}?live=true`, {
        method: 'PATCH',
        body: JSON.stringify({
            fields: {
                "page-title": record.getCellValue("Webflow Title"),
                "page-description": record.getCellValue("Webflow Description")
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ',
            'accept-version': '1.0.0'
        }
    });
    let calltoWebflowparsed = await calltoWebflow.json();

    console.log(calltoWebflowparsed["updated-on"]);

    //Add check to Script updated if successful

    await table.updateRecordAsync(record, {
        "Last Updated": calltoWebflowparsed["updated-on"],
    })

    // Customize this section to handle the selected record
    // You can use record.getCellValue("Field name") to access
    // cell values from the record
    output.text(`You selected this record: ${record.name}`);
} else {
    output.text('No record was selected');
}
```

> Delete
```
let table = base.getTable("Your Airtable Table");

console.log(table);

let record = await input.recordAsync('Select a record to use', table);
let freelancerID = record.getCellValue("Webflow ID")

if (freelancerID) {
    let calltoWebflow = await remoteFetchAsync(`https://api.webflow.com/collections/${WebflowCollectionID}/items/${freelancerID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ',
            'accept-version': '1.0.0'
        }
    });

    console.log(calltoWebflow);

    let calltoWebflowparsed = await calltoWebflow.json();

    //Update Airtable Record with Webflow ID, Slug and Updated Status

    await table.updateRecordAsync(record, {
        "Status": { name: "Archived" },
        "Webflow ID": "",
        "Slug": ""
    });

    output.text(`You selected this record: ${record.name}`);
} else {
    output.text('No record was selected');
}
```


## Notion
Notion  api using axios
```
var axios = require('axios');

function fetcheNotionApi() {
    var config = {
        method: 'post',
        url: 'https://api.notion.com/v1/databases/:id/query', // :id = Database Id
        headers: {
            'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',  // Apikey
            'Content-Type': 'application/json',
            'Notion-Version': '2022-02-22'
        },
    };

    axios(config)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
}
fetcheNotionApi()

```
Notion with NoCode
```
async function fetchDataFromAPIEndpoint() {
    let res = await fetch(
        "nocode api link"
    );
    let datas = await res.json();
    console.log(datas);
   
}
fetchDataFromAPIEndpoint();

```
Notion with @notionhq/client
```

const { Client } = require("@notionhq/client")
const SECRET_KEY = ""; //notion secret key
const DATABASE_ID = "" ; //notion database id

const notion = new Client({
    auth: SECRET_KEY
})


async function fetcheNotionApi(){ 
const response = await notion.databases.query({
        database_id: DATABASE_ID
    });
    console.log(JSON.stringify(response))
}
fetcheNotionApi()

```
`..............................................................................`







  
  