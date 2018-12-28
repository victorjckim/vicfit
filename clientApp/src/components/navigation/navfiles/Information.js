import React from "react";
import InformationHtml from "./InformationHtml";
import ProfileService from "../../../services/ProfileService";
import { connect } from "react-redux";
import {
  NotificationManager,
  NotificationContainer
} from "react-notifications";
import FileStorageService from "../../../services/FileStorageService";
import Avatar from "react-avatar-edit";

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalId: "",
      selectedOption: "",
      preview: "",
      image: ""
    };
  }

  async componentDidMount() {
    const options = [
      { value: "", label: "Select..." },
      { value: 1, label: "Lose weight" },
      { value: 2, label: "Gain muscle" },
      { value: 3, label: "I'm a beginner, so give me both!" }
    ];
    if (this.state.image === "") {
      const image = await FileStorageService.selectByUserId(
        sessionStorage.getItem("userId")
      );
      this.setState({ image: image.data.Item });
      console.log(image);
    }
    if (this.state.goalId === "") {
      const profile = await ProfileService.selectByUserId(
        sessionStorage.getItem("userId")
      );
      this.setState(
        {
          goalId: profile.data.Item.GoalId,
          selectedOption: options[profile.data.Item.GoalId]
        },
        () => console.log(this.state)
      );
    }
  }

  async componentDidUpdate() {
    const options = [
      { value: "", label: "Select..." },
      { value: 1, label: "Lose weight" },
      { value: 2, label: "Gain muscle" },
      { value: 3, label: "I'm a beginner, so give me both!" }
    ];
    if (this.state.goalId === "") {
      const profile = await ProfileService.selectByUserId(
        sessionStorage.getItem("userId")
      );
      this.setState(
        {
          goalId: profile.data.Item.GoalId,
          selectedOption: options[profile.data.Item.GoalId]
        },
        () => console.log(this.state)
      );
    }
    if (this.state.image === "") {
      const image = await FileStorageService.selectByUserId(
        sessionStorage.getItem("userId")
      );
      this.setState({ image: image.data.Item });
      console.log(image);
    }
  }

  onGoalChange = evt => {
    console.log(evt);
    this.setState({ goalId: evt.value, selectedOption: evt }, () =>
      console.log(this.state)
    );
  };

  updateGoal = async () => {
    const dataObj = {
      goalId: this.state.goalId,
      profileId: this.props.user.macros.ProfileId
    };
    await ProfileService.updateGoal(dataObj, sessionStorage.getItem("userId"))
      .then(resp => {
        console.log(resp);
        NotificationManager.success("", "Profile Saved");
      })
      .catch(err => {
        console.error(err);
        NotificationManager.error("Please try again", "Save was unsuccessful");
      });
  };

  onClose = () => this.setState({ preview: null });

  onCrop = preview => this.setState({ preview });

  saveCroppedImage = async evt => {
    evt.preventDefault();
    const url = this.state.preview;
    fetch(url)
      .then(res => res.blob())
      .then(async blob => {
        const data = new FormData();
        data.append("image", blob, "cropped-profile-image");
        console.log(data);
        if (this.state.image.Id) {
          await FileStorageService.update(data, this.state.image.Id);
        } else {
          await FileStorageService.insertFileStorage(
            data,
            sessionStorage.getItem("userId")
          );
        }
        const image = await FileStorageService.selectByUserId(
          sessionStorage.getItem("userId")
        );
        this.setState({ image: image.data.Item });
        this.closeLoadingModal();
      });
  };

  closeLoadingModal = () => {
    this.closeLoading.click();
  };

  render() {
    return (
      <React.Fragment>
        <InformationHtml
          {...this.state}
          onGoalChange={this.onGoalChange}
          updateGoal={this.updateGoal}
          username={this.props.user.userName}
        />
        <NotificationContainer />
        <div className="modal fade" id="imageEditor">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile Image</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={modal => (this.closeLoading = modal)}
                >
                  x
                </button>
              </div>
              <div className="modal-body mx-auto">
                <Avatar
                  height={250}
                  width={250}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                />
                <img
                  className="mt-4"
                  src={
                    this.state.preview
                      ? this.state.preview
                      : "data:image/png;base64,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"
                  }
                  alt="Preview"
                  style={{ width: "250px", height: "250px" }}
                />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={this.saveCroppedImage}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  };
};

export default connect(mapStateToProps)(Information);
