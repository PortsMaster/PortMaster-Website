let allPorts = [];
let allDevices = {};
let allGenres = [];

const firmwareMap = {
    "ALL": "All Firmwares",
    "jelos": "JELOS",
    "rocknix": "ROCKNIX",
    "arkos": "ArkOS",
    "emuelec": "EmuELEC",
    "amberelec": "AmberELEC",
    "arkos (wummle)": "ArkOS (Wummle)",
};

window.onload = async function() {
    allDevices = await fetchDevices();
    allPorts = await fetchPorts();
    allGenres = getGenres(allPorts);

    displayDropdowns({
        devices: allDevices,
        genres: allGenres,
        onchange: filterCards,
    });

    loadFilterState();
    filterCards();
}

function createElement(tagName, props, children) {
    const element = document.createElement(tagName);

    if (props) {
        for (const [name, value] of Object.entries(props)) {
            if (name in element) {
                element[name] = value;
            } else {
                element.setAttribute(name, value);
            }
        }
    }

    if (children) {
        if (Array.isArray(children)) {
            element.append(...children.filter(Boolean));
        } else {
            element.append(children);
        }
    }

    return element;
}

function getDeviceDetails(port) {
    const deviceDetails = [];
    for (const code of port.supported) {
        for (const support of port.attr.avail) {
            const [deviceCode, firmwareCode] = support.split(':');
            if (deviceCode === code) {
                const deviceName = allDevices[deviceCode].name;
                const firmwareName = firmwareMap[firmwareCode];
                deviceDetails.push(deviceName + ': ' + firmwareName);
            }
        }
    }
    return deviceDetails;
}

function getImageUrl(port) {
    const name = port.name.replace('.zip', '');
    const imageName = port.attr.image.screenshot;
    if (imageName !== null) {
        if (port.source.repo === 'main') {
            return `https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/${encodeURIComponent(name)}/${encodeURIComponent(imageName)}`;
        } else if (port.source.repo === 'multiverse') {
            return `https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-MV-New/main/ports/${encodeURIComponent(name)}/${encodeURIComponent(imageName)}`;
        }
    }

    return 'https://raw.githubusercontent.com/PortsMaster/PortMaster-Website/main/no.image.png';
}

function getCardUrl(name, deviceDetails) {
    return `detail.html?name=${encodeURIComponent(name)}` + (deviceDetails ? `&devices=${encodeURIComponent(deviceDetails.join(","))}` : "");
}

function getPorterUrl(porter) {
    return `profile.html?porter=${encodeURIComponent(porter)}`;
}

// Function to create a card element for each JSON object
// https://discord.gg/JxYBp9HTAY
function createCard(port) {
    const deviceDetails = getDeviceDetails(port);
    const cardUrl = getCardUrl(port.name.replace('.zip', ''), deviceDetails);
    const imageUrl = getImageUrl(port);
    const desc = port.attr.desc_md || port.attr.desc;

    const card = createElement('div', { className: 'col' }, [
        createElement('div', { className: 'card h-100 shadow-sm' }, [
            createElement('div', { className: 'card-body' }, [
                createElement('a', { href: cardUrl }, [
                    createElement('img', {
                        src: imageUrl,
                        className: 'bd-placeholder-img card-img-top',
                        loading: 'lazy',
                    }),
                ]),
                createElement('a', { href: cardUrl, className: 'text-decoration-none' }, [
                    createElement('h5', {
                        className: 'card-title link-body-emphasis mt-3',
                        style: 'margin-top: 1rem',
                    }, port.attr.title),
                ]),
                createElement('p', {
                    className: 'card-text mt-3',
                    innerHTML: new showdown.Converter().makeHtml(desc),
                }),
                createElement('p', null, [
                    port.attr.rtr && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Ready to Run'),
                    ' ',
                    port.attr.exp && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Experimental'),
                    ' ',
                    port.source.repo === "multiverse" && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Multiverse'),
                ]),
                createElement('p', {
                    className: 'card-text mt-3',
                }, [
                    'Porter: ',
                    ...port.attr.porter.reduce((children, porter, i) => {
                        if (i > 0) {
                            children.push(', ');
                        }
                        children.push(createElement('a', { href: getPorterUrl(porter) }, porter));
                        return children;
                    }, []),
                ]),
                createElement('p', { className: 'card-text mt-3 supported' }),
                createElement('p', {
                    className: 'card-text text-body-secondary mt-3',
                }, 'Added: ' + port.source.date_added),
                createElement('div', { className: 'd-flex justify-content-between align-items-center' }, [
                    createElement('small', { className: 'text-body-secondary' }, [
                        `Downloads: ${port.download_count || 0}`,
                    ]),
                    createElement('div', { className: 'btn-group' }, [
                        createElement('a', { href: cardUrl }, [
                            createElement('button', { type: 'button', className: 'btn btn-sm btn-outline-primary' }, 'Details'),
                        ]),
                    ]),
                ]),
            ]),
        ]),
    ]);

    updateCard(card, port);

    return card;
}

function updateCard(card, port) {
    const deviceDetails = getDeviceDetails(port);

    const supported = card.querySelector('.supported');
    if (deviceDetails.length > 0) {
        supported.replaceChildren(
            'Supported Devices: ',
            ...deviceDetails.map((deviceDetail) => createElement('div', null, deviceDetail)),
        );
    } else {
        supported.replaceChildren();
    }
}

const portCardsMap = new Map();
function renderCard(port) {
    if (portCardsMap.has(port.name)) {
        const card = portCardsMap.get(port.name);
        updateCard(card, port);
        return card;
    } else {
        const card = createCard(port);
        portCardsMap.set(port.name, card);
        return card;
    }
}

// Function to iterate over the JSON data and display cards
function displayCards(ports) {
    const availablePorts = document.getElementById('port-count')
    availablePorts.textContent = `${ports.length} Ports Available`;

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.replaceChildren();
    for (const port of ports) {
        cardsContainer.appendChild(renderCard(port));
    }
}

// Function to load a saved filter state from the session storage
function loadFilterState() {
    const savedFilterState = sessionStorage.getItem('filterState');
    if (savedFilterState) {
        const filterState = JSON.parse(savedFilterState);
        setFilterState(filterState);
    }
}

function storeFilterState() {
    const filterState = getFilterState();
    sessionStorage.setItem('filterState', JSON.stringify(filterState));
    return filterState;
}

function getFilterState() {
    const searchQuery = document.getElementById('search').value.trim().toLowerCase();
    const readyToRun = document.getElementById('ready-to-run').checked;
    const filesNeeded = document.getElementById('files-needed').checked;
    const Newest = document.getElementById('sortNewest').checked;
    const Downloaded = document.getElementById('sortDownloaded').checked;
    const AZ = document.getElementById('sortAZ').checked;

    const filterState = {
        searchQuery,
        readyToRun,
        filesNeeded,
        Newest,
        Downloaded,
        AZ,
        devices: {},
        genres: {}
    };

    for (const deviceCode in allDevices){
        filterState.devices[deviceCode] = document.getElementById(deviceCode)?.checked ?? false;
    }

    for (const genre of allGenres) {
        filterState.genres[genre] = document.getElementById(genre)?.checked ?? false;
    }

    return filterState;
}

function setFilterState(filterState) {
    document.getElementById('ready-to-run').checked = filterState.readyToRun;
    document.getElementById('files-needed').checked = filterState.filesNeeded;
    document.getElementById('sortNewest').checked = filterState.Newest;
    document.getElementById('sortDownloaded').checked = filterState.Downloaded;
    document.getElementById('sortAZ').checked = filterState.AZ;
    document.getElementById('search').value = filterState.searchQuery;
    for (const device in filterState.devices) {
        const deviceElement = document.getElementById(device);
        if (deviceElement) {
            deviceElement.checked = filterState.devices[device];
        }
    }
    for (const genre in filterState.genres) {
        const genreElement = document.getElementById(genre);
        if (genreElement) {
            genreElement.checked = filterState.genres[genre];
        }
    }
}

function getFilteredData(ports) {
    const filterState = storeFilterState();

    const isSelectedGenres = Object.values(filterState.genres).some(Boolean);
    const isSelectedDevices = Object.values(filterState.devices).some(Boolean);

    function matchFilter(port) {
        if (port.attr.rtr) {
            if (!filterState.readyToRun) {
                return false;
            }
        } else {
            if (!filterState.filesNeeded) {
                return false;
            }
        }

        if (isSelectedGenres) {
            if (!port.attr.genres.some(genre => filterState.genres[genre])) {
                return false;
            }
        }

        port.supported = [];

        if (port.attr.avail.length !== 0 && isSelectedDevices) {
            const deviceCodes = port.attr.avail.map(item => item.split(':')[0]);
            port.supported = deviceCodes.filter(deviceCode => filterState.devices[deviceCode]);
            if (port.supported.length === 0) {
                return false;
            }
        }

        return true;
    }

    function sortPorts(ports) {
        if (filterState.AZ) {
            return [...ports].sort((a, b) => a.attr.title.localeCompare(b.attr.title));
        } else if (filterState.Downloaded) {
            return [...ports].sort((a, b) => b.download_count - a.download_count);
        } else if (filterState.Newest) {
            return [...ports].sort((a, b) => Date.parse(b.source.date_added) - Date.parse(a.source.date_added));
        } else {
            return ports;
        }
    }

    const filteredPorts = ports.filter(matchFilter);

    if (filterState.searchQuery) {
        const fuse = new Fuse(filteredPorts, {
            threshold: 0.2,
            ignoreLocation: true,
            keys: [
                { name: 'attr.title', weight: 2 },
                { name: 'attr.desc', weight: 1 },
            ],
        });
        const results = fuse.search(filterState.searchQuery);
        return results.map(result => result.item);
    } else {
        return sortPorts(filteredPorts);
    }
}

// Function to filter the cards based on the search query
function filterCards() {
    displayCards(getFilteredData(allPorts));
}

function createManufacturerButton({ manufacturer, manufacturerDevices, onchange }) {
    return createElement('div', {
        className: 'btn-group flex-wrap',
        role: 'group',
    }, [
        createElement('button', {
            className: 'btn btn-outline-primary dropdown-toggle',
            ariaExpanded: 'false',
            'data-bs-toggle': 'dropdown',
        }, manufacturer),
        createElement('ul', {
            id: manufacturer,
            className: "dropdown-menu",
        }, manufacturerDevices.map(device => createElement('li', { className: 'dropdown-item' }, [
            createElement('input', {
                id: device.device,
                className: 'form-check-input',
                style: 'margin-right: 10px;',
                type: 'checkbox',
                onchange,
            }),
            createElement('label', { htmlFor: device.device }, device.name),
        ]))),
    ]);
}

function createGenresButton({ genres, onchange }) {
    return createElement('div', {
        className: 'btn-group flex-wrap',
        role: 'group',
    }, [
        createElement('button', {
            className: 'btn btn-outline-primary dropdown-toggle',
            ariaExpanded: 'false',
            'data-bs-toggle': 'dropdown',
        }, 'Genres'),
        createElement('ul', { className: 'dropdown-menu' }, genres.map(genre => createElement('li', { className: 'dropdown-item' }, [
            createElement('input', {
                type: "checkbox",
                id: genre,
                name: genre,
                value: genre,
                onchange,
            }),
            createElement('label', {
                htmlFor: genre,
                textContent: genre,
                style: 'margin-left: 5px',
            })
        ]))),
    ]);
}

function displayDropdowns({ devices, genres, onchange }) {
    const manufacturers = getManufacturers(devices);

    const manufacturerButtons = manufacturers.map(manufacturer => {
        const manufacturerDevices = Object.values(devices).filter(device => device.manufacturer === manufacturer);
        return createManufacturerButton({ manufacturer, manufacturerDevices, onchange });
    });

    const genresButton = createGenresButton({ genres, onchange });

    const dropdownButtons = document.getElementById('dropdown-buttons');
    dropdownButtons.replaceChildren(...manufacturerButtons, genresButton);
}

async function fetchJson(url) {
    const portsResponse = await fetch(url);
    if (!portsResponse.ok) {
        throw new Error('Network response was not ok.');
    }
    return portsResponse.json();
}

async function fetchDevices() {
    try {
        return await fetchJson('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/devices.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return {};
    }
}

async function fetchPorts() {
    try {
        const [portsData, statsData] = await Promise.all([
            fetchJson('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/ports.json'), // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
            fetchJson('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/port_stats.json'), // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        ]);

        const ports = Object.values(portsData.ports);
        for (const port of ports) {
            port.download_count = statsData.ports[port.name];
        }

        return ports;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return [];
    }
}

function getManufacturers(devices) {
    const manufacturersSet = new Set();
    for (const device of Object.values(devices)) {
        manufacturersSet.add(device.manufacturer);
    }
    return [...manufacturersSet].sort();
}

function getGenres(ports) {
    const genresSet = new Set();
    for (const port of ports) {
        for (const genre of port.attr.genres) {
            genresSet.add(genre);
        }
    }
    return [...genresSet].sort();
}