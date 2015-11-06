/**
 * This module implements the rbox's specification (tests).
 *
 */

define(['rboxjs'], function(rboxjs) {

  describe('rboxjs', function() {
    var rBox;
    // renderers box options object
    var options = {
      contId: 'rboxcontainer',
      position: {
        top: '50px',
        left: '10px'
      }
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

    it('rboxjs.RenderersBox.prototype.getVolProps("Z") returns 2',
      function () {
        expect(rBox.getVolProps('Z').rangeInd).toEqual(2);
      }
    );

  });
});
