<template>
  <div>
    <h1>Welcome to Krabi Paradise Hotel</h1>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in randomItems"
          :key="index"
          cols="12" sm="6" md="4"
        >
          <v-card
            :loading="loading"
            min-height="363px"
            min-width="314px"
            class="d-flex flex-column"
          >
            <v-img
              :src="item.imageUrl1"
              :alt="item.roomName"
              class="mb-2"
            ></v-img>
            <v-card-title>{{ item.roomName }}</v-card-title>
            <v-btn class="mt-auto white--text" color="#7D1538" @click="seeDetails(item)">
              ดูเพิ่มเติม
            </v-btn>
          </v-card>
        </v-col>
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
    items: [],
    randomItems: [] // Store randomly selected items
  }),
  created () {
    // Fetch room data when the component is created
    this.fetchRooms()
  },
  methods: {
    fetchRooms () {
      axios.get('http://localhost:9000/room')
        .then((response) => {
          this.items = response.data
          this.randomItems = this.getRandomItems(this.items, 3) // Get 3 random items
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching room data:', error)
          this.loading = false
        })
    },
    seeDetails (item) {
      this.$router.push({ path: `/rooms/${item.roomId}` })
    },
    getRandomItems (items, count) {
      if (count >= items.length) {
        return items // Return all items if count is greater than or equal to the total count
      }
      const shuffled = items.slice() // Create a copy of the items array
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] // Shuffle the array
      }
      return shuffled.slice(0, count) // Return the first 'count' items
    }
  }
}
</script>
