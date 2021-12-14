/*
 * Universal Conversion Tool library, based on the Simple Web Framework
 *
 * version: 1.3
 * license: Apache 2.0
 * author:  François Court
 * date: october 2021
 *
 */
"use strict";
export { cvGas, getDescription, version };
import * as utils from './../swf/swf-utils.js';
function version() {
	return "uct lib v1.3";
}
class cvp {
	constructor(cv, format, txt, min = null) {
		this.cv = cv;
		this.format = format;
		this.txt = txt;
		this.min = min;
	}
}
;
var flow_cvdatas = new Map([
	['f_gs_scfyear', new cvp(1 / 38.040, '#,##0.000', 'scf/year (millions)')],
	['f_gs_scfmonth', new cvp(12 / 38.040, '#,##0.000', 'scf/month (millions)')],
	['f_gs_scfday', new cvp(365.25 / 1000 / 38.040, '#,##0.000', 'scf/day (thousands)')],
	['f_gs_scfhour', new cvp(365.25 * 24 / 1000000 / 38.040, '#,##0.', 'scf/hour')],
	['f_gs_nm3year', new cvp(1, '#,##0.000', 'm3/year (millions)')],
	['f_gs_nm3month', new cvp(12, '#,##0.000', 'm3/month (millions)')],
	['f_gs_nm3day', new cvp(365.25 / 1000000, '#,##0.', 'm3/day')],
	['f_gs_nm3hour', new cvp(365.25 * 24 / 1000000, '#,##0.', 'm3/hour')],
	['f_gs_sm3year', new cvp(1 * 273.15 / 288.15, '#,##0.000', 'm3/year (millions)')],
	['f_gs_sm3month', new cvp(12 * 273.15 / 288.15, '#,##0.000', 'm3/month (millions)')],
	['f_gs_sm3day', new cvp(365.25 / 1000000 * 273.15 / 288.15, '#,##0.', 'm3/day')],
	['f_gs_sm3hour', new cvp(365.25 * 24 / 1000000 * 273.15 / 288.15, '#,##0.', 'm3/hour')],
	['f_o2_stpd', new cvp(365.25 * 24 / 1000000 / (1.4287 * 24 / 1000) * 0.90718474, '#,##0.000', 'short tons/day')],
	['f_o2_gapd', new cvp(365.25 * 24 / 1000000 / (1.4287 * 24) * 1141.2 / 1000 * 3.785411784, '#,##0.0', 'gallons/day')],
	['f_o2_mtpd', new cvp(365.25 * 24 / 1000000 / (1.4287 * 24 / 1000), '#,##0.000', 'metric tons/day')],
	['f_o2_lipd', new cvp(365.25 * 24 / 1000000 / (1.4287 * 24) * 1141.2 / 1000, '#,##0.', 'liters/day')],
	['f_n2_stpd', new cvp(365.25 * 24 / 1000000 / (1.2501 * 24 / 1000) * 0.90718474, '#,##0.000', 'short tons/day')],
	['f_n2_gapd', new cvp(365.25 * 24 / 1000000 / (1.2501 * 24) * 806.11 / 1000 * 3.785411784, '#,##0.0', 'gallons/day')],
	['f_n2_mtpd', new cvp(365.25 * 24 / 1000000 / (1.2501 * 24 / 1000), '#,##0.000', 'metric tons/day')],
	['f_n2_lipd', new cvp(365.25 * 24 / 1000000 / (1.2501 * 24) * 806.11 / 1000, '#,##0.', 'liters/day')],
	['f_ar_stpd', new cvp(365.25 * 24 / 1000000 / (1.7835 * 24 / 1000) * 0.90718474, '#,##0.000', 'short tons/day')],
	['f_ar_gapd', new cvp(365.25 * 24 / 1000000 / (1.7835 * 24) * 1395.4 / 1000 * 3.785411784, '#,##0.0', 'gallons/day')],
	['f_ar_mtpd', new cvp(365.25 * 24 / 1000000 / (1.7835 * 24 / 1000), '#,##0.000', 'metric tons/day')],
	['f_ar_lipd', new cvp(365.25 * 24 / 1000000 / (1.7835 * 24) * 1395.4 / 1000, '#,##0.', 'liters/day')],
	['f_co2_stpd', new cvp(365.25 * 24 / 1000000 / (1.9763 * 24 / 1000) * 0.90718474, '#,##0.000', 'short tons/day')],
	['f_co2_gapd', new cvp(365.25 * 24 / 1000000 / (1.9763 * 24) * 1178.4 / 1000 * 3.785411784, '#,##0.0', 'gallons/day')],
	['f_co2_mtpd', new cvp(365.25 * 24 / 1000000 / (1.9763 * 24 / 1000), '#,##0.000', 'metric tons/day')],
	['f_co2_lipd', new cvp(365.25 * 24 / 1000000 / (1.9763 * 24) * 1178.4 / 1000, '#,##0.', 'liters/day')],
	['f_h2_stpd', new cvp(365.25 * 24 / 1000000 / (0.08988 * 24 / 1000) * 0.90718474, '#,##0.000', 'short tons/day')],
	['f_h2_gapd', new cvp(365.25 * 24 / 1000000 / (0.08988 * 24) * 70.516 / 1000 * 3.785411784, '#,##0.0', 'gallons/day')],
	['f_h2_mtpd', new cvp(365.25 * 24 / 1000000 / (0.08988 * 24 / 1000), '#,##0.000', 'metric tons/day')],
	['f_h2_lipd', new cvp(365.25 * 24 / 1000000 / (0.08988 * 24) * 70.516 / 1000, '#,##0.', 'liters/day')],
	['f_he_lbpd', new cvp(365.25 * 24 / 1000000 / (0.1784 * 24 / 1000) * 0.90718474 / 2000, '#,##0.0', 'pounds/day')],
	['f_he_gapd', new cvp(365.25 * 24 / 1000000 / (0.1784 * 24) * 124.74 / 1000 * 3.785411784, '#,##0.0', 'gallons/day')],
	['f_he_kgpd', new cvp(365.25 * 24 / 1000000 / (0.1784 * 24 / 1000) / 1000, '#,##0.0', 'kilograms/day')],
	['f_he_lipd', new cvp(365.25 * 24 / 1000000 / (0.1784 * 24) * 124.74 / 1000, '#,##0.', 'liters/day')],
	['f_he_isoyear', new cvp(1 / 38.040 * 0.954941, '#,##0.0', 'iso/year')],
	['f_he_knm3year', new cvp(1 / 1000, '#,##0.000', 'm3 (thousands)/year')],
	['f_he_ksm3year', new cvp(1 * 273.15 / 288.15 / 1000, '#,##0.000', 'm3 (thousands)/year')]
]);
var price_cvdatas = new Map([
	['p_gs_hscf', new cvp(1 * 38.040 / 100, "#,##0.000", "$/hscf")],
	['p_gs_kscf', new cvp(1 * 38.040 / 1000, "#,##0.000", "$/kscf")],
	['p_gs_nm3', new cvp(1, "#,##0.000", "$/Nm3")],
	['p_gs_sm3', new cvp(1 / (273.15 / 288.15), "#,##0.000", "$/Sm3")],
	['p_o2_st', new cvp(1 * (1.4287 / 1000) / 0.90718474, "#,##0.00", "$/ston")],
	['p_o2_mt', new cvp(1 * (1.4287 / 1000), "#,##0.00", "$/mton")],
	['p_n2_st', new cvp(1 * (1.2501 / 1000) / 0.90718474, "#,##0.00", "$/ston")],
	['p_n2_mt', new cvp(1 * (1.2501 / 1000), "#,##0.00", "$/mton")],
	['p_ar_st', new cvp(1 * (1.7835 / 1000) / 0.90718474, "#,##0.00", "$/ston")],
	['p_ar_mt', new cvp(1 * (1.7835 / 1000), "#,##0.00", "$/mton")],
	['p_co2_st', new cvp(1 * (1.9763 / 1000) / 0.90718474, "#,##0.00", "$/ston")],
	['p_co2_mt', new cvp(1 * (1.9763 / 1000), "#,##0.00", "$/mton")],
	['p_co2_gal', new cvp(1 * (1.9763 / 1000) / 1178.4 * 1000000 / 3.785411784, "#,##0.00", "$/gallon")],
	['p_co2_li', new cvp(1 * (1.9763 / 1000) / 1178.4 * 1000000, "#,##0.00", "$/liter")],
	['p_h2_lb', new cvp(1 * (0.08988 / 1000) * 1000 * 2.204623, "#,##0.00", "$/lb")],
	['p_h2_kg', new cvp(1 * (0.08988 / 1000) * 1000, "#,##0.00", "$/kg")],
	['p_he_li', new cvp(1 * (0.1784 / 1000) / 124.74 * 1000000, "#,##0.00", "$/liter")],
	['p_he_kg', new cvp(1 * (0.1784 / 1000) * 1000, "#,##0.00", "$/kg")]
]);
var temp_cvdatas = new Map([
	['t_fahr', new cvp(1 * 5 / 9, "#,##0.0", "&deg;F", -273.15 * 9 / 5 + 32)],
	['t_celsius', new cvp(1, "#,##0.0", "&deg;C", -273.15)],
	['t_kelvin', new cvp(1, "#,##0.00", "&deg;K", 0)]
]);
// special case for temperatures - defines an offset to add depending on the conversion 
var temp_temp = new Map([
	['t_fahr', new Map([['t_fahr', 0], ['t_celsius', 32], ['t_kelvin', -273.15 * 9 / 5 + 32]])],
	['t_celsius', new Map([['t_fahr', -32 * 5 / 9], ['t_celsius', 0], ['t_kelvin', -273.15]])],
	['t_kelvin', new Map([['t_fahr', +273.15 - 32 * 5 / 9], ['t_celsius', 273.15], ['t_kelvin', 0]])]
]);
var pressure_cvdatas = new Map([
	['pr_psi', new cvp(1 / 14.50377, "#,##0.00", "psi")],
	['pr_bar', new cvp(1, "#,##0.00", "bar")],
	['pr_mbar', new cvp(1 / 1000, "#,##0.0", "mbar")],
	['pr_inhg', new cvp(1 / 29.529983, "#,##0.00", "in Hg")],
	['pr_atm', new cvp(1 / 0.9869233, "#,##0.00", "atm")]
]);
const all_cvdatas = new Map([
	['f_', flow_cvdatas],
	['p_', price_cvdatas],
	['t_', temp_cvdatas],
	['pr', pressure_cvdatas]
]);
// update all values in the same table related to the base element elt passed as parameter (a td element) 
// td are related when they belong to the same category of conversion (first two letters of the id
// must be the same)
function cvGas(eltid, pelt, value) {
	const elt = (eltid !== null) ? document.getElementById(eltid) : pelt;
	if ((elt === null) || (value === null) || isNaN(parseFloat(value))) {
		console.error("cvGas.invalid parameters", eltid, pelt, value);
		return false;
	}
	try {
		let rv = true;
		// type of conversion pr=pressure, f_ flow etc.
		const cvtable = elt.id.substr(0, 2);
		// conversion map corresponding to the type of conversion
		const cvdatas = all_cvdatas.get(cvtable);
		// value of the base element
		elt.textContent = value;
		let cur_val = parseFloat(elt.textContent);
		// get all nodes to update, ie whose id starts with the same two letters than the based element 
		if (cvdatas === undefined || isNaN(cur_val)) {
			throw "cvGas.could not find the conversion table for " + elt.id + " with cvalue=" + value;
		}
		const nodes = elt.parentNode.parentNode.parentNode.querySelectorAll("[id^=" + cvtable + "]");
		// check if there is a minimu value associated with the base element
		let cvdata = cvdatas.get(elt.id);
		if (cvdata === undefined) {
			throw "cvGas.could not find the entry corresponding to " + elt.id;
		}
		// if there is a min value define, we adjust cur_val as needed
		if (cvdata.min !== null) {
			if (cur_val < cvdata.min) {
				cur_val = cvdata.min;
			}
		}
		// cval will be the base conversion factor for the other related elements
		const cval = cur_val * cvdata.cv;
		elt.textContent = utils.format(cvdata.format, cur_val);
		// tre=true if temperature
		const tre = (cvtable === 't_');
		// iterate the related elements of the table and update them from the new value of the base element
		nodes.forEach(function (elt_target) {
			cvdata = cvdatas.get(elt_target.id);
			if (cvdata !== undefined) {
				let targetval = cval / cvdata.cv;
				if (tre) {
					// if we convert Tre, there is an additional offset to add, defined in the temp_temp matrix
					try {
						const tt = temp_temp.get(elt_target.id);
						let ttoffset;
						if ((tt === undefined) || (ttoffset = tt.get(elt.id)) === undefined) {
							throw "cvGas.could not find tre offset for " + elt_target.id + " - " + elt.id;
						}
						targetval += ttoffset;
					}
					catch (error) {
						console.error(error);
						rv = false;
					}
				}
				elt_target.textContent = utils.format(cvdata.format, targetval);
			}
			else {
				console.error("cvGas.could not find the entry corresponding to", elt_target.id, elt_target);
				rv = false;
			}
		});
		return rv;
	}
	catch (error) {
		console.error(error);
		return false;
	}
}
function getDescription(idc) {
	const cvdatas = all_cvdatas.get(idc.substr(0, 2));
	if (cvdatas !== undefined) {
		const cvdata = cvdatas.get(idc);
		if (cvdata !== undefined) {
			return cvdata.txt;
		}
		else {
			console.error("uct.getDesc could not find entry for", idc);
		}
	}
	else {
		console.error("uct.getDesc could not find cv table for", idc);
	}
	return "";
}
