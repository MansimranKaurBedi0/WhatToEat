import { useEffect, useState } from "react";
import API from "../api/api";

function HealthAnalysis() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchHealth = async () => {
    try {
      const res = await API.get("/userHealth/health");

      setData(res.data);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message || "Failed to load health analysis",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div
      className="
      min-h-screen
      p-10
      bg-gray-100
      "
    >
      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Health Analysis 📊
      </h1>

      {/* Metrics */}

      <div
        className="
        grid
        grid-cols-2
        gap-4
        "
      >
        <div className="bg-white p-5 rounded-xl shadow">
          Health Score:
          {data.metrics.healthScore}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Protein Score:
          {data.metrics.proteinScore}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Junk Score:
          {data.metrics.junkScore}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Sugar Score:
          {data.metrics.sugarScore}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Consistency Score:
          {data.metrics.consistencyScore}
        </div>
      </div>

      {/* AI Insights */}

      {data.aiInsights && (
        <>
          <div
            className="
              bg-white
              mt-8
              p-6
              rounded-xl
              shadow
              "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-4
                "
            >
              Status
            </h2>

            <p>{data.aiInsights.status}</p>
          </div>

          <div
            className="
              bg-white
              mt-8
              p-6
              rounded-xl
              shadow
              "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-4
                "
            >
              Strengths 💪
            </h2>

            <ul
              className="
                list-disc
                ml-5
                "
            >
              {data.aiInsights.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            className="
              bg-white
              mt-8
              p-6
              rounded-xl
              shadow
              "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-4
                "
            >
              Risks ⚠️
            </h2>

            <ul
              className="
                list-disc
                ml-5
                "
            >
              {data.aiInsights.risks.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            className="
              bg-white
              mt-8
              p-6
              rounded-xl
              shadow
              "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-4
                "
            >
              Suggestions 🚀
            </h2>

            <ul
              className="
                list-disc
                ml-5
                "
            >
              {data.aiInsights.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default HealthAnalysis;
