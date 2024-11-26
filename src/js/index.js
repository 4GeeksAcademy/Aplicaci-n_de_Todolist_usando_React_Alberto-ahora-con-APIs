//import react into the bundle
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import ToDoList from "./component/todoList.jsx";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<ToDoList/>);

