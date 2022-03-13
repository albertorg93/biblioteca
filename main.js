let direccion = "";
let cuerpo = document.getElementById("indexbody");

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
        let categoria = "";
         cuerpo.innerHTML = "";
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

    }   
    
})

}



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
                   div.classList.add("tarjetas");
                   img.classList.add("foto");
                   todas.classList.add('conjunto')
                   back.classList.add('volver')
                   button2.classList.add('amazon')
                   back.type = "onclick";
                   back.onclick = function volverAtras(){
                    //window.location="/index.html"
                       goToCategories()
                   }
                   button2.type = "onclick";
                   button2.onclick = function iragoogle (){
                    alert("Button is clicked");
                  };
                
                   e.innerHTML = data[i].title
                   img.src = data[i].book_image
                   par1.innerHTML = `Weeks on list: ${i}`
                   par2.innerHTML = data[i].description
                   back.innerHTML = "Back to categories"
                   button2.innerHTML = `BUY AT AMAZON >`
                   document.body.appendChild(back)
                   document.body.appendChild(todas)
                   todas.appendChild(div)
                   div.appendChild(e);
                   div.appendChild(img)
                   div.appendChild(par1);
                   div.appendChild(par2);
                   div.appendChild(button2);
                }
            })
            
      
      
        }
         
        
        
        
        
  

  


//     //  if(window.location == "http://127.0.0.1:5500/bests.html"){
//     //     console.log(direccion)
//     //  }
// //funcion para buscar los best sellers por categoria

//     // async function buscarBestSellers() {
        
//     //     try {
//     //         let response = await fetch(direccion);
//     //         let data = await response.json()
//     //         return data.results.books;    
//     //     }
//     //     catch (error) {
//     //         console.log(`ERROR: ${error.stack}`);
//     //     }
//     //      }
//     // buscarBestSellers()
//     // .then(data=> {
//     //          const todas = document.createElement('section');
//     //          for(let i=0;i<data.length;i++){
//     //            const div = document.createElement('div');
//     //            const img = document.createElement('img');
//     //            const e = document.createElement('p');
//     //            const par1 = document.createElement("p");
//     //            const par2 = document.createElement("p");
//     //            const button2 = document.createElement("button");
//     //            div.classList.add("tarjetas");
//     //            img.classList.add("foto");
//     //            todas.classList.add('conjunto')
//     //            button2.classList.add('amazon')
//     //            button2.type = "onclick";
//     //            button2.onclick = function iragoogle (){
//     //             alert("Button is clicked");
//     //           };
            
//     //            e.innerHTML = data[i].title
//     //            img.src = data[i].book_image
//     //            par1.innerHTML = `Weeks on list: ${i}`
//     //            par2.innerHTML = data[i].description
//     //            button2.innerHTML = `BUY AT AMAZON >`
//     //            document.body.appendChild(todas)
//     //            todas.appendChild(div)
//     //            div.appendChild(e);
//     //            div.appendChild(img)
//     //            div.appendChild(par1);
//     //            div.appendChild(par2);
//     //            div.appendChild(button2);
    
//     //     }
//     // }  
    
//     // )
    
//     // }
