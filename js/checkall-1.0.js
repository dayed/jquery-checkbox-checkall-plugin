/* ========================================================================
 * checkall.js v1.0.0
 * https://github.com/jianboolee/jquery-checkbox-checkall-plugin
 * ========================================================================
 * @author Jianboo
 *
 *
 * Licensed under the MIT License;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://rem.mit-license.org/
 *
 * ======================================================================== */

+function ($){
	// Checkall CLASS DEFINITION
	// =========================
	var toggle = '[data-toggle=checkall]'
	var Checkall = function(element, options){
		this.options = options
		this.$element = $(element)
		var $el = this.$element.on('click.bs.checkall', $.proxy(this.toggle, this))
	}

	Checkall.prototype.toggle = function(e){

		var $this = $(this)

		if ($this.is('.disabled, :disabled')) return

		var $target

		if(this.options && this.options.target && $(this.options.target)) $target = $(this.options.target)
		else $target = getTarget($this)

		var $checkboxs = $target.find(":checkbox")

		var $checkedbox = $target.find(":checked")

		var isAllChecked = false
		$checkboxs.length == $checkedbox.length ? isAllChecked=true : isAllChecked=false

		if($this.is("input[type='checkbox']")){
			$checkboxs.prop("checked",$this.prop("checked"))
		}
		else{
			if(isAllChecked) $checkboxs.prop("checked",false)
			else $checkboxs.prop("checked",true)
			return false;
		}
	}

	function getTarget($this){
		var selector = $this.attr('data-target')

		if(!selector){
			selector = $this.parentsUntil("form")
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
		.on('click.bs.checkall', '.checkall-toggle', Checkall.prototype.toggle)
			
	
}(window.jQuery);