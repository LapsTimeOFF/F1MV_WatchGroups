import { defineNewParty } from "./API";
import { makeid } from "./utils";

export class PartyManager {
    partyId: string | null = null;
    session: string | null = null;
    // TODO: Join party

    async createParty(session: string) {
        if (this.partyId === null) this.generateId();

        defineNewParty({ partyId: this.partyId, session });
        return this.partyId;
    }

    generateId() {
        this.partyId = makeid(6);
    }
    getDeepLinkURL() {
        return `f1mv-watchgroups://party/join/${this.partyId}`;
    }
    getShareableURL() {
        return `http://lapstimevpn.chickenkiller.com:3002/watchgroups/party/join/${this.partyId}`;
    }
}
