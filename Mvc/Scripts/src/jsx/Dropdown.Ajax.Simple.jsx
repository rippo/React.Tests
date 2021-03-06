(function() {

    'use strict';
 
    var MyParent = React.createClass({

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
                <MySelect data={this.state.data} selected={this.props.selected} />
            )
        }
    });

    var MySelect = React.createClass({
        render: function() {

            var mySelectOptions = function(result) {
                return <MySelectOptions key={result.id} data={result} />
            };

            return <select value={this.props.selected} className="form-control">{this.props.data.map(mySelectOptions)}</select>
        }
    });


    var MySelectOptions = React.createClass({
        render: function() {
            return <option value={this.props.data.id}>{this.props.data.value}</option>
        }
    });


    React.render(
        <MyParent source="/ajax/lookup" selected="2" />, 
        document.getElementById('dropdown')
    );

})();
