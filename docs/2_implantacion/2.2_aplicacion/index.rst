Aplicación
==========

La capa de aplicación encierra la **lógica de negocio** de cada sistema.
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
la capa de aplicación nos dice, por ejemplo, si el programa en cuestión atiende
la industria hospitalaria y de la salud, o si representa un software académico
para universidades o si en cambio modela un sistema comercial de ventas en
línea. La capa de aplicación debe **gritar** el propósito del sistema, haciendo
evidente para qué ha sido construido.

En *KnowArkitecture* la capa de aplicación se divide a sí misma en múltiples
componentes, por lo que una mirada de alto nivel a su estructura de carpetas
sería:


.. tree -L 4 --charset ascci --dirsfirst

.. sourcecode::

    |-- productark
    |   |-- productark
    |   |   |-- application
    |   |   |   |-- domain
    |   |   |   |-- informers
    |   |   |   |-- managers
    |   |   |   `-- __init__.py
    |   |   |-- ...
    |   `-- tests
    |       |-- application
    |       |   |-- domain
    |       |   |-- informers
    |       |   |-- managers
    |       |   `-- __init__.py
    |       |-- ...


.. toctree::

   2.2.1_domain/index
   2.2.2_informers/index
   2.2.3_managers/index


Las siguientes gráficas ilustra las dependencias entre los módulos que
pertenecen a la capa de aplicación:

.. graphviz::

    digraph G {
        rankdir = LR
        Domain [shape=box, color=red]
        Informers [shape=box, color=blue]
        Managers [shape=box, color=green]

        Informers -> {Domain}
        Managers -> {Domain}
    }

.. graphviz::

    digraph G {
        rankdir = LR
        Managers [shape=box, color=red]
        Informers [shape=box, color=red]
        Models [shape=box, color=blue]
        Repositories [shape=box]
        Utilities [shape=box, color=green]
        Services [shape=box, color=orange]

        Services -> {Models, Repositories, Utilities}
        Repositories -> {Models, Utilities}
        Informers -> {Services, Models, Utilities, Repositories}
        Managers -> {Services, Models, Repositories, Utilities}
    }
