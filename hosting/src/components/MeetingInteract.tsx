import React, { useState } from 'react';
import { } from '../sdk';
import MeetingInvites from './MeetingInvites';
import PendingInvites from './PendingInvites';

function MeetingInteract(props: any) {
    return(
        <div className="col-5 offset-1 text-center m-2 p-0 alert-dark rounded">
            <h1 className="bg-dark p-3 text-white rounded-top">Take Action...</h1>
            <MeetingInvites meetings={props.meetings} user={props.user} meetingToken={props.meetingToken} showMeetings={props.showMeetings} />
            <h1 className="bg-dark p-3 text-white">Pending Response</h1>
            <PendingInvites meetings={props.meetings} user={props.user} meetingToken={props.meetingToken} showMeetings={props.showMeetings}/>
        </div>
    );
}

export default MeetingInteract;