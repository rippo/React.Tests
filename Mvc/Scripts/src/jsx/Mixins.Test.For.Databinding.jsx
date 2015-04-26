var app = app || {};
app.components = app.components || {};


(function(){
    'use strict';
    
    
    var MixInTest = app.components.MixInTest = React.createClass({
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
              <div>
                <input valueLink={this.linkState('newValue')} type="text"/>
                <input onClick={this.handleChange} type="button" value="Save" />
              </div>
          );
        }
    });
    
    
    React.render(
        <MixInTest/>,
        document.getElementById("mixin")
    )
    
})();