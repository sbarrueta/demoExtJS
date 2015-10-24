Ext.onReady(function() {

    var panel = new Ext.Panel({
      title:"Titulo",
      region:"center"
    });


    new Ext.Viewport({
        layout: 'border',
        items: [
            
                panel
            
        ]
    });


})

