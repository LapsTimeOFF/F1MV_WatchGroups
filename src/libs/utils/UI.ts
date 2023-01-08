/* eslint-disable @typescript-eslint/ban-ts-comment */
import $ from "jquery";
import { createDeepLinkURL } from "./F1MV";
import { getStreamData } from "./F1TV";
import { PartyManager } from "./PartyManager";
import { extractContentID } from "./URL";

export let darkmode = false;

export const initDarkmode = async () => {
    $("body").attr(
        "class",
        localStorage.getItem("theme") === "dark" ? "dark-mode" : ""
    );
    $("body").append(
        `<div id="dark_light" class="left-bottom"><span class="material-symbols-outlined" id="${
            localStorage.getItem("theme") === "dark" ? "dark" : "light"
        }">${
            localStorage.getItem("theme") === "dark" ? "dark" : "light"
        }_mode</span></div>`
    );
    $(`#${localStorage.getItem("theme") === "dark" ? "dark" : "light"}`).click(
        () => {
            switchMode();
        }
    );
};

export const switchMode = async () => {
    $("#dark_light").remove();
    if (darkmode) {
        $("body").append(
            '<div id="dark_light" class="left-bottom"><span class="material-symbols-outlined" id="light">light_mode</span></div>'
        );
        $("#light").click(() => {
            switchMode();
        });
        darkmode = false;
    } else {
        $("body").append(
            '<div id="dark_light" class="left-bottom"><span class="material-symbols-outlined" id="dark">dark_mode</span></div>'
        );
        $("#dark").click(() => {
            switchMode();
        });
        darkmode = true;
    }
    localStorage.theme = darkmode ? "dark" : "light";
    $("body").attr("class", darkmode ? "dark-mode" : "");
};

export const renderURLfield = async () => {
    $("body").append(
        "<p><i>If you want to join a group, please open the invite link that the owner gave you in a browser.</i></p>"
    );
    $("body").append('<div id="urlContainer"></div>');
    $("#urlContainer").append(
        "<h2>Please provide the F1TV url of the session/video you want to watch :</h2>"
    );
    $("#urlContainer").append('<input id="url" type="text"></input>');
    $("#urlContainer").append('<button id="loadURL">Load URL</button>');
    $("#urlContainer").append('<p id="F1TVInfos"></p>');
    $("#loadURL").click(async () => {
        const contentId: number | false = await extractContentID(
            $("#url").val().toString()
        );

        if (contentId === false) {
            $("#F1TVInfos").text("Please provide a vaild F1TV link.");
        } else {
            $("#F1TVInfos").text(`F1TV Link detected, Loading video data...`);

            const F1TV_Data = await getStreamData("WEB_DASH", contentId);

            $("#F1TVInfos").text(
                `${F1TV_Data[0].metadata.emfAttributes.Global_Title} - ${F1TV_Data[0].metadata.genres[0]}`
            );
            // @ts-ignore
            location = await createDeepLinkURL("f1tv", [
                "detail",
                contentId,
                "null",
            ]);
            $("#urlContainer").append(
                '<button id="createURL">Create link</button>'
            );
            $("#createURL").click(async () => {
                const partyManager = new PartyManager();
                await partyManager.createParty(
                    `${F1TV_Data[0].metadata.emfAttributes.Global_Title} - ${F1TV_Data[0].metadata.genres[0]}`
                );
                const URL = partyManager.getShareableURL();
                $("#createURL").remove();
                $("#urlContainer").append(
                    '<button id="copyURL"><span class="material-symbols-outlined">link</span>Copy link</button>'
                );
                $("#copyURL").click(() => {
                    navigator.clipboard.writeText(URL);
                });
            });
        }
    });
};
