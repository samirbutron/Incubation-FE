$(document).ready(function () {
    $('#tabla-series').hide();
    $('#seriesLanzadasAño').hide();
    $('#buscarProductora').hide();
    $('#posteriorAFecha').hide();
    loadPlataformas();
});

var showingPlataformas = true;
$('#toggle').click(function () {
    if (showingPlataformas) {
        // Si estaba mostrando plataformas, ahora mostraremos series
        $('#buscarProductora').show();
        $('#posteriorAFecha').show();
        $('#seriesLanzadasAño').show();
        $('#tabla-series').show();
        $('#tabla-plataformas').hide();
        $('#guardar').text('Registrar serie');
        $(this).text('Mostrar plataformas');
        loadSeries();
    } else {
        // Si estaba mostrando series, ahora mostraremos plataformas
        $('#buscarProductora').hide();
        $('#posteriorAFecha').hide();
        $('#seriesLanzadasAño').hide();
        $('#tabla-series').hide();
        $('#tabla-plataformas').show();
        $('#guardar').text('Registrar plataforma');
        $(this).text('Mostrar series');
        loadPlataformas();
    }
    // Cambiar el estado actual del botón
    showingPlataformas = !showingPlataformas;
});

//Funcion para encontrar plataforma con mas episodios:
$('#buscarPcmE').click(function() {
    $.ajax({
        type: 'get',
        url : 'http://localhost:8010/plataforma/listar',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let platformWithMostEpisodes = null;
            let maxEpisodes = 0;

            for (const platform of response.obj) {
                let totalEpisodes = platform.series.reduce((sum, series) => sum + series.episodios, 0);
                if (totalEpisodes > maxEpisodes) {
                    maxEpisodes = totalEpisodes;
                    platformWithMostEpisodes = platform;
                }
            }
            if (platformWithMostEpisodes) {
                console.log(platformWithMostEpisodes);
                alert("plataforma con mas episodios: " + platformWithMostEpisodes.nombre);
            }
        },
        error: function () {
            alert('Error al obtener la plataforma con mas episodios')
        }
    });
});
//Serie en mas plataformas
$('#buscarSemP').click(function() {
    $.ajax({
        type: 'get',
        url : 'http://localhost:8010/serie/listar',
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            let serieWithMostPlatforms = null;
            let maxPlatforms = 0;

            for (const serie of response.obj) {
                let totalPlatforms = serie.plataformas.length;
                if (totalPlatforms > maxPlatforms) {
                    maxPlatforms = totalPlatforms;
                    serieWithMostPlatforms = serie;
                }
            }
            if (serieWithMostPlatforms) {
                console.log(serieWithMostPlatforms);
                alert("Serie in mas plataformas: " + serieWithMostPlatforms.titulo);
            }
        },
        error: function () {
            alert('Error al obtener la plataforma con mas episodios')
        }
    });
});
//La series por productora
$('#buscarProductora').on('input', function () {
    const inputValue = $(this).val().toLowerCase(); // Convert the input value to lowercase for case-insensitive filtering
    const selectedColumns = [2]; // Modify this array to include the indices of the columns you want to filter by (0-based)
    $('#lista-series tr').each(function () {
        const row = $(this);
        let shouldShow = false;

        selectedColumns.forEach(column => {
            const columnValue = row.find(`td:eq(${column})`).text().toLowerCase();
            if (columnValue.includes(inputValue)) {
                shouldShow = true;
                return false; // Exit the forEach loop early
            }
        });

        // Show/hide the row based on the filtering result
        row.toggle(shouldShow);
    });
});
//Series posteriores a una fechaLanzamiento
$('#posteriorAFecha').on('input', function () {
    const inputValue = $(this).val();
    const selectedColumn = [5];
    const fechaInput = new Date(inputValue);

    if(!inputValue){
        loadSeries();
    }
    
    $('#lista-series tr').each(function () {
        const row = $(this);
        let shouldShow = false;
        selectedColumn.forEach(column => {
            const columnValue = row.find(`td:eq(${column})`).text().trim();
            const fechaLanzamiento = new Date(columnValue);
            if (!isNaN(fechaLanzamiento) && fechaLanzamiento > fechaInput) {
                shouldShow = true;
                return false; // Exit the forEach loop early
            }
        });
        // Show/hide the row based on the filtering result
        row.toggle(shouldShow);
    });
});
//Series lanzadas en un año
$('#seriesLanzadasAño').on('input', function () {
    const inputYear = parseInt($(this).val());
    const selectedColumn = [5]; // Modify this array to include the indices of the columns you want to filter by (0-based)

    if(!inputYear){
        loadSeries();
    }

    $('#lista-series tr').each(function () {
        const row = $(this);
        let shouldShow = false;
        selectedColumn.forEach(column => {
            const columnValue = row.find(`td:eq(${column})`).text().trim();
            console.log(columnValue);
            const year = parseInt(columnValue.split('-')[0]); //Obtener año
            console.log(inputYear);
            console.log(year);
            if (year === inputYear) {
                    shouldShow = true;
                    return false; // Exit the forEach loop early
            }
        });
        // Show/hide the row based on the filtering result
        row.toggle(shouldShow);
    });
});

//Funcion para cargar los datos de plataforma
function loadPlataformas() {
    $.ajax({
        //Tipo de consulta
        type: 'get',
        //URI
        url: 'http://localhost:8010/plataforma/listar',
        //Establecer tipo de contenido
        contentType: 'application/json; charset=utf-8',
        //Condicion en caso de exito
        success: function (response) {
            var cuerpo_tabla = '';
            for (let i = 0; i < response.obj.length; i++) {
                //Inyectar HTML a tabla
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + response.obj[i].id + '</td>' +
                    '<td>' + response.obj[i].nombre + '</td>' +
                    '<td>' + response.obj[i].fechaApertura + '</td>' +
                    '<td>' + response.obj[i].ganancias + '</td>' +
                    '<td>' + response.obj[i].paisOrigen + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-secondary" id="boton-mostrar-series" data="' + response.obj[i].id + '">Mostrar series</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-outline-success" id="boton-agregar-serie" data="' + response.obj[i].id + '">Agregar Serie</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-outline-danger" id="boton-quitar-serie" data="' + response.obj[i].id + '">Quitar Serie</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar-plataforma" data="' + response.obj[i].id + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar-plataforma" data="' + response.obj[i].id + '">Eliminar</button>' + '</td>' +
                    '</tr>';
            }
            //console.log(cuerpo_tabla);
            $('#lista-plataformas').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla de plataformas');
        }
    });
};

//Funcion para cargar los datos de series
function loadSeries() {
    $.ajax({
        //Tipo de consulta
        type: 'get',
        //URI
        url: 'http://localhost:8010/serie/listar',
        //Establecer tipo de contenido
        contentType: 'application/json; charset=utf-8',
        //Condicion en caso de exito
        success: function (response) {
            var cuerpo_tabla = '';
            for (let i = 0; i < response.obj.length; i++) {
                //Inyectar HTML a tabla
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + response.obj[i].id + '</td>' +
                    '<td>' + response.obj[i].titulo + '</td>' +
                    '<td>' + response.obj[i].productora + '</td>' +
                    '<td>' + response.obj[i].temporadas + '</td>' +
                    '<td>' + response.obj[i].episodios + '</td>' +
                    '<td>' + response.obj[i].fechaLanzamiento + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-secondary" id="boton-mostrar-plataformas" data="' + response.obj[i].id + '">Mostrar plataforma</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar-serie" data="' + response.obj[i].id + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar-serie" data="' + response.obj[i].id + '">Eliminar</button>' + '</td>' +
                    '</tr>';
            }
            //console.log(cuerpo_tabla);
            $('#lista-series').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla de series');
        }
    });
}

//Funcion para obtener Id de serie a agregar
$('#lista-plataformas').on('click', '#boton-agregar-serie', function (){
    let id = $(this).attr('data');
    $('#boton-modal-agregar-serie').attr('data-plataforma-id', id);
    $('#modal-agregar-serie').modal('show');
});

//Funcion para agregar serie a plataforma
$('#boton-modal-agregar-serie').click(function(){
    let plataforma_id = $(this).attr('data-plataforma-id');
    let serie_id = parseInt($('#serieId-agregar-input').val());
    let yayson = {"plataforma_id": plataforma_id, "serie_id":serie_id}
    console.log(yayson);
    $.ajax({
                type: 'post',
                url: 'http://localhost:8010/plataforma/subscribir',
                data: JSON.stringify(yayson),
                contentType: 'application/json; charset=utf-8',
                success: function (respuesta) {
                    alert(respuesta.mensaje);
                    $('#modal-agregar-serie').modal('hide');
                },
                error: function () {
                    alert("Error al agregar plataforma");
                    $('#modal-agregar-serie').modal('hide');
                }
            });
});

//Funcion para obtener Id de serie a quitar
$('#lista-plataformas').on('click', '#boton-quitar-serie', function (){
    let id = $(this).attr('data');
    $('#boton-modal-quitar-serie').attr('data-plataforma-id', id);
    $('#modal-quitar-serie').modal('show');
});

//Funcion para quitar serie a plataforma
$('#boton-modal-quitar-serie').click(function(){
    let plataforma_id = $(this).attr('data-plataforma-id');
    let serie_id = parseInt($('#serieId-quitar-input').val());
    let yayson = {"plataforma_id": plataforma_id, "serie_id":serie_id}
    console.log(yayson);
    $.ajax({
                type: 'post',
                url: 'http://localhost:8010/plataforma/desuscribir',
                data: JSON.stringify(yayson),
                contentType: 'application/json; charset=utf-8',
                success: function (respuesta) {
                    alert(respuesta.mensaje);
                    $('#modal-quitar-serie').modal('hide');
                },
                error: function () {
                    alert("Error al agregar plataforma");
                    $('#modal-quitar-serie').modal('hide');
                }
            });
});

//Event listener para NavBar button 'guardar'
$('#guardar').click(function () {
    if (showingPlataformas) {
        //Show Modal 'modal-guardar-vehiculo
        $('#modal-guardar-plataforma').modal('show');
    } else {
        //Show Modal 'modal-guardar-serie'
        $('#modal-guardar-serie').modal('show');
    }
});

//Event listener para boton 'plataformas'
$('#lista-series').on('click', '#boton-mostrar-plataformas', function () {
    //Show modal 'modal-plataformas
    $('#modal-plataformas').modal('show');
    var id = $(this).attr('data');
    let yayson = { "id": id };
    console.log(yayson)
    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/serie/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            plataformaList = response.obj.plataformas;
            var cuerpo_tabla = '';
            for (let i = 0; i < plataformaList.length; i++) {
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + plataformaList[i].id + '</td>' +
                    '<td>' + plataformaList[i].nombre + '</td>' +
                    '<td>' + plataformaList[i].fechaApertura + '</td>' +
                    '<td>' + plataformaList[i].ganancias + '</td>' +
                    '<td>' + plataformaList[i].paisOrigen + '</td>' +
                    '</tr>';
            }
            $('#lista-plataformas-modal').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    });
});

//Event listener para boton 'series'
$('#lista-plataformas').on('click', '#boton-mostrar-series', function () {
    //Show modal 'modal-series'
    $('#modal-series').modal('show');
    var id = parseInt($(this).attr('data'));
    let yayson = { "id": id };
    console.log(yayson);
    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/plataforma/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            seriesList = response.obj.series;
            var cuerpo_tabla = '';
            console.log(response);
            for (let i = 0; i < seriesList.length; i++) {
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + seriesList[i].id + '</td>' +
                    '<td>' + seriesList[i].titulo + '</td>' +
                    '<td>' + seriesList[i].productora + '</td>' +
                    '<td>' + seriesList[i].temporadas + '</td>' +
                    '<td>' + seriesList[i].episodios + '</td>' +
                    '<td>' + seriesList[i].fechaLanzamiento + '</td>' +
                    '</tr>';
            }
            $('#lista-series-modal').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    });
});

//Event listener para button 'boton-guardar-serie'
$('#boton-guardar-serie').click(function () {
    let id = $('#idSerie-input').val();
    let titulo = $('#titulo-input').val();
    let productora = $('#productora-input').val();
    let temporadas = $('#temporadas-input').val();
    let episodios = $('#episodios-input').val();
    let fechaLanzamiento = $('#fechaLanzamiento-input').val();

    if (id == '') {
        alert("id es obligatorio");
    } else if (titulo == '') {
        alert('Titulo es requerido');
    } else if (productora == '') {
        alert("Productora es obligatorio");
    } else if (temporadas == '') {
        alert('Temporadas es obligatorio')
    } else if (episodios == '') {
        alert('Episodios es obligatorio');
    } else if (fechaLanzamiento == '') {
        alert('Fecha de Lanzamiento es obligatorio');
    } else {
        var yayson = {
            "id": id,
            "titulo": titulo,
            "productora": productora,
            "temporadas": temporadas,
            "episodios": episodios,
            "fechaLanzamiento": fechaLanzamiento
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type: 'post',
            url: 'http://localhost:8010/serie/guardar',
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.success == false) {
                    alert(response.mensaje);
                } else {
                    alert(response.mensaje);
                    $('#modal-guardar-serie').modal('hide');
                    loadSeries();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para button 'boton-guardar-plataforma'
$('#boton-guardar-plataforma').click(function () {
    let id = $('#idPlataforma-input').val();
    let nombre = $('#nombre-input').val();
    let fechaApertura = $('#fechaApertura-input').val();
    let ganancias = $('#ganancias-input').val();
    let paisOrigen = $('#paisOrigen-input').val();
    console.log(id,nombre,fechaApertura,ganancias,paisOrigen);
    if (id == '') {
        alert("Id es obligatorio");
    } else if (nombre == '') {
        alert('Nombre es requerido');
    } else if (fechaApertura == '') {
        alert("Fecha de Apertura es obligatorio");
    } else if (ganancias == '') {
        alert('Ganancias es obligatorio')
    } else if (paisOrigen == '') {
        alert('Pais de Origen es obligatorio');
    } else {
        var yayson = {
            "id": id,
            "nombre": nombre,
            "fechaApertura": fechaApertura,
            "ganancias": ganancias,
            "paisOrigen": paisOrigen,
        };
        console.log(JSON.stringify(yayson));

        $.ajax({
            type: 'post',
            url: 'http://localhost:8010/plataforma/guardar',
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                if (response.success == false) {
                    alert(response.mensaje);
                } else {
                    alert(response.mensaje);
                    $('#modal-guardar-plataforma').modal('hide');
                    loadPlataformas();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para obtener datos de serie a editar
$('#lista-series').on('click', '#boton-editar-serie', function () {
    let id = $(this).attr('data');
    console.log('Data es: ' + id);
    let yayson = { "id": id };

    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/serie/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {
            $('#idSerie-edit').val(respuesta.obj.id);
            $('#titulo-edit').val(respuesta.obj.titulo);
            $('#productora-edit').val(respuesta.obj.productora);
            $('#temporadas-edit').val(respuesta.obj.temporadas);
            $('#episodios-edit').val(respuesta.obj.episodios);
            $('#fechaLanzamiento-edit').val(respuesta.obj.fechaLanzamiento);
            $('#modal-editar-serie').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar-serie').modal('hide');
        }
    });
});

//Event listener para editar serie
$('#boton-modal-editar-serie').click(function () {
    let id = $('#idSerie-edit').val();
    let titulo = $('#titulo-edit').val().trim();
    let productora = $('#productora-edit').val().trim();
    let temporadas = $('#temporadas-edit').val();
    let episodios = $('#episodios-edit').val();
    let fechaLanzamiento = $('#fechaLanzamiento-edit').val();

    if (id == '') {
        alert("id es obligatorio");
    } else if (titulo == '') {
        alert('titulo es requerido');
    } else if (productora == '') {
        alert("productora es obligatorio");
    } else if (temporadas == '') {
        alert('Temporadas es obligatorio')
    } else if (episodios == '') {
        alert('Episodios es obligatorio');
    } else if (fechaLanzamiento == '') {
        alert('Fecha de Lanzamiento de Nacimiento es obligatorio');
    } else {
        var yayson = {
            "id": id,
            "titulo": titulo,
            "productora": productora,
            "temporadas": temporadas,
            "episodios": episodios,
            "fechaLanzamiento": fechaLanzamiento
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/serie/editar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                $('#modal-editar-serie').modal('hide');
                alert(respuesta.mensaje);
                loadSeries();
            },
            error: function () {
                alert('Error al editar serie.');
            }
        });
    }
});

//Event listener para obtener datos de plataforma a editar
$('#lista-plataformas').on('click', '#boton-editar-plataforma', function () {
    let id = $(this).attr('data');
    console.log('Data es: ' + id);

    let yayson = { "id": id };

    $.ajax({
        type: 'post',
        url: 'http://localhost:8010/plataforma/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {
            console.log(respuesta);
            $('#idPlataforma-edit').val(respuesta.obj.id);
            $('#nombre-edit').val(respuesta.obj.nombre);
            $('#fechaApertura-edit').val(respuesta.obj.fechaApertura);
            $('#ganancias-edit').val(respuesta.obj.ganancias);
            $('#paisOrigen-edit').val(respuesta.obj.paisOrigen);
            $('#modal-editar-plataforma').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar-plataforma').modal('hide');
        }
    });
});


//Event listener para editar plataforma
$('#boton-modal-editar-plataforma').click(function () {
    let id = $('#idPlataforma-edit').val();
    let nombre = $('#nombre-edit').val().trim();
    let fechaApertura = $('#fechaApertura-edit').val().trim();
    let ganancias = $('#ganancias-edit').val().trim();
    let paisOrigen = $('#paisOrigen-edit').val();

    if (id == '') {
        alert('Numero de sucursal es obligatorio');
    } else if (nombre == '') {
        alert("nombre es obligatorio");
    } else if (fechaApertura == '') {
        alert('fechaApertura es obligatorio')
    } else if (ganancias == '') {
        alert('ganancias es obligatorio');
    } else if (paisOrigen == '') {
        alert('paisOrigen es obligatorio');
    } else {
        var yayson = {
            "id": id,
            "nombre": nombre,
            "fechaApertura": fechaApertura,
            "ganancias": ganancias,
            "paisOrigen": paisOrigen,
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/plataforma/editar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                $('#modal-editar-plataforma').modal('hide');
                alert(respuesta.mensaje);
                loadPlataformas();
            },
            error: function () {
                alert('Error al editar plataforma.');
            }
        });
    }
});

//Event listener para eliminar serie
$('#lista-series').on('click', '#boton-eliminar-serie', function () {
    let id = $(this).attr('data');
    console.log("Data es: " + id);

    let yayson = { "id": id };

    if (confirm("¿Deseas borrar este serie del registro?")) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/serie/eliminar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                alert(respuesta.mensaje);
                loadSeries();
            },
            error: function () {
                alert('Error al eliminar serie.');
            }
        });
    }
});

//Event listener para eliminar plataforma
$('#lista-plataformas').on('click', '#boton-eliminar-plataforma', function () {
    let id = $(this).attr('data');
    console.log("Data es: " + id);

    let yayson = { "id": id };

    if (confirm("¿Deseas borrar este plataforma del registro?")) {
        $.ajax({
            type: 'post',
            url: "http://localhost:8010/plataforma/eliminar",
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                alert(respuesta.mensaje);
                loadPlataformas();
            },
            error: function () {
                alert('Error al eliminar plataforma.');
            }
        });
    }
});