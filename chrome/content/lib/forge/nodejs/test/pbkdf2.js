(function() {

function Tests(ASSERT, PBKDF2, UTIL) {
  describe('pbkdf2', function() {
    it('should derive a password with hmac-sha-1 c=1', function() {
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 1, 20));
      ASSERT.equal(dkHex, '0c60c80f961f0e71f3a9b524af6012062fe037a6');
    });

    it('should derive a password with hmac-sha-1 c=2', function() {
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 2, 20));
      ASSERT.equal(dkHex, 'ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957');
    });

    it('should derive a password with hmac-sha-1 c=5 keylen=8', function() {
      var salt = UTIL.hexToBytes('1234567878563412');
      var dkHex = UTIL.bytesToHex(PBKDF2('password', salt, 5, 8));
      ASSERT.equal(dkHex, 'd1daa78615f287e6');
    });

    it('should derive a password with hmac-sha-1 c=4096', function() {
      // Note: might be too slow on old browsers
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 4096, 20));
      ASSERT.equal(dkHex, '4b007901b765489abead49d926f721d065a429c1');
    });

    /*
    it('should derive a password with hmac-sha-1 c=16777216', function() {
      // Note: too slow
      var dkHex = UTIL.bytesToHex(PBKDF2('password', 'salt', 16777216, 20));
      ASSERT.equal(dkHex, 'eefe3d61cd4da4e4e9945b3d6ba2158c2634e984');
    });*/
  });
}

// check for AMD
if(typeof define === 'function') {
  define([
    'forge/pbkdf2',
    'forge/util'
  ], function(PBKDF2, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      PBKDF2(),
      UTIL()
    );
  });
}
// assume NodeJS
else if(typeof module === 'object' && module.exports) {
  Tests(
    require('assert'),
    require('../../js/pbkdf2')(),
    require('../../js/util')());
}

})();
