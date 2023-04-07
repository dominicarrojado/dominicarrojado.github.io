---
title: 'Different ways to use the useRef hook in React'
date: '2023-04-07'
excerpt: "Learn about the various use cases of React's useRef hook"
category: 'technology'
videoUrl: ''
---

## Introduction

One of my favorite features that [React](https://react.dev/) introduced is [React Hooks](https://react.dev/reference/react) - I mentioned this before in my [previous post](/posts/how-to-integrate-with-a-rest-api-using-react-hooks-and-typescript-with-tests/). React Hooks allow you to use state and other React features without writing a class, making it easier to build React components and features. One hook that I find particularly useful is [`React.useRef`](https://react.dev/reference/react/useRef). Although it is often used to manipulate the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), it has other use cases as well. In this article, we'll explore different ways to use the useRef hook. Let's get started!

## What is React.useRef?

`React.useRef` is one of the built-in hooks introduced in React. It lets you reference a value that's not needed for rendering or it allows you persist values between renders. To put it simply, it's a way to store a value that doesn't cause a re-render when updated.

Now that you know what `useRef` is, let's find out the different ways you can use it.

## Manipulating the DOM with a ref

Manipulating the DOM with a ref is the most common way to use `useRef`. It allows you to access a child element imperatively.

Here's an example of a component that will automatically focus on the input element on mount:

```tsx
import { useRef, useEffect } from 'react';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} type="email" />;
}
```

---

## Referencing a value with a ref and using it in a callback

You can also store different kinds of data inside a ref. This is useful when you want to use a value that's not needed for rendering, like storing an interval ID.

Here's an example of a component that will increment a counter every second, and you can stop the interval with a click of a button:

```tsx
import { useRef, useState, useEffect } from 'react';

function MyComponent() {
  const intervalId = useRef(0);
  const [counter, setCounter] = useState(0);

  const stopInterval = () => {
    window.clearInterval(intervalId.current);
  };

  useEffect(() => {
    intervalId.current = window.setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => {
      stopInterval();
    };
  }, []);

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={stopInterval}>Stop interval</button>
    </div>
  );
}
```

## Referencing a value with a ref and using it in a useEffect

You can also use a ref to store a value that you want to access in a [`React.useEffect`](https://react.dev/reference/react/useEffect) hook. This is useful if for example you have a window event listener that can only get the updated value from a ref.

Here's an example of a component that will increment a counter every second and log the current value of the counter when the user clicks on the screen:

```tsx
import { useRef, useState, useEffect } from 'react';

function MyComponent() {
  const [counter, setCounter] = useState(0);
  const counterRef = useRef(0);

  const increaseCount = () => {
    counterRef.current += 1;
    setCounter(counterRef.current);
  };

  useEffect(() => {
    const intervalId = window.setInterval(increaseCount, 1000);

    const handleMouseDown = () =>
      console.log(`The current counter is ${counterRef.current}`);

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return <p>Counter: {counter}</p>;
}
```

---

Here's a custom hook that extends the functionality of [`React.useState`](https://react.dev/reference/react/useState) and provides a ref to the current state:

```tsx
// lib/custom-hooks.ts
import { useState, useRef } from 'react';

export function useStateRef<S>(defaultValue: S) {
  const ref = useRef<S>(defaultValue);
  const [state, _setState] = useState<S>(defaultValue);
  const setState = (value: S) => {
    ref.current = value;
    _setState(value);
  };

  return [state, setState, ref] as const;
}
```

If you're new to [TypeScript](https://www.typescriptlang.org/), you might be wondering what the `S` type is. It's a [generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html) that allows you to pass a type to the function. In this case, we're passing the type of the state to the `useStateRef` function. This allows us to use the same function for different types of state. As for the `as const` part, it's a [TypeScript assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) that tells TypeScript that the array returned by the `useStateRef` function will always have the same types.

Using this hook can make it easier to use a ref in a `useEffect` hook. Here's the updated version of the previous example using the `useStateRef` hook:

```tsx
...
import {useStateRef} from './lib/custom-hooks';

function MyComponent() {
  const [counter, setCounter, counterRef] = useStateRef(0);

  const increaseCount = () => {
    setCounter(counterRef.current + 1);
  };

  useEffect(() => {
    ...
  }, []);

  return <p>Counter: {counter}</p>;
}

```

---

## More complex examples

While the examples we've seen so far are simple, `useRef` can also be used for more complex use cases. For instance, you might need to allow the user to drag a box around the screen. In this case, you can use `useRef` to store the initial position of the mouse when the user clicks on the box, and then use it to calculate the new position of the box as the user moves the mouse.

Here's an example of a component that lets you drag a box around:

```tsx
import React, { useRef, useState } from 'react';

function MyComponent() {
  const previousPositionRef = useRef({ x: 0, y: 0 });
  const initialPosition = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({
      x: previousPositionRef.current.x + e.clientX - initialPosition.current.x,
      y: previousPositionRef.current.y + e.clientY - initialPosition.current.y,
    });
  };

  const handleMouseUp = () => {
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    previousPositionRef.current = position;
    initialPosition.current = {
      x: e.clientX,
      y: e.clientY,
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: 100,
        height: 100,
        backgroundColor: 'red',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
}
```

---

Another example or use case is when you have two states that you need to be included in a callback function but the useEffect hook only has one state as a dependency. You can use a ref to store the value of the other state and then use it in the callback function.

Here's an example of a component that has two inputs and logs the values of both inputs when the first input changes:

```tsx
import { useState, useEffect, useRef } from 'react';

function MyComponent() {
  const [firstData, setFirstData] = useState('John');
  const [secondData, _setSecondData] = useState('Doe');
  const secondDataRef = useRef(secondData);

  useEffect(() => {
    console.log({ firstData, secondData: secondDataRef.current });
    // TODO: do something with these two values
  }, [firstData]);

  return (
    <div>
      <input
        type="text"
        value={firstData}
        onChange={(e) => setFirstData(e.target.value)}
      />
      <input
        type="text"
        value={secondData}
        onChange={(e) => {
          secondDataRef.current = e.target.value;
          setSecondData(e.target.value);
        }}
      />
    </div>
  );
}
```

While you could technically just log `secondData` in the `useEffect` hook, doing so would give you a lint warning because `secondData` is not a dependency of the hook, and there may be times when its value is not updated. By using `useRef`, you can ensure that the value of `secondData` is always up-to-date before the `useEffect` hook runs.

Also while I'm just logging the values of the two inputs in the `useEffect` hook, you could do something more complex with them. For instance, you could make an [API](https://developer.mozilla.org/en-US/docs/Glossary/API) call using the values of the two inputs but only call the API when the first input changes.

## Conclusion

That's it for this article. We have covered the different ways you can use `useRef` in your React components. I hope this article was useful for you and that you learned something new.

Don't forget to check out the official React documentation for more information about `useRef`.

Thanks for reading!

## References

- [React.useRef documentation](https://react.dev/reference/react/useRef)
- [Legacy React.useRef documentation](https://legacy.reactjs.org/docs/hooks-reference.html#useref)
