<template>
  <div>
    <h1>Welcome to Krabi Paradise Hotel</h1>
<v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12" sm="6" md="4">
          <v-card
          :loading="loading"
            min-height="300px"
            min-width="300px"
            class="d-flex flex-column"
          >
            <v-img
              :src="item.imageUrl1"
              :alt="item.roomName"
              class="mb-2"
            ></v-img>
            <v-card-title>{{item.roomName}}</v-card-title>
            <v-btn class="mt-auto white--text" color="#7D1538" @click="seeDetails(index)">ดูเพิ่มเติม</v-btn>
          </v-card>
        </v-col>

        <!-- <v-col cols="12" sm="6" md="4">
          <v-card
            min-height="300px"
            min-width="300px"
            class="d-flex flex-column"
          >
            <v-img
              src="https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/room_listing/public/2020-09/CKBR_03-premium-deluxe-ocean-facing-07.jpg?itok=H8l-Y7rU"
              alt="พรีเมี่ยมดีลักซ์โอเชี่ยนเฟสซิง"
              class="mb-2"
            ></v-img>
            <v-card-title>พรีเมี่ยมดีลักซ์โอเชี่ยนเฟสซิง</v-card-title>
            <v-btn class="mt-auto white--text" color="#7D1538">ดูเพิ่มเติม</v-btn>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card
            min-height="300px"
            min-width="300px"
            class="d-flex flex-column"
          >
            <v-img
              src="https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/room_listing/public/2020-09/CKBR_09-royal-villa-09.jpg?itok=c4B4uzm2"
              alt="รอยัลวิลลา"
              class="mb-2"
            ></v-img>
            <v-card-title>รอยัลวิลลา</v-card-title>
            <v-btn class="mt-auto white--text" color="#7D1538">ดูเพิ่มเติม</v-btn>
          </v-card>
        </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HotelLandingPage',
  data: () => ({
    loading: true,
    items: []
  }),
  methods: {
    fetchRooms () {
      axios.get('http://localhost:9000/room')
        .then((response) => {
          this.items = response.data
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching room data:', error)
          this.loading = false
        })
    },
    seeDetails (index) {
      if (typeof index === 'number' && index >= 0 && index < this.items.length) {
        console.log('Viewing details of item at index:', index)
        this.$router.push({ path: `/rooms/${index}` })
      } else {
        console.error('Invalid index:', index)
      }
    }
  }
}
</script>
