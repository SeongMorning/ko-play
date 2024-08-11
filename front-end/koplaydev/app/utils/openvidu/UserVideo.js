import React from "react";
import OpenViduVideo from "./OpenViduVideo";

const UserVideo = ({ streamManager }) => {

  return (
    <div>
      {streamManager ? (
        <div className="streamcomponent">
          <OpenViduVideo streamManager={streamManager} />
        </div>
      ) : null}
    </div>
  );
};

export default UserVideo;
