<template>
  <div id="app">
    <div id="header">
      <img src="./assets/Octocat.jpg">
      <div>
        <h1>100 most popular js repos on Github</h1>
      </div>
    </div>
    <div id="loading" v-if="repos.length === 0">{{message}}</div>

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
      message: 'Loading, please wait...',
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
    }).catch(err => {
      this.message = `Klarte ikke hente repoer fra Github, feilet med: "${err.message}"`
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
body {
  background-color:aliceblue;
}
#app {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
}
#header {
  min-height: 8em;
}
#header img {
  height: 8em;
  vertical-align: middle;
}
#header > div {
  display: inline-block;
  padding: 0.5em;
}
</style>
