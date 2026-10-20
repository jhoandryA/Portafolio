import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Playground from "../components/Playground";
export const metadata: Metadata = {
  title: "Una pausa creativa",
  description:
    "Un espacio para la curiosidad: juega una partida de ajedrez y conoce los proyectos y la experiencia de Jhoandry Apaza.",
};
export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <Playground />
      <Footer />
    </>
  );
}
