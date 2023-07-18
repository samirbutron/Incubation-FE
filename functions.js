$(document).ready(function () {
    $('#tabla-vehiculos').hide();
    loadPersonas();
});

var showingVehicles = false;
$('#toggle-PV').click(function() {
    if (showingVehicles) {
        // Si estaba mostrando vehículos, ahora mostraremos personas
        $('#tabla-personas').show();
        $('#tabla-vehiculos').hide();
        $('#guardar').text('Registrar persona');
        $(this).text('Mostrar vehículos');
        loadPersonas();
    } else {
        // Si estaba mostrando personas, ahora mostraremos vehículos
        $('#tabla-personas').hide();
        $('#tabla-vehiculos').show();
        $('#guardar').text('Registrar vehiculo');
        $(this).text('Mostrar personas');
        // Ejecutar la función loadVehiculos
        loadVehiculos();
    }
    // Cambiar el estado actual del botón
    showingVehicles = !showingVehicles;
});

//Funcion para cargar los datos de vehiculos
function loadVehiculos() {
    $.ajax({
        //Tipo de consulta
        type: 'get',
        //URI
        url: 'http://localhost:8010/vehiculo/listar',
        //Establecer tipo de contenido
        contentType: 'application/json; charset=utf-8',
        //Condicion en caso de exito
        success: function (response) {
            var cuerpo_tabla = '';
            for (let i = 0; i < response.obj.length; i++) {
                //Inyectar HTML a tabla
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + response.obj[i].matricula + '</td>' +
                    '<td>' + response.obj[i].marca + '</td>' +
                    '<td>' + response.obj[i].modelo + '</td>' +
                    '<td>' + response.obj[i].tipo + '</td>' +
                    '<td>' + response.obj[i].velocidad + '</td>' +
                    '<td>' + response.obj[i].precio + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar-vehiculo" data="' + response.obj[i].matricula + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar-vehiculo" data="' + response.obj[i].matricula + '">Eliminar</button>' + '</td>' +
                    '</tr>';
            }
            //console.log(cuerpo_tabla);
            $('#lista-vehiculos').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    });
};

//Funcion para cargar los datos de personas
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
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar-persona" data="' + response.obj[i].curp + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar-persona" data="' + response.obj[i].curp + '">Eliminar</button>' + '</td>' +
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

//Event listener para NavBar button 'guardar'
$('#guardar').click(function () {
    if(showingVehicles){
        //Show Modal 'modal-guardar-vehiculo
        $('#modal-guardar-vehiculo').modal('show');
    }else{
        //Show Modal 'modal-guardar-persona'
        $('#modal-guardar-persona').modal('show');
    }
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
            $('#lista-vehiculos-modal').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    }); 
});

//Event listener para button 'boton-guardar-persona'
$('#boton-guardar-persona').click(function () {
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
                    $('#modal-guardar-persona').modal('hide');
                    loadPersonas();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para button 'boton-guardar-vehiculo'
$('#boton-guardar-vehiculo').click(function () {
    let matricula = $('#matriculaInput').val();
    let marca = $('#marcaInput').val();
    let modelo = $('#modeloInput').val();
    let tipo = $('#tipoInput').val();
    let velocidad = $('#velocidadInput').val();
    let precio = $('#precioInput').val();
    let curp = $('#curpInputV').val();

    if (matricula == '') {
        alert("CURP es obligatorio");
    } else if (marca == '') {
        alert('Nombre es requerido');
    } else if (modelo == '') {
        alert("Apellido es obligatorio");
    } else if (tipo == '') {
        alert('Ciudad es obligatorio')
    } else if (velocidad == '') {
        alert('Edad es obligatorio');
    } else if (precio == '') {
        alert('Precio es obligatorio');
    }else {
        var yayson = {
            "matricula": matricula,
            "marca": modelo,
            "modelo": modelo,
            "tipo": tipo,
            "velocidad": velocidad,
            "precio": precio,
            "persona": curp ? { "curp" : curp} : null
        };
        console.log(JSON.stringify(yayson));

        $.ajax({
            type: 'post',
            url: 'http://localhost:8010/vehiculo/guardar',
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.success == false) {
                    alert(response.mensaje);
                } else {
                    alert(response.mensaje);
                    $('#modal-guardar-vehiculo').modal('hide');
                    loadVehiculos();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para obtener datos de Persona a editar
$('#lista-personas').on('click', '#boton-editar-persona', function () {
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
            $('#modal-editar-persona').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar-persona').modal('hide');
        }
    });
});

//Event listener para editar persona
$('#boton-modal-editarPersona').click(function(){
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
                $('#modal-editar-persona').modal('hide');
                alert(respuesta.mensaje);
                loadPersonas();
            },
            error:function() {
                alert('Error al editar persona.');
            }
        });
    }
});

//Event listener para obtener datos de Vehiculo a editar
$('#lista-vehiculos').on('click', '#boton-editar-vehiculo', function () {
    let matricula = $(this).attr('data');
    console.log('Data es: ' + matricula);

    let yayson = { "matricula": matricula };

    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/vehiculo/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {
            console.log(respuesta);
            $('#matriculaEdit').val(respuesta.obj.matricula);
            $('#marcaEdit').val(respuesta.obj.marca);
            $('#modeloEdit').val(respuesta.obj.modelo);
            $('#tipoEdit').val(respuesta.obj.tipo);
            $('#velocidadEdit').val(respuesta.obj.velocidad);
            $('#precioEdit').val(respuesta.obj.precio);
            $('#curpEditV').val(respuesta.obj.persona? respuesta.obj.persona.curp : '');
            $('#modal-editar-vehiculo').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar-vehiculo').modal('hide');
        }
    });
});


//Event listener para editar vehiculo
$('#boton-modal-editarVehiculo').click(function(){
    let matricula = $('#matriculaEdit').val();
    let marca = $('#marcaEdit').val().trim();
    let modelo = $('#modeloEdit').val().trim();
    let tipo = $('#tipoEdit').val().trim();
    let velocidad = $('#velocidadEdit').val().trim();
    let precio = $('#precioEdit').val().trim();
    //Este campo puede ser un CURP o 'vacio'
    let curp = $('#curpEditV').val().trim();

    if (matricula == '') {
        alert('Matricula es obligatorio');
    } else if (marca == '') {
        alert("Marca es obligatorio");
    } else if (modelo == '') {
        alert('Modelo es obligatorio')
    } else if (tipo == '') {
        alert('Tipo es obligatorio');
    } else if (velocidad == '') {
        alert('Velocidad es obligatorio');
    } else if (precio == '') {
        alert('Precio es obligatorio');
    }else {
        var yayson = {
            "matricula": matricula,
            "marca": marca,
            "modelo": modelo,
            "tipo": tipo,
            "velocidad": velocidad,
            "precio": precio,
            "persona": curp ? { "curp" : curp} : null
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type:'post',
            url:"http://localhost:8010/vehiculo/editar",
            data: JSON.stringify(yayson),
            contentType : 'application/json; charset=utf-8',
            success: function(respuesta) {
                $('#modal-editar-vehiculo').modal('hide');
                alert(respuesta.mensaje);
                loadVehiculos();
            },
            error:function() {
                alert('Error al editar vehiculo.');
            }
        });
    }
});

//Event listener para eliminar persona
$('#lista-personas').on('click','#boton-eliminar-persona', function() {
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
                alert(respuesta.mensaje);
                loadPersonas();
            },
            error:function() {
                alert('Error al eliminar persona.');
            }
        });
    }
});

//Event listener para eliminar vehiculo
$('#lista-vehiculos').on('click','#boton-eliminar-vehiculo', function() {
    let matricula = $(this).attr('data');
    console.log("Data es: "+matricula);

    let yayson = { "matricula":matricula };

    if(confirm("¿Deseas borrar este vehiculo del registro?")){
        $.ajax({
            type:'post',
            url:"http://localhost:8010/vehiculo/eliminar",
            data: JSON.stringify(yayson),
            contentType : 'application/json; charset=utf-8',
            success: function(respuesta) {
                alert(respuesta.mensaje);
                loadVehiculos();
            },
            error:function() {
                alert('Error al eliminar vehiculo.');
            }
        });
    }
});