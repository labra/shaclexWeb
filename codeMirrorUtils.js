/**
 * Changes the syntax highlighting of an element
 * @param element
 * @param syntax
 */
module.exports.changeMode = function (element,syntax) {
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
