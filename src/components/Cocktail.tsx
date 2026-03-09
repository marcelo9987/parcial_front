'use client';
import "./Cocktail.css";
import Link from "next/link";
import {CocktailCompleto} from "@/types/CocktailCompleto";


type Props = {
    cocktail: CocktailCompleto;
};

export const Cocktail = (entrada: Props) =>
{
    const cocktail: CocktailCompleto = entrada.cocktail;
    return (
        <Link href={`/cocktail/${cocktail.idDrink}`}>
            <article className="cocktail-card">
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width={"80%"}/>
                <h3>{cocktail.strDrink}</h3>
            </article>
        </Link>
    );
};