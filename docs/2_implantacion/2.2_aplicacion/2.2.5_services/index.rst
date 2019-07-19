Servicios
---------

Son clases que proveen funciones y datos para luego ser empleados en los **coordinators** e **informers**. Por ejemplo, si la aplicación tiene más de un 
servicio de almacenamiento, el **coordinator** encargado de guardar los datos solicitará el respectivo servicio para almacenar el dato.

**Código Ejemplo**

Python

.. code:: bash

    class IdService(ABC):
        @abstractmethod
        def generate_id(self) -> str:
            "Generate method to be implemented."

JavaScript

.. code:: bash


    export abstract class IdService {

        abstract generateId(): string;

