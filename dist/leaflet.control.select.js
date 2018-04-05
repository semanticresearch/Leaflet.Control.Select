/*
  leaflet control list plugin
  https://github.com/adammertel/Leaflet.Control.List
  Adam Mertel | univie
*/
'use strict';L.Control.Select=L.Control.extend({options:{position:'topright',iconMain:'fa-home',iconChecked:'fa-circle',iconUnchecked:'fa-circle-o',iconGroupChecked:'fa-caret-right',iconGroupUnchecked:'fa-angle-right',multi:false,items:[],// {value: 'String', 'label': 'String', items?: [items]}
id:'',selectedDefault:false,additionalClass:'',onOpen:function a(){},onClose:function a(){},onGroupOpen:function a(b){},onSelect:function a(b){}},_emit:function a(b,c){var d={};switch(b){case'ITEM_SELECT':if(this.options.multi){d['selected']=this.state.selected.slice();if(this.state.selected.includes(c.item.value)){d['selected']=d['selected'].filter(function(a){return a!==c.item.value})}else{d['selected'].push(c.item.value)}}else{d['selected']=c.item.value}d['open']=c.item.parent;break;case'GROUP_OPEN':d['open']=c.item.value;break;case'GROUP_CLOSE':d['open']=c.item.parent;break;case'MENU_OPEN':d['open']='top';break;case'MENU_CLOSE':d['open']=false;break;}this._setState(d);this.render()},_setState:function a(b){// events
if(this.options.onSelect&&b.selected&&(this.options.multi&&b.selected.length!==this.state.selected.length||!this.options.multi&&b.selected!==this.state.selected)){this.options.onSelect(b.selected)}if(this.options.onGroupOpen&&b.open&&b.open!==this.state.open){this.options.onGroupOpen(b.open)}if(this.options.onOpen&&b.open==='top'){this.options.onOpen()}if(this.options.onClose&&!b.open){this.options.onClose()}this.state=Object.assign(this.state,b)},_isGroup:function a(b){return'items'in b},_isSelected:function a(b){var c=this.state.selected;if(c){if(this._isGroup(b)){if('children'in b){return this.options.multi?c.find(function(a){return b.children.includes(a)}):b.children.includes(c)}else{return false}}return this.options.multi?c.indexOf(b.value)>-1:c===b.value}else{return false}},_isOpen:function a(b){var c=this.state.open;return c&&(c===b.value||b.children.includes(c))},_hideMenu:function a(){this._emit('MENU_CLOSE',{})},_iconClicked:function a(){this._emit('MENU_OPEN',{})},_itemClicked:function a(b){if(this._isGroup(b)){if(this.state.open===b.value){this._emit('GROUP_CLOSE',{item:b})}else{this._emit('GROUP_OPEN',{item:b})}}else{this._emit('ITEM_SELECT',{item:b})}},initialize:function a(b){var c=this;this.menus=[];L.Util.setOptions(this,b);var d=this.options;if(d.multi){d.iconChecked='fa-check-square-o';d.iconUnchecked='fa-square-o'}if(d.multi){d.selectedDefault=d.selectedDefault instanceof Array?d.selectedDefault:[]}this.state={selected:d.selectedDefault,// false || {value}multi
open:false// false || 'top' || {value}
};// assigning parents to items
var e=function a(b){if(c._isGroup(b)){b.items.map(function(c){c.parent=b.value;a(c)})}};this.options.items.map(function(a){a.parent='top';e(a)});// assigning children to items
var f=function a(b){var d=[];if(c._isGroup(b)){b.items.map(function(b){d.push(b.value);d=d.concat(a(b))})}return d};var g=function a(b){b.children=f(b);if(c._isGroup(b)){b.items.map(function(b){a(b)})}};this.options.items.map(function(a){g(a)})},onAdd:function a(b){this.map=b;var c=this.options;this.container=L.DomUtil.create('div','leaflet-control leaflet-bar leaflet-control-select');this.container.setAttribute('id',this.options.id);var d=L.DomUtil.create('a',c.iconMain+' leaflet-control-button ',this.container);b.on('click',this._hideMenu,this);L.DomEvent.on(d,'click',L.DomEvent.stop);L.DomEvent.on(d,'click',this._iconClicked,this);L.DomEvent.disableClickPropagation(this.container);L.DomEvent.disableScrollPropagation(this.container);this.render();return this.container},_renderRadioIcon:function a(b,c){L.DomUtil.create('i','fa '+(b?this.options.iconChecked:this.options.iconUnchecked),c)},_renderGroupIcon:function a(b,c){L.DomUtil.create('i','fa '+(b?this.options.iconGroupChecked:this.options.iconGroupUnchecked),c)},_renderItem:function a(b,c){var d=this;var e=this._isSelected(b);var f=L.DomUtil.create('div','leaflet-control-select-menu-line',c);var g=L.DomUtil.create('div','leaflet-control-select-menu-line-content',f);var h=L.DomUtil.create('span','',g);h.innerHTML=b.label;if(this._isGroup(b)){this._renderGroupIcon(e,g);if(this._isOpen(b)){this._renderMenu(f,b.items)}}else{this._renderRadioIcon(e,g)}L.DomEvent.addListener(g,'click',function(a){d._itemClicked(b)});return f},_renderMenu:function a(b,c){var d=this;var e=L.DomUtil.create('div','leaflet-control-select-menu leaflet-bar ',b);this.menus.push(e);c.map(function(a){d._renderItem(a,e)})},_clearMenus:function a(){this.menus.map(function(a){return a.remove()});this.meus=[]},render:function a(){this._clearMenus();this.state.open?this._renderMenu(this.container,this.options.items):false}});L.control.select=function(a){return new L.Control.Select(a)};
