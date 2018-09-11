<template>
  <div class="map">
         <map
      id="myMap"
      style="width: 100%; height: 300px;"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      show-location
    ></map>
  </div>
</template>

<script>
import globalStore from "../../stores/global-store"

export default {
  data () {
    return {
    latitude: 23.099994,
    longitude: 113.324520,
        markers: [{
            id: 1,
            latitude: 23.099994,
            longitude: 113.324520,
            name: 'T.I.T 创意园'
        }],
    }
  },

  components: {
 
  },

  methods: {
 
  },

  onLoad(){

  }
}
</script>

<style scoped>

</style>
