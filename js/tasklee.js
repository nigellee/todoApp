var app = angular.module('app', ['ngMaterial', 'ngMdIcons']);

var app_requires = ['$scope', appController];

app.controller('appController', app_requires);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('grey');
});

app.config(function($mdIconProvider) {
  $mdIconProvider
     .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
     .defaultIconSet('img/icons/sets/core-icons.svg', 24);
 });

app.directive('taskItem', function() {
	/* Get the vew name passed to the directive */
	var itemView = window[function(scope, ele, attr) {
 		return ele.view;
	}];
 
  var rtn = {};
  rtn.restrict = 'AE';				// can be used as attribute or element
  rtn.scope = { task: '=', view: '@' };
  rtn.template=getItemView(itemView);
  return rtn;
});

// app.filter('taskView', function() {
//   return function(tasks) {
//     var filtered = [];
//     angular.forEach(tasks, taskView(task));
//     return filtered;
//   };
// });

/*
  Main Controller
*/
function appController($scope) {
	$scope.defaults = getAppDefaults();
	$scope.pref = getUserPrefs();
	$scope.searchString = "";
	$scope.title = "TaskLee";
	$scope.filterName = "All Tasks";
	$scope.tasks = getTaskList();
	$scope.projects = getProjectList($scope.tasks);
	$scope.contexts = getContextList($scope.tasks);
	$scope.selected = {
		task: $scope.tasks[0].id,
		project: "",
		context: ""
	};
	$scope.toggleSidenav = function(menuId) {
	  $mdSidenav(menuId).toggle();
	};
	$scope.icons = {
		add: "add_circle_outline",
		context: "place",
		menu: "menu",
		priority_high: "looks_1",
		priority_normal: "check_box_outline_blank",
		priority_low: "looks_3",
		priority_critical: "assignment_late",
		project: "work", 
		search: "search",
		status_complete: "done",
		task: "check_box_outline_blank"
	};
 }

/*
	Return user preferences
*/
function getUserPrefs() {
	var preferences = {
		firstName: "Nigel",
		lastName: "",
		taskView: "td3Line"
	};

	return preferences;
}

/*
	Return app default settings 
*/
function getAppDefaults() {
	var defaults = {
		taskView: "td3Line"
	};

	return defaults;
}

function newTask(taskObject) {
	taskObject.taskView = taskView(taskObject);
	return taskObject;
}

function getTaskList() {
	var data = [];
	data.push(newTask( { 
		    "id": "TL000001",
		    "what": "Buy milk",
		    "who": "Ben", 
		    "project" : "Groceries",
		    "priority": "A",
		    "context" : "store",
		    "created" : "20151215160000",
		    "due" : "",
		    "start" : "",
		    "done" : "",
		    "status" : "new",
		    "url" : "#",
		    "tags" : "",
		    "notes" : ""
	    }));
	data.push(newTask( { 
		    "id": "TL000002",
		    "what": "Learn javascript",
		    "who": "Laura",     
		    "context" : "online",
		    "project" : "Education"
	    }));
	data.push(newTask( { 	
		    "id": "TL000003",
		    "what": "Rake the leaves.",
		    "notes": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
		    "who": "Richard",     
		    "project" : "Yardwork"
	    }));
	data.push(newTask( { 	
		    "id": "TL000004",
		    "who": "Peter",
		    "priority": "B",
		    "what": "Prepare dinner",
		    "context" : "home",
		    "notes": "Falls mainly on the plains"
	    }));
	data.push(newTask( { 	
		    "id": "TL000005",        
		    "who": "Bob",
		    "what": "Buy bread ",
		    "project" : "Groceries",		    
		    "notes": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	    }));
	data.push(newTask( { 	
		    "id": "TL000006",        
		    "who": "Walter",
		    "what": "Walk the dog",
		    "project": "Chores",
		    "assignment": "duties",
		    "context" : "home",
		    "notes": "He played nick nack on my drum."
	    }));
	data.push(newTask( { 	
		    "id": "TL000007",        
		    "who": "Nigel",
		    "priority": "Z",
		    "what": "Know everything",
		    "context" : "brain",
		    "notes": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
	    }));
	data.push(newTask( { 	
		    "id": "TL000008",        
		    "who": "Donald",
		    "what": "Do the dishes",
		    "project": "",
		    "context" : "home",
		    "notes": "This old man came rolling home."
	    }));

	return data;
}

/*
	Return an array of unique projects extracted from the task list
*/
function getProjectList(tasks) {
	var projects = [];

	for (i = 0; i<tasks.length; i++) {
		var p = tasks[i].project;
		if (p) {
			if (projects.indexOf(p) == -1 ) {
				projects.push(p);
			}
		}
	}
	return projects;
}

/*
	Return an array of unique contexts extracted from the task list
*/
function getContextList(tasks) {
	var contexts = [];

	for (i = 0; i<tasks.length; i++) {
		var c = tasks[i].context;
		if (c) {
			if (contexts.indexOf(c) == -1 ) {
				contexts.push(c);
			}
		}
	}
	return contexts;
}

/*
	Return item views
*/
function getItemView(viewName) {
	var tl3Line =  
				'<md-list-item id="task-item" class="md-3-line" ng-click="selected.task = task.id">' +
	      '  <img ng-src="{{task.face}}" alt="{{task.who}}" class="md-avatar">' +
	      '  <div flex class="taskLine">{{task.what}}</div>' +
	      '	 <span flex="5" class="taskLine">{{task.priority}}</span>' +
 
				'	 <div id="taskNotes" ng-show="task.who !== pref.firstName && task.who">[{{task.who}}]</div> {{task.notes}}' +
 
				'	 <md-divider inset ng-if="!$last"></md-divider>' +

	      '</md-list-item>';

	var tlDefault = 
			'    	<md-list-item flex class="md-primary md-hue-1 task-item" ' +
			'    		ng-repeat="task in tasks | filter:searchString" ' +
			'    		ng-click="selected.task = task.id">' +
			'				<div class="md-avatar ">' +
			'					<i class="material-icons task-icon">{{task.icon || icons.priority_normal}}</i>' +
			'				</div>' +
			'  			<div flex class="md-primary md-hue-1 task" layout="column"  >' +
			'  				<div  class="md-subhead task-what-line" layout="row">' +
			'		        <div flex="80" ng-class="{\'empty-field\': (!task.what)}">{{task.what}}</div>' +
			'		        <div flex="10" ng-class="{\'empty-field\': (!task.status)}">{{task.status}}</div>' +
			'		        <div flex="10" ng-class="{\'empty-field\': (!task.due)}">{{task.due}}</div>' +
			'          </div>  <!-- whatline -->' +
			'          <p  class="md-body-1 task-detail-line" layout="row"' +
			'          		ng-show="task.ui.showDetailLine"> ' +
			'          	<span flex="30" ng-class="{\'empty-field\': (!task.project)}">{{task.project || "(no project)"}}</span>' +
			'		        <span flex="30" ng-class="{\'empty-field\': (!task.assignment)}">{{task.assignment || "(no assignment)"}}</span>' +
			'		        <span flex="20" ng-class="{\'empty-field\': (!task.url)}">{{task.url  || "(no URL)"}}</span>  				          	' +
			'		        <span flex="10" ng-class="{\'empty-field\': (!task.context)}">{{task.context || "(anywhere)"}}</span>  				          	' +
			'		        <span flex="10" ng-class="{\'empty-field\': (!task.who)}">{{task.who || "(nobody)"}}</span>  				          	' +
			'	        </p>' +
			'	        <p  class="md-body-2 task-note-line" layout="row"' +
			'	        	ng-show="task.ui.showNotesLine"> ' +
			'          	<span flex="80" class="task-note">{{task.notes}}</span>' +
			'		        <span flex="20" ng-class="{\'empty-field\': (!task.tags)}">{{task.tags || "(no tags)"}}</span>' +
			'	        </p>' +
			'        </div>';

	var taskView = eval(viewName); 
	if (taskView) {
		return taskView;
	} 
	else {
		// return getItemView($scope.defaults.taskView)
		return tl3Line;
		// return '<h1>Error</h1>';
	}
}

function taskView(task) {
	task.ui={};
	task.ui.showDetailLine = true;
	if (!task.project&&!task.assignment&&!task.url&&!task.context&&!task.who) {
		task.ui.showDetailLine = false;
	}

	task.ui.showNotesLine = true;
	if (!task.notes&&!task.tags) {
		task.ui.showNotesLine = false;
	}
}

