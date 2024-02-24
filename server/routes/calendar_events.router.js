const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET all calendar events
router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "calendar_events"."id", "calendar_events"."title", "calendar_events"."start", "calendar_events"."end"
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

// Get single event for editing
router.get("/:id", rejectUnauthenticated, (req, res) => {
    const eventId = req.params.id;
    const queryText = `
    SELECT "calendar_events"."id", "calendar_events"."piece_id", "calendar_events"."title", "calendar_events"."date", "calendar_events"."start", "calendar_events"."end"
    FROM "calendar_events" WHERE "calendar_events"."id" = $1 AND "user_id" = $2;
    `;
    pool.query(queryText, [eventId, req.user.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log("ERROR in single calendar event GET:", error);
            res.sendStatus(500);
        });
});

router.post("/", rejectUnauthenticated, (req, res) => {
    console.log("This is the req.body.title:", req.body.title);
    const queryText = `
    SELECT "id" FROM "pieces" WHERE "title" = $1;
    `;
    pool.query(queryText, [req.body.title])
        .then((result) => {
            const pieceId = result.rows[0].id;
            console.log("this is the result.rows:", pieceId);
            const newQueryText = `
    INSERT INTO "calendar_events" ("piece_id", "title", "date", "start", "end", "user_id", "practice_plan_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
            console.log(req.body.date);
            pool.query(newQueryText, [pieceId, req.body.title, req.body.date, req.body.start, req.body.end, req.user.id, req.body.practice_plan_id])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log("ERROR in calendar_events POST:", error);
        })
    }).catch((error) => {
            console.log("ERROR in calender_events POST, get portion:", error);
            res.sendStatus(500);
        });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "id" FROM "pieces" WHERE "title" = $1;
    `;
    pool.query(queryText, [req.body.title])
        .then((result) => {
            const pieceId = result.rows[0];
            const eventId = req.params.id;
            const newQueryText = `
    UPDATE "calendar_events" SET "piece_id" = $1, "title" = $2, "date" = $3, "start" = $4, "end" = $5
    WHERE "id" = $6;
    `;
            pool.query(newQueryText, [pieceId, req.body.title, req.body.date, req.body.start, req.body.end, eventId])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log("ERROR in calandar_events PUT:", error);
            res.sendStatus(500);
        })
    }).catch((error) => {
            console.log("ERROR in calendar_events PUT, get portion:", error);
            res.sendStatus(500);
        });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
    const eventId = req.params.id;
    const queryText = `
    DELETE FROM "calendar_events" WHERE "id" = $1;
    `;
    pool.query(queryText, [eventId])
        .then(() => {
            res.sendStatus(204);
        }).catch((error) => {
            console.log("ERROR in calendar_events DELETE:", eror);
            res.sendStatus(500);
        });
});

module.exports = router;