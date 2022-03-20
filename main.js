// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyCEiQ3_lwGBQfOxSOyczwP0q-lbUj-Lpzk",
  authDomain: "pruebaweb-457eb.firebaseapp.com",
  projectId: "pruebaweb-457eb",
  storageBucket: "pruebaweb-457eb.appspot.com",
  messagingSenderId: "289508600231",
  appId: "1:289508600231:web:a23a0274100946acdf2e82"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  //limpiar el localstorage
  localStorage.clear();

  //Variables globales
  let libro = "";


  //inciar sesion con google
  const loginWithGoogle = function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          const user = result.user.displayName;
          localStorage.setItem("usuario", user);
          console.log("login con google de ", user);
          goToCategories();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorMessage);
        });
  };

let direccion = "";
let cuerpo = document.getElementById("indexbody");

//funcion para volver a la página principal
function backToIndex(){
        window.location = "/index.html"
    }

//funcion para añadir favoritos
function addFavs(){
  async function guardarFavs(){
    db.collection("favoritos")
  .add({
    titulo: libro
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
  }
guardarFavs()
}

 //funcion para ver la pagina de favoritos
   function viewFavs(){
  async function verFavs(){
    cuerpo.innerHTML = "";
    let librosFavoritos = []
  db.collection("favoritos")
    .get()
    .then(async function (querySnapshot) {
      querySnapshot.forEach(async function (doc) {
        librosFavoritos.push(doc.data().titulo);
    
      });
    })
    .then(() => {
      const back = document.createElement("button");
      back.classList.add('volver')
      back.innerHTML = "< BACK TO INDEX"
      back.type = "onclick";
      back.onclick = function volverAtras(){
            goToCategories()
         }
      document.body.appendChild(back)
      const title = document.createElement("h1");
      title.classList.add("titleFavs")
      title.innerHTML = "Saved favorite books"
      document.body.appendChild(title)
      console.log(librosFavoritos)
      console.log(librosFavoritos.length)
      for(let i=0;i<librosFavoritos.length;i++){
        if(librosFavoritos[i]==""){

        } else {
          const favs = document.createElement('p');
          favs.classList.add("titulosFavs")
          favs.innerHTML = `Title: ${librosFavoritos[i]}`
          document.body.appendChild(favs)
        }
        
      }

    })
  }
  verFavs()
}

//funcion para buscar las categorias de libros
function goToCategories(){
async function buscarSecciones() {
    try {
        let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=sJp2LsJbhLrqeGlOzzjPBB24p9rCI2jx`);
        let data = await response.json()
        return data.results;    
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
  }
buscarSecciones()
.then(data=> {
        const todas = document.createElement('section');
        const favorites = document.createElement("button");
        favorites.classList.add('favoritos')
        favorites.innerHTML = `View favorites`
        let categoria = "";
        cuerpo.innerHTML = "";
        if(localStorage.getItem("usuario")){
        document.body.appendChild(favorites)
         favorites.onclick = async function goToFavs(){
           viewFavs();
         }
        }
       for(let i=0;i<data.length;i++){
       
        const div = document.createElement('div');
        const e = document.createElement('p');
        const par1 = document.createElement("p");
        const par2 = document.createElement("p");
        const par3 = document.createElement("p");
        const button = document.createElement("button");
        div.classList.add("tarjetas");
        todas.classList.add('conjunto')
        button.classList.add('more')
        button.setAttribute('id',`${data[i].display_name}`)
            button.type = "onclick";
            button.onclick = async function gotobests() {
                categoria= await data[i].list_name_encoded
                direccion = await 'https://api.nytimes.com/svc/books/v3/lists/'+categoria+'.json?api-key=sJp2LsJbhLrqeGlOzzjPBB24p9rCI2jx'
                iraBests();
            };
        
        e.innerHTML = data[i].display_name
        par1.innerHTML = `Oldest: ${data[i].oldest_published_date}`
        par2.innerHTML = `Newest: ${data[i].newest_published_date}`
        par3.innerHTML =  `Updated: ${data[i].updated}` 
        button.innerHTML = `READ MORE! >`
        document.body.appendChild(todas)
        todas.appendChild(div)
        div.appendChild(e);
        div.appendChild(par1);
        div.appendChild(par2);
        div.appendChild(par3);
        div.appendChild(button);

    }   
    
})

}


     //funcion para buscar los libros best sellers
     function iraBests(){
       async function buscarBestSellers() {
            try {
                let response = await fetch(direccion);
                let data = await response.json()
                return data.results.books;    
                 }
            catch (error) {
                console.log(`ERROR: ${error.stack}`);
                          }
             }

        buscarBestSellers()
        .then(async (data)=> {
                 
                  cuerpo.innerHTML = "";
                 
                  const back = document.createElement("button");
                  const todas = document.createElement('section');
                  for(let i=0;i<data.length;i++){
                   const div = document.createElement('div');
                   const img = document.createElement('img');
                   const e = document.createElement('p');
                   const par1 = document.createElement("p");
                   const par2 = document.createElement("p");
                   const button2 = document.createElement("button");
                   div.classList.add("tarjetas2");
                   img.classList.add("foto");
                   e.classList.add("ranking");
                   todas.classList.add('conjunto')
                   back.classList.add('volver')
                   button2.classList.add('amazon')
                   back.type = "onclick";
                   back.onclick = function volverAtras(){
                       goToCategories()
                   }
                   button2.type = "onclick";
                   button2.onclick = function iragoogle (){
                      window.location.href = data[i].amazon_product_url
                  };
                   e.innerHTML = `# ${data[i].rank} ${data[i].title}`
                   img.src = data[i].book_image
                   par1.innerHTML = `Weeks on list: ${i}`
                   par2.innerHTML = data[i].description
                   back.innerHTML = "< BACK TO INDEX"
                   button2.innerHTML = `BUY AT AMAZON >`
                   
                   document.body.appendChild(back)
                   document.body.appendChild(todas)
                   todas.appendChild(div)
                   div.appendChild(e);
                   div.appendChild(img)
                   div.appendChild(par1);
                   div.appendChild(par2);
                   div.appendChild(button2);
                   if(localStorage.getItem("usuario")){
                    const fav = document.createElement("button");
                    fav.innerHTML = "Add to favorite"
                    fav.type = "onclick";
                    fav.onclick = async function gotofavs() {
                      libro = data[i].title
                      addFavs()
                    }
                    div.appendChild(fav);
                    
                  }
                
                }
            })
            
      
      
        }
         
        
        
  