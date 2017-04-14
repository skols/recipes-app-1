import { Ingredient } from "./ingredient";

export class RecipeModel {
    constructor(
        public title: string,
        public description: string,
        public difficulty: string,
        public ingredients: Ingredient[]
    ) {}
}
