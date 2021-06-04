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
    cours: [{}],
  },
  {
    id: 2,
    name: 'javascript',
    description: '',
    modules: [
      { id: 1, title: 'JavaScript Algorithms and Data Structures', hours: 300,project: null },
      { id: 2, title: 'APIs and Microservices', hours: 200,project: null },
    ],
    cours: [
      {
        id: 1,
        idModule: 1,
        title: 'introduction to variables',
        description:
          'this cours is an introduction to variables , here you will learn how to declare variables ',
        videoLink: 'https://www.youtube.com/embed/1jT3EQVJOBA',
        ressources:[
          {
          name:"livre pdf",
          link:""
        },
        {
          name:"recherche mdn",
          link:"https://djmjdfkjdf"
        }
      ],
        quizz: [],
        livecoding: [],
      },
      {
        id: 2,
        idModule: 1,
        title: 'data types of variables',
        description: 'this cours talk about of data types in variables',
        videoLink:  'https://www.youtube.com/embed/1jT3EQVJOBA',
        ressources:[],
        quizzs: [{}],
        livecoding: null,
      },
      {
        id: 2,
        idModule: 1,
        title: 'data types of variables',
        description: 'this cours talk about of data types in variables',
        videoLink: 'https://qkdfmjqdflj',
        quizz: {},
        livecoding: null,
      },
      {
        id: 2,
        idModule: 1,
        title: 'data types of variables',
        description: 'this cours talk about of data types in variables',
        videoLink: 'https://qkdfmjqdflj',
        quizz: {},
        livecoding: null,
      },
      {
        id: 2,
        idModule: 1,
        title: 'data types of variables',
        description: 'this cours talk about of data types in variables',
        videoLink: 'https://qkdfmjqdflj',
        quizz: {},
        livecoding: null,
      },
      {
        id: 2,
        idModule: 1,
        title: 'data types of variables',
        description: 'this cours talk about of data types in variables',
        videoLink: null,
        quizz: {},
        livecoding: null,
      },
      {
        id: 3,
        idModule: 2,
        title: 'Api',
        description: 'this cours talk about of Api in variables',
        videoLink: 'https://www.youtube.com/embed/1jT3EQVJOBA',
        quizz: {},
        livecoding: null,
      },
      {
        id: 4,
        idModule: 2,
        title: 'Micro services',
        description: 'this cours talk about micro services in variables',
        videoLink: 'https://qkdfmjqdflj',
        quizz: {},
        livecoding: null,
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
  },
]
