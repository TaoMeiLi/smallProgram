exports.setNavColor = (navTextColor, navBgColor) =>{
  try {
    wx.setNavigationBarColor({
      frontColor: navTextColor,
      backgroundColor: navBgColor,
    });
  } catch(e) {
    console.log(e,"setNavColor");
  }
}