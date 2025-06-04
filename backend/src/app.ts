import express from 'express';
import userRoutes from './routes/user.routes';
import humanizerRoutes from "./routes/humanizer.routes";

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/', humanizerRoutes);
app.use('/api/users', userRoutes);

export default app;