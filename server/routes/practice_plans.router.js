const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET practice plans from database
router.get("/", rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT "practice_plans"."section", "practice_plans"."problems", "practice_plans"."plan", "practice_plans"."goal" FROM "practice_plans"
    JOIN "pieces" ON "pieces"."id" = "practice_plans"."piece_id"
    WHERE "pieces"."user_id" = $1; `;
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log("ERROR in practice_plans GET:", error);
            res.sendStatus(500);
        });
});

// GET SINGLE plan for detail view/editing
router.get("/:id", rejectUnauthenticated, (req, res) => {
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