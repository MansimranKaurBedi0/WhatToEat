import { useState } from "react";
import API from "../api/api";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");

  const [recipe, setRecipe] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const ingredientArray = ingredients.split(",").map((item) => item.trim());

      const res = await API.post("/meals/recipe", {
        ingredients: ingredientArray,
      });

      setRecipe(res.data.recipe);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      p-10
      "
    >
      <h1
        className="
        text-4xl
        font-bold
        mb-6
        "
      >
        AI Recipe Generator 🍳
      </h1>

      <textarea
        placeholder="
        paneer, onion, tomato
        "
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="
        border
        p-4
        rounded-lg
        w-[500px]
        h-[120px]
        "
      />

      <button
        onClick={handleGenerate}
        className="
        mt-4
        bg-black
        text-white
        px-6
        py-3
        rounded-lg
        "
      >
        Generate Recipe
      </button>

      {loading && <p className="mt-5">Generating Recipe...</p>}

      {recipe && (
        <div
          className="
            mt-10
            bg-white
            shadow-lg
            rounded-xl
            p-6
            w-[700px]
            "
        >
          <h2
            className="
              text-3xl
              font-bold
              "
          >
            {recipe.dishName}
          </h2>

          <h3
            className="
              mt-5
              text-xl
              font-semibold
              "
          >
            Steps
          </h3>

          <ul
            className="
              list-disc
              ml-5
              "
          >
            {recipe.recipe.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <h3
            className="
              mt-5
              text-xl
              font-semibold
              "
          >
            Health Benefit
          </h3>

          <p>{recipe.benefit}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeGenerator;
