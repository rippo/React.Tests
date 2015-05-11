(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
    React.render(
        React.createElement("h1", null, "Hello, world!"),
        document.getElementById('example')
    );
})();
(function(){
    var MyParentCascade = React.createClass({displayName: "MyParentCascade",

        getInitialState: function() {
            return {
                data1: [], data2: [], 
                value1: {}, value2: {}, 
                showOutput: false
            }
        },

        componentDidMount: function() {
            $.get(this.props.source, function(result) {
                this.setState({
                    data1: result
                });
            }.bind(this));
        },

        render: function() {
            return (
                React.createElement("div", {onChange: this.changeHandler}, 
                    React.createElement(MySelectCascade, {
                        data: this.state.data1, 
                        name: "input1"}), 
                    React.createElement(MySelectCascade, {
                        data: this.state.data2, 
                        name: "input2"}), 
                     this.state.showOutput ? React.createElement(MyOutputCascade, {item1: this.state.value1, item2: this.state.value2}) : null
                )
            )
        },

        changeHandler: function(e) {

            if (e.target.name === "input1") {
                console.log("parent changed");

                this.state.data1.forEach(function(item) {
                    if (parseInt(item.id) === parseInt(e.target.value)) {
                        this.setState({ showOutput: item.id > 0 });
                        this.setState({ value1: item });

                        $.get("/ajax/lookup2/" + item.id, function(result) {
                            this.setState({
                                data2: result
                            });
                            this.setState({ value2: result[0] });
                        }.bind(this));

                    }
                }.bind(this));
            }

            if (e.target.name === "input2") {
                console.log("child changed");

                this.state.data2.forEach(function(item) {
                    if (parseInt(item.id) === parseInt(e.target.value)) {
                        this.setState({ showOutput: item.id > 0 });
                        this.setState({ value2: item });
                    }
                }.bind(this));
            }

        }
    });


    var MyOutputCascade = React.createClass({displayName: "MyOutputCascade",

        render: function() {
            return (
                React.createElement("div", null, 
                    React.createElement("h3", null, "Output"), 
                    this.props.item1 ? React.createElement("p", null, "Id: ", React.createElement("b", null, this.props.item1.id), " Value: ", React.createElement("b", null, this.props.item1.value)) : null, 
                    this.props.item2 ? React.createElement("p", null, "Id: ", React.createElement("b", null, this.props.item2.id), " Value: ", React.createElement("b", null, this.props.item2.value)) : null
                )
            )
        }

    });


    var MySelectCascade = React.createClass({displayName: "MySelectCascade",

        render: function() {
            var mySelectOptions = function(result) {

                return React.createElement(MySelectOptionsCascade, {
                            key: result.id, 
                            data: result})
                };
                return (
                    React.createElement("select", {
                        name: this.props.name, 
                        className: "form-control"}, 
                            this.props.data.map(mySelectOptions)
                    )
                )
        }
    });


    var MySelectOptionsCascade = React.createClass({displayName: "MySelectOptionsCascade",
        render: function() {
            return React.createElement("option", {value: this.props.data.id}, this.props.data.value)
        }
    });


    React.render(
        React.createElement(MyParentCascade, {source: "/ajax/lookup"}), 
        document.getElementById('dropdowncascade')
    );
})();    
(function() {
    var MyParentChangeAjax = React.createClass({displayName: "MyParentChangeAjax",

        getInitialState: function() {
            return {
                data: [], value: {}, showOutput: false
            }
        },

        componentDidMount: function() {
            $.get(this.props.source, function(result) {
                this.setState({
                    data: result
                });
            }.bind(this));
        },

        render: function() {
            return (
                React.createElement("div", {onChange: this.changeHandler}, 
                    React.createElement(MySelectChangeAjax, {data: this.state.data}), 
                     this.state.showOutput ? React.createElement(MyOutputChangeAjax, {item: this.state.value}) : null
                )
            )
        },

        changeHandler: function(e) {

            $.get("/ajax/AdditionalInfo/" + e.target.value, function(result) {
                this.setState({ showOutput: true });
                this.setState({ value: result });
            }.bind(this))
            .fail(function() {
                this.setState({ showOutput: false });
            }.bind(this));
        }

    });


    var MyOutputChangeAjax = React.createClass({displayName: "MyOutputChangeAjax",

        render: function() {
            return (React.createElement("div", null, 
                        React.createElement("h3", null, "Output"), 
                        React.createElement("p", null, 
                            "Id: ", React.createElement("b", null, this.props.item.id), " -" + ' ' + 
                            "Drink: ", React.createElement("b", null, this.props.item.drink), " -" + ' ' + 
                            "Container: ", React.createElement("b", null, this.props.item.container)
                        )
                    ))
        }

    });


    var MySelectChangeAjax = React.createClass({displayName: "MySelectChangeAjax",

        render: function() {
            var mySelectOptions = function(result) {
                return React.createElement(MySelectOptionsChangeAjax, {
                            key: result.id, 
                            data: result})
                };
            return (
                    React.createElement("select", {
                        className: "form-control"}, 
                        this.props.data.map(mySelectOptions)
                    )
                )
        }
    });

    var MySelectOptionsChangeAjax = React.createClass({displayName: "MySelectOptionsChangeAjax",
        render: function() {
            return React.createElement("option", {value: this.props.data.id}, this.props.data.value)
        }
    });


    React.render(
        React.createElement(MyParentChangeAjax, {source: "/ajax/lookup"}), 
        document.getElementById('dropdowngetjson')
    );
})();
(function(){
    var MyParentChange = React.createClass({displayName: "MyParentChange",

        getInitialState: function() {
            return {
                data: [], value: {}, showOutput: false
            }
        },

        componentDidMount: function() {
            $.get(this.props.source, function(result) {
                this.setState({
                    data: result
                });
            }.bind(this));
        },

        render: function() {
            return (
                React.createElement("div", {onChange: this.changeHandler}, 
                    React.createElement(MySelectChange, {data: this.state.data}), 
                     this.state.showOutput ? React.createElement(MyOutputChange, {item: this.state.value}) : null
                )
            )
        },

        changeHandler: function(e) {
            this.state.data.forEach(function(item) {
                if (parseInt(item.id) === parseInt(e.target.value)) {
                    this.setState({ showOutput: item.id > 0 });
                    this.setState({ value : item});
                }
            }.bind(this));
        }

    });


    var MyOutputChange = React.createClass({displayName: "MyOutputChange",

        render: function() {
            return (React.createElement("div", null, 
                        React.createElement("h3", null, "Output"), 
                        React.createElement("p", null, "Id: ", React.createElement("b", null, this.props.item.id), " Value: ", React.createElement("b", null, this.props.item.value))
                    ))
        }

    });


    var MySelectChange = React.createClass({displayName: "MySelectChange",

        render: function() {
            var mySelectOptions = function(result) {
                return React.createElement(MySelectOptionsChange, {
                            key: result.id, 
                            data: result})
                };
            return (
                    React.createElement("select", {
                        className: "form-control"}, 
                        this.props.data.map(mySelectOptions)
                    )
                )
        }
    });

    var MySelectOptionsChange = React.createClass({displayName: "MySelectOptionsChange",
        render: function() {
            return React.createElement("option", {value: this.props.data.id}, this.props.data.value)
        }
    });


    React.render(
        React.createElement(MyParentChange, {source: "/ajax/lookup"}), 
        document.getElementById('dropdownchange')
    );
            
})();
(function() {

    'use strict';
 
    var MyParent = React.createClass({displayName: "MyParent",

        getInitialState: function() {
            return {
                data: [],
            }
        },

        componentDidMount: function() {
            $.get(this.props.source, function(result) {
                this.setState({ data: result});
            }.bind(this));
        },

        render: function() {
            return (
                React.createElement(MySelect, {data: this.state.data, selected: this.props.selected})
            )
        }
    });

    var MySelect = React.createClass({displayName: "MySelect",
        render: function() {

            var mySelectOptions = function(result) {
                return React.createElement(MySelectOptions, {key: result.id, data: result})
            };

            return React.createElement("select", {value: this.props.selected, className: "form-control"}, this.props.data.map(mySelectOptions))
        }
    });


    var MySelectOptions = React.createClass({displayName: "MySelectOptions",
        render: function() {
            return React.createElement("option", {value: this.props.data.id}, this.props.data.value)
        }
    });


    React.render(
        React.createElement(MyParent, {source: "/ajax/lookup", selected: "2"}), 
        document.getElementById('dropdown')
    );

})();

},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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



},{}]},{},[1,3,2]);
