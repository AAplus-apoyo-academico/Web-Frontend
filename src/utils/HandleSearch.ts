import DOMPurify from "dompurify";

export default function HandleSearch() {
  const $searchField = document.getElementById("search") as HTMLInputElement;
  const $searchReadout = document.getElementById(
    "searchReadout"
  ) as HTMLParagraphElement;

  const updateSearchReadout = (search: string) => {
    $searchReadout.innerText = search
      ? `Resultados de búsqueda para ${search}`
      : "";
  };

  window.addEventListener("DOMContentLoaded", () => {
    const urlParams = DOMPurify.sanitize(
      new URLSearchParams(window.location.search).get("q")
    );
    updateSearchReadout(urlParams);
    $searchField.value = urlParams;
    $searchField?.focus();
  });

  $searchField?.addEventListener("input", () => {
    const searchTerm: string = DOMPurify.sanitize($searchField.value);
    if (!searchTerm || searchTerm.length === 0) {
      const url = new URL(window.location.href, window.location.origin);
      url.searchParams.delete("q");
      window.history.pushState({}, "", url.href);
    }
    updateSearchReadout(searchTerm);

    // const filteredData = COURSES.filter((el) => el.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  });
}
