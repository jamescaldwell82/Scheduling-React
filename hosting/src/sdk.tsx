import firebase from 'firebase/app';
import 'firebase/functions';
import { resourceLimits } from 'node:worker_threads';

const firebaseConfig = {
    apiKey: "AIzaSyAJT22196wDreOLdlWYBIiEbJzfcMKt3cE",
    authDomain: "appt-a3090.firebaseapp.com",
    projectId: "appt-a3090",
    storageBucket: "appt-a3090.appspot.com",
    messagingSenderId: "770127103635",
    appId: "1:770127103635:web:41bbf4ad1b0c3f6adeef66"
};

const app = firebase.initializeApp(firebaseConfig);

const firebaseFunctions = app.functions();
firebaseFunctions.useEmulator('localhost', 5001);

export async function loadUsers() {
    const res = await firebaseFunctions.httpsCallable('loadUsers')({});
    console.log(res.data.text);
}

export async function getUser(uName: string) : Promise<any> {
    const res = await firebaseFunctions.httpsCallable('getUser')({uName});
   return res.data;
}

export async function getUsers() : Promise<any> {
    const res = await firebaseFunctions.httpsCallable('getUsers')({});
    console.log(res.data);
    return res.data;
}

export async function loadMeetings() {
    const res = await firebaseFunctions.httpsCallable('loadMeetings')({});
}

export async function getMeetings(user : string) : Promise<any> {
    const res = await firebaseFunctions.httpsCallable('getMeetings')({user});
   return res.data;
}

export async function updateMeeting(meetingToken : string) {
    const res = await firebaseFunctions.httpsCallable('updateMeeting')({meetingToken});
    return res;
}

export async function addMeeting(meetingName : string, isAccepted: boolean, meetingToken: string, recipientId: string, senderId: string){
    const res = await firebaseFunctions.httpsCallable('createMeeting')({meetingName, isAccepted, meetingToken, recipientId, senderId});
    return res;
    }

export async function deleteMeeting(meetingToken: string){
    const res = await firebaseFunctions.httpsCallable('deleteMeeting')({meetingToken});  
    return res;     
}