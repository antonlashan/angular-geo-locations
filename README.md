# Google map tracks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Setup

Clone or download project
and run `yarn` in the console  
-- Note here I used yarn, you can also use npm commands as well.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Folder structure

```
coverage/                        contains unit testing coverage reports via jest
dist/                            contains build resource files
node_modules/                    contains node package modules
src/
    app/
        interceptors/            contains app interceptors
        layouts/                 contains layouts components
        modules/
            dashboard/           contains dashboard lazy loaded route module
            error/               contains error lazy loaded route module
            track-deliveries/    contains track-deliveries lazy loaded route module
                                 contains feature modules
        common.ts                contains shared constants and labels
    assets/
        db/                      contains mock json files
        icons/                   contains icons/images
    theme.scss                   contains bootstrap override variables that fit to main theme
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Or you can run `yarn build:prod`

## Running unit tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io/).  
Run `yarn test:watch` to watch files for changes and rerun tests related to changed files.  
Run `yarn test:coverage` to get coverage information and output to `coverage` folder.

## Further

Here using a pre-commit hook and run linters on git staged files that excecute code prettify and linters  
-[Prettier](https://prettier.io/)  
-[Husky](https://github.com/typicode/husky)  
-[lint-staged](https://github.com/okonet/lint-staged)
