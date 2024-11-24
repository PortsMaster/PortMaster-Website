window.addEventListener('DOMContentLoaded', async function() {
    const appElement = document.getElementById('app');

    const name = getSearchParam('name');
    const filename = `${name}.zip`;

    const ports = await fetchPorts();
    const port = ports.find(port => port.name === filename);
    const readme = await fetchReadme(port);

    if (port) {
        const containerElement = createCardDetails(port, readme);
        appElement.replaceChildren(containerElement);
        displayCardDetails(port, readme);
    } else {
        document.getElementById('title').textContent = 'Port Not Found';
    }
});

function createCardDetails(port, readme) {
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

function displayCardDetails(port, readme) {
    document.getElementById('title').textContent = port.attr.title || '';
    document.getElementById('screenshot').src = getImageUrl(port);
    document.getElementById('desc').innerHTML = new showdown.Converter().makeHtml(port.attr.desc_md || port.attr.desc);
    document.getElementById('porter').textContent = port.attr.porter || '';
    document.getElementById('inst').innerHTML = new showdown.Converter().makeHtml(port.attr.inst_md || port.attr.inst);
    document.getElementById('download_count').textContent = port.download_count;
    document.getElementById('last_updated').textContent = port.source.date_updated;

    document.getElementById('misc').innerHTML = [
        port.attr.rtr && '<span class="misc-item badge bg-secondary">Ready to Run</span>',
        port.attr.exp && '<span class="misc-item badge bg-secondary">Experimental</span>',
        port.source.repo == "multiverse" && '<span class="misc-item badge bg-secondary">Multiverse</span>',
    ].filter(Boolean).join('<br>');

    const devices = getSearchParam('devices');
    if (devices) {
        document.getElementById('devicesStart').hidden = false;
        document.getElementById('devices').innerHTML = devices.replaceAll(',', '<br>');
    }

    document.getElementById('genres').innerHTML = port.attr.genres.map(genre => {
        return `<span class="genre-item badge bg-secondary">${genre}</span>`;
    }).join('<br>');

    document.getElementById('requirements').innerHTML = port.attr.reqs.map(req => {
        return `<span class="requirement-item badge bg-secondary">${req}</span>`;
    }).join('<br>');

    document.getElementById('porter').innerHTML = port.attr.porter.map(porter => {
        return `<a href="profile.html?porter=${porter}">${porter}</a>`;
    }).filter(Boolean);

    document.getElementById('download').onclick = function() {
        window.location.href = port.source.url;
    };

    document.getElementById('markdown').innerHTML = markdownToHtml(readme);
}

function markdownToHtml(markdown) {
    return CmarkGFM.convert(markdown.replaceAll('<br/>', ''))
        .replaceAll('<table>', '<table class="table table-bordered">')
        .replaceAll('<h2>', '<h2 style="margin-top: 1em; margin-bottom: 1em;">');
}