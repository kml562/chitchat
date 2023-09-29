import dotenv from 'dotenv';
dotenv.config();

import app from "./app.js";
import { startServer } from './config/database.js';

const {port,uri}= process.env


startServer(app,port,uri)