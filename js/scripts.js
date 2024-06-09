function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("wordTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}

function toggleDropdown() {
    var dropdownContent = document.querySelectorAll(".dropdown-content");
    dropdownContent.forEach(content => {
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

async function askQuestion() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML += `<div class="chat-log-entry"><div class="user"><strong>You:</strong> ${userInput}</div></div>`;
    
    const response = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conversation: [{ role: 'user', content: userInput }] })
    });

    const result = await response.json();
    chatLog.innerHTML += `<div class="chat-log-entry"><div class="ai"><strong>AI:</strong> ${result.answer}</div></div>`;
    
    document.getElementById('user-input').value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
}
