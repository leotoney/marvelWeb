
# OTT Playback Monitor

## Project Overview

The OTT Playback Monitor is a learning project built with TypeScript and Node.js to understand how playback events can be monitored in an Over-The-Top (OTT) streaming application.

The goal is to connect a React video player to a backend server and send playback information such as video title, playback position, and playback state.

## Technologies Used

- TypeScript — static typing and safer code
- React — frontend video player
- Node.js — JavaScript runtime
- Express.js — REST API development
- CORS — allows communication between the React frontend and backend

## Current Playback States

The project models these playback states:

- `idle` — playback has not started.
- `playing` — video is playing.
- `paused` — playback is paused.
- `buffering` — video is waiting for data.
- `ended` — video playback has completed.

## API Endpoints

### POST `/playback/status`

Receives the latest playback status from the React application.

Example request body:

```json
{
  "video": "Episode Name",
  "position": 35.4,
  "state": "playing"
}
```

### GET `/playback/status`

Returns the latest playback status stored by the backend.

Example response:

```json
{
  "video": "Episode Name",
  "position": 35.4,
  "state": "playing"
}
```

The backend currently stores the latest status in memory. The status resets when the server restarts.

## Getting Started
1. Start the Node.js Backend

    Open the project in Visual Studio Code.
    Open a terminal using Terminal → New Terminal and navigate to the backend folder:
    Install dependencies if you have not already done so:

    npm install

    Start the backend:
    npx tsx server.ts

    The server should display a message similar to:
    Playback monitor server running on port 3000

    Keep this terminal running.

2. Start the React Frontend

    Open a second terminal in Visual Studio Code. Do not stop the backend terminal.
    Navigate to the React application folder:

    Install dependencies if needed:
    npm install

    Start React using Vite:
    npm run dev

    Vite will display a local URL, usually:

    http://localhost:5173/

    Open that URL in your browser.

    Keep this terminal running as well.

3. Test Playback Monitoring

    With both applications running:
    Open the React application at http://localhost:5173/.
    Select an episode and play the video.
    Pause or resume playback.
    Check the backend terminal for received playback updates.

    Open http://localhost:3000/playback/status to view the latest status.React application sends updates, it returns the latest received status.

