//#region Helper functions
async function fetchJson(url) {
    const portsResponse = await fetch(url);
    if (!portsResponse.ok) {
        throw new Error('Network response was not ok.');
    }
    return portsResponse.json();
}

async function fetchText(url) {
    const portsResponse = await fetch(url);
    if (!portsResponse.ok) {
        throw new Error('Network response was not ok.');
    }
    return portsResponse.text();
}

function updateElement(element, props, children) {
    if (props) {
        for (const [name, value] of Object.entries(props)) {
            if (name === 'ref') {
                value(element);
                continue;
            }

            if (name in element) {
                element[name] = value;
            } else {
                element.setAttribute(name, value);
            }
        }
    }

    if (children) {
        if (Array.isArray(children)) {
            batchReplaceChildren(200, element, children.filter(Boolean));
        } else {
            element.replaceChildren(children);
        }
    }

    return element;
}

function createElement(tagName, props, children) {
    return updateElement(document.createElement(tagName), props, children);
}

async function batchReplaceChildren(batchSize, container, children) {
    container.replaceChildren();
    for (const [i, child] of children.entries()) {
        if (i !== 0 && i % batchSize === 0) {
            await new Promise(resolve => setTimeout(resolve));
        }
        container.append(child);
    }
}

function memoize(func, resolver) {
    function memoized(...args) {
        const key = resolver ? resolver.apply(this, args) : args[0];

        if (memoized.cache.has(key)) {
            return memoized.cache.get(key);
        }
        
        const result = func.apply(this, args);
        memoized.cache.set(key, result);
        return result;
    };

    memoized.cache = new Map();

    return memoized;
}

function getCheckedValues(elements) {
    return Object.fromEntries(Object.entries(elements).map(([name, element]) => [name, element.checked]));
}

function getSearchParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function devided(divider, array) {
    return array.reduce((acc, cur, index) => acc ? [...acc, divider(index), cur] : [cur], null);
}

function ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//#endregion

//#region Modal
function createModal({ title, content }) {
    return createElement('div', { className: 'modal modal-xl fade', tabindex: -1 }, [
        createElement('div', { className: 'modal-dialog' }, [
            createElement('div', { className: 'modal-content' }, [
                createElement('div', { className: 'modal-header' }, [
                    createElement('h5', { className: 'modal-title' }, title),
                    createElement('button', {
                        type: 'button',
                        className: 'btn-close',
                        'data-bs-dismiss': 'modal',
                        'aria-label': 'Close',
                    }),
                ]),
                createElement('div', { className: 'modal-body' }, content),
            ]),
        ]),
    ]);
}

function showModal({ title, content }) {
    return new Promise(resolve => {
        const modal = createModal({ title, content });
        document.body.append(modal);
        
        modal.addEventListener('hidden.bs.modal', () => {
            resolve();
            document.body.removeChild(modal);
        });
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    });
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

async function fetchDeviceInfo() {
    try {
        return await fetchJson('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/device_info.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return {};
    }
}

function deviceInfoToDevices(deviceInfo, deviceCounts) {
    const devices = {};

    for (const [deviceName, firmwares] of Object.entries(deviceInfo)) {
        const device = {
            name: deviceName,
            device: '',
            manufacturer: '',
            cfw: {},
            count: 0,
        };
        for (const [firmwareName, firmware] of Object.entries(firmwares)) {
            device.device = firmware.device;
            device.manufacturer = firmware.manufacturer;
            device.cfw[firmware.name] = { name: firmwareName };
            device.count = deviceCounts[firmware.device] ?? 0;
        }
        devices[device.device] = device;
    }

    return devices;
}

async function fetchPorters() {
    try {
        return await fetchJson('https://raw.githubusercontent.com/PortsMaster/PortMaster-Info/main/porters.json'); // Replace 'YOUR_JSON_URL_HERE' with the actual URL of your JSON data.
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
            port.download_count = statsData.ports[port.name] ?? 0;
            port.max_rating_range = portsData.ratings.max_range;
        }

        return ports;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return [];
    }
}

function fetchReadme(port) {
    try {
        const name = port.name.replace('.zip', '');
        
        if (port.source.repo === 'multiverse') {
            return fetchText(`https://raw.githubusercontent.com/PortsMaster-MV/PortMaster-MV-New/main/ports/${encodeURIComponent(name)}/README.md`);
        }
        
        return fetchText(`https://raw.githubusercontent.com/PortsMaster/PortMaster-New/main/ports/${encodeURIComponent(name)}/README.md`);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return '';
    }
}

function getAttributes(ports) {
    const rtrCount = ports.filter(port => port.attr.rtr).length;

    return [
        { value: 'readyToRun', label: 'Ready to Run', count: rtrCount },
        { value: 'filesNeeded', label: 'Files Needed', count: ports.length - rtrCount },
    ];
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

function getDeviceCounts(ports) {
    const deviceCounts = {};
    let nonAvail = 0;

    for (const port of ports) {
        if (port.attr.avail.length !== 0) {
            const devices = [...new Set(port.attr.avail.map(support => support.split(':')[0]))];
            for (const device of devices) {
                deviceCounts[device] = deviceCounts[device] ? deviceCounts[device] + 1 : 1;
            }
        } else {
            nonAvail++;
        }
    }

    for (const device in deviceCounts) {
        deviceCounts[device] += nonAvail;
    }

    return deviceCounts;
}

function getDevicesByManufacturer(devices) {
    const manufacturers = {};

    for (const device of Object.values(devices)) {
        if (manufacturers[device.manufacturer]?.devices.push(device) == null) {
            manufacturers[device.manufacturer] = {
                name: device.manufacturer,
                devices: [device],
            };
        }
    }

    return Object.values(manufacturers).sort((a, b) => a.name.localeCompare(b.name));
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

function getPortRating(port) {
    if (port.rating) {
        return `${port.rating.average_rating}/${port.max_rating_range}, Ratings: ${port.rating.total_ratings}`;
    }
    else {
        return "None";
    }
}

function getPortRatingLink(port){
    return createElement('a', { href: `/rate-port?port=${encodeURIComponent(port.name.replace('.zip', ''))}` }, "Rate Port");
}

function createContainerLoading() {
    return createElement('div', { className: 'container' }, [
        createElement('h2', { className: 'my-2 text-center text-muted' }, [
            createElement('div', { className: 'me-3 spinner-border' }),
            'Loading...',
        ]),
    ]);
}

function createContainerError(message) {
    return createElement('div', { className: 'container' }, [
        createElement('h2', { className: 'my-2 text-center' }, [
            message || 'Oops! Something went wrong',
        ]),
    ]);
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
        ...port.attr.genres.map(genre => createElement('span', { className: 'badge bg-secondary' }, ucFirst(genre))),
    ];

    const porters = devided(() => ', ', port.attr.porter.map(porter => createElement('a', { href: getPorterUrl(porter) }, porter)));
    

    return createElement('div', { className: 'col', 'data-aos': 'fade-up', 'data-aos-anchor-placement': 'top-bottom' }, [
        createElement('div', { className: 'card h-100 shadow-sm' }, [
            createElement('a', { href: cardUrl, className: 'ratio ratio-4x3 update-anchor' }, [
                createElement('img', {
                    src: imageUrl,
                    className: 'bd-placeholder-img card-img-top object-fit-contain',
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
                        `${port.download_count}`,
                    ]),
                    createElement('div',null, [
                        createElement('span', { className: 'text-muted' }, `Porter${porters.length > 1 ? 's' : ''}: `),
                        createElement('span', { className: 'text-wrap' }, porters),
                    ]),
                    createElement('div', { className: 'd-inline-flex gap-1' }, [
                        createElement('span', { className: 'text-wrap' }, getPortRatingLink(port)),
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
                    createElement('div', null, [
                        createElement('span', { className: 'text-muted' }, 'Rating: '),
                        getPortRating(port),
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

    function handleDetails(e) {
        e.preventDefault();
        showDetailsModal(port, deviceDetails);
    }

    const cardUrl = getCardUrl(port, deviceDetails);
    for (const cardAnchor of card.querySelectorAll('.update-anchor')) {
        cardAnchor.href = cardUrl;
        cardAnchor.onclick = handleDetails;
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

    return card;
}
//#endregion

//#region Create card details
function createAdditionalInformation(port) {
    const additionalInformation = createElement('div', { style: 'word-wrap: break-word' }, 'Loading...');

    function markdownToHtml(markdown) {
        return CmarkGFM.convert(markdown.replaceAll('<br/>', ''))
            .replaceAll('<table>', '<table class="table table-bordered">')
            .replaceAll('<h2>', '<h2 style="margin-top: 1em; margin-bottom: 1em;">');
    }

    fetchReadme(port).then(readme => {
        additionalInformation.innerHTML = markdownToHtml(readme);
    });

    return additionalInformation;
}

function createCardDetails({ port, deviceDetails, additionalInformation }) {
    const br = () => createElement('br');

    return createElement('div', { className: 'container' }, [
        createElement('div', { className: 'px-2 pt-4 text-center' }, [
            createElement('h1', { className: 'display-4 fw-bold text-body-emphasis mb-4' }, port.attr.title),
            createElement('div', { className: 'overflow-hidden', style: 'max-height: 60vh' }, [
                createElement('div', { className: 'container px-0 screenshot' }, [
                    createElement('img', {
                        className: 'img-fluid border rounded-3 p3 mb-5shadow-lg',
                        loading: 'lazy',
                        alt: 'Screenshot',
                        src: getImageUrl(port),
                    }),
                ]),
            ]),
            createElement('div', { className: 'col-lg-8 mx-auto' }, [
                createElement('div', { className: 'desc' }, [
                    createElement('p', {
                        className: 'lead mb-4 mt-4',
                        innerHTML: new showdown.Converter().makeHtml(port.attr.desc_md || port.attr.desc),
                    }),
                ]),
                createElement('div', { className: 'd-grid gap-2 d-sm-flex justify-content-sm-center mb-5' }, [
                    createElement('button', {
                        type: 'button',
                        className: 'btn btn-primary btn-lg px-4 me-sm-3',
                        onclick() {
                            window.location.href = port.source.url;
                        },
                    }, 'Download'),
                ]),
            ]),
        ]),
        createElement('div', { className: 'px-4 py-5 pt-0' }, [
            createElement('h2', { className: 'pb-2 border-bottom' }, 'Port Details'),
            createElement('div', { className: 'row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 py-5' }, [
                createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-dpad' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Genres'),
                        createElement('p', null, devided(br, port.attr.genres.map(genre => {
                            return createElement('span', { className: 'badge bg-secondary' }, genre);
                        }))),
                    ]),
                ]),
                createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-card-checklist' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Requirements'),
                        createElement('p', null, devided(br, port.attr.reqs.map(req => {
                            return createElement('span', { className: 'badge bg-secondary' }, req);
                        }))),
                    ]),
                ]),
                createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-person-workspace' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Porter'),
                        createElement('p', null, devided(() => ', ', port.attr.porter.map(porter => {
                            return createElement('a', { href: getPorterUrl(porter) }, porter)
                        }))),
                    ]),
                ]),
                createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-download' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Downloads'),
                        createElement('p', null, port.download_count),
                    ]),
                ]),
                createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-calendar' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Last Updated'),
                        createElement('p', null, port.source.date_updated),
                    ]),
                ]),
                createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-graph-up' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Rating'),
                        createElement('p', null,getPortRating(port)),
                    ]),
                ]),
                createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-boxes' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Miscellaneous'),
                        createElement('p', null, [
                            port.attr.rtr && createElement('span', { className: 'badge bg-secondary' }, 'Ready to Run'),
                            port.attr.exp && createElement('span', { className: 'badge bg-secondary' }, 'Experimental'),
                        ]),
                    ]),
                ]),
                deviceDetails?.length && createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-controller' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Supported Devices'),
                        createElement('p', null, devided(br, deviceDetails)),
                    ]),
                ]),
            ]),
            createElement('h2', { className: 'pb-2 border-bottom' }, 'Instructions'),
            createElement('div', { className: 'inst' }, [
                createElement('p', {
                    className: 'lead mb-4 mt-4',
                    style: 'word-wrap: break-word',
                    innerHTML: new showdown.Converter().makeHtml(port.attr.inst_md || port.attr.inst),
                }),
            ]),
        ]),
        createElement('div', { className: 'markdown px-4 py-5 pt-0' }, [
            createElement('h2', { className: 'pb-2 border-bottom' }, 'Additional Information'),
            additionalInformation,
        ]),
    ]);
}

async function showDetailsModal(port, deviceDetails) {
    const additionalInformation = createAdditionalInformation(port);

    showModal({
        title: 'Port Details',
        content: createCardDetails({ port, deviceDetails, additionalInformation }),
    });
}
//#endregion
