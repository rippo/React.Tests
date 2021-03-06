module.exports = function (grunt) {

    grunt.initConfig({

        react: {

            //event sub/pub test
            single_file_output: {
                files: {
                    'mvc/scripts/pages/event.counter.js': 'mvc/scripts/src/jsx/Event.System.Counter.jsx',
                    'mvc/scripts/pages/flux.test.js': 'mvc/scripts/src/jsx/flux.test.jsx',
                    'mvc/scripts/pages/strict.test.js': 'mvc/scripts/src/jsx/strict.test.jsx',
                    'mvc/scripts/pages/mixins.test.for.databinding.js': 'mvc/scripts/src/jsx/Mixins.Test.For.Databinding.jsx'
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

        browserify: {
            browserifyOptions: {
                debug: true,
            },
            main: {
                src: [
                    'mvc/scripts/pages/dropdown.ajax.js',
                    'mvc/scripts/pages/strict.test.js',
                    'mvc/scripts/pages/mixins.test.for.databinding.js'
                ],
                dest: 'mvc/scripts/app.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['react', 'browserify'])

};