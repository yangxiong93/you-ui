var utils = require('../wxs/utils.js');

function iconStyle(checkedColor, value, disabled, parentDisabled, iconSize) {
  var styles = [['font-size', utils.addUnit(iconSize)]];
  if (checkedColor && value && !disabled && !parentDisabled) {
    styles.push(['border-color', checkedColor]);
    styles.push(['background-color', checkedColor]);
  }

  return styles
    .map(function(item) {
      return item.join(':');
    })
    .join(';');
}

module.exports = {
  iconStyle: iconStyle
};