import React, { useState, useEffect } from 'react';
import './Peliculas.css';

function Peliculas() {
  const [pagina, setPagina] = useState(1);
  const [peliculas, setPeliculas] = useState([]);



  const handleAnterior = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  }

  const handleSiguiente = () => {
    if (pagina < 1000) {
      setPagina(pagina + 1);
    }
  }

  useEffect(() => {
    //La funcion dentro del useEffect para que no cause problemas
    const cargarPeliculas = async () => {
      try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
        const datos = await respuesta.json();

        if (respuesta.status === 200) {
          setPeliculas(datos.results);
        } else {
          console.log("Error al cargar películas");
        }
      } catch (error) {
        console.log(error.message);
      }
    }



    cargarPeliculas();
  }, [pagina]);

  return (
    <div className='contenedor'>

      <div id="contenedor" className="peliculas-contenedor">
        {peliculas.map(pelicula => (
          <div className="pelicula" key={pelicula.id}>
            <img className="poster" src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
            <h3 className="titulo">{pelicula.title}</h3>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
      <div className='paginacion'>
        <button onClick={handleAnterior}>Anterior</button>
        <button onClick={handleSiguiente}>Siguiente</button>
      </div>
    </div>
  )
}

export default Peliculas;
