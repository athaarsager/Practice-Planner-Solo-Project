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
        res.sendStatus(500);
    });
});

// POST new piece to the database
router.post("/", rejectUnauthenticated, (req, res) => {
    const queryText = `
    INSERT INTO "pieces" ("title", "composer", "user_id")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.body.title, req.body.composer, req.user.id])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log("ERROR in pieces POST:", error);
        res.sendStatus(500);
    });
});

// DELETE piece from database


// Lookup cascade delete because all the other tables are tied to this one

module.exports = router;