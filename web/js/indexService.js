function botonClic(){
   alert("Le diste clic al boton");
}
function botonGuardar(){
   alert("Le diste clic al boton guardar");
    
}
function botonBorrar(){
   alert("Le diste clic al boton borrar");
    
}
function botonAbrir(){
   alert("Le diste clic al boton abrir");
    
}

function botonFormulario(){
    
    var formulario = Ext.getCmp('formulario').getForm( );
    /*
    var nombre= Ext.getCmp('nombre');
    var opciones= Ext.getCmp('opciones');
    var opcion= opciones.getValue( );
    
    var datoNombre= nombre.getValue( );
    nombre.setActiveError( 'Error al validar', true );
    alert(opcion);*/
    formulario.submit();
}
