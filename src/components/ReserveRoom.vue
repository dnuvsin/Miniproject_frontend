<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        ข้อมูลส่วนตัว
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        การชำระเงิน
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        สำเร็จ
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          height="auto"
        >
        <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="ชื่อ"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="phone"
        :error-messages="phoneErrors"
        label="เบอร์โทร"
        required
        @input="$v.phone.$touch()"
        @blur="$v.phone.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
        <v-btn
          color="primary"
          @click="continueStep1"
        >
          ต่อไป
        </v-btn>
        <v-btn text>
          ยกเลิก
        </v-btn>
        </form>
        </v-card>
      </v-stepper-content>

      <v-stepper-content step="2">
       <v-card class="mb-12" height="auto">
          <form>
            <v-radio-group
      v-model="selectedPaymentMethod"
      column
      style="margin-left: 2%;"
    >
    <v-radio label="Credit Card" value="credit"></v-radio>
    <v-radio label="Debit Card" value="debit"></v-radio>
    <v-radio label="Cash" value="cash"></v-radio>
    <v-radio label="Gift Card" value="gift"></v-radio>
    </v-radio-group>
        <v-btn
          color="primary"
          @click="continueStep2"
        >
          Continue
        </v-btn>

        <v-btn text
        @click="back">
          ย้อนกลับ
        </v-btn>
        </form>
        </v-card>
      </v-stepper-content>

<v-stepper-content step="3">
    <v-card class="mb-12" height="40vh"> <!-- Set height to 100vh to make it full height -->
      <v-row align="center" justify="center" style="height: 100%;"> <!-- Center content vertically -->
        <v-col cols="12" align="center"> <!-- Center content horizontally -->
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    phone: {
      required,
      phone (value) {
      // You can define your custom phone validation logic here
      // For example, you might use a regular expression to validate the phone number
        return /^[0-9]{10}$/.test(value) // Assuming 10-digit phone number
      }
    }
  },

  data: () => ({
    name: '',
    email: '',
    phone: '',
    e1: 1
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Phone is required')
      !this.$v.phone.phone && errors.push('Invalid phone number')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },

  methods: {
    continueStep1 () {
      // Handle "Continue" button click for step 1
      this.$v.$touch() // Trigger validation
      if (!this.$v.$error) {
        // Proceed to the next step if there are no validation errors
        this.e1 = 2
        console.log(this.e1)
      }
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
