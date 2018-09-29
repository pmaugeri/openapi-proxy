var http = require('http');
var url = require('url');
var querystring = require('querystring');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    var policyId;
    var version;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
            if ('policyId' in params && 'version' in params) {
                policyId = params['policyId'];
            version = params['version'];
            console.log('PolicyID: ' + policyId + ', version: ' + version);
            }
        if (page == '/activatePolicyVersion') {
            res.write('Activating Cloudlet Phased Released policy ' + policyId + ' version ' + version + ' ...');
        }
        if (page == '/list-cloudlets') {
          out = execSync('http --auth-type edgegrid -a akamai: GET :/cloudlets/api/v2/cloudlet-info').toString();
          res.write(out);
        }
        if (page == '/list-policy-activations') {
          out = execSync('http --auth-type edgegrid -a akamai: GET :/cloudlets/api/v2/policies/' + policyId + '/activations').toString();
          res.write(out);
        }
        if (page == '/activate-policy-version') {
          out = execSync('http --auth-type edgegrid --ignore-stdin -a akamai: POST :/cloudlets/api/v2/policies/' + policyId + '/versions/' + version + '/activations network=production').toString();
          res.write(out);
        }
        res.end();
    });

console.log("Starting nodejs server...")
server.listen(80);    

