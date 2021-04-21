
import React, { useEffect, useState } from 'react';
import { loadMeetings, getMeetings } from '../sdk';
import MeetingHeader from './MeetingHeader';
import MeetingInteract from './MeetingInteract';
import MeetingReader from './MeetingReader';


function Dashboard(props: any) {
  
    const [meetings, setMeetings]: any = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(()=>{
     fetchData();   
    }, [load]);


    function fetchData(){
        getMeetings(props.user).then(data => {
            setMeetings(data);
        });
    }

    function showMeetings(){
      
        getMeetings(props.user).then(data => {
            setMeetings(data);
        });
        setLoad(!load);
    }

   
    return (
        <div>
            <div className="col-12 alert-dark mini-menu text-center">
                <button className="btn btn-danger m-2 font-weight-bold text-uppercase p-2" onClick={() => showMeetings()}>Refresh</button>
                <button className="btn btn-dark m-2 font-weight-bold text-uppercase" onClick={() => loadMeetings()}>Load Sample Meetings</button>
            </div>
            <MeetingHeader user={props.user} meetings={meetings} showMeetings={showMeetings}/>
            
            <div className="row text-center">
                <MeetingReader user={props.user} meetings={meetings} showMeetings={showMeetings}/>
                <MeetingInteract meetings={meetings} user={props.user} meetingToken={props.meetingToken} showMeetings={showMeetings}/>
            </div>
        </div>
    );
}

export default Dashboard;