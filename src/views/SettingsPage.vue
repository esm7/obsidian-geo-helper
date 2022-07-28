<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
		<ion-button @click="() => sendGeolocation()">Send Location to Map View</ion-button>
		<ion-spinner v-if="locationPending"></ion-spinner>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonSpinner, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { Geolocation } from '@ionic-native/geolocation';
/* import { NativeGeocoder } from '@ionic-native/native-geocoder'; */

export default defineComponent({
  name: 'SettingsPage',
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
	IonSpinner
  },
  data() {
  return {
locationPending: false
}
},
methods: {
	sendGeolocation: async function() {
		console.log('getting location');
		this.locationPending = true;
		const location = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
		this.locationPending = false;
        const url = `obsidian://mapview?do=update-real-time-location&centerLat=${location.coords.latitude}&centerLng=${location.coords.longitude}&accuracy=${location.coords.accuracy}`;
		open(url);
		console.log('found location:', location);
	}
}
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
