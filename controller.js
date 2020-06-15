/* eslint-disable no-case-declarations */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


const currentDate = new Date();
let i = 0;
let j = 0;
const todoDate = document.querySelector(".todo .current-date > p");
const taskDate = document.querySelector(".task .current-date > p");
todoDate.textContent = currentDate.toDateString();
taskDate.textContent = currentDate.toDateString();

/**
 * @object compareDate
 */
const compareDate = {
    todoDate: {
        day: null,
        month: null,
        year: null,
    },
    nowDate: {
        today: null,
        month: null,
        year: null,
    },

    init() {
        this.getDate();
        // this.compareDate();
        taskController.displayTasks();
        todoController.displayTodos();
    },

    getDate() {
        const htmlDate = new Date().toDateString();

        const dateArr = htmlDate.split(" ");
        const month = dateArr[1];
        const day = dateArr[2];
        const year = dateArr[3];

        this.nowDate.today = day;
        this.nowDate.month = month;
        this.nowDate.year = year;

        return this;
    },

    nextTodo() {
        i++;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + i
        );
        todoDate.innerHTML = date.toDateString();
        this.init();
    },
    prevTodo() {
        i--;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + i
        );
        todoDate.innerHTML = date.toDateString();
        this.init();
    },

    prevTask() {
        j--;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + j
        );
        taskDate.innerHTML = date.toDateString();
        this.init();
    },

    nextTask() {
        j++;
        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + j
        );
        taskDate.innerHTML = date.toDateString();
        compareDate.init();
    },
};

/**
 * @class CommonController
 * @description Contain some of share method
 */
class CommonController {
    constructor() { }
    /**
     * @method getTodos
     * @param {fun} fun callback function
     * @description return todos and passed callback for do stuff
     */
    async getTodos(fun) {
        const todos = await fetch(this.url);
        const res = todos.json();
        res.then((todo) => fun(todo));
    }

    /**
     *@method makeAjax
     * @param {data} data send data as url query
     * @param {method} method
     */
    makeAjax(data, method = "GET") {
        const url = this.url + "?" + data;
        const req = new XMLHttpRequest();
        req.open(method, url);
        req.onreadystatechange = async () => {
            const x = await req.response;
        };
        req.send();
    }
}

/**
 * @class TodoController
 */
class TodoController extends CommonController {
    constructor() {
        super();
        this._url = "http://www.todo.com:1010/php/todo.php";

        this.add();
        this.displayTodos();
        this.completed();
        this.todoActions();
        this.todoOption();

    }

    /**
     * @access url
     */
    get url() { return this._url }

    /**
     * @method todoOption
     * @description todo option like edit, delete
     */

    todoOption() {
        const self = this;
        document.addEventListener(
            "click",
            (e) => {
                if (e.target.parentElement.classList.contains("delete-todo")) {
                    self.deleteTodo(e);
                }
                if (e.target.classList.contains("editing")) {
                    // TODO: Implement the Better Solution
                    self.editTodo();
                }
            },
            false
        );
    }


    /**
     * @method add
     * @description add new todo
     */
    add() {
        const self = this;
        document.querySelector(".todo .add .icon-btn").addEventListener(
            "click",
            async () => {
                const title = document.querySelector("#add input[name=title]");

                await self.makeAjax(`title=${title.value}&add=1`);
                await self.displayTodos();
                title.value = "";
            },
            false
        );
    }

    /**
     * @method displayTodos
     * @description get all todo from database and displayed
     */
    displayTodos() {
        const self = this;
        const todoBody = document.querySelector(".todo-body");
        const task_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="14.001" viewBox="0 0 17 14.001"><path id="task" d="M17,14H5V10H17v4ZM4,14H0V10H4v4ZM17,9H5V5H17V9ZM4,9H0V5H4V9ZM4,4H0V0H4V4ZM17,4H5V0H17V4Z" fill="#333"></path></svg>`;

        const date_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><path id="calender" d="M16,20H2a2,2,0,0,1-2-2L.01,4A2,2,0,0,1,2,2H3V0H5V2h8V0h2V2h1a2,2,0,0,1,2,2V18A2,2,0,0,1,16,20ZM2,7V18H16V7Zm7,7H4V9H9v5Z" fill="#333"></path></svg>`;

        const edit_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18.001" height="18.002" viewBox="0 0 18.001 18.002"><path id="pencil" d="M3.75,18h0L0,18v-3.75L11.06,3.192l3.75,3.75ZM15.88,5.872h0L12.13,2.122,13.96.292a1,1,0,0,1,1.41,0l2.34,2.34a1,1,0,0,1,0,1.41L15.88,5.872Z" transform="translate(0 0)" fill="#333"></path></svg>`;

        const delete_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18"><path id="trush" d="M11,18H3a2,2,0,0,1-2-2V4H13V16A2,2,0,0,1,11,18ZM14,3H0V1H3.5l1-1h5l1,1H14V3Z" transform="translate(0 0)" fill="#333"></path></svg>`;

        this.getTodos(async (todos) => {
            // Check if todos not empty
            if (!todos.data.length) {
                todoBody.innerHTML = `<div class="alert alert-info todo-content">Not Todo Yet!</div>`;
                throw new Error("Todo is Empty!");
            }

            todoBody.innerHTML = "";
            let counter = 0;
            for (const todo of todos.data) {
                // ------------------------ Check Date ------------
                if (todo.date != todoDate.textContent) {
                    counter++;
                    if (counter == todos.data.length) {
                        todoBody.innerHTML = `<div class="alert alert-info todo-content">No Todo Yet!</div>`;
                    }
                    continue;
                }

                // ------------- check if task exists --------------
                const task = todo.task_id == 0;
                let task_category = "";
                let action = `
                    <div class="row justify-content-end align-items-center">
                        <span class="edit" data-id="${todo.id}">
                            <div class="overlay"></div>
                            ${edit_icon}
                        </span>
                        <span class="delete delete-todo" data-id="${todo.id}">
                            <div class="overlay"></div>
                            ${delete_icon}
                        </span>
                    </div>`;

                if (!task) {
                    task_category = `
                    <div class="category">
                        <span class="row justify-content-start align-items-center">
                            ${task_icon}
                            ${todo.task_id}
                        </span>
                    </div>`;
                }


                // ------------- add todos as view page --------------
                todoBody.innerHTML += `<div class="todo-content ${
                    todo.status == 0 ? "" : "line-through"
                    }">
                <article>
                    <h2 class="title">${todo.title}</h2>
                    <div class="info row justify-content-start align-items-center">
                        ${task_category}
                    <div class="todo-date">
                        <span class="row justify-content-start align-items-center">
                            ${date_icon} ${todo.date}
                        </span>
                    </div>
                    </div>
                </article>
                <div class="action ${
                    todo.status == 0 ? "" : "hide"
                    }">${action}</div>
                <div class="completed-action ${
                    todo.status == 0 ? "" : "w-100 secondary-bg"
                    }" data-id="${todo.id}"></div>
            </div>
        `;
            }

            // -------------- Update ProgressBar after make action ------------
            self.progressBar();
        });

    }

    /**
     * @method editTodo
     * @description Edit and Change Todo Conetent
     */
    editTodo() {
        const editAction = document.querySelector(".todo .todo-body");
        const self = this;
        const input = document.querySelector(".todo .add  input");
        editAction.addEventListener(
            "click",
            function (evt) {
                const ele = evt.target.parentElement;
                if (ele.classList.contains("edit")) {
                    const title =
                        ele.parentElement.parentElement.previousElementSibling
                            .firstElementChild;
                    input.value = title.textContent;
                    self.getTodos((todos) => {
                        const id = ele.getAttribute("data-id");
                        const match = todos.data.filter((t) => id == t.id);
                        if (!match.length) {
                            return new Error("Todo is Not Exists");
                        }

                        const title = document.querySelector("#input-add").value;
                        const req = `id=${match[0].id}&edit=1&title=${title}`;
                        self.makeAjax(req);
                    });
                }
            },
            false
        );
    }

    /**
     * @method deleteTodo
     * @param {ele} ele target elements
     * @description delete select todo
     */
    deleteTodo(ele) {
        const req = `id=${ele.target.parentElement.getAttribute(
            "data-id"
        )}&delete=1`;
        this.makeAjax(req);
    }

    /**
     * @method completed
     * @description check if todo completed and take certian action
     */
    completed() {
        const self = this;
        document.querySelector(".todo .todo .todo-body").addEventListener(
            "click",
            (evt) => {
                const ele = evt.target;
                if (ele.classList.contains("completed-action")) {
                    const id = ele.getAttribute("data-id");
                    self.getTodos((data) => {
                        const todos = data.data;
                        const match = todos.filter((todo) => todo.id == id);
                        if (match) {
                            const completed = match[0].status == 0 ? "1" : "0";
                            self.makeAjax(`id=${id}&complete=1&status=${completed}`);

                            self.progressBar();
                            taskController.progressBar();
                        }
                    });
                }
            },
            false
        );
    }

    /**
     * @method progressBar
     * @description Shows us how match completd todo
     */
    progressBar() {
        const lineBar = document.querySelector(".progress-area .line");

        this.getTodos(async (data) => {
            const todos = await data.data;
            const filterTodo = todos.filter(
                (todo) => todo.date == todoDate.textContent
            );

            taskController.progressBar(await todos);

            if (!filterTodo.length) {
                lineBar.setAttribute("style", `height:0%`);
                return false;
            }

            const length = filterTodo.length;
            const range = filterTodo.filter((t) => t.status == 1);
            const result = (100 * range.length) / length;
            lineBar.setAttribute("style", `height: ${result}%`);
        });
    }

    /**
     * @method markAll
     */
    markAll() {
        const currentDate = document.querySelector(".current-date p").textContent;
        this.makeAjax(`mark=1&date=${currentDate}`);
    }

    /**
     * @method clear
     * @description clear all todos match date
     */
    clear() {
        const currentDate = document.querySelector(".current-date p").textContent;
        this.makeAjax(`date=${currentDate}&deleteAll=1`);
    }


    /**
     * @method todoAction
     * @description take action like delete all search mark all
     */
    todoActions() {
        const self = this;
        document.querySelector(".todo-option").addEventListener(
            "click",
            (evt) => {
                const ele = evt.target;

                switch (ele.getAttribute("data-event")) {
                    case "search":
                        break;

                    case "mark":
                        self.markAll();
                        self.progressBar();
                        break;

                    case "delete":
                        self.clear();
                        self.displayTodos();
                        break;
                }
            },
            false
        );
    }
}

const todoController = new TodoController();

const next = document.querySelector(".todo .change-date-btn").firstElementChild;
const prev = document.querySelector(".todo .change-date-btn").lastElementChild;
next.onclick = () => compareDate.nextTodo();
prev.onclick = () => compareDate.prevTodo();

const next_task = document.querySelector(".task .change-date-btn")
    .firstElementChild;
const prev_task = document.querySelector(".task .change-date-btn")
    .lastElementChild;
next_task.onclick = () => compareDate.nextTask();
prev_task.onclick = () => compareDate.prevTask();

class TaskController extends CommonController {
    constructor() {
        super();
        const self = this;
        this._url = "http://www.todo.com:1010/php/task.php";

        this.add();
        this.displayTasks();
        this.taskOption();
        this.taskAction();
        this.completed();
        this.search();

    }

    /**
     * @access url
     */
    get url() { return this._url }

    /**
     * @method taskOption
     * @description task option like edit, delete
     */

    taskOption() {
        const self = this;
        document.addEventListener(
            "click",
            (e) => {
                if (e.target.parentElement.classList.contains("delete-task")) {
                    self.deleteTask(e);
                }
                if (e.target.classList.contains("editing")) {
                    // TODO: Implement the Better Solution
                    // self.editTodo();
                }
            },
            false
        );
    }

    /**
     * @method add
     * @description add new task
     */
    add() {
        const self = this;
        document.querySelector("#save-task").addEventListener(
            "click",
            async function (e) {
                e.preventDefault();
                const title = document.querySelector("#add-task input[name=title]")
                    .value;
                const tag = document.querySelector("#add-task input[name=tag]").value;
                const s_date = document.querySelector("#add-task input[name=s_date]")
                    .value;
                const e_date = document.querySelector("#add-task input[name=e_date]")
                    .value;
                const todos = document.querySelector(
                    "#add-task .task-container-2 input[type=text]"
                ).value;
                const dates = document.querySelector(
                    "#add-task .task-todos input[type=date]"
                ).value;

                if (!title || !tag || !s_date || !e_date || !todos || !dates) {
                    return;
                }
                await fetch(self.url, {
                    method: "POST",
                    body: new FormData(document.querySelector("#add-task")),
                })
                    .then((res) => res.json())
                    .then((d) => console.log(d));
                self.displayTasks();
                todoController.displayTodos();
            },
            false
        );
    }

    /**
     * @method displayTasks
     * @description get all todo from database and displayed
     */
    displayTasks() {
        const self = this;
        const taskBody = document.querySelector(".task .todo .todo-body");

        this.getTodos((tasks) => {
            // Check if tasks not empty
            if (!tasks.data.length) {
                taskBody.innerHTML = `<div class="alert alert-info todo-content">Not Task Yet!</div>`;
                throw new Error("Tasks is Empty!");
            }
            taskBody.innerHTML = "";
            let counter = 0;
            for (const task of tasks.data) {
                // ------------------------ Check Date ------------
                if (
                    !self.compare(task, taskDate.textContent)
                ) {
                    counter++;
                    if (counter == tasks.data.length) {
                        taskBody.innerHTML = `<div class="alert alert-info todo-content">No Task Yet!</div>`;
                    }
                    continue;
                }

                self.html(task, taskBody);

            }
            todoController.progressBar();
        });

        // -------------- Update ProgressBar after make action ------------
        // this.progressBar();
    }

    /**
     * @method html
     * @param {task} task data
     * @param {taskBody} taskBody DOM element
     */
    html(task, taskBody) {
        const task_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="14.001" viewBox="0 0 17 14.001"><path id="task" d="M17,14H5V10H17v4ZM4,14H0V10H4v4ZM17,9H5V5H17V9ZM4,9H0V5H4V9ZM4,4H0V0H4V4ZM17,4H5V0H17V4Z" fill="#333"></path></svg>`;

        const date_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><path id="calender" d="M16,20H2a2,2,0,0,1-2-2L.01,4A2,2,0,0,1,2,2H3V0H5V2h8V0h2V2h1a2,2,0,0,1,2,2V18A2,2,0,0,1,16,20ZM2,7V18H16V7Zm7,7H4V9H9v5Z" fill="#333"></path></svg>`;

        const edit_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18.001" height="18.002" viewBox="0 0 18.001 18.002"><path id="pencil" d="M3.75,18h0L0,18v-3.75L11.06,3.192l3.75,3.75ZM15.88,5.872h0L12.13,2.122,13.96.292a1,1,0,0,1,1.41,0l2.34,2.34a1,1,0,0,1,0,1.41L15.88,5.872Z" transform="translate(0 0)" fill="#333"></path></svg>`;

        const delete_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18"><path id="trush" d="M11,18H3a2,2,0,0,1-2-2V4H13V16A2,2,0,0,1,11,18ZM14,3H0V1H3.5l1-1h5l1,1H14V3Z" transform="translate(0 0)" fill="#333"></path></svg>`;

        // ------------- check if task exists --------------
        let action = `
        <div class="row justify-content-end align-items-center">
            <span class="edit" data-id="${task.id}">
                <div class="overlay"></div>
                ${edit_icon}
            </span>
            <span class="delete delete-task" data-id="${task.id}">
                <div class="overlay"></div>
                ${delete_icon}
            </span>
        </div>`;
        const task_category = `
        <div class="category">
            <span class="row justify-content-start align-items-center">
                ${task_icon} ${task.tag}
            </span>
        </div>`;

        // ------------- add todos as view page --------------
        taskBody.innerHTML += `<div class="todo-content ${
            task.status == 0 ? "" : "line-through"
            }">
    <div class="progress-area" data-id="${task.id}"><span class="line"></span></div>
    <article>
        <h2 class="title">${task.title}</h2>
        <div class="info row justify-content-start align-items-center">
            ${task_category}
        <div class="todo-date">
            <span class="row justify-content-start align-items-center">
                ${date_icon} ${task.date_start} - ${task.date_end}
            </span>
        </div>
        </div>
    </article>
    <div class="action ${
            task.status == 0 ? "" : "hide"
            }">${action}</div>
    <div class="completed-action ${
            task.status == 0 ? "" : "w-100 secondary-bg"
            }" data-id="${task.id}"></div>
</div>
`;

    }

    /**
     * @method getTaskDate
     * @param {date} date
     * @description split date to day, month, year
     * @returns Object that contains day, month, year
     */
    getTaskDate(date) {
        const htmlDate = date;

        const dateArr = htmlDate.split(" ");
        const month = dateArr[1];
        const day = dateArr[2];
        const year = dateArr[3];

        return {
            day,
            month,
            year
        }
    }

    /**
     * @method compare
     * @param {task} task task date
     * @param {now} now current date
     * @returns boolean value true | false
     */
    compare(task, now) {
        const current_date = this.getTaskDate(now);
        const task_start_date = this.getTaskDate(task.date_start);
        const task_end_date = this.getTaskDate(task.date_end);

        const compare_day = (current_date.day >= task_start_date.day && current_date.day <= task_end_date.day);
        const compare_month = (this.monthNameToNumber(current_date.month) >= this.monthNameToNumber(task_start_date.month) && this.monthNameToNumber(current_date.month) <= this.monthNameToNumber(task_end_date.month));
        const compare_year = (current_date.year >= task_start_date.year && current_date.year <= task_end_date.year);

        return compare_day && compare_month && compare_year;
    }

    /**
     * @method monthNameToNumber
     * @param {month} month month as string
     * @returns month as number
     */
    monthNameToNumber(month) {
        const monthName = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        const index = monthName.indexOf(month);

        return index !== -1 && index + 1;
    }

    /**
     * @method deleteTask
     * @param {ele} ele target elements
     * @description delete select task
     */
    deleteTask(ele) {
        const req = `id=${ele.target.parentElement.getAttribute(
            "data-id"
        )}&delete=1`;
        this.makeAjax(req);
    }

    /**
     * @method clear
     * @description clear all tasks match date
     */
    clear() {
        const currentDate = document.querySelector(".task .current-date p").textContent;
        this.makeAjax(`date=${currentDate}&deleteAll=1`);
    }

    /**
     * @method taskAction
     * @description take action like delete all, search
     */
    taskAction() {
        const self = this;
        document.querySelector(".task .todo-option").addEventListener(
            "click",
            (evt) => {
                const ele = evt.target;

                switch (ele.getAttribute("data-event")) {
                    case "search":
                        break;

                    case "delete":
                        self.clear();
                        self.displayTasks();
                        break;
                }
            },
            false
        );
    }

    /**
     * @method search
     */
    search() {
        const select = document.querySelector('.task #filter');
        const self = this;
        const taskBody = document.querySelector(".body .task .todo .todo-body");
        self.getTodos(task => {
            const tasks = task.data;
            document.querySelector('.task input[name=search]').addEventListener('input', function () {
                const val = this.value;
                const type = select.value;
                const pattern = new RegExp(val, 'gi');
                if (!val) {
                    self.displayTasks();
                }
                switch (type) {
                    case "title":
                        const title_result = tasks.filter(task => pattern.test(task.title));
                        if (!title_result.length) {
                            taskBody.innerHTML = `<div class="alert alert-info todo-content">task doesn't exists!</div>`;
                            throw new Error("Tasks not found!");

                        } else {
                            taskBody.innerHTML = "";
                            title_result.forEach(task => self.html(task, taskBody));
                        }
                        break;
                    case "tag":
                        const tag_result = tasks.filter(task => pattern.test(task.tag));
                        if (!tag_result.length) {
                            taskBody.innerHTML = `<div class="alert alert-info todo-content">task doesn't exists!</div>`;
                            throw new Error("Tasks not found!");

                        } else {
                            taskBody.innerHTML = "";
                            tag_result.forEach(task => self.html(task, taskBody));
                        }
                        break;
                }



            }, false);

        });
    }

    /**
     * @method completed
     * @description check if task is completed and take certian action
     */
    completed() {
        const self = this;
        document.querySelector(".task .todo .todo-body").addEventListener(
            "click",
            (evt) => {
                const ele = evt.target;
                if (ele.classList.contains("completed-action")) {
                    const id = ele.getAttribute("data-id");
                    self.getTodos((data) => {
                        const tasks = data.data;
                        const match = tasks.filter((task) => task.id == id);
                        if (match) {
                            const completed = match[0].status == 0 ? "1" : "0";
                            self.makeAjax(`id=${id}&complete=1&status=${completed}`);

                            todoController.progressBar();
                        }
                    });
                }
            },
            false
        );
    }

    /**
     * @method progressBar
     * @description Shows us how match completd task
     */
    async progressBar(todo) {
        const line = Array.from(document.querySelectorAll(".task .progress-area .line"));

        await this.getTodos(async (data) => {
            const todo_all = await todo;
            const tasks = data.data;

            const currentTask = tasks.filter(task => this.compare(task, taskDate.textContent));
            const todos = {};
            todo_all.forEach((t) => {
                const todo_id = t.id;
                currentTask.forEach(task => {
                    const task_todo_id = task.todos;
                    if (task_todo_id.indexOf(todo_id) !== -1) {
                        if (!todos.hasOwnProperty(task.id)) {
                            todos[task.id] = [];
                        }
                        todos[task.id].push(t);
                    }
                });
            });

            for (let i = 0; i < line.length; i++) {
                const bar = line[i];
                const id = bar.parentElement.getAttribute('data-id');
                const parent = bar.parentElement.parentElement;

                if (todos.hasOwnProperty(id)) {
                    if (!todos[id].length) {

                        bar.setAttribute("style", `width:0%`);
                        return false;
                    }

                    const length = todos[id].length;
                    const range = todos[id].filter((t) => t.status == 1);

                    const result = (100 * range.length) / length;
                    bar.setAttribute("style", `width: ${result}%`);
                }

                if (bar.style.width != '100%') {
                    parent.classList.remove('line-through');
                    parent.lastElementChild.classList.remove('w-100', 'secondary-bg');
                    parent.lastElementChild.previousElementSibling.classList.remove('hide');
                } else {
                    parent.classList.add('line-through');
                    parent.lastElementChild.classList.add('w-100', 'secondary-bg');
                    parent.lastElementChild.previousElementSibling.classList.add('hide');
                }

            }


        });
    }
}

const taskController = new TaskController();