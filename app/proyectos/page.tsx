import type { Metadata } from "next";
import Header from "../components/Header";
import AllProjects from "../components/AllProjects";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Explora los proyectos web, sistemas backend y aplicaciones de Jhoandry Apaza: FortexMan360, Shiyan Ryans, PostulaPe y más.",
};
export default function ProjectsPage() {
  return (
    <>
      <Header />
      <CustomCursor />
      <AllProjects />
      <Footer />
    </>
  );
}
