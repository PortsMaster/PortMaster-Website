var jsonData = null;
var countsData = null;
var AZ = true;
var Newest = false;
var Downloaded = false;


function sortAZ(){
    AZ = true;
    Newest = false;
    Downloaded = false;
    const newestCheck = document.getElementById('sortNewest');
    const downloadedCheck = document.getElementById('sortDownloaded');
    downloadedCheck.checked = false;
    newestCheck.checked = false;
    filterCards();
}

function sortNewest(){
    AZ = false;
    Downloaded = false;
    Newest = true;
    const azCheck = document.getElementById('sortAZ');
    const downloadedCheck = document.getElementById('sortDownloaded');
    azCheck.checked = false;
    downloadedCheck.checked = false;
    filterCards();
}

function sortDownloaded(){
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
    div1.setAttribute("class","col");

    const div2 = document.createElement('div');
    div2.setAttribute("class","card shadow-sm");

    const image = document.createElement("img");
    var source = "https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/no.image.png";
    if (data.attr.image.screenshot !== null) {
        source =   "https://raw.githubusercontent.com/christianhaitian/PortMaster/main/images/" +  data.attr.image.screenshot;
    }
    image.src =  source;
    image.setAttribute("class","bd-placeholder-img card-img-top");
    image.setAttribute("loading", "lazy");
    
    image.addEventListener('click', () => {
        handleCardClick(data.name.replace(".zip",""));
    });

    const div3 = document.createElement('div');
    div3.setAttribute("class","card-body");

    const title = document.createElement('h5');
    title.setAttribute("class","card-title link-body-emphasis");
    title.setAttribute("style","padding-top: 20px")
    title.textContent = data.attr.title;

    title.addEventListener('click', () => {
        handleCardClick(data.name.replace(".zip",""));
    });

    const paragraph = document.createElement('p');
    paragraph.setAttribute("class","card-text");
    paragraph.setAttribute("style","padding-top: 10px")

    var converter = new showdown.Converter();

    paragraph.innerHTML = converter.makeHtml(data.attr.desc);

    const porter = document.createElement('p');
    porter.setAttribute("class","card-text");
    porter.setAttribute("style","padding-top: 10px")
    var porters = data.attr.porter;
    var porterHtml = "Porter: ";
    porters.forEach((porter) => {
        porterHtml += '<a href="profile.html?porter=' + porter +'">' + porter + '</a>';
        if(porters.length > 1) {
            porterHtml += " ";
        }
    });
    porter.innerHTML = porterHtml;

    const dateUpdated = document.createElement('p');
    dateUpdated.setAttribute("class","card-text text-body-secondary");
    dateUpdated.setAttribute("style","padding-top: 10px")
    dateUpdated.textContent = "Updated: " + data.status.date_updated;


    const div4 = document.createElement('div');
    div4.setAttribute("class","d-flex justify-content-between align-items-center");

    const div5 = document.createElement('div');
    div5.setAttribute("class","btn-group");

    const button = document.createElement('button');
    button.setAttribute("type","button");
    button.textContent = "Download"
    button.setAttribute("class","btn btn-sm btn-outline-primary");
    button.setAttribute("onclick","window.location.href='"+ data.status.download_url+ "';");

    div5.appendChild(button);



    const small = document.createElement('small');
    small.setAttribute("class","text-body-secondary");
    small.textContent = "Downloads: " + (countsData["ports"][data.name] ? countsData["ports"][data.name] : "0");


    div4.appendChild(small);
    div4.appendChild(div5);
    

    div3.appendChild(image);
    div3.appendChild(title);
    div3.appendChild(paragraph);
    div3.appendChild(porter);
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
    var filteredData = []
    var queries = searchQuery.split(" ");
    for (var key of Object.keys(jsonData)) {
        queries.forEach(element => {
            if (jsonData[key].attr.title.toLowerCase().includes(element) || jsonData[key].attr.genres.join().toLowerCase().includes(element) || jsonData[key].attr.porter.join().toLowerCase().includes(element)) {

                if (readyToRun){
                    if (jsonData[key].attr.rtr){
                        filteredData.push(jsonData[key]);
                    }
                }
                else {
                    filteredData.push(jsonData[key]);
                }                
            }
        });

    };
    if (Newest){
        filteredData.sort(function(a, b) {
            if (Date.parse(a.status.date_updated) > Date.parse(b.status.date_updated))
            return -1
          });
    }

    if (AZ){
        filteredData.sort();
    }

    if (Downloaded){
        filteredData.sort(function(a, b) {
            if (a.download_count > b.download_count)
            return -1
          });
    }

    displayCards(filteredData);
}

// Function to handle the card title click and redirect to the detail page
function handleCardClick(name) {
    window.location.href = `detail.html?name=${encodeURIComponent(name)}`;
}

// Fetch JSON data from the URL and then display the cards
async function fetchDataAndDisplayCards() {

    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/ports.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
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
    fetchDataAndDisplayCards();
    // document.getElementById('search-bar').addEventListener('input', filterCards);
};

