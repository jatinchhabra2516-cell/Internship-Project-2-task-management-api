const form = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskDescription = document.getElementById('taskDescription');
const dueDate = document.getElementById('dueDate');
const priority = document.getElementById('priority');

const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

/* =========================
   SAVE TASKS
========================= */

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* =========================
   UPDATE STATS
========================= */

function updateStats() {

    document.getElementById('totalTasks').textContent =
        tasks.length;

    document.getElementById('completedTasks').textContent =
        tasks.filter(task => task.completed).length;

    document.getElementById('pendingTasks').textContent =
        tasks.filter(task => !task.completed).length;

    document.getElementById('footerTaskCount').textContent =
        tasks.length;
}

/* =========================
   RENDER TASKS
========================= */

function renderTasks(filter = '') {

    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `
        <div class="empty-state">
            <h3>📋 No Tasks Found</h3>
            <p>Create your first task to get started.</p>
        </div>
        `;

        updateStats();
        return;
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement('li');

        li.className = `
            task
            ${task.priority.toLowerCase()}
            ${task.completed ? 'completed' : ''}
        `;

        li.innerHTML = `

        <div class="task-left">

            <div class="task-title">

                <input
                type="checkbox"
                ${task.completed ? 'checked' : ''}
                onchange="toggleTask(${index})">

                ${task.text}

            </div>

            <div class="task-desc">
                ${task.description || 'No description'}
            </div>

            <div class="task-date">
                📅 ${task.dueDate || 'No Due Date'}
            </div>

        </div>

        <div>

            <span class="badge ${task.priority.toLowerCase()}-badge">
                ${task.priority}
            </span>

            <div class="actions">

                <button
                class="edit-btn"
                onclick="editTask(${index})">

                    ✏️

                </button>

                <button
                class="delete-btn"
                onclick="deleteTask(${index})">

                    🗑️

                </button>

            </div>

        </div>

        `;

        taskList.appendChild(li);
    });

    updateStats();
}

/* =========================
   ADD TASK
========================= */

form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (taskInput.value.trim() === '') {

        alert('Please enter a task title.');

        return;
    }

    tasks.push({

        text: taskInput.value.trim(),

        description: taskDescription.value.trim(),

        dueDate: dueDate.value,

        priority: priority.value,

        completed: false

    });

    saveTasks();

    renderTasks();

    form.reset();
});

/* =========================
   TOGGLE TASK
========================= */

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks(searchInput.value);
}

/* =========================
   DELETE TASK
========================= */

function deleteTask(index) {

    const confirmDelete =
        confirm('Delete this task?');

    if (!confirmDelete) return;

    tasks.splice(index, 1);

    saveTasks();

    renderTasks(searchInput.value);
}

/* =========================
   EDIT TASK
========================= */

function editTask(index) {

    const newTitle =
        prompt(
            'Edit task title',
            tasks[index].text
        );

    if (newTitle === null) return;

    if (newTitle.trim() === '') {

        alert('Task title cannot be empty.');

        return;
    }

    const newDescription =
        prompt(
            'Edit task description',
            tasks[index].description
        );

    if (newDescription !== null) {

        tasks[index].text =
            newTitle.trim();

        tasks[index].description =
            newDescription.trim();

        saveTasks();

        renderTasks(searchInput.value);
    }
}

/* =========================
   SEARCH
========================= */

searchInput.addEventListener('input', () => {

    renderTasks(searchInput.value);
});

/* =========================
   DARK MODE
========================= */

const themeToggle =
    document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {

    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {

        themeToggle.innerHTML =
            '☀️ Light Mode';

    } else {

        themeToggle.innerHTML =
            '🌙 Dark Mode';
    }
});

/* =========================
   INITIAL LOAD
========================= */

renderTasks();