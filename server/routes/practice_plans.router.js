const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET practice plans from database
router.get("/:id", rejectUnauthenticated, (req, res) => {
    const pieceId = req.params.id;
    console.log("This is the pieceId:", pieceId);
    const queryText = `
    SELECT "practice_plans"."id", "practice_plans"."section", "practice_plans"."problems", "practice_plans"."plan", "practice_plans"."goal", "practice_plans"."reflection_written" FROM "practice_plans"
    JOIN "pieces" ON "pieces"."id" = "practice_plans"."piece_id"
    WHERE "pieces"."user_id" = $1 AND "practice_plans"."piece_id" = $2
    ORDER BY "practice_plans"."id" DESC;`;
    pool.query(queryText, [req.user.id, pieceId])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log("ERROR in practice_plans GET:", error);
            res.sendStatus(500);
        });
});

// GET SINGLE plan for detail view/editing
router.get("/plan/:id", rejectUnauthenticated, (req, res) => {
    const planId = req.params.id;
    const queryText = `
    SELECT "practice_plans"."section", "practice_plans"."problems", "practice_plans"."plan", "practice_plans"."goal" FROM "practice_plans"
    JOIN "pieces" ON "pieces"."id" = "practice_plans"."piece_id"
    WHERE "pieces"."user_id" = $1 AND "practice_plans"."id" = $2; 
    `;
    pool.query(queryText, [req.user.id, planId])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("ERROR in SINGLE practice_plan GET:", error);
        res.sendStatus(500);
    });
});


// POST new practice plan
router.post("/", rejectUnauthenticated, (req, res) => {
    // Need to make sure to send the piece id in req.body
    const piece = req.body;
    const queryText = `
    INSERT INTO "practice_plans" ("piece_id", "section", "problems", "plan", "goal")
    VALUES ($1, $2, $3, $4, $5);
    `;
    pool.query(queryText, [piece.piece_id, piece.section, piece.problems, piece.plan, piece.goal])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log("ERROR in practice_plans POST:", error);
        });
});

// POST new practice plan AND its associated calendar event
router.post("/event", rejectUnauthenticated, (req, res) => {
    // req.body will be an object whose keys are also objects
    const newPlan = req.body.newPlan;
    console.log("This is newPlan:", newPlan);
    const queryText = `
    INSERT INTO "practice_plans" ("piece_id", "section", "problems", "plan", "goal")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING "id";
    `;
    pool.query(queryText, [newPlan.piece_id, newPlan.section, newPlan.problems, newPlan.plan, newPlan.goal])
    .then((result) => {
        const newEvent = req.body.newEvent;
        // the retrieve id = result.rows[0].id
        const newPlanId = result.rows[0].id;
        const newQueryText = `
        INSERT INTO "calendar_events" ("title", "date", "start", "end", "user_id", "practice_plan_id")
        VALUES ($1, $2, $3, $4, $5, $6);
        `;
        pool.query(newQueryText, [newEvent.title, newEvent.date, newEvent.start, newEvent.end, req.user.id, newPlanId])
        .then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log("ERROR in POSTING new calendar event in dual post:", error);
        })
    }).catch((error) => {
        console.log("ERROR in POSTING new practice_plan with event:", error);
        res.sendStatus(500);
    });

});

// PUT (edit) existing plan
router.put("/:id", rejectUnauthenticated, (req, res) => {
    const planId = req.params.id;
    const piece = req.body;
    const queryText = `
    UPDATE "practice_plans" SET "section" = $1, "problems" = $2, "plan" = $3, "goal" = $4
    WHERE "id" = $5;  
    `;
    pool.query(queryText, [piece.section, piece.problems, piece.plan, piece.goal, planId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log("ERROR in practice_plans PUT:", error);
        });
});

// Delete route for practice_plans
router.delete("/:id", rejectUnauthenticated, (req, res) => {
    const planId = req.params.id;
    const queryText = `
    DELETE FROM "practice_plans" WHERE "id" = $1;
    `;
    pool.query(queryText, [planId])
        .then((result) => {
            res.sendStatus(204);
        }).catch((error) => {
            console.log("ERROR in practice_plans DELETE:", error);
        });
});

module.exports = router;