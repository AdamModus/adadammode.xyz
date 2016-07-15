function populateCards(todos) {
    var parent = document.querySelectorAll('.card-container');
    for (let todo of todos) {
        let currHTML =
            `
            <div class ="card">
                <li>ID: ${todo.id}</li>
                <li>STATUS: ${todo.status}</li>
                <li>NAME: ${todo.name}</li>
                <li>EMAIL: ${todo.email}</li>
                <li>TEXT: ${todo.text}</li>
            </div>
            `;
        parent.append(document.createElement(currHTML));
    }
}


var dbManager = new indexedDBLayer();

// dbManager.list()
//     .then(function (response) {
//         console.log("Success!", response);
//     }, function (error) {
//         console.error("Failed!", error);
//     });


