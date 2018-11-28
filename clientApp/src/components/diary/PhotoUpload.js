import React from "react";
import Avatar from "react-avatar-edit";

class PhotoUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      src: ""
    };
  }

  onClose = () => {
    this.setState({ preview: null });
  };

  onCrop = preview => {
    this.setState({ preview });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <Avatar
            width={80}
            height={100}
            onCrop={this.onCrop}
            onClose={this.onClose}
            src={this.state.src}
            label="Photo"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default PhotoUpload;
