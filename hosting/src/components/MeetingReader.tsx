import { render } from '@testing-library/react';
import React, { useEffect } from 'react';

function MeetingReader(props : any){
    useEffect(()=>{
        props.showMeetings();   
       }, []);

    return(
        <div className="col-5 offset-1 p-0">
        {props.meetings.filter((x: any) => x.meeting.isAccepted).map((meetings: any, index: any) => (
            <div className="card text-center rounded m-2 border-dark" key={index}>
                <div className="card-header bg-dark text-white">
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

export default MeetingReader;