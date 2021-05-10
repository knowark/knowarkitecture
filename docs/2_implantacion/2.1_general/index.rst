General
=======

Los productos creados siguiendo **KnowArkitecture** se estructuran
principalmente alrededor de dos capas:

- **aplicación**.
- **infraestructura**.


Los componentes de *aplicación* son los que encierran la esencia de nuestro
programa y determinan *qué* es lo que puede hacer. Por su parte, llamamos
componentes de *infraestructura* a todos esos detalles técnicos que son
indispensables para entregar nuestra aplicación (e.g. bases de datos,
frameworks, interfaces gráficas, APIs externas) pero que no deberían
comprometer la funcionalidad esencial de nuestro sistema. Cada una de estas
capas será abordada en secciones subsecuentes.

A lo largo de este documento, usaremos como referencia un microservicio de
de ejemplo para la gestión del aprendizaje llamado **Tutorark**.
Basándonos en él, exploraremos los distintos elementos que componen la
*KnowArkitecture*, observando de manera concreta como éstos se interrelacionan
en un producto final completo con el que podremos interactuar.

Dando inicio efectivo entonces a este proceso, podemos comenzar por apreciar
como se encuentran organizados nuestros proyectos. A nivel de estructura de
carpetas, los primeros niveles de cualquier proyecto se verían de una forma
similar a la siguiente:

.. tree -L 3 --charset ascci

.. sourcecode::

    `-- server
        |-- tests
        |   |-- application
        |   `-- __init__.py
        `-- tutorark
            |-- application
            |-- __init__.py
            `-- __main__.py

Es precisamente esta estructura la que iremos analizando a lo largo y ancho
de las secciones de este documento. ¡Empecemos!
