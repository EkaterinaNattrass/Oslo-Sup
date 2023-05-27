const url = 'https://oslosup-api.nattrass.no/wp-json/wp/v2/posts/' + '?consumer_key=ck_01fa09c9121a3587614b38ac931dffc141d995cd' +
'&consumer_secret=cs_3353d2426c7919a4ac78d662aaac12d1b17caec9';

async function getLatestPosts() {
    try { 
    const response = await fetch(url);
    const posts = await response.json();
    return(posts);
    } catch (error) {
        document.innerHTML = 'Oops, sorry, something went wrong';
        console.log(error);
    }
}

function createLatestPost(post) {

    const carousel = document.querySelector(".carousel");
    const latestPost = document.createElement("div");
    
    latestPost.classList.add("latest-posts");
    latestPost.innerHTML = post.excerpt.rendered;
    carousel.append(latestPost);

    const postTitle = document.createElement("h3");
    postTitle.innerText = post.title.rendered;
    latestPost.prepend(postTitle);

    const postImg = document.createElement("img");
    postImg.src = post.better_featured_image.source_url;
    latestPost.prepend(postImg);
    postImg.classList.add("img");

    const btn = document.createElement("button");
    btn.innerHTML = `<a href='post.html?id=${post.id}'>Read more</a>`;
    latestPost.append(btn);
    btn.classList.add("read-more");
}

function createLatestPosts(posts) {
    for (let i = 0; i < 5; i++) {
        const post = posts[i];
        createLatestPost(post);   
    }
}

async function main() {
    const posts = await getLatestPosts();
    createLatestPosts(posts)
    showSlides(0);
}
    
main()

let slideIndex = 1;
showSlides(slideIndex);

function plusSlide(n) {
    showSlides(slideIndex +=n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("latest-posts");
    if (n > slides.length) {
    slideIndex=1
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i=0; i<slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}








