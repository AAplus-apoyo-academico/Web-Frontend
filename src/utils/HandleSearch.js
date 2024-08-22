import DOMPurify from "dompurify";

const $searchField = document.getElementById("search");
const $searchReadout = document.getElementById("searchReadout");
const $coursesContainer = document.getElementById("coursesContainer");

const updateSearchReadout = (search) => {
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
  const searchTerm = DOMPurify.sanitize($searchField.value);
  const courses = Array.from($coursesContainer.children);

  if (!searchTerm || searchTerm.length === 0) {
    const url = new URL(window.location.href, window.location.origin);
    url.searchParams.delete("q");
    window.history.pushState({}, "", url.href);
  }
  updateSearchReadout(searchTerm);

  if (
    parseInt(searchTerm.length) <
    parseInt($searchField.getAttribute("minlength"))
  ) {
    courses.forEach((el) => {
      el.style.display = "initial";
    });
    return;
  }

  courses.filter((el) => {
    let title = el.querySelector("h5");
    !title.innerText
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase())
      ? (el.style.display = "none")
      : (el.style.display = "initial");
    return;
  });
});
