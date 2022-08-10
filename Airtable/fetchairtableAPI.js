// vanilla javascript airtable cms
async function fetvhAirtable() {
    // url : https://api.airtable.com/v0/BASEID/Table%201?maxRecords=300&view=Grid%20view
    // BASEID : your base id of the database in airtable

    const res = await fetch('https://api.airtable.com/v0/appEAr8rtZdB0N0oH/Table%201?maxRecords=300&view=Grid%20view', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer keycgBiGgojVBFSHd', // your airtable api key Eg: 'Bearer xxxxxxxxxxxxxxxx'
            'Content-Type': 'application/json'
        },

    })
    const data = await res.json()
    console.log(data.records)

    const cards = data.records
    let output = ""

    cards.map((item) => {
        const out = {
            Name: item.fields.Name,
            Notes: item.fields.Notes,
            gg: item.fields.gg
        }
        console.log(out);

        output += `
            <div class="blog__card">
              <h1>${out.Name}</h1>
              <h4>${out.Notes}</h4>
              <p>${out.gg}</p>
              <hr>
            </div>
    `;
    });
    document.querySelector(".card-container").innerHTML = output;


}

fetvhAirtable()