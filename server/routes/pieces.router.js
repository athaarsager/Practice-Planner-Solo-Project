const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// GET pieces from database
router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "pieces" WHERE "id" = $1;`;
    pool.query(queryText, [req.user.id])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("ERROR in pieces GET:", error);
        res.sendStatus(500);
    });
});

// Lookup cascade delete because all the other tables are tied to this one

module.exports = router;