const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET all reference recordings for one piece. Need to pass piece's id into query parameter
router.get("/:id", rejectUnauthenticated, (req, res) => {
    const pieceId = req.params.id;
    const queryText = `
    SELECT "reference_recordings"."url", "reference_recordings"."interpretation_likes", "reference_recordings"."interpretation_changes"
    FROM "reference_recordings"
    JOIN "pieces" ON "pieces"."id" = "reference_recordings"."piece_id"
    WHERE "pieces"."id" = $1 AND "pieces"."user_id" = $2;
    `;
    pool.query(queryText, [pieceId, req.user.id])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("ERROR in reference_recordings GET:", error);
        res.sendStatus(500);
    });
});

// POST new reference recording to database
router.post("/", rejectUnauthenticated, (req, res) => {
    const recording = req.body;
    const queryText = `
    INSERT INTO "reference_recordings" ("piece_id", "url", "interpretation_likes", "interpretation_changes")
    VALUES ($1, $2, $3, $4);
    `;
    pool.query(queryText, [recording.piece_id, recording.url, recording.interpretation_likes, recording.interpretation_changes])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log("ERROR in reference_recordings POST:", error);
        res.sendStatus(500);
    });
});

module.exports = router;