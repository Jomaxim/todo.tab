var storageArea = chrome.storage.sync;
//storageArea.clear(null);

function Todo(name) {
	if(typeof(name)==='undefined') name = "";
   	this.id = Math.random().toString(36).substring(7);
   	this.name = name;
   	this.created = Date.now();
   	this.done = false;
   	this.completed = null;
}

angular.module('TodoService', [])

  	.service('todoService', function() {
	 	var self = this;

  		console.log("Initialized todoService");

	  	this.todos = [new Todo("Todos go here")]; //default value
	  	
	  	this.load = function(callback){
			storageArea.get("todos", function(item) {
				// Notify that we saved.
				console.log("todos.loaded");

				if(item.todos == undefined || item.todos == null)
					item.todos = self.todos;//default

				console.log(item.todos);
				// $scope.$apply(function(){
				//   	$scope.todos = item.todos;
				// });
				self.todos = item.todos;

				callback(self.todos);

	        });
		};
		
		this.save = function() {
			storageArea.set({'todos': self.todos}, function() {
	          // Notify that we saved.
	          console.log("todos.saved");
	        });
		};

		this.addTodo = function(afterItem) {
			var todo = new Todo();
			if(afterItem) {
				var index = _.findIndex(self.todos, { 'id': afterItem });
				self.todos.splice(index+1, 0, todo);
		  	} 
		  	else {
		  		self.todos.push(todo); //add to end of the list
		  		console.log("todo.added");
		  	}
		  	console.log("todo.added " + todo.id);
		  	self.save();
		  	return {todos: self.todos, newestTodo: todo.id};

		};

		this.removeTodo = function(todo) {
			_.remove(self.todos, { 'id': todo });
		  	console.log("todo.removed " + todo);
		  	self.save();
		  	return self.todos;
		};

		this.reset = function() {
			storageArea.clear(null);
		};
});