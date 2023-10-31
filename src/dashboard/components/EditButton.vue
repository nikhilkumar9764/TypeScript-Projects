<script>
export default {
  name: 'EditButton',
  props: {},
  components: {},
  data () {
    return {
    }
  },
  methods: {},
  watch: {},
  mounted () {},
  computed () {}
}
</script>

<template>
  <button v-on:click="$emit('edit', row)">Edit</button>
</template>
