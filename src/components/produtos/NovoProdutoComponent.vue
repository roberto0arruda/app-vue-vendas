<template>

<el-dialog
  :title="titulo"
  :visible.sync="visible"
  :before-close="handleClose"
  style="padding: 0;"
  top="1"
  width="600px">

  <div class="box box-info">

    <form class="form-horizontal">

      <div class="box-body">

        <div class="form-group">
          <label class="col-sm-2 control-label">Código:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o Código"
                   v-model="form.cod_product">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Nome:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o nome"
                   v-model="form.name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Preço:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o preço"
                   v-model="form.price"
                   v-money="money">
          </div>
        </div>

      </div>

    </form>
  </div>

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" :loading="btnActive" @click="submit"><i class="el-icon-success"></i> {{btnTitulo}}</el-button>
  </span>
</el-dialog>

</template>

<script>
import {VMoney} from 'v-money';
export default
{
  data()
  {
    return {
      user: false,
      titulo     : '',
      btnTitulo  : '',
      btnActive  : true,
      urlSubmit  : '',
      form :
      {
        cod_product : '',
        name        : '',
        price       : '',
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    }
  },
  props:['tipoForm', 'dados', 'visible', 'handleClose'],

  methods: {
    notificacao(msg, type)
    {
      this.$notify({ title: 'AppVendas',  message: msg,  type: type });
    },
    submit()
    {
        this.btnActive = true;

        this.$http.post(this.urlSubmit, this.form, {headers: {"Authorization":"Bearer " + this.user.token}}).then(function ()
        {
          this.$emit('RELOAD');
          if (this.tipoForm === 'novo') {
            this.notificacao('Cadastrado com sucesso!', 'success');
          } else {
            this.notificacao('Alterado com sucesso!', 'success');
          }
          this.handleClose();

        }.bind(this))
          .catch(function (error)
          {

            this.$alertaValidacao(error);

          }.bind(this)).finally(()=>{
            this.btnActive = false;
        });

    },
  },
  watch:
  {
    visible()
    {
      let userAux = sessionStorage.getItem('user');
      if (userAux) {
        this.user = JSON.parse(userAux);
      }
      if(this.visible)
      {
        if(this.tipoForm === 'novo')
        {
          this.titulo        = 'Novo Produto';
          this.btnTitulo     = 'Salvar';
          this.urlSubmit     = this.$urlAPI+'novo-produto';
          this.btnActive     = false;
          this.form.cod_product  = '';
          this.form.name         = '';
          this.form.price        = '';
          this.form.tipoForm     = this.tipoForm;

        }

        if(this.tipoForm === 'update')
        {
          this.titulo        = 'Editar Produto';
          this.btnTitulo     = 'Atualizar';
          this.urlSubmit     = this.$urlAPI+'update-produto/' + this.dados.id;
          this.btnActive     = false;
          this.form.cod_product  = this.dados.cod_product;
          this.form.name         = this.dados.name;
          this.form.price        = this.dados.price;
          this.form.tipoForm     = this.tipoForm;

        }
      }
    }
  },
  directives: {money: VMoney}
}

</script>

