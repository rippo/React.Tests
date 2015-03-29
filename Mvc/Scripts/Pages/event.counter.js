var MyLhs = React.createClass({displayName: "MyLhs",
  getInitialState: function() {
    return { counter: 0 };
  },

  createNewItem: function() {
    this.setState(
      {counter: ++this.state.counter}
    );
    
    EventSystem.publish('risk.count.update', this.state.counter);
  },

  render: function() {
    return (
      React.createElement("button", {className: "btn btn-primary", onClick: this.createNewItem}, "Increase RHS Counter")
    )
  }
});

React.render(
    React.createElement(MyLhs, null), 
    document.getElementById('lhs')
);




var MyRhs = React.createClass({displayName: "MyRhs",
  updateRiskCount: function(count) {
    this.setState({riskCount: count});
  },

  componentDidMount: function() {
    EventSystem.subscribe('risk.count.update', this.updateRiskCount);
  },
  getInitialState: function() {
    return {
      riskCount: 0
    };
  },
  render: function() {
    return (
      React.createElement("div", null, this.state.riskCount)
      )
  }
});

React.render(
    React.createElement(MyRhs, null), 
    document.getElementById('rhs')
);
