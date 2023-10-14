<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="6"
      >
        <v-card
          :loading="loading"
          class="mx-auto my-4 d-flex flex-column"
          max-width="374"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            :src="item.imageUrl1"
          ></v-img>

          <v-card-title>{{ item.roomName }}</v-card-title>

          <v-card-text>
            <div>{{ item.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="seeDetails(index)"
            >
              See Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AllRooms',
  data: () => ({
    loading: true,
    items: []
  }),

  created () {
    this.fetchRooms()
  },

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
