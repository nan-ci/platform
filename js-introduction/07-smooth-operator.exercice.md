# Smooth Operator

Your code must use the given variable `smooth` as our initial value

You will declare a few variables:

- `lessSmooth` that is just `1` less than `smooth`
- `semiSmooth` that is the half the amount of `smooth` _(it's still pretty
  smooth)_
- `plus11` that is `smooth` plus `11`
- `ultraSmooth` that is the square of smooth _(now that's smooth !)_

> BGM:
> [Sade - Smooth Operator - Official - 1984](https://www.youtube.com/watch?v=4TYv2PhG89A)

## Tests

### values of the variable are a result of the operations on the variable smooth (`10`)

```js
let smooth = 10
// Your code
equal(lessSmooth, 9)
equal(semiSmooth, 5)
equal(plus11, 21)
```

### values of the variable are a result of the operations on the variable smooth (`27`)

```js
let smooth = 27
// Your code
equal(lessSmooth, 26)
equal(semiSmooth, 13.5)
equal(plus11, 38)
```

### ultraSmooth should be the square of the value of smooth (`10`)

```js
let smooth = 10
// Your code
equal(ultraSmooth, 100)
```

### ultraSmooth should be the square of the value of smooth (`27`)

```js
let smooth = 27
// Your code
equal(ultraSmooth, 729)
```
