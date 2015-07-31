var CodeMirror = require('codemirror/lib/codemirror');

// from http://www.json-generator.com/
CodeMirror.defineMode("jg-template", function(a, b) {
    var c = {
      token: function(a, b) {
        var c;
        if (a.match("{{")) {
          while (null  != (c = a.next()))
            if ("}" == c && "}" == a.next())
              break;
          return a.eat("}"),
            "jg-template"
        }
        while (null  != a.next() && !a.match("{{", !1))
          ;
        return null
      }
    };
    return CodeMirror.overlayMode(CodeMirror.getMode(a, b.backdrop || "javascript"), c)
  }
);