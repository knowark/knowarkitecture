Aplicación
==========

La capa de aplicación encierra la lógica de negocio de cada sistema.
Es en esta área del código dónde se representan los elementos del
dominio de la aplicación (entendidos desde la perspectiva del Diseño Guiado
por el Dominio, DDD). Estos elementos corresponden a los modelos mentales que
hayamos creado para representar fenómenos, mecanismos y actividades del 
mundo real y sobre los cuales nuestro sistema creará relaciones y asignará
comportamientos. La capa de aplicación es la que captura el propósito de
nuestro programa y la que representa el **objetivo esencial** del sistema 
construido.

Por lo anterior, sólo con mirar la capa de aplicación debe ser posible
reconocer la utilidad del sistema y el tipo de *negocio* modelado por él. Así,
la capa de aplicación nos dice por ejemplo, si el programa en cuestión atiende
la industria hospitalaria y de la salud, o si es un software académico para
universidades o si en cambio se trata de un sistema comercial de ventas en
línea. La capa de aplicación debe *gritar* el propósito del sistema, haciendo
evidente para qué ha sido construido.

En *KnowArkitecture* la capa de aplicación se divide a sí misma en múltiples
componentes, por lo que una mirada de alto nivel a su estructura de carpetas
sería:

.. code:: bash

    project/
        <project|src>/
            application/
                coordinators/
                informers/
                models/
                repositories/
                services/
            ...
        tests/
            application/
                coordinators/
                informers/
                models/
                repositories/
                services/
            ...
        ...

.. toctree::
   :maxdepth: 1

   coordinators/index
   informers/index
   models/index
   repositories/index
   services/index
   utilities/index