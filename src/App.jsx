import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fakeStoreApi from "./services/api/fakeStore.js";

function App() {

    async function handleFirstClick() {
        await fakeStoreApi.getAllProducts();
    }

    async function handleSecondClick() {
        await fakeStoreApi.getAllCarts();
    }

    async function handleThirdClick() {
        await fakeStoreApi.getAllUsers();
    }

  return (
    <div className="wrapper">
        <button onClick={handleFirstClick}>
            Products
        </button>
        <button onClick={handleSecondClick}>
            Carts
        </button>
        <button onClick={handleThirdClick}>
            Users
        </button>
    </div>
  )
}

export default App
