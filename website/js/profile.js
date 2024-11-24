window.addEventListener('DOMContentLoaded', async function() {
    const porterName = new URLSearchParams(window.location.search).get('porter');

    const porters = await fetchPorters();
    const porter = porters[porterName];
    displayPorter(porter);

    const ports = await fetchPorts();
    displayPorts(ports.filter(port => port.attr.porter.includes(porter.name)));
});

function displayPorter(porter) {
    document.getElementById('name').textContent = porter.name;
    document.getElementById('bio').textContent = porter.bio || '';

    document.getElementById('social').setAttribute('href', porter.social);
    document.getElementById('webpage').setAttribute('href', porter.webpage);
    document.getElementById('support').setAttribute('href', porter.support);
    
    const avatar = document.getElementById('avatar');
    avatar.src = porter.image || 'https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/default.jpg';
    avatar.setAttribute('width', '25%');
    avatar.setAttribute('height', '25%');
}

function displayPorts(ports) {
    document.getElementById('port-count').textContent = `${Object.keys(ports).length} Ports Available`;
    batchReplaceChildren(200, document.getElementById('cards-container'), ports.map(createCard));
}
