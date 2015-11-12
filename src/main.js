require.config({
  baseUrl: 'js/components',
  paths: {
    // The left side is the module ID, the right side is the path to the file relative
    // to baseUrl (which is in turn relative to the directory of this config script).
    // Also, the path should NOT include the '.js' file extension.
    // This example tries to load jQuery from Google's CDN first and if failure then falls
    // back to the local jQuery at jquery/dist/jquery.min.js relative to the baseUrl.
    //
    // All JS modules are needed in development mode. However the only modules needed after
    // building are jquery, jquery_ui and minimized rboxjs.

    jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min', 'jquery/dist/jquery.min'],
    jquery_ui: ['https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min', 'jquery-ui/jquery-ui.min'],
    gapi: 'https://apis.google.com/js/api',
    jszip: 'jszip/dist/jszip',
    dicomParser: 'dicomParser/dist/dicomParser.min',
    xtk: '../lib/xtk',
    utiljs: 'utiljs/src/js/utiljs',
    fmjs: 'fmjs/src/js/fmjs',
    rboxjs: '../rboxjs'
  }
});


require(['rboxjs', 'fmjs'], function(rbox, fm) {
  // Entry point

  // Create a file manager object
  var CLIENT_ID = '1050768372633-ap5v43nedv10gagid9l70a2vae8p9nah.apps.googleusercontent.com';
  var driveFm = new fm.GDriveFileManager(CLIENT_ID);

  // renderers box options object
  var options = {
    contId: 'rboxcontainer',
    position: {
      top: '6em',
      left: '10px',
      right: '5px',
      bottom: '5px'
    }
  };

  // Create a renderers box. The second parameter (a file manager) is optional and only required
  // if files are going to be loaded from GDrive
  var rBox = new rbox.RenderersBox(options, driveFm);
  rBox.init();

  // Image file object
  var imgFileObj = {
    id: -1,
    baseUrl: "",
    imgType: "",
    files: []
  };

  // Event handler for the directory loader button
  var dirBtn = document.getElementById('dirbtn');

  dirBtn.onchange = function(e) {
    var files = e.target.files;
    var baseUrl = "/";

    imgFileObj.id++;
    imgFileObj.imgType = rbox.RenderersBox.imgType(files[0]);

    if ((imgFileObj.imgType === 'dicom') || (imgFileObj.imgType === 'dicomzip')) {
      imgFileObj.files = files;
    } else {
      imgFileObj.files = [files[0]];
    }

    if ('webkitRelativePath' in files[0]) {
      imgFileObj.baseUrl = files[0].webkitRelativePath;
    }

    rBox.add2DRender(imgFileObj, 'Z', function(render) {
      if (!render) {
        alert('Reached maximum allowed number of renderers. Please remove some renderer before adding another.');
      }
    });
  };

});
