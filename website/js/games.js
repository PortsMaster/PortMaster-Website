window.addEventListener('DOMContentLoaded', async function() {
    const devices = await fetchDevices();
    const ports = await fetchPorts();
    const genres = getGenres(ports);
    const firmwareNames = getFirmwareNames();

    const dropdowns = displayDropdowns({ devices, genres, onchange });
    const filterForm = new FilterForm(dropdowns);
    filterForm.loadStorage();

    function onchange() {
        const filterState = filterForm.saveStorage();
        dropdowns.updateDropdowns();
        displayCards(getFilteredData(ports, filterState), getSelectedDevices(devices, filterState), firmwareNames);
    }
    onchange();

    // Export global for static html filters
    window.filterCards = onchange;
});

//#region Helper functions
async function fetchJson(url) {
    const portsResponse = await fetch(url);
    if (!portsResponse.ok) {
        throw new Error('Network response was not ok.');
    }
    return portsResponse.json();
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

function devided(divider, array) {
    return array.reduce((acc, cur) => acc ? [...acc, divider, cur] : [cur], null);
}

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//#endregion

//#region Fetch and process data
function getFirmwareNames() {
    return {
        'ALL': 'All Firmwares',
        'jelos': 'JELOS',
        'rocknix': 'ROCKNIX',
        'arkos': 'ArkOS',
        'emuelec': 'EmuELEC',
        'amberelec': 'AmberELEC',
        'arkos (wummle)': 'ArkOS (Wummle)',
    };
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

function getGenres(ports) {
    const genres = {};

    for (const port of ports) {
        for (const genre of port.attr.genres) {
            genres[genre] = genres[genre] ? genres[genre] + 1 : 1;
        }
    }

    return Object.entries(genres).map(([name, count]) => ({
        name,
        count,
    })).sort((a, b) => a.name.localeCompare(b.name));
}

function getDevicesByManufacturer(devices) {
    const manufacturers = {};

    for (const device of Object.values(devices)) {
        if (manufacturers[device.manufacturer]?.push(device) == null) {
            manufacturers[device.manufacturer] = [device];
        }
    }

    return Object.entries(manufacturers).sort((a, b) => a[0].localeCompare(b[0]));
}

function getCardUrl(port, deviceDetails) {
    return `detail.html?name=${encodeURIComponent(port.name.replace('.zip', ''))}` + (deviceDetails?.length ? `&devices=${encodeURIComponent(deviceDetails.join(','))}` : '');
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

function getPorterUrl(porter) {
    return `profile.html?porter=${encodeURIComponent(porter)}`;
}
//#endregion

//#region Create filter dropdowns
function createDropdownGroup(title, items) {
    return createElement('div', {
        className: 'btn-group flex-wrap',
        role: 'group',
    }, [
        createElement('button', {
            className: 'btn btn-outline-primary dropdown-toggle',
            ariaExpanded: 'false',
            'data-bs-toggle': 'dropdown',
        }, title),
        createElement('ul', { className: "dropdown-menu" }, items),
    ]);
}

function createDropdownHeader(title) {
    return createElement('li', null, [
        createElement('h6', { className: 'dropdown-header' }, title),
    ]);
}

function createDropdownItem(checkbox, label, count) {
    return createElement('li', { className: 'dropdown-item' }, [
        createElement('label', { className: 'd-flex gap-2' }, [
            checkbox,
            label,
            count && createElement('span', { className: 'ms-auto text-muted' }, count),
        ]),
    ]);
}

function createDropdownCheckbox(name, onchange) {
    return createElement('input', {
        name,
        className: 'form-check-input',
        type: 'checkbox',
        onchange,
    });
}

function displayDropdowns({ devices, genres, onchange }) {
    const deviceCheckboxes = {};
    const genreCheckboxes = {};

    const devicesGroup = createDropdownGroup('Devices', getDevicesByManufacturer(devices).flatMap(([manufacturer, manufacturerDevices]) => {
        return [
            createDropdownHeader(manufacturer),
            ...manufacturerDevices.map(device => {
                return createDropdownItem(deviceCheckboxes[device.device] = createDropdownCheckbox(device.device, onchange), device.name);
            }),
        ];
    }));

    const genresGroup = createDropdownGroup('Genres', genres.map(genre => {
        return createDropdownItem(genreCheckboxes[genre.name] = createDropdownCheckbox(genre.name, onchange), ucFirst(genre.name), genre.count);
    }));

    const dropdownButtons = document.getElementById('dropdown-buttons');
    dropdownButtons.replaceChildren(genresGroup, devicesGroup);

    function updateDropdowns() {
        const groups = [genresGroup, devicesGroup];
        for (const group of groups) {
            const button = group.querySelector('button');
            const hasChecked = Boolean(group.querySelector(':checked'));
            button.classList.toggle('btn-outline-primary', !hasChecked);
            button.classList.toggle('btn-primary', hasChecked);
        }
    }

    return { deviceCheckboxes, genreCheckboxes, updateDropdowns };
}
//#endregion

//#region Filter cards
class FilterForm {
    constructor({ deviceCheckboxes, genreCheckboxes }) {
        this.elements = {
            searchQuery: document.getElementById('search'),
            readyToRun: document.getElementById('ready-to-run'),
            filesNeeded: document.getElementById('files-needed'),
            Newest: document.getElementById('sortNewest'),
            Downloaded: document.getElementById('sortDownloaded'),
            AZ: document.getElementById('sortAZ'),
            devices: Object.entries(deviceCheckboxes),
            genres: Object.entries(genreCheckboxes),
        };
    }

    loadStorage() {
        const jsonState = sessionStorage.getItem('filterState');
        if (jsonState) {
            const state = JSON.parse(jsonState);
            this.setElementsState(state);
        }
    }

    saveStorage() {
        const state = this.getElementsState();
        sessionStorage.setItem('filterState', JSON.stringify(state));
        return state;
    }

    getElementsState() {
        return {
            searchQuery: this.elements.searchQuery.value.trim(),
            readyToRun: this.elements.readyToRun.checked,
            filesNeeded: this.elements.filesNeeded.checked,
            Newest: this.elements.Newest.checked,
            Downloaded: this.elements.Downloaded.checked,
            AZ: this.elements.AZ.checked,
            devices: Object.fromEntries(this.elements.devices.map(([device, element]) => [device, element.checked])),
            genres: Object.fromEntries(this.elements.genres.map(([genre, element]) => [genre, element.checked])),
        };
    }

    setElementsState(state) {
        this.elements.searchQuery.value = state.searchQuery;
        this.elements.readyToRun.checked = state.readyToRun;
        this.elements.filesNeeded.checked = state.filesNeeded;
        this.elements.Newest.checked = state.Newest;
        this.elements.Downloaded.checked = state.Downloaded;
        this.elements.AZ.checked = state.AZ;

        for (const [device, element] of this.elements.devices) {
            element.checked = state.devices[device] ?? false;
        }

        for (const [genre, element] of this.elements.genres) {
            element.checked = state.genres[genre] ?? false;
        }
    }
}

function getFilteredData(ports, filterState) {
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

        if (port.attr.genres.length !== 0 && isSelectedGenres) {
            if (!port.attr.genres.some(genre => filterState.genres[genre])) {
                return false;
            }
        }

        if (port.attr.avail.length !== 0 && isSelectedDevices) {
            if (!port.attr.avail.some(item => filterState.devices[item.split(':')[0]])) {
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

function getSelectedDevices(devices, filterState) {
    const selectedDevices = {};

    for (const [deviceCode, checked] of Object.entries(filterState.devices)) {
        if (checked) {
            selectedDevices[deviceCode] = devices[deviceCode];
        }
    }

    return selectedDevices;
}
//#endregion

//#region Create and update cards
function createCard(port) {
    const cardUrl = getCardUrl(port);
    const imageUrl = getImageUrl(port);
    const desc = port.attr.desc_md || port.attr.desc;

    const badges = [
        port.attr.rtr && createElement('span', { className: 'badge bg-success' }, 'Ready to Run'),
        port.attr.exp && createElement('span', { className: 'badge bg-warning' }, 'Experimental'),
        port.source.repo === 'multiverse' && createElement('span', { className: 'badge bg-info' }, 'Multiverse'),
        ...port.attr.genres.map(genre => createElement('span', { className: 'badge bg-secondary' }, ucFirst(genre))),
    ];

    const porters = devided(', ', port.attr.porter.map(porter => createElement('a', { href: getPorterUrl(porter) }, porter)));

    return createElement('div', { className: 'col' }, [
        createElement('div', { className: 'card h-100 shadow-sm' }, [
            createElement('a', { href: cardUrl, className: 'update-anchor' }, [
                createElement('img', {
                    src: imageUrl,
                    className: 'bd-placeholder-img card-img-top',
                    loading: 'lazy',
                }),
            ]),
            createElement('div', { className: 'card-body d-flex flex-column' }, [
                createElement('h5', { className: 'card-title' }, [
                    createElement('a', {
                        href: cardUrl,
                        className: 'update-anchor text-decoration-none link-body-emphasis'
                    }, port.attr.title),
                ]),
                createElement('div', {
                    className: 'card-text mb-auto',
                    innerHTML: new showdown.Converter().makeHtml(desc),
                }),
                createElement('p', { className: 'card-text update-supported', hidden: true }),
                createElement('div', { className: 'd-flex justify-content-between align-items-start' }, [
                    createElement('div', { className: 'd-flex flex-wrap gap-2' }, badges),
                    createElement('a', { href: cardUrl, className: 'update-anchor' }, 'Details'),
                ]),
            ]),
            createElement('div', { className: 'card-footer d-flex flex-wrap gap-2' }, [
                createElement('div', { className: 'flex-fill w-50' }, [
                    createElement('div', null, [
                        createElement('span', { className: 'text-muted' }, 'Downloads: '),
                        port.download_count || 0,
                    ]),
                    createElement('div', { className: 'd-inline-flex gap-1' }, [
                        createElement('span', { className: 'text-muted' }, `Porter${porters.length > 1 ? 's' : ''}: `),
                        createElement('span', { className: 'text-wrap' }, porters),
                    ]),
                ]),
                createElement('div', { className: 'text-end' }, [
                    createElement('div', null, [
                        createElement('span', { className: 'text-muted' }, 'Added: '),
                        port.source.date_added,
                    ]),
                    createElement('div', null, [
                        createElement('span', { className: 'text-muted' }, 'Updated: '),
                        port.source.date_updated,
                    ]),
                ]),
            ]),
        ]),
    ]);
}

function updateCard(card, port, selectedDevices, firmwareNames) {
    const deviceDetails = port.attr.avail.map(support => {
        const [deviceCode, firmwareCode] = support.split(':');
        const device = selectedDevices[deviceCode];
        if (device) {
            return `${device.name}: ${firmwareNames[firmwareCode]}`;
        }
    }).filter(Boolean);

    const cardUrl = getCardUrl(port, deviceDetails);
    for (const cardAnchor of card.querySelectorAll('.update-anchor')) {
        cardAnchor.href = cardUrl;
    }

    const cardSupported = card.querySelector('.update-supported');
    if (deviceDetails.length > 0) {
        cardSupported.replaceChildren(
            createElement('span', { className: 'text-muted' }, 'Supported Devices: '),
            ...deviceDetails.map((deviceDetail) => createElement('div', null, deviceDetail)),
        );
        cardSupported.hidden = false;
    } else {
        cardSupported.hidden = true;
    }
}

const portCardsMap = new Map();
function getCard(port) {
    if (portCardsMap.has(port.name)) {
        return portCardsMap.get(port.name);
    } else {
        const card = createCard(port);
        portCardsMap.set(port.name, card);
        return card;
    }
}

function displayCards(ports, selectedDevices, firmwareNames) {
    const availablePorts = document.getElementById('port-count')
    availablePorts.textContent = `${ports.length} Ports Available`;

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.replaceChildren();
    for (const port of ports) {
        const card = getCard(port);
        updateCard(card, port, selectedDevices, firmwareNames);
        cardsContainer.appendChild(card);
    }
}
//#endregion
