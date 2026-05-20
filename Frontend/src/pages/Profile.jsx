import { useEffect, useState } from "react";

import API from "../api/api";

function Profile() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    dietPreference: "",
    allergies: "",
    location: "",
  });

  const [message, setMessage] = useState("");

  // GET PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");

      setFormData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put("/auth/profileUpdate", formData);

      console.log(res.data);

      setMessage("Profile Updated ✅");
    } catch (error) {
      console.log(error);

      setMessage("Update Failed");
    }
  };

  return (
    <div
      className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-100
            "
    >
      <form
        onSubmit={handleSubmit}
        className="
                bg-white
                p-8
                rounded-xl
                shadow-lg
                w-[450px]
                flex
                flex-col
                gap-4
                "
      >
        <h1
          className="
                    text-3xl
                    font-bold
                    text-center
                    "
        >
          Complete Profile
        </h1>

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="activityLevel"
          placeholder="Activity Level"
          value={formData.activityLevel}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="goal"
          placeholder="Goal"
          value={formData.goal}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="dietPreference"
          placeholder="Diet Preference"
          value={formData.dietPreference}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="allergies"
          placeholder="Allergies"
          value={formData.allergies}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
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
          Save Profile
        </button>

        <p
          className="
                    text-center
                    "
        >
          {message}
        </p>
      </form>
    </div>
  );
}

export default Profile;
