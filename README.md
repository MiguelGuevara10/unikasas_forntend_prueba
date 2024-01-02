# Unikasas Frontend (Vite - React)

Este repositorio contiene los archivos necesarios del desarrollo frontend de la empresa Unikasas, esta construido con Vite y React, usando Tailwind css para los estilos de las paginas, consuminedo una REST API mediante atenticación con Json web Token para los usuarios en las rutas protegidas.

## Instalación

1. Clona el repositorio: `git clone <URL_DEL_REPOSITORIO>`
2. Instala las dependencias: `npm install`

## Uso del sistema 

> [!NOTE]
> Estos si son los pasos necesarios para utilizar o trabajar en el proyecto 

1. Para iniciar la aplicación en entorno de desarrollo: `npm run dev`

### Comandos para verificación de despliegue medinate compilación del desarrollo

1. Para compilar la aplicación: `npm run build`
2. Para visualizar el resultado de la compilación: `npm run preview`

## Librerias utilizadas en el proceso de desarrollo 

> [!IMPORTANT] 
> No es necesario intalarlas manualmente ya se intalaro si ejecutaste los comandos de instalación

Tailwind css
1. `npm i -D tailwindcss postcss autoprefixer`
2. `npx tailwindcss init`
3. `npm i -D @tailwindcss/forms`
4. `npx tailwindcss build -o ./output.css`

Librerias utilizadas en el desarrollo
5. `npm i react-router-dom`
6. `npm i react-hook-form`
7. `npm i axios`
8. `npm i js-cookie`
9. `npm i dayjs`

## Organizacion del proyecto - Directorios o carpetas

> [!TIP]
Las carpetas se encuentran distribuidas de la siguiente manera

1. src /: 
    - api: Rutas de cada uno de los modulos del sistema que conectan con el backend mediante API REST
    - components: Componenetes que son reutilizados por las diferentes paginas del sistema
    - context: Contextos de cada uno de los modulos encargados de pasar variables y funciones globales
    - icons: Inconos usados por las diferentes paginas del sistema
    - pages /: Paginas del sisitema
        - contacts: Paginas de contactos
        - home: Paginas de inicio
        - products: paginas de productos
        - projects / : Paginas de proyectos
            - activities: Paginas de actividades de etapa de un proyecto
            - stages: Paginas de estapas de un proyecto
        - quotes: Paginas de cotizaciones
        - tasks : Paginas de tareas
        - users: Paginas de usuarios

Documentos importantes

- ProyectedRoute.jsx: Acivo encargado de manejar las rutas protegidas del sistema.

# Imagenes del sistema

![image](https://github.com/MiguelGuevara10/unikasas_frontend_react/assets/88211628/80e1e676-3d2a-4388-9741-2b58da982967)

![image](https://github.com/MiguelGuevara10/unikasas_frontend_react/assets/88211628/5d8055d4-6f06-4325-84a7-1144a4bc402f)

![image](https://github.com/MiguelGuevara10/unikasas_frontend_react/assets/88211628/6c06522a-7fb7-482f-8d3b-d05aec97f030)