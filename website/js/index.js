var articles = [];
var jsonData = [];
var articleIndex = 0;

function populateArticles() {

    const articleElement = document.createElement('article');
    articleElement.setAttribute("class", "blog-post");

    const titleElement = document.createElement('h2');
    titleElement.setAttribute("class", "display-5 mb-1");
    titleElement.textContent = articles[articleIndex].title;

    const authorElement = document.createElement('p');
    authorElement.setAttribute("class", "blog-post-meta");
    var date = new Date(articles[articleIndex].date);
    authorElement.innerHTML = date.toLocaleString('default', { month: 'long' }) + " " + date.getUTCDate() + ", " + date.getFullYear() + " by <a href=https://portmaster.games/profile.html?porter=" + articles[articleIndex].author + ">" + articles[articleIndex].author + "</a>";

    const contentElement = document.createElement('p');
    var converter = new showdown.Converter();
    contentElement.innerHTML = converter.makeHtml(articles[articleIndex].content);

    articleElement.appendChild(titleElement);
    articleElement.appendChild(authorElement);
    articleElement.appendChild(contentElement);

    var articlesElement = document.getElementById("articles-section");
    articlesElement.innerHTML = "";
    articlesElement.appendChild(articleElement);



    if (articleIndex + 1 < articles.length) {
        document.getElementById("olderButton").disabled = false;

    }
    else {
        document.getElementById("olderButton").disabled = true;
    }


    if (articleIndex < 1) {
        document.getElementById("newerButton").disabled = true;

    }
    else {
        document.getElementById("newerButton").disabled = false;
    }

}

function updateArticles(value) {
    if (articleIndex + value > -1 && articleIndex + value < articles.length) {
        articleIndex += value;
        populateArticles();
        document.getElementById("articles-sectrion").scrollIntoView()
    }




}

function handlePortClick(name) {
    window.location.href = `detail.html?name=${encodeURIComponent(name)}`;
}

function createRecent(item) {
    const list = document.getElementById("recents");
    const listItem = document.createElement('li');

    const main = document.createElement('a');
    main.setAttribute("class", "d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top");

    var image = document.createElement("img");
    var repo = "https://raw.githubusercontent.com/christianhaitian/PortMaster/main/images/";
    if (item.source.repo == "multiverse"){
        repo = "https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-Multiverse/main/images/";
    } 
    var source = "https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/no.image.png";
    if (item.attr.image.screenshot !== null) {
        source =   repo +  item.attr.image.screenshot;
    }
    image.src = source;
    image.setAttribute("width", "40%%");
    image.setAttribute("height", "40%");
    image.setAttribute("class", "bd-placeholder-img");

    image.addEventListener('click', () => {
        handlePortClick(item.name.replace(".zip", ""));
    });


    const divElement = document.createElement('div');
    divElement.setAttribute("class", "col-lg-8");

    const titleElement = document.createElement('h6');
    titleElement.setAttribute("class", "mb-0 link-body-emphasis");
    titleElement.textContent = item.attr.title;

    titleElement.addEventListener('click', () => {
        handlePortClick(item.name.replace(".zip", ""));
    });

    const dateElement = document.createElement('small');
    dateElement.setAttribute("class", "text-body-secondary");
    dateElement.textContent = item.date_updated;

    divElement.appendChild(titleElement);
    divElement.appendChild(dateElement);
    main.appendChild(image);
    main.appendChild(divElement);

    listItem.appendChild(main);
    list.appendChild(listItem);
}

function populateRecentPorts() {
    jsonData.sort((a,b)=> Date.parse(a.source.date_added) > Date.parse(b.source.date_added) ? -1 :  (Date.parse(a.source.date_added) < Date.parse(b.source.date_added) ? 1 :0))
    for (var key of Object.keys(jsonData.slice(0, 5))) {

        createRecent(jsonData[key]);
    };


}


async function getPageContent() {

    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/ports.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        var ports = await response.json();
        ports = ports.ports;
        for (var key of Object.keys(ports)) {
            jsonData.push(ports[key])
        }
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/news.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        articles = await response.json();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    articles.sort((a,b)=> Date.parse(a.date) > Date.parse(b.date) ? -1 :  (Date.parse(a.date) < Date.parse(b.date) ? 1 :0))
      
    populateArticles();
    populateRecentPorts();

}



window.onload = function () {
    getPageContent();
};
