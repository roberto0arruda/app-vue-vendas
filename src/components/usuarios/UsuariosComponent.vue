<template>
  <template-principal>
    <div class="container-fluid">
      <button style="margin-top: 10px;margin-bottom: 10px"
              type="button" class="btn btn-success"
              @click="userDialog.isOpen = true; userDialog.tipoForm = 'novo'"><i class="el-icon-circle-plus"></i>
        Novo
      </button>
      <div class="box box-primary" v-loading="loading">

        <div class="box-body no-padding">

          <div class="table-responsive mailbox-messages">
            <!--<PaginateControls
                    @NOVO-USER="userDialog.isOpen = true; userDialog.tipoForm = 'novo'"
                    @REFRESH="getUsers"
                    :list="listUsers"
            />-->

            <table class="table table-hover table-striped table-bordered">
              <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CEP</th>
                <th>Rua</th>
                <th>Nº</th>
                <th>Bairro</th>
                <th>Criado Em</th>
                <th>Atualizado Em</th>
                <th width="170"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="listUsers.data < 1">
                <td colspan="11"><h4>Nenhum registro!</h4></td>
              </tr>
              <tr v-for="(row, index) in listUsers.data" :key="index">
                <td>{{row.id}}</td>
                <td>{{row.name}}</td>
                <td>{{row.email}}</td>
                <td>{{row.cep}}</td>
                <td>{{row.street}}</td>
                <td>{{row.number}}</td>
                <td>{{row.neighborhood}}</td>
                <td>{{row.created_at | moment("DD/MM/YYYY")}}</td>
                <td>{{row.updated_at | moment("DD/MM/YYYY")}}</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-primary btn-sm"
                            @click="userDialog.tipoForm = 'update'; userDialog.dados = row; userDialog.isOpen = true">
                      <i class="el-icon-edit"></i> Editar
                    </button>
                    <button
                            type="button" class="btn btn-danger btn-sm"
                            @click="excluirUsuario(row)"><i class="el-icon-delete"></i>
                      Excluir
                    </button>

                  </div>
                </td>
              </tr>
              </tbody>
            </table>

            <pagination-component
              :pagination="listUsers"
              :offset="listUsers.per_page"
              @paginate="getUsers"
            ></pagination-component>
          </div>

        </div>

      </div>

      <NovoUsuarioComponent  :visible="userDialog.isOpen"
                          :handleClose="()=>{ this.userDialog.isOpen = false }"
                          :tipoForm="userDialog.tipoForm"
                          :dados="userDialog.dados"
                          @RELOAD="getUsers"/>

    </div>
  </template-principal>
</template>

<script>
import TemplatePrincipal from '@/templates/TemplatePrincipal'
import NovoUsuarioComponent from './NovoUsuarioComponent'
import PaginationComponent from '@/components/general/PaginationComponent'

export default {
  name: 'UsuariosComponent',
  components: { TemplatePrincipal, NovoUsuarioComponent, PaginationComponent },
  data () {
    return {
      user: false,
      msg: 'Página de Usuários',
      loading: false,
      listUsers: {},
      userDialog : { isOpen : false, tipoForm : 'novo', dados  : {}},
    }
  },
  created (){
    let userAux = sessionStorage.getItem('user');
    if (userAux) {
      this.user = JSON.parse(userAux);
    }
    this.getUsers(1);
  },
  methods:{
    getUsers(page) {
      this.loading = true;
      this.$http.get(this.$urlAPI+`usuarios?page=${page}`, {headers: {"Authorization":"Bearer "+this.user.token}})
              .then(function (response) {
                this.listUsers = response.data;
                this.loading = false;
              }.bind(this))
              .catch(function (e) {
                this.$alertaValidacao(e);
                this.loading = false;
              }.bind(this))
    },
    excluirUsuario(obj)
    {
      this.$alert('Deseja excluir <strong>'+obj.name +' </strong>?', 'Excluir', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'Confirmar',
        type: 'warning',
        callback: action =>
        {
          if (action === 'confirm')
          {
            this.$http.delete(this.$urlAPI+'deletar-usuario/' + obj.id, {headers: {"Authorization":"Bearer " + this.user.token}})
                    .then(() =>
                    {
                      this.$message({type: 'success', message: 'Excluído com sucesso.'});
                      this.getUsers();
                    });
          }
        }
      });

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
