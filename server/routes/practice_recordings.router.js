const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET for single practice recording attached to plan
router.get("/:id", rejectUnauthenticated, (req, res) => {
    const recordingId = req.params.id;
    const queryText = `
    SELECT "file_name" FROM "practice_recordings" WHERE "id" = $1;
    `;
    pool.query(queryText, [recordingId])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("ERROR in single practice_recording GET:", error);
        res.sendStatus(500);
    });
});

// GET for most recent practice recording
router.get("/most_recent/:id", rejectUnauthenticated, (req, res) => {
    // Need to send piece id in req.params
    pieceId = req.params.id;
    const queryText = `
    SELECT MAX("practice_recordings"."id") FROM "practice_recordings"
    JOIN "practice_plans" ON "practice_plans"."id" = "practice_recordings"."plan_id"
    WHERE "practice_plans"."piece_id" = $1
    `;
    pool.query(queryText, [pieceId])
    .then((result) => {
        const max = result.rows[0].max;
        const newQueryText = `
        SELECT "file_name" FROM "practice_recordings" WHERE "id" = $1;
        `;
        pool.query(newQueryText, [max])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log("ERROR in getting file_name of most recent practice_recording GET:", error);
        });
    }).catch((error) => {
        console.log("ERROR in first most recent practice_recording GET:", error);
        res.sendStatus(500);
    });
});

// POST (add) new recording
router.post("/upload_file/", rejectUnauthenticated, (req, res) => {
    // Need to send plan Id in req.body
    const queryText = `
    INSERT INTO "practice_recordings" ("file_name", "plan_id")
    VALUES ($1, $2);
    `;
    pool.query(queryText, [req.body.file_name, req.body.plan_id])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log("ERROR in practice_recording POST:", error);
        res.sendStatus(500);
    });
});



module.exports = router;