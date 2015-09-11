'use strict';

const request = require('request');

const sources = new Map([
	['us','http://bertha.ig.ft.com/republish/publish/ig/10WUqpLJvOi1XBTphamV0pusNvwCji3mYYilwPTDu85M/basic,categories,groups'],
	['uk','http://bertha.ig.ft.com/republish/publish/ig/1zxgqC77xTm9Wp9mFe2BRXxJ4o_dNNedxUpx5PNVXBiY/basic,categories,groups']
]);

module.exports = getData();

function getData(){
	sources.forEach(function(url, area, sourceMap){
		getConfigJSON(url)
			.then(function(data){
				sourceMap.set(area, data);
			})
			.catch(function(reason){
				console.log(':( ', reason);
			});	
	});
	return sources;
}

function getConfigJSON(url) {
	return new Promise(
		function (resolve, reject) {
			request(url, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					resolve( JSON.parse(body) );
				}else{
					reject(' REJECTED ' + error);
				}
			})
		});
}