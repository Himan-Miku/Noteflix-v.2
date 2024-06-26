"use client";
import { noteData } from "@/app/Notes";
import { AlgoliaStore } from "@/context/AlgoliaContext";
import { useSession } from "next-auth/react";
import algoliasearch from "algoliasearch/lite";
import { ISidebarContext, sidebarContext } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";

interface SearchResultData {
  readonly objectID: string;
  path: string;
  lastModified: number;
}

interface SearchResultItem extends SearchResultData, noteData {}

export type SearchResults = SearchResultItem[];

const Searchbar = ({ isOnMobile }: { isOnMobile: boolean }) => {
  const { showSidebar, setShowSidebar } = sidebarContext() as ISidebarContext;
  const pathname = usePathname();
  const isSearchBarEnabled = pathname === "/";
  const { queryy, setQueryy, setSearchResults } = AlgoliaStore();
  const { data: session } = useSession();

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
  );
  const index = searchClient.initIndex("notes");

  async function search() {
    if (queryy.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      let userId = session?.user?.email || "";

      const result = await index.search(queryy, {
        filters: `userId:${userId}`,
      });

      setSearchResults(result.hits as SearchResults);
    } catch (error) {
      console.error("Error Searching with Algolia : ", error);
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {isOnMobile ? (
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-circle h-[2.5rem]"
        >
          <svg
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#e9e9e9]"
          >
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </button>
      ) : (
        <button className="btn btn-ghost btn-circle h-[2.5rem]">
          <svg
            focusable="false"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#e9e9e9]"
          >
            <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
          </svg>
        </button>
      )}

      <input
        placeholder={
          isSearchBarEnabled ? "Search . . ." : "Search from Notes tab 📝"
        }
        className="w-full px-2 bg-[#525355] text-[#E9E9E9] placeholder-[#E9E9E9] outline-none"
        type="text"
        value={queryy}
        onChange={(e) => setQueryy(e.target.value)}
        onKeyUp={search}
        disabled={!isSearchBarEnabled}
      />
      <button
        className="btn btn-ghost btn-circle h-[2.5rem]"
        onClick={() => setQueryy("")}
      >
        <svg
          focusable="false"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#E9E9E9]"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
      </button>
    </>
  );
};

export default Searchbar;
