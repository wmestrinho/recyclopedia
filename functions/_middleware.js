const HOST_ROOTS = new Map([
  ['lettucebeetgrapefruit.org', '/academy/'],
  ['www.lettucebeetgrapefruit.org', '/academy/'],
  ['lettucebeetgrapefruit.com', '/lbg/'],
  ['www.lettucebeetgrapefruit.com', '/lbg/'],
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const internalRoot = HOST_ROOTS.get(url.hostname.toLowerCase());

  if (!internalRoot || url.pathname !== '/') {
    return context.next();
  }

  url.pathname = internalRoot;
  return context.next(new Request(url, context.request));
}
