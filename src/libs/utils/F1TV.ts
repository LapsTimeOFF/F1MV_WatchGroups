export type F1TV_Format =
    | "MOBILE_HLS"
    | "BIG_SCREEN_HLS"
    | "WEB_DASH"
    | "BIG_SCREEN_DASH"
    | "TABLET_DASH"
    | "TABLET_HLS"
    | "WEB_HLS"
    | "MOBILE_DASH";

export async function getStreamDataURL(
    format: string,
    contentId: number | string
) {
    const url = new URL(
        `https://f1tv.formula1.com/3.0/R/FRA/${format}/ALL/CONTENT/VIDEO/${contentId}/F1_TV_Pro_Annual/1`
    );
    const searchParams = new URLSearchParams();
    searchParams.set("contentId", contentId.toString(10));
    url.search = searchParams.toString();

    return url.toString();
}

export async function getStreamData(
    format: F1TV_Format,
    contentId: number | string
) {
    const response = await fetch(await getStreamDataURL(format, contentId));
    const data = await response.json();

    return data.resultObj.containers;
}
