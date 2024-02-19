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
	"goal" varchar NOT NULL
);


CREATE TABLE "reference_recordings" (
	"id" serial PRIMARY KEY NOT NULL,
    "piece_id" integer REFERENCES "pieces" ("id") ON DELETE CASCADE NOT NULL,
	"url" varchar NOT NULL,
	"interpretation_likes" varchar NOT NULL,
	"interpretation_changes" integer NOT NULL
);


CREATE TABLE "practice_recordings" (
	"id" serial PRIMARY KEY NOT NULL,
	"file_name" varchar NOT NULL,
	"plan_id" integer REFERENCES "practice_plans" ("id")
);


CREATE TABLE "calendar_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"date" date NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"user_id" integer  REFERENCES "users" ("id") ON DELETE CASCADE NOT NULL,
	"practice_plan_id" integer REFERENCES "practice_plans" ("id") ON DELETE CASCADE NOT NULL
);












