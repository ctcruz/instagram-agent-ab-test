import "./App.css";
import { Container } from "./components/layout/container";
import { Toaster } from "./components/ui/sonner";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <>
      <Container maxWidth="4xl">
        <HistoryPage />
      </Container>
      <Toaster />
    </>
  );
}

export default App;
