"use strict";

function click_filter_element(event) {

  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.currentTarget.classList.toggle("selected");
  update_programmes();
}


function create_filter_element(data) {

  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */

  const new_li = document.createElement("li");
  data.parent.append(new_li);
  new_li.classList.add(data.class);
  new_li.textContent = data.textContent;
  new_li.addEventListener("click", click_filter_element);

  return new_li;

}


function add_group_toggling(filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.
 
    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.
 
    NO RETURN VALUE
 
  */

}


function toggle_cities(event) {

  /*
 
    ARGUMENTS
      This function does not take any arguments
 
    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 
 
    NO RETURN VALUE
 
  */

}


function create_countries_cities_filters() {

  /* 
  NO ARGUMENTS

  SIDE-EFFECTS 
    This function creates two functions: create_country and create_city. 
    Loop through the array COUNTRIES and for every iteration call the function create_country.

  NO RETURN VALUE

  */

  function create_country(country) {
    /* 
    ARGUMENTS
      This function takes one argument: country. No control is made of the argument.
  
    SIDE-EFFECTS
      Creates a new div with the classes "country" and "filter_container" and an id based on the object's key "id". 
      Appends to the ul in the country-filter container.
      Sets innerHTML that includes an <h1> that contains the name of the current country and a <ul> with the class "filter_list".

      Creates a variable "cities" that contains an array of all the cities that have the countryID as the countries id.

      Loop through the array in "cities" and call create_city.


    NO RETURN VALUE
    */

    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }

  function create_city(city) {
    /* 
      ARGUMENTS
        City (element): One of the elements from the array "cities". No control is made.
    
      SIDE-EFFECTS
        Creates a variable "dom" which calls create_filter_element with an argument (object) with the keys "parent", "class", "textContent".
        Gives the new element an id that is equal to city.id.
    
      NO RETURN VALUE
    */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


function create_filters() {
  /* 
    NO ARGUMENTS
    
    SIDE EFFECTS
      For every element (object) in the arrays LEVELS, SUBJECTS AND LANGUAGES, this function calls create_filter_element.
    
    NO RETURN VALUE
  */

  function create_filter(object, parent) {

    const dom = create_filter_element({
      parent: parent,
      class: "selected",
      textContent: object.name,
    });

    dom.dataset.id = object.id;

  }

  function level_filter(level) {
    create_filter(level, document.querySelector("#level_filter > ul"));
  }

  function subject_filter(subject) {
    create_filter(subject, document.querySelector("#subject_filter > ul"));
  }

  function language_filter(language) {
    create_filter(language, document.querySelector("#language_filter > ul"));
  }

  array_each(LEVELS, level_filter);
  array_each(SUBJECTS, subject_filter);
  array_each(LANGUAGES, language_filter);

}


function create_programme(programme) {

  /*
    ARGUMENT
      programme (object): One of the objects from PROGRAMMES
 
    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.
 
 
      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.
 
    NO RETURN VALUE
  */

  const programme_parent = document.querySelector("#programmes > ul");

  const programme_dom = document.createElement("div");
  programme_dom.classList.add("programme");
  programme_parent.append(programme_dom);

  const random_number = get_random_number(CITIES[UNIVERSITIES[programme.universityID].cityID].imagesNormal.length, 0);
  programme_dom.style.backgroundImage = `url(./media/geo_images/${CITIES[UNIVERSITIES[programme.universityID].cityID].imagesNormal[random_number]})`;

  const first_content_div = document.createElement("div");
  const second_content_div = document.createElement("div");
  second_content_div.classList.add("bottom_programme");
  programme_dom.append(first_content_div);
  programme_dom.append(second_content_div);

  first_content_div.innerHTML = `
  <p><b>${programme.name}</b></p>
  <p>${UNIVERSITIES[programme.universityID].name}</p>
  <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name}, 
  ${COUNTRIES[CITIES[UNIVERSITIES[programme.universityID].cityID].countryID].name}</p>
  <p>${LEVELS[programme.levelID - 1].name}, ${SUBJECTS[programme.subjectID].name}, ${LANGUAGES[programme.languageID].name}</p>`;

  second_content_div.innerHTML = `
  <p>${CITIES[UNIVERSITIES[programme.universityID].cityID].name},
  sun-index: ${CITIES[UNIVERSITIES[programme.universityID].cityID].sun}
  (${percenter(CITIES[UNIVERSITIES[programme.universityID].cityID].sun, 365)}%)</p>`;
}


function update_programmes() {

  /*
      NO ARGUMENTS
 
      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.
 
        VG: The top images (header) need to be updated here
 
      NO RETURN VALUE
 
  */

  document.querySelector("#programmes > ul").innerHTML = "";

  const text_for_no_programmes = document.querySelector("#programmes.container > p");

  text_for_no_programmes.classList.add("display_none");
  if (read_filters().length === 0) {
    text_for_no_programmes.classList.remove("display_none");
  }

  array_each(read_filters(), create_programme);
}



function read_filters() {

  /*
  NO ARGUMENTS 
  
  SIDE EFFECTS
    For every city-filter-element that is selected, call the function callback_add_cityID. The id of every selected city is pushed into the array stored in the variable city_id_selected.
    
    For every element in the array city_id_selected, check which universities are located in the city with the current id and push the universities (objects) to the array stored in the variable "universities".
    
    For every element in the array "universities", call the function "callback_add_programmes". For every element (object) in the array PROGRAMMES, check which programmes belong to the university with the current id and push the universities (objects) to the array stored in the variable "universities".
    
    For every filter element of level filters, language filters and subject filters that is selected, push the ids of the objects in the database that the filters refer to into an array specific to that sort of filter. 
    For every element in the array programmes, check if programme.levelID/languageID/subjectID is present in the array for the specific filter, if so, push the programme (object) to the array programmes.

    If the input value is not empty, check if the input value is present in any of the programme's names. If so, push the programme (object) to the array programmes
    
  
  RETURN VALUE
    This function returns an array (programmes) that contains all the filtered/selected programmes.
  */

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
