var jsonData = null;
var countsData = null;
var portersData = null;
// Function to create a card element for each JSON object

// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

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
            source = ("https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/" +  data.name.replace(".zip","/") + data.attr.image.screenshot);
        } else if (data.source.repo == "multiverse") {
            source = ("https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-MV-New/main/ports/" + data.name.replace(".zip","/") + data.attr.image.screenshot);
        } 
    }

    image.src = source;
    image.setAttribute("class", "bd-placeholder-img card-img-top");
    image.setAttribute("loading", "lazy");

    image.addEventListener('click', () => {
        handleCardClick(data.name.replace(".zip",""));
    });

    const div3 = document.createElement('div');
    div3.setAttribute("class", "card-body");

    const title = document.createElement('h5');
    title.setAttribute("class", "card-title link-body-emphasis");
    title.setAttribute("style", "padding-top: 20px")
    title.textContent = data.attr.title;

    title.addEventListener('click', () => {
        handleCardClick(data.name.replace(".zip",""));
    });

    const paragraph = document.createElement('p');
    paragraph.setAttribute("class", "card-text");
    paragraph.setAttribute("style", "padding-top: 10px")

    var converter = new showdown.Converter();

    var desc = data.attr.desc;
    if (data.attr.desc_md){
        desc = data.attr.desc_md;
    }
    paragraph.innerHTML = converter.makeHtml(desc);

    const porter = document.createElement('p');
    porter.setAttribute("class", "card-text");
    porter.setAttribute("style", "padding-top: 10px")
    var porters = data.attr.porter;
    var porterHtml = "Porters: ";
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
    dateUpdated.textContent = "Updated: " + data.source.date_updated;


    const div4 = document.createElement('div');
    div4.setAttribute("class", "d-flex justify-content-between align-items-center");

    const div5 = document.createElement('div');
    div5.setAttribute("class", "btn-group");

    const button = document.createElement('button');
    button.setAttribute("type", "button");
    //button.textContent = "Download";
    button.textContent = "Details";
    button.setAttribute("class","btn btn-sm btn-outline-primary");
    //button.setAttribute("onclick", "window.location.href='" + data.source.url + "';");
    button.setAttribute("onclick","window.location.href='detail.html?name=" + data.name.replace(".zip","") + "';");


    div5.appendChild(button);



    const small = document.createElement('small');
    small.setAttribute("class", "text-body-secondary");
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

    const searchQuery = getUrlParameter('porter');
    var filteredData = {}
    for (var key of Object.keys(jsonData)) {
        if (jsonData[key].attr.porter.includes(searchQuery)) {
            filteredData[key] = jsonData[key];
        }
    };

    var availablePorts = document.getElementById("port-count");
    availablePorts.textContent = Object.keys(filteredData).length + " Ports Available";

    displayCards(filteredData);
    const nameElement = document.getElementById("name");
    const descriptionElement = document.getElementById("bio");
    const socialElement = document.getElementById("social");
    const webpageElement = document.getElementById("webpage");
    const supportElement = document.getElementById("support");
    const coverElement = document.getElementById("avatar");

    nameElement.textContent = portersData[searchQuery].name;
    descriptionElement.textContent = portersData[searchQuery].bio ? portersData[searchQuery].bio : "";
    socialElement.setAttribute("href",portersData[searchQuery].social)
    webpageElement.setAttribute("href",portersData[searchQuery].webpage)
    supportElement.setAttribute("href",portersData[searchQuery].support)
    coverElement.src = (portersData[searchQuery].image ? portersData[searchQuery].image : "https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/default.jpg" );
    coverElement.setAttribute("width", "25%");
    coverElement.setAttribute("height", "25%");
}

// Function to handle the card title click and redirect to the detail page
function handleCardClick(name) {
    window.location.href = `detail.html?name=${encodeURIComponent(name)}`;
}

// Fetch JSON data from the URL and then display the cards
async function fetchDataAndDisplayCards() {

    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/port_stats.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        countsData = await response.json();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    try {
        const response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/porters.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        portersData = await response.json();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    try {
        const response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/ports.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        jsonData = await response.json();
        jsonData = jsonData.ports



        filterCards();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

// Call the initial fetchDataAndDisplayCards function when the page is loaded
window.onload = function () {
    fetchDataAndDisplayCards();
    // document.getElementById('search-bar').addEventListener('input', filterCards);
};

