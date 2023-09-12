// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function displayCardDetails(data) {

    data.attr.title ? document.getElementById('title').textContent = data.attr.title : document.getElementsByClassName('title').hidden = true;


    imageElement = document.getElementById("screenshot")
    imageElement.src = (data.attr.media.screenshot ? "https://raw.githubusercontent.com/christianhaitian/PortMaster/main/images/" + data.attr.media.screenshot : "https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/no.image.png");


    //data.attr.desc ? document.getEleme('desc').textContent = data.attr.desc : document.getElementsByClassName('desc').hidden = true;
    descriptionElement = document.getElementById('desc');
    var converter = new showdown.Converter();
    descriptionElement.innerHTML = converter.makeHtml(data.attr.desc);
    data.attr.porter ? document.getElementById('porter').textContent = data.attr.porter : document.getElementsByClassName('porter').hidden = true;

    const downloadCountElement = document.getElementById("download_count");
    downloadCountElement.textContent = data.download_count;

    const lastUpdatedElement = document.getElementById("last_updated");
    lastUpdatedElement.textContent = data.date_updated;


    var taggedGenres = "";
    data.attr.genres.forEach((genre) => {
        taggedGenres += '<span class="genre-item badge bg-secondary">' + genre + '</span>' + '<br>';
    });
    taggedGenres ? document.getElementById("genres").innerHTML = taggedGenres : true;

    var porters = data.attr.porter;
    var porterHtml = "";
    porters.forEach((porter) => {
        porterHtml += '<a href="profile.html?porter=' + porter +'">' + porter + '</a>';
        if(porters.length > 1) {
            porterHtml += "<br>";
        }
    });
    data.attr.porter ? document.getElementById('porter').innerHTML = porterHtml: document.getElementsByClassName('porter').hidden = true;


    const downloadElement = document.getElementById("download");
    downloadElement.setAttribute("onclick", "window.location.href='" + data.download_url + "';");

    const markdownElement = document.getElementById("markdown");
    markdownElement.setAttribute("src", "https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/markdown/" + data.name.toLowerCase().replace("zip", "md"));


}


// Fetch JSON data from the URL and display card details
async function fetchDataAndDisplayDetails() {
    try {
        const name = getUrlParameter('name');



        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/ports.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        var jsonData = await response.json();
        jsonData = jsonData.ports;
        var card = null;

        for (var key of Object.keys(jsonData)) {
            if (jsonData[key].name === name) {
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