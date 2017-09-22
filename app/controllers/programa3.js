import Ember from 'ember';

export default Ember.Controller.extend({

  text: "",
  sumaX: null,
  sumaY: null,
  sumaCuadX: null,
  sumaCuadY: null,
  producto: null,
  mediaX: null,
  mediaY: null,
  size: null,
  beta1: null,
  correlacion: null,
  beta0: null,
  regresion: null,

  actions:{
    metodo_leerArchivo: function(evt){
      var vector_archivos = evt.target.files[0];
      var texto_contenido = "";
      var esto = this;
      if (vector_archivos) {
        var objeto_lector = new FileReader();
        objeto_lector.onload = function(objeto_evento){
          texto_contenido = objeto_evento.target.result;
          document.getElementById("texto").innerHTML = texto_contenido;
          esto.set('text', texto_contenido);
        };
        objeto_lector.readAsText(vector_archivos);
        }else {
         alert("Failed to load file");
        }
     },

     metodo_calcularSumasXY: function() {
       var texto = this.get('text');
       var texto_sin_enter = texto.replace(/\n/g, '¬');
       var texto_filas=texto_sin_enter.split("¬");
       var texto_numeros=[];
       var sumX = 0;
       var sumY = 0;
       var tam = 0;
       for(var num_i=0; num_i<texto_filas.length;num_i++){
         texto_numeros = texto_filas[num_i].split(",");
         for (var num_j = 0; num_j < texto_numeros.length; num_j++) {
           if(texto_numeros[num_j]!=""){
             if(Number.isInteger(parseInt(texto_numeros[num_j]))){
               if(num_j==0){
                 tam=tam + 1;
               }else if (num_j==1){
                 sumX = sumX + parseInt(texto_numeros[num_j]);
               }else if (num_j==2) {
                 sumY = sumY + parseInt(texto_numeros[num_j]);
               }
             }else{
               alert('El texto ingresado tiene caracteres no permitidos');
             }
           }
         }
       }
       this.set('sumaX',sumX);
       this.set('sumaY',sumY);
       this.set('size',tam);
       document.getElementById('sumasInput').disabled = true;
       document.getElementById('sumasInput').hidden = true;
       document.getElementById('cuadInput').hidden = false;
       document.getElementById("resultado1").innerHTML = "Sumatoria de X= " + (sumX);
       document.getElementById("resultado2").innerHTML = "Sumatoria de Y= " + sumY;
       document.getElementById("resultado3").innerHTML = "Numero de datos= " + tam;
     },

     metodo_calcularSumasCuad: function() {
       var texto = this.get('text');
       var texto_sin_enter = texto.replace(/\n/g, '¬');
       var texto_filas=texto_sin_enter.split("¬");
       var texto_numeros=[];
       var sumCuadX = 0;
       var sumCuadY = 0;
       for(var num_i=0; num_i<texto_filas.length;num_i++){
         texto_numeros = texto_filas[num_i].split(",");
         for (var num_j = 0; num_j < texto_numeros.length; num_j++) {
           if(texto_numeros[num_j]!=""){
             if(Number.isInteger(parseInt(texto_numeros[num_j]))){
               if (num_j==1){
                 sumCuadX = sumCuadX + Math.pow(texto_numeros[num_j],2);
               }else if (num_j==2) {
                 sumCuadY = sumCuadY + Math.pow(texto_numeros[num_j],2);
               }
             }else{
               alert('El texto ingresado tiene caracteres no permitidos');
             }
           }
         }
       }
       this.set('sumaCuadX', sumCuadX);
       this.set('sumaCuadY', sumCuadY);
       document.getElementById('cuadInput').disabled = true;
       document.getElementById('cuadInput').hidden = true;
       document.getElementById('produInput').hidden = false;
       document.getElementById("resultado1").innerHTML = "Sumatoria de X²= " + (sumCuadX);
       document.getElementById("resultado2").innerHTML = "Sumatoria de Y²= " + (sumCuadY);
       document.getElementById("resultado3").innerHTML = "";
     },

     metodo_calcularProductoXY: function() {
       var texto = this.get('text');
       var texto_sin_enter = texto.replace(/\n/g, '¬');
       var texto_filas=texto_sin_enter.split("¬");
       var texto_numeros=[];
       var sum = 0;
       var prod = 0;
       for(var num_i=0; num_i<texto_filas.length;num_i++){
         texto_numeros = texto_filas[num_i].split(",");
         for (var num_j = 0; num_j < texto_numeros.length; num_j++) {
           if(texto_numeros[num_j]!=""){
             if(Number.isInteger(parseInt(texto_numeros[num_j]))){
               if (num_j==1){
                 sum = texto_numeros[num_j]*texto_numeros[num_j+1];
                 prod = prod + sum;
               }
             }else{
               alert('El texto ingresado tiene caracteres no permitidos');
             }
           }
         }
       }
       this.set('producto',prod);
       document.getElementById('produInput').disabled = true;
       document.getElementById('produInput').hidden = true;
       document.getElementById('mediInput').hidden = false;
       document.getElementById("resultado1").innerHTML = "Producto X*Y= " + (prod);
       document.getElementById("resultado2").innerHTML = "";
     },

     metodo_calcularMedias: function(){
       var sumX = this.get('sumaX');
       var sumY = this.get('sumaY');
       var tam = this.get('size');
       var medX = sumX/tam;
       var medY = sumY/tam;
       this.set('mediaX', medX);
       this.set('mediaY', medY);
       document.getElementById('mediInput').disabled = true;
       document.getElementById('mediInput').hidden = true;
       document.getElementById('beta1Input').hidden = false;
       document.getElementById("resultado1").innerHTML = "Media de X= " + (medX);
       document.getElementById("resultado2").innerHTML = "Media de Y= " + (medY);
     },

     metodo_calcularBeta1: function(){
       var sumCuadX = this.get('sumaCuadX');
       var prod = this.get('producto');
       var medX = this.get('mediaX');
       var medY = this.get('mediaY');
       var tam = this.get('size');
       var prodnum = tam*medX*medY;
       var proddenom = tam*Math.pow(medX,2);
       var num = prod - prodnum;
       var denom = sumCuadX - proddenom;
       var bet1 = num / denom;
       this.set('beta1', bet1);
       document.getElementById('beta1Input').disabled = true;
       document.getElementById('beta1Input').hidden = true;
       document.getElementById('correInput').hidden = false;
       document.getElementById("resultado1").innerHTML = "Beta 1= " + (bet1);
       document.getElementById("resultado2").innerHTML = "";
     },

     metodo_calcularCorrelacion: function() {
       var sumX = this.get('sumaX');
       var sumY = this.get('sumaY');
       var sumCuadX = this.get('sumaCuadX');
       var sumCuadY = this.get('sumaCuadY');
       var prod = this.get('producto');
       var tam = this.get('size');
       var prodnum1 = tam*prod;
       var prodnum2 = sumX*sumY;
       var proddenom1 = tam*sumCuadX
       var proddenom2 = Math.pow(sumX,2);
       var proddenom3 = proddenom1 - proddenom2;
       var proddenom4 = tam*sumCuadY;
       var proddenom5 = Math.pow(sumY,2);
       var proddenom6 = proddenom4 - proddenom5;
       var proddenom7 = proddenom3*proddenom6;
       var denom = Math.sqrt(proddenom7);
       var num = prodnum1 - prodnum2;
       var correlation = num/denom;
       this.set('correlacion', correlation);
       document.getElementById('correInput').disabled = true;
       document.getElementById('correInput').hidden = true;
       document.getElementById('beta0Input').hidden = false;
       document.getElementById("resultado1").innerHTML = "Correlacion= " + (correlation);
     },


     metodo_calcularBeta0: function() {
       var bet1 = this.get('beta1');
       var medX = this.get('mediaX');
       var medY = this.get('mediaY');
       var prod = bet1*medX;
       var bet0 = medY - prod;
       this.set('beta0', bet0);
       document.getElementById('beta0Input').disabled = true;
       document.getElementById('beta0Input').hidden = true;
       document.getElementById('regreInput').hidden = false;
       document.getElementById("resultado1").innerHTML = "Beta 0= " + (bet0);
     },

     metodo_calcularRegresion: function() {
       var bet1 = this.get('beta1');
       var bet0 = this.get('beta0');
       var medX = this.get('mediaX');
       var prod = bet1*medX;
       var regre = bet0 + prod;
       this.set('regresion', regre);
       document.getElementById('regreInput').disabled = true;
       document.getElementById('regreInput').hidden = true;
       document.getElementById("resultado1").innerHTML = "Regresion= " + (regre);
     }
  }
});
