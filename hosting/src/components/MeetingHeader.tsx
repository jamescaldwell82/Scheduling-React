import React, {useState} from 'react';
import MeetingCreate from './MeetingCreate';

function MeetingHeader(props: any) {
    const [load, setLoad] = useState(props.load);
    
    return (

        <div className="text-center p-2 alert-info">
            <h2 className="text-dark">Create New Meeting Room</h2>
            <MeetingCreate user={props.user} meetings={props.meetings} showMeetings={props.showMeetings}/>
        </div>
    );
}

export default MeetingHeader;