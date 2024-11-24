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
