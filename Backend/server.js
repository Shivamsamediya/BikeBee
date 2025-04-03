import app from "./app.js"; // export default app se;
import http from "http";
import { initializeSocket } from "./socket.js";

const PORT = process.env.PORT || 3000;

const server= http.createServer(app);

initializeSocket(server);

server.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
});
