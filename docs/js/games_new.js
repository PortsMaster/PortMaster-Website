var jsonData = null;
var devices = null;
var deviceCFW = [];
var manufacturers = [];
var countsData = null;
var AZ = true;
var Newest = false;
var Downloaded = false;

var deviceMap = {
    "ALL": "All Firmwares",
    "jelos": "JELOS",
    "rocknix": "ROCKNIX",
    "arkos":  "ArkOS",
    "emuelec":  "EmuELEC",
    "amberelec":  "AmberELEC",
    "arkos (wummle)": "ArkOS (Wummle)"
}


function sortAZ() {
    AZ = true;
    Newest = false;
    Downloaded = false;
    const newestCheck = document.getElementById('sortNewest');
    const downloadedCheck = document.getElementById('sortDownloaded');
    downloadedCheck.checked = false;
    newestCheck.checked = false;
    filterCards();
}

function sortNewest() {
    AZ = false;
    Downloaded = false;
    Newest = true;
    const azCheck = document.getElementById('sortAZ');
    const downloadedCheck = document.getElementById('sortDownloaded');
    azCheck.checked = false;
    downloadedCheck.checked = false;
    filterCards();
}

function sortDownloaded() {
    AZ = false;
    Newest = false;
    Downloaded = true;
    const newestCheck = document.getElementById('sortNewest');
    const azCheck = document.getElementById('sortAZ');
    azCheck.checked = false;
    newestCheck.checked = false;
    filterCards();
}


// Function to create a card element for each JSON object
// https://discord.gg/JxYBp9HTAY
function createCard(data) {
    const div1 = document.createElement('div');
    div1.setAttribute("class", "col");

    const div2 = document.createElement('div');
    div2.setAttribute("class", "card h-100 shadow-sm");

    const image = document.createElement("img");

    var source = "https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/no.image.png";

    if (data.attr.image.screenshot !== null) {
        if (data.source.repo == "main") {
            /* Hopefully this works. */
            source = ("https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/" + data.name.replace(".zip", "/") + data.attr.image.screenshot);
        } else if (data.source.repo == "multiverse") {
            source = ("https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-MV-New/main/ports/" + data.name.replace(".zip", "/") + data.attr.image.screenshot);
        }
    }

    image.src = source;
    image.setAttribute("class", "bd-placeholder-img card-img-top");
    image.setAttribute("loading", "lazy");

    image.addEventListener('click', () => {
        handleCardClick(data.name.replace(".zip", ""));
    });

    const div3 = document.createElement('div');
    div3.setAttribute("class", "card-body");

    const title = document.createElement('h5');
    title.setAttribute("class", "card-title link-body-emphasis");
    title.setAttribute("style", "padding-top: 20px")
    title.textContent = data.attr.title;

    title.addEventListener('click', () => {
        handleCardClick(data.name.replace(".zip", ""));
    });

    const paragraph = document.createElement('p');
    paragraph.setAttribute("class", "card-text");
    paragraph.setAttribute("style", "padding-top: 10px")

    var converter = new showdown.Converter();

    paragraph.innerHTML = converter.makeHtml(data.attr.desc);

    const porter = document.createElement('p');
    porter.setAttribute("class", "card-text");
    porter.setAttribute("style", "padding-top: 10px");
    var porters = data.attr.porter;
    var porterHtml = "Porter: ";
    porters.forEach((porter) => {
        porterHtml += '<a href="profile.html?porter=' + porter + '">' + porter + '</a>';
        if (porters.length > 1) {
            porterHtml += " ";
        }
    });
    porter.innerHTML = porterHtml;

    const supported = document.createElement('p');
    supported.setAttribute("class", "card-text");
    supported.setAttribute("style", "padding-top: 10px");

    var deviceDetails = [];
    var supportedtext = "";
    for (item in data.supported){
        for(support in data.attr.avail){
            if(data.attr.avail[support].includes(data.supported[item])){
                var deviceName = devices[data.attr.avail[support].split(":")[0]]["name"]
                var cfws = deviceMap[data.attr.avail[support].split(":")[1]]
                supportedtext = supportedtext + deviceName + ": " + cfws + "<br>"
                deviceDetails.push(deviceName + ": " + cfws);
            }
        }
    }
    supported.innerHTML = "Device Support: <br>" + supportedtext;

    const dateUpdated = document.createElement('p');
    dateUpdated.setAttribute("class", "card-text text-body-secondary");
    dateUpdated.setAttribute("style", "padding-top: 10px")
    dateUpdated.textContent = "Updated: " + data.source.date_updated;

    var taggedMisc = "";
    if (data.attr.rtr) {
        taggedMisc += '<span class="misc-item badge bg-secondary">Ready to Run</span> ';
    }

    if (data.attr.exp) {
        taggedMisc += '<span class="misc-item badge bg-secondary">Experimental</span> ';
    }

    if (data.source.repo == "multiverse") {
        taggedMisc += '<span class="misc-item badge bg-secondary">Multiverse</span> ';
    }

    const miscValues = document.createElement('p');
    miscValues.innerHTML = taggedMisc;

    const div4 = document.createElement('div');
    div4.setAttribute("class", "d-flex justify-content-between align-items-center");

    const div5 = document.createElement('div');
    div5.setAttribute("class", "btn-group");

    const button = document.createElement('button');
    button.setAttribute("type", "button");
    //button.textContent = "Download"
    button.textContent = "Details"
    button.setAttribute("class", "btn btn-sm btn-outline-primary");
    //button.setAttribute("onclick","window.location.href='"+ data.source.url+ "';");
    button.setAttribute("onclick", "window.location.href='detail_new.html?name=" + data.name.replace(".zip", "") + "&devices="+ deviceDetails.join(",") +"';");


    div5.appendChild(button);



    const small = document.createElement('small');
    small.setAttribute("class", "text-body-secondary");
    small.textContent = "Downloads: " + (countsData["ports"][data.name] ? countsData["ports"][data.name] : "0");


    div4.appendChild(small);
    div4.appendChild(div5);


    div3.appendChild(image);
    div3.appendChild(title);
    div3.appendChild(paragraph);
    div3.appendChild(miscValues);
    div3.appendChild(porter);
    if (data.supported.length > 0){
        div3.appendChild(supported);
    }
    div3.appendChild(dateUpdated);
    div3.appendChild(div4);

    div2.appendChild(div3)
    div1.appendChild(div2)


    return div1;
}

// Function to iterate over the JSON data and display cards
function displayCards(data) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Clear previous cards
    for (var key of Object.keys(data)) {
        const card = createCard(data[key]);
        cardsContainer.appendChild(card);
    };
}

// Function to filter the cards based on the search query
function filterCards() {
    const searchQuery = document.getElementById('search').value.trim().toLowerCase();
    const readyToRun = document.getElementById('ready-to-run').checked;
    const filesNeeded = document.getElementById('files-needed').checked;
    var filteredData = []
    var queries = searchQuery.split(" ");
    if (searchQuery.length > 0) {
        var selected = [];
        for (var key of Object.keys(jsonData)) {
            jsonData[key]["supported"] = [];
            var list = [jsonData[key].attr.title,jsonData[key].attr.porter.join(),jsonData[key].attr.genres.join()];
            const options = { includeScore: true, isCaseSensitive: false, shouldSort: true };
            const fuse = new Fuse(list, options);
            const result = fuse.search(document.getElementById('search').value.trim());
            
            if (result.length > 0) {
                // the lower the score , the closer to the name
                if ((result[0].score < .04) && !filteredData.includes(jsonData[key])) {
                    if (readyToRun || filesNeeded) {
                        if (readyToRun) {
                            if (jsonData[key].attr.rtr) {
                                if (jsonData[key].attr.avail.length < 1) {
                                    if (!filteredData.includes(jsonData[key])) {
                                        if (!jsonData[key]["supported"].includes("ALL")){
                                            jsonData[key]["supported"].push("ALL");
                                        }
                                        filteredData.push(jsonData[key]);
                                    }
                                }
                                for ( item in jsonData[key].attr.avail) {
                                    var device = jsonData[key].attr.avail[item].split(":")[0];
                                    var cfw = jsonData[key].attr.avail[item].split(":")[1]
                                    var element = document.getElementById(device);
                                    if (element && element.checked){
                                        if (!jsonData[key]["supported"].includes(device)){
                                            jsonData[key]["supported"].push(device);
                                        }
                                        if (!selected.includes(device)){
                                            selected.push(device);
                                        }
                                    }
                                    if (element && element.checked || device == "ALL"){
                                        if ((element && element.id == device) || device == "ALL" ){
                                            if (!jsonData[key]["supported"].includes(device)){
                                                jsonData[key]["supported"].push(device);
                                            }
                                            if (!filteredData.includes(jsonData[key])) {
                                                filteredData.push(jsonData[key]);
                                            }
                                        }
                                       
                                    }
                                }
                                if (selected.length < 1){
                                    if (!filteredData.includes(jsonData[key])) {
                                        filteredData.push(jsonData[key]);
                                    }
                                }
                            }
                        } if (filesNeeded) {
                            if (!jsonData[key].attr.rtr) {
                                if (jsonData[key].attr.avail.length < 1) {
                                    if (!filteredData.includes(jsonData[key])) {
                                        if (!jsonData[key]["supported"].includes("ALL")){
                                            jsonData[key]["supported"].push("ALL");
                                        }
                                        filteredData.push(jsonData[key]);
                                    }
                                }
                                for ( item in jsonData[key].attr.avail) {
                                    var device = jsonData[key].attr.avail[item].split(":")[0];
                                    var cfw = jsonData[key].attr.avail[item].split(":")[1]
                                    var element = document.getElementById(device);
                                    if (element && element.checked){
                                        if (!jsonData[key]["supported"].includes(device)){
                                            jsonData[key]["supported"].push(device);
                                        }
                                        if (!selected.includes(device)){
                                            selected.push(device);
                                        }
                                    }
                                    if (element && element.checked || device == "ALL"){
                                        if ((element && element.id == device) || device == "ALL" ){
                                            if (!jsonData[key]["supported"].includes(device)){
                                                jsonData[key]["supported"].push(device);
                                            }
                                            if (!filteredData.includes(jsonData[key])) {
                                                filteredData.push(jsonData[key]);
                                            }
                                        }
                                       
                                    }
                                }
                                if (selected.length < 1){
                                    if (!filteredData.includes(jsonData[key])) {
                                        filteredData.push(jsonData[key]);
                                    }
                                }
                            }
                        }
                    }
                    else {
                   
                    } 
                }
            }
        }

    }
    else {
        var selected = [];
        for (var key of Object.keys(jsonData)) {
            jsonData[key]["supported"] = [];
            if (readyToRun || filesNeeded) {
                if (readyToRun) {
                    if (jsonData[key].attr.rtr) {
                        if (jsonData[key].attr.avail.length < 1) {
                            if (!filteredData.includes(jsonData[key])) {
                                if (!jsonData[key]["supported"].includes("ALL")){
                                    jsonData[key]["supported"].push("ALL");
                                }
                                filteredData.push(jsonData[key]);
                            }
                        }
                        for ( item in jsonData[key].attr.avail) {
                            var device = jsonData[key].attr.avail[item].split(":")[0];
                            var cfw = jsonData[key].attr.avail[item].split(":")[1]
                            var element = document.getElementById(device);
                            if (element && element.checked){
                                if (!jsonData[key]["supported"].includes(device)){
                                    jsonData[key]["supported"].push(device);
                                }
                                if (!selected.includes(device)){
                                    selected.push(device);
                                }
                            }
                            if (element && element.checked || device == "ALL"){
                               
                                if ((element && element.id == device) || device == "ALL" ){
                                    if (!jsonData[key]["supported"].includes(device)){
                                        jsonData[key]["supported"].push(device);
                                    }
                                    if (!filteredData.includes(jsonData[key])) {
                                        filteredData.push(jsonData[key]);
                                    }
                                }
                               
                            }
                        }
                        if (selected.length < 1){
                            if (!filteredData.includes(jsonData[key])) {
                                filteredData.push(jsonData[key]);
                            }
                        }
                    }
                } if (filesNeeded) {
                    if (!jsonData[key].attr.rtr) {
                        if (jsonData[key].attr.avail.length < 1) {
                            if (!filteredData.includes(jsonData[key])) {
                                if (!jsonData[key]["supported"].includes("ALL")){
                                    jsonData[key]["supported"].push("ALL");
                                }
                                filteredData.push(jsonData[key]);
                            }
                        }
                        for ( item in jsonData[key].attr.avail) {
                            var device = jsonData[key].attr.avail[item].split(":")[0];
                            var cfw = jsonData[key].attr.avail[item].split(":")[1]
                            var element = document.getElementById(device);
                            if (element && element.checked){
                                if (!jsonData[key]["supported"].includes(device)){
                                    jsonData[key]["supported"].push(device);
                                }
                                if (!selected.includes(device)){
                                    selected.push(device);
                                }
                            }
                            if (element && element.checked || device == "ALL"){
                                if ((element && element.id == device) || device == "ALL" ){
                                    if (!jsonData[key]["supported"].includes(device)){
                                        jsonData[key]["supported"].push(device);
                                    }
                                    if (!filteredData.includes(jsonData[key])) {
                                        filteredData.push(jsonData[key]);
                                    }
                                }
                               
                            }
                        }
                        if (selected.length < 1){
                            if (!filteredData.includes(jsonData[key])) {
                                filteredData.push(jsonData[key]);
                            }
                        }
                    }
                }
            }
            else {
                // don't show any ports if ready to run or files need are not checked
            } 
        }
    }
    if (Newest) {
        filteredData.sort((a, b) => Date.parse(a.source.date_added) > Date.parse(b.source.date_added) ? -1 : (Date.parse(a.source.date_added) < Date.parse(b.source.date_added) ? 1 : 0));
    }

    if (AZ) {
        filteredData.sort();
    }

    if (Downloaded) {
        filteredData.sort((a, b) => a.download_count > b.download_count ? -1 : (a.download_count < b.download_count) ? 1 : 0);
    }

    var availablePorts = document.getElementById("port-count")
    availablePorts.textContent = filteredData.length + " Ports Available"
    displayCards(filteredData);
}

// Function to handle the card title click and redirect to the detail page
function handleCardClick(name) {
    window.location.href = `detail.html?name=${encodeURIComponent(name)}`;
}

function populateManufacturerDropdown() {
    var deviceDropdown = document.getElementById("dropdown-buttons");
    for (manufacturer of manufacturers) {
        const div = document.createElement('div');
        div.setAttribute("class", "btn-group flex-wrap");
        div.setAttribute("role", "group");
        const button = document.createElement('button');
        button.setAttribute("class", "btn btn-outline-primary dropdown-toggle");
        button.setAttribute("data-bs-toggle", "dropdown");  
        button.setAttribute("aria-expanded", "false");
        button.textContent = manufacturer
        const ul = document.createElement('ul');
        ul.setAttribute("id", manufacturer);
        ul.setAttribute("class", "dropdown-menu");
        div.appendChild(button);
        div.appendChild(ul);
        deviceDropdown.appendChild(div);

    }
    populateDeviceDropdown();
}

function selectDevice(deviceName){
   // console.log(devices[deviceName]);
   
 if (!deviceCFW.includes(deviceName)){
    deviceCFW.push(deviceName);
    filterCards();
 }
    else {
        deviceCFW.pop(deviceName);
        filterCards();
    }
    console.log(deviceCFW.length);
 
}

function populateDeviceDropdown() {
    for (var key of Object.keys(devices)) {
        var manufacturerDropdown = document.getElementById(devices[key]["manufacturer"]);
        const li = document.createElement('li');
        const a = document.createElement('a');
        //a.textContent = devices[key]["name"]
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.setAttribute("class", "form-check-input");
        input.setAttribute("type", "checkbox"); 
        input.setAttribute("style", "margin-right: 10px;");
        input.setAttribute("onchange", "filterCards()");
        input.setAttribute("id", key);
        label.textContent = devices[key]["name"]
        li.setAttribute("class", "dropdown-item");
        li.setAttribute("href", "#");
        li.appendChild(input);
        li.appendChild(label);
        manufacturerDropdown.appendChild(li);

    }
}

async function getDeviceList() {
    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/devices.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        devices = await response.json();
        for (var key of Object.keys(devices)) {
            if (! manufacturers.includes(devices[key]["manufacturer"])) {
                manufacturers.push(devices[key]["manufacturer"]);
            }
        }

        populateManufacturerDropdown();


} catch (error) {
    console.error('Error fetching JSON data:', error);
}
}


// Fetch JSON data from the URL and then display the cards
async function fetchDataAndDisplayCards() {

    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/ports.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        jsonData = await response.json();
        jsonData = jsonData.ports
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/port_stats.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        countsData = await response.json();
        for (var key of Object.keys(jsonData)) {
            jsonData[key]["download_count"] = countsData["ports"][jsonData[key].name];
        }

    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }



    filterCards();

}

// Call the initial fetchDataAndDisplayCards function when the page is loaded
window.onload = function () {
    getDeviceList();
    fetchDataAndDisplayCards();
    // document.getElementById('search-bar').addEventListener('input', filterCards);
};

