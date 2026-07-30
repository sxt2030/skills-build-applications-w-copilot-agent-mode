import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/database';
import apiRouter from './routes/api';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', apiBaseUrl });
});

db.once('open', () => {
  console.log('MongoDB connection open');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;