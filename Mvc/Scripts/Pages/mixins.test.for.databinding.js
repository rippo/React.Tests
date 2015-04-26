var app = app || {};
app.components = app.components || {};


(function(){
    'use strict';
    
    
    var MixInTest = app.components.MixInTest = React.createClass({displayName: "MixInTest",
        mixins: [React.addons.LinkedStateMixin],
        
        getInitialState: function() {
            return {
                newValue:''      
            };
        },
        
        handleChange: function(e) {
          console.log(this.state.newValue);
        },
        
        render: function() {
          return (
              React.createElement("div", null, 
                React.createElement("input", {valueLink: this.linkState('newValue'), type: "text"}), 
                React.createElement("input", {onClick: this.handleChange, type: "button", value: "Save"})
              )
          );
        }
    });
    
    
    React.render(
        React.createElement(MixInTest, null),
        document.getElementById("mixin")
    )
    
})();