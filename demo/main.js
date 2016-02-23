require(['./config'], function() {

  require(['rboxjs', 'rendererjs', 'fmjs', 'jquery_ui'], function(rbox, renderer, fm) {
    // Entry point

    // Create a file manager object
    var CLIENT_ID = '1050768372633-ap5v43nedv10gagid9l70a2vae8p9nah.apps.googleusercontent.com';
    var driveFm = new fm.GDriveFileManager(CLIENT_ID);

    // renderers box options object
    var options = {
      container: document.getElementById('rboxcontainer'),
      position: {
        top: '9em',
        left: '10px',
        right: '5px',
        bottom: '5px'
      },
      renderersIdPrefix: 'renderer'
    };

    // Create a renderers box. The second parameter (a file manager) is optional and only required
    // if files are going to be loaded from GDrive
    var rBox = new rbox.RenderersBox(options, driveFm);
    rBox.init();

    // Image file object
    var imgFileObj = {
      id: -1,
      baseUrl: "/",
      imgType: "",
      files: []
    };

    // Event handler for the directory loader button
    var dirBtn = document.getElementById('dirbtn');

    dirBtn.onchange = function(e) {
      var files = e.target.files;

      imgFileObj.id++;
      imgFileObj.imgType = renderer.Renderer.imgType(files[0]);

      if ((imgFileObj.imgType === 'dicom') || (imgFileObj.imgType === 'dicomzip')) {

        imgFileObj.files = files;

      } else {

        imgFileObj.files = [files[0]];
      }

      if ('webkitRelativePath' in files[0]) {

        imgFileObj.baseUrl = files[0].webkitRelativePath;
      }

      rBox.addRenderer(imgFileObj, 'Z', function(render) {

        if (!render) {

          // renderer could not be added to the renderers box
          if (rBox.numOfRenderers === rBox.maxNumOfRenderers) {

            alert('Reached maximum allowed number of renderers. Please remove a renderer before trying to add another.');

          } else {

            alert('Bad data! Unsuccessful rendering attempt.');
          }
        }
      });
    };

  });

});
