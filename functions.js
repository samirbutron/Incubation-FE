$(document).ready(function () {
    loadPersonas();
});

//Funcion para cargar los datos de la tabla
function loadPersonas() {
    $.ajax({
        //Tipo de consulta
        type: 'get',
        //URI
        url: 'http://localhost:8010/persona/listar',
        //Establecer tipo de contenido
        contentType: 'application/json; charset=utf-8',
        //Condicion en caso de exito
        success: function (response) {
            var cuerpo_tabla = '';
            for (let i = 0; i < response.obj.length; i++) {
                //Inyectar HTML a tabla
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + response.obj[i].curp + '</td>' +
                    '<td>' + response.obj[i].nombre + '</td>' +
                    '<td>' + response.obj[i].apellido + '</td>' +
                    '<td>' + response.obj[i].ciudad + '</td>' +
                    '<td>' + response.obj[i].edad + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-info" id="boton-vehiculos" data="' + response.obj[i].curp + '">Vehiculos</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar" data="' + response.obj[i].curp + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar" data="' + response.obj[i].curp + '">Eliminar</button>' + '</td>' +
                    '</tr>';
            }
            //console.log(cuerpo_tabla);
            $('#lista-personas').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    });
}

//Event listener para NavBar button 'abrir-guardar'
$('.abrir-guardar').click(function () {
    //Show Modal 'modal-guardar'
    $('#modal-guardar').modal('show');
});

//Event listener para boton 'vehiculos'
$('#lista-personas').on('click', '#boton-vehiculos', function () {
    //Show modal 'modal-vehiculos
    $('#modal-vehiculos').modal('show');

    var curp = $(this).attr('data');
    $.ajax({
        type:'get',
        url:'http://localhost:8010/vehiculo/listar',
        contentType:'application/json charset=utf-8',
        success: function (response) {
            var cuerpo_tabla = '';
            console.log(response);
            console.log(response.obj[1].persona.curp);
            console.log(curp);
            for (let i = 0; i < response.obj.length; i++) {
                if (response.obj[i].persona && response.obj[i].persona.curp !== null) {
                    if (curp === response.obj[i].persona.curp) {
                        cuerpo_tabla += '<tr class="text-center">' +
                            '<td>' + response.obj[i].matricula + '</td>' +
                            '<td>' + response.obj[i].marca + '</td>' +
                            '<td>' + response.obj[i].modelo + '</td>' +
                            '<td>' + response.obj[i].tipo + '</td>' +
                            '<td>' + response.obj[i].velocidad + '</td>' +
                            '<td>' + response.obj[i].precio + '</td>' +
                            '</tr>';
                    }
                }
            }
            $('#lista-vehiculos').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    }); 
});

//Event listener para button 'boton-guardar'
$('#boton-guardar-modal').click(function () {
    let curp = $('#curpInput').val();
    let nombre = $('#nombreInput').val();
    let apellido = $('#apellidoInput').val();
    let ciudad = $('#ciudadInput').val();
    let edad = $('#edadInput').val();

    if (curp == '') {
        alert("CURP es obligatorio");
    } else if (nombre == '') {
        alert('Nombre es requerido');
    } else if (apellido == '') {
        alert("Apellido es obligatorio");
    } else if (ciudad == '') {
        alert('Ciudad es obligatorio')
    } else if (edad == '') {
        alert('Edad es obligatorio');
    } else {
        var yayson = {
            "curp": curp,
            "nombre": nombre,
            "apellido": apellido,
            "ciudad": ciudad,
            "edad": edad,
        };
        console.log(JSON.stringify(yayson));

        $.ajax({
            type: 'post',
            url: 'http://localhost:8010/persona/guardar',
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.success == false) {
                    alert(response.mensaje);
                } else {
                    //alert(response.mensaje);
                    $('#modal-guardar').modal('hide');
                    loadPersonas();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para obtener datos de Persona a editar
$('#lista-personas').on('click', '#boton-editar', function () {
    let curp = $(this).attr('data');
    console.log('Data es: ' + curp);

    let yayson = { "curp": curp };

    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/persona/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {
            $('#curpEdit').val(respuesta.obj.curp);
            $('#nombreEdit').val(respuesta.obj.nombre);
            $('#apellidoEdit').val(respuesta.obj.apellido);
            $('#ciudadEdit').val(respuesta.obj.ciudad);
            $('#edadEdit').val(respuesta.obj.edad);
            $('#modal-editar').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar').modal('hide');
        }
    });
});

$('#boton-editar-modal').click(function(){
    let curp = $('#curpEdit').val();
    let nombre = $('#nombreEdit').val().trim();
    let apellido = $('#apellidoEdit').val().trim();
    let ciudad = $('#ciudadEdit').val().trim();
    let edad = $('#edadEdit').val().trim();

    if (nombre == '') {
        alert('Nombre es obligatorio');
    } else if (apellido == '') {
        alert("Apellido es obligatorio");
    } else if (ciudad == '') {
        alert('Ciudad es obligatorio')
    } else if (edad == '') {
        alert('Edad es obligatorio');
    } else {
        var yayson = {
            "curp": curp,
            "nombre": nombre,
            "apellido": apellido,
            "ciudad": ciudad,
            "edad": edad,
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type:'post',
            url:"http://localhost:8010/persona/editar",
            data: JSON.stringify(yayson),
            contentType : 'application/json; charset=utf-8',
            success: function(respuesta) {
                $('#modal-editar').modal('hide');
                alert(respuesta.mensaje);
                loadPersonas();
            },
            error:function() {
                alert('Error al editar persona.');
            }
        });
    }
});

$('#lista-personas').on('click','#boton-eliminar', function() {
    let curp = $(this).attr('data');
    console.log("Data es: "+curp);

    let yayson = { "curp":curp };

    if(confirm("¿Deseas borrar esta persona del registro?")){
        $.ajax({
            type:'post',
            url:"http://localhost:8010/persona/eliminar",
            data: JSON.stringify(yayson),
            contentType : 'application/json; charset=utf-8',
            success: function(respuesta) {
                $('#modal-editar').modal('hide');
                alert(respuesta.mensaje);
                loadPersonas();
            },
            error:function() {
                alert('Error al eliminar persona.');
            }
        });
    }
});