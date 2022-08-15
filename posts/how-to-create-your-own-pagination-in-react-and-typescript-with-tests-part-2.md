---
title: 'How to create your own pagination in React and TypeScript with tests (Part 2)'
date: '2022-08-15'
excerpt: 'Learn how to build a modern pagination in a reactive and reusable way'
category: 'technology'
videoUrl: ''
---

## Introduction

This is a continuation from [Part 1](/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests-part-1).

## Prerequisites

To get started with testing, first install the package below:

```bash
yarn add @faker-js/faker
```

[`@faker-js/faker`](https://github.com/faker-js/faker) helps us generate massive amounts of fake (but realistic) data for testing. Check out the guide for `faker` [here](https://fakerjs.dev/guide/).

---

## Add tests for getPaginationItems function

For test files, I like to separate them in a folder so that it's less cluttered when viewing the main files. Create a new folder named `__tests__` under the `src/lib`. This is where we will put the test files for the utility functions under `src/lib` folder.

Since we are writing tests for the `getPaginationItems` function in `pagination.ts`, create a file under `src/lib/__tests__` and name it `pagination.test.ts`. This is a common naming convention for test files, make sure it matches the file name that you are testing then add the infix `test` for the test file name.

Now let's add in the structure of the test:

```ts
import { getPaginationItems } from '../pagination';

describe('pagination utilities', () => {
  describe('getPaginationItems()', () => {});
});
```

In your test files, Jest puts [functions and objects](https://jestjs.io/docs/api) into the global environment. [`describe`](https://jestjs.io/docs/api#describename-fn) is one of the functions available globally, so with the setup of Create React App, we don't need to require or import anything to use them. `describe` creates a block that groups together several related tests. So ideally the description should be describing what we are testing, so in this case I used the `pagination utilities` since the `pagination.ts` file may include other utility functions in the future then another `describe` block for the `getPaginationItems` function. Feel free to rename them according to your preference if you feel there's a better description that describes what we are testing.

---

Next we can add a test case inside the `describe` block:

```ts
...
describe('pagination utilities', () => {
  describe('getPaginationItems()', () => {
    it('should handle lastPage less than maxLength', () => {});
  });
});
```

The [`it`](https://jestjs.io/docs/api#testname-fn-timeout) (or `test`) method is another global function by Jest that runs a test. This is how we can have different test cases. Let's add the code for our first test case:

```ts
...
describe('pagination utilities', () => {
  describe('getPaginationItems()', () => {
    it('should handle lastPage less than or equal to maxLength', () => {
      expect(getPaginationItems(1, 5, 7)).toEqual([1, 2, 3, 4, 5]);
      expect(getPaginationItems(5, 7, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });
});
```

We just wrote our first test case! Pretty simple isn't it? We used the exact same arguments from the examples in part 1.

---

When writing tests, we often need to check that values meet certain conditions. [`expect()`](https://jestjs.io/docs/expect) is another one of Jest's global functions that gives us access to a number of "matchers" that let us validate different things. The matcher we're using here is [`.toEqual()`](https://jestjs.io/docs/expect#toequalvalue) which will compare recursively all properties of object instances (also known as "deep" equality).

You might be thinking here why we didn't use `faker` to generate the arguments for us randomly. That's because we would need to create a function in the test file to generate the expected result depending on the arguments, we'll probably end up copying the code from the main file and that will make the test file complicated and difficult to understand. Hence, it would be better to hardcode the arguments along with the expected result array. If you want to have more confidence in the test cases, you can add more arguments to test.

Now save your changes and let's verify if this test case will pass or not. In your terminal, run the script command available in `package.json` to run the tests:

```bash
yarn test --coverage
```

The `--coverage` parameter will show you which how many percentage you have covered in each files of your project and/or if you have missed any lines to test. Once the command ran successfully, the terminal should display something like this:

![Screenshot of get pagination items function incomplete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/get-pagination-items-test-coverage-incomplete.png)

Of course, it will pass as expected because we already know that our function was working well from part 1.

---

By the way, when you run `yarn test` in a Create React App project, Jest will launch in watch mode. Every time you save a file, it will re-run the tests, like how `yarn start` recompiles the code. That helps to save time when writing tests because we don't have to run the test command again and again on every file changes.

Now that you know how to write a test. The other test cases should be easy enough for you to write on your own. Just remember the arguments from the examples earlier in part 1 and validate with their expected array result. You can use the comments we added in the code as your test cases same way I did for the first test case. Challenge yourself to write those test cases and you can compare it with my code below when you're done.

Done? Now check whether you did something similar with my code below. Here's the rest of test cases:

```ts
...
describe('pagination utilities', () => {
  describe('getPaginationItems()', () => {
    ...
    it('should handle ellipsis in the middle', () => {
      expect(getPaginationItems(1, 10, 7)).toEqual([1, 2, 3, NaN, 8, 9, 10]);
      expect(getPaginationItems(9, 10, 7)).toEqual([1, 2, 3, NaN, 8, 9, 10]);
    });

    it('should handle two ellipsis', () => {
      expect(getPaginationItems(5, 10, 7)).toEqual([1, NaN, 4, 5, 6, NaN, 10]);
      expect(getPaginationItems(6, 10, 7)).toEqual([1, NaN, 5, 6, 7, NaN, 10]);
    });

    it('handle ellipsis not in the middle', () => {
      expect(getPaginationItems(3, 10, 7)).toEqual([1, 2, 3, 4, NaN, 9, 10]);
      expect(getPaginationItems(4, 10, 7)).toEqual([1, 2, 3, 4, 5, NaN, 10]);
      expect(getPaginationItems(7, 10, 7)).toEqual([1, NaN, 6, 7, 8, 9, 10]);
      expect(getPaginationItems(8, 10, 7)).toEqual([1, 2, NaN, 7, 8, 9, 10]);
    });
  });
});
```

I hope you got it right. If not, don't worry. Just keep learning and practicing and you'll get there!

Once you saved the changes, you can check your terminal which keeps track of the files changes and runs test command and you'll see a whopping 100% test coverage!

![Screenshot of get pagination items function complete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/get-pagination-items-test-coverage-complete.png)

I find it very satisfying to see them all green. Don't you too?

---

## Add tests for PageLink component

Now moving on to adding tests for `PageLink` component.

Let's start with a simple test case that the element rendered by our `PageLink` component is an [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) by _default_ (because if `disabled` prop value is `true` then [span element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) is rendered). We will need to provide a children when we render the component, so we can use `faker` to generate random data for us. Here's how the first test case for `PageLink` component in `src/components/__tests__/PageLink.test.tsx` will be:

```tsx
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import PageLink from '../PageLink';

describe('<PageLink />', () => {
  it('should render anchor element by default', () => {
    const text = faker.lorem.sentence();

    render(<PageLink>{text}</PageLink>);

    const el = screen.queryByText(text);

    expect(el?.tagName).toBe('A');
  });
});
```

So in the code above, we generated a random lorem ipsum sentence using `faker` as a text and used that as children for the `PageLink` component. Then, we executed [`render()`](https://testing-library.com/docs/react-testing-library/api/#render) method from Testing Library to render our `PageLink` component in a test environment.

After rendering the component, we queried for the element by using a method from Testing Library called [`screen`](https://testing-library.com/docs/queries/about/#screen), you can pass a [`queryOptions`](https://testing-library.com/docs/queries/about/#queryoptions) object with the query type. See the [documentation](https://testing-library.com/docs/queries/about/) for each query type to see available options such as [ByText API](https://testing-library.com/docs/queries/bytext).

After getting the element, we did an assertion by using the `expect()` method and pass the element's tag name as the argument, and run the matcher method [`.toBe()`](https://jestjs.io/docs/expect#tobevalue) which compares primitive values or to check referential identity of object instances.

---

In case you're wondering, we also have [custom matchers](https://github.com/testing-library/jest-dom#custom-matchers) methods which are specific to the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction). We can actually use one right now. Usually for anchor elements, it will have an [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute. Hence, we can further increase the realibility of this test case by generating a random [URL](https://en.wikipedia.org/wiki/URL) using `faker` and pass that as the value for the `href` prop and adding the check using the custom matcher [`.toHaveAttribute()`](https://github.com/testing-library/jest-dom#tohaveattribute):

```tsx
...
describe('<PageLink />', () => {
  it('should render anchor element by default', () => {
    const text = faker.lorem.sentence();
    const href = faker.internet.url();

    render(<PageLink href={href}>{text}</PageLink>);

    const el = screen.queryByText(text);

    expect(el?.tagName).toBe('A');
    expect(el).toHaveAttribute('href', href);
  });
});

```

In each test cases of a React component, we will have to render the component again because the `@testing-library/react@9.0.0` or higher automatically runs the [`cleanup`](https://testing-library.com/docs/react-testing-library/api/#cleanup) in [`afterEach`](https://jestjs.io/docs/api#aftereachfn-timeout). That's totally valid because we usually render the component with different props in each test cases.

---

Since we'll be writing a couple more test cases for `PageLink` component, instead of directly rendering the component using the `render` function, I'm going to create a reusable function that renders the component to reduce code duplications. This will also make it easier if ever next time we have to rename our component, we can just change it within the reusable function and not in different locations of the test file. We can create the function inside the `describe` block so all the test cases under it can use it. We will also import `Props` from the `PageLink` component file to use it as the type for the argument of this reusable function since we also utilize TypeScript when writing tests. Here's the code for that:

```tsx
...
import PageLink, { Props } from '../PageLink';

describe('<PageLink />', () => {
  const renderComponent = ({ children, ...props }: Props) =>
    render(<PageLink {...props}>{children}</PageLink>);

  it('should render anchor element by default', () => {
    const text = faker.lorem.sentence();
    const href = faker.internet.url();

    renderComponent({ href, children: text });

    ...
  });
});
```

Once you saved the changes, you can check your terminal to see the test result:

![Screenshot of PageLink component incomplete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/page-link-test-coverage-incomplete-1.png)

Using what you've learned from the first test case, try to write the test case that it should or can accept the `className` prop. For the validation, you can compare the element's class name using the custom matcher [`.toHaveClass()`](https://github.com/testing-library/jest-dom#tohaveclass).

---

Done? See if you wrote a similar code to the test case below:

```tsx
...
describe('<PageLink />', () => {
  ...
  it('should accept className props', () => {
    const text = faker.lorem.sentence();
    const className = faker.word.noun();

    renderComponent({ className, children: text });

    const el = screen.queryByText(text);

    expect(el).toHaveClass(className);
  });
});
```

With changes saved, this test case should pass as well:

![Screenshot of PageLink component incomplete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/page-link-test-coverage-incomplete-2.png)

The next few test cases would be related to `active` and `disabled` props. If either of this two prop values are `true`, their class would be added in the element's class name. I think it's good to have a countercheck in our recent test case that `active` and `disabled` is not in the class since we didn't pass any values to these props. Here's the updated test case:

```tsx
...
describe('<PageLink />', () => {
  ...
  it('should accept className prop', () => {
    ...
    expect(el).toHaveClass(className);
    expect(el).not.toHaveClass('active disabled');
  });
});
```

---

Now for the third test case, let's validate that it can accept the `active` prop. If you look at the code in `src/components/PageLink.tsx` regarding how `active` prop is being used. If the `active` prop value is `true`, we can do two checks here. One is to validate that the element should have an `active` class name. Second is to validate that the element should have an `aria-current` with the value of "page". Here's the code for this test case:

```tsx
...
describe('<PageLink />', () => {
  ...

  it('should accept active props', () => {
    const text = faker.lorem.sentence();

    renderComponent({ children: text, active: true });

    const el = screen.queryByText(text);

    expect(el).toHaveClass('active');
    expect(el).toHaveAttribute('aria-current', 'page');
  });
});
```

Once the changes are saved, let's look at the terminal again and see the test results along with the test coverage:

![Screenshot of PageLink component incomplete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/page-link-test-coverage-incomplete-3.png)

In the test coverages above, we keep seeing the line `20` as an uncovered line for a while now. Well, it's time to address that! If you look at the code in `src/components/PageLink.tsx` and look for that line. You'll see that it is related to the `disabled` prop, so let's write the test case for when the `disabled` prop value is `true`. In the test case, we can do two checks. Can you guess what are those checks? Take a moment and after you've made your guess, see and compare it with my code for this test case:

```tsx
...
describe('<PageLink />', () => {
  ...
  it('should accept disabled props', () => {
    const text = faker.lorem.sentence();

    renderComponent({ children: text, disabled: true });

    const el = screen.queryByText(text);

    expect(el?.tagName).toBe('SPAN');
    expect(el).toHaveClass('disabled');
  });
});
```

In the code above, we asserted that the element renderes is a [`span`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) element and that it has a `disabled` class name.

Okay, don't forget to save your changes. Now check how the test result and coverage is looking right now:

![Screenshot of PageLink component complete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/page-link-test-coverage-complete.png)

Boom, it passes as well and now with a 100% test coverage!

Just to wrap up the test cases for the `PageLink` component, let's do an additional check in the first test case to validate that it doesn't have the `aria-current` attribute which will be a countercheck against the `active` prop test case:

```tsx
...
describe('<PageLink />', () => {
  ...
  it('should render anchor element by default', () => {
    ...
    expect(el).toHaveAttribute('href', href);
    expect(el).not.toHaveAttribute('aria-current');
  });
  ...
});
```

Alright! We're done with the tests for `PageLink` component.

---

## Add tests for Pagination component

Let's proceed with the final set of test cases to write. Those would be for the `Pagination` component - our main component!

For the first test case, we can just check that it renders the [`nav`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) element. From the code in `src/components/Pagination.tsx`, the `nav` element has an attribute of `aria-label` with the value of "Pagination". We can use that to query the element. Here's the code for that:

```tsx
import { render, screen } from '@testing-library/react';
import Pagination, { Props } from '../Pagination';

describe('<Pagination />', () => {
  const renderComponent = (props: Props) => render(<Pagination {...props} />);

  it('should render nav element', () => {
    renderComponent({
      currentPage: 1,
      lastPage: 5,
      maxLength: 7,
      setCurrentPage: jest.fn(),
    });

    const navEl = screen.queryByLabelText('Pagination');

    expect(navEl?.tagName).toBe('NAV');
  });
});
```

Here, I'm just reusing the same arguments again from one of the examples in part 1 to keep the test cases simple and easy to understand. As for the `setCurrentPage` prop value, we needed to pass a function but instead of passing an anonymous function `() => {}`, we passed `jest.fn()` or what we call a [mock function](https://jestjs.io/docs/mock-function-api) in Jest. They are also known also known as "spies", because they let you spy on the behavior of a function that is called indirectly by some other code, rather than only testing the output. We don't need to do anything with the mock function for now besides using it as a prop value.

Now let's check whether this test case passes:

![Screenshot of Pagination component incomplete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/pagination-test-coverage-incomplete-1.png)

Indeed it passes!

---

In the same test case, we can also check the number of children or elements that the `nav` element should have. The page numbered elements count should be the same as the `lastPage` since `lastPage` is lesser than the `maxLength`, then we also have two extra elements which are the "Previous" and "Next" anchor elements. Let's update the test case:

```tsx
...
describe('<Pagination />', () => {
  ...
  it('should render nav element', () => {
    const lastPage = 5;

    renderComponent({
      lastPage,
      currentPage: 1,
      maxLength: 7,
      setCurrentPage: jest.fn(),
    });

    const navEl = screen.queryByLabelText('Pagination');

    expect(navEl?.tagName).toBe('NAV');
    expect(navEl?.childElementCount).toBe(lastPage + 2);
  });
});
```

And finally to complete this test case, let's check that the elements in the `nav` element are positioned as we expected by getting the `nav` element's [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) then check the text context of each elements via its index:

```tsx
...
describe('<Pagination />', () => {
  ...
  it('should render nav element', () => {
    ...
    const navEl = screen.queryByLabelText('Pagination');

    expect(navEl?.tagName).toBe('NAV');
    expect(navEl?.childElementCount).toBe(lastPage + 2);
    expect(navEl?.childNodes[0]).toHaveTextContent('Previous');
    expect(navEl?.childNodes[1]).toHaveTextContent('1');
    expect(navEl?.childNodes[2]).toHaveTextContent('2');
    expect(navEl?.childNodes[3]).toHaveTextContent('3');
    expect(navEl?.childNodes[4]).toHaveTextContent('4');
    expect(navEl?.childNodes[5]).toHaveTextContent('5');
    expect(navEl?.childNodes[6]).toHaveTextContent('Next');
  });
});
```

---

We can refactor the code above to reduce the code duplications:

```tsx
...
describe('<Pagination />', () => {
  ...
  it('should render nav element', () => {
    renderComponent({
      currentPage: 1,
      lastPage: 5,
      maxLength: 7,
      setCurrentPage: jest.fn(),
    });

    const navEl = screen.queryByLabelText('Pagination');
    const navElChildTextContents = [
      'Previous',
      '1',
      '2',
      '3',
      '4',
      '5',
      'Next',
    ];

    expect(navEl?.tagName).toBe('NAV');
    expect(navEl?.childElementCount).toBe(navElChildTextContents.length);

    navElChildTextContents.forEach((textContent, idx) => {
      expect(navEl?.childNodes[idx]).toHaveTextContent(textContent);
    });
  });
});
```

Alright, this should still pass if you check your terminal after saving the changes.

---

For the next test case, we can validate that the ellipsis `...` is rendered if the page number is `NaN` in the render function. We should use a `lastPage` that's more than the `maxLength` in order to get a `NaN` in the page numbers array.

Here's the code for that:

```tsx
import { render, screen } from '@testing-library/react';
import Pagination, { Props } from '../Pagination';

describe('<Pagination />', () => {
  ...
  it('should render ellipsis', () => {
    renderComponent({
      currentPage: 5,
      lastPage: 10,
      maxLength: 7,
      setCurrentPage: jest.fn(),
    });

    const navEl = screen.queryByLabelText('Pagination');
    const navElChildTextContents = [
      'Previous',
      '1',
      '...',
      '4',
      '5',
      '6',
      '...',
      '10',
      'Next',
    ];

    expect(navEl?.childElementCount).toBe(navElChildTextContents.length);

    navElChildTextContents.forEach((textContent, idx) => {
      expect(navEl?.childNodes[idx]).toHaveTextContent(textContent);
    });
  });
});
```

Once we save the changes and check the test result and coverage in the terminal, we should get this:

![Screenshot of Pagination component incomplete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/pagination-test-coverage-incomplete-2.png)

---

For the final test case, let's add the tests to cover the uncovered lines `25, 35-43`. If you look for these lines in `src/components/Pagination.tsx`, these are the `onClick` events for each of the `PageLink` components rendered.

We can use the [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events/#fireevent) method which is also from Testing Library to trigger DOM events in the test environment such as a click event.

Here's an example on how to use it:

```js
const el = screen.getByText('Click Me');

fireEvent.click(el);
```

First argument it accepts is the element you want the event to get fired to while optionally, you can pass a second argument to override the event data. To fire other DOM events, you can check out the [full list here](https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js).

So how do we validate something happened when a `PageLink` component was clicked? Remember about "spying" of mock functions? We'll be doing exactly that. Here's in the initial code for the last test case:

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
...
describe('<Pagination />', () => {
  ...
  it('should handle PageLink on click', () => {
    const setCurrentPageMock = jest.fn();
    const currentPage = 5;

    renderComponent({
      currentPage,
      lastPage: 10,
      maxLength: 7,
      setCurrentPage: setCurrentPageMock,
    });

    expect(setCurrentPageMock).not.toBeCalled();

    const previousEl = screen.queryByText('Previous') as HTMLElement;

    fireEvent.click(previousEl);

    expect(setCurrentPageMock).toBeCalledTimes(1);
    expect(setCurrentPageMock).toBeCalledWith(currentPage - 1);
  });
});
```

In the code above, we stored the mock function in a variable called `setCurrentPageMock`. Right after rendering the component, we first check that the `setCurrentPageMock` was not called before as a countercheck. We then queried for the "Previous" anchor element and fired a click event. After that, we validated that `setCurrentPageMock` was called once and that it returned the new `currentPage` value which is `currentPage` minus `1` because that's what the "Previous" anchor element should return when clicked.

---

Save the changes and this should cover line `25`. Let's verify that in the test result and coverage in the terminal:

![Screenshot of Pagination component incomplete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/pagination-test-coverage-incomplete-3.png)

Great! Now to achieve a 100% test coverage for `Pagination` component, let's cover lines `35 - 43` in the same test case. Here's the code for that:

```tsx
...
describe('<Pagination />', () => {
  ...
  it('should handle PageLink on click', () => {
    ...
    const previousEl = screen.queryByText('Previous') as HTMLElement;

    fireEvent.click(previousEl);

    expect(setCurrentPageMock).toBeCalledTimes(1);
    expect(setCurrentPageMock).toBeCalledWith(currentPage - 1);

    setCurrentPageMock.mockClear();

    const nextEl = screen.queryByText('Next') as HTMLElement;

    fireEvent.click(nextEl);

    expect(setCurrentPageMock).toBeCalledTimes(1);
    expect(setCurrentPageMock).toBeCalledWith(currentPage + 1);

    setCurrentPageMock.mockClear();

    const numText = '4';
    const numEl = screen.queryByText(numText) as HTMLElement;

    fireEvent.click(numEl);

    expect(setCurrentPageMock).toBeCalledTimes(1);
    expect(setCurrentPageMock).toBeCalledWith(Number(numText));
  });
});
```

This will now cover both the click event of a page number anchor element (`4`) and the "Next" anchor element. In the added code above, we called [`setCurrentPageMock.mockClear()`](https://jestjs.io/docs/mock-function-api#mockfnmockclear) right after the first assertions to clear all information stored such as how many times the mock function was called and what it was called with. It is useful when we want to do another assertion such as what we did above.

---

We can refactor the code above to reduce code duplications:

```tsx
...
describe('<Pagination />', () => {
  ...
  it('should handle PageLink on click', () => {
    const setCurrentPageMock = jest.fn();
    const currentPage = 5;
    const btnItems = [
      {
        text: 'Previous',
        pageNum: currentPage - 1,
      },
      {
        text: 'Next',
        pageNum: currentPage + 1,
      },
      {
        text: '4',
        pageNum: 4,
      },
    ];

    renderComponent({
      currentPage,
      lastPage: 10,
      maxLength: 7,
      setCurrentPage: setCurrentPageMock,
    });

    expect(setCurrentPageMock).not.toBeCalled();

    btnItems.forEach(({ text, pageNum }) => {
      const btnEl = screen.queryByText(text) as HTMLElement;

      fireEvent.click(btnEl);

      expect(setCurrentPageMock).toBeCalledTimes(1);
      expect(setCurrentPageMock).toBeCalledWith(pageNum);

      setCurrentPageMock.mockClear();
    });
  });
});
```

Once the changes are saved, we should achieve a 100% test coverage for the `Pagination` component as displayed in the terminal:

![Screenshot of Pagination component complete test coverage](/images/posts/how-to-create-your-own-pagination-in-react-and-typescript-with-tests/pagination-test-coverage-complete.png)

Nice job! You have completed building your own pagination component in React and TypeScript and also wrote tests for it with a 100% test coverage using Jest and Testing Library. Give yourself a pat in the back because you deserve it!

---

I hope you have learned a lot from this post, especially if you're new to TypeScript and Jest. If you found this post useful, please help to share this post to your network, colleagues or friends that may find this useful too.

If you need the final code of the pagination component as a reference, here's the [GitHub repository](https://github.com/dominicarrojado/react-typescript-pagination).

There are more posts to come for building your own components in React and TypeScript so stay tuned and come back to my blog when it's out. See ya!
