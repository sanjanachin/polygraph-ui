# Polygraph UI

## Polygraph Project Goals
Our project is a website where users can input text (such as facts or news) and check it for accuracy. We will fine tune a GPT-3 model to evaluate the accuracy of inputted text, and provide users with an evaluation of whether their text is accurate or not, along with an explanation of why. Our workflow will look something like this: a user logs in to the fact checker website using their credentials. Once they log in, they see a text box where they can input text and receive an evaluation of its accuracy. They can also view their history (which is their previously inputted text along with the corresponding evaluations).

### Features:
1. User accounts. Users will be able to create accounts with which they can use to gain access to our website fact checker.

   i.  Non-operational: Firebase login authentication system not yet implemented


2. False text detection. Once users log in, they can input text and receive an evaluation of its accuracy along with an explanation of the evaluation.

   i.  Operational: Fully connected enpoints with feedback, although not trained on dataset.

3. Text validation. The text that users input will be vetted and verified for acceptable language and profanity to encourage result accuracy.

   i.  Partially Operational: Length of 500 words is operational, profanity is not fully operational - but for test case.

4. User history. Once users log in with their credentials, they can view their history of previous inputted text along with the corresponding accuracy evaluations.

   i.  Non-operational: Database can store and interact with user history, but endpoint to UI and presentation not implemented.

### Project Structure:
Main Directory Contents:
- /src/App.js - React router for web page views
- /src/pages/ - Top level web page views - About, Login, and Polygraph
- /src/api/ - Api handling for request/response with Polygraph backend
- /public/ - Static assets (images, icons, etc)

## Setup:
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

### Local Testing:
1. Make sure you have cloned and are running the [polygraph backend](https://github.com/sanjanachin/polygraph)

2. Run the app locally using the following command
   ```bash
   $ npm run start
   ```