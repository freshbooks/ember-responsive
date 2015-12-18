/**
 * Stub function that is `matchMedia` API compatible but always returns
 * `false`. Useful for server-side environments like FastBoot where there
 * is no viewport.
 */
export default function() {
  return {
    matches: false
  };
}
