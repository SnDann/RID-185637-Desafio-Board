const tasks = {
    todo: [],
    doing: [],
    done: []
};

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : { todo: [], doing: [], done: [] };
}

function initBoard() {
    for (const columnId in tasks) {
        const columnTasks = document.querySelector(`#${columnId} .tasks`);
        columnTasks.innerHTML = ''; // Limpar tarefas existentes no DOM

        // Adicionar tarefas à coluna
        tasks[columnId].forEach(task => addTaskToColumn(columnId, task));

        // Garantir que o botão "Adicionar Tarefa" esteja sempre visível
        const addTaskButton = document.querySelector(`#${columnId} .add-task-btn`);
        addTaskButton.style.display = 'block';
    }
}

function addTaskToColumn(columnId, task) {
    const columnTasks = document.querySelector(`#${columnId} .tasks`);
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="task-actions">
            <button onclick="editTask('${task.id}', '${columnId}')">Editar</button>
            <button onclick="deleteTask('${task.id}', '${columnId}')">Excluir</button>
        </div>
    `;
    columnTasks.appendChild(taskElement);
}

document.addEventListener('DOMContentLoaded', () => {
    Object.assign(tasks, loadTasks());
    initBoard();
});

let currentColumn = null;

document.querySelectorAll('.add-task-btn').forEach(button => {
    button.addEventListener('click', () => {
        currentColumn = button.getAttribute('data-column');
        document.getElementById('modal-title').textContent = 'Criar Nova Tarefa';
        document.getElementById('task-form').reset();
        document.getElementById('task-modal').style.display = 'flex';
    });
});

function closeTaskModal() {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'none'; // Oculta o modal
    document.getElementById('task-form').reset(); // Redefine o formulário
}

document.getElementById('task-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-description').value.trim();
    const responsible = document.getElementById('task-responsible').value.trim();
    const deadline = document.getElementById('task-deadline').value;

    if (!title || !description) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const newTask = {
        id: `task-${Date.now()}`,
        title,
        description,
        responsible,
        deadline
    };

    // Adicionar a nova tarefa à coluna correspondente
    tasks[currentColumn].push(newTask);

    // Salvar as alterações no localStorage
    saveTasks();

    // Atualizar o quadro
    initBoard();

    // Fechar o modal e redefinir o formulário
    closeTaskModal();
});

function editTask(taskId, columnId) {
    const task = tasks[columnId].find(task => task.id === taskId);
    if (task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-responsible').value = task.responsible;
        document.getElementById('task-deadline').value = task.deadline;
        currentColumn = columnId;
        document.getElementById('modal-title').textContent = 'Editar Tarefa';
        document.getElementById('task-modal').style.display = 'flex';

        document.getElementById('task-form').onsubmit = function (e) {
            e.preventDefault();
            task.title = document.getElementById('task-title').value.trim();
            task.description = document.getElementById('task-description').value.trim();
            task.responsible = document.getElementById('task-responsible').value.trim();
            task.deadline = document.getElementById('task-deadline').value;
            saveTasks();
            initBoard();
            closeTaskModal();
        };
    }
}

function deleteTask(taskId, columnId) {
    // Remover a tarefa da lista
    tasks[columnId] = tasks[columnId].filter(task => task.id !== taskId);

    // Salvar as alterações no localStorage
    saveTasks();

    // Atualizar o quadro
    initBoard();
}

const tasksList = document.querySelector('.tasks-list');

function addTask() {
    const taskName = document.getElementById('task-name').value.trim();
    const taskTag = document.getElementById('task-tag').value.trim();

    if (!taskName) {
        alert('Por favor, insira o nome da tarefa.');
        return;
    }

    const taskDate = new Date().toLocaleDateString('pt-BR');

    const taskHTML = `
        <div class="task">
            <div class="task-info">
                <h3 class="task-title">${taskName}</h3>
                <span class="task-tag">${taskTag || 'Sem etiqueta'}</span>
                <p class="task-date">Criado em: ${taskDate}</p>
            </div>
            <div class="task-actions">
                <button class="edit-task-btn" onclick="editTask(this)">Editar</button>
                <button class="delete-task-btn" onclick="deleteTask(this)">Excluir</button>
                <button class="task-check-btn" onclick="completeTask(this)">✔</button>
            </div>
        </div>
    `;

    document.querySelector('.tasks-list').insertAdjacentHTML('beforeend', taskHTML);

    // Limpar os campos de entrada
    document.getElementById('task-name').value = '';
    document.getElementById('task-tag').value = '';
}

function editTask(button) {
    const task = button.closest('.task');
    const taskTitle = task.querySelector('.task-title').textContent;
    const taskTag = task.querySelector('.task-tag').textContent;

    // Preencher os campos de entrada com os dados da tarefa
    document.getElementById('task-name').value = taskTitle;
    document.getElementById('task-tag').value = taskTag;

    // Remover a tarefa para recriá-la após edição
    task.remove();
}

function deleteTask(button) {
    const task = button.closest('.task');
    task.remove();
}

let completedTasks = 0;

function completeTask(button) {
    const task = button.closest('.task');
    const taskTitle = task.querySelector('.task-title');

    // Marcar a tarefa como concluída
    taskTitle.classList.add('completed');
    button.disabled = true;

    // Atualizar o contador de tarefas concluídas
    completedTasks++;
    updateTaskCounter();
}

function updateTaskCounter() {
    const footer = document.querySelector('.task-footer p');
    footer.textContent = `${completedTasks} tarefa${completedTasks > 1 ? 's' : ''} concluída${completedTasks > 1 ? 's' : ''}`;
}

