import {
    discoverF1MVInstances,
    noInstanceFounded,
    Config,
} from "../npm_f1mv_api";
import $ from "jquery";
import { renderURLfield } from "./UI";
import { F1MV_DL_APP_match, F1MV_DL_host } from "./Types";

export const initConfig = async () => {
    const instance = await discoverF1MVInstances("localhost").catch(
        (e: Error) => {
            if (e === noInstanceFounded) {
                console.error(
                    "No MultiViewer instances founded on the requested host. Check if MultiViewer is running or if MultiViewer is allowed in your firewall rules."
                );
            }
            $("#F1MVInfos").html(
                'No MultiViewer instances founded on the requested host. Check if MultiViewer is running or if MultiViewer is allowed in your firewall rules. <a href="f1mv://">Try to open F1MV</a>'
            );
        }
    );
    if (!instance) return;
    console.log(instance);

    $("#F1MVInfos").html(
        `We've found a MultiViewer instance on this computer on the port ${instance.port} !`
    );

    const config: Config = {
        host: "localhost",
        port: instance.port,
    };

    renderURLfield();
    return config;
};

export const createDeepLinkURL_App = async (match: F1MV_DL_APP_match) => {
    return new URL(`f1mv://app/${match}`).toString();
};

export const createDeepLinkURL = async (
    host: F1MV_DL_host,
    match: Array<string | number>
) => {
    return new URL(`f1mv://${host}/${match.join("/")}`).toString();
};
