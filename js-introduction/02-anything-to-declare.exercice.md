# Anything to declare

All right, before we can embark into this adventure, you are going to tell us
more about yourself using **variables** !

- Declare a variable _indentified_ `age` of a `Number` value of your age
- Declare a variable _indentified_ `name` of a `String` value of your name
- Declare a variable _indentified_ `secureLuggage` of a `Boolean` saying if your
  luggage contain dangerous things or not. _(for obvious security reasons)_

> PS: And please, use reasonable values, or the tests might reject you !

## Tests

Create an `age` variable of your age as a number

```js
equal(typeof age, 'number')
```

Create a `name` variable of your name as a string

```js
equal(typeof name, 'string')
```

Create a `secureLuggage` variable of a boolean

```js
equal(typeof secureLuggage, 'boolean')
```

Values must be reasonable

```js
if (age <= 3) {
  throw Error(`You must be over 3 years old to pass this exericse`)
}

if (age > 99) {
  throw Error(`You are too old for this`)
}

if (name.length <= 1) {
  throw Error('Your name must be more than 1 letter long')
}

if (name.length > 99) {
  throw Error('Your name must be less than 99 letters long')
}

if (secureLuggage === false) {
  throw Error(
    `Do you really believe we are going to let you pass with insecure luggage ?!`,
  )
}
```

## Notions

- basic-programing
- variable
- operator
