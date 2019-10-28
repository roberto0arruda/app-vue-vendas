export default {
  install(vue)
  {

    vue.prototype.$alertaValidacao = function (error)
    {
      let msg = "";

      try{

        for(let item in error.response.data.errors)
        {
          msg += error.response.data.errors[item][0]+'<br>';
        }

      }catch (e) {
        msg = 'REQUEST ERRO'
      }

      this.$notify({title: 'Alerta', message: msg, type: 'error', dangerouslyUseHTMLString: true});
    };

    vue.prototype.$jsonLog = function (obj)
    {
      try{
        // eslint-disable-next-line no-console
        console.log( JSON.stringify(obj, null, 2));
      }catch (e) {
        // eslint-disable-next-line no-console
        console.log("Não foi possivel converter com jonLog");
      }
    }

  }
}
