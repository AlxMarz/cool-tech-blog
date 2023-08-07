async function commentButtonHandler(event) {
    event.preventDefault();
  }
  
  document
    .querySelector(".comment-btn")
    .addEventListener("click", commentButtonHandler);