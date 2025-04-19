-- this file is for reference, to see the structure of the database

CREATE TABLE public.recipe (
  id serial4 NOT NULL,
  "name" varchar(255) NOT NULL,
  description varchar(255) NULL,
  "sourceURL" varchar(255) NULL,
  picture varchar NULL,
  rating int4 NULL,
  steps varchar(255) NULL,
  CONSTRAINT recipe_name_unique UNIQUE (name),
  CONSTRAINT recipe_pkey PRIMARY KEY (id)
);

CREATE TABLE public.ingredient (
	id serial4 NOT NULL,
	"recipeId" int4 NOT NULL,
	quantity int4 NOT NULL,
	unit text NOT NULL,
	description varchar(255) NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT recipe_ingredient_pkey PRIMARY KEY (id),
	CONSTRAINT recipe_ingredient_unit_check CHECK ((unit = ANY (ARRAY['ml'::text, 'g'::text, 'un'::text]))),
	CONSTRAINT recipe_ingredient_recipeid_foreign FOREIGN KEY ("recipeId") REFERENCES public.recipe(id)
);