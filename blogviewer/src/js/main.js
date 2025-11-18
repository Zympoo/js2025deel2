// Import our custom CSS
import "/scss/styles.scss"

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js
let comments = [];
let posts = []

const outStatus = document.getElementById('ex3_status')
const postCard = document.getElementById('ex3_post_card')
const postTitle = document.getElementById('ex3_title')
const postBody = document.getElementById('ex3_body')
const commentsCard = document.getElementById('ex3_comments_card')
const commentsEmpty = document.getElementById('ex3_comments_empty')
const commentsList = document.getElementById('ex3_comments_list')

async function loadComments(id){
    try{
        outStatus.innerHTML = "⏳ Laden..."
        outStatus.classList = "alert alert-warning mb-3"

        const [commentsRes, postRes] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`),
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)]);

        if(!commentsRes.ok || !postRes.ok) throw new Error("Fout laden API")

        comments = await commentsRes.json()
        posts = await postRes.json()

        updatePostCard()

        outStatus.innerHTML = "✅ Post geladen"
        outStatus.classList = "alert alert-success"
    }
    catch{
        outStatus.innerHTML = "❌ Fout bij het laden van de posts/comments ❌"
        outStatus.classList = "alert alert-danger mb-3"
    }
}
function updatePostCard(){
    postCard.classList.remove('d-none')
    commentsCard.classList.remove('d-none')
    commentsEmpty.classList.add('d-none')

    postTitle.innerHTML = posts.title
    postBody.innerHTML = posts.body;


    commentsList.innerHTML = comments.map(comm => {
        return `<li class="list-group-item">
                <strong>${comm.name}</strong><br/>
                <span class="text-muted small">${comm.email}</span><br/>
                <span>${comm.body}</span>
            </li>`
    }).join('')
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ex3_btn')?.addEventListener('click', () => {
        const inpId = Number(document.getElementById('ex3_post_id').value);

        postCard.classList.add('d-none')
        commentsCard.classList.add('d-none')
        commentsEmpty.classList.add('d-none')
        commentsList.classList.remove('d-none')

        if(!inpId || Math.sign(inpId) !== 1){
            outStatus.innerHTML = "❌ Vul de ID juist in. ❌"
            outStatus.classList = "alert alert-danger mb-3"
            commentsList.classList.add('d-none')
        }
        else{
            loadComments(inpId)
        }
    })
})