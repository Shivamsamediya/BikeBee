import app from "./app.js"; // export default app se;
import http from "http";

const PORT = process.env.PORT || 3000;

const server= http.createServer(app);

server.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})
