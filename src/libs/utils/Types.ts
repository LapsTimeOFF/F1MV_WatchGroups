/* eslint-disable @typescript-eslint/ban-ts-comment */
export type IF1MV_DL_host = "f1tv" | "app";
export type IF1MV_DL_APP_match = "troubleshooting" | "settings" | "livetiming";

export type IRouter = {
    host: "party";
    match: RegExp;
    handler: any;
};
export type IParty = {
    partyId: string;
    session: string;
};

export const IReplyType = {
    CHECK_AVAILABLE: 0,
    CREATE_PARTY: 1,
};
