/* eslint-disable @typescript-eslint/ban-ts-comment */
import $ from 'jquery';
// @ts-ignore
import darkicon from './svg/dark_mode.svg';

export const darkmode = false;

export const initDarkmode = async () => {
    const div_dark_light = $('body').append('<div id="dark_light" class="left-bottom"></div>');
    div_dark_light.append(darkicon);
}