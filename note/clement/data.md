# Data

Here we represent the content, what type of data we need, and how it is shaped

---

## Objective Data

Objective data is a static value describing the content, you can think of it being the description of *what* is this data.


### File

Files represent any kind of **task** or documents, a [[#lesson]], the subject of an [[#exercise]] or a [[#project]], the description of [[#quizz]].

One special file would be the meta.json file that describe the multiple attributes of each files.


#### lesson

> Name of the file must be `README.md`

A way to explain a concept, share code examples and links to external references and videos.

A lesson is a markdown file, It doesn't follow any specification other than being valid markdown.

#### exercise

> Name of the file must end with `.exercise.md`

A short practical task with an automated test, exercises must includes tests and instructions to run said tests so the students can validate himself if the exercise is passing.

```md

# Exercise Name

## Subject

Description of the exercise, may include any arbitrary markdown.

## Validation

Description on how to run the tests, includes code that will be run in code blocks.

```


#### project

> Name of the file must end with `.project.md`

Unlike exercises, project have a broader, open goal, as such, they are not easly tested and must be reviewed by hand.

They are usually done in groups and require from a few days to months to complete.

```md

# Project Name

## Subject

Description of the project, may include any arbitrary markdown.

## Validation

Describe the first required elements in markdown

- [ ] first thing to validate
- [ ] other thing to validate
- [ ] *optional thing to validate

```


#### quizz

> Name of the file must end with `.quizz.md`

Quizz are a series of questions with a single valid answer to confirm that a student, if possible quizz should include helpful feedback for wrong answer as the goal is to teach, so tell the student right away what we know he may be missing to get this answer right.

The goal of a quizz is to allow the student to asses if he is understanding a subject.

```md

# Quizz Name

Optional description of the quizz, may include any arbitrary markdown.

## Questions

### What is this ?

- [x] a quizz

- [ ] a project
  > Description of why it's wrong, for example, talk about the difference between projects and quizz

- [ ] something else
  > Description of why it's wrong

### Does coffee include cafeine ?

- [x] yes
- [ ] no
- [ ] only with sugar


```


### Directories

Directories are a structural element, they are used to shape the hierachy of the content.

For example epitech like schools have a **Piscine** module that last for 1 month, a piscine is composed of  series of exercises and projects, this is how we could shape such pedagogical module:

```
.
└── piscine
    ├── 01-introduction
	│   ├── 01-installing.exercise.md
	│   ├── 02-your-first-script.exercise.md
	│   ├── 03-printing-in-the-console.exercise.md
	│   ├── meta.json
    │   └── README.md
	├── 02-variables
	│   ├── 01-declaring.exercise.md
	│   ├── 02-initializing.exercise.md
	│   ├── 03-assigning.exercise.md
	│   ├── meta.json
    │   └── README.md
	├── 03-operators
	│   ├── 01-number-operators.exercise.md
	│   ├── 02-string-operators.exercise.md
	│   ├── 03-other-operators.exercise.md
	│   ├── meta.json
    │   └── README.md
	├── 04-your-first-program.project.md
    └── 05-functions
	│   ├── 01-calling-a-function.exercise.md
	│   ├── 02-declaring-your-own-function.exercise.md
	│   ├── 03-recursion.exercise.md
	│   ├── meta.json
    │   └── README.md
	├── meta.json
    └── README.md

```

#### meta

This `JSON` file includes all extra data we may want to add to better describe the structure, like tags to help indexing or expected time duration.

`JSON` is choose because of it's global support and ability to express arbitrary data so that is stay flexible for future needs.

---

## Subjective Data

Subjective data is additional information relative to the context, for example, dates, place, people.

### Person (student, staff)
- login (unique)
- name (string)
- email (unique)

### Progress
- id (unique, generated, not sure if needed?)
- login (person.login)
- file (path of the file)
- version (sha of the commit)
- event (event.id)

### Group
- id (unique, generated)
- creator (person.login)
- event (event.id)

#### Members
- login (person.login)
- status (pending | accepted)

### Event
- id (unique, generated)
- start (date)
- end  (date)
- registration (time of the registration, 0 = no registration, prior to the start date)
- directory (path of the directory)
- version (sha of the commit)

#### Attendee
- login (person.login)
