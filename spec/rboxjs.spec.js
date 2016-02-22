/**
 * This module implements the rbox's specification (tests).
 *
 */

define(['rboxjsPackage'], function(rboxjs) {

  describe('rboxjs', function() {
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

    beforeEach(function() {
      rBox = new rboxjs.RenderersBox(options);
      rBox.init();
    });

    afterEach(function() {
      rBox.destroy();
    });

    it('rboxjs.RenderersBox container has class ui-sortable',
      function() {
        var val = rBox.container.hasClass('ui-sortable');

        expect(val).toEqual(true);
      }
    );

  });
});
