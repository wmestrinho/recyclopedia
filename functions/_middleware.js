const HOST_ROOTS = new Map([
  ['lettucebeetgrapefruit.org', '/academy/'],
  ['www.lettucebeetgrapefruit.org', '/academy/'],
  ['lettucebeetgrapefruit.com', '/lbg/'],
  ['www.lettucebeetgrapefruit.com', '/lbg/'],
]);

// Short paths per host. lettucebeetgrapefruit.com/donate is the public address
// of Donate Electronics (Pit Board E); the page is built at /lbg/donate/.
const HOST_PATHS = new Map([
  ['lettucebeetgrapefruit.com', new Map([['/donate', '/lbg/donate/'], ['/donate/', '/lbg/donate/']])],
  ['www.lettucebeetgrapefruit.com', new Map([['/donate', '/lbg/donate/'], ['/donate/', '/lbg/donate/']])],
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();
  const target = url.pathname === '/' ? HOST_ROOTS.get(host) : HOST_PATHS.get(host)?.get(url.pathname);

  if (!target) {
    return context.next();
  }

  url.pathname = target;
  return context.next(new Request(url, context.request));
}
