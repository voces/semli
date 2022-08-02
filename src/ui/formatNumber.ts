export const formatDamage = (damage: number) => {
  if (damage > -10 && damage < 10) {
    return (Math.round(damage * 10) / 10).toString();
  }
  return Math.round(damage).toString();
};
