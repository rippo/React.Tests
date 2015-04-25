(function(){
    /** McFly */

    var Flux = new McFly();

    /** Store */

    _todos = [];

    function addTodo(text){
        _todos.push(text);
    }

    var TodoStore = Flux.createStore({
        getTodos: function(){
            return _todos;
        }
    }, function(payload){
        if(payload.actionType === "ADD_TODO") {
            addTodo(payload.text);
            TodoStore.emitChange();
        }
    });

    /** Actions */

    var TodoActions = Flux.createActions({
        addTodo: function(text){
            return {
                actionType: "ADD_TODO",
                text: text
            }
        }
    });

    function getState(){
        return {
            todos: TodoStore.getTodos()
        }
    }

    /** Controller View */

    var TodosController = React.createClass({
        mixins: [TodoStore.mixin],
        getInitialState: function(){
            return getState();
        },
        onChange: function() {
            this.setState(getState());
        },
        render: function() {
            return <Todos todos={this.state.todos} />;
        }
    });

    /** Component */

    var Todos = React.createClass({
        addTodo: function(){
            TodoActions.addTodo('test');
        },
        render: function() {
            return (
            <div className="todos_app">
                <button className="btn btn-primary" onClick={this.addTodo}>Add Todo</button>
                <ul className="todos">
                    { this.props.todos.map(function(todo, index){
                        return <li key={index}>Todo {index}</li>
                    })}
                </ul>
            </div>
            )
        }
    });




    var TodosRhs = React.createClass({
        mixins: [TodoStore.mixin],
        getInitialState: function(){
            return getState();
        },
        onChange: function() {
            this.setState(getState());
        },
        render: function() {
            return <Todos todos={this.state.todos} />;
        }
    });


    React.render(<TodosController />, document.getElementById("lhs"));
    React.render(<TodosRhs />, document.getElementById("rhs"));

})();