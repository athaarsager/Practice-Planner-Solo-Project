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

  module.exports = router;