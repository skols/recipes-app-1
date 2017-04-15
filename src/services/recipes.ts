import { RecipeModel } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

export class RecipesService {
    private recipes: RecipeModel[] = [];

    addRecipe(
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]
    ) {
        this.recipes.push(new RecipeModel(title, description, difficulty, ingredients));
        console.log(this.recipes);
    }

    getRecipes(){
        return this.recipes.slice(); // returning a copy with slice()
    }

    updateRecipe(
        index: number,
        title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]
    ) {
        this.recipes[index] = new RecipeModel(title, description, difficulty, ingredients);
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
    }
}
