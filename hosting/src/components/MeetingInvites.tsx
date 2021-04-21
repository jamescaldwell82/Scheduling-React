import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react'; 
import { updateMeeting, deleteMeeting } from '../sdk';

function MeetingInvites(props: any) {

    function deleteMeetingRequest(meetingToken : any) {
        deleteMeeting(meetingToken);
        props.showMeetings();
    }

    function acceptMeeting(id : string){
        console.log('Update the meeting!');
        updateMeeting(id);
        props.showMeetings();
    }
    return (
        <div className="p-2">
            {props.meetings.filter((x: any) => (!x.meeting.isAccepted) && (x.meeting.recipientId == props.user)).map((meetings: any, index: any) => (
                <div className="card text-center rounded m-2" key={index}>
                    <div className="card-header bg-danger text-white">
                        <h2>{meetings.meeting.meetingName}</h2>
                    </div>
                    <div className="card-body">
                        <p><span className="font-weight-bold">From: </span>{meetings.meeting.senderId}</p>
                        <p><span className="font-weight-bold">To: </span>{meetings.meeting.recipientId}</p>
                    </div>

                    {meetings.meeting.isAccepted ?
                        <div className="card-footer alert-success">
                            <div id="accept" className="font-weight-bold text-uppercase">
                                <p>Accepted</p>
                            </div>
                        </div>
                        :
                        <div className="card-footer alert-danger">
                             <div id="accept">
                                <p className="font-weight-bold text-uppercase">Choose Action</p>
                                <button className="btn btn-primary m-1" onClick={() => acceptMeeting(meetings.meeting.meetingToken)}>Accept</button>
                                <button className="btn btn-danger m-1" onClick={() => deleteMeetingRequest(meetings.meeting.meetingToken)}>Decline</button>
                            </div>
                        </div>
                    }
                </div>
            ))
            }
        </div>
    );
}

export default MeetingInvites;