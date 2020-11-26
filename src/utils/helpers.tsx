export function isValidUrl(url: string) {
    try {
        new URL(url);
    } catch (_) {
        return false;
    }
    return true;
}

export const urlImageNotFound='https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';