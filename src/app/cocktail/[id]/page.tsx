"use client";

import "./page.css";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {CocktailCompleto} from "@/types/CocktailCompleto";
import {getCocktailById} from "@/lib/api/cocktail";

const CocktailPage = () =>
{

    const router = useRouter();

    const [cocktail, setCocktail] = useState<CocktailCompleto | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(false);

    const params = useParams();
    if (!params.id || params.id.length === 0)
    {
        return (
            <main>
                <h1>ERROR: Cocktail no especificado</h1>
            </main>
        );
    }

    const cocktailId = decodeURIComponent(params.id as string);

    useEffect(() =>
    {
        setCargando(true);
        setError(false);

        getCocktailById(cocktailId)
            .then((cocktail) =>
            {
                if (!cocktail)
                {
                    setError(true);
                    setCocktail(null);
                }
                else
                {
                    setCocktail(cocktail);
                }
            })
            .catch((e) =>
            {
                console.error("Error al buscar país:", e);
                setError(true);
                setCocktail(null);
            })
            .finally(() => setCargando(false));
    }, [cocktailId]);

    if (cargando)
    {
        return <main><p>Cargando...</p></main>;
    }
    if (error || !cocktail)
    {
        return <main><p>¡No se encontró el cocktail!</p></main>;
    }

    const p = cocktail;

    return (
        <main>
            <header className="cocktail-header">
                <h1>{p.strDrink} </h1>
                {}
                <img src={p.strDrinkThumb} width={"30%"}/>
                <br/>
                {}
                <button
                    onClick={() => router.push("/")}
                >
                    ← Volver a la página principal
                </button>
            </header>

            <section className="cocktail-info">
                <p><strong>Categoria:</strong> {p.strCategory}</p>
                <p><strong>Alcoholico:</strong> {p.strAlcoholic === "Alcoholic" ? "Sí" : "No"}</p>
                <p><strong>Tipo de vaso:</strong> {p.strGlass}</p>
                <p><strong>Instrucciones:</strong> {p.strInstructions}</p>


                {p.strIngredient1 && (
                    <div>
                        <h3>Ingredientes</h3>
                        <p>{p.strIngredient1 && p.strIngredient1}</p>
                        <p>{p.strIngredient2 && p.strIngredient2}</p>
                        <p>{p.strIngredient3 && p.strIngredient3}</p>
                        <p>{p.strIngredient4 && p.strIngredient4}</p>
                        <p>{p.strIngredient5 && p.strIngredient5}</p>
                        <p>{p.strIngredient6 && p.strIngredient6}</p>
                        <p>{p.strIngredient7 && p.strIngredient7}</p>
                        <p>{p.strIngredient8 && p.strIngredient8}</p>
                        <p>{p.strIngredient9 && p.strIngredient9}</p>
                        <p>{p.strIngredient10 && p.strIngredient10}</p>
                        <p>{p.strIngredient11 && p.strIngredient11}</p>
                        <p>{p.strIngredient12 && p.strIngredient12}</p>
                        <p>{p.strIngredient13 && p.strIngredient13}</p>
                        <p>{p.strIngredient14 && p.strIngredient14}</p>
                        <p>{p.strIngredient15 && p.strIngredient15}</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default CocktailPage;