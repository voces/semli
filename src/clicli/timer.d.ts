declare interface timer_id {
  __timer_id: never;
}

declare interface timer {
  __timer: never;
  t_id: timer_id;
}
