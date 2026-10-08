import NavBar from './components/NavBar';
import Orchids from './components/Orchids';

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        {/* Section Home */}
        <section id="home" className="p-4 bg-light text-center">
          <h1>Welcome to Orchid Gallery</h1>
          <p>Khám phá các loài hoa lan độc đáo</p>
        </section>

        {/* Component Orchids đã có id="orchids" bên trong Container */}
        <Orchids />

        {/* Section About */}
        <section id="about" className="p-4 bg-secondary text-white text-center">
          <h2>About Us</h2>
          <p>Ứng dụng quản lý và trưng bày bộ sưu tập hoa lan.</p>
        </section>
      </main>
    </>
  );
}