async function postFormHandler(event) {
    event.preventDefault();
    const postText = document.getElementById('post-field').value.trim();

    if (postText) {
        const response = await fetch("/api/dashboard/post", {
          method: "POST",
          body: JSON.stringify({ title: postText, user_id: currentUserId }),
          headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Failed to log in");
        }
    };
}
document
    .querySelector('.post-form')
    .addEventListener("submit", postFormHandler);