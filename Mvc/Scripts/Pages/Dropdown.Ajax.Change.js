var MyParentChange = React.createClass({

    getInitialState: function() {
        return {
            data: []
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
            <MySelectChange 
                data={this.state.data} />
        )
    }
});


var MySelectChange = React.createClass({

    getInitialState: function() {
        return {value: ""};
    },

    changeHandler: function(e) {
        this.setState({value: e.target.value});
    },

    render: function() {
        var mySelectOptions = function(result) {
            return <MySelectOptionsChange
                        key={result.id} 
                        data={result} />
            };
        return (
            <div>
                <select 
                    onChange={this.changeHandler}
                    className="form-control">
                    {this.props.data.map(mySelectOptions)}
                </select>
                <h3>Ouput</h3>
                <div className="content">
                    {this.state.value}
                </div>
            </div>
            )
    }
});


var MySelectOptionsChange = React.createClass({
    render: function() {
        return <option value={this.props.data.id}>{this.props.data.value}</option>
    }
});


React.render(
    <MyParentChange source="/ajax/lookup" />, 
    document.getElementById('dropdownchange')
);