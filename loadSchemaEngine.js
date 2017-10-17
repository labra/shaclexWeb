var qualify = require('./qualify');
var $ = require('jQuery');
var URI = require('urijs');

// var serviceUrl = "http://localhost:8080";
var serviceUrl = "http://shaclex.herokuapp.com";

function getHost() {
 var port = window.location.port;
 return window.location.protocol + "//" + window.location.hostname + (port? ":" + port: "") ;
}

function getParams() {
    var uri = new URI(window.location.href);
    console.log(uri.search(true));
    return uri.search(true);
}

function getSchemaEngine(params) {
    $.when(
      $.getJSON(serviceUrl + "/api/schema/engines/default"),
      $.getJSON(serviceUrl + "/api/schema/engines")
    ).done(function(defaultEngine,engines) {
       console.log("Default: " + JSON.stringify(defaultEngine));
       console.log("Engines: " + JSON.stringify(engines));
    }).fail(function(jqxhr, textStatus, error) {
        console.log( "Error");
        console.log( textStatus );
        console.log( error );
        console.log( jqxhr );
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });
    var schemaEngine = params.schemaEngine;
    if (schemaEngine == null) {
        schemaEngine="Default";
    }
    $("#currentSchemaEngine").text("(Current: " + schemaEngine + ")");
    return schemaEngine;
}

$(document).ready(function(){
 var codeMirrorData ;
 var codeMirrorSchema ;
 var codeMirrorShapeMap ;
 var urlShaclex=getHost();
 var params = getParams();
 var schemaEngine = getSchemaEngine(params);
 console.log("urlShaclex: " + urlShaclex);
 $('#resultDiv').text(urlShaclex);
});

