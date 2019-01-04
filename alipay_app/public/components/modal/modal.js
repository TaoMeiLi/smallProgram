Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    this.getPage();
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    _closeModalEvent() {
      this.props.onCloseModalEvent();
    },
    getPage() {
      var query = my.createSelectorQuery()
      query.select('.container').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function(res) {
        let page = res.filter(item => item)[0]
        page.class = "noscroll";
      })
    }
  },
});
