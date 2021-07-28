<template>
  <div id="chart" />
</template>

<script>
import c3 from 'c3/c3.min';

export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: '',
    };
  },
  methods: {
    create(options) {
      this.chart = c3.generate(options);
    },
  },
  created() {

  },
  mounted() {
    this.create(this.options);
  },
  watch: {
    options() {
      this.create(this.options);
    },
  },
};
</script>

<style lang="scss">
@import '~c3/c3.min';
</style>
