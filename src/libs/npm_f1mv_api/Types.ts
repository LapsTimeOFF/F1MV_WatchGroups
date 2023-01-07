type Config = {
    host: string;
    port: number | string;
};

type Topic =
    | "ArchiveStatus"
    | "AudioStreams"
    | "CarData"
    | "ChampionshipPrediction"
    | "ContentStreams"
    | "DriverList"
    | "ExtrapolatedClock"
    | "Heartbeat"
    | "LapCount"
    | "LapSeries"
    | "PitLaneTimeCollection"
    | "Position"
    | "RaceControlMessages"
    | "SessionData"
    | "SessionInfo"
    | "SessionStatus"
    | "TeamRadio"
    | "TimingAppData"
    | "TimingData"
    | "TimingStats"
    | "TopThree"
    | "TrackStatus"
    | "WeatherData"
    | "WeatherDataSeries";

type ClockTopic = "paused" | "systemTime" | "trackTime" | "liveTimingStartTime";

type DriverList = {
    RacingNumber: string;
    BroadcastName: string;
    FullName: string;
    Tla: string;
    Line: number;
    TeamName:
        | "Red Bull Racing"
        | "Ferrari"
        | "Mercedes"
        | "McLaren"
        | "Aston Martin"
        | "AlphaTauri"
        | "Alpine"
        | "Haas F1 Team"
        | "Alfa Romeo"
        | "Williams";
    TeamColour: string;
    FirstName: string;
    LastName: string;
    Reference: string;
    HeadshotUrl: string;
    CountryCode: string;
};

type Position = {
    Position: Array<{
        Timestamp: string;
        Entries: object;
    }>;
};

type Driver_Position = {
    Status: "OnTrack";
    X: number;
    Y: number;
    Z: number;
};

type Driver_TimingData = {
    GapToLeader: string;
    Line: number;
    Position: string;
    ShowPosition: boolean;
    RacingNumber: string;
    Retired: boolean;
    InPit: boolean;
    PitOut: boolean;
    Stopped: boolean;
    Status: number;
    NumberOfLaps: number;
    NumberOfPitStops: number;
};

type RaceControlMessage = {
    Utc: string;
    Lap: number;
    Category: "Flag" | "Other" | "Drs" | "CarEvent" | "SafetyCar";
    Message: string;
};

enum TrackStatus_Def {
    "AllClear" = "1",
    "Yellow" = "2",
    "SCDeployed" = "4",
    "Red" = "5",
    "VSCDeployed" = "6",
    "VSCEnding" = "7",
}

type TrackStatus = {
    Status: "1" | "2" | "4" | "5" | "6" | "7";
    Message:
        | "AllClear"
        | "Yellow"
        | "SCDeployed"
        | "Red"
        | "VSCDeployed"
        | "VSCEnding";
};

export {
    Config,
    Topic,
    ClockTopic,
    DriverList,
    Driver_Position,
    Position,
    Driver_TimingData,
    TrackStatus,
    TrackStatus_Def,
    RaceControlMessage,
};
