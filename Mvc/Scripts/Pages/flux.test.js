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

    var TodosController = React.createClass({displayName: "TodosController",
        mixins: [TodoStore.mixin],
        getInitialState: function(){
            return getState();
        },
        onChange: function() {
            this.setState(getState());
        },
        render: function() {
            return React.createElement(Todos, {todos: this.state.todos});
        }
    });

    /** Component */

    var Todos = React.createClass({displayName: "Todos",
        addTodo: function(){
            TodoActions.addTodo('test');
        },
        render: function() {
            return (
            React.createElement("div", {className: "todos_app"}, 
                React.createElement("button", {className: "btn btn-primary", onClick: this.addTodo}, "Add Todo"), 
                React.createElement("ul", {className: "todos"}, 
                     this.props.todos.map(function(todo, index){
                        return React.createElement("li", {key: index}, "Todo ", index)
                    })
                )
            )
            )
        }
    });




    var TodosRhs = React.createClass({displayName: "TodosRhs",
        mixins: [TodoStore.mixin],
        getInitialState: function(){
            return getState();
        },
        onChange: function() {
            this.setState(getState());
        },
        render: function() {
            return React.createElement(Todos, {todos: this.state.todos});
        }
    });


    React.render(React.createElement(TodosController, null), document.getElementById("lhs"));
    React.render(React.createElement(TodosRhs, null), document.getElementById("rhs"));

})();