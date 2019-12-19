<template>
  <div>
    <v-btn
      color="red"
      fixed
      bottom
      right
      fab
      @click="$router.push({ name: 'novo-apontamento' })"
    >
      <v-icon color="white"> mdi-plus </v-icon>
    </v-btn>
    <v-list two-line>
      <template v-for="(apontamento,index) in apontamentos">
        <v-list-tile
          :key="apontamento.id"
          >
          <v-list-tile-content>
            <v-list-tile-title>Projeto {{ apontamento.codProjeto }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{ apontamento.descricao }}</v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ apontamento.data }} : </v-list-tile-sub-title>
            <v-list-tile-sub-title>{{ apontamento.horaInicial }} às {{ apontamento.horaFinal }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>

            <v-menu>
              <template v-slot:activator=" { on }">

              <v-btn icon
                v-on="on"
              >
                <v-icon> mdi-dots-vertical </v-icon>
              </v-btn>

              </template>

              <v-list>
                <v-list-tile @click="editar(apontamento.id)">
                  <v-list-tile-title>
                    <v-icon> mdi-pencil </v-icon>
                    Editar
                  </v-list-tile-title>
                </v-list-tile>

                <v-list-tile @click="deletar(apontamento.id)">
                  <v-list-tile-title>
                    <v-icon> mdi-delete </v-icon>
                    Deletar
                  </v-list-tile-title>
                </v-list-tile>
                
              </v-list>

            </v-menu>

          </v-list-tile-action>
        </v-list-tile>
        <v-divider class="divider"
          v-if="index + 1 < apontamentos.length"
          :key="'divider-' +index"
        ></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import IApontamento from '../types/IApontamento'

@Component
export default class Apontamentos extends Vue  {

  async created() {
    try {
      const response = await this.$axios.get<IApontamento[]>(`/apontamentos`)
      this.apontamentos = response.data
    } catch (error) {
      console.log("TCL: Apontamento -> created -> error", error)
    }
  }

  contador: number = 0
  apontamentos: IApontamento[] = []

  async deletar(id: number) {

    try {
      const request = this.$axios.delete(`/apontamentos/${id}`)
      alert('Excluido com sucesso!')
      
      const index = this.apontamentos.findIndex(apontamento=>apontamento.id==id)
      if (~index) {
        this.apontamentos.splice(index,1)
      }
    } catch (error) {
      
    }
  }
  
  editar(id: number) {
    this.$router.push({
      name: `editar-apontamento`,
      params: {
        id: id.toString()
      }
    })
  }
}

</script>

<style scoped>
.divider {
  margin-top: 1%;
  margin-bottom: 1%;
}
</style>