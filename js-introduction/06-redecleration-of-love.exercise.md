# Redecleration of love

## Instructions

The variable `love` has been declared and will be used during the tests.

You must try to re-assign the `love` variable to the string value
`I still love you !!` but without re-declaring it !

> Note that sometimes you may find variable declared with `const`. This means
> that the assignation is constant and can never be re-assigned !
>
> It is used to protect your code against errors, but you can always use `let`
> in its place.
>
> Also you may find online old code using `var`. We are trying to get rid of
> `var`'s since 2015. It's a old syntax and it was pretty problematic. Never
> use it! If you see code using it, try to find a more recent example. This one
> is outdated.

## Tests

### The value of `love` must have changed

```js
let love = 'You used to love me !!'
// Your code
equal(love, 'I still love you !!')
```

## Notions

- basic programming
- variable re-assignation
- keyword const
- keyword let
