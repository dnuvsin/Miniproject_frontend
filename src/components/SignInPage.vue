<template>
  <v-app>
    <v-img
      class="background-image"
      src="https://cdn.getyourguide.com/img/tour/61c047a366e8f.jpeg/145.jpg"
    ></v-img>
    <v-main>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="8"
            md="5"
            class="mx-auto"
          >
            <v-card elevation="6">
              <v-card-title class="text-center">
                <v-avatar size="48" color="secondary">
                  <v-icon>mdi-lock-outline</v-icon>
                </v-avatar>
                <span class="headline">เข้าสู่ระบบ</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="userLogin">
                   <v-text-field
                    v-model="formData.userEmail"
                    label="Email Address"
                    required
                    autocomplete="email"
                    autofocus
                  ></v-text-field>
                  <v-text-field
                    v-model="formData.userPassword"
                    label="Password"
                    type="password"
                    required
                    autocomplete="current-password"
                  ></v-text-field>
                  <v-row justify="center">
                  <v-btn
                    type="submit"
                    color="primary"
                    class="mt-3"
                  >
                    ลงชื่อเข้าใช้
                  </v-btn>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn text to="/signup">คุณมีผู้ใช้หรือยัง? ลงทะเบียน</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignInPage',
  data () {
    return {
      formData: {
        userEmail: '',
        userPassword: ''
      }
    }
  },
  methods: {
    async userLogin () {
      try {
        const response = await axios.post(
          'http://localhost:9000/testLogin',
          {
            userEmail: this.formData.userEmail,
            userPassword: this.formData.userPassword
          }
        )

        if (response.status === 200) {
          // Login successful
          localStorage.setItem('auth', JSON.stringify(response.data))
          const auth = JSON.parse(localStorage.getItem('auth'))
          console.log(auth)

          this.$router.push({ path: '/' }).then(() => {
            window.location.reload()
          })
          console.log('Login successful')
        } else {
          // Handle other response statuses (e.g., 401 for unauthorized)
          console.log('Login failed')
        }
      } catch (error) {
        // Handle any network or server errors
        console.error('Error:', error.message)
      }
    }
  }
}
</script>

<style>
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* Place it behind other content */
  object-fit: cover; /* Cover the entire screen */
}
</style>
