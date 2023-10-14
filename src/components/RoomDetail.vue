<template>
<v-container class="d-flex align-center justify-center" fluid>
    <v-col>
        <v-carousel class="header">
            <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
        </v-carousel>
    </v-col>
    <v-col>
        <v-row>
            <h1>{{ detail.name }}</h1>
        </v-row>
        <v-row>
            <h3>{{ detail.price }} บาทต่อคืน</h3>
        </v-row>
        <v-row>
            <p>{{ detail.detail }}</p>
        </v-row>
        <v-row>
            <v-btn color="primary" elevation="2">จอง</v-btn>
            <v-btn style="margin-left: 8px;" outlined plain text color="secondary">สอบถามเพิ่มเติม</v-btn>
        </v-row>
    </v-col>

</v-container>
</template>

<script>
export default {
  name: 'RoomDetail',
  data: () => ({
    loading: false,
    items: [{
      src: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/850x472/public/2020-10/CKBR_09-royal-villa-03.jpg?itok=pLE2Aqw6'
    },
    {
      src: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/850x472/public/2020-10/CKBR_09-royal-villa-04.jpg?itok=hkdicdD4'
    },
    {
      src: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/850x472/public/2020-10/CKBR_09-royal-villa-06.jpg?itok=a2geDO5B'
    },
    {
      src: 'https://www.centarahotelsresorts.com/centaragrand/sites/g/files/yplzxh121/files/styles/850x472/public/2020-09/CKBR_09-royal-villa-09.jpg?itok=fbYy8T-f'
    }
    ],
    detail: {
      name: 'รอยัลวิลลา',
      price: '20,000',
      detail: 'รอยัลวิลลาแห่งนี้ออกแบบมาเพื่อให้คุณได้พักผ่อนริมทะเลอย่างเต็มอิ่ม เป็นสถานที่พักผ่อนริมชายหาดที่ดีที่สุด ซึ่งมาพร้อมทิวทัศน์อันงดงามของอ่าวไผ่ปล้องและสถานที่อื่นๆ วิลลาขนาด 300 ตร.ม. ตั้งอยู่บนยอดเขา พร้อม 2 ห้องนอน ห้องน้ำส่วนตัว พื้นที่นั่งเล่นขนาดใหญ่ สระว่ายน้ำส่วนตัวขนาด 40 ตร.ม. พร้อมอ่างจากุซซี่และบริเวณนั่งเล่นที่หันหน้าสู่ทะเล ตื่นเช้าขึ้นมาชมพระอาทิตย์ขึ้นเหนือผืนน้ำที่ส่องแสงระยิบระยับ'
    }
  }),

  methods: {}
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
