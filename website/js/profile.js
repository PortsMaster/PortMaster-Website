window.addEventListener('DOMContentLoaded', async function() {
    const porterName = new URLSearchParams(window.location.search).get('porter');

    fetchPorters().then(porters => {
        displayPorter(porters[porterName]);
    });

    fetchPorts().then(ports => {
        displayPorts(ports.filter(port => port.attr.porter.includes(porterName)));
    });
});

function displayPorter(porter) {
    document.getElementById('name').textContent = porter.name;
    document.getElementById('bio').textContent = porter.bio || '';

    document.getElementById('social').href = porter.social;
    document.getElementById('webpage').href = porter.webpage;
    document.getElementById('support').href = porter.support;
    
    const avatar = document.getElementById('avatar');
    avatar.src = porter.image || 'https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/default.jpg';
    avatar.setAttribute('width', '25%');
    avatar.setAttribute('height', '25%');
}

function displayPorts(ports) {
    document.getElementById('port-count').textContent = `${ports.length} Ports Available`;
    batchReplaceChildren(200, document.getElementById('cards-container'), ports.map(createCard));
}
