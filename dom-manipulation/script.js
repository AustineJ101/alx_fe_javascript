const quoteDisplay = document.querySelector("#quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

const newQuote = document.querySelector("#newQuoteText");
const newCategory = document.querySelector("#newQuoteCategory");

const quotes =JSON.parse(localStorage.getItem("quotes")) || [
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

function createAddQuoteForm(){

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
        console.log("This quote already exists");
      }else{
        quotes[categoryIndex][quoteCategory].push(newQuote.value);
        localStorage.setItem("quotes", JSON.stringify(quotes));
      }
      
    }else{
      const newQuoteObj = {[quoteCategory]: [newQuote.value]};
      quotes.push(newQuoteObj);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();

    }
  }
  
  newQuote.value = "";
  newCategory.value = "";
  newQuote.focus();
}

newQuoteBtn.addEventListener("click", () =>{

  showRandomQuote(quotes);

});

const downloadBtn = document.querySelector("#downloadBtn");
const fileInput = document.querySelector("#importFile");


function downloadQuotes(){
  const jsonData = JSON.stringify(quotes, null, 2);
  
  const blob = new Blob([jsonData], {type: "application/json"});

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = "quotes.json";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  
}

downloadBtn.addEventListener("click", downloadQuotes);

function importFromJsonFile(event){
  const file = event.target.files[0]; //get the chosen file

  const reader = new FileReader();// new instance of file reader

  reader.onload = function(e){
    const importedQuotes  = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", importedQuotes);
  }

  reader.readAsText(file);

}

fileInput.addEventListener("change", (event) => {
  importFromJsonFile(event);
});

const categoryFilter = document.querySelector("#categoryFilter");

function populateCategories(){
  categoryFilter.innerHTML = "";
  const firstOption = document.createElement("option");
  firstOption.value = "All";
  firstOption.textContent = "All Categories";
  categoryFilter.appendChild(firstOption);

  quotes.forEach(obj => {
    const category  = Object.keys(obj)[0];
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;

    categoryFilter.appendChild(option);
  })
}

populateCategories();

function filterQuotes(event){
  const category = event.target.value;
  let categoryIndex;
  quotes.forEach((obj, index) => {
    if(Object.keys(obj)[0] == category){
      categoryIndex = index;
      return
    }
  })

  quoteDisplay.innerHTML = "";

  const quoteArr = quotes[categoryIndex][category];

  quoteArr.forEach(quote => {
    const para = document.createElement("p");
    para.textContent = quote;
    quoteDisplay.appendChild(para);
  }) 
  
}

categoryFilter.addEventListener("change", (event) => {
  filterQuotes(event);
})
