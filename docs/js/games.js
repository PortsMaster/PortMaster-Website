window.addEventListener('DOMContentLoaded', async function() {
    const appElement = document.getElementById('app');
    appElement.replaceChildren(createContainerLoading());

    const ports = await fetchPorts();
    const deviceInfo = await fetchDeviceInfo();
    const attributes = getAttributes(ports);
    const genres = getGenres(ports);
    const deviceCounts = getDeviceCounts(ports);
    const devices = deviceInfoToDevices(deviceInfo, deviceCounts);
    const firmwareNames = getFirmwareNames();

    const getCard = memoize(createCard, port => port.name);
    const { containerElement, updateContainer, filterControls } = createContainer({ attributes, devices, genres, onchange });
    const filterState = defaultFilterState(JSON.parse(sessionStorage.getItem('filterState')));
    setFilterState(filterControls, filterState);
    updateResult(filterState);
    appElement.replaceChildren(containerElement);

    async function updateResult(filterState) {
        const selectedDevices = getSelectedDevices(devices, filterState);
        await updateContainer({
            cards: getFilteredData(ports, filterState).map(port => {
                return updateCard(getCard(port), port, selectedDevices, firmwareNames);
            }),
        });
    }

    function onchange() {
        const filterState = getFilterState(filterControls);
        sessionStorage.setItem('filterState', JSON.stringify(filterState));
        updateResult(filterState);
    }
});

//#region Create container
function createSearchInput({ oninput }) {
    return createElement('input', {
        type: 'search',
        className: 'form-control w-25 flex-grow-1',
        placeholder: 'Search',
        oninput,
    });
}

function createSort({ onchange }) {
    const sortRadio = {};

    const sortElement = createElement('div', {
        className: 'btn-group',
    }, [
        createElement('input', { ref: el => sortRadio.date_added = el, id: 'sortNewest', className: 'btn-check', type: 'radio', name: 'sortRadio', autocomplete: 'off', checked: false, onchange }),
        createElement('label', { htmlFor: 'sortNewest', className: 'btn btn-outline-primary' }, 'Most Recent'),
        createElement('input', { ref: el => sortRadio.download_count = el, id: 'sortDownloaded', className: 'btn-check', type: 'radio', name: 'sortRadio', autocomplete: 'off', checked: false, onchange }),
        createElement('label', { htmlFor: 'sortDownloaded', className: 'btn btn-outline-primary' }, 'Most Downloaded'),
        createElement('input', { ref: el => sortRadio.title = el, id: 'sortAZ', className: 'btn-check', type: 'radio', name: 'sortRadio', autocomplete: 'off', checked: false, onchange }),
        createElement('label', { htmlFor: 'sortAZ', className: 'btn btn-outline-primary' }, 'A - Z'),
    ]);

    return { sortElement, sortRadio };
}

function createContainer({ attributes, devices, genres, onchange }) {
    const { dropdownButtons, checkboxes, updateDropdowns } = createDropdowns({ attributes, devices, genres, onchange });
    const searchInput = createSearchInput({ oninput: onchange });
    const { sortElement, sortRadio } = createSort({ onchange });

    const filterControls = { checkboxes, searchInput, sortRadio };

    const containerRefs = {};
    const containerElement = createElement('div', { className: 'container' }, [
        createElement('div', { className: 'my-2 gap-2 d-flex flex-wrap justify-content-center' }, [dropdownButtons, searchInput, sortElement]),
        createElement('h2', { ref: el => containerRefs.title = el, className: 'my-4 text-center' }),
        createElement('div', { ref: el => containerRefs.list = el, className: 'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3' }),
    ]);

    async function updateContainer({ cards }) {
        updateDropdowns();
        containerRefs.title.textContent = `${cards.length} Ports Available`;
        containerRefs.list.classList.add('aos-suppress');
        await batchReplaceChildren(200, containerRefs.list, cards);

        // Wait for all images to load
        await Promise.all(Array.from(containerRefs.list.querySelectorAll('img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => { img.onload = img.onerror = resolve; });
        }));

        containerRefs.list.classList.remove('aos-suppress');
        if (window.AOS) AOS.refresh();
    }

    return {
        containerElement,
        updateContainer,
        filterControls,
    };
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
        createElement('div', {
            className: 'dropdown-menu overflow-x-hidden overflow-y-auto',
            style: 'max-height: calc(100vh - 140px)'
        }, items),
    ]);
}

function createDropdownHeader(title) {
    return createElement('h6', { className: 'dropdown-header' }, title);
}

function createDropdownItem(checkbox, label, count) {
    return createElement('label', { className: 'dropdown-item d-flex gap-2' }, [
        checkbox,
        label,
        count && createElement('span', { className: 'ms-auto text-muted' }, count),
    ]);
}

function createDropdownCheckbox(refs, name, onchange) {
    return createElement('input', {
        ref: el => refs[name] = el,
        name,
        className: 'form-check-input',
        type: 'checkbox',
        onchange,
    });
}

function createDropdowns({ attributes, devices, genres, onchange }) {
    const checkboxes = {
        attribute: {},
        device: {},
        genre: {},
    };

    const items = {
        attribute: [],
        device: [],
        genre: [],
    };

    items.attribute = attributes.map(({ value, label, count }) => {
        return createDropdownItem(createDropdownCheckbox(checkboxes.attribute, value, onchange), label, count);
    });

    items.device = getDevicesByManufacturer(devices).flatMap(manufacturer => [
        createDropdownHeader(manufacturer.name),
        ...manufacturer.devices.map(device => {
            return createDropdownItem(createDropdownCheckbox(checkboxes.device, device.device, onchange), device.name, device.count);
        }),
    ]);

    items.genre = genres.map(genre => {
        return createDropdownItem(createDropdownCheckbox(checkboxes.genre, genre.name, onchange), ucFirst(genre.name), genre.count);
    });

    const dropdownGroups = [
        createDropdownGroup('Filters', items.attribute),
        createDropdownGroup('Genres', items.genre),
        createDropdownGroup('Devices', items.device),
    ];

    const dropdownButtons = createElement('div', { className: 'btn-group flex-wrap' }, dropdownGroups);

    function updateDropdowns() {
        for (const group of dropdownGroups) {
            const button = group.querySelector('button');
            const hasChecked = Boolean(group.querySelector(':checked'));
            button.classList.toggle('btn-outline-primary', !hasChecked);
            button.classList.toggle('btn-primary', hasChecked);
        }
    }

    return { dropdownButtons, checkboxes, updateDropdowns };
}
//#endregion

//#region Filter cards
function defaultFilterState(filterState) {
    const searchParams = new URLSearchParams(location.search);

    return {
        search: searchParams.get('search') ?? filterState?.search ?? '',
        sort: {
            date_added: true,
            download_count: false,
            title: false,
            ...filterState?.sort,
        },
        values: {
            attribute: {},
            device: {},
            genre: {},
            ...filterState?.values,
        },
    };
}

function getFilterState({ searchInput, sortRadio, checkboxes }) {
    return {
        search: searchInput.value.trim(),
        sort: getCheckedValues(sortRadio),
        values: {
            attribute: getCheckedValues(checkboxes.attribute),
            device: getCheckedValues(checkboxes.device),
            genre: getCheckedValues(checkboxes.genre),
        },
    };
}

function setFilterState({ searchInput, sortRadio, checkboxes }, filterState) {
    searchInput.value = filterState.search;

    for (const [value, element] of Object.entries(sortRadio)) {
        element.checked = filterState.sort[value] ?? false;
    }

    for (const [name, items] of Object.entries(checkboxes)) {
        for (const [value, element] of Object.entries(items)) {
            element.checked = filterState.values[name]?.[value] ?? false;
        }
    }
}

function getFilteredData(ports, filterState) {
    const { readyToRun, filesNeeded } = filterState.values.attribute;
    const isSelectedGenres = Object.values(filterState.values.genre).some(Boolean);
    const isSelectedDevices = Object.values(filterState.values.device).some(Boolean);

    function matchFilter(port) {
        if (readyToRun || filesNeeded) {
            if (port.attr.rtr) {
                if (!readyToRun) {
                    return false;
                }
            } else {
                if (!filesNeeded) {
                    return false;
                }
            }
        }

        if (port.attr.genres.length !== 0 && isSelectedGenres) {
            if (!port.attr.genres.some(genre => filterState.values.genre[genre])) {
                return false;
            }
        }

        if (port.attr.avail.length !== 0 && isSelectedDevices) {
            if (!port.attr.avail.some(item => filterState.values.device[item.split(':')[0]])) {
                return false;
            }
        }

        return true;
    }

    function sortPorts(ports) {
        if (filterState.sort.title) {
            return [...ports].sort((a, b) => a.attr.title.localeCompare(b.attr.title));
        } else if (filterState.sort.download_count) {
            return [...ports].sort((a, b) => b.download_count - a.download_count);
        } else if (filterState.sort.date_added) {
            return [...ports].sort((a, b) => Date.parse(b.source.date_added) - Date.parse(a.source.date_added));
        } else {
            return ports;
        }
    }

    const filteredPorts = ports.filter(matchFilter);

    if (filterState.search) {
        const fuse = new Fuse(filteredPorts, {
            threshold: 0.2,
            ignoreLocation: true,
            keys: [
                { name: 'attr.title', weight: 2 },
                { name: 'attr.desc', weight: 1 },
            ],
        });
        const results = fuse.search(filterState.search);
        return results.map(result => result.item);
    } else {
        return sortPorts(filteredPorts);
    }
}

function getSelectedDevices(devices, filterState) {
    const selectedDevices = {};

    for (const [deviceCode, checked] of Object.entries(filterState.values.device)) {
        if (checked) {
            selectedDevices[deviceCode] = devices[deviceCode];
        }
    }

    return selectedDevices;
}
//#endregion
