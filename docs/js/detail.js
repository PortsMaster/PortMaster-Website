// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function displayCardDetails(data) {

    data.attr.title ? document.getElementById('title').textContent = data.attr.title : document.getElementsByClassName('title').hidden = true;


    imageElement = document.getElementById("screenshot")

    var source = "https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/no.image.png";

    if (data.attr.image.screenshot !== null) {
        if (data.source.repo == "main") {
            /* Hopefully this works. */
            source = ("https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/" + 
                data.attr.image.screenshot.replace(".screenshot", "/screenshot"));
        } else if (data.source.repo == "multiverse") {
            source = ("https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-Multiverse/main/images/" +
                data.attr.image.screenshot);
        } 
    }

    imageElement.src = source;


    
    //data.attr.desc ? document.getEleme('desc').textContent = data.attr.desc : document.getElementsByClassName('desc').hidden = true;
    descriptionElement = document.getElementById('desc');
    var converter = new showdown.Converter();
    descriptionElement.innerHTML = converter.makeHtml(data.attr.desc);
    data.attr.porter ? document.getElementById('porter').textContent = data.attr.porter : document.getElementsByClassName('porter').hidden = true;

    instructionsElement = document.getElementById('inst');
    var converter = new showdown.Converter();
    instructionsElement.innerHTML = converter.makeHtml(data.attr.inst);


    const downloadCountElement = document.getElementById("download_count");
    downloadCountElement.textContent = data.download_count;

    const lastUpdatedElement = document.getElementById("last_updated");
    lastUpdatedElement.textContent = data.source.date_updated;

    var taggedMisc = "";
    if (data.attr.rtr){
        taggedMisc += '<span class="misc-item badge bg-secondary">Ready to Run</span><br>';
    }

    if (data.attr.exp){
        taggedMisc += '<span class="misc-item badge bg-secondary">Experimental</span><br>';
    }

    if (data.source.repo == "multiverse"){
        taggedMisc += '<span class="misc-item badge bg-secondary">Multiverse</span><br>';
    }

    const miscElement = document.getElementById("misc");
    miscElement.innerHTML = taggedMisc;

    var taggedGenres = "";
    data.attr.genres.forEach((genre) => {
        taggedGenres += '<span class="genre-item badge bg-secondary">' + genre + '</span>' + '<br>';
    });
    taggedGenres ? document.getElementById("genres").innerHTML = taggedGenres : true;

    var taggedRequirements = "";
    data.attr.reqs.forEach((req) => {
        taggedRequirements += '<span class="requirement-item badge bg-secondary">' + req + '</span>' + '<br>';
    });
    taggedRequirements ? document.getElementById("requirements").innerHTML = taggedRequirements : true;

    var porters = data.attr.porter;
    var porterHtml = "";
    porters.forEach((porter) => {
        porterHtml += '<a href="profile.html?porter=' + porter + '">' + porter + '</a>';
        if (porters.length > 1) {
            porterHtml += "<br>";
        }
    });
    data.attr.porter ? document.getElementById('porter').innerHTML = porterHtml : document.getElementsByClassName('porter').hidden = true;


    const downloadElement = document.getElementById("download");
    downloadElement.setAttribute("onclick", "window.location.href='" + data.source.url + "';");

    async function getmarkdown() {
        try {
            var response = null;
            var repo = "https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/";
            if (data.source.repo == "multiverse") {
                repo = "https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-Multiverse/main/markdown/";
                response = await fetch(repo + data.name.replace("zip", "md"));
            }
            else
            {
                response = await fetch(repo + data.name.replace(".zip", "") + "/README.md");
            }
            
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            markdown = await response.text();
            const markdownElement = document.getElementById("markdown");
            markdownElement.innerHTML = CmarkGFM.convert(markdown.replaceAll("<br/>", "")).replaceAll("<table>", '<table class="table table-bordered">').replaceAll('<h2>', '<h2 style="margin-top: 1em;margin-bottom: 1em;">');
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    }
    getmarkdown();
}


// Fetch JSON data from the URL and display card details
async function fetchDataAndDisplayDetails() {
    try {
        const name = getUrlParameter('name');



        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/ports.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        var jsonData = await response.json();
        jsonData = jsonData.ports;
        var card = null;

        for (var key of Object.keys(jsonData)) {
            if (jsonData[key].name.replace(".zip", "") === name) {
                card = jsonData[key];
            }
        };

        try {
            var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/port_stats.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            countsData = await response.json();
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }

        card["download_count"] = (countsData["ports"][card.name] ? countsData["ports"][card.name] : "0");

        if (card) {
            displayCardDetails(card);
        } else {
            const detailsContainer = document.getElementById('details-container');
            const notFoundElement = document.createElement('p');
            notFoundElement.textContent = 'port not found.';
            detailsContainer.appendChild(notFoundElement);
        }
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

// Call the initial fetchDataAndDisplayCards function when the page is loaded
window.onload = function () {
    fetchDataAndDisplayDetails();
};
