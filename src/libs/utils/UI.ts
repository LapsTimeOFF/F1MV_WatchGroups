import $ from "jquery";

export let darkmode = false;

export const initDarkmode = async () => {
    $("body").attr("class", localStorage.getItem('theme') === 'dark' ? "dark-mode" : "");
    $("body").append(
        `<div id="dark_light" class="left-bottom"><span class="material-symbols-outlined" id="${localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}">${localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}_mode</span></div>`
    );
    $(`#${localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'}`).click(() => {
        switchMode();
    });
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
    localStorage.theme = darkmode ? 'dark' : 'light';
    $("body").attr("class", darkmode ? "dark-mode" : "");
};
