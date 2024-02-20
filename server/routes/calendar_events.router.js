const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET all calendar events
router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "calendar_events"."title", "calendar_events"."date", "calendar_events"."start", "calendar_events"."end"
    FROM "calendar_events"
    WHERE "user_id" = $1;
    `;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log("ERROR in calendar_events GET:", error);
        });
});

module.exports = router;