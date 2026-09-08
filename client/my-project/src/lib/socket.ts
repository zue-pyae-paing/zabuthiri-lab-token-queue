import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:5000";


export const staffSocket = io(SOCKET_URL, {
  autoConnect: false,
});


export const displaySocket = io(SOCKET_URL, {
  autoConnect: false,
});