<template>
  <div :id="`footnote-${number}`" class="d-flex">
    <div>
      <a
        class="ml-1"
        href="#"
        :aria-label="`[${number}], Back to footnote ${number} in the text`"
        @click.prevent="scrollTo()"
        @keydown.enter.prevent="scrollTo()"
        >[{{ number }}]</a
      >
    </div>
    <div class="ml-2" v-html="text"></div>
  </div>
</template>

<script>
export default {
  name: "Footnote",
  props: ["text"],
  data() {
    return { number: null };
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      let start = this.$parent.$data.footnoteStart || 1;
      let parentReferences = this.$parent.$children.filter((d) =>
        d.$vnode.tag.endsWith("Footnote")
      );

      for (let i = 0; i < parentReferences.length; i++) {
        if (parentReferences[i] == this) {
          this.number = start + i;
          break;
        }
      }
    });
  },

  methods: {
    scrollTo() {
      // Element id
      let el = `#footnote-ref-${this.number}`;

      // Scroll
      this.$scrollTo(el, 500, { cancelable: false });
    },
  },
};
</script>
