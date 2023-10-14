<template>
<v-app>
    <v-main>
        <v-container class="mt-13">
            <v-row justify="center">
                <v-avatar class="m-1" color="secondary">
                  <v-icon>mdi-lock-outline</v-icon>
                </v-avatar>
                  <v-typography variant="h5">Sign up</v-typography>
                </v-row>
            <v-form @submit.prevent="handleSubmit" class="mt-3">
                <v-row justify="center">
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="formData.userName" label="Name" required autofocus></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field v-model="formData.userPhone" label="Phone Number" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="formData.userEmail" label="Email Address" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="formData.userPassword" label="Password" type="password" required></v-text-field>
                    </v-col>
                </v-row>

                  <v-row justify="center">
                    <v-btn type="submit" color="primary" class="mt-3 text-center" justify="center">
                    Sign Up
                </v-btn>
                  </v-row>
                    <v-row justify="center">
                        <v-link href="/signin" class="body-2">
                            Already have an account? Sign in
                        </v-link>
                    </v-row>

            </v-form>
        </v-container>
    </v-main>
</v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignupPage',
  data () {
    return {
      formData: {
        userName: '',
        userPhone: '',
        userEmail: '',
        userPassword: ''
      }
    }
  },
  methods: {
    async handleSubmit () {
      try {
        // Define the data to be sent in the POST request
        const postData = {
          userName: this.formData.userName,
          userPhone: this.formData.userPhone,
          userEmail: this.formData.userEmail,
          userPassword: this.formData.userPassword
        }

        // Make a POST request using Axios
        const response = await axios.post('http://localhost:9000/addUser', postData)

        // Handle the response here (e.g., show a success message)
        console.log('Response:', response.data)

        // Clear the form data or perform any other actions as needed
        this.formData = {
          userName: '',
          userPhone: '',
          userEmail: '',
          userPassword: ''
        }

        // Optionally, you can redirect the user to another page upon successful submission
        // For example, you can use Vue Router to navigate to a different route.
        // this.$router.push('/success');
        window.alert('Registration successful!')
        this.$router.push('/signin')
      } catch (error) {
        // Handle any errors that occurred during the POST request (e.g., show an error message)
        console.error('Error:', error)
        window.alert('Registration not successful!')
      }
    }
  }
}
</script>

<style>
.mt-13 {
    margin-top: 13vh;
}
</style>
