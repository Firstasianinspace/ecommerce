<script>
export default {
  name: 'ClickOutside',
  props: {
    selector: {
      type: String,
      required: false,
      default: null,
    },
  },
  emits: ['click'],
  mounted() {
    let traps = null;
    const onOutsideClick = (event) => {
      traps = traps || this.getTrapElements();
      const targetEl = event.target;
      if (!document.body.contains(targetEl)) return;
      for (let i = 0, len = traps.length; i < len; i += 1) {
        const single = traps[i];
        if (single.contains(targetEl)) {
          return;
        }
      }
      this.$emit('click', event);
    };
    setTimeout(() => document.addEventListener('click', onOutsideClick));
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('click', onOutsideClick);
    });
  },
  methods: {
    getTrapElements() {
      if (this.selector) {
        return Array.from(document.querySelectorAll(this.selector));
      }
      return [this.$parent.$el];
    },
  },
  render() {
    return null;
  },
};
</script>
