<template>
  <template-principal>
    <div class="container-fluid">
      <div class="box box-primary" v-loading="loading">

        <div class="box-body no-padding">

          <div class="table-responsive mailbox-messages">
            <!--<PaginateControls
                    @NOVO-TIPO="userDialog.isOpen = true; userDialog.tipoForm = 'nova'"
                    @EXPORT-TIPO="exportar"
            />-->

            <table class="table table-hover table-striped table-bordered">
              <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Criado Por</th>
                <th>Criação</th>
                <th>Atualização</th>
                <th width="150"></th>
              </tr>
              </thead>
              <!--<tbody>
              <tr v-if="stateData.data < 1">
                <td colspan="11"><h4>Nenhum registro!</h4></td>
              </tr>
              <tr v-for="(row, index) in stateData.data">
                <td>{{row.id}}</td>
                <td>{{row.name}}</td>
                <td>{{row.user.name}}</td>
                <td>{{row.created_at}}</td>
                <td>{{row.updated_at}}</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-primary btn-sm"
                            @click="userDialog.tipoForm = 'update'; userDialog.tipo = row; userDialog.isOpen = true">
                      <i class="fa fa-pencil"></i> Editar
                    </button>
                    <button
                            v-if="row.active !== 3"
                            type="button" class="btn btn-danger btn-sm"
                            @click="excluirTipo(row)"><i class="fa fa-trash-o"></i>
                      Excluir
                    </button>

                  </div>
                </td>
              </tr>
              </tbody>-->
            </table>

            <!--<PaginateControls
                    @NOVO-TIPO="userDialog.isOpen = true"
                    @EXPORT-TIPO="exportar"/>-->
          </div>

        </div>

      </div>
    </div>
  </template-principal>
</template>

<script>
import TemplatePrincipal from '@/templates/TemplatePrincipal'

export default {
  name: 'UsuariosComponent',
  components: { TemplatePrincipal },
  data () {
    return {
      msg: 'Página de Usuários',
      loading: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
