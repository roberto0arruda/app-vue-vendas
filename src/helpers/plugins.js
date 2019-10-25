export default {
  install(vue, opts)
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

      this.$notify({title: 'Alerta', message: msg, type: 'warning', dangerouslyUseHTMLString: true});
    };


    vue.prototype.$jsonLog = function (obj)
    {
      try{
        console.log( JSON.stringify(obj, null, 2));
      }catch (e) {
        console.log("Não foi possivel converter com jonLog");
      }
    }

  }
}
