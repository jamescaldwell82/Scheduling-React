
import React, { useEffect, useState } from 'react';
import { loadMeetings, getMeetings } from '../sdk';
import MeetingHeader from './MeetingHeader';
import MeetingInteract from './MeetingInteract';
import MeetingReader from './MeetingReader';


function Dashboard(props: any) {
  
    const [meetings, setMeetings]: any = useState([]);
    useEffect(()=>{
        getMeetings(props.user).then(data => {
            setMeetings(data);
        });
    }, [meetings, setMeetings]);

    return (
        <div>
            <div className="col-12 alert-dark mini-menu text-center">
                <button className="btn btn-danger m-2 font-weight-bold text-uppercase p-2" onClick={() => loadMeetings()}>Load Sample Meetings</button>
            </div>
            <MeetingHeader user={props.user}/>
            
            <div className="row text-center">
                <MeetingReader user={props.user} meetings={meetings}/>
                <MeetingInteract meetings={meetings} user={props.user} meetingToken={props.meetingToken} />

            </div>
        </div>
    );
}

export default Dashboard;