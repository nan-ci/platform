export const courses = [
  {
    id: 1,
    name: 'python',
    title: 'Getting started with javascript',
    description: '',
    content: [],
    curriculum: [
      { id: 1, title: 'Scientific Computing with Python', hours: 300 },
      { id: 2, title: 'Data Analysis with Python', hours: 300 },
      { id: 3, title: 'Machine Learning with Python', hours: 300 },
    ],
  },
  {
    id: 2,
    name: 'javascript',
    title: 'Learn Javascript',
    description: '',
    content: [],
    curriculum: [
      { id: 1, title: 'JavaScript Algorithms and Data Structures', hours: 300 },
      { id: 2, title: 'APIs and Microservices', hours: 200 },
    ],
  },
  {
    id: 3,
    name: 'flutter',
    title: 'Learn flutter',
    description: '',
    curriculum: [
      { id: 1, title: 'Getting started with Flutter', hours: 300 },
      { id: 2, title: 'Advanced Flutter', hours: 300 },
    ],
  },
  {
    id: 4,
    name: 'frontend',
    title: 'Become a frontend developer',
    content: [],
    curriculum: [
      { id: 1, title: 'Responsive Web Design', hours: 300 },
      { id: 2, title: 'Front End Development Libraries', hours: 300 },
    ],
    challenges: [
      {
        id: 1,
        title: 'Front End Development Libraries Projects',
        description:
          "It's time to put your front end development libraries skills to the test.\nUse your front end development knowledge(React, VueJS, AngularJS)\nto build these projects.",
        kata: [
          {
            id: 1,
            title: 'Build a Random Quote Machine',
            description:
              'You can use any mix of HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux, and jQuery to complete this project. You should use a frontend framework (like React for example).',
            submited: true,
          },
          {
            id: 2,
            title: 'Build a Markdown Previewer',
            description:
              'You can use any mix of HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux, and jQuery to complete this project. You should use a frontend framework (like React for example).',
            submited: false,
          },
          {
            id: 3,
            title: 'Build a Javascript Calculator',
            description:
              'You can use any mix of HTML, JavaScript, CSS, Bootstrap, SASS, React, Redux, and jQuery to complete this project. You should use a frontend framework (like React for example).',
            submited: false,
          },
        ],
      },
      {
        id: 2,
        title: 'Front End Development Quizz',
        description:
          "It's time to put your front end development skills to the test.",
        kata: [],
      },
    ],
  },
]
