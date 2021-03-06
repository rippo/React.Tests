var app = app || {};
app.components = app.components || {};


(function() {
    
    'use strict';
    
    
    var ToDoApp = app.components.ToDoApp = React.createClass({displayName: "ToDoApp",
    
        getInitialState: function() {
            return {
                data: [],
                showLoading: true
            }
        },
        
        componentDidMount: function() {
          app.getData().done(function(foo) {
            this.setState({ data: foo });
            this.setState({ showLoading: false });    
          }.bind(this));
        },
        
        render: function() {
            return (
                React.createElement("div", null, 
                React.createElement("h3", null, "Strict with anoymous functions that gets data from a promise, oh and we are using a app var"), 
                React.createElement("div", null, this.state.message), 
                 this.state.showLoading ? React.createElement("img", {src: "/content/ajax-loader.gif", alt: ""}) : null, 
                React.createElement(LookupList, {data: this.state.data})
                )
            );
        }
  });
    
    
  var LookupList = app.components.LookupList = React.createClass({displayName: "LookupList",
     render : function() {
         return (
             React.createElement("div", null, 
             this.props.data.map(function(item, index) {
                    return (
                        React.createElement(LookupItem, {key: item.id, item: item, index: index})
                    );
             })
             )
         );
     }
  });

  var LookupItem = app.components.LookupItem = React.createClass({displayName: "LookupItem",
     render : function() {
         return (
             React.createElement("div", null, 
                this.props.item.id, " - ", this.props.item.value
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

    
    //Use deferred and promise!
    app.getData = function() {
        
        var d = $.Deferred();
        
        $.ajax({
            url: "/ajax/lookup",
        }).done(function(data) {
            //setInterval(function () {
                d.resolve(data);
            //}, 1500);
        });
        
        return d.promise();
    }
    
    
    app.init();
    
})();


