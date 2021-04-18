import { render } from '@testing-library/react';
import React, { useState } from 'react';

function MeetingInvites(props: any) {
    return (
        <div className="p-2">
            {props.meetings[0] != null && props.meetings.filter((x: any) => !x.meeting.isAccepted).filter((x: any) => x.meeting.recipientId == (props.meetingToken) || (x.meeting.senderId == (props.meetingToken))).map((meetings: any, index: any) => (
                <div className="card text-center rounded m-2" key={index}>
                    <div className="card-header bg-dark text-warning">
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
                                <p className="font-weight-bold text-uppercase">Not Accepted Yet</p>
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