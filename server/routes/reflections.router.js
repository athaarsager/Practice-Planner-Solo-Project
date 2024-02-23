const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  // Route for retrieving selected reflection
  router.get("/:id", rejectUnauthenticated, (req, res) => {
    // Need reflection id in req. params
    const reflectionId = req.params.id;
    const queryText = `
    SELECT "went_well", "needs_work" FROM "reflections"
    WHERE "id" = $1;
    `;
    pool.query(queryText, [reflectionId])
    .then((response) => {
        res.send(response.rows);
    }).catch((error) => {
        console.log("ERROR in reflections GET:", error);
        res.sendStatus(500);
    });
  });

  // POST route for new reflection
  router.post("/", rejectUnauthenticated, (req, res) => {
    const queryText = `
    INSERT INTO "reflections" ("went_well", "needs_work", "plan_id")
    VALUES ($1, $2, $3);
    `;
    pool.query(queryText, [req.body.went_well, req.body.needs_work, req.body.plan_id])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log("ERROR in reflections POST:", error);
        res.sendStatus(500);
    });
  });

  // PUT route for editing existing reflection
  router.put("/:id", rejectUnauthenticated, (req, res) => {
    // need plan id in req.params
    const planId = req.params.id;
    const queryText =  `
    UPDATE "reflections" SET "went_well" = $1, "needs_work" = $2
    WHERE "id" = $3;
    `;
    pool.query(queryText, [req.body.went_well, req.body.needs_work, planId])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log("ERROR in reflections PUT:", error);
        res.sendStatus(500);
    });
  });

  module.exports = router;