

function populateAssets(assets) {
    var assetsElement = document.getElementById("assets");
    assets.forEach(function (asset) {
            const assetLink = document.createElement('a');
            assetLink.setAttribute("class","list-group-item list-group-item-action")
            assetLink.textContent = asset.name;
            assetLink.href = asset.url;
            assetsElement.appendChild(assetLink);
    });
}

async function getReleaseAssets() {

    try {
        var response = await fetch('https://api.github.com/repos/PortsMaster/PortMaster-Runtime/releases/latest'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        jsonData = await response.json();
        populateAssets(jsonData.assets);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

 

}


window.onload = function () {
    getReleaseAssets();
};
