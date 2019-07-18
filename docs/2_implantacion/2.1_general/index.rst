General
-------

Los productos creados siguiendo **KnowArkitecture** se dividen principalmente
en dos partes: 

- la capa de *aplicación*.
- la capa de *infraestructura*.

A nivel de estructura de carpetas, el primer nivel de cualquier proyecto
tendría la siguiente forma:

.. code:: bash
    
    project/
        docs/
            ...
        <project|src>/
            application/
                ...
            infrastructure/
                ...
        tests/
            application/
                ...
            infrastructure/
                ...

.. graphviz::

    digraph G {
        rankdir=LR
        Coordinators [shape=box, color=red]
        Informers [shape=box, color=red] 
        Models [shape=box, color=blue]
        Repositories [shape=box, color=pink] 
        Utilities [shape=box, color=green] 
        Services [shape=box, color=orange]
        Coordinators -> {Services, Models, Repositories, Utilities}
        Services -> {Models, Repositories, Utilities}
        Repositories -> {Models, Utilities}
        Informers -> {Services, Models, Utilities, Repositories}
    }
