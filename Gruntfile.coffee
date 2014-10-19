#

module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'


    # @todo clean up these params, many don't work as expected
    jasmine_node:
      coverage: true
      projectRoot: './server/'
      options:
        match: '.'
        matchall: false
        extensions: 'js'
        specNameMatcher: 'spec'
        captureExceptions: true
        junitreport:
          report: false
          savePath : './coverage/reports/jasmine/'
          useDotNotation: true
          consolidate: true
      all: './server/spec/'

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-mkdir'
  grunt.loadNpmTasks 'grunt-jasmine-node-coverage'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-protractor-runner'


  grunt.registerTask 'test-cover-all', 'Test client, and server With coverage, and run end to end tests', ['test-cover-server']
  grunt.registerTask 'test-cover-server', 'Test server with coverage', ['jasmine_node']

  grunt.registerTask 'default', ['test-cover-all']
