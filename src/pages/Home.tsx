import React from "react";
import SelectorContainer from "../oldComponents/SelectorContainer";
import { useData } from "../hooks/useData";

const Home: React.FC = () => {
  const { loading } = useData();

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <SelectorContainer />
      )}
    </div>
  );
};

export default Home;
