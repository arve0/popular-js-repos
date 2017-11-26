<template>
  <table>
    <tr>
      <th
        v-for="(header, key) in headers"
        :key="key"
        @click="$emit('sort', key)"
      >{{header.pretty}}</th>
    </tr>
    <tr v-for="repo in repos" :key="repo.name">
      <td v-for="(_, key) in headers" :key="key">{{repo[key]}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ['repos', 'headers']
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
td, th {
  padding: 0.5em;
  text-align: left;
}
th:hover {
  cursor: pointer;
  transform: translateY(-2px);
}
tr:nth-child(2n + 1) {
  background-color: lightblue;
}
</style>
