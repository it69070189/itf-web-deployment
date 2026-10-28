const input_name = document.getElementById("input_name")
const btn_add = document.getElementById("btn_add")
const container = document.getElementById("container")

let name_list = [] // ประกาศตัวแปร Array ส าหรับเก็บรายชื่อ
let currentId = 0 // ประกาศตัวแปรเก็บค่า id ของแต่ละรายการ

function createList(text) {
    let li = document.createElement("li")
    const id = ++currentId
    li.id = "list-" + id

    let spanc = document.createElement("span")
    spanc.textContent = text

    let button = document.createElement("button")
    button.textContent = "ลบ"
    button.addEventListener("click", () => deleteList(id, text))

    li.appendChild(spanc)
    li.appendChild(button)

    return li
}

// ฟังก์ชันแปลง Array เป็ น String แล้วบันทึกลง Local Storage
function updateStorage() {
    let arr_to_text = JSON.stringify(name_list)
    localStorage.setItem("name_list", arr_to_text)
}

btn_add.addEventListener("click", () => {
    if (input_name.value.trim() == "") {
        alert("กรุณากรอกข้อมูล")
    } else {
        let new_li = createList(input_name.value)
        container.appendChild(new_li)
        name_list.push(input_name.value) // เพิ่มขอ้ความเขา้ Array
        updateStorage() // บันทึก Array ล่าสุดลง Local Storage
        input_name.value = ""
    }
    
})

function deleteList(id, text){
    let itemToDelete = document.getElementById("list-" + id);
    container.removeChild(itemToDelete);

    let index = name_list.indexOf(text);
    if (index > -1) {
        name_list.splice(index, 1);
    }

    updateStorage() // บันทึก Array ล่าสุดลง Local Storage
}

// เมื่อเปิ ดหรือรีเฟรชหน้าเว็บ ให้ดึงข้อมูลจาก Local Storage ออกมาแสดงผล
window.onload = () => {
    let data = localStorage.getItem("name_list")
    let arr = JSON.parse(data) || []
    arr.forEach((i) => {
        let new_li = createList(i)
        container.appendChild(new_li)
        name_list.push(i)
    })
}
