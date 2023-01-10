import { checkPartyAvailable, defineNewParty } from "./API";
import { IReplyType } from "./Types";
import { makeid } from "./utils";

export class PartyManager {
    partyId: string | null = null;
    session: string | null = null;

    // TODO: Join party
    async checkParty(partyId: string): Promise<any> {
        const data = await checkPartyAvailable(partyId);
        if (data.type !== IReplyType.CHECK_AVAILABLE) return false;

        return data;
    }

    async createParty(session: string): Promise<string> {
        if (this.partyId === null) this.generateId();

        defineNewParty({ partyId: this.partyId, session });
        return this.partyId;
    }

    generateId(): void {
        this.partyId = makeid(6);
    }
    getDeepLinkURL(): string {
        return `f1mv-watchgroups://party/join/${this.partyId}`;
    }
    getShareableURL(): string {
        return `http://lapstimevpn.chickenkiller.com:3002/watchgroups/party/join/${this.partyId}`;
    }
}
