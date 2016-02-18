require.config({
  paths: {
    jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min', '../../jquery/dist/jquery.min'],
    jquery_ui: ['https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min', '../../jquery-ui/jquery-ui.min'],
  },
// use packages to be able to use relative path in the package
  packages: [
  // bower packages
  {
    name: 'fmjsPackage', // used for mapping...
    location: '../../fmjs/src',   // relative to base url
    main: 'js/fmjs'
  },
  {
    name: 'rendererjsPackage', // used for mapping...
    location: '../../rendererjs/src',   // relative to base url
    main: 'js/rendererjs'
  },
  // local packages
  {
    name: 'rboxjsPackage', // used for mapping...
    location: '../src',   // relative to base url
    main: 'js/rboxjs'
  }
  ]
});