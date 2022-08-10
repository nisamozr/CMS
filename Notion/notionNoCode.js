async function fetchDataFromAPIEndpoint() {
    let res = await fetch(
        "https://v1.nocodeapi.com/nisamudheen/notion/EbPqlBlIIgIdZrUx/database?id=f01ad8c076ea4afc81af3762ad5dad09"
    );
    let datas = await res.json();
    const file = datas.results;

    console.log(datas);
    let output = "";
    file.forEach((item) => {
        console.log(item);
        output += `
        <div class="blog__card">
            <h1>${item.fields.Name}</h1>
        </div>
        `;
    });
    document.querySelector(".card-container").innerHTML = output;
}
fetchDataFromAPIEndpoint();