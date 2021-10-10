# Hello There

Write a program that displays the exact text Hello There !, any `Number` and a `Boolean`.

## Tests

> Testing your code can be more complicated than your solution. Don't worry, as
> you don't need to understand them.\
> Once you start understanding code a bit, they may clarify what the subject is about.

Log a number in the console

```js
const args = saveArguments(console, 'log')
// Your code
const typeOfLoggedValues = args.flat().map((v) => typeof v)
if (!typeOfLoggedValues.includes('number')) {
  throw Error('you must log a number')
}
```

Log a boolean in the console

```js
const args = saveArguments(console, 'log')
// Your code
const typeOfLoggedValues = args.flat().map((v) => typeof v)
if (!typeOfLoggedValues.includes('boolean')) {
  throw Error('you must log a boolean')
}
```

Log a string in the console

```js
const args = saveArguments(console, 'log')
// Your code
const typeOfLoggedValues = args.flat().map((v) => typeof v)
if (!typeOfLoggedValues.includes('string')) {
  throw Error('you must log a string')
}
```

Log the string `Hello There !` in the console

```js
const args = saveArguments(console, 'log')
// Your code
const loggedValues = args.flat().join(' ')
if (!loggedValues.includes('Hello There !')) {
  throw Error('you must log the text Hello There !')
}
```

## Notions

- language-js
- basic-programing
- variable
