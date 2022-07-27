export class Timer {
  private timer: timer;

  constructor(timeout: number, callback: (this: void) => void, count = 1) {
    const infinite = count <= 0;
    this.timer = gameapi.add_timer(Fix32(timeout), count >= 1, () => {
      count--;
      if (count === 0 && !infinite) gameapi.cancel_timer(this.timer.t_id);
      callback();
    });
  }

  cancel() {
    gameapi.cancel_timer(this.timer.t_id);
  }
}
