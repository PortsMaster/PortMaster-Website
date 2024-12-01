window.addEventListener('DOMContentLoaded', async function() {
    const appElement = document.getElementById('app');
    appElement.replaceChildren(createContainerLoading());

    const deviceDetails = getSearchParam('devices')?.split(',');
    const name = getSearchParam('name');
    const filename = `${name}.zip`;

    const ports = await fetchPorts();
    const port = ports.find(port => port.name === filename);

    if (port) {
        const additionalInformation = createAdditionalInformation(port);
        const containerElement = createCardDetails({ port, deviceDetails, additionalInformation });
        appElement.replaceChildren(containerElement);
    } else {
        appElement.replaceChildren(createContainerError('404 Not Found'));
    }
});
