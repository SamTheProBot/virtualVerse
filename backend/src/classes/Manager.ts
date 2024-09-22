import { Socket } from "socket.io";
import { Player } from "./Player";


export class Manager {
  private PlayerArray: Player[];
  private PlayerGroup: {}

  constructor() {

  }

  addPlayer(socketId: string, socket: Socket) {
    let newPlayer = new Player(socketId);
    this.PlayerArray.push(newPlayer);
  }

  removePlayer(socketId: string) {
    this.PlayerArray.filter((id) => id.socketId !== socketId);
  }

}
