import { io } from "socket.io-client";

export let socket: any;

export const initSocket = () => {
    socket = io("http://lapstimevpn.chickenkiller.com:3002");
};
