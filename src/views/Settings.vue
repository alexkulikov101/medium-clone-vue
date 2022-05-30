<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <McvValidationErrors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="URL of profile image"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="New password"
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting"
              >
                Update settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout" type="button">
            Or click here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

import McvValidationErrors from '@/components/ValidationErrors.vue'
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
  actionTypes,
} from '@/store/modules/auth'

export default {
  name: 'McvSettings',
  components: {
    McvValidationErrors,
  },

  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    form() {
      if (this.currentUser) {
        return {
          username: this.currentUser.username,
          bio: this.currentUser.bio,
          image: this.currentUser.image,
          email: this.currentUser.email,
          password: '',
        }
      }

      return {
        username: '',
        bio: '',
        image: '',
        email: '',
        password: '',
      }
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: this.form,
      })
    },
    logout() {
      this.$store.dispatch(actionTypes.logout).then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    },
  },
}
</script>
