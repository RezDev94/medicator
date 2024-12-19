# Medicator

A medication tracker website.

## Features

-   Access a list of medications with pagination
-   Create new medication

## Project description

The project is created with NX as a standalone project. Typically, a monorepo setup is recommended for larger projects, enabling the creation of individual libraries for each section. However, considering the scale of this project, I opted for NX with a standalone configuration. This choice allows for simplicity and focused development without the overhead of managing a full monorepo structure.

## Running the project

#### Install dependencies

```
npm i
```

#### Run the project

```
npx nx serve
```

## Testing

I've used Jest as the primary testing framework to ensure robust code validation. As part of optimizing the testing process, I made the decision to exclude component test files that didn't involve critical functionality. This approach helps streamline the testing suite, focusing efforts on areas where rigorous testing is most beneficial, thereby enhancing overall code quality and efficiency.

#### Unit test

```
npx nx test
```

#### e2e test

```
cd e2e
npx cypress open
```

## Used libraries

-   tailwindcss - [Docs](https://tailwindcss.com/)  
    Utility-first CSS framework for rapidly building custom designs.
