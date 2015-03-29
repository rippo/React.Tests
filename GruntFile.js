module.exports = function(grunt) {

  grunt.initConfig({

    react: {

      //event sub/pub test
      single_file_output: {
        files: {
          'mvc/scripts/pages/event.counter.js': 'mvc/scripts/src/jsx/Event.System.Counter.jsx'
        }
      },

      //event sub/pub test
      single_file_output: {
        files: {
          'mvc/scripts/pages/flux.test.js': 'mvc/scripts/src/jsx/flux.test.jsx'
        }
      },


      //Drop down       
      combined_file_output: {
        files: {
          'mvc/scripts/pages/dropdown.ajax.js': [
            'mvc/scripts/src/jsx/hello.jsx',
            'mvc/scripts/src/jsx/dropdown.ajax.cascade.jsx',
            'mvc/scripts/src/jsx/dropdown.ajax.change.ajax.jsx',
            'mvc/scripts/src/jsx/dropdown.ajax.change.jsx',
            'mvc/scripts/src/jsx/dropdown.ajax.simple.jsx'
          ]
        }
      },

    },

  });

  grunt.loadNpmTasks('grunt-react');
  
  grunt.registerTask('default', ['react'])

};

