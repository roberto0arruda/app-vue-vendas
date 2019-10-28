<template>
  <template-principal>
    <div class="container-fluid">
      <button style="margin-top: 10px;margin-bottom: 10px"
              type="button" class="btn btn-success"
              @click="productDialog.isOpen = true; productDialog.tipoForm = 'novo'"><i class="el-icon-circle-plus"></i>
        Novo
      </button>
      <div class="box box-primary" v-loading="loading">

        <div class="box-body no-padding">

          <div class="table-responsive mailbox-messages">
            <!--<PaginateControls
                    @NOVO-USER="productDialog.isOpen = true; productDialog.tipoForm = 'novo'"
                    @REFRESH="getProducts"
                    :list="listProducts"
            />-->

            <table class="table table-hover table-striped table-bordered">
              <thead>
              <tr>
                <th>ID</th>
                <th>Código</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Criado Em</th>
                <th>Atualizado Em</th>
                <th width="170"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="listProducts.data < 1">
                <td colspan="11"><h4>Nenhum registro!</h4></td>
              </tr>
              <tr v-for="(row, index) in listProducts.data" :key="index">
                <td>{{row.id}}</td>
                <td>{{row.cod_product}}</td>
                <td>{{row.name}}</td>
                <td>{{row.price}}</td>
                <td>{{row.created_at | moment("DD/MM/YYYY")}}</td>
                <td>{{row.updated_at | moment("DD/MM/YYYY")}}</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-primary btn-sm"
                            @click="productDialog.tipoForm = 'update'; productDialog.dados = row; productDialog.isOpen = true">
                      <i class="el-icon-edit"></i> Editar
                    </button>
                    <button
                            type="button" class="btn btn-danger btn-sm"
                            @click="excluirProduto(row)"><i class="el-icon-delete"></i>
                      Excluir
                    </button>

                  </div>
                </td>
              </tr>
              </tbody>
            </table>

            <pagination-component
              :pagination="listProducts"
              :offset="listProducts.per_page"
              @paginate="getProducts"
            ></pagination-component>
          </div>

        </div>

      </div>

      <NovoProdutoComponent  :visible="productDialog.isOpen"
                          :handleClose="()=>{ this.productDialog.isOpen = false }"
                          :tipoForm="productDialog.tipoForm"
                          :dados="productDialog.dados"
                          @RELOAD="getProducts"/>

    </div>
  </template-principal>
</template>

<script>
import TemplatePrincipal from '@/templates/TemplatePrincipal'
import NovoProdutoComponent from './NovoProdutoComponent'
import PaginationComponent from '@/components/general/PaginationComponent'

export default {
  name: 'ProdutosComponent',
  components: { TemplatePrincipal, NovoProdutoComponent, PaginationComponent },
  data () {
    return {
      user: false,
      msg: 'Página de Usuários',
      loading: false,
      listProducts: {},
      productDialog : { isOpen : false, tipoForm : 'novo', dados  : {}},
    }
  },
  created (){
    let userAux = sessionStorage.getItem('user');
    if (userAux) {
      this.user = JSON.parse(userAux);
    }
    this.getProducts(1);
  },
  methods:{
    getProducts(page) {
      this.loading = true;
      this.$http.get(this.$urlAPI+`produtos?page=${page}`, {headers: {"Authorization":"Bearer "+this.user.token}})
              .then(function (response) {
                this.listProducts = response.data;
                this.loading = false;
              }.bind(this))
              .catch(function (e) {
                this.$alertaValidacao(e);
                this.loading = false;
              }.bind(this))
    },
    excluirProduto(obj)
    {
      this.$alert('Deseja excluir <strong>'+obj.name +' </strong>?', 'Excluir', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'Confirmar',
        type: 'warning',
        callback: action =>
        {
          if (action === 'confirm')
          {
            this.$http.delete(this.$urlAPI+'deletar-produto/' + obj.id, {headers: {"Authorization":"Bearer " + this.user.token}})
                    .then(() =>
                    {
                      this.$message({type: 'success', message: 'Excluído com sucesso.'});
                      this.getProducts();
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
