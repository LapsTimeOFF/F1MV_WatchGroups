import { socket } from "./Socket";
import { IParty, IReplyType } from "./Types";
import { makeid } from "./utils";

export const defineNewParty = async (party: IParty) => {
    const uuidConversation = makeid(10);

    const req = await fetch(
        `http://lapstimevpn.chickenkiller.com:3002/api/v1/request`,
        {
            body: JSON.stringify({
                uuidConversation,
                type: IReplyType.CREATE_PARTY,
                partyId: party.partyId,
                session: party.session,
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        }
    );
    return await req.json();
};

export const checkPartyAvailable = async (partyId: string): Promise<any> => {
    const uuidConversation = makeid(10);

    const req = await fetch(
        `http://lapstimevpn.chickenkiller.com:3002/api/v1/request`,
        {
            body: JSON.stringify({
                uuidConversation,
                type: IReplyType.CHECK_AVAILABLE,
                partyId,
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        }
    );
    return await req.json();
};
