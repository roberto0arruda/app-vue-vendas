<template>

<el-dialog
  :title="titulo"
  :visible.sync="visible"
  :before-close="handleClose"
  style="padding: 0"
  width="600px">

  <div class="box box-info">

    <form class="form-horizontal">

      <div class="box-body">

        <div class="form-group">
          <label class="col-sm-2 control-label">Tipo:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   @blur="form.name = form.name.toUpperCase()"
                   placeholder="Informe o tipo"
                   v-model="form.name">
          </div>
        </div>


        <div class="form-group" v-show="tipoForm === 'update'">
          <label class="col-sm-2 control-label">Status:</label>

          <el-switch
            v-model="form.active"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="2"
            inactive-text="Off"
            active-text="On">
          </el-switch>
        </div>

      </div>

    </form>
  </div>

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" :loading="btnActive" @click="submit">{{btnTitulo}}</el-button>
  </span>
</el-dialog>

</template>

<script>

export default
{
  data()
  {
    return {
      titulo     : '',
      btnTitulo  : '',
      btnActive  : true,
      urlSubmit  : '',
      form :
      {
        name          : '',
        active        : '1',
        tipoForm      : '',
      }
    }
  },
  props:['tipoForm', 'Tipo', 'visible', 'handleClose'],

  methods: {
    notificacao(msg, type)
    {
      this.$notify({ title: 'Ngestor',  message: msg,  type: type });
    },

    submit()
    {
        this.btnActive = true;

        axios.post(this.urlSubmit, this.form).then(function (resp)
        {
          this.$emit('RELOAD');
          if (this.tipoForm === 'nova') {
            this.notificacao('Cadastrado com sucesso!', 'success');
          } else {
            this.notificacao('Alterado com sucesso!', 'success');
          }
          this.btnActive = false;
          this.handleClose();

        }.bind(this))
          .catch(function (error)
          {
            this.btnActive = false;

            this.$alertaValidacao(error);

          }.bind(this));

    },
  },
  watch:
  {
    visible()
    {
      if(this.visible)
      {
        if(this.tipoForm === 'nova')
        {
          this.titulo      = 'Novo Tipo';
          this.btnTitulo   = 'Salvar';
          this.urlSubmit   = 'estoque/material/novoTipo';
          this.btnActive   = false;
          this.form.name   = '';
          this.form.active = '1';
          this.form.tipoForm = this.tipoForm;

        }

        if(this.tipoForm === 'update')
        {
          this.titulo      = 'Editar Tipo';
          this.btnTitulo   = 'Atualizar';
          this.urlSubmit   = 'estoque/material/updateTipo/' + this.Tipo.id;
          this.btnActive   = false;
          this.form.name   = this.Tipo.name;
          this.form.active = ''+this.Tipo.active;
          this.form.tipoForm = this.tipoForm;

        }
      }
    }
  }
}

</script>

