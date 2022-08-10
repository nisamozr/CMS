
const { Client } = require("@notionhq/client")
const SECRET_KEY = "secret_WDd6H8fScuyX0p8eirjcRrQiR4nhdj44iLr3U7j2h0u"; //notion secret key
const DATABASE_ID = "411fda3395e64852aeb1dc76fac93865" ; //notion database id

const notion = new Client({
    auth: SECRET_KEY
})


async function fetcheNotionApi(){ 
const response = await notion.databases.query({
        database_id: DATABASE_ID,

    });
    console.log(JSON.stringify(response))

    const hh = response.results;
    const res = hh.map((page) => {
        // console.log(page.properties)
        return {
            pageId: page.id,
            title: page,
   
        };
    });
    console.log(res)

}
fetcheNotionApi()