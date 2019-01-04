const Mode = {
  beta: {
    host: 'ordermealbeta.welcrm.com',
    port: '',
    protocal: 'https'
  },
  pro: {
    host: 'ordermeal.welcrm.com',
    port: '',
    protocal: 'https'
  },
  pre: {
    host: 'apppre.welcrm.com',
    port: '',
    protocal: 'https'
  },
  local: {
    host: 'localhost',
    port: '7002',
    protocal: 'http'
  }
}

const mode = function (m) {
  return Mode[m];
}

module.exports = {
  mode,
}