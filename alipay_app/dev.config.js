const os = require('os');
const { resolve } = require('path');
const { mode } = require('./config');
const _mode = function (code) {
	return mode(code) || mode('local')
}
const _modeConfig = _mode(process.argv[3]);

exports.getHost = function(process) {

	let _host = _modeConfig.host;//zhaoxiang.ordermeal.dev.acewill.net ordermealbeta.welcrm.com

	if (!process)
		return _host;
	
	const { original } = JSON.parse(process.env.npm_config_argv);
	let ip_param;
	
	if (original[0] === 'run' && /^(start|reset)$/.test(original[1])) {
		ip_param = original[2];
	} else if (original[0] === 'start') {
		ip_param = original[1];
	} else {
		return _host;
	}

	if (!/^\-ip\=.+$/.test(ip_param))
		return _host;

	if (ip_param === '-ip=1') {
		try {
			let interfaces = os.networkInterfaces();
			let addresses = [];
			for (let k in interfaces) {
			    for (let k2 in interfaces[k]) {
			        let address = interfaces[k][k2];
			        if (address.family === 'IPv4' && !address.internal) {
			            addresses.push(address.address);
			        }
			    }
			}

			_host = addresses[0];
		} catch(ex) {
			console.log(ex);
		}
	} else {
		_host = ip_param.substr(4);
	}

	return _host;
};

exports.mock_port = _modeConfig.port;
exports.mock_path = resolve(__dirname, 'api');
exports.mock_prefix = '/superdiancan';
exports.mock_protocal = _modeConfig.protocal;