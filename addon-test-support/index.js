import { getContext, settled } from '@ember/test-helpers';
import { run } from '@ember/runloop';

export function setBreakpoint(breakpoint) {
  let breakpointArray = Array.isArray(breakpoint) ? breakpoint : [breakpoint];
  let { owner } = getContext();
  let breakpoints = owner.lookup('breakpoints:main');
  let media = owner.lookup('service:media');

  for (let breakpointName of breakpointArray) {
    if (breakpointName === 'auto') {
      media.set('_mocked', false);
      return;
    }

    if (Object.keys(breakpoints).indexOf(breakpointName) === -1) {
      throw new Error(`Breakpoint "${breakpointName}" is not defined in your breakpoints file`);
    }
  }

  let matches = media.get('matches');
  run(() => {
    matches.clear();
    matches.addObjects(breakpointArray);
    media._triggerMediaChanged();
  });
  return settled();
}
