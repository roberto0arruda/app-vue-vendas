<template>

<div>


<div class="box box-primary" v-loading="loading">

    <div class="box-body no-padding">

        <div class="table-responsive mailbox-messages">
          <PaginateControls
              @NOVO-TIPO="userDialog.isOpen = true; userDialog.tipoForm = 'nova'"
              @EXPORT-TIPO="exportar"
          />

            <table class="table table-hover table-striped table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Criado Por</th>
                    <th>Criação</th>
                    <th>Atualização</th>
                    <th width="150">&nbsp</th>
                </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>

          <PaginateControls
                            @NOVO-TIPO="userDialog.isOpen = true"
                            @EXPORT-TIPO="exportar"/>
        </div>

    </div>

</div>
<!-- /. box -->

<NovoTipoComponent  :visible="userDialog.isOpen"
             :handleClose="()=>{ this.userDialog.isOpen = false }"
             :tipoForm="userDialog.tipoForm"
             :Tipo="userDialog.tipo"
             @RELOAD="btnRefresh"/>

</div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import PaginateControls from './PaginateControlComponent';
import NovoTipoComponent from './NovoTiposComponent';

export default
{
  components: {
    PaginateControls,
    NovoTipoComponent
  },
  data()
  {
    return{

        userDialog : { isOpen : false, tipoForm : 'nova', user  : {}},
        msg        : '',
        loading : false
    }
  },

  methods:
  {
    btnRefresh()
    {
      this.REQUEST_ACTION()
      .then(() =>
      {

      });

    },

    excluirTipo(obj)
    {
      this.$alert('Deseja excluir <strong>'+obj.name +' </strong>?', 'Excluir', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'Confirmar',
        type: 'warning',
        callback: action =>
        {
          if (action === 'confirm')
          {
              axios.get('estoque/material/destroyTipo/' + obj.id)
              .then(response =>
              {
                this.$message({type: 'success', message: 'Excluído com sucesso.'});
                this.btnRefresh();
              });
          }
        }
      });

    },

    exportar()
    {
      let vm = this;
      this.loading = true;

      axios({
        method      :'post',
        url         :'estoque/material/exportTipos',
        responseType:'arraybuffer',
        data        : {dataList: vm.stateData.data}
      })
        .then( function (response)
        {
          vm.$forceDownload(response, 'MiscelaneasTipos.xlsx');
        })
        .catch(function (error)
        {
          vm.$message.warning("Primeiro carregue os Dados!");

        })
        .then(function (response){
          vm.loading = false;
        });
    },

    ...mapActions('EstoqueMiscelaneaMaterialTipo', [
      'REQUEST_ACTION'
    ])

  },

  mounted()
  {
    this.btnRefresh();

  },
  computed : {
    ...mapState('EstoqueMiscelaneaMaterialTipo',
      {
        stateData   : state => state.data
      }),
  }

}
</script>
