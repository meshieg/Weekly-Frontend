import { routes } from "./Routes";
import BottomToolbar from "./components/BottomToolbar/BottomToolbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./general.css";
import "./App.css";
import Toolbar from "./components/Toolbar/Toolbar";
import { ToolbarProvider } from "./contexts/ToolbarContext";
import { AlertProvider } from "./contexts/AlertContext";
import { NewItemsProvider } from "./contexts/NewItemsStore/NewItemsProvider";
import FloatingActionButton from "./components/FloatingActionButton/FloatingActionButton";

function App() {
  return (
    <div className="app">
      <ToolbarProvider>
        <AlertProvider>
          <NewItemsProvider>
            <BrowserRouter>
              {/* <div className="app__header"> */}
              {/* </div> */}
              <Toolbar />
              <div className="app__content">
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </div>
              <FloatingActionButton />
              <div className="app__bottom">
                <BottomToolbar />
              </div>
            </BrowserRouter>
          </NewItemsProvider>
        </AlertProvider>
      </ToolbarProvider>
    </div>
  );
}

export default App;
