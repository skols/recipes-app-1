import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import {
    NavParams,
    ActionSheetController,
    AlertController,
    ToastController,
    NavController } from 'ionic-angular';

import { RecipesService } from "../../services/recipes";
import { RecipeModel } from "../../models/recipe";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})

// Using the Reactive approach to forms
export class EditRecipe implements OnInit {
    mode = "New";
    selectOptions = ["Easy", "Medium", "Hard"];
    recipeForm: FormGroup
    recipe: RecipeModel
    index: number

    constructor(
        private navParams: NavParams,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private recipesService: RecipesService,
        private navCtrl: NavController
    ) {

    }

    ngOnInit() {
        this.mode = this.navParams.get("mode");
        if (this.mode === "Edit") {
            this.recipe = this.navParams.get("recipe");
            this.index = this.navParams.get("index");
        }
        this.initializeForm();
    }

    onSubmit() {
        const value = this.recipeForm.value;
        let ingredients = [];
        if (value.ingredients.length > 0) {
            // Transform ingredients (array of strings) into an array of objects where each object has a name property which stores the original name and an amount property set to 1
            ingredients = value.ingredients.map(name => {
                return {
                    name: name,
                    amount: 1
                }
            });
        }
        if (this.mode === "Edit") {
            this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
        } else {
            this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
        }
        this.recipeForm.reset(); // optional because popToRoot discards the view anyway
        this.navCtrl.popToRoot();
    }

    onManageIngredients() {
        const actionSheet = this.actionSheetCtrl.create({
            title: "What do you want to do?",
            buttons: [
                {
                    text: "Add Ingredient",
                    handler: () => {
                        this.createNewIngredientAlert().present();
                    }
                },
                {
                    text: "Remove All Ingredients",
                    rold: "destructive",
                    handler: () => {
                        //  <FormArray> tells typescript that this... is of type FormArray because it doesn't know otherwise
                        const fArray: FormArray = <FormArray>this.recipeForm.get("ingredients");
                        // Shrink array while looping through it
                        const len = fArray.length;
                        if (len > 0) {
                            for (let i = len - 1; i >=0; i--) {
                                // removeAt removes the control at the given index
                                fArray.removeAt(i);
                            }
                            const toast = this.toastCtrl.create({
                                message: "All ingredients were deleted!",
                                duration: 1500,
                                position: "bottom", // bottom is default
                            });
                            toast.present();
                        }
                    }
                },
                {
                    text: "Cancel",
                    role: "cancel"
                }
            ]
        });
        actionSheet.present();
    }

    private createNewIngredientAlert() {
        return this.alertCtrl.create({
            title: "Add Ingredient",
            inputs: [
                {
                    name: "name",
                    placeholder: "Name"
                }
            ],
            buttons: [
                {
                    text: "Cancel",
                    role: "cancel"
                },
                {
                    text: "Add",
                    handler: data => {
                        if (data.name.trim() == "" || data.name == null) {
                            const toast = this.toastCtrl.create({
                                message: "Please enter a valid value!",
                                duration: 1500,
                                position: "bottom", // bottom is default
                            });
                            toast.present();
                            return;
                        }
                        // Add a new FormControl
                        (<FormArray>this.recipeForm.get("ingredients"))
                            .push(new FormControl(data.name, Validators.required));
                            const toast = this.toastCtrl.create({
                                message: "Item added!",
                                duration: 1500,
                                position: "bottom", // bottom is default
                            });
                            toast.present();
                    }
                }
            ]
        });
    }

    private initializeForm() {
        let title = null;
        let description = null;
        let difficulty = "Medium";
        let ingredients = [];

        if (this.mode === "Edit") {
            title = this.recipe.title;
            description = this.recipe.description;
            difficulty = this.recipe.difficulty;
            for (let ingredient of this.recipe.ingredients) {
                ingredients.push(new FormControl(ingredient.name, Validators.required));
            }
        }

        this.recipeForm = new FormGroup({
            // A FormControl constructor accepts three, optional arguments: the initial data value, an array of validators, and an array of async validators
            "title": new FormControl(title, Validators.required), // default value is null, required field
            "description": new FormControl(description, Validators.required),
            "difficulty": new FormControl(difficulty, Validators.required), // default value is Medium
            "ingredients": new FormArray(ingredients), // start with empty array
        });
    }

}
