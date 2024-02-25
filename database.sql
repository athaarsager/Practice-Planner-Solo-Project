-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- database name = "practice_planner"
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(250) NOT NULL UNIQUE,
	"password" varchar(250) NOT NULL
);



CREATE TABLE "pieces" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"composer" varchar NOT NULL,
	"user_id" integer REFERENCES "users" ("id") ON DELETE CASCADE NOT NULL
);


CREATE TABLE "practice_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"piece_id" integer REFERENCES "pieces" ("id") ON DELETE CASCADE NOT NULL,
	"section" varchar NOT NULL,
	"problems" varchar NOT NULL,
	"plan" varchar NOT NULL,
	"goal" varchar NOT NULL,
	"reflection_written" boolean NOT NULL DEFAULT false
);


CREATE TABLE reflections (
    id SERIAL PRIMARY KEY,
    went_well character varying NOT NULL,
    needs_work character varying NOT NULL,
    plan_id integer NOT NULL REFERENCES practice_plans(id) ON DELETE CASCADE UNIQUE
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX reflections_pkey ON reflections(id int4_ops);
CREATE UNIQUE INDEX reflections_plan_id_key ON reflections(plan_id int4_ops);


CREATE TABLE "reference_recordings" (
	"id" serial PRIMARY KEY NOT NULL,
    "piece_id" integer REFERENCES "pieces" ("id") ON DELETE CASCADE NOT NULL,
	"url" varchar NOT NULL,
	"interpretation_likes" varchar NOT NULL,
	"interpretation_changes" varchar NOT NULL
);


CREATE TABLE "practice_recordings" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" varchar NOT NULL,
	"plan_id" integer REFERENCES "practice_plans" ("id") ON DELETE CASCADE
);


CREATE TABLE calendar_events (
    id SERIAL PRIMARY KEY,
    title character varying NOT NULL,
    date date NOT NULL,
    start timestamp without time zone NOT NULL,
    "end" timestamp without time zone NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    practice_plan_id integer REFERENCES practice_plans(id) ON DELETE CASCADE,
    piece_id integer NOT NULL REFERENCES pieces(id) ON DELETE CASCADE
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX calendar_events_pkey ON calendar_events(id int4_ops);












