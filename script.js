var sliderImages = Array.from(document.querySelectorAll(".slider-container img")),//Get slider items--Array.from [ES6 feature]
    slidesCount = sliderImages.length,   //Number of images
    currentSlide = 1,                    //Set current slide
    slideElement = document.getElementById("slider-number"), //Get slider element
    nextButton = document.getElementById("next"),            //Get previous button
    prevButton = document.getElementById("prev");            //Get next button

nextButton.onclick = nextSlide;  //Handle next button
prevButton.onclick = prevSlide;  //Handle prev button

var paginationElement = document.createElement("ul");                 //creat pagination element
paginationElement.setAttribute("id","pagination-ul");                 //add id to created ul
for(var i = 1 ; i <= slidesCount ; i++){                              //creat pagination Item based on slides count
    var paginationItem = document.createElement("li");                //creat pagination Item
    paginationItem.setAttribute("data-index",i);                      //add index to created li
    paginationItem.appendChild(document.createTextNode(i));           //creat li content
    paginationElement.appendChild(paginationItem);                    //add li in ul
}
document.getElementById("indicators").appendChild(paginationElement); //add created ul in the page
var paginationCreatedUl = document.getElementById("pagination-ul"),   //variable of created ul 
    paginationBullets = Array.from(document.querySelectorAll("#pagination-ul li"));//Get pagination items
for(var i=0 ; i< paginationBullets.length ; i++){
    paginationBullets[i].onclick = function(){
        currentSlide = parseInt(this.getAttribute("data-index"));
        checker();
    };
}

checker();               //triger checker function

function nextSlide(){    //Next slide function
    if(nextButton.classList.contains("disabled")){   //check if reach last slide
        return false;                               //do nothing
    }else{                                          //if not
        currentSlide++;                             //go to next slide
        checker();                                  //triger check function
    }
}

function prevSlide(){    //previous slide function
    if(prevButton.classList.contains("disabled")){   //check if reach first slide
        return false;                               //do nothing
    }else{                                          //if not
        currentSlide--;                             //go to previous slide
        checker();                                  //triger check function
    }
}

function checker(){      //checker function
    slideElement.textContent = "Slide #" + currentSlide + " of " + slidesCount; //set the slide number
    removeAllActive();                                                          // triger remove active classes function
    sliderImages[currentSlide - 1].classList.add("active");                     //set the slide image
    paginationCreatedUl.children[currentSlide - 1].classList.add("active");     //set the slide pagination bullets
    if(currentSlide == 1){                          //check if the first slide 
        prevButton.classList.add("disabled");       //disabled previous button
    }else{
        prevButton.classList.remove("disabled");    //remove disabled from previous button
    }
    if(currentSlide == slidesCount){                //check if the last slide 
        nextButton.classList.add("disabled");       //disabled next button
    }else{
        nextButton.classList.remove("disabled");    //remove disabled from next button
    }
}

function removeAllActive(){            //remove all active classes from images and pagination bullets in the slider
    sliderImages.forEach(function(img){           //remove active classes from images 
        img.classList.remove("active");
    });
    paginationBullets.forEach(function(bullet){
        bullet.classList.remove("active");        //remove active classes from pagination bullets
    });
}