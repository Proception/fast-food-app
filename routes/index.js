import Response from '../models/response';

const express = require('express');

const router = express.Router();

let response;

// All request for fallback
router.all('/', (req, res) => {
  // console.log(req);
  response = new Response('ok', 404, 'Requeted URL does not exist', '');

  res.status(response.code).json(response);
});

export default router;
