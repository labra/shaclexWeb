const qualify = require('../qualify');
const should = require('should');

describe('showQualify',function() {

 var prefix = {"":"http://example.org/",
  "schema":"http://schema.org/",
  "xsd":"http://www.w3.org/2001/XMLSchema#",
  "foaf":"http://xmlns.com/foaf/0.1/"
 };

 it('should qualify schema:Person', function() {
   qualify.showQualify("http://schema.org/Person", prefix).should.equal("schema:Person");
 });

 it('should qualify :User', function() {
    qualify.showQualify("http://example.org/User", prefix).should.equal(":User");
  });

 it('should qualify other:User', function() {
    qualify.showQualify("http://other.example.org/User", prefix).should.equal("<http://other.example.org/User>");
  });

 it('should qualify "Hola"', function() {
    qualify.showQualify("\"Hola\"", prefix).should.equal("\"Hola\"");
  });

 it('should qualify 23', function() {
    qualify.showQualify("23", prefix).should.equal("23");
  });


 it('should qualify _:x', function() {
    qualify.showQualify("_:x", prefix).should.equal("_:x");
  });
});

