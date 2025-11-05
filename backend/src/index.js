require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.FRONTEND_ORIGIN ? [process.env.FRONTEND_ORIGIN] : [
  'http://localhost:3000',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.send('ok');
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
