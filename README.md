# Password Generator (fist version made with Nuxt 2)

[![CI (build)](https://github.com/tats-u/pwgen-legacy/workflows/Build/badge.svg)](https://github.com/tats-u/pwgen-legacy/actions/workflows/build.yml)

<https://tats-u.github.io/pwgen-legacy/>

⚠️WARNING⚠️ This version is abandoned because of the following reasons. You want to use [a new version made with Next.js](https://github.com/tats-u/pwgen/) instead.

- React is much popular among modern developers than Vue.
- Nuxt 3 is too difficult for this project to migrate to.
  - It is much easier and brings a lot of benefits to migrate to Next.js & React.
- It is easier to split components in React than Vue.
- I cannot trust Nuxt from a support standpoint anymore because Nuxt 2 left vulnerabilities in dependent packages unfixed for a long time.

In this generator, you can:

- Adjust the probabilities of appearance of alphabets & numbers & symbols.
- Adjust the length of generated passwords.
- Exclude uppercases or numbers or symbols from generated passwords.
- Customize maybe-contained symbols (except for white space)
- Copy generated passwords by a simple click.

You will be able to (can't for now though):

- Restrict the type of a character next to another charactor.

## Preview

![Preview image](https://user-images.githubusercontent.com/12870451/72742938-0b88ee80-3bee-11ea-8d5c-c39be76c029b.png)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
