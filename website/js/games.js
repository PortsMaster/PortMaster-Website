let allGames = [];
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
    allGames = await fetchGames();
    allGenres = getGenres(allGames);

    populateManufacturerDropdown(allDevices);
    populateGenreDropdown(allGenres);

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

function getDeviceDetails(game) {
    const deviceDetails = [];
    for (const code of game.supported) {
        for (const support of game.attr.avail) {
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

function getImageUrl(game) {
    const name = game.name.replace('.zip', '');
    const imageName = game.attr.image.screenshot;
    if (imageName !== null) {
        if (game.source.repo === 'main') {
            return `https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/${encodeURIComponent(name)}/${encodeURIComponent(imageName)}`;
        } else if (game.source.repo === 'multiverse') {
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
function createCard(game) {
    const deviceDetails = getDeviceDetails(game);
    const cardUrl = getCardUrl(game.name.replace('.zip', ''), deviceDetails);
    const imageUrl = getImageUrl(game);
    const desc = game.attr.desc_md || game.attr.desc;

    return createElement('div', { className: 'col' }, [
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
                        className: 'card-title link-body-emphasis',
                        style: 'padding-top: 20px',
                    }, game.attr.title),
                ]),
                createElement('p', {
                    className: 'card-text',
                    style: 'padding-top: 10px',
                    innerHTML: new showdown.Converter().makeHtml(desc),
                }),
                createElement('p', null, [
                    game.attr.rtr && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Ready to Run'),
                    ' ',
                    game.attr.exp && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Experimental'),
                    ' ',
                    game.source.repo === "multiverse" && createElement('span', { className: 'misc-item badge bg-secondary' }, 'Multiverse'),
                ]),
                createElement('p', {
                    className: 'card-text',
                    style: 'padding-top: 10px',
                }, [
                    'Porter: ',
                    ...game.attr.porter.reduce((children, porter, i) => {
                        if (i > 0) {
                            children.push(', ');
                        }
                        children.push(createElement('a', { href: getPorterUrl(porter) }, porter));
                        return children;
                    }, []),
                ]),
                deviceDetails.length > 0 && createElement('p', {
                    className: 'card-text',
                    style: 'padding-top: 10px',
                }, [
                    'Supported Devices: ',
                    ...deviceDetails.map((deviceDetail) => createElement('div', null, deviceDetail)),
                ]),
                createElement('p', {
                    className: 'card-text text-body-secondary',
                    style: 'padding-top: 10px'
                }, 'Added: ' + game.source.date_added),
                createElement('div', { className: 'd-flex justify-content-between align-items-center' }, [
                    createElement('small', { className: 'text-body-secondary' }, [
                        `Downloads: ${game.download_count || 0}`,
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
}

// Function to iterate over the JSON data and display cards
function displayCards(games) {
    const availablePorts = document.getElementById('port-count')
    availablePorts.textContent = `${games.length} Ports Available`;

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; // Clear previous cards
    for (const game of games) {
        const card = createCard(game);
        cardsContainer.appendChild(card);
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

function getFilteredData(games) {
    const filterState = storeFilterState();

    const selectedDevices = Object.entries(filterState.devices).filter(([_, checked]) => checked).map(([value]) => value);
    const selectedGenres = Object.entries(filterState.genres).filter(([_, checked]) => checked).map(([value]) => value);

    function matchFilter(game) {
        if (game.attr.rtr) {
            if (!filterState.readyToRun) {
                return false;
            }
        } else {
            if (!filterState.filesNeeded) {
                return false;
            }
        }

        if (selectedGenres.length > 0) {
            if (!game.attr.genres.some(genre => selectedGenres.includes(genre))) {
                return false;
            }
        }

        game.supported = [];

        if (game.attr.avail.length !== 0 && selectedDevices.length !== 0) {
            const deviceCodes = game.attr.avail.map(item => item.split(':')[0]);
            game.supported = deviceCodes.filter(deviceCode => selectedDevices.includes(deviceCode));
            if (game.supported.length === 0) {
                return false;
            }
        }

        return true;
    }

    function sortGames(games) {
        if (filterState.AZ) {
            return [...games].sort((a, b) => a.attr.title.localeCompare(b.attr.title));
        } else if (filterState.Downloaded) {
            return [...games].sort((a, b) => b.download_count - a.download_count);
        } else if (filterState.Newest) {
            return [...games].sort((a, b) => Date.parse(b.source.date_added) - Date.parse(a.source.date_added));
        } else {
            return games;
        }
    }

    const filteredGames = games.filter(matchFilter);

    if (filterState.searchQuery) {
        const fuse = new Fuse(filteredGames, {
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
        return sortGames(filteredGames);
    }
}

// Function to filter the cards based on the search query
function filterCards() {
    displayCards(getFilteredData(allGames));
}

function populateManufacturerDropdown(devices) {
    const manufacturers = getManufacturers(devices);

    function createDeviceItem(device) {
        return createElement('li', { className: 'dropdown-item' }, [
            createElement('input', {
                id: device.device,
                className: 'form-check-input',
                style: 'margin-right: 10px;',
                type: 'checkbox',
                onchange: filterCards,
            }),
            createElement('label', { htmlFor: device.device }, device.name),
        ])
    }

    const manufacturerDropdownButtons = document.getElementById("dropdown-buttons");
    for (const manufacturer of manufacturers) {
        const manufacturerDevices = Object.values(devices).filter(device => device.manufacturer === manufacturer);

        manufacturerDropdownButtons.appendChild(createElement('div', {
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
            }, manufacturerDevices.map(createDeviceItem)),
        ]));
    }
}

function populateGenreDropdown(genres) {
    const genreDropdown = createElement('ul', { className: 'dropdown-menu' });

    for (const genre of genres) {
        genreDropdown.appendChild(createElement('li', { className: 'dropdown-item' }, [
            createElement('input', {
                type: "checkbox",
                id: genre,
                name: genre,
                value: genre,
                onchange: filterCards,
            }),
            createElement('label', {
                htmlFor: genre,
                textContent: genre,
                style: 'margin-left: 5px',
            })
        ]));
    }

    const gamesDropdown = document.getElementById('dropdown-buttons');
    gamesDropdown.appendChild(createElement('div', {
        className: 'btn-group flex-wrap',
        role: 'group',
    }, [
        createElement('button', {
            className: 'btn btn-outline-primary dropdown-toggle',
            ariaExpanded: 'false',
            'data-bs-toggle': 'dropdown',
        }, 'Genres'),
        genreDropdown,
    ]));
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

async function fetchGames() {
    try {
        const [portsData, statsData] = await Promise.all([
            fetchJson('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/ports.json'), // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
            fetchJson('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/port_stats.json'), // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
        ]);

        const games = Object.values(portsData.ports);
        for (const game of games) {
            game.download_count = statsData.ports[game.name];
        }

        return games;
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

function getGenres(games) {
    const genresSet = new Set();
    for (const game of games) {
        for (const genre of game.attr.genres) {
            genresSet.add(genre);
        }
    }
    return [...genresSet].sort();
}