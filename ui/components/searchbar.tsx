import { SearchIcon } from "@heroicons/react/outline";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  
export default function SearchBar(props:any) {

  async function submit(e: any) {
    try {
      e.preventDefault();

      const search = e.target.s.value;
      const path = search ? `${props.searchPath}${search}` : props.default;
      const res = await fetch(`${serverUrl}/${path}`);
      const resJson = await res.json();
      props.onSet(resJson.items);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="pb-4" onSubmit={submit}>
          <div className="flex">
            <input
              type="text"
              id="search"
              name="s"
              className="block p-4 text-md rounded-none rounded-l-lg bg-gray-50 border border-emerald-800 text-gray-900 focus:z-10 focus:ring-emerald-900 focus:border-emerald-900 block flex-1 min-w-0 w-full border-emerald-800"
              placeholder="Procure por produtos..."
            />
            <button
              className="inline-flex items-center px-4 text-md text-white bg-emerald-800 rounded-r-lg border border-l-0 border-emerald-800 hover:bg-emerald-700 focus:z-10 focus:ring-4 focus:ring-emerald-900"
              type="submit"
            >
              <SearchIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </form>
  );
}
