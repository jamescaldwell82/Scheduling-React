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
        userName: 'tdolata',
        meetingToken: '98765',
        email: 'tdolata@alotta.com'
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


export const loadMeetings = functions.https.onCall(async (data, context) => {
    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: 'Meet with Barbara',
        senderId: '12345',
        recipientId: '98765',
        isAccepted: true
    });

    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: 'Sales Meeting',
        senderId: '12345',
        recipientId: '98765',
        isAccepted: true
    });

    await db.doc(`Meetings/meeting-${Date.now()}`).set({
        meetingName: 'Staff Meeting',
        senderId: '98765',
        recipientId: '12345',
        isAccepted: false
    });
    return { text: 'Users loaded' };
});

export const getMeetings = functions.https.onCall(async (data, context) => {
    const userQuerySnapshot = await db.collection('Meetings').get();
    const meetings : any[] = [];
    await userQuerySnapshot.forEach((doc) => {
        
        meetings.push({
            meeting: doc.data()
        });
        console.log(meetings);
        
    });
    return meetings;
});     
      
