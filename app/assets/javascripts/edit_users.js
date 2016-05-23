$(document).ready(function(){
  var locaciones = []
  $.when(PopulateUbigeos(locaciones)).done(Ubigeos.departamentos($('#departamento'),locaciones[2]))

  $('#departamento').on('change',function(e){
    e.preventDefault();
    var departamento = $(this).find(':selected').val();
    $('#provincia').empty()
    $.when(Ubigeos.provincias(departamento, $('#provincia'),locaciones[1])).done($('.provincia').show())
  });
  $('#provincia').on('change',function(e){
    e.preventDefault();
    var provincia = $(this).find(':selected').val();
    $('#distrito').empty()
    $.when(Ubigeos.distritos(provincia, $('#distrito'),locaciones[0])).done($('.distrito').show())
  });
  $('#distrito').change(function(e){
    e.preventDefault();
    var optionSelected = $("option:selected", this);
    var distrito= this.value;
    $('#user_ubigeo_id').val(distrito)
  });
});
var Ubigeos = {
  departamentos: function(selector, id){
    var jsonUrl = "http://0.0.0.0:3000/ubigeo/get/departamentos.json"
    $.getJSON(jsonUrl).done (function(data){
      $.when(PopulateCallback(data,selector)).then(selectDep(id))
    })  
  },
  provincias: function(id, selector, prov_id){
    var jsonUrl = "http://0.0.0.0:3000/ubigeo/get/provincias/"+id+".json"
    $('#provincia').append('<option value = "default" selected>Seleccione una Provincia</option>')
    $.getJSON(jsonUrl).done(function(data){
      $.when(PopulateCallback(data, selector)).then(selectProv(prov_id))
    })
  },
  distritos: function(id, selector, dis_id){
    var jsonUrl = "http://0.0.0.0:3000/ubigeo/get/distritos/"+id+".json"
    $('#distrito').append('<option value = "default" selected>Seleccione un Distrito</option>')
    $.getJSON(jsonUrl).done(function(data){
      $.when(PopulateCallback(data, selector)).then(selectDis(dis_id))
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
function PopulateUbigeos(arreglo){
  var distrito_id = $('#user_ubigeo_id').val()
  var largo = distrito_id.length
  if (largo === 6){
    var provincia_id = distrito_id.slice(0,4)
    var departamento_id = provincia_id.slice(0,2)
  }
  else{
    var provincia_id = distrito_id.slice(0,3)
    var departamento_id = provincia_id.slice(0,1)
  }
  arreglo.push(distrito_id)
  arreglo.push(provincia_id)
  arreglo.push(departamento_id)
}

function selectDep(id){
  $('#departamento option[value="'+id+'"]').prop('selected', 'selected').trigger('change')
}
function selectProv(id){
  $('#provincia option[value="'+id+'"]').prop('selected', 'selected').trigger('change')
}
function selectDis(id){
  $('#distrito option[value="'+id+'"]').prop('selected', 'selected').trigger('change')
}