import React, {useState} from 'react';
import { addMeeting } from '../sdk';

function MeetingCreate(props : any) {

    const senderId = props.user;
    const isAccepted = false;
    const [meetingName, setMeetingName] = useState('');
    const [meetingToken, setMeetingToken] = useState('');
    const [recipientId, setRecipientId] = useState('');
 
    const [inviteMessage, setInviteMessage] = useState('');
    const [meetings, setMeetings] = useState(props.meetings);
    const [load, setLoad] = useState(props.load);

    function handleSubmit(e : any) {
        e.preventDefault();
        console.log(meetingName);
        console.log(recipientId);
        addMeeting(meetingName, isAccepted, meetingToken, recipientId, props.user);
        props.showMeetings();
    }


    return(
        <form onSubmit={(e) => handleSubmit(e)} className="p-3">
            <input className="form-control" placeholder="Meeting Name" onChange={(e) => setMeetingName(e.target.value)}/>
            <select onChange={(e) => setRecipientId(e.target.value)} className="form-control">
                <option value="">[--Choose Recipient--]</option>
                <option value="jcaldwell">jcaldwell</option>
                <option value="tkelce">tkelce</option>
                <option value="pmahomes">pmahomes</option>
            </select>
            <br/>
            {inviteMessage === '' &&
            <input type="submit" className="btn btn-info" value="Send Meeting Request" />
            }
            {inviteMessage !== ''&&
            <div className="alert-sucess text-center">{inviteMessage}</div>
            }
        </form>
    );
}

export default MeetingCreate;