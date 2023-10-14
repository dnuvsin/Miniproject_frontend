<template>
  <v-container class="d-flex align-center justify-center" fluid>
    <v-col>
      <v-carousel class="header">
        <v-carousel-item
          v-for="(imageUrl, i) in roomDetailImageUrls"
          :key="i"
          :src="imageUrl"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col>
      <v-row>
        <h1>{{ roomDetail.roomName }}</h1>
      </v-row>
      <v-row>
        <h3>{{ roomDetail.price }} บาทต่อคืน</h3>
      </v-row>
      <v-row>
        <p>{{ roomDetail.roomDetail }}</p>
      </v-row>
      <v-row>
        <v-btn color="primary" elevation="2" @click="navigateToReserveRoom">จอง</v-btn>
        <v-btn to="/contact" style="margin-left: 8px;" outlined plain text color="secondary">สอบถามเพิ่มเติม</v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RoomDetail',
  data: () => ({
    loading: true,
    roomDetail: {
      roomName: '',
      price: '',
      roomDetail: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      imageUrl4: ''
    }
  }),

  computed: {
    roomDetailImageUrls () {
      return [
        this.roomDetail.imageUrl1,
        this.roomDetail.imageUrl2,
        this.roomDetail.imageUrl3,
        this.roomDetail.imageUrl4
      ].filter(url => url) // Filter out any empty URLs
    }
  },

  created () {
    this.fetchRoomDetail()
  },

  methods: {
    fetchRoomDetail () {
      const roomId = this.$route.params.room_id
      axios.get(`http://localhost:9000/room/${roomId}`)
        .then((response) => {
          this.roomDetail = response.data
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching room detail:', error)
          this.loading = false
        })
    },
    navigateToReserveRoom () {
      // Get the roomId from the route parameters
      const roomId = this.$route.params.room_id

      // Navigate to the ReserveRoom component with the roomId
      this.$router.push({
        name: 'ReserveRoom', // Replace with the name of your ReserveRoom route
        params: { roomId }
      })
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: center;
  height: 100vh;
}

.header {
  height: 400px;
  width: 600px;
  border: 5px solid;
}

.title {
  margin-top: 16px;
}
</style>
