$(document).ready(function(){
  var departamentos = new Ubigeos.departamentos($('#departamento'))
  $('#departamento').on('change',function(e){
    e.preventDefault();
    var departamento = $(this).find(':selected').val();
    $('#provincia').empty()
    $.when(Ubigeos.provincias(departamento, $('#provincia'))).done($('.provincia').show())
  });
  $('#provincia').on('change',function(e){
    e.preventDefault();
    var provincia = $(this).find(':selected').val();
    $('#distrito').empty()
    $.when(Ubigeos.distritos(provincia, $('#distrito'))).done($('.distrito').show())
  });
   $('#distrito').change(function(e){
    e.preventDefault();
    var optionSelected = $("option:selected", this);
    var distrito= this.value;
    $('#user_ubigeo_id').val(distrito)
  });
});

var Ubigeos = {
  departamentos: function(selector){
    var jsonUrl = "http://0.0.0.0:3000/ubigeo/get/departamentos.json"
    $.getJSON(jsonUrl).done (function(data){
    PopulateCallback(data,selector)
    })  
  },
  provincias: function(id, selector){
    var jsonUrl = "http://0.0.0.0:3000/ubigeo/get/provincias/"+id+".json"
    $('#provincia').append('<option value = "default" selected>Seleccione una Provincia</option>')
    $.getJSON(jsonUrl).done(function(data){
      PopulateCallback(data, selector)
    })
  },
  distritos: function(id, selector){
    var jsonUrl = "http://0.0.0.0:3000/ubigeo/get/distritos/"+id+".json"
    $('#distrito').append('<option value = "default" selected>Seleccione un Distrito</option>')
    $.getJSON(jsonUrl).done(function(data){
      PopulateCallback(data, selector)
    })
  }
}
function PopulateCallback(data, selector){
  $.each(data, function(i,obj){
    var option = $('<option />');
    option.attr('value', obj.ubigeo_id).text(obj.name);
    selector.append(option);
  });
}
