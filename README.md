# Scheduling-React
This is a React Application built on a Firebase backend and utilizing cloud firebase functions to connect to data structures. It is styled only with basic styling rules and Bootstrap classes.

Goal:  Write a Firebase web app that allows a user to schedule an appointment time with another user, and for that other user to accept, decline, and view their appointments.
*While I have accomplished the Minimum Viable Product, I am interested in ways that I can make this more efficient, scalable, and maintainable. This is V1 and I plan to continue to build this out to increase my skill.

Component Wireframe
1. App - Inside of the App is one main UI Component - Dashboard
2. Dashboard - Inside of Dashboard are small pieces of UI (MeetinHeader, MeetingReader, and MeetingInteract
3. MeetingHeader - Houses the basic headings for the dashboard, as well as the MeetinCreate component
4. MeetingReader - Shows the accepted meetings on the left hand side of the UI. This utilizes the map method, allowing for each meeting to render to the UI.
5. MeetingInteract - this houses all of the interactions a user can have with accepting/declining meeting invites in MeetingInvites and seeing pending invites other users need to yet accept in PendingInvites

Cloud Functional Code
The cloud functions in Firebase Functions were new to me in this project. I really appreciate how you can utilize these functions in a 'serverless' environment. It really allows you to protect key pieces of functionality from being corrupted by being client-side. I wrote some extra functions to test my knowledge of the working parts of this technology (i.e. Constructing the function in the functions project, calling the function from the sdk.tsx, and invoking those functions in the UI). This is a technology I plan to utilize in future projects.

Testing Functionality
Testing was mainly done through the Firebase emulators for Firestore and Function logs. I also learned to use the CLI build:watch script in the functions project. Finally I utilized Google Browser's React DevTools extension to see how data was being passed into the UI and between components.

V2 Functionality
 - Authentication - I plan to integrate Google Authentication and allow this application to be a little bit more dynamic and usable. Right now, the functionality is there per the Mininum Viable Product laid out in the persona. However while it showcases mimimal filtered data-driven views, the UI/UX still feel quite limiting due to the current mock-auth setup.
- Function Triggers - After creating the original functions, I found documentation on Firebase Function triggers that you can set up for handling creations and updates of data in Firestore. I would like to spend some time integrating this functionality utilizing those funcitons that help extend the database.
- This is a very basic (Minimum Viable Product) for a coding challenge, with very basic authentication setups and there are some components that I would continue to refactor to make the UI a bit more reusable and scalable.

Challenges I faced:
- I had trouble with the passing of parameters from the hosting application to the cloud functions, as there wasn't very good documentation out there. After struggling through several attempts to solve this, I found an example on Stack Overflow that I tried and it allowed me to pass arguments in and access that data in the cloud functions (i.e. the user's ID for showing only the meetings they should see).
- Typescript - I had not learned Typescript prior to this project. I know there are other implementations of TypeScript that would be good to use, which I am honestly looking forward to digging into in the next React applications I create and in further building out this application.

Overall this was a really great project to help me understand how cloud functions can be utilized to protect data-sensitive functionality in React Development.
 
