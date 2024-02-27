import { Component, Property } from "@wonderlandengine/api";

/**
 * Countdown
 */
export class Countdown extends Component {
  static TypeName = "Countdown";
  static Properties = {
    param: Property.float(7200.0), // Set the initial countdown time here (1 hour = 3600 seconds)
  };

  start() {
    // Get a reference to the text component
    let textComponent = this.object.getComponent("text");
    // Update the text component
    if (textComponent) {
      textComponent.text = this.formatTime(this.param);
    }
  }

  update(deltaTime) {
    // Decrease the param property by the elapsed time
    this.param -= deltaTime;
    // Get a reference to the text component
    let textComponent = this.object.getComponent("text");
    // Update the text component
    if (textComponent) {
      textComponent.text = this.formatTime(Math.max(0, this.param));
    }
    // If the countdown has finished, disable the component
    if (this.param <= 0) {
      this.enabled = false;
    }
  }

  formatTime(timeInSeconds) {
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
    let seconds = Math.floor(timeInSeconds - hours * 3600 - minutes * 60);

    // Pad the numbers with leading zeros if necessary
    let formattedTime =
      (hours < 10 ? "0" : "") +
      hours +
      " : " +
      (minutes < 10 ? "0" : "") +
      minutes +
      " : " +
      (seconds < 10 ? "0" : "") +
      seconds;

    return formattedTime;
  }
}
