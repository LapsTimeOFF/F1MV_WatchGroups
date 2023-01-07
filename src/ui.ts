import $ from "jquery";

export let darkmode = false;

export const initDarkmode = async () => {
    $("body").append(
        '<div id="dark_light" class="left-bottom"><span class="material-symbols-outlined" id="light">light_mode</span></div>'
    );
    $("#light").click(() => {
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
    $("body").attr("class", darkmode ? "dark-mode" : "");
};
