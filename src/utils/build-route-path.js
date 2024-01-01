/**
 *
 * @param {string} path
 * @returns {RegExp}
 */
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    "(?<$1>[a-zA-Z0-9\\-_]+)",
  );

  const pathRegex = new RegExp(`^${pathWithParams}`);
  return pathRegex;
}
