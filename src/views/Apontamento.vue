<template>
  <div>
    <div class="lista-apontamentos">
      <div
        class="linha-apontamento"
        v-for="apontamento in apontamentos"
        :key="apontamento.id"
        >
        <div class="coluna-padrao"> {{apontamento.codProjeto}} </div>
        <div class="coluna-padrao"> {{apontamento.data}} </div>
        <div class="coluna-padrao"> {{apontamento.horaInicial}} </div>
        <div class="coluna-padrao"> {{apontamento.horaFinal}} </div>
        <div class="coluna-descricao"> {{apontamento.descricao}} </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AxiosStatic } from 'axios';

@Component
export default class Apontamento extends Vue  {

  $axios!: AxiosStatic

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
}

interface IApontamento {
  id: number,
  codProjeto: string,
  data: string,
  horaInicial: string,
  horaFinal: string,
  descricao: string
}

</script>

<style scoped>
  .lista-apontamentos {
    display: flex;
    flex-direction:column;
  }

  .linha-apontamento {
    display: flex;
  }

  .coluna-padrao {
    width: 120px;
  }

  .coluna-descricao {
    flex: 1;
  }

</style>