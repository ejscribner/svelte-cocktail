// this creates an endpoint and can be fetched like a regular endpoint
// .ts would override the component and show an endpoint when you navigate to index, .json.ts means it doesnt (can hit from app with fetch still)

// TODO: create proper type later
import type { DrinkType, IngredientType } from '../../types';

export async function get(): Promise<{ body: DrinkType }> {
	const result = await (
		await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
	).json()

	const ingredients: IngredientType[] = [...Array(15)]
		.map((_value, i) => ({
			name: result.drinks[0][`strIngredient${i + 1}`],
			amount: result.drinks[0][`strMeasure${i + 1}`]
		})).filter((ingredient) => ingredient.name);

	return {
		body: {
			name: result.drinks[0].strDrink,
			instructions: result.drinks[0].strInstructions,
			ingredients,
			thumbUrl: result.drinks[0].strDrinkThumb
		}
	}
}
