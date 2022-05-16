
fetchAllData();

let elementArray = [];
let counter = 0;
counter += elementArray.length;

// Fetches data from api
function fetchAllData() {
    fetch(jsonplaceholder)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                elementArray.push(element)

                // Creates a tr and sets unique id
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
            })

            for (i = 0; i < data.length; i++) {
                let a = document.querySelectorAll('tr')
                let selected = a[i + 1];

                let userIdField = selected.childNodes[0]
                let postIdField = selected.childNodes[1]
                let postTitle = selected.childNodes[2]
                let postBody = selected.childNodes[3]

                userIdField.innerText = data[i].userId;
                postIdField.innerText = data[i].id;
                postTitle.innerText = data[i].title;
                postBody.innerText = data[i].body;
            }
        })
        .catch((e) => console.log(e))


}




function moreInfo(tr) {

    let postBox = document.createElement('div')
    postBox.setAttribute('class', 'post-box')

    let postContainer = document.createElement('div')
    postContainer.setAttribute('class', 'post-container')

    let postTitle = document.createElement('div')
    postTitle.setAttribute('class', 'post-title')

    let postBody = document.createElement('div')
    postBody.setAttribute('class', 'post-body')

    let userIdDiv = document.createElement('div')
    userIdDiv.setAttribute('class', 'user-id')


    postBox.appendChild(postContainer)
    postContainer.appendChild(postTitle)
    postContainer.appendChild(userIdDiv)
    postContainer.appendChild(postBody)


    userIdDiv.innerText = `Post Id: ${tr.childNodes[1].innerText}`
    postTitle.innerText = tr.childNodes[2].innerText
    postBody.innerText = tr.childNodes[3].innerText

    placeHolderDiv.appendChild(postBox)
    table.classList.toggle('disabled')

    postBox.addEventListener('click', () => {
        table.classList.toggle('disabled')
        placeHolderDiv.removeChild(postBox)
    })
}


newPostButton.addEventListener('click', () => {
    placeHolderDiv.innerHTML = '<div id="placeholder"></div>'

    createNewPost();
    table.classList.add('disabled')
    searchBar.classList.toggle('disabled')
    searchBar.classList.toggle('search-bar-wrapper')

})

function createNewPost() {
    const form = document.createElement('form')

    // USER ID
    const userIdInputLabel = document.createElement('label')
    userIdInputLabel.setAttribute('for', 'userIdInput')
    userIdInputLabel.innerText = 'User ID'

    const userIdInput = document.createElement('input')
    userIdInput.setAttribute('type', 'number')
    userIdInput.setAttribute('id', 'userIdInput')

    counter++;


    // POST TITLE
    const postTitleInputLabel = document.createElement('label')
    postTitleInputLabel.setAttribute('for', 'postTitleInput')
    postTitleInputLabel.innerText = 'Post title'

    const postTitleInput = document.createElement('input')
    postTitleInput.setAttribute('type', 'text')
    postTitleInput.setAttribute('id', 'postTitleInput')


    // POST BODY
    const postBodyInputLabel = document.createElement('label')
    postBodyInputLabel.setAttribute('for', 'postBodyInput')
    postBodyInputLabel.innerText = 'Post body'

    const postBodyInput = document.createElement('textarea')
    postBodyInput.setAttribute('rows', '4')
    postBodyInput.setAttribute('cols', '30')
    postBodyInput.setAttribute('id', 'postBodyInput')

    const submitButton = document.createElement('div')
    submitButton.classList.add('submit-button')
    submitButton.innerText = 'Submit post'

    submitButton.addEventListener('click', () => {

        table.classList.remove('disabled')
        searchBar.classList.toggle('disabled')
        searchBar.classList.toggle('search-bar-wrapper')

        table.innerHTML = `<tr>
        <th>User ID</th>
        <th>Post ID</th>
        <th>Post title</th>
        <th>Post body</th>
        </tr>`

        // table.innerHTML += `<tr>
        // <td id="1">${userIdInput.value}</td>
        // <td id="2">Post ID</td>
        // <td id="3">${postTitleInput.value}</td>
        // <td id="4">${postBodyInput.value}</td>
        // </tr>`



        const tr = document.createElement('tr')
        for (i = 1; i <= 4; i++) {
            const td = document.createElement('td')
            td.setAttribute('id', `td${i}`)
            tr.appendChild(td)
            if (i == 1) {
                td.innerText = userIdInput.value;
            } else if (i == 2) {
                td.innerText = counter;
            } else if (i == 3) {
                td.innerText = postTitleInput.value;
            } else if (i == 4) {
                td.innerText = postBodyInput.value;
            }

            if (i == 4) {
                tr.addEventListener('click', () => {
                    moreInfo(tr)
                })
            }
        }


        table.appendChild(tr)

        form.classList.toggle('disabled')
    })

    form.appendChild(userIdInputLabel)
    form.appendChild(userIdInput)
    form.appendChild(postTitleInputLabel)
    form.appendChild(postTitleInput)
    form.appendChild(postBodyInputLabel)
    form.appendChild(postBodyInput)
    form.appendChild(submitButton)


    placeHolderDiv.append(form)
}



