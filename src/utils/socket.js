import { io } from 'socket.io-client';
//import { STRAPIURL } from '@env';
const STRAPIURL = 'http://localhost:1337';
const socket = io(STRAPIURL, { autoConnect: false });

socket.onAny((event, ...args) => {
  //console.log(event, args);
});

export default socket;
