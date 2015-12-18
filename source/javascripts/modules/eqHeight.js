(function() {

  // moduleName based on data-attr:
  var _moduleName = 'eqHeight';

  // the initialize function:
  function _runModule() {
    var
      $selector = $('[data-module~="' + _moduleName + '"]');

    function equalizeHeights(selector) {
  		var
        heights = new Array();

  		// Loop to get all element heights
  		$(selector).each(function() {

  			// Need to let sizes be whatever they want so no overflow on resize
  			$(this).css('min-height', '0');
  			$(this).css('max-height', 'none');
  			$(this).css('height', 'auto');

  			// Then add size (no units) to array
  	 		heights.push($(this).height());
  		});

  		// Find max height of all elements
  		var max = Math.max.apply( Math, heights );

  		// Set all heights to max height
  		$(selector).each(function() {
  			$(this).css('height', max + 'px');
  		});
  	}



    var
      magicBreakPoint = 767,
      windowWidth     = $(window).width();

    $(window).ready(function() {
      if(windowWidth > magicBreakPoint) {
        equalizeHeights($selector);
      }
      else {
        $($selector).css('height', 'auto');
      }
    });

    $(window).resize(function() {
      if(windowWidth > magicBreakPoint) {
        equalizeHeights($selector);
      }
      else {
        $($selector).css('height', 'auto');
      }
    });

  }

  // check to see if module is in the DOM before initializing:
  var _runElement = $('[data-module~="' + _moduleName + '"]');
  if (_runElement.length > 0) { _runModule(); }
})();
