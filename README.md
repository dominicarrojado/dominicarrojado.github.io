# Dominic Arrojado - Tech Blog

![CI/CD](https://github.com/dominicarrojado/dominicarrojado.github.io/workflows/CI/CD/badge.svg) [![codecov](https://codecov.io/gh/dominicarrojado/dominicarrojado.github.io/branch/develop/graph/badge.svg?token=6W0VKYWOKI)](https://codecov.io/gh/dominicarrojado/dominicarrojado.github.io)

A static tech blog website built with [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/).

## Quick Start

1. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/).
2. Clone the app:

```bash
git clone git@github.com:dominicarrojado/dominicarrojado.github.io.git
```

3. Install dependencies:

```bash
cd dominicarrojado.github.io
yarn install
```

4. Run the development server:

```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running All Tests

```bash
yarn test
```

## Running Tests (Watch)

```bash
yarn test:watch
```

## Build For Production (Static)

1. Build and generate static files:

```bash
yarn build
yarn export
```

2. The `out` directory can be served by any static hosting service or CDN.
