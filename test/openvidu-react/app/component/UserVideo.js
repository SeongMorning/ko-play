import React from 'react';
import OpenViduVideo from './OpenViduVideo';

const UserVideo = ({ streamManager }) => {

    const getNicknameTag = () => {
        return JSON.parse(streamManager.stream.connection.data).clientData;
    };

    return (
        <div>
            {streamManager ? (
                <div className="streamcomponent">
                    <OpenViduVideo streamManager={streamManager} />
                    <div><p>{getNicknameTag()}</p></div>
                </div>
            ) : null}
        </div>
    );
};

export default UserVideo;
