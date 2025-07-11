let employees = [{
        firstName: 'Alex',
        lastName: 'Smith',
        email: 'alex@gmail.com',
        department: 'HR',
        role: 'Manager',
    },
    {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@gmail.com',
        department: 'IT',
        role: 'Developer',
    },
    {
        firstName: 'Charlie',
        lastName: 'Lee',
        email: 'charlie@gmail.com',
        department: 'Finance',
        role: 'Analyst',
    }
];

const employeeList = document.getElementById('employeeList');
const addBtn = document.getElementById('addBtn');
const formModal = document.getElementById('formModal');
const employeeForm = document.getElementById('employeeForm');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');

function renderEmployees(list) {
    employeeList.innerHTML = '';
    list.forEach((emp, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button class="edit-btn" onclick="editEmployee(${index})">Edit</button>
      <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
    `;
        employeeList.appendChild(card);
    });
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    renderEmployees(employees);
}

function editEmployee(index) {
    const emp = employees[index];
    document.getElementById('firstName').value = emp.firstName;
    document.getElementById('lastName').value = emp.lastName;
    document.getElementById('email').value = emp.email;
    document.getElementById('department').value = emp.department;
    document.getElementById('role').value = emp.role;
    formModal.style.display = 'flex';
    employeeForm.onsubmit = (e) => {
        e.preventDefault();
        employees[index] = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            department: e.target.department.value,
            role: e.target.role.value,
        };
        formModal.style.display = 'none';
        employeeForm.reset();
        renderEmployees(employees);
    };
}

addBtn.addEventListener('click', () => {
    formModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    formModal.style.display = 'none';
    employeeForm.reset();
});

employeeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newEmp = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        department: e.target.department.value,
        role: e.target.role.value,
    };
    employees.push(newEmp);
    formModal.style.display = 'none';
    employeeForm.reset();
    renderEmployees(employees);
});

searchInput.addEventListener('input', function() {
    const keyword = this.value.toLowerCase();
    const filtered = employees.filter(
        (emp) =>
        emp.firstName.toLowerCase().includes(keyword) ||
        emp.lastName.toLowerCase().includes(keyword) ||
        emp.email.toLowerCase().includes(keyword)
    );
    renderEmployees(filtered);
});

// Initial render
renderEmployees(employees);