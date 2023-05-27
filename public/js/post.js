const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const url = 'https://oslosup-api.nattrass.no/wp-json/wp/v2/posts/' + id + '?consumer_key=ck_01fa09c9121a3587614b38ac931dffc141d995cd' +
'&consumer_secret=cs_3353d2426c7919a4ac78d662aaac12d1b17caec9';

async function getPost() {

    const response = await fetch(url);
    const post = await response.json();
    return post;
}

getPost();

function CreateImage(post) {

    const imageContainer = document.querySelector(".image-post");
    const image = document.createElement("img");
    image.addEventListener("click", openModal);
    image.alt = post.better_featured_image.alt_text;
    image.src = post.better_featured_image.source_url;
    imageContainer.append(image);
    function openModal() {
        let modal = document.getElementById("modal");
        modal.append(image);
        image.classList.add("modal-image");
        modal.classList.add("modal");
    }
    modal.addEventListener("click", closeModal);
    function closeModal() {
        let modal = document.getElementById("modal");
        if (event.target == modal) {modal.classList.remove("modal");}
        imageContainer.append(image)
    }
}

function createPost(post) {

    const postContainer = document.querySelector(".text-post");
    const date = document.createElement("div");
    date.innerText = post.date;
    postContainer.append(date);

    const title = document.createElement("h1");
    title.innerText = post.title.rendered;
    postContainer.append(title);

    const text = document.createElement("div");
    text.innerHTML = post.content.rendered;
    postContainer.append(text);

}

async function main () {
    const post = await getPost();
    CreateImage(post);
    createPost(post);
    console.log(post);
}

main()
