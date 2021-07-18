Models
^^^^^^

Los desarrollos basados en la arquitectura **KnowArkitecture** acceden y
administran sus datos a través de objetos a los que hacemos referencia
como modelos.

Los modelos son la estructura de datos que representan entidades y objetos
de valor para el programa, los cuales son registrados con sus respectivos Id's.

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
