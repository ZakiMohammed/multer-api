const baseUrl = 'http://localhost:3000/';

// controls
const btnSingle = document.getElementById('btnSingle');
const btnMultiple = document.getElementById('btnMultiple');
const fileInput = document.getElementById('file');
const filesInput = document.getElementById('files');
const dvFiles = document.querySelector('.files');

// on load
(function () {
    const queryString = new URLSearchParams(location.search);
    const message = queryString.get('message');
    if (message) {
        alert(`Using Forms: ${message}`);
    }

    getFiles();
})();

// event listeners
btnSingle.addEventListener('click', function (e) {
    const formData = new FormData();
    formData.append('avatar', fileInput.files[0]);
    fileInput.value = '';

    fetch(`${baseUrl}upload-file`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            getFiles();
            alert(`Using AJAX: ${data.message}`);
        });
});
btnMultiple.addEventListener('click', function (e) {
    const formData = new FormData();
    Object.values(filesInput.files)
        .forEach(file => formData.append('avatar', file));
    filesInput.value = '';

    fetch(`${baseUrl}upload-files`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            getFiles();
            alert(`Using AJAX: ${data.message}`);
        });
});

// functions
function isImage(fileName) {
    const [name, extension] = fileName.split('.');
    return ['png', 'jpg', 'gif'].includes(extension.toLowerCase());
}

function getFiles() {
    fetch(`${baseUrl}get-files`)
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(fileName => {
                html += `
                    <div>
                        <a href="uploads/${fileName}" download>
                            ${
                                isImage(fileName) ? 
                                    `<img src="uploads/${fileName}" alt="${fileName}">` : 
                                    `📃 <span>${fileName}</span>`
                            }
                        </a>
                        <button class="btn btn-sm btn-secondary" onclick="removeFile(this, '${fileName}')">Remove</button>
                    </div>
                `;
            });
            dvFiles.innerHTML = html;
        })
}

function removeFile(e, fileName) {
    const result = confirm(`Are you sure you want to remove ${fileName}?`);
    if (result) {
        fetch(`${baseUrl}remove-file/${fileName}`)
            .then(res => res.json())
            .then(_ => e.parentElement.remove())
    }
}

function removeFiles() {
    const result = confirm(`Are you sure you want to remove all files?`);
    if (result) {
        fetch(`${baseUrl}remove-files`)
            .then(res => res.json())
            .then(_ => dvFiles.innerHTML = '')
    }
}
