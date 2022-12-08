---
title: 'Building a URL shortener API with NestJS and MongoDB with tests (Part 2)'
date: '2022-06-07'
excerpt: 'Learn how to build server-side applications in an efficient, reliable and scalable way'
category: 'technology'
videoUrl: ''
---

## Introduction

This is a continuation from [Part 2](/posts/building-a-link-shortener-api-with-nestjs-and-mongodb-with-tests-part-1).

## Prerequisites for testing

To get started with testing, first install the required packages:

```bash
yarn add -D @nestjs/testing supertest @faker-js/faker
```

The `@nestjs/testing` package provides a set of utilities that enable a more robust testing process, [`@faker-js/faker`](https://github.com/faker-js/faker) helps us generate massive amounts of fake (but realistic) data for testing, while [`supertest`](https://github.com/visionmedia/supertest) provides a high-level abstraction for testing and simulating HTTP requests.

## Test utilities

There are two utility functions we would like to create and reuse when we write our test cases. First is creating the Nest application in a test environment that we could use for each test case. Second is to clear the TypeORM repositories (tables or collections) in our database before running each test case to keep any overflowing data that might affect the test results.

To start, create a file `src/test-helpers.ts` and add the following code for the first utility function:

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';

export async function createNestApplication({
  onBeforeInit,
}: {
  onBeforeInit: (moduleRef: TestingModule) => void;
}) {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.useGlobalPipes(new ValidationPipe());

  onBeforeInit(moduleRef);

  await app.init();

  return app;
}
```

The `Test` class from `@nestjs/testing` provides an application execution context that essentially mocks the full Nest runtime, but gives you hooks that make it easy to manage class instances, including mocking and overriding. The `Test` class has a `createTestingModule()` method that takes a module metadata object as its argument (the same object you pass to the `@Module()` decorator). This method returns a `TestingModule` instance which in turn provides a few methods. For unit tests, the important one is the `compile()` method. This method bootstraps a module with its dependencies (similar to the way an application is bootstrapped in the conventional `main.ts` file using `NestFactory.create()`), and returns a module that is ready for testing. Do note that if we want to test the validation errors we will need to call `useGlobalPipes()` after creating the Nest application.

We won't be doing [unit testing](https://docs.nestjs.com/fundamentals/testing#unit-testing) which involves mocking and overriding. What I like to do is write [end-to-end tests](https://docs.nestjs.com/fundamentals/testing#end-to-end-testing) because it covers the interaction of classes and modules at a more aggregate level - closer to the kind of interaction that end-users will have with the production system. As an application grows, it becomes hard to manually test the end-to-end behavior of each API endpoint. Automated end-to-end tests help us ensure that the overall behavior of the system is correct and meets project requirements.

We also added `onBeforeInit()` function which comes from the argument so that we could get modules such as the database connection and repositories depending on the features we would be testing.

In the same file `src/test-helpers.ts`, add the following code for the second utility function:

```ts
...
import { DataSource } from 'typeorm';

...

export async function clearRepositories(dbConnection: DataSource) {
  const entities = dbConnection.entityMetadatas;
  const promises: Array<Promise<DeleteResult>> = [];

  for (const entity of entities) {
    const repository = dbConnection.getRepository(entity.name);
    promises.push(repository.delete({}));
  }

  await Promise.all(promises);
}
```

This just iterates all the entities from the database connection, get their repository and clear it. We are accepting `dbConnection` as an argument because we could only get this once the Nest application is created, using the `onBeforeInit()`. You'll get to see this in a bit.

---

## Write tests for get all the links feature

Now that the utility functions are created, let's use them and set up the tests. Create a file `src/links/links.spec.ts` and add the following code:

```ts
import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import { clearRepositories, createNestApplication } from '../test-helpers';

describe('Links', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(Connection);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

Remember this setup as it will look similar when we create another spec (short for specification) file for other features. If you could focus on the `onBeforeInit()` function, this is how easily we could get the module, in this case `dbConnection`, from the Nest application by just passing the `Connection` class from `typeorm`. We then pass it to the `clearRepositories()` function to clear all the repositories in our database.

Now for the first test case, we can test the feature of getting all the links. This is how we can do it:

```ts
...
import * as request from 'supertest';

describe('Links', () => {
  ...

  describe('/links (GET)', () => {
    it('should handle without data', async () => {
      const res = await request(app.getHttpServer()).get('/links');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
```

We started simple, we simulated an [HTTP GET method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) request using `supertest` by executing the `.get()` function with the path, waited for the response and checked whether the `status` and `body` is what we expected. Since there's no data in the database, we expected it to return an empty array `[]`.

Let's run our application in test **watch** mode by executing the terminal command below:

```bash
yarn docker-compose:test:watch
```

The test case should pass and log something like this:

```bash
app_1      | PASS src/links/links.spec.ts
app_1      |   Links
app_1      |     /links (GET)
app_1      |       ✓ should handle without data (74 ms)
```

Okay. Before we move to the next test case where there's data in the database, we need to get the `LinksRepository` so we could make direct calls to the database to simulate our tests. To do that, simple update the file `src/links/links.spec.ts` with the following code below:

```ts
...
import { LinksRepository } from './links.repository';

describe('Links', () => {
  ...
  let linksRepository: LinksRepository;

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(Connection);
        linksRepository = moduleRef.get(LinksRepository);
      },
    });
  });
});
```

Here, we got the instance of the links repository using the `onBeforeInit()` function by passing the `LinksRepository` class in the `moduleRef.get()`. Simple, isn't it?

Next, we want to create a function that creates a link in the database with random data generated from `faker` library, let's add it in the `Links` describe block since I anticipate we'll be going to reuse it a couple of times, update `src/links/links.spec.ts` with the following code below:

```ts
...
import faker from '@faker-js/faker';

describe('Links', () => {
  ...
  let linksRepository: LinksRepository;
  const createLinkItem = async () => {
    return linksRepository.createLink({
      name: faker.word.noun(),
      url: faker.internet.url(),
    });
  };

  ...
});
```

Let's now create the second test case and update the spec file `src/links/links.spec.ts`:

```ts
...
import { Link } from './link.entity';

describe('Links', () => {
  ...

  describe('/links (GET)', () => {
    ...

    it('should handle with data', async () => {
      const links: Array<Link> = [];
      const linksCount = 3;

      for (let i = 0; i < linksCount; i++) {
        links.push(await createLinkItem());
      }

      const res = await request(app.getHttpServer()).get('/links');
      const resBody = res.body;

      expect(res.status).toBe(200);
      expect(resBody).toEqual(JSON.parse(JSON.stringify(links)));
    });
  });
});
```

You might wonder why we had to `stringify` and `parse` the `links` array, that's because when they were created, the `id` is an `ObjectID` while from the response body it is converted to a `string`.

Once we save the changes, it will automatically rerun all the tests as it is in **watch** mode and log the following:

```bash
app_1      | PASS src/links/links.spec.ts (8.539 s)
app_1      |   Links
app_1      |     /links (GET)
app_1      |       ✓ should handle without data (85 ms)
app_1      |       ✓ should handle with data (472 ms)
```

Great, we're done with testing this feature. Let's move to the next one ~

---

## Write tests for create a link feature

For the next test case, we will be testing the feature to create a link. It would be something similar to our first test case, but in this case it will be the other way around. So instead of creating the link directly to the database, we create the link by calling the API first then check the database whether it was created.

Let's write the test case where we pass **invalid** data, such as empty `name`, non-string `url`, etc. We will create a utility function that can generate a set of invalid data or payloads to be passed to the API since I anticipate we will also use it for the update a link feature:

```ts
...

describe('Links', () => {
  ...
  let linksRepository: LinksRepository;
  const createLinkBody = () => {
    return {
      name: faker.word.noun(),
      url: faker.internet.url(),
    };
  };
  const createInvalidLinkBodies = () => {
    const validLink = createLinkBody();

    return [
      // invalid payload
      undefined,
      {},

      // invalid name
      { name: undefined, url: validLink.url },
      { name: null, url: validLink.url },
      { name: faker.datatype.boolean(), url: validLink.url },
      { name: faker.datatype.number(), url: validLink.url },
      { name: JSON.parse(faker.datatype.json()), url: validLink.url },
      { name: '', url: validLink.url },

      // invalid url
      { name: validLink.name, url: undefined },
      { name: validLink.name, url: null },
      { name: validLink.name, url: faker.datatype.boolean() },
      { name: validLink.name, url: faker.datatype.number() },
      { name: validLink.name, url: JSON.parse(faker.datatype.json()) },
      { name: validLink.name, url: '' },
      { name: validLink.name, url: faker.word.noun() },
    ];
  };
  const createLinkItem = async () => {
    const linkBody = createLinkBody();

    return linksRepository.createLink(linkBody);
  };

  ...

  describe('/links (POST)', () => {
    it('should NOT accept invalid data', async () => {
      const invalidData = createInvalidLinkBodies();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((payload) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer())
              .post('/links')
              .send(payload);
            const resBody = res.body;

            expect(res.status).toBe(400);
            expect(resBody.error).toBe('Bad Request');
            expect(resBody.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });
  });
});
```

So here, we iterated through the array of invalid data and created a [self-invoking function](https://developer.mozilla.org/en-US/docs/Glossary/Self-Executing_Anonymous_Function) that is asynchronous to verify each payload and check whether we received that expected response. For the `message` inside the response body, we just check whether it is an `array` containing values of type `string` since we just use the default error messages from `class-validator` and therefore I don't think it's necessary to check the exact `string` value.

Once we save the changes, it should log something like this:

```bash
app_1      | PASS src/links/links.spec.ts (12.215 s)
...
app_1      |     /links (POST)
app_1      |       ✓ should NOT accept invalid data (94 ms)
```

Great, it passed as well!

Let's now validate where we now pass **valid** data to the API. Update the file `src/links/links.spec.ts` with the following code below:

```ts
...
import { ObjectId } from 'mongodb';

describe('Links', () => {
  ...

  describe('/links (POST)', () => {
    ...

    it('should accept valid data', async () => {
      const linkBody = createLinkBody();

      const res = await request(app.getHttpServer())
        .post('/links')
        .send(linkBody);
      const resBody = res.body;

      expect(res.status).toBe(201);
      expect(resBody).toEqual({
        ...linkBody,
        id: expect.any(String),
      });

      const linkId = resBody.id;
      const link = await linksRepository.findOne({
        where: { _id: new ObjectId(linkId) } as Partial<Link>,
      });

      expect(resBody).toEqual(JSON.parse(JSON.stringify(link)));
    });
  });
});
```

So here, we used one of the utility functions called `createLinkBody()` that we created earlier to get a valid link body or data, passed that to the API and waited for the response, then checked whether we got the expected response. We then took the `id` from the response body and checked the database directly whether the link was created and has the same data. Cool ~

Of course, it should pass as well:

```bash
app_1      | PASS src/links/links.spec.ts (12.948 s)
...
app_1      |     /links (POST)
app_1      |       ✓ should NOT accept invalid data (133 ms)
app_1      |       ✓ should accept valid data (49 ms)
```

There's another case we need to cover. Remember that we don't allow link creation if the (short) `name` already exists? Let's write the test case to validate that. Update the file `src/links/links.spec.ts` with the following code below:

```ts
...

describe('Links', () => {
  ...

  describe('/links (POST)', () => {
    ...

    it('should handle already exists', async () => {
      const existingLink = await createLinkItem();
      const linkBody = createLinkBody();

      const res = await request(app.getHttpServer()).post('/links').send({
        name: existingLink.name,
        url: linkBody.url,
      });
      const resBody = res.body;

      expect(res.status).toBe(409);
      expect(resBody.error).toBe('Conflict');
      expect(resBody.message).toBe('Short name already exists');
    });
  });
});
```

Once the changes are saved, this test case validation should be successful:

```bash
app_1      | PASS src/links/links.spec.ts (13.512 s)
...
app_1      |     /links (POST)
...
app_1      |       ✓ should handle already exists (26 ms)
```

Since we have an `if/else` conditional statement where the `if` condition will handle the "already exists" error which we have just validated in the previous test case, we will also need to validate the `else` condition to achieve complete test coverage for this feature. To do that, we can mock the `linksRepository.save()` function with the help of `jest.spyOn()` and throw an error using `.mockRejectedValue()` and pass an empty object `{}` so that `err.code` will be `undefined` - this will be handled by the `else` condition. Do note that if we mock a function, it will affect other test cases unless we restore it back to its original state using `.mockRestore()`. To write that in code, update the file `src/links/links.spec.ts` with the following below:

```ts
...

describe('Links', () => {
  ...

  describe('/links (POST)', () => {
    ...

    it('should handle unexpected error', async () => {
      const linksRepositorySaveMock = jest
        .spyOn(linksRepository, 'save')
        .mockRejectedValue({});

      const linkBody = createLinkBody();

      const res = await request(app.getHttpServer())
        .post('/links')
        .send(linkBody);
      const resBody = res.body;

      expect(res.status).toBe(500);
      expect(resBody.message).toBe('Internal Server Error');

      linksRepositorySaveMock.mockRestore();
    });
  });
});
```

After saving the changes, the test case should pass:

```bash
app_1      | PASS src/links/links.spec.ts (13.422 s)
...
app_1      |     /links (POST)
...
app_1      |       ✓ should handle unexpected error (14 ms)
```

I hope that you're slowly getting the hang of it and let's move to the next feature!

---

## Write tests for delete a link feature

Next feature to write tests for is when we delete a link. Do note that for this feature, you'll always get a `string` for the `id` since it is part of the URL, though it might not be in a valid `uuid` format. So for the first test case of this feature, let's validate that. And yes, you might have guessed it, we will create a utility function that generates a set of invalid `id` so we could reuse it later for the update a link feature:

```ts
...

describe('Links', () => {
  ...
  const createInvalidLinkIds = () => {
    return [faker.datatype.uuid(), faker.datatype.number(), faker.word.noun()];
  };

  ...

  describe('/links/:id (DELETE)', () => {
    it('should NOT accept invalid id', async () => {
      const invalidData = createInvalidLinkIds();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((linkId) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer()).delete(
              `/links/${linkId}`,
            );
            const resBody = res.body;

            expect(res.status).toBe(400);
            expect(resBody.error).toBe('Bad Request');
            expect(resBody.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });
  });
});
```

Once we save the changes, that should pass as expected:

```bash
app_1      | PASS src/links/links.spec.ts (5.652 s)
...
app_1      |     /links/:id (DELETE)
app_1      |       ✓ should NOT accept invalid id (20 ms)
```

For the next test case, it should be quite easy to write. Just to refresh our memory, every test case starts with an empty database due to the `clearRepositories()` function run before each test case. So any `id` will not exist by default. We just need to generate a random `id`, call the API with that and expect to get a "not found" error in the response. To do that, make the following code changes:

```ts
...

describe('Links', () => {
  ...

  describe('/links/:id (DELETE)', () => {
    ...

    it('should handle not found', async () => {
      const linkId = faker.datatype.mongodbObjectId();
      const res = await request(app.getHttpServer()).delete(`/links/${linkId}`);
      const resBody = res.body;

      expect(res.status).toBe(404);
      expect(resBody.error).toBe('Not Found');
      expect(resBody.message).toBe(`Link with ID: "${linkId}" not found`);
    });
  });
});
```

You should be familiar with what was done here, but something new that we did though is that for the `message` in the response body, we did an exact check of the `string` value instead of just type checking, that's because we did define that by ourselves earlier.

Once again this test case should pass:

```bash
app_1      | PASS src/links/links.spec.ts (11.199 s)
...
app_1      |     /links/:id (DELETE)
app_1      |       ✓ should NOT accept invalid id (13 ms)
app_1      |       ✓ should handle not found (11 ms)
```

For the last test case of this feature, let's create a link directly to the database (using `createLinkItem()` function), get the `id` of it, call the API with that and expect a successful response, and as an additional check, we will also verify from the database directly whether the link is deleted. Let's update the code with the following:

```ts
...

describe('Links', () => {
  ...

  describe('/links/:id (DELETE)', () => {
    ...

    it('should handle delete', async () => {
      const link = await createLinkItem();
      const linkId = link.id;

      const res = await request(app.getHttpServer()).delete(`/links/${linkId}`);

      expect(res.status).toBe(200);

      const deletedLink = await linksRepository.findOne({ id: linkId });

      expect(deletedLink).toBeUndefined();
    });
  });
});
```

And once we save the changes, it will pass this test case as expected:

```bash
app_1      | PASS src/links/links.spec.ts (12.325 s)
...
app_1      |     /links/:id (DELETE)
...
app_1      |       ✓ should handle delete (39 ms)
```

Let's move to the next feature to be tested ~

---

## Write tests for update a link feature

For updating a link feature, all test cases except one are a combination of what we have already done for the previous features. We just have to replace the method to use `.put()`. Let's settle those first and add the following code:

```ts
...

describe('Links', () => {
  ...

  describe('/links/:id (PUT)', () => {
    it('should NOT accept invalid id', async () => {
      const invalidData = createInvalidLinkIds();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((linkId) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer()).put(
              `/links/${linkId}`,
            );
            const resBody = res.body;

            expect(res.status).toBe(400);
            expect(resBody.error).toBe('Bad Request');
            expect(resBody.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });

    it('should NOT accept invalid data', async () => {
      const linkId = faker.datatype.mongodbObjectId();
      const invalidData = createInvalidLinkBodies();
      const promises: Array<Promise<void>> = [];

      invalidData.forEach((payload) => {
        promises.push(
          (async () => {
            const res = await request(app.getHttpServer())
              .put(`/links/${linkId}`)
              .send(payload);
            const resBody = res.body;

            expect(res.status).toBe(400);
            expect(resBody.error).toBe('Bad Request');
            expect(resBody.message).toEqual(
              expect.arrayContaining([expect.any(String)]),
            );
          })(),
        );
      });

      await Promise.all(promises);
    });

    it('should handle not found', async () => {
      const linkId = faker.datatype.mongodbObjectId();
      const linkBody = createLinkBody();
      const res = await request(app.getHttpServer())
        .put(`/links/${linkId}`)
        .send(linkBody);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Not Found');
    });
  });
});
```

Save the changes and these test cases will `PASS` ✓:

```bash
app_1      | PASS src/links/links.spec.ts (12.076 s)
...
app_1      |     /links/:id (PUT)
app_1      |       ✓ should NOT accept invalid id (12 ms)
app_1      |       ✓ should NOT accept invalid data (45 ms)
app_1      |       ✓ should handle not found (11 ms)
```

Great. And for that one test case I mentioned earlier that we haven't done previously is the feature itself and check whether it can update an existing link with new data, let's write it and update with the following code below:

```ts
...

describe('Links', () => {
  ...

  describe('/links/:id (PUT)', () => {
    ...

    it('should handle update', async () => {
      const link = await createLinkItem();
      const linkId = link.id;
      const newLinkBody = createLinkBody();

      const res = await request(app.getHttpServer())
        .put(`/links/${linkId}`)
        .send(newLinkBody);
      const resBody = res.body;

      expect(res.status).toBe(200);
      expect(resBody).toEqual({
        ...newLinkBody,
        id: linkId,
      });

      const updatedLink = await linksRepository.findOne({ id: linkId });

      expect(updatedLink).toEqual(resBody);
    });
  });
});
```

With the changes above, it should pass and the terminal logs should be like this:

```bash
app_1      | PASS src/links/links.spec.ts (12.185 s)
...
app_1      |       ✓ should handle update (30 ms)
```

---

## Write tests for redirect to URL by name feature

For the final feature we need to write tests for is the redirect to the URL by its (short) name. Since this feature is located in another module (`WildcardModule`), let's create a new file `src/wildcard/wildcard.spec.ts` and add the same code we did for the setup earlier, let's also keep `createLinkItem()` function and `linksRepository` as we will be needing it here too:

```ts
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import faker from '@faker-js/faker';
import { clearRepositories, createNestApplication } from '../test-helpers';
import { LinksRepository } from '../links/links.repository';

describe('Wildcard', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let linksRepository: LinksRepository;
  const createLinkItem = async () => {
    return linksRepository.createLink({
      name: faker.word.noun(),
      url: faker.internet.url(),
    });
  };

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(Connection);
        linksRepository = moduleRef.get(LinksRepository);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

Alright, for the first test case of this feature, we should get a "not found" error if we simulate a GET request to a non-existing name. Since you should have quite an experience now with writing tests. That should be easy, right? Try it on your own before looking at the code below:

```ts
...

describe('Wildcard', () => {
  ...

  describe('/:name (GET)', () => {
    it('should handle not found', async () => {
      const shortName = faker.word.noun();
      const res = await request(app.getHttpServer()).get(`/${shortName}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Not Found');
    });
  });
});
```

Did you do it on your own? I hope so! But if not, that's fine because reaching this stage is still an achievement!

Once we save the changes, it should log something like this:

```
app_1      | PASS src/wildcard/wildcard.spec.ts (16.214 s)
app_1      | PASS src/links/links.spec.ts (17.044 s)
```

Great, we are down to the very last test case. Try it on your own again, I'll explain here in text what you need to do, first create a link by making a direct call to the database, then simulate a GET request to the API with the link's `name`, and check that the expected status code should be `301` and that it is redirecting to the URL, you can check `res.headers.location` for this.

Go ahead and try it ~

Once you're done, verify that we have the same changes here:

```ts
...

describe('Wildcard', () => {
  ...

  describe('/:name (GET)', () => {
    ...

    it('should handle redirect', async () => {
      const link = await createLinkItem();
      const res = await request(app.getHttpServer()).get(`/${link.name}`);

      expect(res.status).toBe(301);
      expect(res.headers.location).toBe(link.url);
    });
  });
});
```

And that should pass the test case as well:

```
app_1      | PASS src/wildcard/wildcard.spec.ts (14.112 s)
app_1      | PASS src/links/links.spec.ts (18.044 s)
```

If you're curious about the code coverage from our end-to-end tests. Try running the command below in your terminal:

```
yarn docker-compose:test:cov
```

You should see that we have achieved 100% coverage for both `LinksModule` and `WildcardModule`. That's awesome!

And we are done! To be honest, I'm quite new in building applications with NestJS and writing this post was my way of sharpening my knowledge with this framework. So I hope you have learned a lot from this post as I have. Please don't forget to share this post if you found it helpful, share it with your friends and colleagues who might find this helpful too.

In case you need the final code of the URL shortener application as a reference, here's the [GitHub repository](https://github.com/dominicarrojado/nestjs-mongodb-url-shortener).

I'll probably extend this post in the future and try to implement caching using [Redis](https://redis.io/) or how to deploy this application to production so if you're interested, you can come back to my blog and check it out once it is published. You can also subscribe to my [YouTube channel](https://www.youtube.com/channel/UCWwV__qrzg5BYCSwO91Xhxg/videos?view=0&sort=dd) and hit that notification button. Hope to see you here again!
