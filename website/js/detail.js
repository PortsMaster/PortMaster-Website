window.addEventListener('DOMContentLoaded', async function() {
    const appElement = document.getElementById('app');
    appElement.replaceChildren(createContainerLoading());

    const devices = getSearchParam('devices');
    const name = getSearchParam('name');
    const filename = `${name}.zip`;

    const ports = await fetchPorts();
    const port = ports.find(port => port.name === filename);
    const readme = await fetchReadme(port);

    if (port) {
        const containerElement = createCardDetails({ port, readme, devices });
        appElement.replaceChildren(containerElement);
    } else {
        appElement.replaceChildren(createContainerError('404 Not Found'));
    }
});

function createCardDetails({ port, readme, devices }) {
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
            createElement('div', { className: 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5' }, [
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
                    createElement('i', { className: 'ft-s bi bi-boxes' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Miscellaneous'),
                        createElement('p', null, [
                            port.attr.rtr && createElement('span', { className: 'badge bg-secondary' }, 'Ready to Run'),
                            port.attr.exp && createElement('span', { className: 'badge bg-secondary' }, 'Experimental'),
                        ]),
                    ]),
                ]),
                devices && createElement('div', { className: 'col d-flex align-items-start' }, [
                    createElement('i', { className: 'ft-s bi bi-controller' }),
                    createElement('div', { className: 'ms-3' }, [
                        createElement('h3', { className: 'fw-bold mb-0 fs-4 text-body-emphasis' }, 'Supported Devices'),
                        createElement('p', null, devided(br, devices.split(','))),
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
        createElement('div', { className: 'markdown px-4 py-5 pt-0 hidden' }, [
            createElement('h2', { className: 'pb-2 border-bottom' }, 'Additional Information'),
            createElement('div', { style: 'word-wrap: break-word', innerHTML: markdownToHtml(readme) }),
        ]),
    ]);
}

function markdownToHtml(markdown) {
    return CmarkGFM.convert(markdown.replaceAll('<br/>', ''))
        .replaceAll('<table>', '<table class="table table-bordered">')
        .replaceAll('<h2>', '<h2 style="margin-top: 1em; margin-bottom: 1em;">');
}