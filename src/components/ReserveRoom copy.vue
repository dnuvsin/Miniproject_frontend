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
                <form>
                    <v-container>
                        <v-row>
                            <div>
                                <label for="userName">ชื่อ: </label>
                                <span id="userName">{{ userName }}</span>
                            </div>
                        </v-row>
                        <v-row>
                            <div>
                                <label for="userPhone">เบอร์โทร: </label>
                                <span id="userPhone">{{ userPhone }}</span>
                            </div>
                        </v-row>
                        <v-row>
                            <div>
                                <label for="userEmail">E-mail: </label>
                                <span id="userEmail">{{ userEmail }}</span>
                            </div>
                        </v-row>
                        <v-row>
                            checkin date
                        </v-row>
                        <v-row>
                            checkout date
                        </v-row>
                    </v-container>
                    <v-btn color="primary" @click="continueStep1">ต่อไป</v-btn>
                    <v-btn text>ยกเลิก</v-btn>
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
                    <v-btn color="primary" @click="continueStep2">ต่อไป</v-btn>
                    <v-btn text @click="back">ย้อนกลับ</v-btn>
                </form>
            </v-card>
        </v-stepper-content>

        <v-stepper-content step="3">
            <v-card class="mb-12" height="40vh">
                <v-row align="center" justify="center" style="height: 100%;">
                    <v-col cols="12" align="center">
                        <v-icon x-large color="success">mdi-check-circle</v-icon>
                        <v-card-text align-center>
                            <h1>การจองสำเร็จ</h1>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card>
            <v-btn color="primary" @click="continueStep3">ประวัติการจอง</v-btn>
            <v-btn text to="/">กลับหน้าหลัก</v-btn>
        </v-stepper-content>
    </v-stepper-items>
</v-stepper>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ReserveRoom',

  data: () => ({
    userName: '',
    userEmail: '',
    userPhone: '',
    selectedRoomId: null,
    e1: 1
  }),

  created () {
    const auth = JSON.parse(localStorage.getItem('auth'))
    this.userName = auth.userName
    this.userEmail = auth.userEmail
    this.userPhone = auth.userPhone
  },

  methods: {
    continueStep1 () {
      this.$v.$touch()
      this.e1 = 2
    }
  },
  continueStep2 () {
    this.e1 = 3
  },
  continueStep3 () {
    this.createReservation()
  },
  back () {
    this.e1 -= 1
  },
  createReservation () {
    const newReservation = {
      user: {
        userId: this.auth.userId
      },
      room: {
        roomId: this.selectedRoomId
      }
    }

    axios
      .post('http://localhost:9000/reservations', newReservation)
      .then((response) => {
        console.log('การจองสำเร็จ', response.data)
        this.successMessage = 'การจองสำเร็จ'
        this.$router.push('/reservation-history')
      })
      .catch((error) => {
        console.error('Error creating reservation', error)
        this.errorMessage = 'การจองไม่สำเร็จ'
      })
  }
}

</script>
