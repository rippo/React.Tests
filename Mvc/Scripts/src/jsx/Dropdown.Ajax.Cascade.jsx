var MyParentCascade = React.createClass({

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
            <div onChange={this.changeHandler}>
                <MySelectCascade 
                    data={this.state.data1} 
                    name="input1" />
                <MySelectCascade 
                    data={this.state.data2} 
                    name="input2" />
                { this.state.showOutput ? <MyOutputCascade item1={this.state.value1} item2={this.state.value2}/> : null }
            </div>
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


var MyOutputCascade = React.createClass({
    
    render: function() {
        return (
            <div>
                <h3>Output</h3>
                {this.props.item1 ? <p>Id: <b>{this.props.item1.id}</b> Value: <b>{this.props.item1.value}</b></p> : null}
                {this.props.item2 ? <p>Id: <b>{this.props.item2.id}</b> Value: <b>{this.props.item2.value}</b></p> : null}
            </div>
        )
    }

});


var MySelectCascade = React.createClass({

    render: function() {
        var mySelectOptions = function(result) {
     
            return <MySelectOptionsCascade
                        key={result.id} 
                        data={result} />
            };
            return (
                <select
                    name={this.props.name}
                    className="form-control">
                        {this.props.data.map(mySelectOptions)}
                </select>
            )
    }
});


var MySelectOptionsCascade = React.createClass({
    render: function() {
        return <option value={this.props.data.id}>{this.props.data.value}</option>
    }
});


React.render(
    <MyParentCascade source="/ajax/lookup" />, 
    document.getElementById('dropdowncascade')
);