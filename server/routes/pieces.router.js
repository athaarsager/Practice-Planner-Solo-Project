const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// GET pieces from database
router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "id", "title", "composer" FROM "pieces" WHERE "user_id" = $1;`;
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
router.delete("/:id", rejectUnauthenticated, (req, res) => {
    const pieceId = req.params.id;
    const queryText =  `DELETE FROM "pieces" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [pieceId, req.user.id])
    .then((result) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log("ERROR in pieces DELETE:", error);
        res.sendStatus(500);
    });
});
// Test further once multiple users have been created

module.exports = router;