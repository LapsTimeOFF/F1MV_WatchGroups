import { io } from "socket.io-client";

export let socket: any;

export const initSocket = (): void => {
    socket = io("http://lapstimevpn.chickenkiller.com:3002");
};
