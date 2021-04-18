import firebase from 'firebase/app';
import 'firebase/functions';

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


export async function loadMeetings() {
    const res = await firebaseFunctions.httpsCallable('loadMeetings')({});
}

export async function getMeetings() : Promise<any> {
    const res = await firebaseFunctions.httpsCallable('getMeetings')({});
   return res.data;
}