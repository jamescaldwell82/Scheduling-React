import React from 'react';
import MeetingCreate from './MeetingCreate';

function MeetingHeader(props: any) {
    return (

        <div className="text-center p-2 alert-info">
            <h2 className="text-dark">Create New Meeting Room</h2>
            <MeetingCreate user={props.user} />
        </div>
    );
}

export default MeetingHeader;