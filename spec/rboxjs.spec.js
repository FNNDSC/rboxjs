/**
 * This module implements the rbox's specification (tests).
 *
 */

define(['rboxjs'], function(rboxjs) {

  describe('rboxjs', function() {
    var rBox;

    // Append container div
    $(document.body).append('<div id="rboxcontainer"></div>');


    beforeEach(function() {
      rBox = new rboxjs.RenderersBox('rboxcontainer');
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
