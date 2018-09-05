import Antlr4 from 'antlr4';
import AqlLexer from 'AQLLexer';
import AqlParser from 'AQLParser';
import Autosuggest from 'antlr4-autosuggest';
import { CodeCompletionCore } from 'antlr4-c3';
import 'bootstrap/dist/css/bootstrap.min.css';


var autosuggester = Autosuggest.autosuggester( AqlLexer.AQLLexer, AqlParser.AQLParser );

const ambigousChars = ['*','\'','-','.','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','""','"\'','"\\','\'"','\'\'','\'\\','\\"','\\\'','\\\\'];

document.getElementById( "suggest" )
    .addEventListener(
    "click",
    function() {
        var input = document.getElementById( "query" ).value;

        var chars = new Antlr4.InputStream( input );
        var lexer = new AqlLexer.AQLLexer( chars );
        var tokens = new Antlr4.CommonTokenStream(
            lexer );
        var parser = new AqlParser.AQLParser(
            tokens );
        parser.buildParseTrees = true;
        var tree = parser.query();
        console.log( "Parsed: " + tree );

        //        var core = new CodeCompletionCore(parser);
        //        var candidates = core.collectCandidates(0);
        //        console.log( "Candidate: " + candidates );

        var suggestions = autosuggester.autosuggest( input );
        console.log( "Suggestions: " + suggestions );
        
        suggestions = suggestions.filter( function( e ) { return !ambigousChars.includes( e ) } );
        
        document.getElementById( "suggestion" ).innerHTML = "" + suggestions ? suggestions : "any string"; 
    } );


