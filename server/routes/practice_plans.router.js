const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // GET practice plans from database
  router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "practice_plans" WHERE `
  })

  module.exports = router;