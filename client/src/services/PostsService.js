import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('instruments')
  },

  addPost (params) {
    return Api().post('add_post', params)
  },

  updatePost (params) {
    // console.log('update post: ', params)
    return Api().put('instruments/' + params.id, params)
  },

  getPost (params) {
    return new Promise((resolve) => {
      Api().get('instruments/' + params.id).then(response => {
        // console.log('before capital', response)
        response.data.status = (response.data.status).substring(0, 1).toUpperCase() + (response.data.status).substring(1)
        // console.log('after capital', response)
        resolve(response)
      }, error => {
        console.log('error callback', error)
        resolve(error)
      })
    })
  },

  deletePost (id) {
    return Api().delete('instruments/' + id)
  },

  filterPosts (tag) {
    return Api().get('instruments/tag/' + tag)
  },

  searchPosts (query) {
    return Api().get('instruments/search/' + query)
  },

  fetchTags () {
    return Api().get('tags')
  },

  addTag (params) {
    return Api().post('tags', params)
  }
}
