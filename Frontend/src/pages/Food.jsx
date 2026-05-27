import { useEffect, useState } from "react";
import API from "../api/api";

function FoodLog() {
  const [formData, setFormData] = useState({
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    sugar: "",
    mealType: "",
    category: "",
  });

  const [foodLogs, setFoodLogs] = useState([]);

  const [message, setMessage] = useState("");

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD FOOD LOG
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/food/addFoodLog", formData);

      setMessage(res.data.message);

      fetchFoodLogs();

      setFormData({
        foodName: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        sugar: "",
        mealType: "",
        category: "",
      });
    } catch (error) {
      console.log(error);

      setMessage("Failed to add food log");
    }
  };

  // GET FOOD LOGS
  const fetchFoodLogs = async () => {
    try {
      const res = await API.get("/food/getFoodLogs");

      setFoodLogs(res.data.foodLogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoodLogs();
  }, []);

  // DELETE FOOD LOG
  const deleteFood = async (foodId) => {
    try {
      await API.delete(`/food/deleteFoodLog/${foodId}`);

      fetchFoodLogs();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-6
          rounded-xl
          shadow-lg
          flex
          flex-col
          gap-4
          max-w-md
          mx-auto
        "
      >
        <h1 className="text-3xl font-bold text-center">Add Food Log</h1>

        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={formData.foodName}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="protein"
          placeholder="Protein"
          value={formData.protein}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="carbs"
          placeholder="Carbs"
          value={formData.carbs}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="fats"
          placeholder="Fats"
          value={formData.fats}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="sugar"
          placeholder="Sugar"
          value={formData.sugar}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="mealType"
          placeholder="Meal Type"
          value={formData.mealType}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="
            bg-black
            text-white
            p-3
            rounded-lg
          "
        >
          Add Food
        </button>

        <p className="text-center">{message}</p>
      </form>

      {/* FOOD LOGS */}

      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Food Logs</h2>

        <div className="grid gap-4">
          {foodLogs.map((food) => (
            <div
              key={food._id}
              className="
                bg-white
                p-5
                rounded-xl
                shadow
              "
            >
              <h3 className="text-2xl font-bold">{food.foodName}</h3>

              <p>Calories: {food.calories}</p>
              <p>Protein: {food.protein}</p>
              <p>Carbs: {food.carbs}</p>
              <p>Fats: {food.fats}</p>
              <p>Sugar: {food.sugar}</p>
              <p>Meal Type: {food.mealType}</p>
              <p>Category: {food.category}</p>

              <button
                onClick={() => deleteFood(food._id)}
                className="
                  mt-4
                  bg-red-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodLog;
