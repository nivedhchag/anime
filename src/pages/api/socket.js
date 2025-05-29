export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = initSocket(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
}