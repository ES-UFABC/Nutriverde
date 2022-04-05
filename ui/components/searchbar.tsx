async function submit(e: any) {
  console.log(e);
  e.preventDefault();
  try {
    const search = e.target.s.value;
    console.log("value: ", search);

    let res = await fetch(`http://localhost:3000/products/search/${search}`);
    let resJson = await res.json();
    console.log(res.status, resJson);
  } catch (err) {
    console.log(err);
  }
}

export default function SearchBar() {
  return (
    <form action="/" onSubmit={submit}>
      <label htmlFor="header-search">
        <span className="visually-hidden">Search products</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search products"
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  );
}
