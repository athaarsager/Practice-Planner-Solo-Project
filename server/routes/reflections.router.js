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

  module.exports = router;