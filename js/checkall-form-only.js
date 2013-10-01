/* ========================================================================
 * checkall-form-only.js v1.0.1
 * @author Jianboo
 * https://github.com/jianboolee/jquery-checkbox-checkall-plugin
 * ========================================================================
 *
 * Licensed under the MIT License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://rem.mit-license.org/
 *
 * ======================================================================== */

+function ($){ "use strict";

	// Checkall CLASS DEFINITION
	// =========================

	var toggle = '[data-toggle=checkall]'
	var toggleClass = '.checkall-toggle';
	var Checkall = function(element){
		var $el = $(element).on('click.bs.checkall', this.toggle)
	}

	Checkall.prototype.toggle = function(e){

		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $target = getTarget($this)
		var $checkboxs = $target.find(":checkbox")

		$checkboxs.prop("checked",$this.prop("checked"))
	}

	Checkall.prototype.resetCheckAllButton = function(e){
		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $target = getTarget($this)

		var $checkallToggle = $target.find(toggle)
		if(!$checkallToggle.length){
			$checkallToggle = $target.find(toggleClass)
		}

		var $checkboxs = $target.find(":checkbox").not(toggle).not(toggleClass)
		var $checkedboxs = $target.find(":checked").not(toggle).not(toggleClass)

		$checkallToggle.prop("checked",$checkboxs.length == $checkedboxs.length)

	}
	function getTarget($this){
		var selector = $this.parentsUntil("form").parent()

		var $target = selector && $(selector)

		return $target && $target.length ? $target : $(document)
	}

	// CHECKALL PLUGIN DEFINITION
	// ==========================

	var old = $.fn.checkall

	$.fn.checkall = function () {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('checkall')
			var options = typeof option == 'object' && option;

			if (!data) $this.data('checkall', (data = new Checkall(this)))

			if (typeof option == 'string') data[option].call($this)
		})
	}

	$.fn.checkall.Constructor = Checkall

	// CHECKALL NO CONFLICT
	// ====================

	$.fn.checkall.noConflict = function () {
		$.fn.checkall = old
		return this
	}

	$(document)
		.on('click.bs.checkall', toggle, Checkall.prototype.toggle)
		.on('click.bs.checkall', toggleClass, Checkall.prototype.toggle)
		.on('click.bs.checkall', ':checkbox', Checkall.prototype.resetCheckAllButton)
			
}(window.jQuery);