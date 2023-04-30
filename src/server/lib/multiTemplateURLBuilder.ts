// TODO: test this and convert the other instances to it

/**
 * Puts together multiple templates together into 1 URL
 * @param templatesURLs array of URLs
 * @param preQueryURL base URL
 * @returns Created URL
 */
const multiTemplateURLBuilder = (templatesURLs: string[] | string, preQueryURL = ''): string => {
    if (Array.isArray(templatesURLs)) {
        return `${preQueryURL}?template=${templatesURLs.join('&template=')}`;
    } else {
        return `${preQueryURL}?template=${templatesURLs}`;
    }
};

export { multiTemplateURLBuilder };
