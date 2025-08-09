import "./App.css";
import { Container } from "./components/layout/container";
import { Toaster } from "./components/ui/sonner";
import HistoryPage from "./pages/HistoryPage";
import { ReactQueryProvider } from "./providers/QueryClientProvider";

function App() {
  return (
    <ReactQueryProvider>
      <Container maxWidth="4xl">
        <HistoryPage />
      </Container>
      <Toaster />
    </ReactQueryProvider>
  );
}

export default App;
