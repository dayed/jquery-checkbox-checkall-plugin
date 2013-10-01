/* ========================================================================
 * checkall.js v1.0.1
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
	var toggleClass= '.checkall-toggle'
	var Checkall = function(element, options){
		this.options = options
		this.$element = $(element)
		var $el = this.$element.on('click.bs.checkall', $.proxy(this.toggle, this))
	}

	Checkall.prototype.toggle = function(e){

		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $target = this.options && this.options.target ? $(this.options.target) : getTarget($this)
		var $checkboxs = $target.find(":checkbox")
		var $checkedbox = $target.find(":checked")

		if($this.is("input[type='checkbox']")){
			$checkboxs.prop("checked",$this.prop("checked"))
		}
		else{
			$checkboxs.prop("checked", $checkboxs.length != $checkedbox.length )
			return false
		}
	}
	Checkall.prototype.resetCheckAllButton = function(e){
		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $parent = getParent($this)

		var $checkallToggle = $parent.find(toggle)
		if(!$checkallToggle.length){
			$parent.find(toggleClass)
		}

		var $checkboxs = $parent.find(":checkbox").not(toggle).not(toggleClass)
		var $checkedbox = $parent.find(":checked").not(toggle).not(toggleClass)

		$checkallToggle.prop("checked",$checkboxs.length == $checkedbox.length)

	}

	function getParent($this){
		var selector = $this.parentsUntil("form").parent()

		if(!selector){
			selector = $this.parentsUntil(".checkall").parent()
		}

		var $parent = selector && $(selector)

		return $parent && $parent.length ? $parent : $(document)
	}

	function getTarget($this){
		var selector = $this.attr('data-target')

		if(!selector){
			selector = $this.parentsUntil("form").parent()
		}
		var $target = selector && $(selector)

		return $target && $target.length ? $target : $(document)
	}

	// CHECKALL PLUGIN DEFINITION
	// ==========================

	var old = $.fn.checkall

	$.fn.checkall = function (option) {
		return this.each(function () {
			var $this = $(this)
			var data  = $this.data('checkall')
			var options = typeof option == 'object' && option;

			if (!data) $this.data('checkall', (data = new Checkall(this, options)))

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