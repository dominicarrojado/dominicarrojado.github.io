---
title: 'Building a URL shortener API with NestJS and PostgreSQL with tests (Part 1)'
date: '2022-05-18'
excerpt: 'Learn how to build server-side applications in an efficient, reliable and scalable way'
category: 'technology'
videoUrl: 'https://youtu.be/c81MhWCuHbI'
---

## Introduction

I started a server-side application late of 2020 which was my way of sharpening my back-end development skills on the side as I have been focused more on the front-end development in my recent jobs. It was built using [Express.js](https://expressjs.com/) which is a fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/). But becuase of its unopinionated nature, there were a couple of things I had to set up and configure on my own such as [TypeScript](https://www.typescriptlang.org/). Although that might be a benefit for most cases, there's definitely some pitfalls as well such as not knowing what are some of the best practices when it comes to building server-side applications. You have to do your research and keep yourself up-to-date. The difficulties of those I've mentioned became more obvious when I chance upon myself with [NestJS](https://nestjs.com/), it is a progressive Node.js framework for building efficient, reliable and scalable server-side applications. NestJS is in fact built on top of Express. I took up a course to learn more about NestJS and how to build applications on top of it and I really liked it. It is extensible, versatile and progressive. It takes advantage of the latest JavaScript features, bringing design patterns and mature solutions to the Node.js world. I can't help but think how my server-side application could have been better in many ways if I built it using NestJS from the start. I wanted to improve my skills in NestJS by building something I have not done before, and that is a [URL](https://en.wikipedia.org/wiki/URL) shortener application. That is what I'm going to share with you in this post, so let's go ahead and start learning and building it together!

## Prerequisites

Upon writing this post, I assume that you have some server-side application development background and basic knowledge regarding [npm](https://www.npmjs.com/), [yarn](https://classic.yarnpkg.com/lang/en/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/), [Node.js](https://nodejs.org/en/), [NestJS](https://docs.nestjs.com/), [TypeORM](https://typeorm.io/) and [PostgreSQL](https://www.postgresql.org/).

Please make sure to install [Yarn](https://classic.yarnpkg.com/lang/en/) and [Docker Desktop](https://www.docker.com/products/docker-desktop/) in your system if you haven't. We use [Yarn](https://classic.yarnpkg.com/lang/en/) as our package manager, it's just like [npm](https://www.npmjs.com/) but _faster_. While we use [Docker](https://www.docker.com/) throughout the development lifecycle for fast, easy and portable application development.

We'll be using [Visual Studio Code](https://code.visualstudio.com/) as our [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) for building the application as we will utilize a few extensions from their [marketplace](https://marketplace.visualstudio.com/vscode).

We'll also use [Postman](https://www.postman.com/) to interact with the API.

---

## Initialize your project

To start, you would need to setup your local development for NestJS projects with PostgreSQL, I've written a [separate post](/posts/local-development-setup-for-nestjs-projects-with-postgresql/) if you would like to know the details of that setup, but you can also choose to skip that and just clone the [boilerplate](https://github.com/dominicarrojado/nestjs-postgres-boilerplate) to save time:

```bash
git clone git@github.com:dominicarrojado/nestjs-postgres-boilerplate.git url-shortener
```

We'll be utilizing the Nest CLI commands throughout this post so do install the npm package of it as well.

```bash
yarn global add @nestjs/cli
```

Once cloned, let's open the project in Visual Studio Code. You can install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions in Visual Studio Code if you haven't to help with code formatting and linting checks.

Then, open the terminal in Visual Studio Code. The keyboard shortcut would be `Ctrl` + `` ` ``.

Next, type the following below in your terminal to install the npm packages or dependencies of the boilerplate:

```bash
yarn install --frozen-lockfile
```

Once dependencies are installed and your Docker Desktop application is running in the background, let's run our project to see if everything is working fine by executing the terminal command below:

```bash
yarn docker-compose:dev
```

It might take some time especially the first time you build the application as it will do a fresh install of all the dependencies in an isolated environment using Docker Compose. Once the application is running, open your browser and go to `http://localhost:3000/`. You should see the `Hello World!` message.

This command will run the application in Docker Compose environment while watching your files, when you have changes, it will automatically start recompiling and reloading the application server. That's great for local development!

## Clean up the project

Now, let's clean up our project which was created by Nest CLI and the boilerplate. Delete the following files below as we won't be needing them:

- src/app.controller.ts
- src/app.controller.spec.ts
- src/app.service.ts
- src/users/
- test/

Now go to `src/app.module.ts` and update the file to remove the imports for `AppController`, `AppService` and `UsersModule` which we have just deleted:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './config.schema';

@Module({
  ...
  controllers: [],
  providers: [],
})
export class AppModule {}
```

---

## Create LinksModule

Since we're going to be working with links for our URL shortener API, we need a module for it. A (feature) module in Nest simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries. This helps us manage complexity and develop with [SOLID](https://en.wikipedia.org/wiki/SOLID) principles, especially as the size of the application and/or team grow.

In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly. That's awesome because we can share features between modules without duplicating the code in another module.

To create a module for links. In the root folder of our project, you can simply run this Nest CLI command in your OS terminal:

```bash
nest g module links
```

This command will create a file `src/links/links.module.ts` and the new module gets imported in our main app module by updating `src/app.module.ts` for us.

## Create LinksController

Controllers are responsible for handling incoming requests and returning responses to the client.

To create a controller for links. In the root folder of our project, you can simply run this Nest CLI command in your OS terminal:

```bash
nest g controller links --no-spec
```

This command will create a file `src/links/links.controller.ts` and the new controller gets imported in our links module by updating `src/links/links.module.ts`.

A command parameter `--no-spec` was added to prevent Nest CLI default behaviour of creating a `spec` file which where we write tests for our controller. Although we are going to write tests for it later, we don't need it at the moment.

## Create LinksService

Services are responsible for business logics, such as data storage and retrieval, and is designed to be used by a controller. Service is a good candidate to be defined as a provider.

But what is a provider? From Nest documentation, providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can be injected as dependency; this means objects can create various relationships with each other, and the function of "wiring up" instances of objects can largely be delegated to the Nest runtime system.

To create a service for links. In the root folder of our project, you can simply run this Nest CLI command in your OS terminal:

```bash
nest g service links --no-spec
```

This command will create a file `src/links/links.service.ts` and the new controller gets imported in our links module by updating `src/links/links.module.ts`.

---

## TypeORM

We'll be using [TypeORM](https://typeorm.io/) which is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) that can help us develop any kind of application that uses databases in a JavaScript or TypeScript friendly way to communicate to the database rather than sending plain queries directly. It also handles a lot of things automatically such as database handling, data types, relations, etc. It also has database abstraction and they support a number of databases, that means we're not tied to a specific database, we can use PostgreSQL today and maybe use [MongoDB](https://www.mongodb.com/) tomorrow by just changing the configuration when initializing TypeORM and minor changes to the shape of your entities.

This local development setup for NestJS that we're using already has TypeORM set up, we don't have to do anything extra.

## Create Link entity

Before we start interacting with the database using TypeORM. We'll need to create an entity for our links. Entity is a class that maps to a database table (or collection when using MongoDB). Entity will help us maintain the shape of our links in the database in the form of code that's easy to maintain.

Let's go ahead and create a file `src/links/link.entity.ts`. It is important to follow the convention `.entity.ts` as part of the file name because that's how TypeORM with a configuration of `autoLoadEntities` set as `true` will know how to auto load them.

You can create an entity by defining a new class and mark it with a decorator `@Entity()`. Nest is built around a language feature called decorators. Decorators are a well-known concept in a lot of commonly used programming languages, but in the JavaScript world, they're still relatively new. In order to better understand how decorators work, Nest documentation recommends reading [this article](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841). Here's a simple definition:

> An ES2016 decorator is an expression which returns a function and can take a target, name and property descriptor as arguments. You apply it by prefixing the decorator with an `@` character and placing this at the very top of what you are trying to decorate. Decorators can be defined for either a class, a method or a property.

Now you have a better understanding of entities and decorators. Let's go ahead and update `src/links/link.entity.ts` with the following code:

```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  url: string;
}
```

Since database tables consist of columns, your entities must consist of columns too. Each entity class property you marked with a decorator `@Column()` will be mapped to a database table column. A column can accept options such as `unique` that marks the column as unique column (creates unique constraint). You can see the other options [here](https://typeorm.io/entities#column-options). Each entity must have at least one primary column. There are several types of primary columns found [here](https://typeorm.io/entities#primary-columns). We'll be using `@PrimaryGeneratedColumn('uuid')` which the value will be automatically generated with uuid. Uuid is a unique string id. You don't have to manually assign its value before save - value will be automatically generated.

## Active Record vs. Data Mapper patterns

In TypeORM you can use both the Active Record and the Data Mapper patterns. Using the Active Record approach, you define all your query methods inside the model itself, and you save, remove, and load objects using model methods. Simply said, the Active Record pattern is an approach to access your database within your models. Using the Data Mapper approach, you define all your query methods in separate classes called "repositories", and you save, remove, and load objects using repositories. In data mapper your entities are very dumb - they just define their properties and may have some "dummy" methods. Simply said, data mapper is an approach to access your database within repositories instead of models. You can read more about them in detail [here](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md).

We'll be using the **Data Mapper** approach as it is more cleaner and more organized that way which results in a more maintainable code, which is more effective in larger applications.

---

## Create LinksRepository

Since we'll be using the Data Mapper approach, we need to create a repository for our links. A repository helps us manage (insert, update, delete, load, etc.) any entity.

Let's create a file `srcs/links/links.repository.ts` and add the following code:

```ts
import { EntityRepository, Repository } from 'typeorm';
import { Link } from './link.entity';

@EntityRepository(Link)
export class LinksRepository extends Repository<Link> {}
```

We now have a repository for our links, to make it available in our links module, go to `src/links/links.module.ts` and import it:

```ts
...
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksRepository } from './links.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LinksRepository])],
  ...
})
export class LinksModule {}
```

## Get all links feature

With our links repository created and available in our links module, we're now ready to create our first feature and that is to get all the links from our database.

First, open the file `src/links/links.service.ts` and update the code with the following:

```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinksRepository } from './links.repository';

@Injectable()
export class LinksService {
  linksRepository: LinksRepository;

  constructor(
    @InjectRepository(LinksRepository) linksRepository: LinksRepository
  ) {
    this.linksRepository = linksRepository;
  }

  async getAllLinks(): Promise<Array<Link>> {
    return this.linksRepository.find({});
  }
}
```

Here we did a dependency injection, we injected the links repository into our service via the `constructor` with the help of the `@InjectRepository` decorator provided by `@nestjs/typeorm`. We then use the links repository to make a database call to find all the links and return it. Notice that we have used our `Link` entity as the return type as well.

We can further shorten the injection of the repository by doing it like this:

```ts
...
export class LinksService {
  constructor(
    @InjectRepository(LinksRepository) private readonly linksRepository: LinksRepository,
  ) {}

  ...
}
```

Now go to `src/links/links.controller.ts` and let's import the `LinksService` like this:

```ts
import { Controller } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}
}
```

Now that `LinksService` is injected into our controller, we can now use it for our `GET` request. In order to accept incoming `GET` requests, we can use the `Get()` decorator provided by Nest.

Let's now update `src/links/links.controller.ts` to accept a `GET` request from `/links`, here's the code:

```ts
import { Controller, Get } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  getAllLinks() {
    return this.linksService.getAllLinks();
  }
}
```

That's how simple it is in Nest! You can open your Postman API client and do a `GET` request to `http://localhost:3000/links`. Remember that your server must be running by executing the command `yarn start:dev` on your terminal.

It should return a status of `200 OK` and return you an empty array `[]` because we didn't create any links yet.

---

## Create a link feature

The next feature we need to implement now is to be able to create a link. Let's create a new function in `src/links/links.service.ts`:

```ts
...

@Injectable()
export class LinksService {
  ...

  createLink(name: string, url: string): Link {
    const link = this.linksRepository.create({
      name,
      url,
    });

    await this.linksRepository.save(link);

    return link;
  }
}
```

Now `createLink` function is ready to be used. Let's go and update `src/links/links.controller.ts` to accept a `POST` request from `/links`, here's the code:

```ts
import { Body, Controller, Get, Post } from '@nestjs/common';
...
export class LinksController {
  ...

  @Post()
  createLink(
    @Body('name') name: string,
    @Body('url') url: string,
  ): Promise<Link> {
    return this.linksService.createLink(name, url);
  }
}

```

`@Body` is another decorator from Nest which we can use to get a field from the request body or payload.

After saving the changes. Let's again open our Postman API client and do a `POST` request to `http://localhost:3000/links` with a [JSON](https://en.wikipedia.org/wiki/JSON) object containing `name` and `url`.

```json
{
  "name": "longestintheworld",
  "url": "https://llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.co.uk/"
}
```

It should return a status of `201 Created` and return you with the same JSON object with an `id`, something like this:

```json
{
  "name": "longestintheworld",
  "url": "https://llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.co.uk/",
  "id": "2541f387-1ff5-4049-b64c-a3afaf440821"
}
```

If you do a `GET` request to `http://localhost:3000/links`, it should now return an array containing the same JSON object above.

```json
[
  {
    "name": "longestintheworld",
    "url": "https://llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.co.uk/",
    "id": "2541f387-1ff5-4049-b64c-a3afaf440821"
  }
]
```

Cool! This means everything is working properly as expected.

To keep things simple in the links service and make it easier to write tests later on, let's move the code that creates the links as a custom method to our links repository `srcs/links/links.repository.ts`:

```ts
...
export class LinksRepository extends Repository<Link> {
  async createLink(name: string, url: string): Promise<Link> {
    const link = this.create({
      name,
      url,
    });

    await this.save(link);

    return link;
  }
}
```

And then update the links service file `src/links/links.service.ts` like this:

```ts
...
export class LinksService {
  ...

  async createLink(name: string, url: string): Promise<Link> {
    return this.linksRepository.createLink(name, url);
  }
}
```

You can open your Postman API client and do the previous requests we did earlier (use a unique `name` for every new link) and everything should still work properly as before. Cool! Let's continue ~

---

## Data Transfer Objects (DTO)

You may have already noticed how many times we had to refer to the properties of a link within our code, in particular, the `name` and `url` is passed around from the controller to the service, just to create the link. In the real-world, requirements change and having multiple reference at difference places adds complexity to our application and makes it more difficult to maintain and scale it.

This is how [Data Transfer Objects (DTO)](https://en.wikipedia.org/wiki/Data_transfer_object) saves us from this complexity. It is a common concept in software development that is not specific to Nest. Not only it is helpful for encapsulating data between processes but can also be useful for data validations. Do note that DTO is not a model definition but defines the shape of data for a specific process, for example - creating a link.

DTO, similar to model, can defined as classes or interfaces. As per Nest documentation, the recommended approach is to use classes. So let's go with that.

## Implement CreateLinkDto

Now let's create the DTO for creating a link. Create a file `src/links/dto/create-link.dto.ts` and add the following code below:

```ts
export class CreateLinkDto {
  name: string;
  url: string;
}
```

To make use of this DTO, let's update our repository `src/links/links.repository.ts`:

```ts
...
import { CreateLinkDto } from './dto/create-link.dto';

@EntityRepository(Link)
export class LinksRepository extends Repository<Link> {
  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    const { name, url } = createLinkDto;
    const link = this.create({
      name,
      url,
    });

    ...
  }
}
```

Then update our service `src/links/links.service.ts`:

```ts
...
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  ...

  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    return this.linksRepository.createLink(createLinkDto);
  }
}
```

And lastly update our controller `src/links/links.controller.ts`:

```ts
...
import { CreateLinkDto } from './dto/create-link.dto';

@Controller('links')
export class LinksController {
  ...

  @Post()
  createLink(@Body() createLinkDto: CreateLinkDto): Promise<Link> {
    return this.linksService.createLink(createLinkDto);
  }
}
```

You can open your Postman API client again and do the previous requests we did earlier (use a unique `name` for every new link) and everything should still work properly as before. Great!

---

## Redirect to URL by name feature

Now let's create the feature that makes our application a URL shortener. And that is to redirect to the actual URL by its (short) name, or if we combine with the [domain](https://en.wikipedia.org/wiki/Domain_name), by its short URL.

Go to `src/links/links.service.ts` and create a new function:

```ts
...
import { FindConditions } from 'typeorm';

@Injectable()
export class LinksService {
  ...

  async getLink(conditions: FindConditions<Link>): Promise<Link> {
    return this.linksRepository.findOne(conditions);
  }
}
```

We defined the type of the argument of our newly created function as `FindConditions<Link>`, this is so we could reuse the same function later on for when we update a link via its `id`.

We need to create another module with a controller that can handle the redirection logic. This controller will not have a path name (e.g. `/links`) so that our URL can be as short as possible. While we can have the a short domain that points to our server, we also don't need another level of path (e.g. `/links/my-short-url`) as part of the generated short URL.

Using what we've learned so far for creating a module and controller, let's once again use Nest CLI:

```bash
nest g module wildcard
nest g controller wildcard --no-spec
```

Let's make a minor update to the generated controller `src/wildcard/wildcard.controller.ts` to remove the path argument from the `@Controller` decorator:

```ts
...

@Controller()
export class WildcardController {}
```

To use functions from `LinksService` to other controllers, we need to export it from its module in `src/links/links.module.ts` like this:

```ts
...

@Module({
  ...
  exports: [LinksService],
})
export class LinksModule {}
```

And then import the `LinksModule` in `src/wildcard/wildcard.module.ts` like this:

```ts
...
import { LinksModule } from 'src/links/links.module';

@Module({
  imports: [LinksModule],
  controllers: [WildcardController],
})
export class WildcardModule {}
```

Finally, let's update `src/wildcard/wildcard.controller.ts` once again to handle the URL shortener logic by using the `LinksService` function of getting the link by its (short) name:

```ts
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinksService } from 'src/links/links.service';

@Controller()
export class WildcardController {
  constructor(private readonly linksService: LinksService) {}

  @Get('/:name')
  async handleRedirect(
    @Param('name') name: string,
    @Res() res: Response
  ): Promise<void> {
    const link = await this.linksService.getLink({ name });
    return res.redirect(301, link.url);
  }
}
```

Let's again open our Postman API client. Do a `GET` request to `http://localhost:3000/longestintheworld`, it should return a status of `200 OK` and return you some HTML code. That means our URL shortener application is doing what it is intended to do. You can also try it on your browser, visit `http://localhost:3000/longestintheworld`, and you'll get redirected to `https://llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.co.uk/`.

You might be wondering why not just use the `AppController` from earlier? That's because if we create the controller there (e.g. `Get('/:name')`), it will take precedence against all GET requests from other controllers. For example, a GET request to `/links` will be routed to the `AppController` instead of the `LinksController` which is not ideal. That's why we had to create `WildcardController` instead so that it will be created and handle routes only after other controllers first.

---

## Delete a link feature

If we can create links, we should be able to delete them as well. Let's go ahead and implement the feature to delete a link. You know the drill, let's first create the delete function in the links service `src/links/links.service.ts`:

```ts
...
export class LinksService {
  ...

  async deleteLink(id: string): Promise<void> {
    await this.linksRepository.delete({ id });
  }
}
```

After we created the function in the service, we use it in the controller `src/links/links.controller.ts`:

```ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
...
export class LinksController {
  ...

  @Delete('/:id')
  deleteLink(@Param('id') id: string): Promise<void> {
    return this.linksService.deleteLink(id);
  }
}
```

You can open your Postman API client, do a `DELETE` request to `http://localhost:3000/links/:id`, do replace `:id` with the `id` you got from creating a link or from getting all the links. It should return a status of `200 OK`.

## Implement UpdateLinkDto

To complete our set of APIs, we should be able to update a link as well. Let's first create the DTO for updating a link. Create a file `src/links/dto/update-link.dto.ts` and add the following code below:

```ts
export class UpdateLinkDto {
  name: string;
  url: string;
}
```

Although it's the same shape as `CreateLinkDto` right now, it is still a good idea to separate them per use case so that it is future-proof.

---

## Update a link feature

Now we can update the service `src/links/links.service.ts` to add the feature to update a link:

```ts
...
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinksService {
  ...

  async updateLink(id: string, updateLinkDto: UpdateLinkDto): Promise<Link> {
    const link = await this.getLink({ id });
    const { name, url } = updateLinkDto;

    link.name = name;
    link.url = url;

    await this.linksRepository.save(link);

    return link;
  }
}
```

Then update the controller `src/links/links.controller.ts` to use the function from the service:

```ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateLinkDto } from './dto/update-link.dto';
...
export class LinksController {
  ...

  @Put('/:id')
  updateLink(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto
  ): Link {
    return this.linksService.updateLink(id, updateLinkDto);
  }
}
```

You can open your Postman API client, repeat the steps previously for creating a link, remember to get the `id` as we'll need it later. Then do a `UPDATE` request to `http://localhost:3000/links/:id`, do replace `:id` with the `id` you got from creating a link or from getting all the links, with a JSON object containing `name` and `url`:

```json
{
  "name": "shortestintheworld",
  "url": "https://u.nu/"
}
```

It should return a status of `200 OK`. When you do a request to get all the links, the updated link should be returned in the response.

---

## Nest Pipes

Currently, we don't have any validations when creating a link. That is not ideal. Let's implement validations and error handling within our application and there's a good feature from Nest we can use for such cases and that is [Pipes](https://docs.nestjs.com/pipes#built-in-pipes).

Based from Nest documentation, we can say that:

- Pipes operate on the arguments being processed by a controller route handler, just before the handler is called.
- Pipes can perform **data transformation** or **data validation**.
- Pipes can return data - either _original_ or _modified_ - which will be passed on to the route handler. Pipes can throw exceptions. Exceptions thrown will be handled by Nest and parsed into an error response.
- Pipes can be asynchronous.
- You can build your own [custom pipes](https://docs.nestjs.com/pipes#custom-pipes).
- Pipes can on the parameter-level, handler-level and application level (global).

You can read more about pipes and how they operate right [here](https://docs.nestjs.com/pipes).

Nest comes with a number of [built-in-pipes](https://docs.nestjs.com/pipes#built-in-pipes) that we can use out-of-the-box. One of them is `ValidationPipe` which we'll be using in a bit.

## Validation when creating and updating a link

As mentioned above, we need to implement a validation when creating a link. Let's first install the following packages that we'll be using:

```bash
yarn add class-validator class-transformer
```

`class-validator` is a really great package that allows use of decorator and non-decorator based validation, you can head over to their [GitHub page](https://github.com/typestack/class-validator) to learn more. We'll be using one of their decorators in our classes to define our validation.

Let's go over to `src/links/dto/create-link.dto.ts` and import one of the decorators from `class-validator`:

```ts
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
```

Don't forget to update `src/links/dto/update-link.dto.ts` with the same changes as well.

From `class-validator` library, `@IsNotEmpty()` basically checks if the given value is not empty (`!== ''`, `!== null`, `!== undefined`), `@IsString()` checks if the given value is a string while `@IsUrl()` checks if the given value is a url.

Our Nest app does not know what to do with these decorators yet until we use the `ValidationPipe`, we'll need to add it in the application level since it is going to be utilized to most of our handlers. Go to `src/main.ts` and update with the following code:

```ts
import { Logger, ValidationPipe } from '@nestjs/common';
...

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.useGlobalPipes(new ValidationPipe());

  ...
}
bootstrap();
```

Alright, let's test out the validations. Let's open our Postman API client and do a `POST` request to `http://localhost:3000/links` without a body. It should return a status of `400 Bad Request` and return you with a JSON object like this:

```json
{
  "statusCode": 400,
  "message": [
    "name must be a string",
    "name should not be empty",
    "url must be an URL address",
    "url should not be empty"
  ],
  "error": "Bad Request"
}
```

As you can see, it comes with nice and descriptive error messages. This can definitely save us some time rather than us coming up with these messages.

---

## Error handling if link already exists

For creating a link, we also need to handle the case where we create a link with a `name` that already exists in our database. Currently if we created a link twice with the same `name`, the last request would throw an `500 Internal Server Error`. Obviously, we don't want to show that to our users. If you check the terminal logs from our NestJS app, you should see something like this: `ERROR [ExceptionsHandler] duplicate key value violates unique constraint "UQ_519b799f714024e18a740e8cca7"`, so basically PostgreSQL has thrown an error and we did not handle it. So to fix that, let's update `srcs/links/links.repository.ts` with the following code:

```ts
...
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Link)
export class LinksRepository extends Repository<Link> {
  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    ...

    try {
      await this.save(link);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Short name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return link;
  }
}
```

So by wrapping the `save()` function in a `try/catch` we are able to get the error code from PostgreSQL. Based from [PostgreSQL documentation](https://www.postgresql.org/docs/current/errcodes-appendix.html), `23505` is a unique constraint violation. So we have thrown a `ConflictException` which is from `@nestjs/common` with a descriptive error message. For any other cases we will throw an `InternalServerErrorException`, which is the default error for internal server error.

Once you saved the changes and do a `POST` request to `http://localhost:3000/links` **_twice_** with the same body or payload, it should return a status of `409 Conflict` and return you with a JSON object like this:

```json
{
  "statusCode": 409,
  "message": "Short name already exists",
  "error": "Conflict"
}
```

---

## Error handling if link does not exist

For getting, updating or deleting a link, we also need to handle the case where we get a link by an `id` or a `name` that does not exist in our database. We can simply do that by updating `src/links/links.service.ts` with the following:

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
...
export class LinksService {
  ...

  async getLink(conditions: FindConditions<Link>): Promise<Link> {
    const link = await this.linksRepository.findOne(conditions);

    if (!link) {
      throw new NotFoundException();
    }

    return link;
  }

  ...
}
```

Once you saved the changes and do a `GET` request to `http://localhost:3000/doesnotexist`, it should return a status of `404 Not Found` and return you with a JSON object like this:

```json
{
  "statusCode": 404,
  "message": "Not Found"
}
```

So by just from throwing a `NotFoundException` from Nest, it will bubble up and automatically construct this JSON object for us to return to the client. We didn't even had to touch our controller to handle this which is the right way based from what we said earlier about services handling the business logics. Since we are reusing `getLink` method when updating a link, it will also handle cases where link does not exist.

You can also try updating a link by an `id` that does not exist and you will get the same response. Do note that if you try to pass an `id` that's not in `uuid` format, you will still get `500 Internal Server Error`. To fix that, we can create a new DTO `src/links/dto/get-link.dto.ts` and add the following code below:

```ts
import { IsUUID } from 'class-validator';

export class GetLinkDto {
  @IsUUID()
  id: string;
}
```

And update our controller `src/links/links.controller.ts` methods that gets `id` from the parameters:

```ts
...
import { GetLinkDto } from './dto/get-link.dto';

@Controller('links')
export class LinksController {
  ...

  @Delete('/:id')
  deleteLink(@Param() getLinkDto: GetLinkDto): Promise<void> {
    return this.linksService.deleteLink(getLinkDto);
  }

  @Put('/:id')
  updateLink(
    @Param() getLinkDto: GetLinkDto,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<Link> {
    return this.linksService.updateLink(getLinkDto, updateLinkDto);
  }
}
```

And update our service `src/links/links.service.ts` methods as well:

```ts
...
import { GetLinkDto } from './dto/get-link.dto';

@Injectable()
export class LinksService {
  ...

  async deleteLink(getLinkDto: GetLinkDto): Promise<void> {
    const { id } = getLinkDto;
    await this.linksRepository.delete({ id });
  }

  async updateLink(
    getLinkDto: GetLinkDto,
    updateLinkDto: UpdateLinkDto,
  ): Promise<Link> {
    const { id } = getLinkDto;
    const link = await this.getLink({ id });
    ...
  }
}
```

It should now return a `400 Bad Request` if you pass an `id` that's not in `uuid` format:

```json
{
  "statusCode": 400,
  "message": ["id must be a UUID"],
  "error": "Bad Request"
}
```

Lastly, we should also return a `404 Not Found` error if we are deleting a link that no longer exists. We can do that by updating the method in `src/links/links.service.ts`:

```ts
...
export class LinksService {
  ...

  async deleteLink(getLinkDto: GetLinkDto): Promise<void> {
    const { id } = getLinkDto;
    const res = await this.linksRepository.delete({ id });

    if (res.affected === 0) {
      throw new NotFoundException(`Link with ID: "${id}" not found`);
    }
  }

  ...
}

```

As you can see, we can add custom message as an argument for `NotFoundException` object and we'll get an JSON object for the error like this:

```json
{
  "statusCode": 404,
  "message": "Link with ID: \"3232c642-ec07-4e8d-87a2-010cd5c033d2\" not found",
  "error": "Not Found"
}
```

We've completed the set of APIs for our URL shortener application. It's now time to write tests!

Proceed to the [next part](/posts/building-a-link-shortener-api-with-nestjs-and-postgresql-with-tests-part-2).
