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
          <label class="col-sm-2 control-label">Nome:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o Nome"
                   v-model="form.name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">E-mail:</label>
          <div class="col-sm-10">
            <input type="email"
                   class="form-control"
                   placeholder="Informe o E-mail"
                   v-model="form.email">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Senha:</label>
          <div class="col-sm-10">
            <input type="password"
                   class="form-control"
                   placeholder="Informe o senha"
                   v-model="form.password">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">CEP:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o CEP"
                   v-model="form.cep"
                   @keyup="onKeyup" @keydown="onKeydown($event)"
                   v-mask="'#####-###'">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Rua:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe a rua"
                   v-model="form.street">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Nº:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o nº"
                   v-model="form.number"
                   ref="number">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Bairro:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o bairro"
                   v-model="form.neighborhood">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Cidade:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe a cidade"
                   v-model="form.city">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">Estado:</label>
          <div class="col-sm-10">
            <input type="text"
                   class="form-control"
                   placeholder="Informe o estado"
                   v-model="form.state">
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
        name         : '',
        email        : '',
        password     : '',
        cep          : '',
        street       : '',
        number       : '',
        neighborhood : '',
        city         : '',
        state        : ''
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
    // Buscar endereço por CEP
    onKeydown: function(e) {
      if (
              // permite somente numeros
              (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) ||
              // permite teclas lado direito, esquerdo, delete, backspace, tab e enter
              /^(8|9|13|46|37|39|17)$/.test(e.keyCode) ||
              // permite ctrl+ c,v,x,a,z
              /^(67|86|88|65|90)$/.test(e.keyCode) && e.ctrlKey
      ) return;
      e.preventDefault();
      e.stopPropagation();
    },
    onKeyup: function() {
      this.form.street = '';
      this.form.neighborhood = '';
      this.form.city = '';
      this.form.state = '';
      this.form.number = '';
      let cep = this.form.cep.replace("-", "");
      if (!(/^[0-9]{8}$/).test(cep)) return;
      this.$http.get(`https://api.postmon.com.br/v1/cep/${cep}`).then(function (result) {

        this.form.street = result.data.logradouro;
        this.form.neighborhood = result.data.bairro;
        this.form.city = result.data.cidade;
        this.form.state = result.data.estado;
        this.$refs.number.focus();
      }.bind(this))
              .catch(function () {
                this.$notify({title: 'Alerta', message: '- CEP Inválido!', type: 'error', dangerouslyUseHTMLString: true});
              }.bind(this));
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
          this.titulo        = 'Novo Usuario';
          this.btnTitulo     = 'Salvar';
          this.urlSubmit     = this.$urlAPI+'novo-usuario';
          this.btnActive     = false;
          this.form.name          = '';
          this.form.email         = '';
          this.form.password      = '';
          this.form.cep           = '';
          this.form.street        = '';
          this.form.number        = '';
          this.form.neighborhood  = '';
          this.form.city          = '';
          this.form.state         = '';
          this.form.tipoForm = this.tipoForm;

        }

        if(this.tipoForm === 'update')
        {
          this.titulo        = 'Editar Usuario';
          this.btnTitulo     = 'Atualizar';
          this.urlSubmit     = this.$urlAPI+'update-usuario/' + this.dados.id;
          this.btnActive     = false;
          this.form.name          = this.dados.name;
          this.form.email         = this.dados.email;
          this.form.password      = this.dados.password;
          this.form.cep           = this.dados.cep;
          this.form.street        = this.dados.street;
          this.form.number        = this.dados.number;
          this.form.neighborhood  = this.dados.neighborhood;
          this.form.city          = this.dados.city;
          this.form.state         = this.dados.state;
          this.form.tipoForm = this.tipoForm;

        }
      }
    }
  }
}

</script>

