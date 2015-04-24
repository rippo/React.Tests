var app = app || {};
app.components = app.components || {};


(function() {
    
    'use strict';
    
    var ToDoApp = app.components.ToDoApp = React.createClass({displayName: "ToDoApp",
        
    render: function() {
        return (
            React.createElement("div", null, 
            React.createElement("p", null, "Some text")
            )
        );
    }
  });
  
})();


(function() {

    'use strict';

    app.init = function() {
        var ToDoApp = app.components.ToDoApp;

        React.render(
            React.createElement(ToDoApp, null), 
            document.getElementById('test')
        );
    };
    
    app.init();
    
})();





 
