import NavPanel from "../../components/NavPanel";

export default function Page() {

  return (
    <main>
      <h1>Page 1</h1>
      <p>Bla bla bla 1</p>
      <NavPanel backHref="/" nextHref="/page2" />
    </main>
  );
}