<template>
  <div id="pagination">
    <span>Go to page: </span>
    <a
      v-for="p in pages"
      :key="p"
      :href="'#' + (p - 1)"
      :class="p === (page + 1) ? 'current' : ''"
    >{{p}}</a>
  </div>
</template>

<script>
export default {
  props: ['page', 'pages']
}
</script>

<style scoped>
#pagination {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
#pagination a {
  margin-left: 1em;
}
#pagination a.current {
  font-weight: bold;
}
</style>
