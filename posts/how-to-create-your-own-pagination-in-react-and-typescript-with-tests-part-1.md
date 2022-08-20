---
title: 'How to create your own pagination in React and TypeScript with tests (Part 1)'
date: '2022-08-15'
excerpt: 'Learn how to build a modern page navigation in a reactive and reusable way'
category: 'technology'
videoUrl: 'https://youtu.be/ZBmAJTwalGQ'
---

## Introduction

Pagination can be seen a lot in both classic and modern websites today. They are the sequence of numbers assigned to pages in a website to indicate a series of related content that exists across multiple pages. They can be used to display a list of blog posts, products, search results and many more that enables the user to select a specific page from a range of pages. Many websites display pagination differently especially in cases where we can't possibly display all the numbers in between the first page and the last page. Usually, they will swap a group of items in the pagination list with an ellipsis `...` where most applicable. In this post, I'm going to teach you how to create a pagination component in [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/) and learn how to achieve a 100% test coverage using [Jest](https://jestjs.io/) and [Testing Library](https://testing-library.com/). The pagination component that we'll be creating fits my idea of how pagination should be and [what I'm currently using](/posts/) in this tech blog website of mine.

## Prerequisites

This is the [link to the pagination component](/react-typescript-pagination/) which we'll accomplish by the end of this post, you can see and play around with it or use it as your reference throughout this tutorial.

Upon writing this post, I assume that you have some web development background and basic knowledge regarding [npm](https://www.npmjs.com/), [yarn](https://classic.yarnpkg.com/lang/en/), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [React](https://reactjs.org/).

Make sure to install [Yarn](https://classic.yarnpkg.com/lang/en/) in your system if you haven't. We use [Yarn](https://classic.yarnpkg.com/lang/en/) as our package manager, it's just like [npm](https://www.npmjs.com/) but _faster_.

I've written a [separate post](/posts/local-development-setup-for-react-and-typescript-projects/) about the [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) and extensions I use to help save time and energy when writing code in React. I highly suggest for you to check it out if you haven't!

## Initialize your project

Fastest way to start a new project with React is using [Create React App](https://create-react-app.dev/). It is an officially supported way to create single-page React applications. It offers a modern build setup with no configuration so you can focus on code, not build tools.

To create our project with React and TypeScript, run this command in your terminal:

```bash
yarn create react-app react-typescript-pagination --template typescript
```

Once project is initiated, install the additional libraries which we'll be using later on:

```bash
cd react-typescript-pagination
yarn add classnames
```

To run our project, execute the command below:

```bash
yarn start
```

This command will open your default browser and direct you to `http://localhost:3000/`. If it doesn't, you can do it yourself too.

This setup comes with live-editing or hot reloading which means when we save file changes, it will automatically update the app and reload on the browser. That's great for local development!

---

## Clean up the project

We're ready to code! Let's clean up our project which was created by Create React App. We won't be needing some of them. Delete or clear the contents of the following below:

- src/App.css (clear contents)
- src/App.test.tsx (delete)
- src/logo.svg (delete)

Then let's update the code in `src/App.tsx`:

```tsx
import './App.css';

export default function App() {
  return (
    <div className="container">
      <h1>React TypeScript Pagination</h1>
    </div>
  );
}
```

We will use the `App` component as the container of our pagination component. Next, add the following code in `src/App.css`:

```css
.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 15px;
}
```

Then update the `src/index.css` as well:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## PageLink component

`PageLink` component will be the reusable component to be used in our `Pagination` component. This will return an anchor element by default and will support a custom prop `active` to make it look _active_ using its class and styles. If the prop `disabled` value is `true`, it would return a span element instead and make it look _disabled_ using its class and styles.

Now let's create our `PageLink` component in `src/components/PageLink.tsx` and add the following code:

```tsx
import { HTMLProps } from 'react';
import cn from 'classnames';
import './PageLink.css';

export type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean };

export default function PageLink({
  className,
  active,
  disabled,
  children,
  ...otherProps
}: Props) {
  const customClassName = cn('page-link', className, {
    active,
    disabled,
  });

  if (disabled) {
    return <span className={customClassName}>{children}</span>;
  }

  return (
    <a
      className={customClassName}
      aria-current={active ? 'page' : undefined}
      {...otherProps}
    >
      {children}
    </a>
  );
}
```

So in the code, we accept properties (or `props`) for our `PageLink` component to make it reusable and customizable. Since we're writing our React code in TypeScript, we initialized the type `Props` which has been reassigned with the type `HTMLProps` from [`react`](https://github.com/facebook/react) library with an argument `HTMLAnchorElement`, this means it will accept props and attributes allowed for an anchor element based on the `HTMLProps` from React. We also [intersected](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) the type `HTMLProps<HTMLAnchorElement>` with an object containing the `active` key that is an [optional](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties) prop with a type of `boolean`.

Here we also used [`classnames`](https://github.com/JedWatson/classnames) utility to help with joining `classNames` together conditionally.

---

Let's style this component by creating `src/components/PageLink.css` and add the following code:

```css
.page-link {
  position: relative;
  display: inline-flex;
  border: 1px solid #dee2e6;
  background-color: #ffffff;
  padding: 10px 15px;
  color: #0d6efd;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
  cursor: pointer;
}

.page-link:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.page-link:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.page-link:not(:first-child) {
  margin-left: -1px;
}

.page-link:hover,
.page-link:focus {
  color: #0a58ca;
  background-color: #e9ecef;
}

.page-link:focus {
  z-index: 3;
}

.page-link.active {
  z-index: 2;
  color: #ffffff;
  border-color: #0d6efd;
  background-color: #0d6efd;
}

.page-link.disabled {
  color: #6c757d;
  pointer-events: none;
}
```

---

## Pagination component

Now that we have the `PageLink` component ready for use, let's create our `Pagination` component in `src/components/Pagination.tsx` and add the following code:

```tsx
import PageLink from './PageLink';
import './Pagination.css';

export type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}: Props) {
  const pageNums = [1, 2, 3];

  return (
    <nav className="pagination" aria-label="Pagination">
      <PageLink
        href="#"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          href="#"
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => setCurrentPage(pageNum)}
        >
          {pageNum}
        </PageLink>
      ))}
      <PageLink
        href="#"
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </PageLink>
    </nav>
  );
}
```

Here we have `currentPage`, `lastPage` and `maxLength` as part of the props. These three props are enough to come up with the page numbers to be displayed in our pagination. For now, let's hard code the page numbers in a variable called `pageNums`.

I am exporting the type `Props` here because we're going to use that later in our test file when we write tests for this component.

---

I also added `setCurrentPage` function prop so that we can control the value of the `currentPage` from the parent component but it may not be needed for production because you may want to rely on the actual [URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL) in `href` and your users will be redirected to the page depending on the `href`. If we didn't add `setCurrentPage` function prop in the component, it will look like this:

```tsx
// EXAMPLE ONLY
...
export default function Pagination({
  currentPage,
  lastPage,
  maxLength,
}: Props) {
  const baseUrl = 'https://example.com/posts';
  const pageNums = [1, 2, 3];

  return (
    <nav className="pagination" aria-label="Pagination">
      <PageLink
        href={`${baseUrl}/${currentPage - 1}`}
        disabled={currentPage === 1}
      >
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          href={`${baseUrl}/${pageNum}`}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
        >
          {pageNum}
        </PageLink>
      ))}
      <PageLink
        href={`${baseUrl}/${currentPage + 1}`}
        disabled={currentPage === lastPage}
      >
        Next
      </PageLink>
    </nav>
  );
}
```

This is just an example, your base URL may be different and the way how you handle the different page URLs may also be different, the page number could be in the query params instead of being part of the path. I hope I can leave that up to you - you can use the code above for your reference.

---

Now, let's add styles for this `Pagination` component in `src/components/Pagination.css` with the following code:

```css
.pagination {
  display: flex;
  flex-wrap: wrap;
}
```

This `Pagination` component is now ready to be used in the `App` component. Let's update `src/App.tsx` with the following code changes:

```tsx
import { useState } from 'react';
import Pagination from './components/Pagination';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 3;

  return (
    <div className="container">
      <h1>React TypeScript Pagination</h1>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
```

Once you saved the changes. This is how our component will look like on the page:

![Screenshot of pagination built in React and TypeScript](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/pagination.png)

Try playing around with the buttons in the `Pagination` component to see how it changes the current page and set it as the _active_ page.

---

## Pagination logic

It's time to figure out the logic for the page numbers in the pagination. We need to create a function that would generate an array of page numbers that would be displayed in our `Pagination` component. The function would accept three arguments: the `currentPage`, the `lastPage` and the `maxLength`. The function would return an array of page numbers and the length of the array must not exceed the `maxLength`. To keep things simple and easy to understand, let's use `7` as the `maxLength` for all the examples.

For example, we have `1` as our `currentPage` and `5` as our `lastPage`. The function should return: `[1, 2, 3, 4, 5]`. The result array consists of the `currentPage`, the `lastPage` and the numbers in between them. The length of the result array is `5` which is less than `7` (the maximum of items our result array can have).

Another example, let's say we have `5` as our `currentPage` and `7` as our `lastPage`. The function should return `[1, 2, 3, 4, 5, 6, 7]`. The result array consists of the `currentPage`, the `lastPage`, the numbers in between them and the numbers before the `currentPage` down to the first page `1`. We were able to include all the numbers before the `currentPage` down to the first page because the length of the result array is still `7` which is equal to maximum array length `7`.

If I call the function in JavaScript where first argument is `currentPage`, second argument is `lastPage` and third argument is the `maxLength`, here's how it would look like along with their expected results:

```js
getPaginationItems(1, 5, 7); // expected result: [1, 2, 3, 4, 5]
getPaginationItems(5, 7, 7); // expected result: [1, 2, 3, 4, 5, 6, 7]
```

This function should also be able to handle where `lastPage` is more than the `maxLength`, it should keep the items within the `maxLength` but it will replace some page number(s) as ellipsis `...` where most applicable, here are some of the examples with their expected results:

```js
getPaginationItems(1, 10, 7); // expected: [1, 2, 3, ..., 8, 9, 10]
getPaginationItems(9, 10, 7); // expected: [1, 2, 3, ..., 8, 9, 10]
getPaginationItems(5, 10, 7); // expected: [1, ..., 4, 5, 6, ..., 10]
getPaginationItems(6, 10, 7); // expected: [1, ..., 5, 6, 7, ..., 10]
getPaginationItems(3, 10, 7); // expected: [1, 2, 3, 4, ..., 9, 10]
getPaginationItems(4, 10, 7); // expected: [1, 2, 3, 4, 5, ..., 10]
getPaginationItems(7, 10, 7); // expected: [1, ..., 6, 7, 8, 9, 10]
getPaginationItems(8, 10, 7); // expected: [1, 2, ..., 7, 8, 9, 10]
```

You might be scratching your head right now, that's how I felt when I was thinking of how to solve this as well. Don't worry! To actually solve this, at least for my solution, we will have to break them up into a couple of cases and conditions which I think makes it easy to understand as well.

> Nothing is particularly hard if you divide it into small jobs.
>
> - Henry Ford

Let's first understand the examples and their expected results before we get to the solution part by observing them for a few seconds or minutes. After observing them, we can conclude the following:

1. The first page which is `1`, the `currentPage` and the `lastPage` are always part of the result array.
2. The length of the result array is equal to or less than the `maxLength`.
3. Using `currentPage`, we should be able to determine the numbers to fill in the result array.

_**Fun fact**: I actually use this pagination function as a programming challenge for the software engineer interviews I conduct._

First let's create the pagination function in `src/lib/pagination.ts`:

```ts
export function getPaginationItems(
  currentPage: number,
  lastPage: number,
  maxLength: number
) {
  const res: Array<number> = [currentPage];

  // TODO: populate result array

  return res;
}
```

---

Now what should we do? Let's start with the simple ones first. In the first two examples, we have:

```ts
getPaginationItems(1, 5, 7); // expected result: [1, 2, 3, 4, 5]
getPaginationItems(5, 7, 7); // expected result: [1, 2, 3, 4, 5, 6, 7]
```

Here, we actually don't need the `currentPage` to generate the expected result array. As long as the `lastPage` is less than or equal to the `maxLength`. We can just iterate from `1` up to the `lastPage`.

Let's update our function in `src/lib/pagination.ts` to add the loop iteration:

```ts
export function getPaginationItems(
  ...
) {
  const res: Array<number> = [];

  // handle lastPage less than or equal to maxLength
  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      res.push(i);
    }
  }

  return res;
}
```

If we run this function with the arguments from the first two examples, we will get our expected result array:

```js
getPaginationItems(1, 5, 7); // [1, 2, 3, 4, 5]
getPaginationItems(5, 7, 7); // [1, 2, 3, 4, 5, 6, 7]
```

Great! Now let's try to achieve the expected result array of the next set of examples:

```js
getPaginationItems(1, 10, 7); // expected result: [1, 2, 3, ..., 8, 9, 10]
getPaginationItems(9, 10, 7); // expected result: [1, 2, 3, ..., 8, 9, 10]
```

This is considered to fall under the case where `lastPage` is more than `maxLength` and hence it will have an ellipsis `...` in the result array.

If you notice, we have the ellipsis `...` in the middle of the result array. If you analyze it further, the expected result would be the same if the `currentPage` is either `2` or `10`.

With this, we can conclude that if either of the following conditions below are met, we can put the ellipsis `...` in the middle of the result array:

2. If we deduct the `currentPage` with `1` (first page) and the difference is less than `2` (e.g. `2 - 1 = 1`, `1 - 1 = 0`).
3. If we deduct the `lastPage` with the `currentPage` and the difference is less than `2` (e.g. `10 - 9 = 1`, `10 - 10 = 0`).

The value `2` in the conditions above should not be static because we want to get that value based on the `maxLength`. We need it to be dynamic. For example if our `maxLength` is `9`, the expected result array where ellipsis `...` is in the middle would now apply to `1`, `2`, `3`, `8`, `9` and `10`, which means the required difference in the conditions above should be less than `3`. How can we get this dynamic value?

So we have `7` as our maximum length for the result array, we are already certain that we always have the three numbers that would be part of the array: the first page (`1`), the current page (`currentPage`) and last page (`lastPage`). So we can deduct those three from the max length: `7 - 3 = 4`. Now we're left with `4` numbers to fill in the result array, let's assign `4` to a variable called `deductedMaxLength` since we deducted the `maxLength` with the confirmed page numbers count (`confirmedPagesCount`). We can divide the `deductedMaxLength` by two, `4 / 2 = 2`, since we need to fill both _sides_ of the ellipsis: _left_ and _right_. This is how we get `2` which is the dynamic variable of the conditions mentioned above. Let's name this dynamic value as `sideLength` which hopefully explains that it is the length needed on both sides of the array. Now we can use it to determine when to handle the case where ellipsis `...` should be in the middle of the result array:

```ts
export function getPaginationItems(
  ...
) {
  const res: Array<number> = [];

  // handle lastPage less than or equal to maxLength
  if (lastPage <= maxLength) {
    ...
  }

  // handle ellipsis logics
  else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    // handle ellipsis in the middle
    if (currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
      // TODO: populate result array
    }
  }

  return res;
}
```

---

Now let's fill the result array with the numbers on the _left_ side of the ellipsis `...`. That is to iterate from the first page up to the `sideLength` plus `1` (since it includes the `firstPage`):

```ts
export function getPaginationItems(
  ...
) {
  ...
  if (lastPage <= maxLength) {
    ...
  }
  ...
  else {
    ...
    // handle ellipsis in the middle
    if (currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
      for (let j = 1; j <= sideLength + firstPage; j++) {
        res.push(j);
      }
    }
  }
  ...
}
```

To get a better understanding of the state of our function with each changes we do, I'm going to display to you what the function currently returns for the result array and beside it will be the expected array to compare:

```ts
getPaginationItems(1, 10, 7); // current: [1, 2, 3] | expected: [1, 2, 3, ..., 8, 9, 10]
getPaginationItems(9, 10, 7); // current: [1, 2, 3] | expected: [1, 2, 3, ..., 8, 9, 10]
```

Now we can simply push the ellipsis `...` in the result array but instead of pushing the triple dot string `...`, I'm just gonna push `NaN` since we have defined the type of the result array `res` to be `Array<number>`:

```ts
export function getPaginationItems(
  ...
) {
  const res: Array<number> = [];

  if (lastPage <= maxLength) {
    ...
  } else {
    ...
    if (currentPage - 1 <= sideLength || lastPage - currentPage <= sideLength) {
      for (let j = 1; j <= sideLength + firstPage; j++) {
        res.push(j);
      }

      res.push(NaN);
    }
  }

  return res;
```

---

You can actually change the type of the result array to `Array<number | string>` which we call a [union type in TypeScript](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#defining-a-union-type) and then push the ellipsis `...` string in the result array. But I just felt that keeping it as just `Array<number>` and pushing `NaN` as the ellipsis would be simpler especially when handling the "Previous" and "Next" buttons where we add or substruct the `currentPage` to get their page numbers. Then we can just do a logic in the [JSX](https://reactjs.org/docs/introducing-jsx.html) to display ellipsis `...` if the item in the result array is `NaN` using the [`isNaN()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) check.

To complete the result array for this case, let's fill the result array with the numbers on the _right_ side of the ellipsis `...` by iterating from `lastPage` minus `sideLength` up to the `lastPage`:

```ts
export function getPaginationItems(
  ...
) {
  ...
  if (lastPage <= maxLength) {
    ...
  }
  ...
  else {
    ...
    if (currentPage - 1 <= sideLength || lastPage - currentPage <= sideLength) {
      ...
      res.push(NaN);

      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        res.push(k);
      }
    }
  }

  return res;
```

With the updated function, we now get the expected result array:

```js
getPaginationItems(1, 10, 7); // [1, 2, 3, NaN, 8, 9, 10]
getPaginationItems(9, 10, 7); // [1, 2, 3, NaN, 8, 9, 10]
```

Awesome! Just think of `NaN` as the ellipsis here and this is exactly what we expect.

Let's proceed to figure out how to achieve the expected result array from the next set of examples:

```js
getPaginationItems(5, 10, 7); // expected: [1, ..., 4, 5, 6, ..., 10]
getPaginationItems(6, 10, 7); // expected: [1, ..., 5, 6, 7, ..., 10]
```

This is also considered to fall under the case where `lastPage` is more than `maxLength` and hence it will have an ellipsis `...` in the result array.

Let's first determine in what case does the result array will contain two ellipsis `...`. Try to think about it for a moment and look at the examples again.

---

Now see if your thoughts are the same as mine. It occurs if **both** of the conditions below are met:

1. The difference of the `currentPage` and the first page is `4` and above (e.g. `5 - 1 = 4`, `6 - 1 = 5`).
2. The difference of the `lastPage` and the `currentPage` is `4` and above (e.g. `10 - 5 = 5`, `10 - 6 = 4`).

The same case as the earlier case, the value `4` here should be dynamic and should depend on the `maxLength`. This value should look familiar to you, that's because we already have this dynamic value earlier in the code. That would be the `deductedMaxLength`. Let's use that and update the code with the following:

```ts
export function getPaginationItems(
  ...
) {
  ...
  // handle ellipsis logics
  else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    // handle ellipsis in the middle
    if (
      currentPage - firstPage < sideLength ||
      lastPage - currentPage < sideLength
    ) {
      ...
    }

    // handle two ellipsis
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      // TODO: populate result array
    }
  }
  ...
}
```

Alright, now that we know the condition for the case where we have two ellipsis, we can now proceed to fill in the result array with the page numbers. Let's start with a couple of observations below:

1. The `currentPage` is always in the middle of the result array.
2. The numbers surrounding the `currentPage` depends on the `maxLength`. The number needed on each side should be dynamic. If `7` is the `maxLength`, there's only one number on each side of the `currentPage`. If `9` is the `maxLength`, there should be two numbers on each side of the `currentPage`.
3. The ellipsis `...` is always beside both the first page and the `lastPage`.

Let's start with the easy change first. We just need to push the first page and `NaN` in the result array:

```ts
export function getPaginationItems(
  ...
) {
  ...
  else {
    ...

    // handle two ellipsis
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      res.push(1);
      res.push(NaN);
    }
  }
  ...
}
```

If we run this function now, we will get the following and we can compare against the expected result array:

```ts
getPaginationItems(5, 10, 7); // current: [1, NaN] | expected: [1, NaN, 4, 5, 6, NaN, 10]
getPaginationItems(6, 10, 7); // current: [1, NaN] | expected: [1, NaN, 5, 6, 7, NaN, 10]
```

---

Now let's think of how to generate the numbers around the `currentPage`. If you remember in one of the observations, if `maxLength` is `7`, we need one number on each side. We can make use of another existing dynamic value which is the `sideLength`. The value of `sideLength` is `2` which is the length needed in each sides, since we already know that there is an ellipsis or `NaN` on each side of the result array, we can just have to deduct the `sideLength` by `1`: `2 - 1 = 1`. Now we get `1` which means we need to generate one number on each side of the `currentPage`. We can now do the iteration for the numbers around the `currentPage` or what we may call the numbers in the middle of the result array. After the iteration, we can just push the remaining items of the result array which are `NaN` and the `lastPage`, here's the code for that:

```ts
export function getPaginationItems(
  ...
) {
  ...
  else {
    ...

    // handle two ellipsis
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      lastPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      res.push(1);
      res.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        res.push(l);
      }

      res.push(NaN);
      res.push(lastPage);
    }
  }
  ...
}
```

By running the updated function, we are now able to get the expected result array for this set of examples:

```js
getPaginationItems(5, 10, 7); // [1, NaN, 4, 5, 6, NaN, 10]
getPaginationItems(6, 10, 7); // [1, NaN, 5, 6, 7, NaN, 10]
```

We're almost done with the pagination logic. The last thing we need to handle is when the ellipsis `...` is not in the middle of the result array. Let me show again the set of examples from earlier:

```js
getPaginationItems(3, 10, 7); // expected: [1, 2, 3, 4, ..., 9, 10]
getPaginationItems(4, 10, 7); // expected: [1, 2, 3, 4, 5, ..., 10]
getPaginationItems(7, 10, 7); // expected: [1, ..., 6, 7, 8, 9, 10]
getPaginationItems(8, 10, 7); // expected: [1, 2, ..., 7, 8, 9, 10]
```

A couple of observations here:

1. The ellipsis `...` could either be near the first page or near the last page. We can say the same thing for the `currentPage`.
2. There are more numbers surrounding the `currentPage` which means less numbers on the other side of the `ellipsis`.
3. The `currentPage` is surrounded by at least one number on both sides (left and right).

With the observations above we can split the logic of generating the result array into two cases: First case is when the `currentPage` is near the first page, we iterate from first page `1` up to the `currentPage` plus `1`, we added `1` because from one of the observations we need at least one number on each side of the `currentPage`. Second case is when the `currentPage` is near the `lastPage`, we iterate from the `lastPage` down to the `currentPage` minus `1`. How do we know if the `currentPage` is near the first page or the `lastPage`? We can simply deduct `currentPage` with the first page and deduct `lastPage` with the `currentPage`, compare the difference of both, and whoever has the lesser difference is near to the `currentPage`.

Here's how that will look like in the code:

```ts
export function getPaginationItems(
  ...
) {
  ...
  else {
    ...

    // handle two ellipsis
    else if (
      ...
    ) {
      ...
    }

    // handle ellipsis not in the middle
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
        }

        res.push(NaN);
      } else {
        for (let o = lastPage; o >= currentPage - 1; o--) {
          res.unshift(o);
        }

        res.unshift(NaN);
      }
    }
  }
  ...
}
```

---

By the way, if you don't know what [`Array.unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) does here, it is the opposite of [`Array.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push), it adds one or more elements to the beginning of an array. Although, I think I can achieve the same thing for when the `currentPage` is near the `lastPage` by just using `push` instead of `unshift` by deducting the initial value instead, I think what I've done is more easy to understand. If the `currentPage` is near the `lastPage`, we basically iterate backwards starting from the `lastPage` down to the `currentPage` minus `1` to generate the expected result.

If we run this function now, this is what we currently get:

```js
getPaginationItems(3, 10, 7); // current: [1, 2, 3, 4, NaN] | expected: [1, 2, 3, 4, NaN, 9, 10]
getPaginationItems(4, 10, 7); // current: [1, 2, 3, 4, 5, NaN] | expected: [1, 2, 3, 4, 5, NaN, 10]
getPaginationItems(7, 10, 7); // current: [NaN, 6, 7, 8, 9, 10] | expected: [1, NaN, 6, 7, 8, 9, 10]
getPaginationItems(8, 10, 7); // current: [NaN, 7, 8, 9, 10] | expected: [1, 2, NaN, 7, 8, 9, 10]
```

Now we just need to fill the remaining numbers into the result array. The key word here is the "remaining length". How do we get that? By subtracting `maxLength` in each `push` or `unshift` and track that in a variable called `remainingLength`:

```ts
export function getPaginationItems(
  ...
) {
  ...
  else {
    ...
    // handle ellipsis not in the middle
    else {
      const isNearFirstPage = currentPage - firstPage < lastPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
          remainingLength -= 1;
        }

        res.push(NaN);
        remainingLength -= 1;
      } else {
        for (let o = lastPage; o >= currentPage - 1; o--) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;
      }
    }
  }
  ...
}
```

---

Then using the `remainingLength`, we know how much to iterate on the other side of the `ellipsis`. If the `currentPage` is near the first page, after pushing the numbers and `NaN`, we can deduct the `lastPage` with the `remainingLength` and the difference is where we start iterating up to the `lastPage`. If the `currentPage` is near the `lastPage`, after pushing the numbers and `NaN`, we start iterating from the `remainingLength` down to the first page:

```ts
export function getPaginationItems(
  ...
) {
  ...
  else {
    ...
    else {
      ...
      if (isNearFirstPage) {
        ...
        res.push(NaN);
        remainingLength -= 1;

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
          res.push(n);
        }
      } else {
        ...
        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p--) {
          res.unshift(p);
        }
      }
    }
  }
  ...
}
```

Once you save the changes and run the function, we now get the expected result array:

```js
getPaginationItems(3, 10, 7); // [1, 2, 3, 4, NaN, 9, 10]
getPaginationItems(4, 10, 7); // [1, 2, 3, 4, 5, NaN, 10]
getPaginationItems(7, 10, 7); // [1, NaN, 6, 7, 8, 9, 10]
getPaginationItems(8, 10, 7); // [1, 2, NaN, 7, 8, 9, 10]
```

Very nice! We're finally done with the pagination function.

---

We all know what to do now. Let's go ahead and update the `Pagination` component in `src/components/Pagination.tsx` to use the `getPaginationItems` function:

```tsx
import { getPaginationItems } from '../lib/pagination';
...
export default function Pagination({
  ...
}: Props) {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav className="pagination" aria-label="Pagination">
      ...
      {pageNums.map((pageNum, idx) => (
        <PageLink
          ...
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PageLink>
      ))}
      ...
    </nav>
  );
}
```

Let's also make our application more interesting by updating the `lastPage` to `20` in the `App` component in `src/App.tsx` so that it can display more page numbers in the `Pagination` component:

```tsx
...
export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 20;

  return (
    ...
  );
}
```

Save those changes and let's test it out!

---

Here's a demo of the fully operational pagination component we've just built:

![GIF of navigating in React Pagination](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/pagination-navigating.gif)

And there you have it! You can now proudly say that you have built your very own pagination component in React and TypeScript.

It's time to write some tests for the pagination component. Please proceed to the [next part](/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests-part-2) of this post.
