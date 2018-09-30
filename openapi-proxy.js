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


console.log("   ____   _____   ______  _   _             _____  _____    _    _  _______  _______  _____    _____                         ")
console.log("  / __ \\ |  __ \\ |  ____|| \\ | |     /\\    |  __ \\|_   _|  | |  | ||__   __||__   __||  __ \\  |  __ \\                        ")
console.log(" | |  | || |__) || |__   |  \\| |    /  \\   | |__) | | |    | |__| |   | |      | |   | |__) | | |__) |_ __  ___ __  __ _   _ ")
console.log(" | |  | ||  ___/ |  __|  | . ` |   / /\\ \\  |  ___/  | |    |  __  |   | |      | |   |  ___/  |  ___/| '__|/ _ \\\\ \\/ /| | | |")
console.log(" | |__| || |     | |____ | |\\  |  / ____ \\ | |     _| |_   | |  | |   | |      | |   | |      | |    | |  | (_) |>  < | |_| |")
console.log("  \\____/ |_|     |______||_| \\_| /_/    \\_\\|_|    |_____|  |_|  |_|   |_|      |_|   |_|      |_|    |_|   \\___//_/\\_\\ \\__, |")
console.log("                                                                                                                        __/ |")
console.log("                                                                                                                       |___/ ")
console.log("")
console.log("OPEN API Proxy server listening on local port HTTP 80")
server.listen(80);    

