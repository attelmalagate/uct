# uct
### Universal Conversion tool
UCT is based on the Simple Web Framework, swf also available on GitHub.

### User interface
No deviation from the user interface of the swf framework. UCT uses notably the editable table component developed espcially for this application: it avoids an additional form and allows for faster and easier data input.

The options for navigation are `hidden` and `home`, that is to say that the navigation panel on the left remains hidden and that the image in the left part of the header redirects to the home panel. 

### Conversion
Conversions are managed in the `uct-main` javascript module.

Each conversion table is represented by a `map` object, using a unique alphanumeric identifier to represent the nature of the values to convert, for example `f_o2_gapd` for an oxygen flow in gallons per day, `p_ar_mt` for the price of argon per metric ton or `pr_mbar` for a pressure in millibar. The unique identifier is associated with a `cvp` object, defined by:
- a conversion factor,
- a format (to represent the value),
- a description (used in the user interface) and
- an optional minimun value (for temperatures).

For a given conversion map, an identifier is chosen as the reference, with a conversion factor of 1 (one) and all the other conversion factors are calculated based on the reference. The unique id is also used in the corresponding html table to identify each cell to update through a `data-id` attribute of the corresponding `td` element.

The conversion itself takes place in the `cvGas` function, with a straightforward algorithm:
- for the cell being modified, a base conversion factor is calculated from the new value entered by the user and its conversion factor in the conversion map
- the base conversion factor is then used to update all the other cells in the table
- in the case of temperatures, a specific step is added to manage the offsets corresponding to the value 0 (zero)

### Dependencies
from swf
- swf-main.css
- swf-utils.js
- hal-9000-032.png

from Feather
- feather-sprite.svg

and JQuery 3.6 (most certainly works with older versions)
