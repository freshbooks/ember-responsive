import { getContext, settled } from '@ember/test-helpers';
import { run } from '@ember/runloop';

export function setBreakpoint(breakpoint) {
  const breakpointArray = Array.isArray(breakpoint) ? breakpoint : [breakpoint],
    { owner } = getContext(),
    breakpoints = owner.lookup('breakpoints:main'),
    media = owner.lookup('service:media');

  for (let i = 0; i < breakpointArray.length; i++) {
    let breakpointName = breakpointArray[i];
    if (breakpointName === 'auto') {
      media.set('_mocked', false);
      return;
    }

    if (Object.keys(breakpoints).indexOf(breakpointName) === -1) {
      throw new Error(
        `Breakpoint "${breakpointName}" not defined in breakpoints.js`
      );
    }
  }

  run(() => {
    media.matches = breakpointArray;
    media._triggerMediaChanged();
  });

  return settled();
}
