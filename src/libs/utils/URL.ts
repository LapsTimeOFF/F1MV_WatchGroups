export async function extractContentID(url: string) {
    if (!url.startsWith("https://f1tv.formula1.com/detail/")) return false;
    return parseInt(url.split("/")[4]);
}
