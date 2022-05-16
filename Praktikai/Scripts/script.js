
// DOM Elements
const table = document.querySelector('#table');
const searchInput = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const searchSelection = document.querySelector('#search-by');
const newPostButton = document.querySelector('#new-post');
const placeHolderDiv = document.querySelector('#place-holder');
const searchBar = document.querySelector('.search-bar-wrapper')


// Variables
let jsonplaceholder = 'https://jsonplaceholder.typicode.com/posts'

// Events

// Search by Post ID/ User ID/ Post title
// Changes input type from number to string depending on what you're be looking for
searchSelection.addEventListener('change', () => {
    if (!searchInput) {
        displayResults();
    }

    if (searchSelection.value == 'userId' || searchSelection.value == 'id') {
        searchInput.setAttribute('type', 'number');
        displayResults();
    }

    else {
        searchInput.setAttribute('type', 'text')
        displayResults();
    }
})

searchButton.addEventListener('click', () => {
    placeHolderDiv.innerHTML = `<div id="place-holder"></div>`
    if (table.classList.contains('disabled')) {
        table.classList.toggle('disabled')
    }
    displayResults();
})

function displayResults() {

    table.innerHTML = `<tr>
    <th>User ID</th>
    <th>Post ID</th>
    <th>Post title</th>
    <th>Post body</th>
    </tr>`

    const searchFor = searchInput.value;

    let resultArray = [];

    if (!searchFor) return fetchAllData()

    fetch(jsonplaceholder)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                if (element[searchSelection.value] == searchFor) {
                    resultArray.push(element);

                    const tableRow = document.createElement('tr');
                    tableRow.setAttribute('id', element.id)

                    // Creates td for tr and sets their id's

                    for (i = 1; i <= 4; i++) {
                        const td = document.createElement('td')
                        tableRow.appendChild(td);
                        td.setAttribute('id', `td${i}`)
                        table.appendChild(tableRow)
                    }

                    tableRow.addEventListener('click', () => {
                        moreInfo(tableRow);
                    })
                }
            })
            for (i = 0; i < resultArray.length; i++) {
                let a = document.querySelectorAll('tr')
                let selected = a[i + 1];

                let userIdField = selected.childNodes[0]
                let postIdField = selected.childNodes[1]
                let postTitle = selected.childNodes[2]
                let postBody = selected.childNodes[3]

                userIdField.innerText = resultArray[i].userId;
                postIdField.innerText = resultArray[i].id;
                postTitle.innerText = resultArray[i].title;
                postBody.innerText = resultArray[i].body;
            }

        })

}






