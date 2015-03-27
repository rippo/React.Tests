var MyLhs = React.createClass({
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
      <button className="btn btn-primary" onClick={this.createNewItem}>Increase RHS Counter</button>
    )
  }
});

React.render(
    <MyLhs  />, 
    document.getElementById('lhs')
);




var MyRhs = React.createClass({
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
      <div>{this.state.riskCount}</div>
      )
  }
});

React.render(
    <MyRhs  />, 
    document.getElementById('rhs')
);
