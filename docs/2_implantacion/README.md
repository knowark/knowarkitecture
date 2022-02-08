# Implantación

<!--Estructura y patrones de diseño para la implantación de **KnowArkitecture**.-->

<!--- [**Aplicación**](2_implantacion/2.1/2.1_aplicacion.md)-->
<!--- [**Integración**](2_implantacion/2.2/2.2_integration.md)-->
<!--- [**Presentación**](2_implantacion/2.3/2.3_presentation.md)-->
<!--- [**Test**](2_implantacion/2.4/2.4_test.md)-->

Los productos creados siguiendo **KnowArkitecture** se estructuran
principalmente alrededor de **3 divisiones** fundamentales:

- **Aplicación**
- **Integración**
- **Presentación**

Los componentes de **aplicación** son los que encierran la esencia de nuestro
programa y determinan *qué* es lo que puede hacer. Por su parte, las secciones
de **integración** y **presentación** pertenecen a lo que podríamos llamar los
componentes de **infraestructura** del sistema, que encierran todos esos
detalles técnicos que son indispensables para desplegar en producción nuestra
aplicación (e.g. bases de datos, frameworks, interfaces gráficas,
APIs externas), pero que no deberían comprometer la funcionalidad esencial
de nuestro sistema. Cada una de estas capas será abordada en las secciones
subsecuentes.

A lo largo de este documento, usaremos como referencia un microservicio
de ejemplo para la gestión del aprendizaje llamado **Tutorark**.
Basándonos en él, exploraremos los distintos elementos que componen la
*KnowArkitecture*, observando cómo se relacionan entre sí en un producto final
con el que podremos interactuar.

Para iniciar, podemos  partir por por apreciar como se encuentran organizados
físicamente nuestros proyectos dentro de nuestros ambientes de desarrollo.
A nivel de estructura de carpetas, los primeros niveles de cualquier sistema
*KnowArkitected* se verían de una forma similar a la siguiente:

```

    `-- server
        |-- tests
        |   |-- application
        |   |-- integration
        |   |-- presentation
        |   |-- __init__.py
        |   `-- test_main.py
        |-- tutorark
        |   |-- application
        |   |-- integration
        |   |-- presentation
        |   |-- __init__.py
        |   `-- __main__.py
        |-- Makefile
        |-- README.rst
        `-- requirements.txt

```

Es precisamente esta estructura la que iremos analizando a lo largo y ancho
de las secciones de este documento. ¡Empecemos!
