$(document).ready(function () {
    loadData();
});

//Funcion para cargar los datos de la tabla
function loadData() {
    $.ajax({
        //Tipo de consulta
        type: 'get',
        //URI
        url: 'http://localhost:9001/libros/listar',
        //Establecer tipo de contenido
        contentType: 'application/json; charset=utf-8',
        //Condicion en caso de exito
        success: function (respuesta) {
            var cuerpo_tabla = '';
            for (let i = 0; i < respuesta.obj.length; i++) {
                //Inyectar HTML a tabla
                cuerpo_tabla += '<tr class="text-center">' +
                    '<td>' + respuesta.obj[i].folio + '</td>' +
                    '<td>' + respuesta.obj[i].titulo + '</td>' +
                    '<td>' + respuesta.obj[i].editorial + '</td>' +
                    '<td>' + respuesta.obj[i].genero + '</td>' +
                    '<td>' + respuesta.obj[i].precio + '</td>' +
                    '<td>' + respuesta.obj[i].paginas + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-warning" id="boton-editar" data="' + respuesta.obj[i].folio + '">Editar</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger" id="boton-eliminar" data="' + respuesta.obj[i].folio + '">Eliminar</button>' + '</td>' +
                    '</tr>';
            }
            console.log(cuerpo_tabla);
            $('#lista-libros').html(cuerpo_tabla);
        },
        //Condicion en caso de error
        error: function () {
            alert('Error al cargar tabla');
        }
    });
}

//Event listener para NavBar button 'abrir-guardar'
$('.abrir-guardar').click(function () {
    //Show Modal 'modal-guardar
    $('#modal-guardar').modal('show');
});

//Event listener para button 'boton-guardar'
$('#boton-guardar').click(function () {
    let folio = $('#folioInput').val();
    let titulo = $('#tituloInput').val();
    let autor = $('#autorInput').val();
    let editorial = $('#editorialInput').val();
    let genero = $('#generoInput').val();
    let precio = $('#precioInput').val();
    let paginas = $('#paginasInput').val();

    if (folio == '') {
        alert("Folio es obligatorio");
    } else if (titulo == '') {
        alert('Titulo es requerido');
    } else if (autor == '') {
        alert("Autor es obligatorio");
    } else if (editorial == '') {
        alert('Editorial es obligatorio')
    } else if (genero == '') {
        alert('Genero es obligatorio');
    } else if (precio == '') {
        alert('Precio es obligatorio');
    } else if (paginas == '') {
        alert('Paginas es obligatorio')
    } else {
        var yayson = {
            "folio": folio,
            "titulo": titulo,
            "autor": autor,
            "editorial": editorial,
            "genero": genero,
            "precio": precio,
            "paginas": paginas
        };
        console.log(JSON.stringify(yayson));

        $.ajax({
            type: 'post',
            url: 'http://localhost:9001/libros/guardar',
            data: JSON.stringify(yayson),
            contentType: 'application/json; charset=utf-8',
            success: function (respuesta) {
                if (respuesta.success == false) {
                    alert(respuesta.mensaje);
                } else {
                    alert(respuesta.mensaje);
                    $('#modal-guardar').modal('hide');
                    loadData();
                }
            },
            error: function () {
                alert("Error al registrar en la base de datos")
            }
        });
    }
});

//Event listener para obtener datos de libro a editar
$('#lista-libros').on('click', '#boton-editar', function () {
    let folio = $(this).attr('data');
    console.log('Data es: ' + folio);

    let yayson = { "folio": folio };

    $.ajax({
        type: 'post',
        url: 'http://localhost:9001/libros/buscar',
        data: JSON.stringify(yayson),
        contentType: 'application/json; charset=utf-8',
        success: function (respuesta) {
            $('#folioEdit').val(respuesta.obj.folio);
            $('#tituloEdit').val(respuesta.obj.titulo);
            $('#autorEdit').val(respuesta.obj.autor);
            $('#editorialEdit').val(respuesta.obj.editorial);
            $('#generoEdit').val(respuesta.obj.genero);
            $('#precioEdit').val(respuesta.obj.precio);
            $('#paginasEdit').val(respuesta.obj.paginas);
            $('#modal-editar').modal('show');
        },
        error: function () {
            alert("Error al recuperar datos");
            $('#modal-editar').modal('hide');
        }
    });
});

$('#boton-editar-modal').click(function(){
    let folio = $('#folioEdit').val();
    let titulo = $('#tituloEdit').val().trim();
    let autor = $('#autorEdit').val().trim();
    let editorial = $('#editorialEdit').val().trim();
    let genero = $('#generoEdit').val().trim();
    let precio = $('#precioEdit').val();
    let paginas = $('#paginasEdit').val();

    if (titulo == '') {
        alert('Titulo es obligatorio');
    } else if (autor == '') {
        alert("Autor es obligatorio");
    } else if (editorial == '') {
        alert('Editorial es obligatorio')
    } else if (genero == '') {
        alert('Genero es obligatorio');
    } else if (precio == '') {
        alert('Precio es obligatorio');
    } else if (paginas == '') {
        alert('Paginas es obligatorio')
    } else {
        var yayson = {
            "folio": folio,
            "titulo": titulo,
            "autor": autor,
            "editorial": editorial,
            "genero": genero,
            "precio": precio,
            "paginas": paginas
        };
        console.log(JSON.stringify(yayson));
        $.ajax({
            type:'post',
            url:"http://localhost:9001/libros/editar",
            data: JSON.stringify(yayson),
            contentType : 'application/json; charset=utf-8',
            success: function(respuesta) {
                $('#modal-editar').modal('hide');
                alert(respuesta.mensaje);
                loadData();
            },
            error:function() {
                alert('Error al editar libro.');
            }
        });
    }
});

$('#lista-libros').on('click','#boton-eliminar', function() {
    let folio = $(this).attr('data');
    console.log("Data es: "+folio);

    let yayson = { "folio":folio };

    if(confirm("¿Deseas borrar este libro del registro?")){
        $.ajax({
            type:'post',
            url:"http://localhost:9001/libros/eliminar",
            data: JSON.stringify(yayson),
            contentType : 'application/json; charset=utf-8',
            success: function(respuesta) {
                $('#modal-editar').modal('hide');
                alert(respuesta.mensaje);
                loadData();
            },
            error:function() {
                alert('Error al editar libro.');
            }
        });
    }
});