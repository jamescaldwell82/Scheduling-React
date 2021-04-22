import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';



admin.initializeApp();
const db = admin.firestore();

//This function was really just a sample function I put together for the sake of adding new users and getting more comfortable with cloud functions.
export const loadUsers = functions.https.onCall(async (data, context) => {
    await db.doc('Users/user123').set({
        userName: 'jcaldwell',
        meetingToken: '12345',
        email: 'james.caldwell82@outlook.com'
    });

    await db.doc('Users/user345').set({
        userName: 'tkelce',
        meetingToken: '98765',
        email: 'tkelce@netscape.com'
    });

    await db.doc('Users/user567').set({
        userName: 'pmahomes',
        meetingToken: '246810',
        email: 'pmahomes@aol.com'
    });
    return { text: 'Users loaded' };
});
//This function takes in the value from the input on the login screen and loads a user accordingly. In a V2 version of this site, I plan to place some validation in the UI and here as well that would keep the site from falling to an error screen. 
export const getUser = functions.https.onCall(async (data, context) => {
    console.log(data.uName);
    const userRef = db.collection('Users').doc(data.uName).get();
    if((await userRef).exists){
        const user = (await userRef).data();
        console.log(user);
        return user;
    }
    else {
        return 'Not Found';
    }
});

//This function gets all users for the purpose of meeting invites and the login functionality for the site. While it is not utilized in the UI at this point, I would utilize this functionality to populate dropdowns for Meeting invites.
export const getUsers = functions.https.onCall(async (data, context) => {
    const usersSnapshot = await db.collection('Users').get();
    const users : any[] = [];
    await usersSnapshot.forEach((doc) => {        
        users.push({
            user: doc.data()
        });        
    });
    console.log(users);
    return users;
});     

//This is a function that simply loads some sample data into Firestore. It is linked to the button in the top of the Dashboard component.
export const loadMeetings = functions.https.onCall(async (data, context) => {
    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: 'Board Meeting',
        meetingToken: `${Date.now()}`,
        meetingDateTime: `${new Date('2021/05/02 11:00')}`,
        senderId: 'jcaldwell',
        recipientId: 'tkelce',
        isAccepted: true
    });

    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: 'Sales Meeting',
        meetingToken: `${Date.now()}`,
        meetingDateTime: `${new Date('2021/04/30 14:00')}`,
        senderId: 'jcaldwell',
        recipientId: 'pmahomes',
        isAccepted: true
    });

    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: 'Staff Meeting',
        meetingToken: `${Date.now()}`,
        meetingDateTime: `${new Date('2021/06/06 8:30')}`,
        senderId: 'tkelce',
        recipientId: 'pmahomes',
        isAccepted: false
    });

    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: 'Wideouts Meeting',
        meetingToken: `${Date.now()}`,
        meetingDateTime: `${new Date('2021-04-30T09:00')}`,
        senderId: 'jcaldwell',
        recipientId: 'tkelce',
        isAccepted: false
    });
    return { text: 'Users loaded' };
});

//This function is called in the useEffect() in the Dashboard Component to keep track of the state of meetings and ensure that the user sees those meetings in realtime.
export const getMeetings = functions.https.onCall(async (data, context) => {
    const meetingsInvitedQuerySnapshot = await db.collection('Meetings').where("recipientId", "==", data.user).orderBy("meetingDateTime").get();
    const meetingsSentQuerySnapshot = await db.collection('Meetings').where('senderId', '==', data.user).orderBy("meetingDateTime").get();
    const meetings : any[] = [];
    await meetingsInvitedQuerySnapshot.forEach((doc) => {        
        meetings.push({
            meeting: doc.data()
        });        
    });
    await meetingsSentQuerySnapshot.forEach((doc) => {
        meetings.push({
            meeting: doc.data()
        })
    });
    console.log(meetings);
    return meetings;
});    

//This is used to accept a meeting, as it changes the isAccepted field to true. In v2 of this application, I plan to implement a way to change an accepted meeting to a meeting on hold, and possibly even change the details of a meeting. This function is written to lay the foundation for that functionality.
export const updateMeeting = functions.https.onCall(async (data, context) => {
    const id = data.meetingToken;
    await db.collection('Meetings').where('meetingToken', '==', id).limit(1).get().then((query) => {
        const meeting = query.docs[0];
        meeting.ref.update({isAccepted: true});
        console.log('Success');

    });
    
    return {text: 'Successfully updated'};

});
      
//Used in the CreateMeeting component, this function creates a new unaccepted meeting in both the sender's and receiver's dashboard.
export const createMeeting = functions.https.onCall(async (data, context) => {
    console.log(data.meetingName);
    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: data.meetingName,
        meetingToken: `${Date.now()}-${data.senderId}`,
        meetingDateTime: `${new Date(data.meetingDateTime)}`,
        senderId: data.senderId,
        recipientId: data.recipientId,
        isAccepted: false
    });
    return {text: 'User Added'};
});

//This is a hard delete functionality that is used currently to decline the user's invite. In v2, I plan to add the ability to send a message with a delete. 
export const deleteMeeting = functions.https.onCall(async (data, context)=> {
    const id = data.meetingToken;
    await db.collection('Meetings').where('meetingToken', '==', id).limit(1).get().then((query) => {
        const meeting = query.docs[0];
        //const accept = meeting.data().isAccepted;
        meeting.ref.delete();
        console.log('Delete Success');
    });
    return {text: 'This is now functional!'};
});