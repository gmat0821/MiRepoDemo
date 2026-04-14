import { useEffect, useState } from "react";


export function MuestraPokemon() {
    const [pokemon, setPokemon] = useState(null);


    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
        .then(response => response.json())
        .then(data => setPokemon(data));
    }, []);

 
    return pokemon ? <h1>{pokemon.name }</h1> : <h2>Cargando...</h2>
}
