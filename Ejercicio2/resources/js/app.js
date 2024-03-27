const app = {
    urlPosts : "https://jsonplaceholder.typicode.com/posts",
    urlComments : "https://jsonplaceholder.typicode.com/comments",
    urlUsers : "https://jsonplaceholder.typicode.com/users",

    userId : "",
    keyWord : "",

    loadPosts : async function() {
        const cont = $("#content");
        cont.css("whidth", "100%");
        cont.addClass("mx-auto mt-5");
        let html = "";
        let urlAux = "";
        if(this.userId !== ""){
            urlAux = "?userId=" + this.userId;
        }
        //Se utiliza el await aca para indicar que la variable r va a obtener un valor de la funcion asincrona fetch
        let r = await fetch(this.urlUsers)
                    .then( res => res.json())
                    .catch( err => console.error("Se produjo un error: ", err));

        fetch(this.urlPosts + urlAux)
            .then( res => res.json())
            .then( posts => {
                for(let post of posts){
                    if(post.body.indexOf(this.keyWord) !== -1){
                        html+=`
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <h6 class="card-subtitle text-muted">${r[post.userId-1].name}</h6>
                                <p class="card-text">${post.body}</p>
                            </div>
                            <div class="card-footer text-body-secondary">
                                <button class="btn btn-link" type="button"
                                    id="btn-ver-com${post.id}"
                                    onclick="app.loadComment(${post.id})">
                                    Ver comentarios
                                </button>
                                <button class="btn btn-link d-none" type="button"
                                    id="btn-cer-com${post.id}"
                                    onclick="app.closeComment(${post.id})">
                                    Cerrar comentarios
                                </button>
                                <div class="card d-none" id="card-com${post.id}">
                                    <ul class="list-group list-group-flush" id="comments${post.id}">
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                }
                cont.html(html);
            }).catch( err => console.error("Se produjo un error: ", err));
    },
    loadUsers : function() {
        const users = $("#autores");
        let html = "";
        users.html(html);
        fetch(this.urlUsers)
            .then(res => res.json())
            .then(usrs => {
                for (const u of usrs) {
                    html += `
                        <button type="button" class="list-group-item list-group-item-action" id="up${u.id}" onclick="app.userPosts(${u.id})">
                            ${u.name}<br><small>${u.email}</small>
                        </button>
                    `;
                }
                users.html(html);
            }).catch(err => console.error("Error al cargar usuarios: " + err));
    },
    userPosts : function(userId){
        $("#up" + this.userId).removeClass("active");
        $("#up" + userId).addClass("active");
        this.userId = userId;
        this.loadPosts();
    },
    loadComment : function(postId){
        let html = "";
        const listaCom = $("#comments" + postId);
        fetch(this.urlComments + "?postId=" + postId)
            .then( res => res.json() )
            .then(comments => {
                for (const c of comments) {
                    html += `
                        <li class="list-group-item">
                            De: <b>${c.email}</b><br>
                            ${c.body}
                        </li>
                    `;
                }
                listaCom.html(html);
                $("#card-com" + postId).toggleClass("d-none", false);
                $("#btn-ver-com" + postId).toggleClass("d-none", true);
                $("#btn-cer-com" + postId).toggleClass("d-none", false);
            }).catch(err => console.error("Hubo un erro al leer los comentarios: " + err))
    },
    closeComment : function(postId){
        $("#comments" + postId).html("");
        $("#card-com" + postId).toggleClass("d-none", true);
        $("#btn-ver-com" + postId).toggleClass("d-none", false);
        $("#btn-cer-com" + postId).toggleClass("d-none", true);
    },
    searchByWord : function() {
        $("#up" + this.userId).removeClass("active")
        this.userId = "";
        this.keyWord = $("#buscar").val();
        this.loadPosts();
    }
}

window.onload = function(){
    app.loadPosts();
    app.loadUsers();
}