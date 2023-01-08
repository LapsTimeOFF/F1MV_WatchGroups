import { socket } from "./Socket";
import { IParty } from "./Types";

export const defineNewParty = async (party: IParty) => {
    socket.emit('newParty', party)
}