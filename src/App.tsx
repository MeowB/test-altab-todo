import { useState, useEffect } from 'react'
import './styles/reset.scss'
import './app.scss'
import { FaTrash, FaArrowUp, FaArrowDown, FaCalendar } from 'react-icons/fa'
import {
	DragDropContext,
	Droppable,
	Draggable,
} from "@hello-pangea/dnd";
import type { DropResult } from '@hello-pangea/dnd';


type Task = {
	id: number
	title: string
	completed: boolean
	date?: Date | null // Make date optional and allow null
}

function App() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [newTaskOpen, setNewTaskOpen] = useState<boolean>(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const textarea = form.elements.namedItem('taskTitle') as HTMLTextAreaElement;
		const title = textarea.value.trim();
		const dateInput = form.elements.namedItem('taskDate') as HTMLInputElement;
		const date = dateInput && dateInput.value ? new Date(dateInput.value) : null; // Default to null if no date is provided

		if (title) {
			const newTask: Task = {
				id: Date.now(),
				title,
				completed: false,
				date,
			};

			setTasks([...tasks, newTask]);
			setNewTaskOpen(false);
			textarea.value = '';
		}
	}

	const handleCheckboxChange = (id: number, li: HTMLElement | null) => {
		if (!tasks) return
		if (!li) return

		if (li.classList.contains('checked')) {
			li.classList.remove('checked')
		} else {
			li.classList.add('checked')
		}

		const updatedTasks = tasks.map(task => {
			if (task.id === id) {
				return { ...task, completed: !task.completed }
			}
			return task
		})
		setTasks(updatedTasks)
	}

	const handleSortChecked = () => {
		if (!tasks) return
		const sortedTasks = [...tasks].sort((a, b) => {
			return a.completed === b.completed ? 0 : a.completed ? -1 : 1
		})
		setTasks(sortedTasks)
	}

	const handleSortUnchecked = () => {

		if (!tasks) return
		const sortedTasks = [...tasks].sort((a, b) => {
			return a.completed === b.completed ? 0 : a.completed ? 1 : -1
		})
		setTasks(sortedTasks)
	}


	const handleClearComplete = () => {
		if (!tasks) return
		const allChecked = document.querySelectorAll('.checked')

		allChecked.forEach((el, i) => {
			setTimeout(() => {
				(el as HTMLElement).classList.add('remove');
			}, i * 300);
		});
		
		const newTasks = tasks.filter(task => !task.completed);
		setTimeout(() => {
			setTasks(newTasks)
		}, allChecked.length * 300 + 400)
	}

	const handleDelete = (id: number, li: HTMLElement | null) => {
		if (!tasks) return;
		if (li) {
			li.classList.add('remove')
			const timeout = setTimeout(() => {

				const newTasks = tasks.filter(task => task.id !== id);
				setTasks(newTasks);
				clearTimeout(timeout)
			}, 400)

		}
	};


	const handleOnDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const items = Array.from(tasks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setTasks(items);
	};

	return (
		<>
			<main className='todo-list'>

				<h1>TODO List</h1>
				<div className="add-form">
					{newTaskOpen === false
						? (
							<button onClick={() => setNewTaskOpen(prev => !prev)}>+ New Task</button>
						)
						: (
							<form
								onSubmit={(e) => { handleSubmit(e) }}
							>
								<textarea
									name="taskTitle"
									placeholder="Enter task description..."
									rows={5}
									autoFocus
									required

								/>
								<div className='task-form-actions'>
									<div className="buttons">
										<button type="submit">+ Save Task</button>
										<button
											type="button"
											onClick={() => setNewTaskOpen(prev => !prev)}
											className='cancel-button'
										>
											X Cancel
										</button>
									</div>
									<div className="calendar">
										<input
											type="date"
											name="taskDate"

										/>
									</div>
								</div>
							</form>
						)
					}
				</div>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId='todos'>
						{(provided) => (
							<ul {...provided.droppableProps} ref={provided.innerRef} className='tasks'>
								{tasks?.map((task, index) => (
									<Draggable key={task.id} draggableId={(task.id).toString()} index={index}>
										{(provided) => (
											<li
												className={`task`}
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={{ opacity: 1, transform: 'translateY(0)' }}

											>
												<div className="title">
													<input
														type="checkbox"
														checked={task.completed}
														onChange={(e) => handleCheckboxChange(task.id, e.currentTarget.closest('li'))}
													/>
													<h2 className={`${task.completed ? 'dashed' : ''}`}>{task.title}</h2>
												</div>
												{task.date && (
													<p className="date">
														<FaCalendar /> {task.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
													</p>
												)}
												<a className="cross" onClick={(e) => handleDelete(task.id, e.currentTarget.parentElement)}>X</a>
											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</ul>

						)}
					</Droppable>
				</DragDropContext>
				<div className="controls">
					<button onClick={handleClearComplete}><FaTrash /> Clear complete</button>
					<button onClick={handleSortChecked}><FaArrowDown /> Complete first</button>
					<button onClick={handleSortUnchecked}><FaArrowUp /> Complete last</button>
				</div>
			</main>
		</>
	)
}

export default App
