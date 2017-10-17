var qualify = require('./qualify');
var $ = require('jQuery');
var URI = require('urijs');


function getHost() {
    var port = window.location.port;
    return window.location.protocol + "//" + window.location.hostname + (port? ":" + port: "") ;
}

// var codeMirrorNodes = new Array();
// var codeMirrorShapes = new Array();
// var inputRows = 0;
/*
function newCodeMirrorNode(n) {
 var nodeId = document.getElementById("node" + n);
 if (nodeId) {
  var codeMirrorNode = CodeMirror.fromTextArea(nodeId, {
  lineNumbers: false,
   mode: "turtle",
   scrollbarStyle: "null",
   tabindex: 2*n,
   height: 1,
   extraKeys: { Tab: false }
  });
  codeMirrorNode.on("beforeChange", noNewLine);
  codeMirrorNode.setSize(null,"1.5em");
  codeMirrorNodes.push(codeMirrorNode);
 } else {
   console.log("Not found node" + n);
 }
}

function newCodeMirrorShape(n) {
 var shapeId = document.getElementById("shape" + n);
 if (shapeId) {
  var codeMirrorShape = CodeMirror.fromTextArea(shapeId, {
   lineNumbers: false,
   mode: "turtle",
   scrollbarStyle: "null",
   tabindex: 2*n+1,
   height: 1,
   extraKeys: { Tab: false }
  });
 codeMirrorShape.on("beforeChange", noNewLine);
 codeMirrorShape.setSize(null,"1.5em");
 console.log("Current codeMirrorShapes: " + codeMirrorShapes.length);
 codeMirrorShapes.push(codeMirrorShape);
 } else {
   console.log("Not found shape" + n);
 }
}

function getInputRows() {
 return $("#rowsCounter").data("value");
}

function setInputRows(n) {
 $("#rowsCounter").data("value",n);
}

function incrementInputRows() {
 inputRows = getInputRows();
 inputRows++
 setInputRows(inputRows);
 return inputRows;
}

function addNodeShapeEntry() {
  inputRows = incrementInputRows();
  var nodeEntry =  "<div id ='nodeDiv"+ inputRows + "' class='nodeDiv'><label>Node<textarea placeholder='Node' id='node" + inputRows + "' placeholder='Node...'></textarea></label></div>"
  var shapeEntry = "<div id ='shapeDiv"+inputRows  + "' class='shapeDiv'><label>Shape<textarea placeholder='Shape' id='shape" + inputRows + "' placeholder='Shape...'></textarea></label></div><div style='clear:both'></div>"
  console.log("Setting styles... on #nodeDiv" + inputRows);
  $("#nodeDiv"+inputRows).css("float","left");
  $("#nodeDiv"+inputRows).css("width","30%");
  $("#shapeDiv"+inputRows).css("float","right");
  $("#shapeDiv"+inputRows).css("width","30%");
  $("#nodeShapeContainer").append(nodeEntry);
  $("#nodeShapeContainer").append(shapeEntry);
  $("#nodeShapeContainer").append("<div style='clear:both'/>");
  newCodeMirrorNode(inputRows);
  newCodeMirrorShape(inputRows);
  console.log("Added row " + inputRows);
}

function removeNodeShapeEntry() {
  $inputRows = getInputRows();
  switch (inputRows)  {
   case 0: console.log("Cleaning entries when 0 input rows");
           break;
   case 1: codeMirrorNodes[0].setValue("");
           codeMirrorShapes[0].setValue("");
           console.log("Cleaning entries when 1 input rows");
           break;
   default: if (inputRows > 1) {
             console.log("Removing entry..."+ inputRows);
             $("#shapeDiv" + inputRows).remove();
             $("#nodeDiv" + inputRows).remove();
             codeMirrorNodes.pop();
             codeMirrorShapes.pop();
             inputRows--;
             setInputRows(inputRows);
             console.log("Removing one row. New value: " + inputRows);
            } else {
             console.log("Unknown value of inputRows: " + inputRows);
            }
  }
}

// Don't allow newline before change in CodeMirror
function noNewLine(instance,change) {
    var newtext = change.text.join("").replace(/\n/g, ""); // remove ALL \n !
    change.update(change.from, change.to, [newtext]);
    return true;
}
*/

function changeMode(element,syntax) {
    var mode = "turtle";
    switch (syntax.toUpperCase()) {
        case "TURTLE": mode = "turtle" ;
            break ;
        case "N-TRIPLES": mode = "turtle" ;
            break ;
        case "RDF/XML": mode = "xml" ;
            break ;
        case "TRIX": mode = "xml" ;
            break ;
        case "SHEXJ" : mode = "javascript" ;
            break ;
        case "RDF/JSON" : mode = "javascript" ;
            break ;
        case "JSON-LD" : mode = "javascript" ;
            break ;
        case "SHEXC": mode = "shex" ;
            break ;
    }
    element.setOption("mode",mode);
}

function changeTheme(theme) {
    codeMirrorData.setOption("theme",theme);
    codeMirrorSchema.setOption("theme",theme);
    codeMirrorShapeMap.setOption("theme",theme);
}

function changeSchemaSeparated(value) {
    console.log("Changing schemaSeparated: " + value);
    if (value==="on") {
        $("#schemaDiv").show();
    } else {
        $("#schemaDiv").hide();
    }
}

function changeTriggerMode(value) {
    if (value) {
        console.log("Changing triggermode: " + value);
        switch (value.toUpperCase()) {
            case "TARGETDECLS":
//    $("#nodeShapeContainer").hide();
                $("#shapeMapDiv").hide();
//    console.log("Hiding all: " + value);
                break;
            /*  case "NODESHAPE":
                $("#nodeShapeContainer").show();
                console.log("Showing all: " + value);
                break;
              case "NODESTART":
                $("#nodeShapeContainer").show();
                console.log("Showing node only: " + value);
                break; */
            case "SHAPEMAP":
//    $("#nodeShapeContainer").show();
                $("#shapeMapDiv").show();
                console.log("Showing shape map: " + value);
                break;

        }
    }
}

function resetResult(result) {
    console.log("Reset result: " + JSON.stringify(result));
    $("#resultDiv").empty();
    $("#resultDiv").data("result", result);
}


function showResult(result) {
    result = $("#resultDiv").data("result");
    console.log("Show result: " + JSON.stringify(result));
    if(result) {
        console.log("Result.nodesPrefixMap: " + JSON.stringify(result.nodesPrefixMap));
        var nodesPrefixMap = result.nodesPrefixMap ;
        var shapesPrefixMap = result.shapesPrefixMap ;
        console.log("nodesPrefixMap: " + JSON.stringify(nodesPrefixMap));
        console.log("shapesPrefixMap: " + JSON.stringify(shapesPrefixMap));
        if (result.isValid || result.valid) {
            $("#resultDiv").removeClass("notValid").addClass("valid");
        } else {
            $("#resultDiv").removeClass("valid").addClass("notValid");
        }
        $("#resultDiv").append($("<h2>").text("Result"));
        $("#resultDiv").append($("<p>").text(result.message));
        showShapeMap(result.shapeMap,nodesPrefixMap,shapesPrefixMap);
        showErrors(result.errors);
        var pre = $("<pre/>").text(JSON.stringify(result,undefined,2));
        var details = $("<details/>").append(pre);
        $("#resultDiv").append(details);
    }
}

function showShape(status,shape,shapesPrefixMap) {
    var shapeClass;
    if (status == 'conformant') shapeClass = "hasShape table-success"
    else shapeClass = "hasNoShape table-danger";
    return "<td class=\"" + shapeClass + "\">" +
        "<code>" +
         qualify.showQualify(shape, shapesPrefixMap) +
        "</code></td>" ;
}

function showShapeMap(shapeMap,nodesPrefixMap, shapesPrefixMap) {
    console.log("Solution: " + JSON.stringify(shapeMap));
    console.log("Solution, nodesPrefixMap: " + JSON.stringify(nodesPrefixMap));
    console.log("Solution, shapesPrefixMap: " + JSON.stringify(shapesPrefixMap));

    var table = "<thead><tr><th data-sortable=\"true\">Node</th><th data-sortable=\"true\">Shape</th><th>Evidences</th></thead>";
    $.each(shapeMap, function(i) {
       var row = shapeMap[i];
       console.log("Association: " + JSON.stringify(shapeMap[i]) );
       table += "<tr><td class='node'><code>" + qualify.showQualify(row.node, nodesPrefixMap) + "</code></td>" +
            showShape(row.status, row.shape, shapesPrefixMap) +
            "<td class='explanation'>" + escapeHtml(row.reason) + "</td></tr>" ;
     });
    $("#resultDiv").append("<h2>Solution</h2><table data-toggle=\"table\" data-sort-order=\"desc\" data-sort-name=\"node\"" + table + "</table>");
}

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '\n': '<br/>'
};

function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/\n]/g, function (s) {
        return entityMap[s];
    });
}

function showErrors(errors) {
    if (errors.length > 0) {
        var table = "";
        table += ""
        console.log("Errors" + JSON.stringify(errors));
        $.each(errors, function(i,e) {
            console.log("Error" + JSON.stringify(e));
            table += "<tr><td><pre>" + escapeHtml(e.error) + "</pre></td></tr>";
        });
        $("#resultDiv").append("<h2>Errors</h2><table>" + table + "</table>");
    }
}

function getDataFormat(element) {
    var format = element.options[element.selectedIndex].value;
    window.alert("Data format of " + element + " format: " + format);
}

/*
function prepareShapeMap() {
 console.log("Preparing shape map:" );
 inputRows = getInputRows();
 console.log("codeMirrorNodes:" + codeMirrorNodes.length + " inputRows: " + inputRows);
 var pairs = [];
 for (i=0; i< inputRows; i++) {
   var node = codeMirrorNodes[i].getValue();
   var shape = codeMirrorShapes[i].getValue();
   pairs.push(encodeURIComponent(node) + "@" + encodeURIComponent(shape));
   console.log("Current pairs: " + JSON.stringify(pairs));
 }
 var str = pairs.join(",");
 console.log("pairs: " + JSON.stringify(pairs) + ". Shape-map = " + str);
 return str;
}
*/
$(document).ready(function(){
    var codeMirrorData ;
    var codeMirrorSchema ;
    var codeMirrorShapeMap ;

    var urlShaclex = getHost();
    console.log("urlShaclex: " + urlShaclex);

    // When loading document get result from data-result attribute and show it
    var result = $("#resultDiv").data("result");
    showResult(result);

    var schemaSeparatedValue = $("#schemaSeparated").val();
    console.log("Schema separated = " + schemaSeparatedValue);
    changeSchemaSeparated(schemaSeparatedValue);

    $("#schemaSeparated").change(function() {
        if (this.checked) {
            changeSchemaSeparated("on");
        } else {
            changeSchemaSeparated("off");
        }
    });

    var triggerModeValue = $("#triggerMode").val();
    console.log("Trigger mode = " + triggerModeValue);
    changeTriggerMode(triggerModeValue);

    var rdfData = document.getElementById("rdfData");
    if (rdfData) {
        codeMirrorData = CodeMirror.fromTextArea(rdfData, {
            lineNumbers: true,
            mode: "turtle",
            viewportMargin: Infinity,
            matchBrackets: true,
        });
    }
    var schema = document.getElementById("schema")
    if (schema) {
        codeMirrorSchema = CodeMirror.fromTextArea(schema, {
            lineNumbers: true,
            mode: "shex",
            viewportMargin: Infinity,
            matchBrackets: true
        });
    }

    var shapeMap = document.getElementById("shapeMap")
    if (shapeMap) {
        codeMirrorShapeMap = CodeMirror.fromTextArea(shapeMap, {
            lineNumbers: true,
            mode: "shex",
            viewportMargin: Infinity,
            matchBrackets: true
        });
        codeMirrorShapeMap.setSize(null,"5em");
    }

    /*
    var inputRows = getInputRows();
    console.log("Creating " + inputRows + " codeMirrors");

    for(i = 0; i < inputRows; i++) {
     console.log("Creating codeMirror " + i);
     newCodeMirrorNode(i);
     newCodeMirrorShape(i);
    }

    console.log("Adding empty node shape entry..."); // Adds an empty entry
    addNodeShapeEntry();
    */

    console.log("Adding handler to validateButton...");
    $("#validateButton").click(function(e){
        e.preventDefault();
        console.log("click on validating...");
        var data = codeMirrorData.getValue();
        var schema = codeMirrorSchema.getValue();
        var dataFormat = $("#dataFormat").find(":selected").text();
        var schemaFormat = $("#schemaFormat").find(":selected").text();
        var schemaEngine = $("#schemaEngine").find(":selected").text();
        var triggerMode = $("#triggerMode").find(":selected").text();
        var shapeMap = codeMirrorShapeMap.getValue(); // prepareShapeMap();
        var schemaSeparated = $("#schemaSeparated").val();
        if (schemaSeparated !== "on") {
            schema = "";
        }
        console.log("Trigger mode in AJAX query:" + triggerMode);
        var location = "/validate?" +
            "data=" + encodeURIComponent(data) +
            "&dataFormat=" + encodeURIComponent(dataFormat) +
            "&schema=" + encodeURIComponent(schema) +
            "&schemaFormat=" + encodeURIComponent(schemaFormat) +
            "&schemaEngine=" + encodeURIComponent(schemaEngine) +
            "&triggerMode=" + encodeURIComponent(triggerMode) +
            "&schemaSeparated=" + encodeURIComponent(schemaSeparated) +
            "&shapeMap=" + encodeURIComponent(shapeMap);

        $.ajax({ url: urlShaclex + "/api/validate",
            data: {
                data: data,
                schema: schema,
                dataFormat: dataFormat,
                schemaFormat: schemaFormat,
                shapeMap: shapeMap,
                schemaEngine: schemaEngine,
                triggerMode: triggerMode,
                schemaSeparated: schemaSeparated
            },
            type: "GET",
            dataType : "json"
        })
            .done(function(result) {
                console.log("Done!: " + JSON.stringify(result));
                resetResult(result);
                console.log("After reseting result: " + JSON.stringify(result));
                showResult(result);
                history.pushState({},"validate",location);
            })
            .fail(function( xhr, status, errorThrown ) {
                $("#resultDiv").html("<h2>" + errorThrown + "</h2><pre>" + xhr.responseText + "</pre><p>" + status + "</p>" );
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
            })
    });

});
