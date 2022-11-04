# Overview

This is an application that helps you and your roomates to keep a role of who is next taking the trash out

The Trash-Turn application lets you login using Google authentication, choose your current complex and apartment (or add them if they are not listed) and be assigned along to your roomates to a role. The one listed at the top is supposed to take the trash out. Then, if it was your turn, you can drag yourself to the bottom of the role. You cannot drag other roomates' cards, just yours

The purpose of it is to keep a role that everybody can access at any point and wherever they are, keeping track even of the time you took the trash out

[Software Demo Video](http://youtube.link.goes.here)

# Web Pages

- Login page: You can sign in using your Google account
- RoomateInfo: Allows first-time users to choose a complex and apartment (or add them if they are not listed) and be assigned along with theit roomates
- Root page: Displays all the registered roomates and the role

Roote page is protected so user has to login before getting his information

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

React is a component-based JavaScript library or building user interfaces
You can design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

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
