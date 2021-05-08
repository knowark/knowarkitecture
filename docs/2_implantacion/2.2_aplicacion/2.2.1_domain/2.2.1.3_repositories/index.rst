Repositories
^^^^^^^^^^^^

Todo proyecto informático necesita un `CRUD <https://es.wikipedia.org/wiki/CRUD>`__
para manipular los datos, por esta razón la capa de aplicación tiene este módulo
donde se implementan los repositorios de cada uno de los **modelos**. Por ejemplo,
si existe un modelo o entidad llamado *persona* es necesario poder crear, leer,
actualizar y eliminar en algún momento alguna ocurrencia que pertenezca a este
modelo.

**Código Ejemplo**

Python

.. code:: bash

    class ModelRepository(Repository[Model]):
        """Model Repository"""

    class MemoryModelRepository(MemoryRepository[Model], ModelRepository):
        """Memory Model Repository"""

JavaScript

.. code:: bash

    export abstract class ModelRepository extends Repository<Model> {}

    export class MemoryModelRepository extends MemoryRepository<Model>
        implements ModelRepository {}
