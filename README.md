<h1 align="center">Welcome to Climate App 👋</h1>
<p>
  <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">
    <img alt="License: GPL--3.0" src="https://img.shields.io/badge/License-GPL--3.0-yellow.svg" />
  </a>
</p>

> This project is used for an assignment for Backbase interview.

### ✨ [Demo](https://climate-app-94.herokuapp.com)

## Architecture

This project was generated with the latest [Angular CLI](https://github.com/angular/angular-cli) which uses **component based architecture** by default and applies:
* Proper abstractions between application layers.
* Unidirectional data flow.
* Modular design.

I also integrated **NgRx** that adds **reactive state management** to the application.
This architecture is better suited for large and complex projects and adds more developing time, But, it is very beneficial in big apps with many developers working on it.

> PS: NgRx is definitely an overkill here since the store structure is not that complex. I just used it for the sake of the assignment since it used the most in big companies, RxJS would fit better in a simple App.

## Libraries & Tools

* **NgRx:** Used for state management
* **Nebular UI:** Angular UI library and Theme
* **Jasmine marbles:** Unit testing library for async RxJS functions
* **@angular/pwa:** Caching for assets and API calls

## Project Structure
```
.
├── angular.json
├── dist
├── package.json
├── src
│   ├── app
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts (Application routes)
│   │   ├── lib
│   │   │   ├── components        (Reusable components)
│   │   │   ├── directives        (Custom directives)
│   │   │   ├── interceptors      (Custom interceptors)
│   │   │   ├── interfaces        (Interfaces declarations)
│   │   │   ├── services          (Services calling api)
│   │   │   ├── store             (NgRx files that handles global state)
│   │   │   │   ├── actions
│   │   │   │   ├── effects
│   │   │   │   ├── reducers
│   │   │   │   └── selectors
│   │   │   └── utils             (Reusable methods)
│   │   └── pages                 (Contains routes entry components)
│   ├── assets
│   ├── environments
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss               (Contains global css)
│   └── themes.scss               (Theme variables)
├── tsconfig.json
├── .eslintrc.json                (Project lint rules)
├── server.js                     (Minimal Express js used to serve dist in production)

```

## Install

```sh
npm install
```

## Build

```sh
npm run build
```
> PS: Production build might take a while you can use "`npm run dev`" to run project locally instead.
## Usage

```sh
npm start
```
> App will run on http://localhost:8080 by default
## Run tests

```sh
npm test
```

## Addtional notes

* I have used the **free openweathermap API** and it doesn't include the **hourly API** so instead I have used the **5 Day / 3 Hour Forecast API**.
* Also I have left my **appId** for testing as plain text in enviroments file which is not ideal *obviously*.

## Author

👤 **Ayoub Ben Achour**

* LinkedIn: [@ayoub-ben-achour](https://linkedin.com/in/ayoub-ben-achour-280420145)
