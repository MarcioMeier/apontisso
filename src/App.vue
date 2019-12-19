<template>
  <v-app :dark="dark">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Apontisso</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon flat @click="dark=!dark">
        <v-icon> mdi-invert-colors </v-icon>
      </v-btn>
    </v-toolbar>

    <v-content style="margin-top:2%;">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      dark: true
    }
  }
}
</script>
