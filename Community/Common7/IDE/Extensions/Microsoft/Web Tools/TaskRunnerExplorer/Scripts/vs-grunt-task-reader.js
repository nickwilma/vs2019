module.exports = function(grunt) {
  'use strict';

  var VS_READER_TASK_NAME = 'vs-grunt-task-reader';
  var XML_TASKS_NODE_NAME = 'tasks';
  var XML_TASK_NODE_NAME = 'task';
  var XML_NAME_NODE_NAME = 'name';
  var XML_ALIAS_NODE_NAME = 'alias';
  var XML_INFO_NODE_NAME = 'info';
  var XML_TARGETS_NODE_NAME = 'targets';
  var XML_TARGET_NODE_NAME = 'target';


  grunt.registerTask(VS_READER_TASK_NAME, 'Read grunt tasks from gruntfile.', function() {

    var tasks = [];

    var isAlias = function(task) {
      return task.info != null ? task.info.indexOf("Alias for ") == 0 : false;
    };

    var escapeXml = function (value) {
        return value.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    }

    

    var gruntData = grunt.config.getRaw();
    var gruntTasks = grunt.task._tasks;

    Object.keys(grunt.task._tasks).forEach(function(name) {
      var task = grunt.task._tasks[name];

      if (name !== VS_READER_TASK_NAME) {
          tasks.push({ name: name, isAlias: isAlias(task), info: task.info, targets: [] });
      }
    });

    for (var task in gruntTasks) {
      if (gruntData.hasOwnProperty(task)) {

        var parentTask = null;

        for (var i = 0; i < tasks.length; i++) {
          var oldTask = tasks[i];
          if (oldTask.name === task) { 
            parentTask = oldTask;
            break;
          }
        }

        if (!parentTask) {
            parentTask = { name: task, isAlias: isAlias(task), info: task.info, targets: []};

          tasks.push(parentTask);
        }

        // Gather targets
        if (gruntData[task] === Object(gruntData[task])) {
          var arr = [];
          for (var target in gruntData[task]) {
            if (gruntData[task].hasOwnProperty(target)) {
              if (target !== 'options' &&
                  target !== 'files') {
                arr.push(target);
              }
            }
          }
          if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                parentTask.targets.push({ name: arr[i] });
            }
          }
        }
      }
    }


    grunt.log.writeln("<" + VS_READER_TASK_NAME + ">")
    grunt.log.writeln("<" + XML_TASKS_NODE_NAME + ">");

    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var taskIsAlias = task.isAlias ? "true" : "false";
        var taskInfo = task.info ? escapeXml(task.info) : "";
        var taskName = escapeXml(task.name);

      grunt.log.writeln("<" + XML_TASK_NODE_NAME + ">");
      grunt.log.writeln("\t<" + XML_NAME_NODE_NAME + ">" + taskName + "</" + XML_NAME_NODE_NAME + ">");
      grunt.log.writeln("\t<" + XML_ALIAS_NODE_NAME + ">" + taskIsAlias + "</" + XML_ALIAS_NODE_NAME + ">");
      grunt.log.writeln("\t<" + XML_INFO_NODE_NAME + ">" + taskInfo + "</" + XML_INFO_NODE_NAME + ">");

      grunt.log.writeln("\t<" + XML_TARGETS_NODE_NAME + ">");
      for (var j = 0; j < task.targets.length; j++) {
          grunt.log.writeln("\t<" + XML_TARGET_NODE_NAME + ">" + escapeXml(task.targets[j].name) + "</" + XML_TARGET_NODE_NAME + ">");
      }
      grunt.log.writeln("\t</" + XML_TARGETS_NODE_NAME + ">");
      grunt.log.writeln("</" + XML_TASK_NODE_NAME + ">");
    }

    grunt.log.writeln("</" + XML_TASKS_NODE_NAME + ">");
    grunt.log.writeln("</" + VS_READER_TASK_NAME + ">")
  });
};
