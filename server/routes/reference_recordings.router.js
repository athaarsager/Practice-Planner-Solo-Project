const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET all reference recordings for one piece. Need to pass piece's id into query parameter
router.get("/:id", rejectUnauthenticated, (req, res) => {
    const pieceId = req.params.id;
    const queryText = `
    SELECT "reference_recordings"."url", "reference_recordings"."interpretation_likes", "reference_recordings"."interpretation_changes"
    FROM "reference_recordings"
    JOIN "pieces" ON "pieces"."id" = "reference_recordings"."piece_id"
    WHERE "pieces"."id" = $1 AND "pieces"."user_id" = $2;
    `;
    pool.query(queryText, [pieceId, req.user.id])
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log("ERROR in reference_recordings GET:", error);
        res.sendStatus(500);
    });
});

module.exports = router;