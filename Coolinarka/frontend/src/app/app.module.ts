import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { AllRecepiesComponent } from './all-recepies/all-recepies.component';
import { RecipeComponent } from './recipe/recipe.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SearchByIngredientComponent } from './search-by-ingredient/search-by-ingredient.component';
import { SearchByNameComponent } from './search-by-name/search-by-name.component';
import { SearchByAuthorComponent } from './search-by-author/search-by-author.component';
import { NgToastModule } from 'ng-angular-popup'

const routes: Routes = [
  { path: '', component: AllRecepiesComponent },
  { path: 'profile/profileDetails', component: MyProfileComponent },
  { path: 'profile/login', component: LoginComponent },
  { path: 'profile/signup', component: SignupComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'show-my-recipes', component: MyRecipesComponent},
  { path: 'edit-a-recipe/:id', component: EditRecipeComponent },
  { path: 'add-a-recipe', component: NewRecipeComponent},
  { path: 'search-by-ingredient', component: SearchByIngredientComponent},
  { path: 'search-by-author', component: SearchByAuthorComponent},
  { path: 'search-by-recepie-name', component: SearchByNameComponent},
  { path: '**', component: PagenotfoundComponent } 
];


@NgModule({
  declarations: [
    AppComponent,
    AllRecepiesComponent,
    RecipeComponent,
    MyProfileComponent,
    LoginComponent,
    SignupComponent,
    MyRecipesComponent,
    PagenotfoundComponent,
    NewRecipeComponent,
    EditRecipeComponent,
    SearchByIngredientComponent,
    SearchByNameComponent,
    SearchByAuthorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
