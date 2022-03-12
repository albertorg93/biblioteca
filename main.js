function backToIndex(){
        window.location = "/index.html"
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
            button.type = "onclick";
            button.onclick = function gotobests() {
                window.location = "/bests.html"
            };
        
        e.innerHTML = data[i].display_name
        par1.innerHTML = data[i].oldest_published_date
        par2.innerHTML = data[i].newest_published_date
        par3.innerHTML = data[i].updated
        button.innerHTML = `READ MORE! >`
        document.body.appendChild(todas)
        todas.appendChild(div)
        div.appendChild(e);
        div.appendChild(par1);
        div.appendChild(par2);
        div.appendChild(par3);
        div.appendChild(button);


        // console.log(data[i].list_name)
    }
    

})
}

if(window.location == "http://127.0.0.1:5500/bests.html"){

//funcion para buscar los best sellers por categoria

    async function buscarBestSellers() {
        try {
            let response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-fiction.json?api-key=sJp2LsJbhLrqeGlOzzjPBB24p9rCI2jx`);
            let data = await response.json()
            return data.results.books;    
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
         }
    buscarBestSellers()
    .then(data=> {
             const todas = document.createElement('section');
             for(let i=0;i<data.length;i++){
               const div = document.createElement('div');
               const img = document.createElement('img');
               const e = document.createElement('p');
               const par1 = document.createElement("p");
               const par2 = document.createElement("p");
        //     const par3 = document.createElement("p");
               const button = document.createElement("button");
               div.classList.add("tarjetas");
               img.classList.add("foto");
               todas.classList.add('conjunto')
               button.classList.add('amazon')
               button.type = "onclick";
               button.onclick = function iragoogle (){
                alert("Button is clicked");
              };
            
               e.innerHTML = data[i].title
               img.src = data[i].book_image
               par1.innerHTML = `Weeks on list: ${i}`
               par2.innerHTML = data[i].description
        //     par3.innerHTML = data[i].updated
               button.innerHTML = `BUY AT AMAZON >`
               document.body.appendChild(todas)
               todas.appendChild(div)
               div.appendChild(e);
               div.appendChild(img)
               div.appendChild(par1);
               div.appendChild(par2);
        //     div.appendChild(par3);
               div.appendChild(button);
    
    
            console.log(data);
        }
    }  
    
    )
    
    }



// async function ejecucionAsincrona() {
//     await buscarSecciones();
//     await buscarBestSellers();
//   }
//   ejecucionAsincrona();



