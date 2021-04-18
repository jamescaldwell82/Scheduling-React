
import React, { useState } from 'react';
import { loadMeetings, getMeetings } from '../sdk';
import MeetingInteract from './MeetingInteract';

function Dashboard(props: any) {
    const [meetings, setMeetings]: any = useState([]);

    function showMeetings(e: any) {
        let meetingsData = null;
        
        getMeetings().then(data => {
            setMeetings(data);
        });
    };

    return (
        <div className="">
            <div className="row">
                <div className="col-5 offset-1">
                    <h1 className="text-center alert-dark p-2 m-3 rounded bg-dark-gray border border-danger">Upcoming Meetings
                    <br/>
                    <button className="btn btn-danger m-3 font-weight-bold text-uppercase" onClick={() => loadMeetings()}>Load Sample Meetings</button>
                        <button className="btn btn-dark m-3 font-weight-bold text-uppercase" onClick={() => showMeetings(props.user)}>Show Meetings</button>
                    </h1>
                    {/* <button onClick={() => showMeetings(props.user)}>Load Sample Meetings</button> */}
                    {meetings[0] != null && meetings.filter((x : any) => x.meeting.isAccepted).filter((x : any) => x.meeting.recipientId == (props.meetingToken) || (x.meeting.senderId == (props.meetingToken))).map((meetings: any, index: any) => (
                        <div className="card text-center rounded m-2" key={index}>
                            <div className="card-header bg-dark text-white">
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
                <MeetingInteract meetings={meetings} user={props.user} meetingToken={props.meetingToken} />
                
            </div>
        </div>
    );
}

export default Dashboard;