import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TipForm from "./components/TipForm";

function App() {
  return (
    <div className="home-page">
      <Header />

      <main className="container">
        <section className="card">
          <Banner />
          <TipForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
