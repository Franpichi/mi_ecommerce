# Mi_Ecommerce HOROLOGIUM

Este es un proyecto de eCommerce construido con Node.js, Express, React y MongoDB.

## Requisitos

- Node.js (versión 18.18.2 o superior)
- npm (versión 9.x o superior)
- MongoDB

## Instalación

### Clonar el Repositorio

1. Clona este repositorio:
   ```sh
   git clone https://github.com/Franpichi/mi_ecommerce
   cd mi_ecommerce

2. Instala dependencias:
    cd backend
        npm install
    cd frontend
        npm install
    
## Configuracion

1. Crear un archivo .env
    Adjunto el archivo .env en el cuerpo de la presentacion
    cd backend
        .env
            MONGO_URI=
            NODE_ENV=
            JWT_SECRET=
            STRIPE_SECRET_KEY=
            SENDGRID_API_KEY=
    cd frontend
        .env
            REACT_APP_STRIPE_PUBLIC_KEY=

## Ejecucion

1. "start": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
    npm start

## Dependencias

1. backend
    @sendgrid/mail: ^8.1.3
    bcrypt: ^5.1.1
    connect-mongo: ^5.1.0
    dotenv: ^16.4.5
    express: ^4.19.2
    express-handlebars: ^7.1.2
    express-session: ^1.18.0
    jsonwebtoken: ^9.0.2
    mongoose: ^8.3.4
    multer: ^1.4.5-lts.1
    passport: ^0.7.0
    passport-jwt: ^4.0.1
    passport-local: ^1.0.0
    stripe: ^15.5.0
    
2. frontend
    @stripe/react-stripe-js: ^2.7.1
    @stripe/stripe-js: ^3.4.0
    @testing-library/jest-dom: ^5.17.0
    @testing-library/react: ^13.4.0
    @testing-library/user-event: ^13.5.0
    axios: ^1.6.8
    react: ^18.3.1
    react-dom: ^18.3.1
    react-router-dom: ^6.23.1
    react-scripts: "5.0.1"
    react-toastify: ^10.0.5
    web-vitals: ^2.1.4

    
