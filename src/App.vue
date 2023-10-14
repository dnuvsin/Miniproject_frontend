<template>
<v-app>
    <v-app-bar absolute src="https://cdn.getyourguide.com/img/tour/61c047a366e8f.jpeg/145.jpg" fade-img-on-scroll color="#6A76AB" dark shrink-on-scroll prominent scroll-target="#scrolling-techniques">
        <template v-slot:img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>
        <v-app-bar-title>Krabi Paradise Hotel</v-app-bar-title>

        <v-spacer></v-spacer>

        <!-- Conditionally render "Login" or "Profile" button based on isLoggingIn -->
        <v-btn v-if="!isLoggedIn" :to="{ name: 'SignInPage' }" elevation="2" outlined plain raised>
            Login
        </v-btn>
        <v-btn v-else :to="{ name: 'ProfilePage' }" elevation="2" outlined plain raised>
            Profile
        </v-btn>

        <template v-slot:extension>
            <v-tabs align-with-title>
                <v-tab :to="{ name: 'Home' }">หน้าแรก</v-tab>
                <v-tab :to="{ name: 'AllRooms' }">ห้องทั้งหมด</v-tab>
                <v-tab :to="{ name: 'About' }">เกี่ยวกับ</v-tab>
            </v-tabs>
        </template>
    </v-app-bar>
    <v-sheet id="scrolling-techniques" class="overflow-y-auto" max-height="100vh">
        <v-container style="min-height: calc(100vh - 64px); margin-top: 250px">
            <v-main>
                <router-view />
            </v-main>
        </v-container>
    </v-sheet>
</v-app>
</template>

<script>
import {
  mdiAccount
} from '@mdi/js'
export default {
  name: 'App',

  data: () => ({
    icons: {
      mdiAccount
    },
    isLoggedIn: false
  }),
  created () {
    // Check if 'auth' exists in localStorage when the component is created
    const authData = localStorage.getItem('auth')
    if (authData) {
      // User is logged in
      this.isLoggedIn = true
    }
  },
  components: {

  }
}

</script>

<style scoped>

</style>
