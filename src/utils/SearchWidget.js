import DOMPurify from "dompurify";

const $form = document.querySelector("form");
$form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData($form);
  const searchTerm = DOMPurify.sanitize(formData.get("search")?.toString());
  const url = new URL(window.location.href, window.location.origin);
  if (!searchTerm || searchTerm.length === 0) return;
  url.searchParams.set("q", searchTerm);
  history.pushState({}, "", url);
});
