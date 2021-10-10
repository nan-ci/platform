# The Great Escape

Nothing can stop you now with that new knowledge. Like Houdini, master of
escapes, you are going to escape some strings:

- Create a `escapeFromDelimiters` that includes all 3 quotes _(`` ` ``, `"` and
  `'`)_.

- Create a `escapeTheEscape` that includes a backslash _(`\`)_.

> “How did I escape? With difficulty. How did I plan this moment? With
> pleasure.” \
> ― Alexandre Dumas, The Count of Monte Cristo

## Tests

### `escapeFromDelimiters` is declared and includes a double-quote

```js
if (typeof escapeFromDelimiters === 'undefined') {
  throw Error(
    `You didn't even define the variable... we've been through this already !`,
  )
}

if (!escapeFromDelimiters.includes('"')) {
  throw Error('escapeFromDelimiters must include a double-quote"')
}
```

### `escapeFromDelimiters` includes a single-quote

```js
if (!escapeFromDelimiters.includes("'")) {
  throw Error("escapeFromDelimiters must include a single-quote'")
}
```

### `escapeFromDelimiters` includes a backtick

```js
if (!escapeFromDelimiters.includes('`')) {
  throw Error('escapeFromDelimiters must include a backtick `')
}
```

### `escapeTheEscape` includes a backslash

```js
if (!new TextEncoder().encode(escapeTheEscape).includes(92)) {
  throw Error('escapeTheEscape must includes a backslash')
}
```

## Notions

- basic programming
