function generateCardHTML(todoJson) {
    var elem = document.createElement('div');
    elem.className = "card";
    elem.innerHTML = `
                        <ul>
                            <li>ID: ${todoJson.id}</li>
                            <li>STATUS: ${todoJson.status}</li>
                            <li>NAME: ${todoJson.name}</li>
                            <li>EMAIL: ${todoJson.email}</li>
                            <li>TEXT: ${todoJson.text}</li>
                            <li>DATETIME: ${todoJson.dateTime}</li>
                        </ul>
                    `;

    return elem;
}


function populateCards(todos) {
    for (let todo of todos) {
        addCard(todo);
    }
    new Cards();
}


function addCard(todo) {
    var parent = document.querySelector('.card-container');
    let child = generateCardHTML(todo);
    parent.appendChild(child);
}


var dbManager = new TodoListDB();
dbManager.init().then(function () {
    dbManager.addTodo({
        id: "01",
        name: "Rafael",
        status: "TODO",
        text: "I need to do stuff bro!",
        email: "rafatexfr@gmail.com",
        dateTime: '05-03-1988'
    }).then(function (result) {
        addCard(result);
    }).catch(function (error) {
        VanillaToasts.create({
            title: 'TODO not added',
            text: error.target.error, // little text with error log
            type: 'error', // success, info, warning, error   / optional parameter
            timeout: 3000, // hide after 5000ms, // optional paremter
            callback: Function.prototype // executed when toast is clicked / optional parameter
        });
    }).then(function () {
        dbManager.list().then(function (result) {
            populateCards(result);
        }, function (error) {
            VanillaToasts.create({
                title: 'Not able to list TODOs',
                text: error.target.error, // little text with error log
                type: 'error', // success, info, warning, error   / optional parameter
                timeout: 3000, // hide after 5000ms, // optional paremter
                callback: Function.prototype // executed when toast is clicked / optional parameter
            });
        });
    });
});


document.getElementById("CleanDB").onclick = function () {
    dbManager.clearAll().then(function (result) {
        var container = document.querySelector('.card-container');
        container.innerHTML = "";
        VanillaToasts.create({
            title: 'Database cleared',
            text: "All records were successfully deleted", // little text with error log
            type: 'info', // success, info, warning, error   / optional parameter
            timeout: 3000, // hide after 5000ms, // optional paremter
            callback: Function.prototype // executed when toast is clicked / optional parameter
        });
    }).catch(function (error) {
        VanillaToasts.create({
            title: 'Not able to clear TODO database',
            text: error.target.error, // little text with error log
            type: 'error', // success, info, warning, error   / optional parameter
            timeout: 3000, // hide after 5000ms, // optional paremter
            callback: Function.prototype // executed when toast is clicked / optional parameter
        });
    });
};
