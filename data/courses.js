export const courses = [
  {
    id: 1,
    name: 'python',
    description: '',
    modules: [
      { id: 1, title: 'Scientific Computing with Python', hours: 300 },
      { id: 2, title: 'Data Analysis with Python', hours: 300 },
      { id: 3, title: 'Machine Learning with Python', hours: 300 },
    ],
    challenges: [
      {
        id: 1,
        title: 'Python Principles',
        description:
          'Practice your Python skills with these programming challenges. The tasks are\nmeant to be challenging for beginners. If you find them too difficult, try\ncompleting our lessons for beginners first',
        kata: [
          {
            id: 1,
            title: 'All equal',
            description:
              'Define a function that takes a list and checks whether all elements in the list are the same',
            submited: false,
          },
          {
            id: 2,
            title: 'Capital indexes',
            description:
              'Write a function that takes a single parameter, which is a string. Your function should return a list of all the indexes in the string that have capital letters.',
            submited: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'javascript',
    description: '',
    modules: [
      {
        id: 1,
        title: 'JavaScript Algorithms and Data Structures',
        description: 'this a module that talk about the begining',
        hours: 300,
        codeColor: '#dbb958',
        project: null,
      },
      {
        id: 2,
        title: 'APIs and Microservices',
        description: 'this a module that talk about the begining',
        hours: 200,
        codeColor: '#5886db',
        project: null,
      },
      {
        id: 3,
        title: 'React js and Vue js',
        description:
          'this a module of react and vue a js framework for front-end',
        hours: 200,
        codeColor: '#90db58',
        project: null,
      },
    ],
    cours: [
      {
        id: 1,
        idModule: 1,
        title: 'introduction to variables',
        description:
          'this cours is an introduction to variables , here you will learn how to declare variables ',
        videoLink: 'https://vjs.zencdn.net/v/oceans.mp4',
        ressources: [
          {
            name: 'livre pdf',
            link: '',
          },
          {
            name: 'recherche mdn',
            link: 'https://djmjdfkjdf',
          },
        ],
      },
      {
        id: 2,
        idModule: 1,
        title: 'data types of variables',
        description: 'this cours talk about of data types in variables',
        videoLink: 'https://vjs.zencdn.net/v/oceans.mp4',
        ressources: [],
      },
      {
        id: 3,
        idModule: 1,
        title: 'let and const',
        description: '',
        videoLink: 'https://vjs.zencdn.net/v/oceans.mp4',
      },
      {
        id: 4,
        idModule: 1,
        title: 'portées des variables',
        description: 'this cours talk about of data types in variables',
        videoLink: 'https://vjs.zencdn.net/v/oceans.mp4',
      },
      {
        id: 5,
        idModule: 2,
        title: 'Api',
        description: 'this cours talk about of Api in variables',
        videoLink: 'https://vjs.zencdn.net/v/oceans.mp4',
      },
      {
        id: 6,
        idModule: 2,
        title: 'Micro services',
        description: 'this cours talk about micro services in variables',
        videoLink: 'https://vjs.zencdn.net/v/oceans.mp4',
      },
    ],
    challenges: [
      {
        id: 1,
        title: 'Javascript basics',
        description:
          'This series of challenges covers the very basics of Javascript',
        kata: [
          {
            id: 1,
            title: 'Check if a number is even',
            description:
              'Write a function that takes a number as argument. If the number is even, return true',
            submited: false,
          },
          {
            id: 2,
            title: 'Split a number into its digits',
            description: '',
            submited: true,
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 1,
        name: 'variables',
        questions: {
          'what is javascript': {
            'a code': true,
            'a language': true,
            'a many': false,
          },
          'what is dom': {
            'a javascript element': true,
            'a code': false,
            'a many': false,
          },
          'what is dom 2': {
            'a javascript element': true,
            'a code': false,
            'a many': false,
          },
          'what is dom 3': {
            'a javascript element': true,
            'a code': false,
            'a many': false,
          },
          'what is dom 4': {
            'a javascript element': true,
            'a code': false,
            'a many': false,
          },
          'what is dom 5': {
            'a javascript element': true,
            'a code': false,
            'a many': false,
          },
        },
        beginDate:
          'Mon Jun 21 2021 14:00:00 GMT+0000 (heure moyenne de Greenwich)',
        endDate:
          'Fri Jun 25 2021 16:00:00 GMT+0000 (heure moyenne de Greenwich)',
        duration: '15:00',
        percentOfValidation: 60,
      },
      {
        id: 2,
        name: 'conditions',
        questions: {
          'what is python': {
            'a code': false,
            'a language': true,
            'a many': false,
          },
          'what is nodejs': {
            'a framework': false,
            'a language': false,
            'a many': false,
            'a javascript work environnement': true,
          },
        },
        beginDate:
          'Tue Jun 22 2021 08:00:00 GMT+0000 (heure moyenne de Greenwich)',
        endDate:
          'Thu Jun 24 2021 16:00:00 GMT+0000 (heure moyenne de Greenwich)',
        duration: '15:00',
        percentOfValidation: 60,
      },
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
    challenges: [
      {
        id: 1,
        title: 'Flutter Repl Challenge',
        description:
          'Show your Flutter skills by building beautiful UIs on Repl.it',
        kata: [
          {
            id: 1,
            title: 'Login and Register page',
            description:
              'Try to create a beautiful login and register page on repl.it',
            submited: false,
          },
          {
            id: 1,
            title: 'World Clock',
            description: 'Try to create a beautiful world clock on repl.it',
            submited: true,
          },
        ],
      },
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
