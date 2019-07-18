Informers
---------

Como su nombre lo sugiere los **Informers** son clases donde su objetivo es hacer
consultas a los **modelos** de la aplicación, aquí se desarrolla la lógica para hacer
**solo lectura** en ningún caso una clase implementada en esta sección podrá tener alguna
acción de escritura. Por ejemplo, cuando se requiera hacer una consulta a todos los
productos creados en en los últimos 2 meses, es aquí donde se debe implementar esa
funcionalidad de búsqueda y filtros.

Así como los Coordinadors los Informers podrán exponer su lógica a la capa de infraestructura.


**Ejemplo Informer**