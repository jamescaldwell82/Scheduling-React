import React, {useState} from 'react';
import { addMeeting } from '../sdk';

function MeetingCreate(props : any) {

    const senderId = props.user;
    const isAccepted = false;
    const [meetingName, setMeetingName] = useState('');
    const [meetingToken, setMeetingToken] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [meetingDateTime, setMeetingDateTime] = useState('');
    const [inviteMessage, setInviteMessage] = useState('');
    const [meetings, setMeetings] = useState(props.meetings);
    const [load, setLoad] = useState(props.load);
    const [message, setMessage] = useState('');

    function handleSubmit(e : any) {
        e.preventDefault();
        console.log(meetingName);
        console.log(recipientId);
        console.log(meetingDateTime);
        if(props.user !== recipientId){
            setMessage('');
        addMeeting(meetingName, isAccepted, meetingToken, meetingDateTime, recipientId, props.user).then(() => props.showMeetings());
        e.target.reset();
        }
        else{
            setMessage('You cannot send a meeting request to yourself!');
        }
        
    }


    return(
        <form onSubmit={(e) => handleSubmit(e)} className="p-3">
            <input className="form-control" placeholder="Meeting Name" onChange={(e) => setMeetingName(e.target.value)} required/>
            <select onChange={(e) => setRecipientId(e.target.value)} className="form-control">
                <option value="">[--Choose Recipient--]</option>
                <option value="jcaldwell">jcaldwell</option>
                <option value="tkelce">tkelce</option>
                <option value="pmahomes">pmahomes</option>
            </select>
            <input type="datetime-local" className="form-control" placeholder="Enter Date/Time of Meeting" onChange={(e) => setMeetingDateTime(e.target.value)} required/>
            <br/>
            <input type="submit" className="btn btn-info" value="Send Meeting Request" />
            <p className="text-danger">{message}</p>
        </form>
    );
}

export default MeetingCreate;