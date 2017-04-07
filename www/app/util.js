function getVPSSignature(oid, token, apikey) {
  var message = oid + ":" + token + ":" + apikey;
  return sha256(message);
}

var oid;
var token;
