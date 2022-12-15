import NavPanel from "../../components/NavPanel";

export default function Page() {

  return (
    <main>
      <h1>Page 2</h1>
      <p>Bla bla bla 2</p>
      <NavPanel backHref="/page1" />
    </main>
  );
}
