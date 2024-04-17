import { BaseObserver } from "../../Patrones/Observador/BaseObserver.js";

export class AttackText extends BaseObserver  {
    /** @protected @type {Phaser.GameObjects.Text} */
    _attackTextGameObject;

    /** @protected @type {Phaser.Scene} */
    _scene;

    constructor(scene, position, style)
    {
        super();
        this._attackTextGameObject = new Phaser.GameObjects.Text(
            scene,
            position.x,
            position.y - 50,
            '',
            style
          );

        this._attackTextGameObject.alpha = 0;
        this._attackTextGameObject.setDepth(10);
        this._scene = scene;
    }

    getAttackTextGameObject()
    {
        return this._attackTextGameObject;
    }

    update(value)
    {
        this._attackTextGameObject.setText(value);
        this._attackTextGameObject.alpha = 1;
    
        this._scene.time.delayedCall(2000, () => {
            this._attackTextGameObject.alpha = 0;
        });
    }
}