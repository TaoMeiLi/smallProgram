var showprice = function (num, fix, any) {
  var v = parseFloat(num || 0) / 100;
  if (isNaN(v)) {
    // throw new Error(num + 'is not a number');
  }
  var val = v.toFixed(fix);
  if(any && any == 'any' && val.split('.')[1] == '00') {
    val = val.split('.')[0];
  }
  return val
};

var getParseInt = function(num) {
  var v = parseInt(num)/100;
  if(isNaN(v)) {
    // throw new Error(num + 'is not a number');
  }
  return parseInt(v);
}

export default {
  show: showprice,
  getParseInt,
};