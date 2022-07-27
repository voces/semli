import { Handle } from "./Handle";
import { Position } from "./Position";
import { Unit } from "./Unit";

export class Projectile extends Handle<projectile> {
  static fromHandle(handle: projectile) {
    return this._fromHandle(handle) as Projectile;
  }

  scale(x: number, y = x, z = y) {
    return this.handle.api_set_scale(Fix32(x), Fix32(y), Fix32(z));
  }

  delete() {
    this.handle.api_delete(null);
  }

  createMover(
    {
      type = "StraightMover",
      unitCollide = () => {},
      moverFinish = () => this.handle.api_delete(null),
      terrainCollide = () => this.handle.api_delete(null),
      moverInterrupt = () => {},
      moverRemoved = () => this.handle.api_delete(null),
      maxDist,
      initVelocity,
      maxVelocity = 9999,
      collisionType = 0,
      radius,
    }: {
      type?: Parameters<projectile["create_mover_trigger"]>[1];
      unitCollide?: (this: void, unit: Unit) => void;
      moverFinish?: (this: void) => void;
      terrainCollide?: (this: void) => void;
      moverInterrupt?: (this: void) => void;
      moverRemoved?: (this: void) => void;
      maxDist: number;
      initVelocity: number;
      maxVelocity?: number;
      collisionType?: 0 | 1 | 2;
      radius: number;
    },
  ) {
    const args = pydict();
    args.angle = this.handle.api_get_face_angle();
    args.max_dist = maxDist;
    args.init_velocity = initVelocity;
    args.max_velocity = maxVelocity; // fixed?
    args.collision_type = collisionType;
    args.collision_radius = radius; // fixed?
    args.is_multi_collision = false;
    args.priority = 1;

    this.handle.create_mover_trigger(
      args,
      type,
      () => unitCollide(Unit.fromHandle(gameapi.get_mover_collide_unit())),
      moverFinish,
      terrainCollide,
      moverInterrupt,
      moverRemoved,
    );
  }

  position() {
    return Position.fromHandle(this.handle.api_get_position());
  }
}
