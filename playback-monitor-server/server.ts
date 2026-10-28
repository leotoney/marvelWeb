
import cors from "cors";
import express from "express";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const videoTitle: string = "OTT Video";
type playbackStates = "idle" | "playing" | "paused" | "buffering";
let playbackState:playbackStates = "buffering";

const playbackPosition: number = 120;
const isPlaying: boolean = false;

interface videoPlayer {
    title: string;
    position: number;
    state: playbackStates;
}

const player : videoPlayer ={
    title: videoTitle,
    position: playbackPosition,
    state: playbackState,
}


function changePlabackState(newState: playbackStates): void{
    player.state = newState;
    console.log("Playback state changed to:", player.state);
}

type updateResult = "success" | "invalid-position";
function changePlabackPosition(newPosition: number): string{
    if (newPosition < 0)
    {
        console.log("Error: Playback position cannot be negative.");
        return "invalid-position";
    }
    player.position = newPosition;
    console.log("Playback state changed to:", player.position);
    return "success";
}

async function fetchVideoDetails(): Promise<string>{
     console.log("Fetching video details...");

     await new Promise<void>((resolve) => {
            setTimeout(resolve, 2000);
     });

     return "Video details received successfully";
}

async function main(): Promise<void>{
    console.log("Starting playback monitor");
    const result = await fetchVideoDetails();

    console.log(result);
    console.log("Playback monitor ready");
}


main();

type PlaybackStatus = {
    video: string;
    position: number;
    state: "idle" | "playing" | "paused" | "buffering" | "ended";
};

let playbackStatus: PlaybackStatus = {
    video: "",
    position: 0,
    state: "idle",
};

// React sends playback updates here
app.post("/playback/status", (req, res) => {
    playbackStatus = req.body as PlaybackStatus;

    console.log("Received playback update:", playbackStatus);

    res.json({ message: "Playback status updated" });
});

// Read the latest playback status here
app.get("/playback/status", (req, res) => {
    res.json(playbackStatus);
});

app.listen(PORT, () => {
    console.log(`Playback monitor server running on port ${PORT}`);
});