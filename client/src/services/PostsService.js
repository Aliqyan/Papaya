import Api from '@/services/Api'

export default {
  // Acts as a get, sends a command which returns an array of instruments in the database
  fetchPosts () {
    return Api().get('instruments')
  },
  // not in use, but would send a command to database to add an instrument with set params
  addPost (params) {
    return Api().post('add_post', params)
  },
  // sends the command of which entry to edit and what to change to the database
  updatePost (params) {
    // console.log('update post: ', params)
    return Api().put('instruments/' + params.id, params)
  },
  // makes a call to get a specific post, but before it fully processes the response, it edits the Promise to capitalize one of the entries so that it can be properly handled by the edit instrument page
  getPost (params) {
    return new Promise((resolve) => {
      Api().get('instruments/' + params.id).then(response => {
        // console.log('before capital', response)
        // capitalizes status because by default the fields are lowercase in the database
        response.data.status = (response.data.status).substring(0, 1).toUpperCase() + (response.data.status).substring(1)
        // console.log('after capital', response)
        resolve(response)
      }, error => {
        console.log('error callback', error)
        resolve(error)
      })
    })
  },
  // sends command to mongo of which post to delete
  deletePost (id) {
    return Api().delete('instruments/' + id)
  },
  // sends a command to return an array of instruments with a specific tag
  filterPosts (tag) {
    return Api().get('instruments/tag/' + tag)
  },
  // sends a command to return an array of instruments with a specific search query
  searchPosts (query) {
    return Api().get('instruments/search/' + query)
  },
  // sends a command to the database to return a list of all tags in the tag collection
  fetchTags () {
    return Api().get('tags')
  },
  // sends a command to the database to add a specific tag with set params
  addTag (params) {
    return Api().post('tags', params)
  }
}
