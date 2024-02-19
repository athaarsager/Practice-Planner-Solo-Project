-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- database name = "practice_planner"
CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar(250) NOT NULL UNIQUE,
	"password" varchar(250) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "pieces" (
	"id" serial NOT NULL,
	"title" varchar NOT NULL,
	"composer" varchar NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "pieces_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "practice_plans" (
	"id" serial NOT NULL,
	"piece_id" integer NOT NULL,
	"section" varchar NOT NULL,
	"problems" varchar NOT NULL,
	"plan" varchar NOT NULL,
	"goal" varchar NOT NULL,
	CONSTRAINT "practice_plans_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "reference_recordings" (
	"id" serial NOT NULL,
	"url" varchar NOT NULL,
	"interpretation_likes" varchar NOT NULL,
	"interpretation_changes" integer NOT NULL,
	"piece_id" integer NOT NULL,
	CONSTRAINT "reference_recordings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "practice_recordings" (
	"id" serial NOT NULL,
	"file_name" varchar NOT NULL,
	"plan_id" integer NOT NULL,
	CONSTRAINT "practice_recordings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "calendar_events" (
	"id" serial NOT NULL,
	"title" varchar NOT NULL,
	"date" date NOT NULL,
	"start" timestamp NOT NULL,
	"end" timestamp NOT NULL,
	"user_id" integer NOT NULL,
	"practide_plan_id" integer NOT NULL,
	CONSTRAINT "calendar_events_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "pieces" ADD CONSTRAINT "pieces_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "practice_plans" ADD CONSTRAINT "practice_plans_fk0" FOREIGN KEY ("piece_id") REFERENCES "pieces"("id");

ALTER TABLE "reference_recordings" ADD CONSTRAINT "reference_recordings_fk0" FOREIGN KEY ("piece_id") REFERENCES "pieces"("id");

ALTER TABLE "practice_recordings" ADD CONSTRAINT "practice_recordings_fk0" FOREIGN KEY ("plan_id") REFERENCES "practice_plans"("id");

ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_fk1" FOREIGN KEY ("practide_plan_id") REFERENCES "practice_plans"("id");












