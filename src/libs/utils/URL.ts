export async function extractContentID(url: string) {
    if(!url.startsWith('https://f1tv.formula1.com/detail/')) throw new Error('Invalid link provided.')
    return parseInt(url.split("/")[4]);
}
