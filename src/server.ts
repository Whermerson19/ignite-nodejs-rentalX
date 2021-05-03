import express from 'express';
import appRouter from './routes';

const app = express()
app.use(express.json())

app.listen(3333, () => console.log("server is running"))

app.use(appRouter);