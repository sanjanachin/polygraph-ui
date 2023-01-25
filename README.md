# Polygraph UI

## Polygraph Project Goals
Our project is a website where users can input text (such as facts or news) and check it for accuracy. We will fine tune a GPT-3 model to evaluate the accuracy of inputted text, and provide users with an evaluation of whether their text is accurate or not, along with an explanation of why. Our workflow will look something like this: a user logs in to the fact checker website using their credentials. Once they log in, they see a text box where they can input text and receive an evaluation of its accuracy. They can also view their history (which is their previously inputted text along with the corresponding evaluations).

### Features:
1. User accounts. Users will be able to create accounts with which they can use to gain access to our website fact checker.
2. False text detection. Once users log in, they can input text and receive an evaluation of its accuracy along with an explanation of the evaluation.
3. Text validation. The text that users input will be vetted and verified for acceptable language and profanity to encourage result accuracy.
4. User history. Once users log in with their credentials, they can view their history of previous inputted text along with the corresponding accuracy evaluations.

### Project Structure:
Main Directory Contents:
- /src/App.js - React router
-  /src/pages/ - Top level pages
-  /src/api/ - Handling for request/response with polygraph backend
-  /public/ - Static assets (images, icons, etc)

### Setup:
First, make sure Node.js and npm are installed. After downloading the repository, run
```
npm install
```
in the root directory.

### Local Testing:
To test locally, run
```
npm run start
```
in the root directory to start a local server.