import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

function PendingInvites (props: any){

        return (
            <div>
            {props.meetings[0] != null && props.meetings.filter((x: any) => (!x.meeting.isAccepted) && (x.meeting.senderId == props.user)).map((meetings: any, index: any) => (
            <div className="p-2" key={index}>
                
                    <div className="card text-center rounded m-2" >
                        <div className="card-header bg-warning text-dark">
                            <h2>{meetings.meeting.meetingName}</h2>
                        </div>
                        <div className="card-body">
                        <p><span className="font-weight-bold">Date/Time: <br/></span>{`${new Date(meetings.meeting.meetingDateTime).toLocaleDateString()}`} {`${new Date(meetings.meeting.meetingDateTime).toLocaleTimeString()}`}</p>
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
                            <div className="card-footer alert-warning">
                                 <div id="accept">
                                    <p className="text-dark font-italic">Waiting on response from {meetings.meeting.recipientId}</p>
                                </div>
                            </div>
                        }
                    </div>
              
            </div>
              ))
            }
        </div>
);

}

export default PendingInvites;