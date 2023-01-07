export async function extractContentID(url: string) {
    return url.split("/")[4];
}
