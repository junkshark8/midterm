let glucose = document.getElementById('glucose');
let readingInput = document.getElementById('reading');
let datetimeInput = document.getElementById('datetime');
let glucoseIdEdit = document.getElementById('glucose-id-edit');
let glucoseIdDelete = document.getElementById('glucose-id-delete');
let readingEditInput = document.getElementById('reading-edit');
let datetimeEditInput = document.getElementById('datetime-edit');

let data = [];
let selectedGlucose = {};
const api = "http://localhost:8000";

function tryAdd() {
    let msgReading = document.getElementById('msg-reading');
    let msgDatetime = document.getElementById('msg-datetime');
    msgReading.innerHTML = '';
    msgDatetime.innerHTML = '';
}

document.getElementById('form-add').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!readingInput.value) {
        document.getElementById('msg-reading').innerHTML = 'Blood Sugar Level cannot be blank';
    } if (!datetimeInput.value) {
        document.getElementById('msg-datetime').innerHTML = 'Date & Time cannot be blank';
    } else {
        addGlucose(+readingInput.value, datetimeInput.value);

        // close modal
        let add = document.getElementById('add');
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();
        (() => {
            add.setAttribute('data-bs-dismiss', '');
        })();
    }
});

let addGlucose = (reading, datetime) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 201) {
            const newGlucose = JSON.parse(xhr.response);
            data.push(newGlucose);
            refreshGlucose();
        }
    };
    xhr.open('POST', `${api}/glucose`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({ reading, datetime }));
};

let refreshGlucose = () => {
    glucose.innerHTML = "";
    data
    .sort((a, b) => b.id - a.id)
    .map((x) => {
        return (glucose.innerHTML += 
        `<div class = "border-yellow" id = "glucose-${x.id}">
            <div>
                <h3>${x.reading}</h3>
                <p class="datetime">${new Date(x.datetime).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            
            <div>
                <i onClick = "tryEditReading(${x.id})" data-bs-toggle = "modal" data-bs-target = "#modal-edit" class = "fas fa-edit icon"></i>
                <i onClick = "tryDeleteReading(${x.id})" data-bs-toggle = "modal" data-bs-target = "#modal-delete" class = "fas fa-trash-alt icon"></i>
            </div>
        </div>
        `);
    });

    resetForm();
};

let tryEditReading = (id) => {
    const glucose = data.find((x) => x.id === id);
    selectedGlucose = glucose;
    glucoseIdEdit.innerText = glucose.id;
    readingEditInput.value = glucose.reading;
    datetimeEditInput.value = glucose.datetime;
    let msgEditReading = document.getElementById('msg-edit-reading');
    let msgEditDatetime = document.getElementById('msg-edit-datetime');
    msgEditReading.innerHTML = '';
    msgEditDatetime.innerHTML = '';
};

document.getElementById('form-edit').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!readingEditInput.value) {
        document.getElementById('msg-edit-reading').innerHTML = 'Blood Sugar Level cannot be blank';
    } if (!datetimeEditInput.value) {
        document.getElementById('msg-edit-datetime').innerHTML = 'Date & Time cannot be blank';
    } else {
        editReading(readingEditInput.value, datetimeEditInput.value);

        // close modal
        let edit = document.getElementById('edit');
        edit.setAttribute('data-bs-dismiss', 'modal');
        edit.click();
        (() => {
        edit.setAttribute('data-bs-dismiss', '');
        })();
    }
});

let editReading = (reading, datetime) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            selectedGlucose.reading = reading;
            selectedGlucose.datetime = datetime;
            refreshGlucose();
        }
    };
    xhr.open('PUT', `${api}/glucose/${selectedGlucose.id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(JSON.stringify({ reading, datetime }))
}

let tryDeleteReading = (id) => {
    const glucose = data.find((x) => x.id === id);
    selectedGlucose = glucose;
    glucoseIdDelete.innerText = glucose.id;
    myId = glucose.id;
};

document.getElementById('delete-button').addEventListener('click', (e) => {
    e.preventDefault();

    // close modal
    let d = document.getElementById('delete');
    d.setAttribute('data-bs-dismiss', 'modal');
    d.click();
    (() => {
        deleteReading(myId);
        d.setAttribute('data-bs-dismiss', '');
    })();
});

let deleteReading = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = data.filter((x) => x.id !== id);
            refreshGlucose();
        }
    };
    xhr.open('DELETE', `${api}/glucose/${id}`, true);
    xhr.send();
};

let resetForm = () => {
    readingInput.value = '';
    datetimeInput.value = '';
}

let getGlucose = () => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status==200) {
            data = JSON.parse(xhr.responseText) || [];
            refreshGlucose();
        }
    };
    xhr.open('GET', `${api}/glucose`, true);
    xhr.send();
};


(() => {
    getGlucose();
})();