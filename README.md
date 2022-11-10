# Overview

This is an application that helps you and your roomates to keep a role of who is next taking the trash out

The Trash-Turn application lets you login using Google authentication handled by Firebase (a Cloud Database backed by Google), choose your current complex and apartment (or add them if they are not listed) and be assigned along to your roomates to a role. The one listed at the top is supposed to take the trash out. Then, if it was your turn, you can drag yourself to the bottom of the role. You cannot drag other roomates' cards, just yours

The purpose of it is to keep a role that everybody can access at any point and wherever they are, keeping track even of the time you took the trash out

[Software Demo Video](https://www.youtube.com/watch?v=Bk5O6ROYecE)

# Cloud Database

Firebase is a Cloud Database backed by Google. It's a suite of tools for building apps and managing infrastructure on top of Google Cloud platform.
It's also a JSON database that stays in sync with your Frontend applcation.
It supports authentication and website hosting to act as a complete BaaS

{Describe the structure of the database that you created.}
The database I created contains two collections: complexes and users.

The complexes collection has image and name values, as well as a collection of apartments if there are users registered. Each of these apartment collections have a collection of users, or roomates, who store complex, apartment #, name, photoUrl, timestamp and uid

The users collection stores the same information as the roomates collection

# Development Environment

Technologies I'm using for the application:

- The React framework to build the application
- Context for state management
- Firebase Authentication to sign in users
- Firebase Firestore to store complexes, apartments, roomates and users
- Firebase Storage to store images and retrieve their url for some apartment complexes' logos
- Firebase Hosting to host live web application
- MaterialUI for icons and some components
- Moment js for date formatting
- SCSS for styling
- react-beautiful-dnd for drag and drop functionality

# Useful Websites

- [React Doc](https://reactjs.org/docs/getting-started.html)
- [React Context](https://reactjs.org/docs/context.html)
- [Firebase v9](https://travis.media/how-to-use-firebase-with-react/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Firebase Firestore](https://firebase.google.com/docs/firestore/manage-data/add-data)
- [Material UI Icons](https://mui.com/material-ui/icons/)
- [Material Components](https://mui.com/material-ui/)
- [Momentjs](https://momentjs.com/)
- [SCSS](https://sass-lang.com/)
- [react-beautiful-dnd](https://react-beautiful-dnd.netlify.app/?path=/story/single-vertical-list--basic)

# Future Work

TODO

- Protect rest of routes
- Add more feedback for user regarding who is supossed to take the trash out
