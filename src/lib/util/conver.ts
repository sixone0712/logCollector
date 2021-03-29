import { BeforeState, BeforeUnitType } from '../../reducers/slices/remoteJob';

export function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function secondToTime(secound: number): BeforeState {
  let time = 0;
  let unit: BeforeUnitType = 'day';

  const minutes = Math.floor(secound / 60);
  const hours = Math.floor(secound / (60 * 60));
  const days = Math.floor(secound / (60 * 60 * 24));

  if (days > 0) {
    time = days;
    unit = 'day';
  } else if (hours > 0) {
    time = hours;
    unit = 'hour';
  } else {
    time = minutes;
    unit = 'minute';
  }

  return {
    time,
    unit,
  };
}

export function timeToSecound(prevPeriod: BeforeState): number {
  if (prevPeriod.unit === 'day') {
    return prevPeriod.time * 60 * 60 * 24;
  } else if (prevPeriod.unit === 'hour') {
    return prevPeriod.time * 60 * 60;
  } else {
    return prevPeriod.time * 60;
  }
}
