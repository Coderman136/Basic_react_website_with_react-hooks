import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';
import Recipe from './Recipe';
import {v4 as uuidv4} from 'uuid'


function App() {

  const APP_ID = "f01314a7";
  const APP_KEY = "58a42dd4c4dfba798b9474c042efe6ba";

  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken")

  useEffect(() => {
    getRecipe()
  },[query])



  const getRecipe = async () => {
    const response = await axios(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    setRecipe(response.data.hits)
    console.log(response.data.hits);
  }


  const changeHandler = (e) => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch("")
  }

  return (
    <div className="App">
      <h1>Hello React</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value= {search} onChange={changeHandler}/>
        <button className="search-button">Search</button>
      </form>
      <div className= "recipes"> 
      {recipe.map(recipe => (
      <Recipe 
      key= {uuidv4()}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients = {recipe.recipe.ingredients}
      />
      ))}
      </div>
    </div>
    
  );
}

export default App;
