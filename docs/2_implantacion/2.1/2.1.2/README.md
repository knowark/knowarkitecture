### General

La capa **general** encierra aquellos componentes del sistema que proveen una
función de apoyo para que la aplicación pueda ser desplegada y mantenida en
producción. El código definido en esta sección no representa conceptos
relevantes desde el punto de vista del dominio de negocios modelado en el
sistema, pero sí establece mecanismos y procedimientos que pueden ser
indispensables para usar la aplicación en un entorno real.

En esta capa podríamos encontrar código relacionado con la validación de
permisos para acceder a ciertas funcionalidades del programa, o la lógica
necesaria para generar sus copias de respaldo, o la definición de las
acciones necesarias para agendar un trabajo de segundo plano. Las clases aquí
definidas se comportan de una manera muy similar a los *servicios* de la capa
de dominio, pero las denominamos como *suppliers* para denotar que su función
es una de soporte, y no una esencial desde la óptica del negocio modelado.
