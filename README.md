# Devstack: Vue 3 + Typescript + Vite + Naive UI (BE: NestJS)

This dashboard template should help get you started developing with Vue 3 in Vite (+ NaiveUI). 

**This template is based on a nodeJS back-end (NestJS) [available soon]() for authentication, authorization and data example.**

## What does this template include (dependencies)

- Vue 3: Template is completly build with latest vue 3 features like Single file component and  `<script setup>` mode which makes your code much more clean and readable.
- [Vite](https://github.com/vitejs/vite): Next Generation Frontend Tooling
- [Naive UI](https://github.com/TuSimple/naive-ui): A Vue 3 Component Library
- [Pinia Store](https://github.com/vuejs/pinia): Intuitive, type safe and flexible Store for Vue
- [Vue Router](https://github.com/vuejs/router) 
- Typescript: The whole project is written with typescipt modular form.

## Features

- Authentication and authorization with a nodeJS (NestJS) back-end
- Fetching user after a manual page refresh
- Preloader while fetching user data
- HTTP requests with axios
- Authorization (JWT Token)
  - Access token
  - Refresh token
  - Auth refresh token
- Users
    - List
    - Create
    - View

- [ ] More to come

## Project Setup
We recommend using yarn

``
edit .env with your API URL
``

```sh
npm install
yarn install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
yarn lint
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).
