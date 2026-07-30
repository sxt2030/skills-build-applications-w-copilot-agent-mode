import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API', baseUrl });
});

// keep connection alive
db.once('open', () => {
  console.log('MongoDB connection open');
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

export default app;
