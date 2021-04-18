import React, { useState } from 'react';
import { } from '../sdk';
import MeetingInvites from './MeetingInvites';

function MeetingInteract(props: any) {
    return(
        <div className="col-5 text-center m-3 p-0 alert-dark rounded">
            <h1 className="bg-dark p-3 text-white rounded-top">New Meeting Request</h1>
            <MeetingInvites meetings={props.meetings} user={props.user} meetingToken={props.meetingToken} />
        </div>
    );
}

export default MeetingInteract;