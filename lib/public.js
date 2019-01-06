const rp = require('request-promise-native');
const qs = require('qs');

public_methods = ['board', 'ticker', 'executions', 'getHealth'].reduce((a, e) => {
  a[e] = (query = {}) => {
    const method = 'GET';
    const query_str = (query && method === 'GET') ? `?${qs.stringify(query)}` : '';
    const path = `/v1/${e.toLowerCase()}${query_str}`;

    const options = {
      url: 'https://api.bitflyer.com' + path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      query: query
    };
    return rp(options);
  }
  return a
}, {})

module.exports = public_methods;