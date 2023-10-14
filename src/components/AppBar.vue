<template>
<v-app-bar
  elevation="4"
  src="https://picsum.photos/1920/1080?random"
  prominent
>
 <v-app-bar-title>ระบบจองโรงแรม</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>{{ icons.mdiAccount }}</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab :to="{ name: 'Home' }">หน้าแรก</v-tab>
          <v-tab :to="{ name: 'AllRooms' }">ห้องทั้งหมด</v-tab>
          <v-tab :to="{ name: 'About' }">เกี่ยวกับ</v-tab>
        </v-tabs>
      </template>
</v-app-bar>
</template>

<script>
import { mdiAccount } from '@mdi/js'

export default {
  name: 'AppBar',

  data: () => ({
    icons: {
      mdiAccount
    }
  }),

  components: {

  }
}
</script>

<style scoped>
.pageData {
  min-height: calc(100vh - 64px);
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 40px;
  margin-top: 250px;
}
</style>
