import { Server } from "socket.io";
import userModel from './models/user.model.js';
import captainModel from './models/captain.model.js';

let io;

export function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.ALLOWED_ORIGINS || "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                if (!data || !data.userId || !data.userType) {
                    console.error("Invalid data received in 'join' event:", data);
                    return;
                }

                const { userId, userType } = data;

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, {
                        socketId: socket.id
                    });
                } else {
                    console.error("Invalid userType in 'join' event:", userType);
                }
            } catch (error) {
                console.error("Error handling 'join' event:", error);
            }
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export function sendMessageToSocketId(socketId, message) {
    if (io) {
        if (socketId) {
            io.to(socketId).emit("message", message);
        } else {
            console.error("Invalid socketId provided for sending message.");
        }
    } else {
        console.error("Socket.io is not initialized.");
    }
}