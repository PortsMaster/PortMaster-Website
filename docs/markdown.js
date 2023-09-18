var markdown = "";

function loadMarkdown() {
    var mdElement = document.getElementById("markdown");
    var converter = new showdown.Converter();
    mdElement.innerHTML = marked.parse(markdown);
    anchors.options.visible = 'always';
    anchors.add();
}


async function getMarkdown(file) {


    try {
        var response = await fetch('https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/content/markdown/' + file); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        markdown = await response.text();
        loadMarkdown();

    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }



}

function start(file) {
    getMarkdown(file);
}

