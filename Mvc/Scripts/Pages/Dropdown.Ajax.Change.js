var MyParentChange = React.createClass({

    getInitialState: function() {
        return {
            data: [], value: {}
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
                <MySelectChange data={this.state.data}  />
                <h3>Output</h3>
                <MyOutputChange item={this.state.value}/>
            </div>
        )
    },

    changeHandler: function(childComponent) {
        this.state.data.forEach(function(item) {
            if (parseInt(item.id) === parseInt(childComponent.target.value)) {
                this.setState({ value : item});
            }
        }.bind(this));
    }

});


var MyOutputChange = React.createClass({
    
    render: function() {
        return (<p>Id: <b>{this.props.item.id}</b> Value: <b>{this.props.item.value}</b></p>)

    }

});


var MySelectChange = React.createClass({

    render: function() {
        var mySelectOptions = function(result) {
            return <MySelectOptionsChange
                        key={result.id} 
                        data={result} />
            };
        return (
                <select 
                    //onChange={this.handleClick}
                    className="form-control">
                    {this.props.data.map(mySelectOptions)}
                </select>
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