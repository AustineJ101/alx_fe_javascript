const quoteDisplay = document.querySelector("#quoteDisplay");
const newQuoteBtn = document.querySelector("#newQuote");

const newQuote = document.querySelector("#newQuoteText");
const newCategory = document.querySelector("#newQuoteCategory");

const quotes = [
  {inspirational: [
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do."
  ]},

  {love: [
    "The best thing to hold onto in life is each other.",
    "Love is not about how many days, months, or years you have been together. It’s all about how much you love each other every single day."
  ]},

  {success: [
    "Opportunities don't happen, you create them.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
  ]},

  {life: [
    "Do what you can, with what you have, where you are.",
    "In the middle of every difficulty lies opportunity."
  ]}
];

function showRandomQuote(array){
  //Generate a random category index
  const categoryIndex = Math.floor(Math.random() * array.length);
  //Get the category name 
  const category = Object.keys(array[categoryIndex])[0];

  const quoteIndex = Math.floor(Math.random() * array[categoryIndex][category].length);

  const randomQuote = array[categoryIndex][category][quoteIndex];
  
  const para = document.createElement("p");
  para.textContent = randomQuote;
  quoteDisplay.innerHTML = "";
  quoteDisplay.appendChild(para);
  
}

function addQuote(){

  if(newQuote.value && newCategory.value){

    let categoryExists = false;
    let categoryIndex;
    let quoteCategory = newCategory.value.toLowerCase();
  
    //Loop through the quotes array to check if category already exists
    quotes.forEach((obj, index)=> {
      if(obj.hasOwnProperty(quoteCategory)){
        categoryExists = true;
        categoryIndex = index;
        return;
      }
    })
  
    if(categoryExists){
      if(quotes[categoryIndex][quoteCategory].includes(newQuote.value)){
        alert("This quote already exists")
      }else{
        quotes[categoryIndex][quoteCategory].push(newQuote.value);
      }
      
    }else{
      const newQuoteObj = {[quoteCategory]: [newQuote.value]};
      quotes.push(newQuoteObj);

    }
  }
  
}

newQuoteBtn.addEventListener("click", () =>{

  showRandomQuote(quotes);

});

