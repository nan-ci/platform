# platform

## Setup

- require: nodejs + npm

```bash
# get the code
git clone git@github.com:nan-ci/platform.git
#  or use https://github.com/nan-ci/platform.git

# open the directory
cd platform

# run dev server
npm start
```

## Contribute

### Find or Create an issue

### Create your branch

```bash
git checkout -b feature-name
```

### Rebase before mergeing

```bash
# make sure you are on your branche
git checkout feature-name

# make sure we are up to date
git fetch

# rebase from master
git rebase origin/master

# force update your branch
git push orgin HEAD --force-with-lease
```

### Pull updates on your current branch

```bash
git pull -r --autostash
```

## Linter

### Dependencies

- [`prettier`](https://github.com/prettier/prettier)

### Usage

```bash
# run prettier
prettier -w **.jsx **.js **.md
```

## Test

### Dependencies

- [`fd`](https://github.com/sharkdp/fd) _(find files)_
- [`entr`](https://github.com/eradman/entr) _(watch files)_

### Usage

```bash
# run test in watch mode
npm run dev
```
