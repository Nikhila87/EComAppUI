# EComApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

C:\Windows\System32>netstat -ano | findstr :4200
  TCP    [::1]:4200             [::]:0                 LISTENING       21004
  TCP    [::1]:4200             [::1]:61254            ESTABLISHED     21004
  TCP    [::1]:4200             [::1]:61579            ESTABLISHED     21004
  TCP    [::1]:61254            [::1]:4200             ESTABLISHED     18260
  TCP    [::1]:61579            [::1]:4200             ESTABLISHED     12584

C:\Windows\System32>taskkill /PID 21004 /F
SUCCESS: The process with PID 21004 has been terminated.