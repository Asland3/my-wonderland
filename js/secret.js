import { CursorTarget } from "@wonderlandengine/components";
import {
  Component,
  MeshComponent,
  Property,
  InputComponent,
} from "@wonderlandengine/api";

/**
 * secret
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

export class Secret extends Component {
  static TypeName = "secret";
  /* Properties that are configurable in the editor */
  static Properties = {
    /** Object that has the button's mesh attached */
    buttonMeshObject: Property.object(),
    /** Material to apply when the user hovers the button */
    /** Object that has the panel's mesh attached */
    panelMeshObject: Property.object(),

    textobject: Property.object(),
  };

  static onRegister(engine) {
    engine.registerComponent(CursorTarget);
  }

  start() {
    this.mesh = this.buttonMeshObject.getComponent(MeshComponent);
    this.defaultMaterial = this.mesh.material;
    this.buttonMeshObject.getTranslationLocal(this.returnPos);

    this.target =
      this.object.getComponent(CursorTarget) ||
      this.object.addComponent(CursorTarget);

    // Initially hide the panel
    this.panelMeshObject.active = false;
    this.textobject.active = false;
  }

  onActivate() {
    // this.target.onHover.add(this.onHover);
    // this.target.onUnhover.add(this.onUnhover);
    this.target.onClick.add(this.onClick);
  }

  onDeactivate() {
    this.target.onHover.remove(this.onHover);
    this.target.onUnhover.remove(this.onUnhover);
    this.target.onClick.remove(this.onClick);
  }

  /* Called by 'cursor-target' */
  onHover = (_, cursor) => {
    // this.mesh.material = this.hoverMaterial;
    hapticFeedback(cursor.object, 0.5, 50);
  };

  /* Called by 'cursor-target' */
  onClick = (_, cursor) => {
    // Toggle the visibility of the panel when the book is clicked

    this.panelMeshObject.active = true;
    this.textobject.active = true;

    hapticFeedback(cursor.object, 1.0, 20);
  };

  /* Called by 'cursor-target' */
  onUnhover = (_, cursor) => {
    this.mesh.material = this.defaultMaterial;
    hapticFeedback(cursor.object, 0.3, 50);
  };
}
