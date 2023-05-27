const url = 'https://oslosup-api.nattrass.no/wp-json/wp/v2/posts/' + '?consumer_key=ck_01fa09c9121a3587614b38ac931dffc141d995cd' +
    '&consumer_secret=cs_3353d2426c7919a4ac78d662aaac12d1b17caec9' + '&per_page=100';


async function getPosts() {

    const response = await fetch(url);  
    const posts = await response.json();
    return posts;
}


function createPostHTML(post) {

    const postsContainer = document.querySelector(".posts-container");
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container")
    postsContainer.append(postContainer);

    const link = document.createElement("a");
    link.href = `post.html?id=${post.id}`;
    const btn = document.createElement("button");
    btn.innerText = "Read more";
    btn.classList.add("read-more");
    link.appendChild(btn);
    postContainer.prepend(link);

    const excerpt = document.createElement("div");
    excerpt.classList.add(".excerpt");
    excerpt.innerHTML = post.excerpt.rendered;
    postContainer.prepend(excerpt);

    const title = document.createElement("h3");
    title.classList.add("title");
    title.innerText = post.title.rendered;
    postContainer.prepend(title);

    const date = document.createElement("div");
    date.innerText = post.date;
    date.classList.add("date");
    postContainer.prepend(date);

    const img = document.createElement("img");
    img.alt = post.better_featured_image.alt_text;
    img.src = post.better_featured_image.source_url;
    img.classList.add("img")
    postContainer.prepend(img);

}

function createPostsHTML(posts) {
console.log(posts)
    let postLength = Math.min(posts.length, 10)
    for (let i = 0; i < postLength; i++) {
        createPostHTML(posts[i]);
    }
}

async function main() {
    const posts = await getPosts();
    createPostsHTML(posts);
}

main()

const readMoreBtn = document.querySelector("#more-posts");
readMoreBtn.addEventListener("click", second);

function createMorePosts(posts, currentPostCount) {
    for (let i=currentPostCount; i < posts.length; i++) {
        const newPost = posts[i];
        createPostHTML(newPost);
    }
    readMoreBtn.style.display = "none";
}

async function second() {
    const posts = await getPosts(url);
    currentPostCount = document.querySelectorAll(".post-container").length;
    createMorePosts(posts, currentPostCount);
    return posts;
}           


async function filterPosts(tag) {

    posts = await getPosts()
    const filteredPosts = posts.filter(post => post.tags.includes(tag));
    const postsContainer = document.querySelector(".posts-container");
    postsContainer.innerHTML = "";
    createPostsHTML(filteredPosts);
    const readMoreBtn = document.querySelector("#more-posts");
    readMoreBtn.style.display = "none";
}

