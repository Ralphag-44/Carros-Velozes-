class TimeManager {
    constructor() {
        this.secReplay = 4; // controla os segundos do replay
        this.replayDuration = undefined; 
        this.replayCount = undefined; // definido no loop
        this.replayZoom = 1;
        this.acting = 0;
        // 0 nao atuando
        // 1 rewind
        // 2 replay
    }

    rewind(speed) {
        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < players[i].points.length; j++) {
                players[i].points[j].x = players[i].savedPositions[0].points[j].x
                players[i].points[j].y = players[i].savedPositions[0].points[j].y;
            }
            players[i].angle = players[i].savedPositions[0].angle;
            players[i].finished = players[i].savedPositions[0].finished;
            players[i].lap = players[i].savedPositions[0].lap;
            players[i].lastCheckpoint = players[i].savedPositions[0].lastCheckpoint;
            players[i].speed.vectorX = players[i].savedPositions[0].speed.vectorX;
            players[i].speed.vectorY = players[i].savedPositions[0].speed.vectorY;
            players[i].speed.vectorHypot();
            players[i].time = players[i].savedPositions[0].time;

            players[i].tireWear = [[], []];
            for (let j = 0; j < players[i].savedPositions[0].tireWear.length; j++) {
                for (let k = 0; k < players[i].savedPositions[0].tireWear[j].length; k++) {
                    players[i].tireWear[j].push(
                        {
                            x: players[i].savedPositions[0].tireWear[j][k].x,
                            y: players[i].savedPositions[0].tireWear[j][k].y,
                            time: players[i].savedPositions[0].tireWear[j][k].time
                        }
                    );
                };
            };
            players[i].savedPositions.splice(0, speed);
        };
    }

    replay() {
        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < players[i].points.length; j++) {
                players[i].points[j].x = players[i].savedPositions[this.replayCount].points[j].x
                players[i].points[j].y = players[i].savedPositions[this.replayCount].points[j].y;
            }
            players[i].angle = players[i].savedPositions[this.replayCount].angle;
            players[i].finished = players[i].savedPositions[this.replayCount].finished;
            players[i].lap = players[i].savedPositions[this.replayCount].lap;
            players[i].lastCheckpoint = players[i].savedPositions[this.replayCount].lastCheckpoint;
            players[i].speed.vectorX = players[i].savedPositions[this.replayCount].speed.vectorX;
            players[i].speed.vectorY = players[i].savedPositions[this.replayCount].speed.vectorY;
            players[i].speed.vectorHypot();
            players[i].time = players[i].savedPositions[this.replayCount].time;

            players[i].tireWear = [[], []];
            for (let j = 0; j < players[i].savedPositions[this.replayCount].tireWear.length; j++) {
                for (let k = 0; k < players[i].savedPositions[this.replayCount].tireWear[j].length; k++) {
                    players[i].tireWear[j].push(
                        {
                            x: players[i].savedPositions[this.replayCount].tireWear[j][k].x,
                            y: players[i].savedPositions[this.replayCount].tireWear[j][k].y,
                            time: players[i].savedPositions[this.replayCount].tireWear[j][k].time
                        }
                    );
                };
            };
        };
        this.replayCount--;
    }
}



// points: Array(4) [ {…}, {…}, {…}, … ]
// angle: 0
// finished: false
// lap: 0
// lastCheckpoint: 0
// speed: { vectorX: 0, vectorY: 0 }
// time: 0.03333333333333333
// ​tireWear: Array [ [], [] ]