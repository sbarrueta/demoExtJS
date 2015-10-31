Ext.onReady(function () {

    Ext.QuickTips.init();
    var panelForm = new Ext.form.FormPanel({
        id: 'formulario',
        autoHeight: true,
        labelWidth: 200,
        monitorValid: true,
        items: [
            {
                xtype: 'textfield',
                msgTarget: 'errorNombre',
                id: "nombre",
                emptyText: 'Tecclee el nombre',
                blankText: 'El nombre es obligado!',
                fieldLabel: 'First Name',
                name: 'FirstName',
                width: 190,
                allowBlank: false,
                maxLength: 6,
                maxLengthText: 'Solo son permitidos 6',
                validator: function (valor) {
                    if (valor === 'Ana') {
                        return 'Ana esta excluida!';
                    } else {
                        return true;
                    }
                }
            },
            {
                xtype: 'textfield',
                msgTarget: 'errorNombre',
                fieldLabel: 'correo',
                value: 'algo@empresa.com',
                name: 'correo',
                width: 190,
                allowBlank: false,
                vtype: 'email',
                vtypeText: 'Correo invalido!'
            },
            {
                xtype: 'numberfield',
                fieldLabel: 'Edad',
                name: 'edad',
                width: 30
            },
            {
                xtype: 'radio',
                fieldLabel: 'Sex',
                name: 'Gender',
                boxLabel: 'male'
            },
            {
                xtype: 'radio',
                hideLabel: false,
                name: 'Gender',
                boxLabel: 'female'
            },
            {
                xtype: 'combo',
                fieldLabel: 'Seleccione una opcion',
                id: 'opciones',
                typeAhead: true,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                store: new Ext.data.ArrayStore({
                    id: 0,
                    fields: [
                        'myId',
                        'displayText'
                    ],
                    data: [[1, 'item1'], [2, 'item2']]
                }),
                valueField: 'myId',
                displayField: 'displayText',
                allowBlank: false

            },
            {
                xtype: 'datefield',
                name: 'Dob',
                fieldLabel: 'Date of Birth',
                width: 190
            },
            {
                xtype: 'label',
                id: 'errorNombre',
                cls: 'error'

            }
        ]
    });
    var toolBarInferior = new Ext.Toolbar({
        items: [
            {
                text: "Enviar",
                listeners: {
                    click: botonFormulario
                }
            }
        ]
    });
    var toolBar = new Ext.Toolbar({
        items: [
            {
                text: "Abrir",
                listeners: {
                    click: botonAbrir
                }
            },
            {
                text: "Guardar",
                handler: botonGuardar
            },
            {
                text: "Borrar",
                listeners: {
                    click: botonBorrar
                }

            }

        ]
    });
    var panelNorte = new Ext.Panel({
        title: "Titulo Norte",
        region: "north",
        html: "<h1>Titulo de la aplicación</h1>"
    });
    var panelSur = new Ext.form.FormPanel({
        title: "Titulo Sur",
        region: "south",
        layout: "hbox",
        layoutConfig: {
            defaultMargins: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        height: 200,
        items: [{
                xtype: 'numberfield',
                fieldLabel: 'Edad',
                name: 'edad',
                width: 30
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Edad',
                name: 'muerte',
                width: 30
            }]
    });
    var panelEste = new Ext.Panel({
        title: "Titulo Este",
        region: "east"
    });
    var panelOeste = new Ext.Panel({
        title: "Titulo Oeste",
        region: "west",
        tbar: toolBar

    });
    var panelBoton = new Ext.Panel({
        layout: {
            type: 'hbox',
            padding: '5',
            pack: 'end'
        },
        items: [
            {
                xtype: "button",
                text: "Salir",
                listeners: {
                    click: botonClic


                }
            }
        ]

    });
    var panelCentro = new Ext.Panel({
        title: "Titulo Centro",
        region: "center",
        bbar: toolBarInferior,
        items: [
            panelBoton,
            panelForm
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

