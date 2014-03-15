'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
  
    // Project settings
    config: {
      webroot: 'public',
      dist: 'dist'
    },
    
    // Server settings (referenced elsewhere in this file)
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
            open: true,
            base: [
                '.tmp',
                '<%= config.webroot %>'
            ]
        }
      },
      test: {
        options: {
            port: 9001,
            base: [
                '.tmp',
                'test',
                '<%= config.webroot %>'
            ]
        }
      },
      dist: {
        options: {
            open: true,
            base: '<%= config.dist %>',
            livereload: false
        }
      }
    },
    
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git'
          ]
        }]
      },
      server: '.tmp'
    },
    
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.webroot %>/js/{,*/}*.js',
        'app.js',
        'app/{,*/}*.js',
        'config/{,*/}*.js',
        'lib/{,*/}*.js'
      ]
    },
    
    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: [] // TODO
        }
      }
    },
    
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= config.webroot %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= config.webroot %>/images',
        javascriptsDir: '<%= config.webroot %>/scripts',
        fontsDir: '<%= config.webroot %>/styles/fonts',
        importPath: '<%= config.webroot %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false
      },
      dist: {
        options: {
            generatedImagesDir: '<%= config.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    
    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    
    // Compile client-side scripts into a single file (and allow use of require)
    browserify: {
      dist: {
        files: {
          '.tmp/module.js': ['public/scripts/**/*.js']
        }
      }
    },
    
    // Automatically inject Bower components into the HTML file
    bowerInstall: {
      app: {
        src: ['<%= config.webroot %>/index.html'],
        ignorePath: '<%= config.webroot %>/',
        exclude: ['<%= config.webroot %>/bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js']
      },
      sass: {
        src: ['<%= config.webroot %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: '<%= config.webroot %>/bower_components/'
      }
    },
    
    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },
    
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.webroot %>/index.html'
    },
    
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },
    
    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.webroot %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.webroot %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },
    
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.webroot %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'styles/fonts/{,*/}*.*',
            'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.webroot %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    
    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      devFile: '<%= config.webroot %>/bower_components/modernizr/modernizr.js',
      outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
      files: [
        '<%= config.dist %>/scripts/{,*/}*.js',
        '<%= config.dist %>/styles/{,*/}*.css',
        '!<%= config.dist %>/scripts/vendor/*'
      ],
      uglify: true
    },
    
    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'compass:server',
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'compass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },
    
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js',
          '<%= config.webroot %>/js/{,*/}*.js'
        ],
        tasks: ['develop', 'delayed-livereload', 'jshint']
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<% config.webroot %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.webroot %>/styles{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.webroot %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.webroot %>/images/{,*/}*'
        ]
      },
      jade: {
        files: ['app/views/**/*.jade'],
        options: { livereload: reloadPort }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });
  
  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'browserify',
      'concurrent:server',
      'autoprefixer',
      //'connect:livereload',
      'develop',
      'watch'
    ]);
  });
  
  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });
  
  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'modernizr',
    'rev',
    'usemin',
    'htmlmin'
  ]);
  
  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
