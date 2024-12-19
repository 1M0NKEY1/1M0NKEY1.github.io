document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comments");
    const preloader = document.querySelector(".preloader");
    const errorMessage = document.getElementById("error-message");

    preloader.style.display = "block";

    const fetchComments = async () => {
        try {
            const randomId = Math.random() < 0.5 ? 100 : 200;
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${randomId}`);

            if (!response.ok) {
                throw new Error("Сеть недоступна");
            }

            const comments = await response.json();
            renderComments(comments);
        } catch (error) {
            console.error(error);
            errorMessage.style.display = "block";
        } finally {
            preloader.style.display = "none";
        }
    };

    const renderComments = (comments) => {
        commentsContainer.innerHTML = "";
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.innerHTML = `
                <h4>${comment.name} (${comment.email})</h4>
                <p>${comment.body}</p>
                <hr>
            `;
            commentsContainer.appendChild(commentElement);
        });
    };

    fetchComments();
});