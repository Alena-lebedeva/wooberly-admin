export function formatURL(data) {
    let convertData = null;
    if (data) {
        convertData = data;
        convertData = convertData.toLowerCase();
        convertData = convertData.replace(new RegExp(', ', 'g'), '--');
        convertData = convertData.replace(new RegExp(' ', 'g'), '-');
        convertData = convertData.replace(new RegExp('/', 'g'), '-');
        convertData = convertData.replace(new RegExp('#', 'g'), '-');
        convertData = convertData.replace(new RegExp('%', 'g'), '-');
        convertData = convertData.replace(/\?/g, '-');
        convertData = convertData.replace(/\\/g, "-")
    }

    return convertData;
}

export function resetURL(data) {
    let convertData = null;
    if (data) {
        convertData = data;
        convertData = convertData.replace(new RegExp('--', 'g'), ', ');
        convertData = convertData.replace(new RegExp('-', 'g'), ' ');
        convertData = convertUpperCase(convertData);
        if (convertData.indexOf(', ') >= 0) {
            convertData = convertCountryCode(convertData);
        }

    }

    return convertData;
}
