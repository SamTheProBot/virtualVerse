import { Server, Socket } from 'socket.io'
import express from 'express';
import { createServer } from 'http';
import { Player } from './classes/Player'
import { EventMaping } from './util/eventTable';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


io.on('connection', async (socket) => {
  const newPlayer = new Player(socket.id);


  socket.on(EventMaping.SDP_HANDSHAKE, async (offer) => {
    console.log(`new client: ${socket.id}`)
    const answer = await newPlayer.createAnswer(offer);
    socket.emit(EventMaping.SDP_RESPONSE, answer);
  });

  newPlayer.localICEcandidate(socket)

  socket.on(EventMaping.ICE_CLIENT_TO_SERVER, (candidate) => {
    newPlayer.remoteICEcandidate(candidate)
  })
});


server.listen(3001, () => {
  console.log(`server running at http://localhost:3001`);
});
