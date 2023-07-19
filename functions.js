$(document).ready(function () {
    $('#tabla-clientes').hide();
    $('#buscar').show();
    loadGimnasios();
});

var showingGimnasios = true;
$('#toggle-GC').click(function () {
    if (showingGimnasios) {
        // Si estaba mostrando gimnasios, ahora mostraremos clientes
        $('#tabla-clientes').show();
        $('#tabla-gimnasios').hide();
        $('#buscar').hide();
        $('#guardar').text('Registrar cliente');
        $(this).text('Mostrar gimnasios');
        loadClientes();
    } else {
        // Si estaba mostrando clientes, ahora mostraremos gimnasios
        $('#tabla-clientes').hide();
        $('#tabla-gimnasios').show();
        $('#buscar').show();
        $('#guardar').text('Registrar gimnasio');
        $(this).text('Mostrar clientes');
        loadGimnasios();
    }
    // Cambiar el estado actual del botón
    showingGimnasios = !showingGimnasios;
});

//Function para obtener ganacia
function obtenerGanancia(clientsArr) {
    let gananciaTotal = 0;
    for (let i = 0; i < clientsArr.length; i++) {
        gananciaTotal += clientsArr[i].payment;
    }
    return gananciaTotal;
}

// Evento de escucha para la barra de búsqueda
$('#buscar-ciudad').on('input', function() {
    const busqueda = this.value.toLowerCase(); // Obtener el valor de búsqueda en minúsculas
    // Obtener todas las filas de la tabla de gimnasios
    const filasGimnasios = document.querySelectorAll('#tabla-gimnasios tbody tr');
  
    // Iterar sobre cada fila y verificar si coincide con la búsqueda
    filasGimnasios.forEach(function(fila) {
      const ciudad = fila.querySelector('td:nth-child(2)').textContent.toLowerCase(); // Obtener el nombre de la ciudad en minúsculas desde la segunda celda (índice 2)
      // Comprobar si el nombre de la ciudad contiene el valor de búsqueda
      if (ciudad.includes(busqueda)) {
        fila.style.display = 'table-row'; // Mostrar la fila si coincide
      } else {
        fila.style.display = 'none'; // Ocultar la fila si no coincide
      }
    });
  });
  

//Funcion para cargar los datos de vehiculos
function loadGimnasios() {
    $.ajax({
        //Tipo de consulta
        type: 'get',
        //URI
        url: 'http://localhost:8010/gym/listar',
        //Establecer tipo de contenido
        contentType: 'application/json; charset=utf-8',
        //Condicion en caso de exito
        success: function (response) {
            var cuerpo_tabla = '';
            for (let i = 0; i < response.obj.length; i++) {
                //Inyectar HTML a tabla
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + response.obj[i].id + '</td>' +
                    '<td>' + response.obj[i].city + '</td>' +
                    '<td>' + response.obj[i].county + '</td>' +
                    '<td>' + response.obj[i].street + '</td>' +
                    '<td>' + response.obj[i].antiquity + '</td>' +
                    '<td>' + obtenerGanancia(response.obj[i].clients) + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-info" id="boton-mostrar-clientes" data="' + response.obj[i].id + '">Mostrar clientela</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar-gimnasio" data="' + response.obj[i].id + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar-gimnasio" data="' + response.obj[i].id + '">Eliminar</button>' + '</td>' +
                    '</tr>';
            }
            //console.log(cuerpo_tabla);
            $('#lista-gimnasios').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla de gimnasios');
        }
    });
};

//Funcion para cargar los datos de personas
function loadClientes() {
    $.ajax({
        //Tipo de consulta
        type: 'get',
        //URI
        url: 'http://localhost:8010/cliente/listar',
        //Establecer tipo de contenido
        contentType: 'application/json; charset=utf-8',
        //Condicion en caso de exito
        success: function (response) {
            var cuerpo_tabla = '';
            for (let i = 0; i < response.obj.length; i++) {
                //Inyectar HTML a tabla
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + response.obj[i].curp + '</td>' +
                    '<td>' + response.obj[i].name + '</td>' +
                    '<td>' + response.obj[i].lastName + '</td>' +
                    '<td>' + response.obj[i].membership + '</td>' +
                    '<td>' + response.obj[i].payment + '</td>' +
                    '<td>' + response.obj[i].dob + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-info" id="boton-mostrar-gimnasios" data="' + response.obj[i].curp + '">Mostrar gimnasio</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-success" id="boton-agregar-gimnasio" data="' + response.obj[i].curp + '">Agregar gimnasio</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar-cliente" data="' + response.obj[i].curp + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar-cliente" data="' + response.obj[i].curp + '">Eliminar</button>' + '</td>' +
                    '</tr>';
            }
            //console.log(cuerpo_tabla);
            $('#lista-clientes').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla de clientes');
        }
    });
}

$('#lista-clientes').on('click', '#boton-agregar-gimnasio', function (){
    let curp = $(this).attr('data');
    $('#boton-modal-agregar-gimnasio').attr('data-cliente-curp', curp);
    $('#modal-agregar-gimnasio').modal('show');
});

$('#boton-modal-agregar-gimnasio').click(function(){
    let curp = $(this).attr('data-cliente-curp');
    let id = parseInt($('#gymId-input').val());
    let yayson = {"gym_id": id, "client_curp":curp}
    console.log(yayson);
    $.ajax({
                type: 'post',
                url: 'http://localhost:8010/cliente/inscribir',
                data: JSON.stringify(yayson),
                contentType: 'application/json; charset=utf-8',
                success: function (respuesta) {
                    alert(respuesta.mensaje);
                    $('#modal-agregar-gimnasio').modal('hide');
                },
                error: function () {
                    alert("Error al agregar gimnasio");
                    $('#modal-agregar-gimnasio').modal('hide');
                }
            });
});

//Event listener para NavBar button 'guardar'
$('#guardar').click(function () {
    if (showingGimnasios) {
        //Show Modal 'modal-guardar-vehiculo
        $('#modal-guardar-gimnasio').modal('show');
    } else {
        //Show Modal 'modal-guardar-persona'
        $('#modal-guardar-cliente').modal('show');
    }
});

//Event listener para boton 'gimnasios'
$('#lista-clientes').on('click', '#boton-mostrar-gimnasios', function () {
    //Show modal 'modal-gimnasios
    $('#modal-gimnasios').modal('show');
    var curp = $(this).attr('data');
    let yayson = { "curp": curp };
    console.log(yayson)
    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/cliente/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            gymList = response.obj.gymList;
            var cuerpo_tabla = '';
            for (let i = 0; i < gymList.length; i++) {
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + gymList[i].id + '</td>' +
                    '<td>' + gymList[i].city + '</td>' +
                    '<td>' + gymList[i].county + '</td>' +
                    '<td>' + gymList[i].street + '</td>' +
                    '<td>' + gymList[i].antiquity + '</td>' +
                    '</tr>';
            }
            $('#lista-gimnasios-modal').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    });
});

//Event listener para boton 'clientela'
$('#lista-gimnasios').on('click', '#boton-mostrar-clientes', function () {
    //Show modal 'modal-clientes'
    $('#modal-clientes').modal('show');
    var id = parseInt($(this).attr('data'));
    let yayson = { "id": id };
    console.log(yayson);
    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/gym/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            clientList = response.obj.clients;
            var cuerpo_tabla = '';
            console.log(response);
            for (let i = 0; i < clientList.length; i++) {
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + clientList[i].curp + '</td>' +
                    '<td>' + clientList[i].name + '</td>' +
                    '<td>' + clientList[i].lastName + '</td>' +
                    '<td>' + clientList[i].membership + '</td>' +
                    '<td>' + clientList[i].payment + '</td>' +
                    '<td>' + clientList[i].dob + '</td>' +
                    '</tr>';
            }
            $('#lista-clientes-modal').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    });
});

//Event listener para button 'boton-guardar-cliente'
$('#boton-guardar-cliente').click(function () {
    let curp = $('#curp-input').val();
    let nombre = $('#nombre-input').val();
    let apellido = $('#apellido-input').val();
    let membresia = $('#membresia-input').val();
    let pago = $('#pago-input').val();
    let fecha = $('#dob-input').val();

    if (curp == '') {
        alert("CURP es obligatorio");
    } else if (nombre == '') {
        alert('Nombre es requerido');
    } else if (apellido == '') {
        alert("Apellido es obligatorio");
    } else if (membresia == '') {
        alert('Membresia es obligatorio')
    } else if (pago == '') {
        alert('Edad es obligatorio');
    } else if (fecha == '') {
        alert('Fecha de Nacimiento es obligatorio');
    } else {
        var yayson = {
            "curp": curp,
            "name": nombre,
            "lastName": apellido,
            "membership": membresia,
            "payment": pago,
            "dob": fecha
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type: 'post',
            url: 'http://localhost:8010/cliente/guardar',
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.success == false) {
                    alert(response.mensaje);
                } else {
                    alert(response.mensaje);
                    $('#modal-guardar-cliente').modal('hide');
                    loadClientes();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para button 'boton-guardar-gimnasio'
$('#boton-guardar-gimnasio').click(function () {
    let id = $('#id-input').val();
    let ciudad = $('#ciudad-input').val();
    let colonia = $('#colonia-input').val();
    let calle = $('#calle-input').val();
    let antiguedad = $('#antiguedad-input').val();

    if (id == '') {
        alert("Numero de sucursal es obligatorio");
    } else if (ciudad == '') {
        alert('Ciudad es requerido');
    } else if (colonia == '') {
        alert("Colonia es obligatorio");
    } else if (calle == '') {
        alert('Calle es obligatorio')
    } else if (antiguedad == '') {
        alert('Antiguedad es obligatorio');
    } else {
        var yayson = {
            "id": id,
            "city": ciudad,
            "county": colonia,
            "street": calle,
            "antiquity": antiguedad,
        };
        console.log(JSON.stringify(yayson));

        $.ajax({
            type: 'post',
            url: 'http://localhost:8010/gym/guardar',
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.success == false) {
                    alert(response.mensaje);
                } else {
                    alert(response.mensaje);
                    $('#modal-guardar-gimnasio').modal('hide');
                    loadGimnasios();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para obtener datos de Persona a editar
$('#lista-clientes').on('click', '#boton-editar-cliente', function () {
    let curp = $(this).attr('data');
    console.log('Data es: ' + curp);
    let yayson = { "curp": curp };

    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/cliente/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {
            $('#curp-edit').val(respuesta.obj.curp);
            $('#nombre-edit').val(respuesta.obj.name);
            $('#apellido-edit').val(respuesta.obj.lastName);
            $('#membresia-edit').val(respuesta.obj.membership);
            $('#pago-edit').val(respuesta.obj.payment);
            $('#dob-edit').val(respuesta.obj.dob);
            $('#modal-editar-cliente').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar-cliente').modal('hide');
        }
    });
});

//Event listener para editar persona
$('#boton-modal-editar-cliente').click(function () {
    let curp = $('#curp-edit').val();
    let nombre = $('#nombre-edit').val().trim();
    let apellido = $('#apellido-edit').val().trim();
    let membresia = $('#membresia-edit').val().trim();
    let pago = $('#pago-edit').val().trim();
    let fecha = $('#dob-edit').val().trim();

    if (curp == '') {
        alert("CURP es obligatorio");
    } else if (nombre == '') {
        alert('Nombre es requerido');
    } else if (apellido == '') {
        alert("Apellido es obligatorio");
    } else if (membresia == '') {
        alert('Membresia es obligatorio')
    } else if (pago == '') {
        alert('Edad es obligatorio');
    } else if (fecha == '') {
        alert('Fecha de Nacimiento es obligatorio');
    } else {
        var yayson = {
            "curp": curp,
            "name": nombre,
            "lastName": apellido,
            "membership": membresia,
            "payment": pago,
            "dob": fecha
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/cliente/editar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                $('#modal-editar-cliente').modal('hide');
                alert(respuesta.mensaje);
                loadClientes();
            },
            error: function () {
                alert('Error al editar persona.');
            }
        });
    }
});

//Event listener para obtener datos de gimnasio a editar
$('#lista-gimnasios').on('click', '#boton-editar-gimnasio', function () {
    let id = $(this).attr('data');
    console.log('Data es: ' + id);

    let yayson = { "id": id };

    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/gym/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {
            console.log(respuesta);
            $('#id-edit').val(respuesta.obj.id);
            $('#ciudad-edit').val(respuesta.obj.city);
            $('#colonia-edit').val(respuesta.obj.county);
            $('#calle-edit').val(respuesta.obj.street);
            $('#antiguedad-edit').val(respuesta.obj.antiquity);
            $('#modal-editar-gimnasio').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar-gimnasio').modal('hide');
        }
    });
});


//Event listener para editar gimnasio
$('#boton-modal-editar-gimnasio').click(function () {
    let id = $('#id-edit').val();
    let ciudad = $('#ciudad-edit').val().trim();
    let colonia = $('#colonia-edit').val().trim();
    let calle = $('#calle-edit').val().trim();
    let antiguedad = $('#antiguedad-edit').val();

    if (id == '') {
        alert('Numero de sucursal es obligatorio');
    } else if (ciudad == '') {
        alert("Ciudad es obligatorio");
    } else if (colonia == '') {
        alert('Colonia es obligatorio')
    } else if (calle == '') {
        alert('Calle es obligatorio');
    } else if (antiguedad == '') {
        alert('Antiguedad es obligatorio');
    } else {
        var yayson = {
            "id": id,
            "city": ciudad,
            "county": colonia,
            "street": calle,
            "antiquity": antiguedad,
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/gym/editar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                $('#modal-editar-gimnasio').modal('hide');
                alert(respuesta.mensaje);
                loadGimnasios();
            },
            error: function () {
                alert('Error al editar gimnasio.');
            }
        });
    }
});

//Event listener para eliminar cliente
$('#lista-clientes').on('click', '#boton-eliminar-cliente', function () {
    let curp = $(this).attr('data');
    console.log("Data es: " + curp);

    let yayson = { "curp": curp };

    if (confirm("¿Deseas borrar este cliente del registro?")) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/cliente/eliminar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                alert(respuesta.mensaje);
                loadClientes();
            },
            error: function () {
                alert('Error al eliminar cliente.');
            }
        });
    }
});

//Event listener para eliminar vehiculo
$('#lista-gimnasios').on('click', '#boton-eliminar-gimnasio', function () {
    let id = $(this).attr('data');
    console.log("Data es: " + id);

    let yayson = { "id": id };

    if (confirm("¿Deseas borrar este gimnasio del registro?")) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/gym/eliminar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                alert(respuesta.mensaje);
                loadGimnasios();
            },
            error: function () {
                alert('Error al eliminar gimnasio.');
            }
        });
    }
});