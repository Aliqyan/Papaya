<template>
  <div class="posts">
    <img src="../assets/papayaicon.png" @click="isCardModalActive = true" width="150"/>
      <!-- Modal that activates when Papaya logo is pressed that acts as a tutorial for using the site -->
      <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Using Papaya</p>
                </header>
              <section class="modal-card-body">
                <p class="title is-3">Thank you for choosing Papaya!</p>
                <p class="subtitle is-5">Here's a brief introduction to using the web app</p>

                <h5 class="subtitle is-5">Filtering and Sorting:</h5>
                <div class="has-text-left">
                  <p class="subtitle is-5">There are multiple ways of filtering using Papaya:</p>
                  <ul>
                    <li>* You can use the default tag checkboxes on the side to only return instruments with that tag. NOTE: If you check off multiple boxes it will only return instruments that contain both those tags!</li>
                    <br>
                    <li>* If you wish to search using user-created tags or search using any of the other fields, you can use the search bar.</li>
                    <br>
                    <li>* You can also use these two features in conjunction by first filtering using the checkbox and then searching.</li>
                    <br>
                    <li>* To clear filters simply deselect all the checkboxes and press filter again or clear the search bar and press search.</li>
                  </ul>
                  <br>
                  <p>You can sort the table by pressing on the table headings. This will sort the table in either ascending alphabetical order or descending alphabetical order.</p>
                  <br>
                </div>
                  <h5 class="subtitle is-5">Editing:</h5>
                <div class="has-text-left">
                  <p>Luckily, our entry editing is intuitive. Simply remember that some of the fields cannot be empty as you'll see by the disabled update button. To exit the edit entry page you can press on the Papaya logo or the back arrow.</p>
                </div>
                <br>
                <div class="has-text-left">
                  <p>** Remember to refresh the page after new entries have been added via the app! **</p>
                </div>
              </section>
            </div>
          </div>
        </b-modal>

    <h1 class="logoTitle">Papaya</h1>
    <b-tabs position="is-left" class="block">
      <b-tab-item label="Instrument">
        <div class="columns is-multiline">

        <div class="column is-one-quarter">
          <!-- empty bulma columns used for formatting (separates the page into a grid) -->
        </div>

        <div class="column is-one-quarter">
        </div>
        <!-- pagination option select -->
        <div class="column is-one-quarter">
          <b-select v-model="perPage" :disabled="!isPaginated">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </b-select>
        </div>
        <!-- search bar -->
        <div class="column is-one-quarter">
          <b-field>
            <b-input icon="magnify" name="searchInput" type="search" placeholder="Search..." v-model="searchInput"></b-input>
            <button class="button is-primary" @click="searchPosts">Search</button>
          </b-field>
        </div>
        <!-- checkbox filter table -->
        <div class="column is-one-fifth has-text-left">
          <aside class="menu">
            <p class="menu-label">
              Default Tags
            </p>
            <ul class="menu-list">
              <li>
                <b-checkbox v-model="checkboxGroup"
                  native-value="woodwinds">
                  Woodwinds
                </b-checkbox>
              </li>
              <li>
                <b-checkbox v-model="checkboxGroup"
                  native-value="brass">
                  Brass
                </b-checkbox>
              </li>
              <li>
                <b-checkbox v-model="checkboxGroup"
                  native-value="percussion">
                  Percussion
                </b-checkbox>
              </li>
              <li>
                <b-checkbox v-model="checkboxGroup"
                  native-value="strings">
                  Strings
                </b-checkbox>
              </li>
              <!-- <li>
                <p class="content">
                  <b>Selection:</b>
                    {{ checkboxGroup }}
                </p>
              </li> -->
            </ul>
            <!-- <p class="menu-label">
              Drums
            </p>
            <ul class="menu-list">
              <li><a>Dashboard</a></li>
              <li><a>Customers</a></li>
            </ul>
            <p class="menu-label">
              Guitars
            </p>
            <ul class="menu-list">
              <li><a>Dashboard</a></li>
              <li><a>Customers</a></li>
            </ul> -->
          </aside>
          <div>
            <a class="button is-link" @click="filterPosts">Filter</a>
          </div>
        </div>
        <!-- data table -->
        <div class="column is-four-fifths">
            <b-table :data="isEmpty ? [] : posts"
            :paginated="isPaginated"
            :per-page="perPage"
            :striped="true"
            :loading="isLoading">
              <template slot-scope="post">
                <b-table-column field="instrument" label="Instrument" width="150" sortable>
                  {{ post.row.instrument }}
                </b-table-column>
                <b-table-column field="status" label="Status" width="100" align="center" sortable>
                  {{ post.row.status }}
                </b-table-column>

                <b-table-column field="loanee" label="Loanee" width="150" sortable>
                  {{ post.row.loanee }}
                </b-table-column>

                <b-table-column field="serial" label="Serial Number" width="150" sortable>
                  {{ post.row.serial }}
                </b-table-column>

                <b-table-column field="action" label="Action" width="150">
                    <router-link v-bind:to="{ name: 'EditInstrument', params: { id: post.row._id } }">Edit</router-link> |
                    <a href="#" @click="deletePost(post.row._id)">Delete</a>
                </b-table-column>
              </template>
              <!-- template is used when table is empty -->
              <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
            </b-table>
          </div>
        </div>
      </b-tab-item>

    <!-- <b-tab-item label="Sheet Music">

      <input type="text" v-model="search" @blur="filteredPosts2()" placeholder="Search...">
      <b-table :data="posts">
        <template scope="post">
          <b-table-column field="title " label="Title" width="150" sortable>
                {{ post.row.title }}
            </b-table-column>
              <b-table-column field="composer" label="Composer" width="150" align="center" sortable>
                {{ post.row.composer }}
            </b-table-column>

              <b-table-column field="level" label="Level" width="150" sortable>
                {{ post.row.level }}
            </b-table-column>

            <b-table-column field="publisher" label="Publisher" width="150" sortable>
                {{ post.row.publisher }}
            </b-table-column>

            <b-table-column field="action" label="Action" width="150">
                <router-link v-bind:to="{ name: 'EditSheet', params: { id: post.row._id } }">Edit</router-link> |
                <a href="#" @click="deletePost(post.row._id)">Delete</a>
            </b-table-column>
          </template>
        </b-table>
      </b-tab-item> -->
    </b-tabs>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'

export default {
  name: 'posts',
  data () {
    return {
      posts: [{
        instrument: '',
        loanee: '',
        status: '',
        serial: '',
        qrID: '',
        tags: [],
        _id: '0'
      }],
      search: '',
      searchInput: '',
      data: [],
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      checkboxGroup: [],
      isPaginated: true,
      perPage: 5,
      isCardModalActive: false
    }
  },
  mounted () {
    // gets the instruments upon loading in
    this.getPosts()
  },
  methods: {
    capitalize () {
      // by default all the fields in the database are lowercase so to display them in the table and have the first letter capitalized, they need to go through this method
      for (var i = 0; i < this.posts.length; i++) {
        // console.log(this.posts[i].qrID)
        this.posts[i].instrument = (this.posts[i].instrument).substring(0, 1).toUpperCase() + (this.posts[i].instrument).substring(1)
        this.posts[i].status = (this.posts[i].status).substring(0, 1).toUpperCase() + (this.posts[i].status).substring(1)
        this.posts[i].loanee = (this.posts[i].loanee).substring(0, 1).toUpperCase() + (this.posts[i].loanee).substring(1)
      }
    },
    // uses the loading template as the table receives an array of instruments to display from the database
    async getPosts () {
      this.isLoading = true
      const response = await PostsService.fetchPosts()
      this.posts = response.data.instruments
      console.log(this.posts)
      this.capitalize()
      this.isLoading = false
    },
    // filters the instruments based on a tag (tagToSend) and returns them for the table to display
    async filterPosts () {
      // console.log(this.checkboxGroup)
      if (this.checkboxGroup.length === 0) {
        this.getPosts()
      } else {
        var tagToSend = ''
        for (var i = 0; i < this.checkboxGroup.length - 1; i++) {
          tagToSend += this.checkboxGroup[i] + '+'
        }
        tagToSend += this.checkboxGroup[this.checkboxGroup.length - 1]

        // console.log(tagToSend)
        const response = await PostsService.filterPosts(tagToSend)
        this.posts = response.data
        this.capitalize()
      }
    },
    // similar to filterPosts, returns an array of instruments to display based on the param sent
    async searchPosts () {
      // console.log(this.searchInput.toLowerCase())
      if (this.searchInput.length === 0) {
        this.getPosts()
      } else {
        const response = await PostsService.searchPosts(this.searchInput.toLowerCase())
        this.posts = response.data
        this.capitalize()
      }
    },
    // pops up modal which asks the user whether or not they want to delete an entry; if they say yes, a command will be sent to the database to delete and entry and returns a new array without that entry to display to the table
    async deletePost (id) {
      const $this = this
      $this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(response => {
        console.log('success callback from modal', response)
        if (typeof response.dismiss === 'undefined') {
          this.stuff(id)
        }
      }, error => {
        console.log('error callback from modal', error)
      })
    },
    async stuff (id) {
      const response = await PostsService.deletePost(id)
      this.posts = response.data.instruments
      // console.log(this.posts)
      this.capitalize()
      this.$router.push({ name: 'table' })
    }
  }
}
</script>
<style type="text/css">
.logoTitle {
  font-size: 20px;
}
/* .table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  color: #fff;
  background-color: #4d7ef7;
} */
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
