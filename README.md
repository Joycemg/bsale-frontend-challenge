<p align="center">

 <img style="background-color: #ff5c1a; border-radius: 5px; "  src="https://dojiw2m9tvv09.cloudfront.net/4/8/img-logos-logo-bsale-blanco-mobile.png?2904" alt="Project logo">
</p>
<h3 align="center">bsale-frondend-challenge</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-done-success.svg)]()

</div>

---

<p align="center"> bsale-frontdend-challenge trabaja en conjunto con bsale-backend-challenge</a>
</p>

##### 📝 tabla de contenidos
- [Acerca <a name = "about"></a>](#Acerca-)
- [Cómo empezar <a name = "getting_started"></a>](#como-empezar-)
- [Deployed  <a name = "Deployed "></a>](#Deployed-)
- [Por qué he utilizado estas tecnologías? <a name = "why_this"></a>](#por-qué-he-utilizado-estas-tecnologías-)

## Acerca <a name = "about"></a>

Esta aplicación web fue desarrollada como parte del proceso de seleccion de BSale. El objetivo principal es determinar si tengo los conocimientos/habilidades para consumir una API REST y mostrar los datos de manera amigable.

La app puede mostrar productos, productos por categoría, tiene funcionalidad de búsqueda, carrito y es responsive.

##### Estructura de la app web
<pre>
├── css
│   ├── all.min.css
│   └── style.css
├── img
│   ├── hero.jpg
│   ├── logo.svg
│   └── nofound.png
├── index.html
├── js
│   ├── index.js
│   ├── methods.js
│   ├── renders.js
│   └── selectors.js
└── webfonts
</pre>

## Como empezar <a name = "getting_started"></a>

Para empezar, tendrás que clonar el repositorio e instalar las dependencias.

```
http: git clone https://github.com/Joycemg/bsale-frontend-challenge.git
ssh: git@github.com:Joycemg/bsale-frontend-challenge.git
```

```
npm install
```

Sin embargo no funcionara correctamente porque necesitamos tener en funcionamiento el backend que consume esta aplicación web. Puedes encontrar el backend presionando <a href="https://github.com/Joycemg/bsale-backend-challenge">aqui</a>, con su documentación respectiva que te guiara para configurarlo. Una vez que lo hayas hecho, puedes continuar con esto y recuerda tener instalado Node.js en tu PC.
Como ultimo se tendra que configurar el URL del nuestra api dentro del archivo JavaScript principal que se llama index su ubicacion se puede apreciar en la estructura ofrecida anteriormente :

Y modificar el URL base de nuestro instancia axios

```js
const API = axios.create({
  baseURL: '',  <===
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});
```


## Deployed  <a name="Deployed"></a>

<p style="font-weight: normal; font-size: 2.2vh">Esta APP web fue desplegada en  <a href="https://www.netlify.com/">netlify</a> puedes probar al app con el siguiente enlace <a href="https://bsale-frontend-challenge.netlify.app/">https://bsale-frontend-challenge.netlify.app/</a></p>

#### Construido con<a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

##### Detalles a tener en cuenta sobre el estilo del proyecto

<p style="font-weight: normal; font-size: 2.2vh">El estilo fue dado con CSS y sin nomenclaturas no tuvo un proceso de diseño previo por lo tanto puede mejorarse mucho, el mismo se fue aplicando sobre la marcha por lo tanto no es del todo amigable leerlo. mis sinceras disculpas.</p>

## Por qué he utilizado estas tecnologías? <a name = "why_this"></a>

<p style="font-weight: normal; font-size: 2.2vh"><b>Node.js:</b> Usé Node.js para ofrecer de manera rapida el despliegue local a cualquier interesado</p>

<p style="font-weight: normal; font-size: 2.2vh"><b>Express.js:</b> Se utilizo express para el despliegue local, sin embargo se puede desplegar con extensiones de terceros que fue en mi caso, pero Express.js simplifica el trabajo bastante</p>

<p style="font-weight: normal; font-size: 2.2vh">En el Front no hay mucho que descantar he usado iconos fontawesome simplemente por su variedad. Axios lo elegi por su objeto de solicitud que me parecio interesante y ademas es una tecnologia que debo aplicar en proximos proyecto finales de la universidad y tome la oportunidad para familiarizarme de este</p>
