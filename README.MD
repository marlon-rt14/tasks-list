# Documentación del Proyecto
Este archivo README proporciona información sobre cómo clonar, configurar y ejecutar el proyecto.

## Tecnología Utilizada
Este proyecto ha sido desarrollado utilizando Vite.js. Vite.js es una herramienta de compilación y desarrollo rápido que proporciona una configuración preconfigurada para proyectos web modernos [*y que es permitido por la documentacion oficial de React ya que hacer solo uso de CRA ya no es recomendable*](https://react.dev/learn/start-a-new-react-project).

Puedes encontrar más información sobre Vite.js en su sitio web.

## Clonar el Proyecto
Para clonar el proyecto en tu máquina local, sigue estos pasos:

1. Abre tu terminal o línea de comandos.
2. Navega hasta la ubicación donde deseas almacenar el proyecto.
3. Ejecuta el siguiente comando para clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

## Configuración
Antes de ejecutar el proyecto, asegúrate de seguir estos pasos de configuración:

1. Dirígete a la carpeta raíz del proyecto utilizando tu terminal o línea de comandos:
```bash
cd <nombre_de_carpeta>
```
2. Instala las dependencias del proyecto ejecutando uno de los siguientes comandos, según tu gestor de paquetes preferido:
```bash 
npm install
```
```bash
yarn add
```

## Ejecutar el Proyecto
Una vez que hayas clonado el proyecto y configurado las dependencias, puedes ejecutarlo. Sigue los pasos a continuación:

1. Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:
```bash
npm run dev
```
2. Para compilar el proyecto, ejecuta el siguiente comando:
```bash
npm run build
```

## Credenciales de Autenticación
En el archivo `src/helpers/Auth8Base.ts` encontrarás las credenciales para cada tipo de rol que se utilizan para iniciar sesión y recuperar información. Asegúrate de configurar correctamente estas credenciales antes de utilizar el proyecto.

## Notas Importantes
* Ten en cuenta que este proyecto utiliza una versión gratuita que puede tener limitaciones de actividad. Esto puede causar algunos inconvenientes, como la imposibilidad de registrarse. Ten en cuenta estas limitaciones al trabajar con el proyecto.
* **Importante**: Se han encontrado algunos inconvenientes en la recuperación de tareas según el usuario logueado. Aunque la consulta de GraphQL funciona correctamente, en el entorno local puede devolver un arreglo vacío. Debido a este problema, no fue posible completar algunos de los requerimientos. El error puede residir en el backend de 8Base en alguna configuración que no lo he logrado identificar y en la consola del navegador no se generan errores o advertencias que permitan identificar la causa del problema. Sin embargo, el CRUD (crear, leer, actualizar, eliminar) funciona perfectamente.
* Debido al punto anterior la selección del Rol en el registro es irrelevante


## Usuarios de prueba
```
Email: piknidutra@gufum.com
Password: marlonUTN97
```
```
Email: semlasaydu@gufum.com
Password: marlonUTN97
```