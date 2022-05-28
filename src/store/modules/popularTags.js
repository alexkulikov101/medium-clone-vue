import popularTagsApi from '@/api/popularTags'

const state = {
  tags: null,
  isLoading: false,
  error: null,
}

export const mutationTypes = {
  getPopularTagsStart: '[tags] getPopularTagsStart',
  getPopularTagsSuccess: '[tags] getPopularTagsSuccess',
  getPopularTagsFailure: '[tags] getPopularTagsFailure',
}

export const actionTypes = {
  getPopularTags: '[feed] getPopularTags',
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    state.tags = null
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.tags = payload
  },
  [mutationTypes.getPopularTagsFailure](state) {
    state.isLoading = false
  },
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getPopularTagsStart)

      popularTagsApi
        .getPopularTags()
        .then((response) => {
          context.commit(
            mutationTypes.getPopularTagsSuccess,
            response.data.tags
          )
          resolve(response.tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagsFailure)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
