<template>
  <div id="pagination">
    <a :href="'#' + (prevPage)">&lt;</a>
    <a
      v-for="p in pages"
      :key="p"
      :href="'#' + (p - 1)"
      :class="p === (page + 1) ? 'current' : ''"
    >{{p}}</a>
    <a :href="'#' + (nextPage) ">&gt;</a>
  </div>
</template>

<script>
export default {
  props: ['page', 'pages'],
  computed: {
    prevPage () {
      let page = this.page
      return page === 0 ? 0 : page - 1
    },
    nextPage () {
      let page = this.page
      return (page + 1) === this.pages ? page : page + 1
    }
  }
}
</script>

<style scoped>
#pagination {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
#pagination a {
  border-left: 1px solid;
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 0.5em;
  display: block;
  float: left;
  margin-bottom: 1em;
  text-decoration: none;
}
#pagination a:last-child {
  border-right: 1px solid;
}
#pagination a.current {
  font-weight: bold;
}
#pagination a:hover {
  transform: scale(1.05);
}
</style>
