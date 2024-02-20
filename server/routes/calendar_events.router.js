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
            res.sendStatus(500);
        });
});

router.post("/", rejectUnauthenticated, (req, res) => {
    const queryText = `
    INSERT INTO "calendar_events" ("title", "date", "start", "end", "user_id", "practice_plan_id")
    VALUES ($1, $2, $3, $4, $5, $6);
    `;
    pool.query(queryText, [req.body.title, req.body.date, req.body.start, req.body.end, req.user.id, req.body.practice_plan_id])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log("ERROR in calender_events POST:", error);
        res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
    const eventId = req.params.id;
    const queryText = `
    UPDATE "calendar_events" SET "title" = $1, "date" = $2, "start" = $3, "end" = $4
    WHERE "id" = $5;
    `;
    pool.query(queryText, [req.body.title, req.body.date, req.body.start, req.body.end, eventId])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log("ERROR in calendar_events PUT:", error);
        res.sendStatus(500);
    });
});

module.exports = router;