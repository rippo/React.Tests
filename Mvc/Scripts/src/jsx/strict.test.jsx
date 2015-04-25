var app = app || {};
app.components = app.components || {};


(function() {
    
    'use strict';
    
    
    var ToDoApp = app.components.ToDoApp = React.createClass({
    
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
                <div>
                <h3>Strict with anoymous functions that gets data from a promise, oh and we are using a app var</h3>
                <div>{this.state.message}</div>
                { this.state.showLoading ? <img src='/content/ajax-loader.gif' alt=''/> : null }
                <LookupList data={this.state.data} />
                </div>
            );
        }
  });
    
    
  var LookupList = app.components.LookupList = React.createClass({
     render : function() {
         return (
             <div>
             {this.props.data.map(function(item, index) {
                    return (
                        <LookupItem key={item.id} item={item} index={index} />
                    );
             })}
             </div>
         );
     }
  });

  var LookupItem = app.components.LookupItem = React.createClass({
     render : function() {
         return (
             <div>
                {this.props.item.id} - {this.props.item.value}
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

    
    //Use deferred and promise!
    app.getData = function() {
        
        var d = $.Deferred();
        
        $.ajax({
            url: "/ajax/lookup",
        }).done(function(data) {
            //setInterval(function () {
                d.resolve(data);
            //}, 3000);
        });
        
        return d.promise();
    }
    
    
    app.init();
    
})();


