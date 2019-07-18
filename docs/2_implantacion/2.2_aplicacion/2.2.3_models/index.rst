Models
------

Los desarrollos basados en la arquitectura **KnowArkitecture** acceden y administran
sus datos a través de objetos a los cuales se hace referencia como modelos.
Los modelos son la estructura donde se almacenarán los datos, se especificará los tipos
de datos de cada campo y se definirá qué campos son obligatorios.

Los modelos ya definidos son indiferentes a la estructura de datos o motor de
base de datos que vaya a utilizar. La primera implementación será en memoria, en caso que se
necesite presentar los datos persistidos en otra estructura de datos, la capa de
infraestructura se encargará de darle la respectiva prioridad de almacenamiento. 


**Definición de modelo**

Python

.. code:: bash

    class NameClass:
        def __init__(self, **attributes) -> None:
            self.field_1 = attributes.get('field_1', '')
            self.field_2 = attributes.get('field_2', '')
            self.field_3 = attributes['field_3']
            ...
            self.field_n = attributes.get('field_n', '')

Javascript

.. code:: bash

    export class NameClass{
        constructor(
            {field_1, field_2='', ... ,field_n} ={}) {
            this.field_1 = field_1;
            this.field_2 = field_2;
            ...
            this.field_n = field_n;
        }
    }