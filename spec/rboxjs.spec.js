/**
 * This module implements the rbox's specification (tests).
 *
 */

define(['rboxjs'], function(rboxjs) {

  describe('rboxjs', function() {

    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    var testDataDir = 'bower_components/mri_testdata/';

    // Image file object
    var imgFileObj = {
      id: 0,
      baseUrl: testDataDir + 'volumes/nii/',
      imgType: 'vol',
      files: [{url: testDataDir + 'volumes/nii/s34654_df.nii', name: 's34654_df.nii', remote: true}]
    };

    var rBox;

    // renderers box options object
    var options = {
      container: 'rboxcontainer',
      position: {
        top: '50px',
        left: '10px'
      },
      renderersIdPrefix: 'renderer'
    };

    // Append container div
    $(document.body).append('<div id="rboxcontainer"></div>');

    describe('rboxjs initialization', function() {

      beforeEach(function() {

        rBox = new rboxjs.RenderersBox(options);
      });

      afterEach(function() {

        rBox.destroy();
      });

      it('rboxjs.RenderersBox\'s container id is rboxcontainer',

        function() {

          expect(rBox.container.attr('id')).toEqual('rboxcontainer');
        }
      );

      it('rboxjs.RenderersBox container has class ui-sortable',

        function() {

          rBox.init();
          var val = rBox.container.hasClass('ui-sortable');
          expect(val).toEqual(true);
        }
      );

      it('rboxjs.RenderersBox container has class view-renderers',

        function() {

          rBox.init();
          var val = rBox.container.hasClass('view-renderers');
          expect(val).toEqual(true);
        }
      );
    });

    describe('rboxjs behaviour', function() {

      beforeEach(function() {

        rBox = new rboxjs.RenderersBox(options);
        rBox.init();
      });

      afterEach(function() {

        rBox.destroy();
      });

      it('rboxjs.addRenderer adds a renderer with a loaded volume to the renderers box',

        function(done) {

          rBox.addRenderer(imgFileObj, 'Z', function() {

            expect(rBox.container.find('.view-renderer').length).toEqual(1);
            expect(rBox.numOfRenderers).toEqual(1);
            expect(rBox.renderers[0].volume.filedata.byteLength).toBeGreaterThan(0);
            done();
          });
        }
      );

      it('rboxjs.addRenderer adds an internal XTK renderer with id renderer0',

        function(done) {

          rBox.addRenderer(imgFileObj, 'Z', function() {

            expect(rBox.container.find('#renderer0').length).toEqual(1);
            done();
          });
        }
      );

      it('rboxjs.removeRenderer removes a renderer from the renderers box',

        function(done) {

          rBox.addRenderer(imgFileObj, 'Z', function() {

            rBox.removeRenderer(rBox.renderers[0]);

            expect(rBox.container.find('.view-renderer').length).toEqual(0);
            expect(rBox.numOfRenderers).toEqual(0);

            done();
          });
        }
      );
    });

  });
});
