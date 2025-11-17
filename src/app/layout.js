import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Painel Consulta",
  description: "Painel de consultas — Dark Neon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="footer-small">
          © {new Date().getFullYear()} Painel Consulta
        </footer>
      </body>
    </html>
  );
}