﻿/*                 _       _           
                 | |     | |          
  _ __   ___   __| |_   _| |_   _ ___ 
 | '_ \ / _ \ / _` | | | | | | | / __|
 | | | | (_) | (_| | |_| | | |_| \__ \
 |_| |_|\___/ \__,_|\__,_|_|\__,_|___/
 @ewave open source | ©Roi ben haim  ®2016    
 */

var schemaFormDefinitions = 
 [
    {
        "type": { name: "default" },
        "key": "default",
        "validTypes": ["string"]

    },
    {
        "type": { name: "table" },
        "key": "table",
        "enum": [],
        "lookup": {},
        "validTypes": ["array"]

    }, 
    {
        "type": { name: "grid" },
        "key": "grid",
        "enum": [],
        "lookup": {},
        "validTypes": ["array"]

    },           
    {
        "type": { name: "array" },
        "key": "array",
        "enum": [],
        "lookup": {},
        "validTypes": ["array"]

    },
    {
        "type": { name: "selectObj" },
        "key": "selectObj",
        "lookup": {},
        "validTypes": ["object", "array"]
					
    }, 
    {
        "type": { name: "select" },
        "key": "select",
        "enum": [],
        "lookup": {},
        "validTypes": ["string", "boolean"]
							
    },
    {
        "type": { name: "ckeditor" } ,
        "key": "ckeditor",
        ckeditor: {
            skin: 'Moono',
            toolbar : 'Basic'
        },
        "validTypes": ["string"]
    },
         
    {
        "type": { name: "datepicker" } ,
        "key": "datepicker",
        "dateFormat": "dd.MM.yyyy",
        "format" : "date",
        "default" : new Date(),
        "validTypes": ["date"]

    },
         
    {
        "type": { name: "checkbox" } ,
        "key": "checkbox",
        "validTypes": ["boolean"],
        "default": true
                             

    },
    {
        "type": { name: "radios" } ,	
        "key": "radios",	
        "enum": [],
        "validTypes": ["string", "boolean"]

    },
						
    {
        "type": { name: "checkboxes" } ,	
        "key": "checkboxes",
        "enum": [],
        "validTypes": ["string", "array"]

    },
						
    {
        "type": { name: "textarea" } ,	
        "key": "textarea",
        "validTypes": ["string"]

    },
    {
        "type": { name: "number" } ,	
        "key": "number",
        "validTypes": ["string", "array",]

    },
    {
        "type": { name: "password" },	
        "key": "password",
        "validTypes": ["string"]

    },
    {
        "type": { name: "ace" },	
        "key": "ace",
        "validTypes": ["string"]
    },
    {
        "endpoint": "/cms/fileupload",
        
        "type": { name: "nwpFileUpload" },
        "key": "nwpFileUpload",
        "title": "Image",
        
        "format": "singlefile",
        
        "pattern": {
            "mimeType": "image/*",
            "validationMessage": "Falscher Dateityp: "
        },
        "maxSize": {
            "maximum": "2MB",
            "validationMessage": "Erlaubte Dateigröße überschritten: ",
            "validationMessage2": "Aktuelle Dateigröße: "
        },
        "maxItems": {
            "validationMessage": "Es wurden mehr Dateien hochgeladen als erlaubt."
        },
        "minItems": {
            "validationMessage": "Sie müssen mindestens eine Datei hochladen"
        }        ,
        "validTypes": ["array"]
    },
];




var schemaFormDefinitionsObj = {};
for (var i = 0; i < schemaFormDefinitions.length; i++) {
    schemaFormDefinitionsObj[schemaFormDefinitions[i].key] = schemaFormDefinitions[i];
}

var schemaFormDefinitionsSupport = {};
for (var i = 0; i < schemaFormDefinitions.length; i++) {
    for (var support = 0; support < schemaFormDefinitions[i].validTypes.length; support++) {
        if (schemaFormDefinitionsSupport[schemaFormDefinitions[i].validTypes[support]] === undefined)
            schemaFormDefinitionsSupport[schemaFormDefinitions[i].validTypes[support]] = [];
        schemaFormDefinitionsSupport[schemaFormDefinitions[i].validTypes[support]].push(schemaFormDefinitions[i]);
    }
}

 

//alert(JSON.stringify(schemaFormDefinitionsSupport));