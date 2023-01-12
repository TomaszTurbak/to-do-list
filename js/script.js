{
    let tasks = [];
    let hiddenDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, {
                content: newTaskContent
            }
        ];
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    }

    // const markAllTasksDone = () => {
    //     tasks = tasks.map((task) => ({
    //         ...task,
    //         done: true,
    //     }));

    //     render();
    // };

    // const togglehiddenDoneTasks = () => {
    //     hiddenDoneTasks = !hiddenDoneTasks;
    //     render();
    // };


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class= "tasks__item ${task.done && hiddenDoneTasks ? "tasks__item--hidden" : ""}">
                <button class= "tasks__button tasks__button--toggleDone js-done">
                    ${task.done ? "✔" : ""}
                </button>
                <span class=" ${task.done ? "tasks__content--done" : "tasks__content"}">
                    ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                     🗑
                </button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let renderedButtons = "";

        if (tasks.lenght > 0) {
            renderedButtons += `
                <button class="form__button js-hideDoneTask">
                    ${hiddenDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="form_button js-allDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `;
        }
        document.querySelector("js-buttons").innerHTML = renderedButtons;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}