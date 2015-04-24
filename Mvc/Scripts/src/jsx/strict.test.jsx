var app = app || {};
app.components = app.components || {};


(function() {
    
    'use strict';
    
    var ToDoApp = app.components.ToDoApp = React.createClass({
        
    render: function() {
        return (
            <div>
            <p>Strict with anoymous functions</p>
            </div>
        );
    }
  });
  
})();


(function() {

    'use strict';

    app.init = function() {
        var ToDoApp = app.components.ToDoApp;

        React.render(
            <ToDoApp  />, 
            document.getElementById('test')
        );
    };
    
    app.init();
    
})();





 
