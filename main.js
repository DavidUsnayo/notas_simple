let titulo = document.querySelector(".titulo")
let descripcion = document.querySelector(".descripcion")
let form = document.querySelector(".form")
let contenedor = document.querySelector(".contenedor_notas")
let agregar = document.querySelector(".agregar")

let data = localStorage.lista ? JSON.parse(localStorage.lista) : []   //verificamos si existe localStorage y si no creamos un array
    
    agregar.addEventListener("click",function(){
        mostrarForm_cerrarContenido()
        descripcion.innerHTML = ""
    })

    form.addEventListener("submit",function(e){
        e.preventDefault()
        if(titulo.value != "" || descripcion.value != ""){
            let newData = {
                "titulo":titulo.value,
                "descripcion":descripcion.value.replace(/\n/g, "<br>") //cambia los saltos de linea por <br>
            }
            data.reverse()    
            data.push(newData)                      
            localStorage.lista = JSON.stringify(data)      //lo subimos a localStorage e formato texto
            form.style.display="none"
            contenedor.style.display="block"
            form.reset()
            mostrar()
                let text = document.querySelectorAll(".texto")
                text[0].style.background="#bdebff"
                text[0].style.border="8px solid #bdebff"
            setTimeout( ()=>{
                text[0].style.background="#f7f7f7"
                text[0].style.border="8px solid #f7f7f7"
            },500 )
    
        }else{
            form.style.display="none"
            contenedor.style.display="block"
        }
    })

    function mostrar(){
        contenedor.innerHTML = ""
        data.reverse()          //damos la vuelta el arreglo para que la ultima nota se muestre primero
        data.forEach(function(item,index){
            contenedor.innerHTML += `
                <div class="nota">
                    <div class="texto">
                        <h2 class="title"> ${item.titulo} </h2>
                        <p class="des"> ${item.descripcion} </p>
                    </div>
                    <div class="botones">
                        <button class="boton editar"> <img src="./asset/editar.png" alt="editar"> </button>
                        <button class="boton eliminar"> <img src="./asset/basura.png" alt="eliminar"> </button>
                    </div>
                </div>
                `
        })
    /*esta parte ↓ esta dentro de la funcion mostrar para que al cargar mostrar() se
    vuelva a asignar los eventos //tambien se puede poner en un funcion y llamarlo*/ 
    let editar = document.querySelectorAll(".editar")
    let eliminar = document.querySelectorAll(".eliminar")

    editar.forEach(function(e,i){         //con la i vemos el indice de cada boton de editar
        e.addEventListener("click",function(){
            mostrarForm_cerrarContenido()
            titulo.value = data[i].titulo
            let cambio = data[i].descripcion.replace(/<br>/g, "\n")   //cambi los <br> por salto de linea
            descripcion.value = cambio
            data.splice(i,1)
            localStorage.lista = JSON.stringify(data.reverse())   //data.reverse() invertimos
            mostrar()
        })
    })

    eliminar.forEach(function(e,i){
        e.addEventListener("click",function(ta){
            let get = ta.target
            let padre = get.parentNode.parentNode
            padre.parentNode.style.background="#56ccff"
            padre.parentNode.style.border="#56ccff"
            padre.parentNode.style.height="50px"
            padre.parentNode.style.opacity="0%"
            padre.parentNode.children[0].style.opacity="0%"
            console.log(padre.parentNode)
            setTimeout( ()=>{
                data.splice(i,1)  //splice elimina data.splice(desde la posicion,cuantos elemento)
                localStorage.lista = JSON.stringify(data.reverse())   //data.reverse() invertimos
                mostrar()
            },1000 )
             
        })
    })

    let botones = document.querySelectorAll(".botones")
    let texto = document.querySelectorAll(".texto")
    texto.forEach(function(e){
    e.addEventListener("touchmove",function(){
    const hammertime = new Hammer(e)         //con Hammerjs(libreria) vemos el touch si es izquierda o derecha
        hammertime.on('swipe', (event) => {
            if (event.direction === Hammer.DIRECTION_LEFT) {
                e.style.left="-120px" 
                botones.forEach(function(bo){
                    bo.style.transition="3.2s"
                    bo.style.opacity="100%"
                })
                setTimeout(function(){
                    e.style.left="0px"
                    botones.forEach(function(bo){
                        bo.style.transition="0.8s"
                        bo.style.opacity="0%"
                        })
                },2800)
            } else if (event.direction === Hammer.DIRECTION_RIGHT) {
                e.style.left="0px"
            } else if (event.direction === Hammer.DIRECTION_UP) {
                console.log('Deslizó hacia arriba');
            } else if (event.direction === Hammer.DIRECTION_DOWN) {
                console.log('Deslizó hacia abajo');
            }
        });
    })
    })

    }
    
    mostrar()

    function mostrarForm_cerrarContenido(){
        form.style.display="block"
        contenedor.style.display="none"
    }

    //para que funcione bien el data.reverse() debemos de ponerlo en los 4 //agregar/ mostrar/ editar/ eliminar/
