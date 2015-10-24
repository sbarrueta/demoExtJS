Ext.onReady(function() {

    var panelNorte = new Ext.Panel({
      title:"Titulo Norte",
      region:"north"
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
      region:"west"
    });

    var panelCentro = new Ext.Panel({
      title:"Titulo Centro",
      region:"center"
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

