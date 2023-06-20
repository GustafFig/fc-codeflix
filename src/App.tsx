import { ThemeProvider, Box } from "@mui/system";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { createTheme } from "@mui/material";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box component="main"
        sx={{
          height: "100vh",
        }}
      >
        <Header />
        <Layout>
          <h1>Olá mundo!</h1>
        </Layout>
      </Box>
    </ThemeProvider>
  );
}

export default App;
