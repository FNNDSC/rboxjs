/**
 * This module implements a renderers' container box
 */

// define a new module
define(['utiljs', 'rendererjs', 'jquery_ui'], function(util, renderer) {

  /**
   * Provide a namespace for the renderers box module
   *
   * @namespace
   */
  var rboxjs = rboxjs || {};

  /**
   * Class implementing the renderers box
   *
   * @constructor
   * @param {Object} renderers box's options with properties:
   *   -container: renderers box's container's DOM id or DOM object
   *   -position: renderers box's css position object with possible properties top, bottom, left, right
   *   -renderersIdPrefix: a prefix string for the DOM ids used for the XTK renderer's containers
   * @param {Object} optional file manager object to enable reading of files from the cloud or HTML5
   * sandboxed filesystem.
   */
  rboxjs.RenderersBox = function(options, fileManager) {

    this.version = 0.0;

    // renderers box's container
    if (typeof options.container === 'string') {

      // a DOM id was passed
      this.container = $('#' + options.container);

    } else {

      // a DOM object was passed
      this.container = $(options.container);
    }

    // renderers box's css position object with possible properties top, bottom, left, right
    if (options.position) {
      this.position = options.position;
    } else {
      this.position = {};
    }

    // prefix string for the DOM ids that are going to be used for the XTK renderer's containers
    this.renderersIdPrefix = options.renderersIdPrefix;

    // list of currently rendered renderer objects
    this.renderers = [];

    // maximum number of renderers
    this.maxNumOfRenderers = 4;

    // current number of renderers
    this.numOfRenderers = 0;

    // file manager object
    this.fileManager = null;
    if (fileManager) { this.fileManager = fileManager; }
  };

  /**
   * Initialize the renderers box.
   */
  rboxjs.RenderersBox.prototype.init = function() {
    var self = this;

    var container = self.container;

    // add the appropriate classes
    container.addClass('view-renderers');

    // jQuery UI options object for sortable elems
    // ui-sortable CSS class is by default added to the containing elem
    // an elem being moved is assigned the ui-sortable-helper class
    var sort_opts = {
      cursor: 'move',
      cursorAt: {left: 20, top: 20},
      handle: '.view-renderer-titlebar',
      containment: container.parent(), // within which elem displacement is restricted
      dropOnEmpty: true, // allows depositing items into an empty list

      //event handlers
      helper: function(evt, target) { // visually moving element

        return self.computeMovingHelper(evt, target);
      },

      start: function(evt, ui) {

        self.onStart(evt, ui);
      },

      // beforeStop is called when the placeholder is still in the list
      beforeStop: function(evt, ui) {

        self.onBeforeStop(evt, ui);
      }
    };

    // make the renderers box a jQuery UI's sortable element
    container.sortable(sort_opts);

    self.setPosition(self.position);
  };

  /**
   * Set a new css position for the renderers box  .
   *
   * @param {Object} css position object with possible properties: "top", "bottom", "left" and "right".
   */
  rboxjs.RenderersBox.prototype.setPosition = function(pos) {

    var container = this.container;
    var t = '', r = '', b = '', l = '';

    if (pos) {

      if (pos.top) {
        this.position.top = pos.top;
        container.css({top: pos.top});
        t = ' - ' + pos.top;
      }

      if (pos.right) {
        this.position.right = pos.right;
        container.css({right: pos.right});
        r = ' - ' + pos.right;
      }

      if (pos.bottom) {
        this.position.bottom = pos.bottom;
        container.css({bottom: pos.bottom});
        b = ' - ' + pos.bottom;
      }

      if (pos.left) {
        this.position.left = pos.left;
        container.css({left: pos.left});
        l = ' - ' + pos.left;
      }

      if (t || b) {
        container.css({height: 'calc(100%' + t + b + ')'});
      }

      if (r || l) {
        container.css({width: 'calc(100%' + r + l + ')'});
      }
    }
  };

  /**
   * This method creates and returns a new visual element that will be displayed instead of a renderer
   * when dragging the renderer out of the renderers box. The element is removed at the end of the move.
   *
   * @param {Object} jQuery UI event object.
   * @param {Object} jQuery UI target object.
   */
  rboxjs.RenderersBox.prototype.computeMovingHelper = function(evt, target) {

    console.log('computeMovingHelper not overwritten!');
    console.log('event obj: ', evt);
    console.log('target obj: ', target);

    // if not overwritten then the visually moving helper is a clone of the target element
    return target.clone();
  };

  /**
   * This method is called at the beginning of moving a renderer out of the renderers box.
   *
   * @param {Object} jQuery UI event object.
   * @param {Object} jQuery UI ui object.
   */
  rboxjs.RenderersBox.prototype.onStart = function(evt, ui) {

    console.log('onStart not overwritten!');
    console.log('event obj: ', evt);
    console.log('ui obj: ', ui);
  };

  /**
   * This method is called just before dropping a moving helper visual element on a complementary
   * jQuery UI's sortable element.
   *
   * @param {Object} jQuery UI event object.
   * @param {Object} jQuery UI ui object.
   */
  rboxjs.RenderersBox.prototype.onBeforeStop = function(evt, ui) {

    console.log('onBefore not overwritten!');
    console.log('event obj: ', evt);
    console.log('ui obj: ', ui);
  };

  /**
   * This method is called everytime a renderer in the UI changes state.
   *
   * @param {Object} event object.
   */
  rboxjs.RenderersBox.prototype.onRendererChange = function(evt) {

    console.log('onRendererChange not overwritten!');
    console.log('event obj: ', evt);
  };

  /**
   * This method is called everytime a renderer is removed from the renderers box.
   *
   * @param {Number} integer id of the removed renderer.
   */
  rboxjs.RenderersBox.prototype.onRendererRemove = function(id) {

    console.log('onRendererRemove not overwritten!');
    console.log('renderer integer id: ', id);
  };

  /**
   * Set complementary jQuery UI sortable elements which the moving helper can be visually appended to.
   *
   * @param {String} css selector indicating the complementary sortable elements.
   */
  rboxjs.RenderersBox.prototype.setComplementarySortableElems = function(cssSelector) {

    // the moving helper element can be appended to these elements
    this.container.sortable('option', 'appendTo', cssSelector);

    // connect with these sortable elements
    this.container.sortable('option', 'connectWith', cssSelector);
  };

  /**
   * Create and add a renderer with a loaded volume to the renderers box.
   *
   * @param {Object} image file object with the following properties:
   *  -id: Integer id
   *  -baseUrl: String ‘directory/containing/the/files’
   *  -imgType: String neuroimage type. Any of the possible values returned by rendererjs.Renderer.imgType
   *  -files: Array of HTML5 File objects or custom file objects with properties:
   *     -remote: a boolean indicating whether the file has not been read locally (with a filepicker)
   *     -url the file's url
   *     -cloudId: the id of the file in a cloud storage system if stored in the cloud
   *     -name: file name
   *  The files array contains a single file for imgType different from 'dicom' or 'dicomzip'
   *  -json: Optional HTML5 or custom File object (optional json file with the mri info for imgType different from 'dicom')
   * @param {String} X, Y or Z orientation.
   * @param {Function} optional callback whose argument is the renderer object if successfuly added or null otherwise.
   */
  rboxjs.RenderersBox.prototype.addRenderer = function(imgFileObj, orientation, callback) {
     var self = this;

     var rArr = self.renderers.filter( function(el) {

       return el.id === imgFileObj.id;
     });

     if (rArr.length) {

       // renderer already added
       if (callback) { callback(rArr[0]); }

       return;
     }

     if (self.numOfRenderers === self.maxNumOfRenderers) {

       // already reached maximum number of renderers so this renderer can not be added
       if (callback) { callback(null); }

       return;
     }

     // append html renderer's container
     var jqR = $('<div></div>');
     self.container.append(jqR);

     // renderer options object
     var options = {
       container: jqR[0],
       rendererId: self.getRendererContId(imgFileObj.id), // for the internal XTK renderer container
       orientation: orientation
     };

     // create a renderer
     var r = new renderer.Renderer(options, self.fileManager);

     // assign an integer id
     r.id = imgFileObj.id;

     // overwrite event handler for the renderer's close button
     r.onRendererClose = function() {

       self.removeRenderer(r);
     };

     // overwrite event handler for the onRendererChange
     r.onRendererChange = function(evt) {
       var targetRndr = this;

       // maximize button click event
       if ((evt.type === 'click') && $(evt.currentTarget).hasClass('view-renderer-titlebar-buttonpane-maximize')) {

         // style renderers
         if (targetRndr.maximized) {

           self.renderers.forEach( function(rndr) {

             if (targetRndr.id !== rndr.id) {
               rndr.container.css({display: 'none'});
             }
           });

         } else {

           self.positionRenderers();
         }
       }

       // scroll event
       if (evt.type === 'scroll_3') {

         var volProps = targetRndr.getVolProps(targetRndr.orientation);

         // change slice in the other selected renderers
         self.getSelectedRenderers().forEach( function(rndr) {

           if (targetRndr.id !== rndr.id) {

             if (evt.up) {

               rndr.volume[volProps.index]++;

             } else {

               rndr.volume[volProps.index]--;
             }

             rndr.updateUISliceInfo();
           }
         });
       }

       // throw rBox's onRendererChange event
       self.onRendererChange(evt);
     };

     // add renderer to the list of current UI renderers
     self.renderers.push(r);
     ++self.numOfRenderers;

     // start the rendering
     r.init(imgFileObj, function() {

       if (r.error) {

         // couldn't render so remove the renderer
         self.removeRenderer(r);

         if (callback) { callback(null); }

       } else {

         // renderer ready
         if (callback) { callback(r); }
       }
     });

     if (self.numOfRenderers === 1) {

       // hide the maximize/restore button when this renderer is alone in the UI
       $('.view-renderer-titlebar-buttonpane-maximize', jqR).css({display: 'none'});

     } else {

       // show any hidden button in the title bar of all renderers
       $('.view-renderer-titlebar-buttonpane-maximize', self.container).css({display: 'block'});
     }

     // rearrange layout
     self.positionRenderers();
   };

  /**
   * Remove a renderer from the renderers box.
   *
   * @param {Object} a renderer object.
   */
  rboxjs.RenderersBox.prototype.removeRenderer = function(rndr) {
    var id = rndr.id;

    for (var i = 0; i < this.renderers.length; i++) {

      if (this.renderers[i].id === id) {

        this.renderers.splice(i, 1);

        // remove HTML interface and event handlers
        rndr.destroy();
        rndr.container.remove();

        // reposition renderers
        --this.numOfRenderers;
        this.positionRenderers();

        // hide the maximize/restore button when there is only one renderer
        if (this.numOfRenderers === 1) {
          $('.view-renderer-titlebar-buttonpane-maximize', this.container).css({display: 'none'});
        }

        // throw rBox's onRendererRemove event
        this.onRendererRemove(id);

        break;
      }
    }
  };

  /**
   * Rearrange renderers in the renderers box's UI layout.
   */
  rboxjs.RenderersBox.prototype.positionRenderers = function() {

    var jqRenderers = $('div.view-renderer', this.container).css({display: 'block'});

    switch (this.numOfRenderers) {
      case 1:
        jqRenderers.css({
              width: '100%',
              height: '100%'
            });
      break;

      case 2:
        jqRenderers.css({
              width: '50%',
              height: '100%',
              float: 'left'
            });
      break;

      default:
        jqRenderers.css({
              width: '50%',
              height: '50%',
              float: 'left'
            });
      break;
    }

    util.documentRepaint();
  };

  /**
   * Link renderers in the renderers box's (select all).
   */
  rboxjs.RenderersBox.prototype.linkRenderers = function() {

    this.renderers.forEach( function(rndr) {

      if (!rndr.selected) { rndr.select(); }
    });
  };

  /**
   * Unlink renderers in the renderers box's (deselect all).
   */
  rboxjs.RenderersBox.prototype.unlinkRenderers = function() {

    this.renderers.forEach( function(rndr) {

      if (rndr.selected) { rndr.deselect(); }
    });
  };

  /**
   * Unlink renderers in the renderers box's.
   *
   * @return {Array} array with the renderers selected in the UI.
   */
  rboxjs.RenderersBox.prototype.getSelectedRenderers = function() {

    return this.renderers.filter( function(rndr) {

      return rndr.selected;
    });
  };

  /**
   * Return a renderer's internal XTK renderer's container DOM id.
   *
   * @param {Number} renderer's integer id.
   * @return {String} the renderer's container DOM id.
   */
  rboxjs.RenderersBox.prototype.getRendererContId = function(id) {

    // the internal XTK renderer's container DOM id is related to the renderer's integer id
    return this.renderersIdPrefix + id;
  };

  /**
   * Returns a renderer's integer id.
   *
   * @param {String} the renderer's internal XTK renderer's container DOM id.
   * @return {Number} the renderer's integer id.
   */
  rboxjs.RenderersBox.prototype.getRendererId = function(rendererContId) {

    // the renderer's integer id is related to the internal XTK renderer's container DOM id
    return parseInt(rendererContId.replace(this.renderersIdPrefix, ''));
  };

  /**
   * Destroy all objects and remove html interface
   */
  rboxjs.RenderersBox.prototype.destroy = function() {

    // destroy renderers
    for (var i = this.renderers.length - 1; i >= 0; i--) {
      this.removeRenderer(this.renderers[i]);
    }

    // remove html
    this.container.empty();
    this.container = null;
  };

  return rboxjs;
});
