---
title: 'Local development setup for Next.js projects with TypeScript and TailwindCSS'
date: '2022-07-20'
excerpt: 'A quick way to get started with the React framework for production'
category: 'technology'
videoUrl: ''
---

## Introduction

[Next.js](https://reactjs.org/) is a [React](https://reactjs.org/) framework that gives you the best developer experience with all the features you need for production: hybrid static and server rendering, [TypeScript](https://www.typescriptlang.org/) support, smart bundling, route pre-fetching, and more. This is a guide on how to set up a local development for Next.js projects with TypeScript support and [TailwindCSS](https://tailwindcss.com/). TailwindCSS is a utility-first CSS framework to rapidly build modern websites without ever leaving your HTML. Along with the setup, we'll configure [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for writing component and unit tests. This also involves extensions and libraries that helps us write our code efficiently.

## Skip

If you don't want to go through the steps below and you just want to get the boilerplate to save time, you can [clone it here](https://github.com/dominicarrojado/nextjs-typescript-tailwindcss-boilerplate) or run the [git](https://git-scm.com/) command below:

```bash
git clone git@github.com:dominicarrojado/nextjs-typescript-tailwindcss-boilerplate.git my-app
```

Don't forget to ⭐ and share the [repo](https://github.com/dominicarrojado/nextjs-typescript-tailwindcss-boilerplate) if you like it!

## Prerequisites

By the way, upon writing this post, I assume that you have some web development background and basic knowledge regarding [npm](https://www.npmjs.com/), [yarn](https://classic.yarnpkg.com/lang/en/), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [TailwindCSS](https://tailwindcss.com/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [Next.js](https://reactjs.org/) and [Jest](https://jestjs.io/).

Some prerequisites below. Make sure to install them in your system if you haven't!

- [Visual Studio Code](https://code.visualstudio.com/)
- [Yarn](https://classic.yarnpkg.com/lang/en/)

We'll be using [Visual Studio Code](https://code.visualstudio.com/) as our [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) in this tutorial as we will utilize a few extensions from their [marketplace](https://marketplace.visualstudio.com/vscode). And we'll use [Yarn](https://classic.yarnpkg.com/lang/en/) as our package manager, it's just like [npm](https://www.npmjs.com/) but _faster_.

## Initialize your project

The easiest way to get started with Next.js is by using [Create Next App](https://nextjs.org/docs/api-reference/create-next-app). This [CLI](https://en.wikipedia.org/wiki/Command-line_interface) tool enables us to quickly start building a new Next.js application, with everything set up for us. To create our project with TypeScript support, run this command in your terminal:

```bash
yarn create next-app --typescript
```

Open the created project in your Visual Studio Code. Then open the terminal in Visual Studio Code. The keyboard shortcut would be ` Ctrl` + `` ` ``.

Then, let's run our project to see if everything is working fine:

```bash
yarn dev
```

This command will start the development server. You can visit [http://localhost:3000](http://localhost:3000) on your browser to view the application. The page should show something like this:

![Screenshot of Create Next App default page](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/create-next-app-default-page.png)

This setup comes with live-editing or hot reloading which means when we save file changes, it will automatically update the app in your browser. That's great for local development!

---

## Install ES7 React Snippets extension in Visual Studio Code

Next, let's install [ES7 React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets). You can think of it like a shortcut that helps you create the basic structure of a component in React, for example I want to create a functional component, I have to write the code to import React first, then write the function component then lastly write the code to export it. With this extension, I can easily achieve the same by typing `rfce` and it will show a suggestion for `reactFunctionalComponentExport` and I just have to press _ENTER_ and it will write the code for us. This saves us time and energy when writing components.

Click on the "Extensions" tab and look for "ES7 React" and install it. You can also install it via this [link](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets).

![Screenshot of how to install ES7 React Snippets extension in Visual Studio Code](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/install-es7-react-snippets-extension-in-visual-studio-code.png)

## Set up Prettier

Now, let's set up [Prettier](https://prettier.io/). It's a code formatter that formats the code for us when we save file changes which is another time-saver.

In Visual Studio Code, click on the "Extensions" tab and look for "Prettier" and install it. You can also install it via this [link](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

![Screenshot of how to install Prettier extension in Visual Studio Code](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/install-prettier-extension-in-visual-studio-code.png)

After Prettier is installed, we still need to enable the formatting feature by updating our settings in Visual Studio Code. Create a file `.vscode/settings.json` and update it with the following code below:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2
}
```

Feel free to modify `editor.tabSize` as that can be changed according to your preference.

Then, create another file `.prettierrc` in the root directory and add the following code below:

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "arrowParens": "always",
  "tabWidth": 2
}
```

This will be the config for Prettier to follow when formatting the code. These configs can be updated according to your preference.

Next.js provides an integrated [ESLint](https://nextjs.org/docs/basic-features/eslint) experience out of the box. ESLint also contains code formatting rules, which can conflict with our existing Prettier setup. It is recommended to include [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) in your ESLint config to make ESLint and Prettier work together.

First, install the dependency:

```bash
yarn add --dev eslint-config-prettier
```

Then, add `prettier` to your existing ESLint config `.eslintrc.json`:

```json
{
  "extends": ["next", "next/core-web-vitals", "prettier"]
}
```

To exclude files from formatting, create a `.prettierignore` file in the root of your project. Let's create one and add the following code:

```
.next
out
coverage
```

Alright, once the changes are done. That should make our Prettier work.

---

## Set up TailwindCSS

To configure Tailwind manually, first install `tailwindcss` and its peer dependencies via yarn, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

```bash
yarn add --dev tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then, let's add the paths to all of our template files in our `tailwind.config.js` file.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  ...
};
```

Next, let's add the `@tailwind` directives for each of Tailwind's layers to our `styles/globals.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now that we're using TailwindCSS, we no longer need `styles/Home.module.css`, so let's delete it.

Then update `pages/index.tsx` to use TailwindCSS classes instead of using [CSS Modules](https://github.com/css-modules/css-modules):

```tsx
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="px-8">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center min-h-screen py-16">
        <h1 className="text-center text-6xl">
          Welcome to{' '}
          <a
            href="https://nextjs.org"
            className="text-blue-600 hover:underline"
          >
            Next.js!
          </a>
        </h1>

        <p className="my-16 text-center text-2xl">
          Get started by editing{' '}
          <code className="rounded bg-slate-50 p-3 text-lg font-mono">
            pages/index.tsx
          </code>
        </p>

        <div className="flex flex-col flex-wrap justify-center items-center max-w-full sm:flex-row sm:max-w-2xl">
          <a
            href="https://nextjs.org/docs"
            className="max-w-[300px] m-4 p-6 text-left text-inherit border border-slate-200 rounded-lg transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            <h2 className="mb-4 text-2xl">Documentation &rarr;</h2>
            <p className="text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="max-w-[300px] m-4 p-6 text-left text-inherit border border-slate-200 rounded-lg transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            <h2 className="mb-4 text-2xl">Learn &rarr;</h2>
            <p className="text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="max-w-[300px] m-4 p-6 text-left text-inherit border border-slate-200 rounded-lg transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            <h2 className="mb-4 text-2xl">Examples &rarr;</h2>
            <p className="text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="max-w-[300px] m-4 p-6 text-left text-inherit border border-slate-200 rounded-lg transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            <h2 className="mb-4 text-2xl">Deploy &rarr;</h2>
            <p className="text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex flex-1 justify-center items-center py-8 border-t border-slate-200">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-grow justify-center items-center"
        >
          Powered by{' '}
          <span className="h-[1em] ml-2">
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
```

---

[Image Optimization](https://nextjs.org/docs/basic-features/image-optimization) is not compatible with `next export` which is what we're going to use later for the build and deployment. Hence, we are using `<img />` here instead of `<Image />` from `next/image`. Although, using `<img />` in the code will trigger an ESLint rule violation, so we need to update `.eslintrc.json` to disable that rule:

```json
{
  "extends": ["next", "next/core-web-vitals", "prettier"],
  "rules": {
    "@next/next/no-img-element": "off"
  }
}
```

Open your browser to check if our application is still working fine and looks the same as before. It should still work fine although it won't be a 100% accurate as before but at least we're now using TailwindCSS classes in the code and that's what matters.

For a better development experience with TailwindCSS, look for "Tailwind CSS IntelliSense" in the "Extensions" tab of Visual Studio Code and install it. You can also install it via this [link](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).

![Screenshot of how to install Tailwind CSS IntelliSense extension in Visual Studio Code](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/install-tailwind-css-intellisense-extension-in-visual-studio-code.png)

## Set up Jest and React Testing Library

Jest and React Testing Library are frequently used together for Unit and Component Testing. Since the release of [Next.js 12](https://nextjs.org/blog/next-12), Next.js now has built-in configuration for Jest.

To set up Jest, let's first install `jest` and its peer dependencies via yarn:

```bash
yarn add --dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

Create a `jest.setup.js` to include the [custom jest matchers](https://github.com/testing-library/jest-dom#custom-matchers) globally to test the state of the DOM.

```js
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
```

Next, create a `jest.config.js` file in the project's root directory and add the following:

```js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
```

Under the hood, `next/jest` is automatically configuring Jest for you, including:

- Setting up `transform` using [SWC](https://nextjs.org/docs/advanced-features/compiler)
- Auto mocking stylesheets (`.css`, `.module.css`, and their scss variants) and image imports
- Loading `.env` (and all variants) into `process.env`
- Ignoring `node_modules` from test resolving and transforms
- Ignoring `.next` from test resolving
- Loading `next.config.js` for flags that enable SWC transforms

Now to complete the setup, let's add the scripts for running tests in `package.json`:

```json
{
  ...
  "scripts": {
    ...
    "test": "jest --coverage",
    "test:watch": "jest --coverage --watch"
  },
  ...
}
```

`--coverage` indicates that test coverage information should be collected and reported in the output. It will generate a `coverage` directory after running all the tests.

---

Let's test one of the scripts here by creating a simple test for our `Home` page component in `pages/__tests__/index.test.tsx`

```tsx
import { render } from '@testing-library/react';
import Home from '..';

describe('<Home />', () => {
  it('should render without errors', () => {
    const { container } = render(<Home />);

    expect(container).toBeInTheDocument();
  });
});
```

Once the file has been saved. Go to your terminal with the project's root directory as the location and run the following command:

```bash
yarn test
```

That should display the result and coverage of the test. Great!

You can also run `yarn test:watch` if you want to keep the local server running and listen to file changes which automatically re-runs the tests for you so you don't have to type and execute the test command again.

## Add page extensions config

To colocate test files, generated files, or other files used by components in the `pages` directory, you can prefix the extensions with something like `page`.

Open `next.config.js` and add the `pageExtensions` config:

```js
...
const nextConfig = {
  ...
  pageExtensions: ['page.tsx'],
};
...
```

Then rename the following files inside the `pages` folder to have a file extension that includes `.page`:

- `pages/_app.tsx` -> `_app.page.tsx` (required)
- `pages/index.tsx` -> `pages/index.page.tsx` (required)
- `pages/__tests__/index.page.test.tsx` -> `pages/__tests__/index.page.test.tsx` (optional, but just for convention)

Without this config, Next.js assumes every tsx/ts/jsx/js file in the `pages` directory is a page or API route, and may expose unintended routes vulnerable to denial of service attacks, or throw an error when building the production bundle.

Since you've renamed the `Home` page component, you'll have to update the code in `pages/__tests__/index.page.test.tsx` to fix the import:

```tsx
...
import Home from '../index.page';

...
```

---

## Set up GitHub Actions CI/CD workflow and automatically deploy to GitHub Pages

Of course, this setup wouldn't be complete without a [CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipeline that helps to deploy our code to production whenever we push changes to our [repository](https://en.wikipedia.org/wiki/Repository). So in this post, I'll also teach you how to deploy your Next.js project to [GitHub Pages](https://pages.github.com/) using [GitHub Actions](https://github.com/features/actions).

GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub, optionally runs the files through a build process, and publishes a website. You can host your site on GitHub's `github.io` domain or your own custom domain. It's free to use as long as your repository is set to _public_.

With [GitHub Actions](https://github.com/features/actions), it's easier than ever to bring CI/CD directly into your workflow right from your repository.

I am actually using these two technologies to deploy this tech blog website of mine that you're currently looking at.

To get started, delete the `pages/api` folder since we'll only be deploying the static files of our Next.js project.

Then let's install [`gh-pages`](https://github.com/tschaub/gh-pages) package via yarn:

```
yarn add --dev gh-pages
```

The `gh-pages` library publishes files to a `gh-pages` branch on GitHub by default.

Update `package.json` file to add the deployment scripts:

```json
{
  ...
  "scripts": {
    ...
    "export": "next export",
    "deploy": "gh-pages -d out"
  },
  ...
}
```

`next export` allows us to export our Next.js application to static HTML, which can be run standalone without the need of a Node.js server. This script will generate an `out` directory. The `out` directory can be served by any static hosting service or CDN. Running `gh-pages -d out` script will publish the `out` directory to a `gh-pages` branch.

GitHub Pages will deploy our build directory in this URL format `https://{YOUR_GITHUB_USERNAME}.github.io/{YOUR_REPOSITORY_NAME}/`. So if our repository name is `my-app`, then it will be deployed in this URL `https://{YOUR_GITHUB_USERNAME}.github.io/my-app/`. GitHub Pages will append a trailing slash at the end of the URL. To deploy a Next.js application under a sub-path of a domain we can use the `basePath` config option. Also, to add trailing slash when redirecting to other pages, we can use `trailingSlash` config option. With these, let's update `next.config.js` with the following code:

```js
...
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...
  trailingSlash: true,
  basePath: isProd ? '/my-app' : '',
};
...
```

Along with this change, we need to create a utility function to get the correct URL for the assets such as images in both development and production. Create `lib/assets.ts` and add the following code:

```ts
import { MAIN_URL } from './constants';

export function getAssetUrl(path: string) {
  return process.env.NODE_ENV === 'production'
    ? `${MAIN_URL}${path}`
    : `/${path}`;
}
```

Then create `lib/constants.ts` to store our static variables such as the main url:

```ts
export const MAIN_ORIGIN = 'https://{YOUR_GITHUB_USERNAME}.github.io';
export const MAIN_PATH = '/my-app/';
export const MAIN_URL = `${MAIN_ORIGIN}${MAIN_PATH}`;
```

After that, we can use the utility function we just created to get the image URL for the `vercel.svg` depending on the environment:

```tsx
...
import { getAssetUrl } from '../lib/assets';

const Home: NextPage = () => {
  return (
    <div className="px-8">
      ...
      <footer className="flex flex-1 justify-center items-center py-8 border-t border-slate-200">
        <a
          ...
        >
          ...
          <span className="h-[1em] ml-2">
            <img
              src={getAssetUrl('vercel.svg')}
              ...
            />
          </span>
        </a>
      </footer>
    </div>
  );
};
...
```

---

Now, create a file `.github/workflows/ci.yml` so we can configure a workflow for GitHub Actions. Workflow files use [YAML](https://yaml.org/) syntax, and must have either a `.yml` or `.yaml` file extension. If you're new to YAML and want to learn more, see "[Learn YAML in Y minutes](https://learnxinyminutes.com/docs/yaml/)". We must store workflow files in the `.github/workflows` directory of our repository. Let's add the following code for our workflow:

```yml
name: CI/CD

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: ESLint check
        run: yarn lint

      - name: Run the tests
        run: yarn test

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

      - name: Build
        run: yarn build

      - name: Generate static files
        run: yarn export

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
```

Let me explain to you each part of this workflow configuration. First we need to name our workflow, here we used `CI/CD` as the value for the `name`:

```yml
name: CI/CD
```

To automatically trigger a workflow, use `on` to define which events can cause the workflow to run. To learn more about the `on` syntax, click [here](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on). In our current configuration, the workflow will run when a _push_ is made to the _main_ branch of the workflow's repository:

```yml
on:
  push:
    branches: [main]
```

We can use `permissions` to modify the default permissions granted to the `GITHUB_TOKEN`, adding or removing access as required, so that we only allow the minimum required access. Since we are using GitHub pages, it pushes the build directory changes to the `gh-pages` branch, we will need to grant our workflow the `write` permission:

```yml
permissions:
  contents: write
```

We use `jobs.<job_id>.runs-on` to define the type of machine to run the job on. To learn more about the `jobs.<job_id>.runs-on` syntax, click [here](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#on).

```yml
jobs:
  build:
    runs-on: ubuntu-latest
```

---

We use `jobs.<job_id>.strategy` to use a matrix strategy for our jobs. A matrix strategy lets us use variables in a single job definition to automatically create multiple job runs that are based on the combinations of the variables. For example, we can use a matrix strategy to test our code in multiple versions of a language or on multiple operating systems. For more information about the `jobs.<job_id>.strategy` syntax, see [this](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategy). Since Next.js is based on Node.js language, we added the version of Node.js in our configuration using `jobs.<job_id>.strategy`:

```yml
jobs:
  build:
    ...
    strategy:
      matrix:
        node-version: [16.x]
```

A job contains a sequence of tasks called `steps`. Steps can run commands, run setup tasks, or run an action in your repository, a public repository, or an action published in a Docker registry. Not all steps run actions, but all actions run as a step. Each step runs in its own process in the runner environment and has access to the workspace and filesystem. Because steps run in their own process, changes to environment variables are not preserved between steps. GitHub provides built-in steps to set up and complete a job. For more information about `steps`, see [this](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idsteps).

Our first step is to checkout to our repository. It is possible using the `actions/checkout@v3` from the [GitHub Actions Marketplace](https://github.com/marketplace?type=actions).

```yml
jobs:
  build:
    ...
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
```

Then second step is to set up Node.js using the verson we defined in `strategy`:

```yml
jobs:
  build:
    ...
    steps:
      ...
      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
```

These first two steps is pretty standard for Node.js projects such as Next.js. With these, we can install the npm package dependencies and run scripts in our `package.json`.

```yml
jobs:
  build:
    ...
    steps:
      ...
      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: ESLint check
        run: yarn lint

      - name: Run the tests
        run: yarn test
```

If you remember earlier, when we run our test using `yarn test`, it generates a `coverage` directory. We can actually upload the coverage to a service called [Codecov](https://about.codecov.io/) which I've been using for my projects for a while now. Codecov makes it easy to see absolute coverage and coverage changes overlayed with your source code, making it even easier to identify needed test areas. It also provides a summary of coverage information directly in our workflow so that we can add and update tests quickly and effectively. They also provide a badge we can add in our `README.md` which is a live icon that is displayed within our code host that gives you a glance into the status of your project's percentage of code coverage. They already created a GitHub Action to easily integrate it with our workflow:

```yml
jobs:
  build:
    ...
    steps:
      ...
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

---

After running the lints and tests, the next step is to build and export our Next.js application:

```yml
jobs:
  build:
    ...
    steps:
      ...
      - name: Build
        run: yarn build

      - name: Generate static files
        run: yarn export
```

Finally, we deploy it. We're in luck because someone has already created a [GitHub Action for GitHub Pages](https://github.com/JamesIves/github-pages-deploy-action) to easily integrate it within our workflow:

```yml

jobs:
  build:
    ...
    steps:
      ...
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
```

Now that's all we need for our GitHub Action CI/CD workflow. Let's test whether this is working as expected. We will need to add our locally hosted code to GitHub. Here's [how you can do it](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github). Once you have the repository already set up in GitHub, you can push the code to GitHub with the following commands:

```bash
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/my-app.git
git push -u origin main
```

Once you pushed your changes, it will trigger the GitHub Actions workflow. You can check its progress on your repository. You can type the link in your browser `https://github.com/YOUR_GITHUB_USERNAME/my-app/actions` and replace `YOUR_GITHUB_USERNAME` with your GitHub username.

It will take a few minutes to build and you should see something like on the page:

![Screenshot of all workflows on GitHub Actions](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/github-actions-all-workflows.png)

When we have the green tick or check icon for `pages build and deployment`, that means our `Create Next App` website has been successfully deployed on GitHub Pages. Open your browser and visit the URL `https://{YOUR_GITHUB_USERNAME}.github.io/my-app/`. You should see something like this:

![Screenshot of broken Create Next App deployed on GitHub Pages](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/create-next-app-deployed-on-github-pages-broken.png)

Yes, it doesn't look right and most of the assets are returning [404 or Not Found error](https://en.m.wikipedia.org/wiki/HTTP_404). Why is this happening? That's because GitHub pages by default goes to [Jekyll processing](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) and files or directories with underscores (`_`) are considered by Jekyll to be special resources and does not copy them to the final site and the output of Next.js build have the assets inside the `_next/static` directory.

To fix this, we can follow the advice from GitHub [here](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/).

Simple switch to the `gh-pages` branch of your repository in the GitHub website and click on "Add file" button then "Create new file":

![Screenshot of creating a new file on GitHub Repository](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/github-repository-create-new-file.png)

Then name the file `.nojekyll`:

![Screenshot of creating .nojekyll file on GitHub Repository](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/github-repository-create-nojekyll-file-1.png)

And add a custom commit message then press the "Commit new file" button:

![Screenshot of creating .nojekyll file on GitHub Repository](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/github-repository-create-nojekyll-file-2.png)

Once committed, it will take a few minutes to build the website again. Do remember to do a hard refresh to clear the cache. You should now see the website looking good as expected:

![Screenshot of Create Next App deployed on GitHub Pages](/images/posts/local-development-setup-for-nextjs-typescript-and-tailwindcss-projects/create-next-app-deployed-on-github-pages.png)

---

## Add caching for faster deployment

What we need to do next is to cache dependencies and build outputs to improve workflow execution time. That means faster deployment! We'll be using another action from the GitHub Actions Marketplace which is `actions/cache@v3`. With the combination of [Node - Yarn cache](https://github.com/actions/cache/blob/main/examples.md#node---yarn) and [Next.js build cache](https://nextjs.org/docs/advanced-features/ci-build-caching#github-actions), open and update `.github/workflows/ci.yml` with the following:

```yml
...

jobs:
  build:
    ...

    steps:
      ...

      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Get cache directory path
        id: nestjs-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - name: Cache dependencies and build outputs
        uses: actions/cache@v3
        id: nestjs-cache
        with:
          path: |
            ${{ steps.nestjs-cache-dir-path.outputs.dir }}
            ${{ github.workspace }}/.next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/yarn.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/yarn.lock') }}-

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      ...
```

Commit the changes and push it remotely. The result of the GitHub Actions workflow will still be successful and our application will be deployed to GitHub Pages accordingly. The next few workflow executions should relatively be faster than the previous one due to the caching step we added.

Now our CI/CD workflow is complete.

---

## Set up GitHub Actions Pull Request workflow

Next thing we want is to have a workflow that automatically runs when a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) is created from the repository. This will become our first line of defense before we approve the code and merge it to the `main` branch.

We can duplicate the changes we've made in `ci.yml` in another file `.github/workflows/pr.yml`. We only have to do minor changes to it. First, of course is to update the `name` to `PR`. Then, on the `on` syntax, we want to use `pull_request` instead of `push`. Lastly, we want to remove both `permissions` syntax and `Deploy` step from the `steps` because the changes in a Pull Request is not meant to be deployed to production until it is approved and merged to the `main` branch. The final code for `.github/workflows/pr.yml` should look like this:

```yml
name: PR

on:
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Get yarn cache directory path
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - name: Cache dependencies
        uses: actions/cache@v3
        id: yarn-cache
        with:
          path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: ESLint check
        run: yarn lint

      - name: Run the tests
        run: yarn test

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

      - name: Build
        run: yarn build

      - name: Generate static files
        run: yarn export
```

---

## Set up GitHub Actions Code Scanning workflow

Okay, we're almost done with the workflows. The last workflow we want to create is for code scanning. Code scanning helps us prevent security issues in the code. Luckily for us, [GitHub code scanning](https://github.com/features/security) was made [available on September 2020](https://github.blog/2020-09-30-code-scanning-is-now-available/). It is a developer-first, GitHub-native approach to easily find security vulnerabilities before they reach production. Code scanning integrates with GitHub Actions.

To set up the code scanning workflow, simply create a file `.github/workflows/cs.yml` and add the following code:

```yml
name: 'Code Scanning'

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    paths-ignore:
      - '**/*.md'
      - '**/*.txt'
  schedule:
    - cron: '30 1 * * 0'

jobs:
  CodeQL-Build:
    runs-on: ubuntu-latest

    permissions:
      security-events: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript

      - name: Autobuild
        uses: github/codeql-action/autobuild@v2

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```

This is copied directly from [their example](https://github.com/github/codeql-action#usage) with minor changes. This workflow will run on `push`, on `pull_request` and on a schedule basis ([cron](https://en.wikipedia.org/wiki/Cron)) every Sunday at 1:30 AM. Feel free to change it according to your preference.

Commit your changes and push it remotely to your repository.

---

## Final words

We are officially done with the setup! So you can now go ahead and start coding your Next.js projects with TypeScript and Tailwind CSS using this boilerplate!

If you need the final code as a reference, here's the [link to the repository](https://github.com/dominicarrojado/nextjs-typescript-tailwindcss-boilerplate).

Feel free to share this boilerplate with your friends and colleagues. I hope you learned a lot from this post. I might create a post on building an application using this boilerplate, so stay tuned. See you in the next post!
