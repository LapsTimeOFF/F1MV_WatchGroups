import { socket } from "./Socket";
import { IParty, IReplyType } from "./Types";
import { makeid } from "./utils";

export const defineNewParty = async (party: IParty) => {
    socket.emit("newParty", party);
};

export const checkPartyAvailable = async (partyId: string, callback: any): Promise<void> => {
    const uuidConversation = makeid(10);
    
    socket.on('reply'+uuidConversation, (data: any) => {
        return callback(data);
    })
    socket.emit('request', {
        uuidConversation,
        type: IReplyType.CHECK_AVAILABLE,
        partyId
    })
}