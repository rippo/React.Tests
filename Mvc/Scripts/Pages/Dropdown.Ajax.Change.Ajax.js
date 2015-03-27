var MyParentChangeAjax = React.createClass({

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
            <div onChange={this.changeHandler}>
                <MySelectChangeAjax data={this.state.data}  />
                { this.state.showOutput ? <MyOutputChangeAjax item={this.state.value}/> : null }
            </div>
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


var MyOutputChangeAjax = React.createClass({
    
    render: function() {
        return (<div>
                    <h3>Output</h3>
                    <p>
                        Id: <b>{this.props.item.id}</b> - 
                        Drink: <b>{this.props.item.drink}</b> - 
                        Container: <b>{this.props.item.container}</b>
                    </p>
                </div>)
    }

});


var MySelectChangeAjax = React.createClass({

    render: function() {
        var mySelectOptions = function(result) {
            return <MySelectOptionsChangeAjax
                        key={result.id} 
                        data={result} />
            };
        return (
                <select 
                    className="form-control">
                    {this.props.data.map(mySelectOptions)}
                </select>
            )
    }
});

var MySelectOptionsChangeAjax = React.createClass({
    render: function() {
        return <option value={this.props.data.id}>{this.props.data.value}</option>
    }
});


React.render(
    <MyParentChangeAjax source="/ajax/lookup" />, 
    document.getElementById('dropdowngetjson')
);