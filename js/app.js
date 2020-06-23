// Declaración de variables constantes y del array products con los objetos
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

const products = [{
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

var button = document.getElementById("calculate");

var calculate = () => { // esta función se activa si se hace click en el botón calcular
    // Selecciona los elementos del HTML
    var subtotalText = document.getElementById("subtotal");
    var IVAText = document.getElementById("IVA");
    var totalText = document.getElementById("total");

    // llama a las funciones del subtotal y el IVA
    var finalSubtotal = subtotal(product);
    var finalIVA = tax(product);

    // Muestra por pantalla los resultados de las funciones de subtotal e IVA, y llama a la función total
    subtotalText.innerText = finalSubtotal + " €";
    IVAText.innerText = finalIVA + " €";
    totalText.innerText = roundResult(total(finalSubtotal, finalIVA)) + " €";
};

var tax = (product) => { // calcula el iva de los productos añadidos a la lista
    var resultIVA = 0;
    for (product of products) {
        if (product.tax === REGULAR_TYPE) {
            resultIVA += product.price * product.units * 21 / 100;
        } else if (product.tax === LOWER_TYPE) {
            resultIVA += product.price * product.units * 4 / 100;
        } else {
            resultIVA += 0;
        }
    }
    return resultIVA;
};

var subtotal = (product) => { // calcula el subtotal de la lista de la compra
    var resultSubtotal = 0;
    for (product of products) {
        resultSubtotal += product.units * product.price;
    }
    return resultSubtotal;
};

var total = (finalSubtotal, finalIVA) => { //suma el subtotal con el iva
    return finalSubtotal + finalIVA;
};

var roundResult = (price) => { // redondea el precio final a dos decimales
    return result = Math.round(price * 100) / 100;
};

// controla que el botón de Calcular solo esté disponible si hay alguna unidad marcada
var ableButton = (products) => {
    var counting = 0;
    for (var i = 0; i < products.length; i++) {
        counting += products[i].units;
        counting === 0 ? button.disabled = true : button.disabled = false;
    }
    return counting;
};

var showItems = (product) => { // Se encarga de mostrar cada producto de la lista y sus inputs

    // selecciona el div list en el que se van a mostrar los elementos
    var list = document.getElementById("list");

    // crea un div y un input para mostrar los elementos de la lista
    var div = document.createElement("div");
    var productName = document.createElement("div");
    var input = document.createElement("input");

    // asigna al div creado el valor de product.description para mostrar el nombre de los productos
    productName.innerText = product.description;

    // asigna valores al input y al div
    input.setAttribute("type", "number");
    input.setAttribute("class", "input-count");
    input.setAttribute("value", product.units);
    input.setAttribute("min", 0);
    input.setAttribute("max", product.stock);

    div.setAttribute("class", "row");
    productName.setAttribute("class", "element");

    // otorga las unidades marcadas en el input a product.units para que se modifiquen en el objeto product
    input.addEventListener("change", event => product.units = parseInt(event.target.value));
    input.addEventListener("change", event => ableButton(products));


    // finalmente, muestra la lista por pantalla
    list.appendChild(div).appendChild(productName);
    list.appendChild(div).appendChild(input);
};

var listProducts = items => { //divide el array en cada uno de los objetos
    for (product of products) {
        showItems(product); // Envía cada objeto a pasar por la function showItems
    }
};

//llamada a las funciones y al evento del botón calcular

listProducts(products);
button.addEventListener("click", calculate);
button.disabled = true;