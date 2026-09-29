import { Route, Routes } from "react-router"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"

function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
            
            

            <Footer />
        </>

    )
}

export default App
