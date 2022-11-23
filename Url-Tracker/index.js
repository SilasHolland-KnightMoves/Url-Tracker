let myUrl = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myUrl = leadsFromLocalStorage
    render(myUrl)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myUrl.push(tabs[0].url)
        localStorage.setItem("myUrl", JSON.stringify(myUrl) )
        render(myUrl)
    })
})

function render(url) {
    let listItems = ""
    for (let i = 0; i < url.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${url[i]}'>
                    ${url[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myUrl = []
    render(myUrl)
})

inputBtn.addEventListener("click", function() {
    myUrl.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myUrl", JSON.stringify(myUrl) )
    render(myUrl)
})