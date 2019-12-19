<template>
  <v-form @submit.prevent="salvar" ref="form">
    <v-container>
      <div v-if="loading">
        Carregando...
      </div>
      <div v-else-if="erro">{{erro}}</div>
      <template v-else>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field 
              label="Projeto"
              v-model="apontamento.codProjeto"
              required
              :rules="[ required ]"
            />
          </v-flex>

          <v-flex xs12>
            <v-text-field 
              label="Data"
              type="date"
              v-model="apontamento.data"
              required
              max="9999-01-01"
              :rules="[ required ]"
            />
          </v-flex>

          <v-flex xs12 md6>
            <v-text-field 
              label="Hora Inicial"
              type="time"
              v-model="apontamento.horaInicial"
              required
              :rules="[ required ]"
            />
          </v-flex>

          <v-flex xs12 md6>
            <v-text-field 
              label="Hora Final"
              type="time"
              v-model="apontamento.horaFinal"
              required
              :rules="[ required ]"
            />
          </v-flex>
          
          <v-flex xs12>
            <v-textarea
              label="Descrição"
              v-model="apontamento.descricao"
              required
              :rules="[ required ]"
            />
          </v-flex>

          <v-layout>
            <v-btn
              color="grey"
              type="button"
              flat
              @click="$router.go(-1)"
              >
              Cancelar
            </v-btn>
            <v-spacer/>
            <v-btn
              color="green"
              type="submit"
              >
              Salvar
            </v-btn>
          </v-layout>

        </v-layout>
      </template>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import IApontamento from '../types/IApontamento'
import { required } from '../shareds/rules'

@Component
export default class EditarApontamento extends Vue {

  @Prop({default:null}) id!: number | null

  loading = true
  erro: null | string = null

  apontamento:ApontamentoInput = {
        id: null,
        codProjeto: null,
        data: null,
        horaInicial: null,
        horaFinal: null,
        descricao: null
      }

  async created() {
    if (!this.id) {
      this.loading = false
      return
    }
    
    try {
      const request = await this.$axios.get<IApontamento>(`/apontamentos/${this.id}`)
      this.apontamento = request.data
    } catch(erro) {
      this.erro = erro
    } finally {
      this.loading = false
    }
  }

  required = required

  $refs!: {
    form: HTMLFormElement
  }

  async salvar(){
    if (!this.$refs.form.validate()) {
      return
    }

    try {
      const resultado = this.id
        ? await this.$axios.put<IApontamento>(`/apontamentos/${this.id}`, this.apontamento)
        : await this.$axios.post<IApontamento>(`/apontamentos/`, this.apontamento)

      this.$router.push({
        name: `apontamentos`
      })
      alert(`Apontamento salvo com sucesso!`)
    } catch (error) {
      alert(error)
    }
  }

}

interface ApontamentoInput {
  id: number | null,
  codProjeto: string | null,
  data: string | null,
  horaInicial: string | null,
  horaFinal: string | null,
  descricao: string | null
}
</script>