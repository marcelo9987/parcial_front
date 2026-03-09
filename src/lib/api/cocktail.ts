import {api} from "./api";
import {CocktailCompleto} from "@/types/CocktailCompleto";

type CocktailResponse = {
    drinks: CocktailCompleto[] | null;
};

export const getCocktailByName = async (name: string) => {
    const response = await api.get<CocktailResponse>(
        `/json/v1/1/search.php?s=${name}`
    );
    return response.data.drinks??[];
};

export const getCocktailById = async (id:string) =>
{
    console.log(id);
    const response = await
        api.get<CocktailResponse>(`/json/v1/1/lookup.php?i=${id}`);
    console.log(response.data);
    return response.data.drinks ? response.data.drinks[0]:null;
};


export const getRandomCocktail = async () =>
{
    const response = await
        api.get<CocktailResponse>(`/json/v1/1/random.php`);
    console.log(response.data);
    return response.data.drinks![0];
};

