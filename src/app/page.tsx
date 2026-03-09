"use client";

import "./page.css";
import {useEffect, useState} from "react";
import {CocktailCompleto} from "@/types/CocktailCompleto";
import {getCocktailByName, getRandomCocktail} from "@/lib/api/cocktail";
import {Cocktail} from "@/components/Cocktail";
import {redirect} from "next/navigation";


const Home = () =>
{
    const [cocktails, setCocktails] = useState<Array<CocktailCompleto>>([]);
    const [entrada, setEntrada] = useState<string>("");
    const [aleatorio, setAleatorio] =useState<boolean>(false);

    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const [buscar, setBuscar] = useState<number>(0);

    const botonPulsado = () =>
    {
        setBuscar((prev) => prev + 1);
    };

    const cocktailAleatorio = () =>
    {
        setAleatorio(true);
    }

    const buscarTodos = async () =>
    {
        setCocktails(await getCocktailByName("Margarita"));
    };

    const buscarCocktails = async () =>
    {
        setCocktails(await getCocktailByName(entrada));
        return [];
    };

    useEffect(() =>
    {

        setCargando(true);
        setError(false);

        const fetch = entrada.trim() ? buscarCocktails : buscarTodos;
        fetch().catch((e) =>
        {
            console.error("Error al buscar cocktails:", e);
            setError(true);
        }).finally(() =>
        {
            setCargando(false);
        });
    }, [buscar]);

    useEffect(() =>
    {
        if(!aleatorio)
        {
            return;
        }
        setAleatorio(false);

        getRandomCocktail().then((c)=>{redirect(`/cocktail/${c.idDrink}`);});





    }, [aleatorio]);


    return (

        <div>
            <div className={"titulo"}>
                <h1>Margaritas</h1>
            </div>


            <div className={"contenedor-cocktails"}>
                <div className={"entrada-cocktails"}>
                    <input
                        value={entrada}
                        onChange={(e) => setEntrada(e.target.value)}
                        onKeyDown={(e) =>
                        {
                            if (e.key === "Enter")
                            {
                                botonPulsado();
                            }
                        }
                        }
                        placeholder="Cocktail a buscar"
                    />
                    <button
                        onClick={botonPulsado}
                    >Buscar
                    </button>
                    <button
                        onClick={cocktailAleatorio}
                    >Dime algo, bonito
                    </button>
                </div>

                <div className={"lista-cocktails"}>
                    {cargando &&
                        <p>Cargando cocktails...</p>
                    }

                    {
                        error &&
                        <p>Error al cargar cocktails. Por favor, inténtalo de nuevo más tarde.</p>
                    }

                    {!cargando && !error &&
                        (
                            <ol>
                                {[...cocktails]
                                    .map((cocktailEspecifico: CocktailCompleto) =>
                                        (
                                            <Cocktail
                                                key={cocktailEspecifico.idDrink}

                                                cocktail={cocktailEspecifico}
                                            />
                                        ))}
                            </ol>
                        )
                    }
                </div>
            </div>
        </div>

    )
        ;
};

export default Home;