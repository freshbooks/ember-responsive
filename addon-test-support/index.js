import { getContext } from '@ember/test-helpers';

export function setBreakpoint(breakpointName) {
  let { owner } = getContext();
  let breakpoints = owner.lookup('breakpoints:main');
  let media = owner.lookup('service:media');
  if (!breakpointName) {
    media.set('_mocked', false);
    return;
  }
  if (Object.keys(breakpoints).indexOf(breakpointName) === -1) {
    throw new Error(`Breakpoint "${breakpointName}" is not defined in your breakpoints file`);
  }
  let matches = media.get('matches');
  matches.clear();
  matches.addObject(breakpointName);
}
