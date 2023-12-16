import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/home/RegisterPage"
import LoginPage from "./pages/home/LoginPage"
import {AuthProvider} from "./context/AuthContex"
import HomePage from "./pages/home/HomePage"
import TaskPage from "./pages/tasks/TaskPage"
import TaskFormPage from "./pages/tasks/TaskFormPage"
import ProfilePage from "./pages/users/ProfilePage"
import ProtectedRoute from "./ProtectedRoute"
import { TaskProvider } from "./context/TaskContext"
import Navbar from "./components/Navbar"
import UsPage from "./pages/home/UsPage"
import ContactPage from "./pages/home/ContactPage"
import Footer from "./components/Footer"
import ProductsPage from "./pages/products/ProductsPage"
import ProductFromPage from "./pages/products/ProductFromPage"
import { ProductProvider } from "./context/ProductContext"
import QuotePage from "./pages/quotes/QuotePage"
import ProjectPage from "./pages/projects/ProjectPage"
import QuoteFormPage from "./pages/quotes/QuoteFormPage"
import ProjectFormPage from "./pages/projects/ProjectFormPage"
import UserPage from "./pages/users/UserPage"
import { QuoteProvider } from "./context/QuoteContext"
import ReplyFormPage from "./pages/quotes/ReplyFormPage"

function App() {
  return (
    <AuthProvider>
      <TaskProvider> {/* Provider de tareas para pasar metodos y variables a los demas componentes*/}
      <ProductProvider> {/* Provider de productos para pasar metodos y variables a los demas componentes*/}
      <QuoteProvider> {/* Provider de cotizaciones para pasar metodos y variables a los demas componentes*/}
        <BrowserRouter>
          <Navbar/> {/* Navbar para que sea visible en todas la paginas*/}
          <Routes>
              {/* Rutas no protegidas */}
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage/>}></Route>
              <Route path="/us" element={<UsPage/>}></Route>
              <Route path="/contact" element={<ContactPage />}></Route>

              {/* Ruta de cotizacion no protegida para que los clientes puedan cotizar */}
              <Route path="/add-quote" element={<QuoteFormPage />}></Route>
              <Route path="/add-quote/product/:productId" element={<QuoteFormPage />}></Route>
              
              <Route element={<ProtectedRoute />}> {/* Rutas protegidas mediante autenticacion por token */}
                {/* Rutas de tareas */}
                <Route path="/tasks" element={<TaskPage />}></Route>
                <Route path="/add-task" element={<TaskFormPage />}></Route>
                <Route path="/add-task/:id" element={<TaskFormPage />}></Route>

                {/* Rutas de productos */}
                <Route path="/products" element={<ProductsPage />}></Route>
                <Route path="/add-product" element={<ProductFromPage/>}></Route>
                <Route path="/add-product/:id" element={<ProductFromPage/>}></Route>

                {/* Rutas de cotizaciones */}
                <Route path="/quotes" element={<QuotePage />}></Route>
                <Route path="/add-quote/:id" element={<QuoteFormPage />}></Route>
                <Route path="/quote-reply/:id" element={<ReplyFormPage />}></Route>

                {/* Rutas de poyectos */}
                <Route path="/projects" element={<ProjectPage />}></Route>
                <Route path="/add-project" element={<ProjectFormPage />}></Route>
                <Route path="/add-project/:id" element={<ProjectFormPage />}></Route>

                {/* Rutas de usuarios */}
                <Route path="/profile" element={<ProfilePage />}></Route>
                <Route path="/users" element={<UserPage />}></Route>

              </Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
        </QuoteProvider>
        </ProductProvider>
      </TaskProvider>
    </AuthProvider>
    
  )
}

export default App
