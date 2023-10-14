<template>
<v-stepper v-model="e1">
    <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
            ข้อมูลส่วนตัว
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
            การชำระเงิน
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
            สำเร็จ
        </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
        <v-stepper-content step="1">
            <v-card class="mb-12" height="auto">
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6">
                  <div>
                    <label for="roomName">ชื่อ: </label>
                    <span id="roomName">{{ roomDetail.roomName }}</span>
                </div>
                <div>
                    <label for="price">ราคา: </label>
                    <span id="price">{{ roomDetail.price }}</span>
                </div>
                </v-col>
                <v-col cols="6" sm="6">
                  <div>
                    <label for="userName">ชื่อ: </label>
                    <span id="userName">{{ userName }}</span>
                </div>
                <div>
                    <label for="userPhone">เบอร์โทร: </label>
                    <span id="userPhone">{{ userPhone }}</span>
                </div>
                <div>
                    <label for="userEmail">E-mail: </label>
                    <span id="userEmail">{{ userEmail }}</span>
                </div>
                </v-col>

                </v-row>

              </v-container>

                <form>
                    <v-container>
                       <v-row>
              <v-col cols="12" sm="6">
                <v-date-picker
                  v-model="dates"
                  range
                  :min="today"
                  :rules="dateRules"
                  @change="updateCheckInAndOutDates"
                  required
                ></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="checkInDate"
                  label="Check-in Date"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
                <v-text-field
                  v-model="checkOutDate"
                  label="Check-out Date"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

                        <v-btn color="primary" @click="continueStep1">
                            ต่อไป
                        </v-btn>
                        <v-btn text>
                            ยกเลิก
                        </v-btn>
                    </v-container>
                </form>
            </v-card>
        </v-stepper-content>

        <v-stepper-content step="2">
            <v-card class="mb-12" height="auto">
                <form>
                    <v-radio-group v-model="selectedPaymentMethod" column style="margin-left: 2%;">
                        <v-radio label="Credit Card" value="credit"></v-radio>
                        <v-radio label="Debit Card" value="debit"></v-radio>
                        <v-radio label="Cash" value="cash"></v-radio>
                        <v-radio label="Gift Card" value="gift"></v-radio>
                    </v-radio-group>
                    <v-btn color="primary" @click="continueStep2">
                        Continue
                    </v-btn>

                    <v-btn text @click="back">
                        ย้อนกลับ
                    </v-btn>
                </form>
            </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
            <v-card class="mb-12" height="40vh">
                <!-- Set height to 100vh to make it full height -->
                <v-row align="center" justify="center" style="height: 100%;">
                    <!-- Center content vertically -->
                    <v-col cols="12" align="center">
                        <!-- Center content horizontally -->
                        <!-- Add a big success icon -->
                        <v-icon x-large color="success">mdi-check-circle</v-icon>
                        <v-card-text align-center>
                            <h1>การจองสำเร็จ</h1>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card>

            <v-btn color="primary" @click="continueStep3">
                ประวัติการจอง
            </v-btn>

            <v-btn text>
                กลับหน้าหลัก
            </v-btn>
        </v-stepper-content>
    </v-stepper-items>
</v-stepper>
</template>

<script>
import axios from 'axios'
export default {

  created () {
    const auth = JSON.parse(localStorage.getItem('auth'))
    this.userName = auth.userName
    this.userEmail = auth.userEmail
    this.userPhone = auth.userPhone
    this.fetchRoomDetail()
  },

  data: () => ({
    name: '',
    email: '',
    phone: '',
    e1: 1,
    dates: [],
    today: new Date().toISOString().substr(0, 10),
    checkInDate: '',
    checkOutDate: '',
    roomDetail: {
      roomName: '',
      price: ''
    }
  }),

  computed: {
    dateRangeText () {
      return this.dates.join(' ถึง ')
    },
    dateRules () {
      return [
        (v) => {
          const selectedDate = new Date(v)
          const currentDate = new Date(this.today)
          return selectedDate >= currentDate || 'Please select a date after today'
        }
      ]
    }
  },

  methods: {
    continueStep1 () {
      this.e1 = 2
      console.log(this.e1)
    },
    continueStep2 () {
    // Handle "Continue" button click for step 2
      this.e1 = 3 // Transition to step 3
    },
    continueStep3 () {
    // Handle "Continue" button click for step 2
      console.log('สำเร็จ')
    },
    back () {
      this.e1 -= 1
    },
    updateCheckInAndOutDates () {
      if (this.dates.length === 2) {
        this.checkInDate = this.dates[0]
        this.checkOutDate = this.dates[1]
      } else {
        this.checkInDate = ''
        this.checkOutDate = ''
      }
    },
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
    }
  },
  watch: {
    today () {
      this.dates = []
    }
  }

}
</script>

<style scoped>
/* Center the content within the full viewport height */
.v-stepper-content[step="3"] {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
