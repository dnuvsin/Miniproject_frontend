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
            :src="item.imageUrl"
          ></v-img>

          <v-card-title>{{ item.title }}</v-card-title>

          <v-card-text>
            <div>{{ item.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="reserve(index)"
            >
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AllRooms',
  data: () => ({
    loading: false,
    items: [
      {
        imageUrl: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/room_listing/public/2020-09/CKBR_01-deluxe-garden-view-01.jpg?itok=Vfu01OFJ',
        title: 'ดีลักซ์การ์เด้นวิว',
        description: 'ห้องดีลักซ์นี้ตกแต่งในโทนสีไม้ธรรมชาติ แต่งเติมด้วยสิ่งทอหลากสีสันและตกแต่งแบบไทยสุดหรูหรา...'
      },
      {
        imageUrl: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/room_listing/public/2020-09/CKBR_02-deluxe-ocean-facing-01.jpg?itok=5i7WWyrd',
        title: 'ดีลักซ์โอเชี่ยนเฟสซิ่ง',
        description: 'ห้องดีลักซ์ขนาด 72 ตร.ม. นี้มีการผสมผสานระหว่างสีสันที่หรูหราและไม้ขัดเงาสีอบอุ่น...'
      },
      {
        imageUrl: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/room_listing/public/2020-09/CKBR_03-premium-deluxe-ocean-facing-07.jpg?itok=H8l-Y7rU',
        title: 'พรีเมี่ยมดีลักซ์โอเชี่ยนเฟสซิ่ง',
        description: 'ห้องพรีเมี่ยมดีลักซ์ขนาด 77 ตร.ม. ตั้งอยู่ท่ามกลางต้นไม้สีเขียว มีระเบียงหัวมุมที่เปิดรับแสงแดดในเขตร้อน...'
      },
      {
        imageUrl: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/room_listing/public/2020-09/CKBR_06-_one-bedroom-beachfront-villa-03.jpg?itok=DzwMZ069',
        title: 'บีชฟร้อนท์ วิลลา 1 ห้องนอน',
        description: 'วิลลาริมชายหาดขนาด 96 ตร.ม. อยู่ห่างจากน้ำทะเลสีฟ้าครามเพียงไม่กี่ก้าว...'
      }
      // Add more items as needed
    ]
  }),

  methods: {
    reserve (index) {
      // Handle the reserve action for the selected item
      console.log('Reserving item at index:', index)
    }
  }
}
</script>
