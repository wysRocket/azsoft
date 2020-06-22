import React from "react";
import { CacheTable } from "./components/Table";
import { CacheForm } from "./components/Input";
import { CacheState } from "./context/CacheState";

function App() {
  return (
    <CacheState>
      <div className="container pt-4">
        <CacheForm />
        <CacheTable />
      </div>
    </CacheState>
  );
}

export default App;
