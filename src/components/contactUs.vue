<template>
  <v-app>
    <v-main>
      <v-container class="text-center">
        <h1 style="padding-top: 16px;">ติดต่อสอบถาม</h1>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field v-model="name" label="ชื่อ" required autofocus></v-text-field>
          <v-text-field v-model="phone" label="เบอร์โทร" required></v-text-field>
          <v-text-field v-model="email" label="Email Address" required></v-text-field>
          <v-textarea v-model="message" label="เรื่องที่ต้องการติดต่อ" required rows="3"></v-textarea>
          <v-btn type="submit" color="primary" class="mt-4">Submit</v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      phone: '',
      email: '',
      message: ''
    }
  },
  created () {
    // Check if 'auth' exists in localStorage
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (auth) {
      // Use data from 'auth' to set default values
      this.name = auth.userName
      this.phone = auth.userPhone
      this.email = auth.userEmail
    }
  },
  methods: {
    handleSubmit () {
      if (this.validateForm()) {
        // You can use axios to make an HTTP POST request here
        console.log('Form submitted successfully')
        // After a successful submission, you can navigate to another route or reset the form fields as needed
        this.resetForm()
      }
    },
    validateForm () {
      // Add your custom form validation logic here
      if (!this.name || !this.phone || !this.email || !this.message) {
        alert('Please fill in all required fields.')
        return false
      }
      // You can add more advanced validation logic, such as email format, phone number format, etc.
      return true
    },
    resetForm () {
      this.name = ''
      this.phone = ''
      this.email = ''
      this.message = ''
    }
  }
}
</script>

<style>
/* Add your custom CSS styles here */
</style>
