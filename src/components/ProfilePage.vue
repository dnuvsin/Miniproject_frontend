<template>
  <div>
    <h1>Profile Page</h1>
    <div v-if="user">
      <p><strong>User Name:</strong> {{ user.userName }}</p>
      <p><strong>User Email:</strong> {{ user.userEmail }}</p>
      <p><strong>User Phone:</strong> {{ user.userPhone }}</p>
    </div>
    <button outline @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: null
    }
  },
  created () {
    // Load user data from localStorage
    const authData = localStorage.getItem('auth')
    if (authData) {
      this.user = JSON.parse(authData)
    }
  },
  methods: {
    logout () {
      // Clear user data from localStorage and navigate to the login page
      localStorage.removeItem('auth')
      this.$router.push({ path: '/signin' }).then(() => {
        window.location.reload()
      })
    }
  }
}
</script>
