Ext.onReady(function() {

    var toolBar = new Ext.Toolbar({
       items:[
           {
               text:"Abrir",
               listeners:{
                  click:botonAbrir
              }
           },
           {
               text:"Guardar",
               handler:botonGuardar
           },
           {
               text:"Borrar",
               listeners:{
                  click:botonBorrar
              }
               
           }
           
       ] 
    });



    var panelNorte = new Ext.Panel({
      title:"Titulo Norte",
      region:"north",
      html:"<h1>Titulo de la aplicación</h1>"
    });
    var panelSur = new Ext.Panel({
      title:"Titulo Sur",
      region:"south"
    });
    var panelEste = new Ext.Panel({
      title:"Titulo Este",
      region:"east"
    });
    var panelOeste = new Ext.Panel({
      title:"Titulo Oeste",
      region:"west",
      tbar:toolBar
      
    });
    
    

    var panelCentro = new Ext.Panel({
      title:"Titulo Centro",
      region:"center",
      items:[
          {
              xtype:"button",
              text:"Picale",
              listeners:{
                  click:botonClic
                      
                  
              }
          }
      ]
    });


    new Ext.Viewport({
        layout: 'border',
        items: [
            
                panelNorte,
                panelSur,
                panelCentro,
                panelEste,
                panelOeste
            
        ]
    });


})

