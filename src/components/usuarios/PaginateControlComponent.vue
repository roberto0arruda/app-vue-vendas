<template>

<div class="mailbox-controls">
  <!-- Check all button -->


  <button type="button"
          @click="btnRefresh"
          :disabled="loading['btnRefresh'] === 1"
          class="btn btn-default btn-sm">
    <i class="fa fa-refresh"></i>
  </button>

  <el-button :loading="btnActive" type="button" class="btn btn-default btn-sm" style="margin-left: 35px"
             @click="$emit('EXPORT-TIPO')">
    <i class="fa  fa-file-excel-o"></i>
    &nbsp; Exportar para excel
  </el-button>

  <button type="button"
          v-if="idActive === 1"
          class="btn btn-default btn-sm"
          style="margin-left: 20px"
          @click="$emit('NOVO-TIPO')">
    <i class="fa fa-plus"></i>
    &nbsp; Novo Tipo
  </button>

  <div class="box-tools btn-group" style="margin-left: 20px">
    <div class="has-feedback" >
      <form action="#"  v-on:submit.prevent="btnPesquisar">
        <input type="text"
               class="form-control input-sm"
               placeholder="Pesquisar"
               v-model="inputPesquisar">
        <span class="glyphicon glyphicon-search form-control-feedback"></span>
      </form>
    </div>
  </div>

  <div class="box-tools btn-group" style="margin-left: 20px">
    <el-radio-group v-model="idActive">
      <el-radio :label="1" @change="btnPesquisar" border size="small">On</el-radio>
      <el-radio :label="2" @change="btnPesquisar" border size="small">Off</el-radio>
      <el-radio :label="3" @change="btnPesquisar" border size="small">Excluido</el-radio>
    </el-radio-group>
  </div>

  <div class="pull-right">


    {{ (stateData.from || 0) + " - "+ (stateData.to || 0) +" / "+ (stateData.total || 0 )}}
    <div class="btn-group">
      <button type="button" class="btn btn-default btn-sm" @click="firstPage"
              :disabled="loading['firstPage'] === 1">
        <i class="fa fa-angle-double-left " ></i></button>
      <button type="button" class="btn btn-default btn-sm"
              @click="prevPage"
              :disabled="loading['prevPage'] === 1"><i class="fa fa-chevron-left" ></i></button>
      <button type="button" class="btn btn-default btn-sm"
              @click="nextPage"
              :disabled="loading['nextPage'] === 1"><i class="fa fa-chevron-right" ></i></button>
      <button type="button" class="btn btn-default btn-sm"
              @click="lastPage"
              :disabled="loading['lastPage'] === 1"><i class="fa fa-angle-double-right"></i></button>
    </div>
    <!-- /.btn-group -->
  </div>
  <!-- /.pull-right -->
</div>




</template>

<script>
  import { mapState, mapActions } from 'vuex'

export default {
  name : 'PaginateControlsComponent',
  data()
  {
    return {
      btnActive: false,
      loading : { nextPage : 0, prevPage : 0, firstPage : 0, lastPage : 0, btnRefresh : 0 },
      valPesquisa : ''
    }
  },

  methods:
  {
      nextPage()
      {
        if(this.stateData.to === this.stateData.total) {
          return;
        }

        this.loading['nextPage'] = 1;
        this.stateData.current_page += 1;
        this.btnRefresh();
      },

      prevPage()
      {
        if(this.stateData.from === 1 ) {
          return;
        }

        this.loading['prevPage'] = 1;
        this.stateData.current_page -= 1;
        this.btnRefresh();
      },

      lastPage()
      {
        this.loading['lastPage'] = 1;
        this.stateData.current_page = this.stateData.last_page;
        this.btnRefresh();
      },

      firstPage()
      {
        this.loading['firstPage'] = 1;
        this.stateData.current_page  = 1;
        this.btnRefresh();
      },

      btnRefresh()
      {
        this.stateFiltro.page = this.stateData.current_page;

        this.loading['btnRefresh'] = 1;

        this.REQUEST_ACTION()
        .then(() =>
        {
          for (let prop in this.loading)
          {
            // noinspection JSUnfilteredForInLoop
            this.loading[prop] = 0;
          }

        });

      },
      btnPesquisar()
      {
        this.stateData.current_page = 1;
        this.btnRefresh();
      },
    ...mapActions('EstoqueMiscelaneaMaterialTipo', [
      'SET_ID_ACTIVE',
      'REQUEST_ACTION'
    ])

  },
  computed:
  {
    ...mapState('EstoqueMiscelaneaMaterialTipo',
      {
        stateData     : state => state.data,
        stateFiltro   : state => state.filtros,

      }),

    inputPesquisar :
    {
      get() { return this.stateFiltro.pesquisaVal; },
      set(value) { this.stateFiltro.pesquisaVal = value; }
    },
    idActive :
      {
        get() { return this.stateFiltro.idActive; },
        set(value) { this.SET_ID_ACTIVE(value); },
      },
  }


}
</script>
