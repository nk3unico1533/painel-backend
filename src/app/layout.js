import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Painel Consulta",
  description: "Painel de consultas — Dark Neon"
};

export default function RootLayout({ children }) {
  // read basic session from localStorage in client side components (Header is client)
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          <Header user={null} />
          {children}
          <div className="footer-small">© {new Date().getFullYear()} Painel Consulta</div>
        </div>
      </body>
    </html>
  );
}