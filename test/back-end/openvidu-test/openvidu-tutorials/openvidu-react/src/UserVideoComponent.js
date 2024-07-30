// src/UserVideoComponent.js
// import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
  }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div><p>{this.getNicknameTag()}</p></div>
          </div>
        ) : null}
      </div>
    );
  }
}

// src/OvVideo.js
import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return <video autoPlay={true} ref={this.videoRef} />;
  }
}
