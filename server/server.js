const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const piecesRouter = require("./routes/pieces.router");
const practicePlansRouter = require("./routes/practice_plans.router");
const referenceRecordingsRouter = require("./routes/reference_recordings.router")

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use("/api/pieces", piecesRouter);
app.use("/api/practice_plans", practicePlansRouter);
app.use("/api/reference_recordings", referenceRecordingsRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
