<template>
  <div id="app">
    <div id="header">
      <img src="./assets/Octocat.jpg">
      <h1>100 most popular js repos on Github</h1>
    </div>
    <div id="loading" v-if="repos.length === 0">Loading, please wait...</div>

    <div v-if="repos.length">
      <Pagination :page="page" :pages="pages" />
      <RepoTable :repos="pageRepos" :headers="headers" @sort="sort" />
      <Pagination :page="page" :pages="pages" />
    </div>
  </div>
</template>

<script>
import githubMostPopular from './github-most-popular.js'
import currentPage from './current-page.js'
import Pagination from './components/Pagination.vue'
import RepoTable from './components/RepoTable.vue'

export default {
  name: 'app',
  components: {
    Pagination,
    RepoTable
  },
  data () {
    return {
      repos: [],
      page: currentPage(),
      pageSize: 20,
      pages: 0,
      headers: {
        name: {
          pretty: 'Name',
          desc: false
        },
        stargazers_count: {
          pretty: 'Stars',
          desc: false
        },
        forks: {
          pretty: 'Forks',
          desc: true
        },
        open_issues_count: {
          pretty: 'Open issues',
          desc: true
        }
      }
    }
  },
  created () {
    githubMostPopular().then(res => {
      this.repos = res
      this.pages = Math.floor(res.length / this.pageSize)
    })

    window.onhashchange = () => {
      this.page = currentPage()
    }
  },
  computed: {
    pageRepos () {
      let start = this.page * this.pageSize
      let end = start + this.pageSize

      return this.repos.filter((_, i) => i >= start && i < end)
    }
  },
  methods: {
    sort (key) {
      let desc = this.headers[key].desc
      this.headers[key].desc = !desc

      this.repos = this.repos.sort((a, b) => {
        if (desc) {
          let temp = b
          b = a
          a = temp
        }

        if (typeof a[key] === 'number') {
          return a[key] - b[key]
        }

        if (typeof a[key] !== 'string') {
          return 0  // we only sort number and strings
        }

        a = a[key].toLowerCase() || ''
        b = b[key].toLowerCase() || ''
        if (a > b) {
          return 1
        }
        if (a < b) {
          return -1
        }
        return 0
      })
    }
  }
}
</script>

<!-- style is not scoped to apply to whole app -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#header {
  min-height: 8em;
}
#header img {
  height: 8em;
  vertical-align: middle;
}
#header h1 {
  display: inline;
}
</style>
