/*
* Universal Conversion Tool library, based on the Simple Web Framework
*	uct-main.html script companion
*
* version: 1.2
* license: Apache 2.0
* author:  François Court
* date: october 2021
*
*/
import * as utils from './../swf/swf-utils.js';
import * as uct from './uct-lib.js';
import * as tb from './../swf/swf-edtb.js';
// instanciation of the generic swf ui object  
const ui = new utils._ui({ nav: utils._ui.nav_opt.HIDDEN | utils._ui.nav_opt.HOME });
function selectDefault() {
	utils.triggerClickBySelector("[data-idtab='home']");
	utils.triggerClickBySelector("[data-idsubtab='inabout-gui']");
}
function updateDOMElements() {
	// add the same 'gases' row everytime they're needed (ie in an ".gas" class element)
	utils.eltBySelAppend('.oxygen', '<td colspan="5" class="td2" style="background:LightSalmon">Oxygen</td>');
	utils.eltBySelAppend('.nitrogen', '<td colspan="5" class="td2" style="color: white; background:DarkRed">Nitrogen</td>');
	utils.eltBySelAppend('.argon', '<td colspan="5" class="td2" style="background:Teal">Argon</td>');
	utils.eltBySelAppend('.co2', '<td colspan="5" class="td2" style="background:Gray">CO2</td>');
	utils.eltBySelAppend('.hydrogen', '<td colspan="5" class="td2" style="color: white; background:#272727">Hydrogen</td>');
	utils.eltBySelAppend('.helium', '<td colspan="5" class="td2" style="color: white;background:SaddleBrown">Helium</td>');
	// reset all values to 0
	new utils._nodes('.tdval').text('0').attr('contenteditable', 'true');
	// update the label from the xxx_cvdatas map
	new utils._nodes('.tdtxt').each(function (elt) {
		const attr = elt.getAttribute('data-id');
		if (attr !== null) {
			elt.innerHTML = uct.getDescription(attr);
		}
	});
	// some non null value by default to look better
	uct.cvGas("f_gs_nm3hour", null, "100");
	uct.cvGas("p_gs_nm3", null, "0.9");
	uct.cvGas("t_celsius", null, "20");
	uct.cvGas("pr_atm", null, "1 ");
}
updateDOMElements();
document.addEventListener("DOMContentLoaded", function () {
	// management of editable tables; everything is managed in the class
	// including the invocation of the listener to click and keydown events
	function onUpdate(elt) {
		console.log(elt.textContent);
		if (uct.cvGas(null, elt, elt.textContent) == false) {
			elt.textContent = "conversion error";
		}
	}
	var tbed = new tb._edtb(onUpdate, { toutMax: 4000 });
	//manage HTML imports
	var tokens = [{
			token: "{{name}}",
			value: "Fran&#xE7;ois Court"
		}, {
			token: "{{email}}",
			value: "attel@malagate.com"
		}, {
			token: "{{year}}",
			value: "2021"
		}];
	utils.importsHTML(tokens);
	window.addEventListener('resize', function () {
		ui.resize();
	});
	// create the generic events handlers for the swf framework
	ui.addEvents();
	// validation of the default selected panels
	selectDefault();
	// check & manager the url query parameters 
	ui.checkQueryParameters();
	// hide nav panel if option HIDDEN is selected
	if (ui.navOptHidden()) {
		ui.hideNav();
	}
	ui.resize();
	// hide the blocking div now that the page is loaded
	ui.show();
	console.log(utils.version());
	console.log(uct.version());
	console.log(tb.version());
});
