<template>
  <div>
    <v-container style="margin-bottom: 80px;">
      <h1>{{ hotelName }}</h1>
    <p><strong>Telephone:</strong> {{ tel }}</p>
    <p><strong>Location:</strong> {{ location }}</p>
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15799.565676276821!2d98.9134973!3d8.1125374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sth!2sth!4v1695057645814!5m2!1sth!2sth" width="100%" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'AboutHotel',
  data () {
    return {
      hotelName: 'Krabi Paradise Hotel',
      tel: '123-456-7890',
      location: 'อ่าวนาง กระบี่ 81000'
    }
  }
}
</script>
