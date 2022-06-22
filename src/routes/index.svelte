<script context="module" lang="ts">
	// runs on server before component mounts and also on the client
	import type { DrinkType } from '../types';

	export async function load({ fetch }) {
		const drink: DrinkType = await (await fetch('/drinks.json')).json()

		return {
			props: { drinkProp: drink }
		}
	}

</script>

<script lang="ts">
	export let drinkProp: DrinkType;
	
	let drinkState = drinkProp;
	
	const handleOnClick = async () => {
		const result = await (await fetch('/drinks.json')).json()
		drinkState = result;
	}
</script>


<div class='wrapper'>
	<button on:click={handleOnClick}>
 		Get new drink
	</button>

	<h2>{drinkState.name}</h2>
	<img src={drinkState.thumbUrl} alt='drink=thumbnail' class='drink-thumb'/>
	<p>{drinkState.instructions}</p>

	{#each drinkState.ingredients as ingredient}
		<p class='ingredient'>{ingredient.amount} {ingredient.name}</p>
	{/each}
</div>

<style>
	.wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-family: Arial, Helvetica, sans-serif;
  }

	.drink-thumb {
			width: 300px;
			border-radius: 1rem;
  }

	p {
			max-width: 500px;
			text-align: center;
  }

	.ingredient {
			margin: 2px 0;
  }
</style>
