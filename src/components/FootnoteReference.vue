<template>
  <a
    :id="`footnote-ref-${number}`"
    class="footnote-reference"
    :aria-label="`[${number}], jump to footnote`"
    href="#"
    @click.prevent="scrollTo()"
    @keydown.enter.prevent="scrollTo()"
    @focusout="removeHighlight()"
    >[{{ number }}]</a
  >
</template>

<script>
import $ from "jquery";

export default {
  name: "FootnoteReference",
  data() {
    return { number: null };
  },
  mounted() {
    this.$nextTick(() => {
      let start = this.$parent.$data.footnoteStart || 1;
      let parentReferences = this.$parent.$children.filter((d) =>
        d.$vnode.tag.endsWith("FootnoteReference")
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
      let el = `#footnote-${this.number}`;

      // Highlight it
      let f = $(el);
      f.css("background", "#fde68a");

      // Scroll
      this.$scrollTo(el, 500, { cancelable: false });
    },
    removeHighlight() {
      // Element id
      let el = `#footnote-${this.number}`;

      // Set background to transparent
      let f = $(el);
      f.css("background", "transparent");
    },
  },
};
</script>

<style>
/**
 * Inline footnotes references
 * 1. Increment the counter at each new reference
 * 2. Reset link styles to make it appear like regular text
 */
a.footnote-reference {
  text-decoration: none;
  vertical-align: super;
  font-size: 0.8rem;
  margin-left: 2px;
  color: #2176d2;
  cursor: pointer;
}

.footnote-reference:hover {
  text-decoration: none !important;
}

.footnote-reference:hover {
  color: #0f4d90 !important;
}
</style>
