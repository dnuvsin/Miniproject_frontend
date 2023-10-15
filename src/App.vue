<template>
<v-app>
    <v-app-bar absolute src="https://cdn.getyourguide.com/img/tour/61c047a366e8f.jpeg/145.jpg" fade-img-on-scroll color="#8f3452" dark shrink-on-scroll prominent scroll-target="#scrolling-techniques">
        <template v-slot:img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(137, 42, 74,.5), rgba(148, 61, 90,.5)"></v-img>
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
      <v-footer
      fixed
      dark
      padless
      style="margin-top: 40px;"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="title" style="background-color: #CB7C2C;">
        <strong class="subheading">ชมรีวิวเพิ่มเพิ่มได้ที่ ช่างทางต่าง ๆ ของเรา 😍</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Krabi Paradise Hotel</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    icons: [
      'mdi-account',
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram'
    ],
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
