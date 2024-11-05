var jsonData = null;
var devices = null;
var deviceCFW = [];
var manufacturers = [];
var countsData = null;
var gameGenres = [];

const firmwareMap = {
    "ALL": "All Firmwares",
    "jelos": "JELOS",
    "rocknix": "ROCKNIX",
    "arkos": "ArkOS",
    "emuelec": "EmuELEC",
    "amberelec": "AmberELEC",
    "arkos (wummle)": "ArkOS (Wummle)",
};

function createElement(tagName, props, children) {
    const element = document.createElement(tagName);

    if (props) {
        Object.assign(element, props);
    }

    if (children) {
        if (Array.isArray(children)) {
            element.append(...children.filter(Boolean));
        } else {
            element.append(children);
        }
    }

    return element;
}

function getDeviceDetails(item) {
    const deviceDetails = [];
    for (const code of item.supported) {
        for (const support of item.attr.avail) {
            const [deviceCode, firmwareCode] = support.split(':');
            if (deviceCode === code) {
                const deviceName = devices[deviceCode].name;
                const firmwareName = firmwareMap[firmwareCode];
                deviceDetails.push(deviceName + ': ' + firmwareName);
            }
        }
    }
    return deviceDetails;
}

function getImageUrl(item) {
    const name = item.name.replace('.zip', '');
    const imageName = item.attr.image.screenshot;
    if (imageName !== null) {
        if (item.source.repo == 'main') {
            return `https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/${encodeURIComponent(name)}/${encodeURIComponent(imageName)}`;
        } else if (item.source.repo == 'multiverse') {
            return `https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-MV-New/main/ports/${encodeURIComponent(name)}/${encodeURIComponent(imageName)}`;
        }
    }

    return 'https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/no.image.png';
}

function getCardUrl(name, deviceDetails) {
    return `detail.html?name=${encodeURIComponent(name)}` + (deviceDetails ? `&devices=${encodeURIComponent(deviceDetails.join(","))}` : "");
}

function getPorterUrl(porter) {
    return `profile.html?porter=${encodeURIComponent(porter)}`;
}

// Function to create a card element for each JSON object
// https://discord.gg/JxYBp9HTAY
function createCard(item) {
    const deviceDetails = getDeviceDetails(item);
    const cardUrl = getCardUrl(item.name.replace('.zip', ''), deviceDetails);
    const imageUrl = getImageUrl(item);
    const desc = item.attr.desc_md || item.attr.desc;

    return createElement('div', { className: 'col' }, [
        createElement('div', { className: 'card h-100 shadow-sm' }, [
            createElement('div', { className: 'card-body' }, [
                createElement('a', { href: cardUrl }, [
                    createElement('img', {
                        src: imageUrl,
                        className: 'bd-placeholder-img card-img-top',
                        loading: 'lazy',
                    }),
                ]),
                createElement('a', { href: cardUrl, className: 'text-decoration-none' }, [
                    createElement('h5', {
                        className: 'card-title link-body-emphasis',
                        style: 'padding-top: 20px',
                    }, item.attr.title),
                ]),
                createElement('p', {
                    className: 'card-text',
                    style: 'padding-top: 10px',
                    innerHTML: new showdown.Converter().makeHtml(desc),
                }),
                createElement('p', null, [
                    item.attr.rtr && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Ready to Run'),
                    ' ',
                    item.attr.exp && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Experimental'),
                    ' ',
                    item.source.repo == "multiverse" && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Multiverse'),
                ]),
                createElement('p', {
                    className: 'card-text',
                    style: 'padding-top: 10px',
                }, [
                    'Porter: ',
                    ...item.attr.porter.reduce((children, porter, i) => {
                        if (i > 0) {
                            children.push(', ');
                        }
                        children.push(createElement('a', { href: getPorterUrl(porter) }, porter));
                        return children;
                    }, []),
                ]),
                deviceDetails.length > 0 && createElement('p', {
                    className: 'card-text',
                    style: 'padding-top: 10px',
                }, [
                    'Supported Devices: ',
                    ...deviceDetails.map((deviceDetail) => createElement('div', null, deviceDetail)),
                ]),
                createElement('p', {
                    className: 'card-text text-body-secondary',
                    style: 'padding-top: 10px'
                }, 'Added: ' + item.source.date_added),
                createElement('div', { className: 'd-flex justify-content-between align-items-center' }, [
                    createElement('small', { className: 'text-body-secondary' }, [
                        "Downloads: " + (countsData.ports[item.name] ? countsData.ports[item.name] : "0"),
                    ]),
                    createElement('div', { className: 'btn-group' }, [
                        createElement('a', { href: cardUrl }, [
                            createElement('button', { type: 'button', className: 'btn btn-sm btn-outline-primary' }, 'Details'),
                        ]),
                    ]),
                ]),
            ]),
        ]),
    ]);
}

// Function to iterate over the JSON data and display cards
function displayCards(data) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Clear previous cards
    for (const item of data) {
        const card = createCard(item);
        cardsContainer.appendChild(card);
    };
}

function stringSimilarity(str1, str2, gramSize = 2) {
    function getNGrams(s, len) {
        s = ' '.repeat(len - 1) + s.toLowerCase() + ' '.repeat(len - 1);
        let v = new Array(s.length - len + 1);
        for (let i = 0; i < v.length; i++) {
            v[i] = s.slice(i, i + len);
        }
        return v;
    }
    if (!(str1 === null || str1 === void 0 ? void 0 : str1.length) || !(str2 === null || str2 === void 0 ? void 0 : str2.length)) {
        return 0.0;
    }
    let s1 = str1.length < str2.length ? str1 : str2;
    let s2 = str1.length < str2.length ? str2 : str1;
    let pairs1 = getNGrams(s1, gramSize);
    let pairs2 = getNGrams(s2, gramSize);
    let set = new Set(pairs1);
    let total = pairs2.length;
    let hits = 0;
    for (let item of pairs2) {
        if (set.delete(item)) {
            hits++;
        }
    }
    return hits / total;
}

// Function to load a saved filter state from the session storage
function loadFilterState() {
    const savedFilterState = sessionStorage.getItem('filterState');

    if (savedFilterState) {
        const filterState = JSON.parse(savedFilterState);
        document.getElementById('ready-to-run').checked = filterState.readyToRun;
        document.getElementById('files-needed').checked = filterState.filesNeeded;
        document.getElementById('sortNewest').checked = filterState.Newest;
        document.getElementById('sortDownloaded').checked = filterState.Downloaded;
        document.getElementById('sortAZ').checked = filterState.AZ;
        document.getElementById('search').value = filterState.searchQuery;
        for (const device in filterState.devices) {
            document.getElementById(device).checked = filterState.devices[device];
        }
        for (const genre in filterState.genres) {
            document.getElementById(genre).checked = filterState.genres[genre];
        }
    }
}

// Function to filter the cards based on the search query
function filterCards() {
    const searchQuery = document.getElementById('search').value.trim().toLowerCase();
    const readyToRun = document.getElementById('ready-to-run').checked;
    const filesNeeded = document.getElementById('files-needed').checked;
    const Newest = document.getElementById('sortNewest').checked;
    const Downloaded = document.getElementById('sortDownloaded').checked;
    const AZ = document.getElementById('sortAZ').checked;

    const filterState = {
        searchQuery: searchQuery ? searchQuery : "",
        readyToRun,
        filesNeeded,
        Newest,
        Downloaded,
        AZ,
        devices: {},
        genres: {}
    };

    var filteredData = []
    var selected = [];
    var selectedGenres = [];
    for (device in devices){
        const deviceElement = document.getElementById(device);
        if (deviceElement.checked){
            selected.push(device)
        }
        filterState.devices[device] = deviceElement.checked;
    }

    for (var i = 0; i < gameGenres.length; i++) {
        const genreElement = document.getElementById(gameGenres[i]);
        if (genreElement.checked){
            selectedGenres.push(gameGenres[i])
        }
        filterState.genres[gameGenres[i]] = genreElement.checked;
    }

    sessionStorage.setItem('filterState', JSON.stringify(filterState));

    if (searchQuery.length > 0) {

        const options = { includeScore: true, isCaseSensitive: false, shouldSort: true, keys: ['attr.title'] };
        const fuse = new Fuse(jsonData, options);
        const result = fuse.search(document.getElementById('search').value.trim());

        if (result.length > 0) {
            result.forEach(element => {
                if (!filteredData.includes(element.item)) {
                    element.item["supported"] = [];
                    if (readyToRun || filesNeeded) {
                        if (readyToRun) {
                            if (element.item.attr.rtr) {
                                if (element.item.attr.avail.length < 1) {
                                    if (!filteredData.includes(element.item)) {
                                        if (!element.item["supported"].includes("ALL")) {
                                            element.item["supported"].push("ALL");
                                        }
                                        filteredData.push(element.item);
                                    }
                                }
                                for (item in element.item.attr.avail) {
                                    var device = element.item.attr.avail[item].split(":")[0];
                                    var cfw = element.item.attr.avail[item].split(":")[1]
                                    if (selected.includes(device)) {
                                        if (!element.item["supported"].includes(device)) {
                                            element.item["supported"].push(device);
                                        }
                                        if (!filteredData.includes(element.item)) {
                                            filteredData.push(element.item);
                                        }
                                    }
                                  
                                        if (device == "ALL") {
                                            if (!element.item["supported"].includes(device)) {
                                                element.item["supported"].push(device);
                                            }
                                            if (!filteredData.includes(element.item)) {
                                                filteredData.push(element.item);
                                            }
                                        }

                                    
                                }
                                if (selected.length < 1) {
                                    if (!filteredData.includes(element.item)) {
                                        filteredData.push(element.item);
                                    }
                                }
                            }
                        } if (filesNeeded) {
                            if (!element.item.attr.rtr) {
                                if (element.item.attr.avail.length < 1) {
                                    if (!filteredData.includes(element.item)) {
                                        if (!element.item["supported"].includes("ALL")) {
                                            element.item["supported"].push("ALL");
                                        }
                                        filteredData.push(element.item);
                                    }
                                }
                                for (item in element.item.attr.avail) {
                                    var device = element.item.attr.avail[item].split(":")[0];
                                    var cfw = element.item.attr.avail[item].split(":")[1]
                                    if (selected.includes(device)) {
                                        if (!element.item["supported"].includes(device)) {
                                            element.item["supported"].push(device);
                                        }
                                        if (!filteredData.includes(element.item)) {
                                            filteredData.push(element.item);
                                        }
                                    }
                                  
                                        if (device == "ALL") {
                                            if (!element.item["supported"].includes(device)) {
                                                element.item["supported"].push(device);
                                            }
                                            if (!filteredData.includes(element.item)) {
                                                filteredData.push(element.item);
                                            }
                                        }

                                    
                                }
                                if (selected.length < 1) {
                                    if (!filteredData.includes(element.item)) {
                                        filteredData.push(element.item);
                                    }
                                }
                            }
                        }
                    }
                    else {
                         // don't show any ports if ready to run or files need are not checked
                    }
                }
            });
        }
    }
    else {
        for (var key of Object.keys(jsonData)) {
            jsonData[key]["supported"] = [];
            if (readyToRun || filesNeeded) {
                if (readyToRun) {
                    if (jsonData[key].attr.rtr) {
                        if (jsonData[key].attr.avail.length < 1) {
                            if (!filteredData.includes(jsonData[key])) {
                                if (!jsonData[key]["supported"].includes("ALL")) {
                                    jsonData[key]["supported"].push("ALL");
                                }
                                filteredData.push(jsonData[key]);
                            }
                        }
                        for (item in jsonData[key].attr.avail) {
                            var device = jsonData[key].attr.avail[item].split(":")[0];
                            var cfw = jsonData[key].attr.avail[item].split(":")[1]
                            if (selected.includes(device)) {
                                if (!jsonData[key]["supported"].includes(device)) {
                                    jsonData[key]["supported"].push(device);
                                }
                                if (!filteredData.includes(jsonData[key])) {
                                    filteredData.push(jsonData[key]);
                                }
                            }
                          
                            if (device == "ALL") {
                                if (!jsonData[key]["supported"].includes(device)) {
                                    jsonData[key]["supported"].push(device);
                                }
                                if (!filteredData.includes(jsonData[key])) {
                                    filteredData.push(jsonData[key]);
                                }
                            }

                            
                        }
                        if (selected.length < 1) {
                            if (!filteredData.includes(jsonData[key])) {
                                filteredData.push(jsonData[key]);
                            }
                        }
                    }
                } if (filesNeeded) {
                    if (!jsonData[key].attr.rtr) {
                        if (jsonData[key].attr.avail.length < 1) {
                            if (!filteredData.includes(jsonData[key])) {
                                if (!jsonData[key]["supported"].includes("ALL")) {
                                    jsonData[key]["supported"].push("ALL");
                                }
                                filteredData.push(jsonData[key]);
                            }
                        }
                        for (item in jsonData[key].attr.avail) {
                            var device = jsonData[key].attr.avail[item].split(":")[0];
                            var cfw = jsonData[key].attr.avail[item].split(":")[1]
                            if (selected.includes(device)) {
                                if (!jsonData[key]["supported"].includes(device)) {
                                    jsonData[key]["supported"].push(device);
                                }
                                if (!filteredData.includes(jsonData[key])) {
                                    filteredData.push(jsonData[key]);
                                }
                            }
                          
                                if (device == "ALL") {
                                    if (!jsonData[key]["supported"].includes(device)) {
                                        jsonData[key]["supported"].push(device);
                                    }
                                    if (!filteredData.includes(jsonData[key])) {
                                        filteredData.push(jsonData[key]);
                                    }
                                }

                            
                        }
                        if (selected.length < 1) {
                            if (!filteredData.includes(jsonData[key])) {
                                filteredData.push(jsonData[key]);
                            }
                        }
                    }
                }
                
                if (selectedGenres.length > 0) {
                    var genres = jsonData[key].attr.genres;
                    var match = false;
                    for (var i = 0; i < genres.length; i++) {
                        if (selectedGenres.includes(genres[i])) {
                            match = true;
                        }
                    }
                    if (match) {
                        if (!filteredData.includes(jsonData[key])) {
                            filteredData.push(jsonData[key]);
                        }
                    } else {
                        //remove the port if it doesn't match the genre
                        if (filteredData.includes(jsonData[key])) {
                            filteredData.splice(filteredData.indexOf(jsonData[key]), 1);
                        }
                    }
                }
            }
            else {
                // don't show any ports if ready to run or files need are not checked
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
    }

    var availablePorts = document.getElementById("port-count")
    availablePorts.textContent = filteredData.length + " Ports Available"
    displayCards(filteredData);
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

function populateDeviceDropdown() {
    for (var key of Object.keys(devices)) {
        var manufacturerDropdown = document.getElementById(devices[key]["manufacturer"]);
        const li = document.createElement('li');
        const a = document.createElement('a');
        //a.textContent = devices[key]["name"]
        const label = document.createElement('label');
        label.setAttribute("for", key);
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

function populateGenreDropdown() {
    var gamesDropdown = document.getElementById("dropdown-buttons");

    var genresSet = new Set();

    Object.values(jsonData).forEach(game => {
        game.attr.genres.forEach(genre => {
            genresSet.add(genre);
        });
    });

    genresSet.forEach(genre => {
        gameGenres.push(genre);
    });

    const div = document.createElement('div');
    div.setAttribute("class", "btn-group flex-wrap");
    div.setAttribute("role", "group");

    const button = document.createElement('button');
    button.setAttribute("class", "btn btn-outline-primary dropdown-toggle");
    button.setAttribute("data-bs-toggle", "dropdown");
    button.setAttribute("aria-expanded", "false");
    button.textContent = "Genres";

    const ul = document.createElement('ul');
    ul.setAttribute("class", "dropdown-menu");

    genresSet.forEach(genre => {
        const li = document.createElement('li');
        li.setAttribute("class", "dropdown-item");

        const input = document.createElement('input');
        input.type = "checkbox";
        input.id = genre;
        input.name = genre;
        input.value = genre;
        input.setAttribute("onchange", "filterCards()");

        const label = document.createElement('label');
        label.htmlFor = genre;
        label.textContent = genre;
        label.style.marginLeft = "5px";

        li.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);
    });

    div.appendChild(button);
    div.appendChild(ul);
    gamesDropdown.appendChild(div);
}

async function getDeviceList() {
    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/devices.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        devices = await response.json();
        for (var key of Object.keys(devices)) {
            if (!manufacturers.includes(devices[key]["manufacturer"])) {
                manufacturers.push(devices[key]["manufacturer"]);
            }
        }
        manufacturers.sort();

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
        var array = [];
        for (port in jsonData.ports) {
            array.push(jsonData.ports[port]);
        }
        jsonData = array;       
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/port_stats.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        countsData = await response.json();
        for (port in jsonData) {
            jsonData[port]["download_count"] = countsData["ports"][jsonData[port].name];
        }

    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    populateGenreDropdown();
    loadFilterState();
    filterCards();

}
window.onload = function () {
    getDeviceList();
    fetchDataAndDisplayCards();
};

