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

module.exports = router;