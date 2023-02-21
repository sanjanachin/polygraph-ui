# Polygraph UI

## Polygraph Project Goals
Our project is a website where users can input text (such as facts or news) and check it for accuracy. We will fine tune a GPT-3 model to evaluate the accuracy of inputted text, and provide users with an evaluation of whether their text is accurate or not, along with an explanation of why. Our workflow will look something like this: a user logs in to the fact checker website using their credentials. Once they log in, they see a text box where they can input text and receive an evaluation of its accuracy. They can also view their history (which is their previously inputted text along with the corresponding evaluations).

## User Guidelines
### Setup
If you're using a version of this project that is hosted by someone else, skip this section. If you don't have access to an existing host, see [here](#setup-1) and [here](#starting-a-development-server) for instructions on setting up a development server.

### Usage
1. Navigate to the correct address in your web browser.
2. Type or copy-paste any statements that you want evaluated for misinformation in the text field labelled 'Start typing, or copy and paste your document here.'
3. Click the button to the bottom right of the text field labelled 'Submit.'
4. Wait a few seconds, then look for an evaluation (misinformation/not misinformation) above the text field.

### Features
1. User accounts. Users will be able to create accounts with which they can use to gain access to our website fact checker.

   i.  Non-operational: Firebase login authentication system not yet implemented


2. False text detection. Once users log in, they can input text and receive an evaluation of its accuracy along with an explanation of the evaluation.

   i.  Operational: Fully connected endpoints with feedback, although not trained on dataset.

3. Text validation. The text that users input will be vetted and verified for acceptable language and profanity to encourage result accuracy.

   i.  Operational: Validity of user input is displayed below input field.

4. User history. Once users log in with their credentials, they can view their history of previous inputted text along with the corresponding accuracy evaluations.

   i.  Non-operational: Database can store and interact with user history, but endpoint to UI not implemented.

### Reporting a bug
Report all bugs as GitHub issues.

### Known bugs
Known bugs can be found [here](https://docs.google.com/document/d/1YKue4Q9jE8VMdDHGTT1DMFyiaw8GF5UWjrJQ4gYJcew/edit?usp=sharing).

## Developer Guidelines
### Project Structure
Main Directory Contents:
- /src/App.jsx - React router for web page views
- /src/pages/ - Top level web page views - About, Login, and Polygraph
- /src/components/ - React components for use top level pages
- /src/api/ - Typescript modules containing API handlers for request/response with Polygraph backend
- /src/util/ - Typescript modules containing utility functions
- /public/ - Static assets (images, icons, etc)

### Setup
1. If you don’t have Node.js or npm installed, [install it from here](https://nodejs.org/en/download/)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd polygraph-ui
   ```

4. Install dependencies
   ```bash
   $ npm install
   ```

### Starting a Development Server
1. Make sure you have cloned and are running the [polygraph backend](https://github.com/sanjanachin/polygraph)

2. Run the app locally using the following command
   ```bash
   $ npm run start
   ```

### Testing
Test suites can be run from the command line with the following command:
```bash
$ npm test -- --coverage
```
This will run all test suites and generate a code coverage report.

New test suites can be added to by creating a file suffixed with .test.jsx anywhere in the /src/ directory. Individual
test cases should follow this format:
```js
test('test title/description', () => {
  test body
});
```
Unit tests should be grouped according to the component/module that is being tested. Files should aim to test only one
component or module and should have the same name as that component/module (ex: App.jsx should be tested in
App.test.jsx). Each file should go in the same directory as the component/module that it is testing.

### Linting
The linter can be run from the command line with the following command:
```bash
$ npm run lint
```
This will check that your code follows this project's style guidelines.

### Building a Release Version
A release build of the project can be generated with the following command:
```bash
$ npm run build
```
By default, this will place the relevant contents in the /build/ directory.
