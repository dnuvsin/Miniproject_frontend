<template>
<div>
    <v-container>
        <v-row>
            <v-col cols="6" sm="8">
                <div>
                    <v-data-table :headers="headers" :items="reserveItem" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>ประวัติการจอง</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                        <template v-slot:item="{ item, index }">
                            <tr>
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.reserveDate }}</td>
                                <td>{{ item.roomNames }}</td>
                                <td>{{ item.checkInDate }}</td>
                                <td>{{ item.checkOutDate }}</td>
                                <td>
                                    <v-icon small outline class="mr-2" @click="openDialog('edit', item)" color="blue">
                                        mdi-pencil
                                    </v-icon>
                                    <v-icon small outline @click="deleteItem(item)" color="red" class="m1-2">
                                        mdi-delete
                                    </v-icon>
                                </td>
                            </tr>
                        </template>

                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize">
                                ไม่มีข้อมูลการจอง
                            </v-btn>
                        </template>
                    </v-data-table>
                    <v-dialog v-model="dialogEdit" max-width="800px">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">แก้ไขวันเข้าพัก</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <v-date-picker v-model="dates" range :min="today" :rules="dateRules" @change="updateCheckInAndOutDates"></v-date-picker>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-row>
                                                <v-text-field v-model="checkInDate" label="Check-in Date" prepend-icon="mdi-calendar" readonly></v-text-field>
                                            </v-row>
                                            <v-row>
                                                <v-text-field v-model="checkOutDate" label="Check-out Date" prepend-icon="mdi-calendar" readonly></v-text-field>
                                            </v-row>
                                            <v-row>
                                                จำนวนคืนทั้งหมด {{ numberOfNights }} คืน
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    ยกเลิก
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save(formTitle)">
                                    บันทึกการเปลี่ยนแปลง
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">คุณต้องการยกเลิกการจองนี้หรือไม่?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete()">ยกเลิก</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm()">ตกลง</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-col>
            <v-col cols="6" sm="4">
                <h1>Profile Page</h1>
                <div v-if="userData">
                    <p><strong>User Name:</strong> {{ userData.userName }}</p>
                    <p><strong>User Email:</strong> {{ userData.userEmail }}</p>
                    <p><strong>User Phone:</strong> {{ userData.userPhone }}</p>
                </div>
                <v-btn color="#7d1538" small outlined @click="logout" class="ml-auto">Logout</v-btn>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userData: null,
      dialogCreate: false,
      dialogEdit: false,
      dialogDelete: false,
      userId: '',
      reservationId: '',
      user: '',
      room: '',
      reserveDate: '',
      checkInDate: '',
      checkOutDate: '',
      dates: [],
      today: new Date().toISOString().substr(0, 10),
      headers: [{
        text: 'ลำดับ',
        align: 'start',
        sortable: false,
        value: 'item'
      },

      {
        text: 'วันที่ทำการจอง',
        value: 'reserveDate'
      },
      {
        text: 'ห้องที่ทำการจอง',
        value: 'roomNames'
      },
      {
        text: 'วันที่เข้าพัก',
        value: 'checkInDate'
      },
      {
        text: 'วันที่ออกจากที่พัก',
        value: 'checkOutDate'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
      ],
      reserveItem: [],
      roomNames: {},
      roomName: {},
      formTitle: '',
      idReserve: '',
      idForDelete: ''
    }
  },
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
    },
    numberOfNights () {
      if (this.checkInDate && this.checkOutDate) {
        const checkIn = new Date(this.checkInDate)
        const checkOut = new Date(this.checkOutDate)
        const timeDifference = checkOut - checkIn
        const numberOfDays = timeDifference / (1000 * 3600 * 24)
        return numberOfDays
      } else {
        return 0 // Or some default value if the dates are not set
      }
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  created () {
    console.log('Component created')
    const authData = localStorage.getItem('auth')
    if (authData) {
      this.userData = JSON.parse(authData)
      console.log('User data:', this.userData)
      this.userId = this.userData.userId
      console.log('UserId: ', this.userId)
    }
    this.initialize()
  },

  methods: {
    logout () {
      // Clear user data from localStorage and navigate to the login page
      localStorage.removeItem('auth')
      this.$router.push({
        path: '/signin'
      }).then(() => {
        window.location.reload()
      })
    },
    async initialize () {
      try {
        const data = await axios.get(`http://localhost:9000/reservationsHistory/${this.userId}`)
        this.reserveItem = data.data

        for (const item of this.reserveItem) {
        // Fetch room name and store it in roomNames
          await this.fetchRoomName(item.roomId, item)
        }
        console.log('reserveItem: ', this.reserveItem)
      } catch (error) {
        console.error('Error fetching Reserve data:', error)
      }
    },
    async fetchRoomName (roomId, item) {
      try {
        const response = await axios.get(`http://localhost:9000/room/${roomId}`)
        const roomName = response.data.roomName

        // Update the 'roomNames' property for the item
        this.$set(item, 'roomNames', roomName)

        // If you still want to store it separately in 'roomNames', you can do that too:
        // this.$set(this.roomNames, roomId, roomName);
      } catch (error) {
        console.error('Error fetching room name:', error)
      }
    },

    openDialog (Action, item) {
      this.formTitle = ''
      if (Action === 'edit') {
        this.formTitle = 'แก้ไขข้อมูล'
        this.dialogEdit = true
        this.checkInDate = item.checkInDate
        this.checkOutDate = item.checkOutDate
        this.idReserve = item.reservationId
      }
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.idForDelete = item.reservationId
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const response = await axios.delete(`http://localhost:9000/reservationsHistory/${this.idForDelete}`)
        console.log('delete ', response)
        window.alert('ยกเลิกการจองสำเร็จ')
        this.initialize()
      } catch (error) {
        console.log(error.message)
      }
      this.closeDelete()
    },

    close () {
      this.dialogCreate = false
      this.dialogEdit = false
      this.checkInDate = ''
      this.checkOutDate = ''
    },

    closeDelete () {
      this.dialogDelete = false
      this.editedItem = []
      this.editedIndex = -1
    },

    async save (action) {
      const data = {
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate
      }

      if (action === 'แก้ไขข้อมูล') {
        try {
          const dataResponseEdit = await axios.put(`http://localhost:9000/reservationsHistory/${this.idReserve}`, data)
          console.log('dataResponse ', dataResponseEdit)
          window.alert('แก้ไขวันเข้าพักสำเร็จ รอเจ้าหน้าที่ติดต่อกลับ')
          this.close()
          this.initialize()
        } catch (error) {
          console.log(error.message)
        }
      }
      this.close()
    },

    updateCheckInAndOutDates () {
      if (this.dates.length === 2) {
        this.checkInDate = this.dates[0]
        this.checkOutDate = this.dates[1]
      } else {
        this.checkInDate = ''
        this.checkOutDate = ''
      }
    }
  }
}
</script>
