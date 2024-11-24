window.addEventListener('DOMContentLoaded', async function() {
    const appElement = document.getElementById('app');

    const name = getSearchParam('name');
    const filename = `${name}.zip`;

    const ports = await fetchPorts();
    const port = ports.find(port => port.name === filename);

    if (port) {
        const containerElement = createContainer(port);
        appElement.replaceChildren(containerElement);
        displayCardDetails(port);
    } else {
        document.getElementById('title').textContent = 'Port Not Found';
    }
});

function createContainer(port) {
    return createElement('div', { className: 'container' }, [
        createElement('div', { className: 'px-2 pt-4 text-center' }, [
            createElement('h1', { id: 'title', className: 'display-4 fw-bold text-body-emphasis mb-4' }),
            createElement('div', { className: 'overflow-hidden', style: 'max-height: 60vh' }, [
                createElement('div', { className: 'container px-0 screenshot' }, [
                    createElement('img', {
                        id: 'screenshot',
                        className: 'img-fluid border rounded-3 p3 mb-5shadow-lg',
                        loading: 'lazy',
                        alt: 'Screenshot',
                    }),
                ]),
            ]),
            createElement('div', { className: 'col-lg-8 mx-auto' }, [
                createElement('div', { className: 'desc' }, [
                    createElement('p', { id: 'desc', className: 'lead mb-4 mt-4' }),
                ]),
                createElement('div', { className: 'd-grid gap-2 d-sm-flex justify-content-sm-center mb-5' }, [
                    createElement('button', { type: 'button', id: 'download', className: 'btn btn-primary btn-lg px-4 me-sm-3' }, 'Download'),
                ]),
            ]),
        ]),
        createElement('div', { id: 'icon-grid', className: 'px-4 py-5 pt-0' }, [
            createElement('h2', { className: 'pb-2 border-bottom' }, 'Port Details'),
            createElement('div', { className: 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5' }, [
                createElement('div', { className: 'col' }, [
                    createElement('div', { className: 'd-flex align-items-start' }, [
                        createElement('i', { className: 'ft-s bi bi-dpad' }),
                        createElement('div', { className: 'ms-3' }, [
                            createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Genres'),
                            createElement('p', { id: 'genres' }),
                        ]),
                    ]),
                ]),
                createElement('div', { className: 'col' }, [
                    createElement('div', { className: 'd-flex align-items-start' }, [
                        createElement('i', { className: 'ft-s bi bi-card-checklist' }),
                        createElement('div', { className: 'ms-3' }, [
                            createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Requirements'),
                            createElement('p', { id: 'requirements' }),
                        ]),
                    ]),
                ]),
                createElement('div', { className: 'col' }, [
                    createElement('div', { className: 'd-flex align-items-start' }, [
                        createElement('i', { className: 'ft-s bi bi-person-workspace' }),
                        createElement('div', { className: 'ms-3' }, [
                            createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Porter'),
                            createElement('p', { id: 'porter' }),
                        ]),
                    ]),
                ]),
                createElement('div', { className: 'col' }, [
                    createElement('div', { className: 'd-flex align-items-start' }, [
                        createElement('i', { className: 'ft-s bi bi-download' }),
                        createElement('div', { className: 'ms-3' }, [
                            createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Downloads'),
                            createElement('p', { id: 'download_count' }),
                        ]),
                    ]),
                ]),
                createElement('div', { className: 'col' }, [
                    createElement('div', { className: 'd-flex align-items-start' }, [
                        createElement('i', { className: 'ft-s bi bi-calendar' }),
                        createElement('div', { className: 'ms-3' }, [
                            createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Last Updated'),
                            createElement('p', { id: 'last_updated' }),
                        ]),
                    ]),
                ]),
                createElement('div', { className: 'col' }, [
                    createElement('div', { className: 'd-flex align-items-start' }, [
                        createElement('i', { className: 'ft-s bi bi-boxes' }),
                        createElement('div', { className: 'ms-3' }, [
                            createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Miscellaneous'),
                            createElement('p', { id: 'misc' }),
                        ]),
                    ]),
                ]),
                createElement('div', { id: 'devicesStart', className: 'col', hidden: true }, [
                    createElement('div', { className: 'd-flex align-items-start' }, [
                        createElement('i', { className: 'ft-s bi bi-controller' }),
                        createElement('div', { className: 'ms-3' }, [
                            createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Supported Devices'),
                            createElement('p', { id: 'devices' }),
                        ]),
                    ]),
                ]),
            ]),
            createElement('h2', { className: 'pb-2 border-bottom' }, 'Instructions'),
            createElement('div', { className: 'inst' }, [
                createElement('p', { id: 'inst', className: 'lead mb-4 mt-4', style: 'word-wrap: break-word' }),
            ]),
        ]),
        createElement('div', { id: 'additional-information', className: 'markdown px-4 py-5 pt-0 hidden' }, [
            createElement('h2', { className: 'pb-2 border-bottom' }, 'Additional Information'),
            createElement('div', { id: 'markdown', style: 'word-wrap: break-word' }),
        ]),
    ]);
}

function displayCardDetails(port) {
    document.getElementById('title').textContent = port.attr.title || '';
    document.getElementById('screenshot').src = getImageUrl(port);

    //data.attr.desc ? document.getEleme('desc').textContent = data.attr.desc : document.getElementsByClassName('desc').hidden = true;
    descriptionElement = document.getElementById('desc');
    var converter = new showdown.Converter();
    var desc = port.attr.desc;
    if (port.attr.desc_md){
        desc = port.attr.desc_md;
    }
    descriptionElement.innerHTML = converter.makeHtml(desc);
    port.attr.porter ? document.getElementById('porter').textContent = port.attr.porter : document.getElementsByClassName('porter').hidden = true;

    instructionsElement = document.getElementById('inst');
    var converter = new showdown.Converter();
    var inst = port.attr.inst;
    if (port.attr.inst_md){
        inst = port.attr.inst_md;
    }
    instructionsElement.innerHTML = converter.makeHtml(inst);

    const downloadCountElement = document.getElementById("download_count");
    downloadCountElement.textContent = port.download_count;

    const lastUpdatedElement = document.getElementById("last_updated");
    lastUpdatedElement.textContent = port.source.date_updated;

    var taggedMisc = "";
    if (port.attr.rtr){
        taggedMisc += '<span class="misc-item badge bg-secondary">Ready to Run</span><br>';
    }

    if (port.attr.exp){
        taggedMisc += '<span class="misc-item badge bg-secondary">Experimental</span><br>';
    }

    if (port.source.repo == "multiverse"){
        taggedMisc += '<span class="misc-item badge bg-secondary">Multiverse</span><br>';
    }

    const miscElement = document.getElementById("misc");
    miscElement.innerHTML = taggedMisc;

    const devices = getSearchParam('devices');
    if (devices) {
        const deviceElement = document.getElementById("devices");
        var devicesHTML = "";
        const deviceList = devices.split(",")
        for (device in deviceList){
            devicesHTML = devicesHTML +  deviceList[device] + "<br>"
        }
        deviceElement.innerHTML = devicesHTML
        document.getElementById("devicesStart").hidden = false;
    }   

    var taggedGenres = "";
    port.attr.genres.forEach((genre) => {
        taggedGenres += '<span class="genre-item badge bg-secondary">' + genre + '</span>' + '<br>';
    });
    taggedGenres ? document.getElementById("genres").innerHTML = taggedGenres : true;

    var taggedRequirements = "";
    port.attr.reqs.forEach((req) => {
        taggedRequirements += '<span class="requirement-item badge bg-secondary">' + req + '</span>' + '<br>';
    });
    taggedRequirements ? document.getElementById("requirements").innerHTML = taggedRequirements : true;

    var porters = port.attr.porter;
    var porterHtml = "";
    porters.forEach((porter) => {
        porterHtml += '<a href="profile.html?porter=' + porter + '">' + porter + '</a>';
        if (porters.length > 1) {
            porterHtml += "<br>";
        }
    });
    port.attr.porter ? document.getElementById('porter').innerHTML = porterHtml : document.getElementsByClassName('porter').hidden = true;

    const downloadElement = document.getElementById("download");
    downloadElement.setAttribute("onclick", "window.location.href='" + port.source.url + "';");

    async function getmarkdown() {
        try {
            var response = null;
            var repo = "https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/";
            if (port.source.repo == "multiverse") {
                repo = "https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-MV-New/main/ports/";
                response = await fetch(repo + port.name.replace(".zip", "") + "/README.md");
            }
            else
            {
                response = await fetch(repo + port.name.replace(".zip", "") + "/README.md");
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
