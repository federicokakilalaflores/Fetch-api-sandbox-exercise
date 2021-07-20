let output = document.getElementById('output')

document.getElementById('textBtn').addEventListener('click', getText);
document.getElementById('jsonBtn').addEventListener('click', getJSON);
document.getElementById('apiBtn').addEventListener('click', getAPI);
document.getElementById('postForm').addEventListener('submit', createPost);

function getText(){
    fetch('./storage/sample.txt')
        .then(res => res.text())
        .then(data => {
            output.innerText = data;
        })
        .catch(err => console.log(err)); 
}

function getJSON(){
    let html = '';
    fetch('./storage/users.json')
        .then(res => res.json())
        .then(users => {
            html += "<h3>List of Users</h3>"
            users.forEach((user) => {
                html += `<ul>
                    <li><small>Name:</small> ${ user.name }</li>
                    <li><small>Email:</small> ${ user.email }</li>
                    <li><small>Job:</small> ${ user.job }</li> 
                </ul>`;
            });
            output.innerHTML = html;
        })
        .catch(err => console.log(err));
}

function getAPI(){
    let html = '';
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
            html += '<h3>List of Posts</h3>'
            posts.forEach(post => {
                html += `
                 <div class="post-wrapper">
                    <h4>${ post.title }</h4>
                    <p>${ post.body }</p>
                 </div>
                `;
            });
            output.innerHTML = html;
        }) 
        .catch(err => console.log(err));
}

function createPost(ev){
    ev.preventDefault();

    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {title: title, body: body} )
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        output.innerHTML = "Sample post created successfuly with jsonPlaceholder";
    })
    .catch(err => console.log(err));
}
