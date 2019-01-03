var scrollToTopSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" height="50" width="50"> <g> <path d="M250,225v10.29A14.74,14.74,0,0,1,235.26,250H14.42a14.75,14.75,0,0,1-13-8.34v0A14.77,14.77,0,0,1,0,235.26V224.91a12.43,12.43,0,0,0,7.82-1.55l24.67-15.6,31-19.58,22.69-14.35,8.25-5.22,23.33-14.75a15.57,15.57,0,0,1,15.25,0l23.32,14.75,31,19.57,30.94,19.58,24.69,15.6A12.22,12.22,0,0,0,250,225Z" style="fill: #f26b2f"/> <path d="M250,145.69v43l-.85-.53-31-19.57L187.25,149l-31-19.57L138.5,118.22l-6.88-4.36a12.79,12.79,0,0,0-12.54,0L94.39,129.47,63.45,149l-31,19.57L1.55,188.18l-1.55,1V145.63a12.44,12.44,0,0,0,7.82-1.56l24.67-15.6,31-19.58L94.39,89.33l23.33-14.76a15.54,15.54,0,0,1,15.25,0l23.32,14.75,5.9,3.73,25.06,15.83,30.94,19.58,24.69,15.6A12.23,12.23,0,0,0,250,145.69Z" style="fill: #f26b2f"/> <path d="M250,14.74v94.69l-.85-.54-31-19.56L187.25,69.75l-1.95-1.23-29-18.33L131.62,34.58a12.79,12.79,0,0,0-12.54,0L94.39,50.19,63.45,69.75l-31,19.58L1.55,108.89l-1.55,1V14.74A14.74,14.74,0,0,1,14.74,0H235.26A14.75,14.75,0,0,1,250,14.74Z" style="fill: #f26b2f"/> <path d="M86.14,173.83,14.42,250a14.75,14.75,0,0,1-13-8.34v0L0,234.2v-9.29a12.43,12.43,0,0,0,7.82-1.55l24.67-15.6,31-19.58Z" style="fill: #d25929"/> <path d="M156.29,89.33l5.9,3.73L138.5,118.22l-6.88-4.36a12.79,12.79,0,0,0-12.54,0L94.39,129.47,63.45,149l-31,19.57L1.55,188.18l-1.55,1V145.63a12.44,12.44,0,0,0,7.82-1.56l24.67-15.6,31-19.58L94.39,89.33l23.33-14.76a15.54,15.54,0,0,1,15.25,0Z" style="fill: #d25929"/> <path d="M245.72,4.36,185.3,68.52l-29-18.33L131.62,34.58a12.79,12.79,0,0,0-12.54,0L94.39,50.19,63.45,69.75l-31,19.58L1.55,108.89l-1.55,1V14.74A14.74,14.74,0,0,1,14.74,0H235.26A14.69,14.69,0,0,1,245.72,4.36Z" style="fill: #d25929"/> </g> </svg>';

var scrolltotop = {
  setting: {
    startline: 100,
    scrollto: 0,
    scrollduration: 1e3,
    fadeduration: [500, 100]
  },
  controlHTML: scrollToTopSVG,
  controlattrs: {
    offsetx: 40,
    offsety: 40
  },
  anchorkeyword: "#top",
  state: {
    isvisible: !1,
    shouldvisible: !1
  },
  scrollup: function() {
    this.cssfixedsupport || this.$control.css({
      opacity: 0
    });
    var t = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
    t = "string" == typeof t && 1 == jQuery("#" + t).length ? jQuery("#" + t).offset().top : 0, this.$body.animate({
      scrollTop: t
    }, this.setting.scrollduration)
  },
  keepfixed: function() {
    var t = jQuery(window),
      o = t.scrollLeft() + t.width() - this.$control.width() - this.controlattrs.offsetx,
      s = t.scrollTop() + t.height() - this.$control.height() - this.controlattrs.offsety;
    this.$control.css({
      left: o + "px",
      top: s + "px"
    })
  },
  togglecontrol: function() {
    var t = jQuery(window).scrollTop();
    this.cssfixedsupport || this.keepfixed(), this.state.shouldvisible = t >= this.setting.startline ? !0 : !1, this.state.shouldvisible && !this.state.isvisible ? (this.$control.stop().animate({
      opacity: 1
    }, this.setting.fadeduration[0]), this.state.isvisible = !0) : 0 == this.state.shouldvisible && this.state.isvisible && (this.$control.stop().animate({
      opacity: 0
    }, this.setting.fadeduration[1]), this.state.isvisible = !1)
  },
  init: function() {
    jQuery(document).ready(function(t) {
      var o = scrolltotop,
        s = document.all;
      o.cssfixedsupport = !s || s && "CSS1Compat" == document.compatMode && window.XMLHttpRequest, o.$body = t(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body"), o.$control = t('<div id="topcontrol">' + o.controlHTML + "</div>").css({
        position: o.cssfixedsupport ? "fixed" : "absolute",
        bottom: o.controlattrs.offsety,
        right: o.controlattrs.offsetx,
        opacity: 0,
        cursor: "pointer"
      }).attr({
        title: "Scroll to Top"
      }).click(function() {
        return o.scrollup(), !1
      }).appendTo("body"), document.all && !window.XMLHttpRequest && "" != o.$control.text() && o.$control.css({
        width: o.$control.width()
      }), o.togglecontrol(), t('a[href="' + o.anchorkeyword + '"]').click(function() {
        return o.scrollup(), !1
      }), t(window).bind("scroll resize", function(t) {
        o.togglecontrol()
      })
    })
  }
};

scrolltotop.init();
