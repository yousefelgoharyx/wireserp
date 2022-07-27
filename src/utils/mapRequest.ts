import getDate from './getDate';

export default function mapRequest<T>(request: T): T {
  if (request instanceof FormData) return request;
  if (request) {
    Object.keys(request).forEach((key) => {
      if (request[key] instanceof Date) {
        request[key] = getDate(request[key]);
      }
    });
    return request;
  }
}
