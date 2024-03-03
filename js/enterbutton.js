import { CursorTarget } from "@wonderlandengine/components";
import { Component, MeshComponent, Property } from "@wonderlandengine/api";

/**
 * enterbutton
 */

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */

export function hapticFeedback(object, strength, duration) {
  const input = object.getComponent(InputComponent);
  if (input && input.xrInputSource) {
    const gamepad = input.xrInputSource.gamepad;
    if (gamepad && gamepad.hapticActuators)
      gamepad.hapticActuators[0].pulse(strength, duration);
  }
}

export class EnterButton extends Component {
  static TypeName = "EnterButton";

  static Properties = {
    /** Object that has the button's mesh attached */
    buttonMeshObject: Property.object(),
    /** Material to apply when the user hovers the button */
    hoverMaterial: Property.material(),
    /** The text object to check and modify */
    textobject: Property.object(),

    textobject2: Property.object(),
  };

  start() {
    this.mesh = this.buttonMeshObject.getComponent(MeshComponent);
    this.defaultMaterial = this.mesh.material;
    this.buttonMeshObject.getTranslationLocal(this.returnPos);

    this.target =
      this.object.getComponent(CursorTarget) ||
      this.object.addComponent(CursorTarget);
  }

  onActivate() {
    this.target.onHover.add(this.onHover);
    this.target.onUnhover.add(this.onUnhover);
    this.target.onClick.add(this.onClick);
  }

  onDeactivate() {
    this.target.onHover.remove(this.onHover);
    this.target.onUnhover.remove(this.onUnhover);
    this.target.onClick.remove(this.onClick);
  }

  /* Called by 'cursor-target' */
  onHover = (_, cursor) => {
    this.mesh.material = this.hoverMaterial;
    hapticFeedback(cursor.object, 0.5, 50);
  };

  /* Called by 'cursor-target' */
  onClick = (_, cursor) => {
    console.log("clicked");

    // Get the TextComponent from the text object
    const textComponent = this.textobject.getComponent("text");

    const textComponent2 = this.textobject2.getComponent("text");

    // const test = this.

    // If the TextComponent exists
    if (textComponent) {
      // If the text is "5869", write "Correct" in the text field
      if (textComponent.text === "5869") {
        textComponent.text = "Correct";
        textComponent2.text = "Unlocked";
      } else {
        // If the text is anything else, clear the text field
        textComponent.text = "";
      }
    }

    hapticFeedback(cursor.object, 1.0, 20);
  };

  /* Called by 'cursor-target' */
  onUnhover = (_, cursor) => {
    this.mesh.material = this.defaultMaterial;
    hapticFeedback(cursor.object, 0.3, 50);
  };
}
