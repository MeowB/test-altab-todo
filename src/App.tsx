import { useState } from 'react'
import './styles/reset.scss'
import './app.scss'
import { FaTrash, FaArrowUp, FaArrowDown, FaCalendar } from 'react-icons/fa'

type Task = {
	id: number
	title: string
	completed: boolean
	date: Date
}

function App() {
	const [tasks, setTasks] = useState<Task[] | null>(null)
	const [newTaskOpen, setNewTaskOpen] = useState<boolean>(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement
		const textarea = form.elements.namedItem('taskTitle') as HTMLTextAreaElement
		const title = textarea.value.trim()
		const dateInput = form.elements.namedItem('taskDate') as HTMLInputElement
		const date = dateInput && dateInput.value ? new Date(dateInput.value) : new Date()
		if (title) {
			const newTask: Task = {
				id: Date.now(),
				title,
				completed: false,
				date,
			}

			if (tasks) {
				setTasks([...tasks, newTask])
			} else {
				setTasks([newTask])
			}

			setNewTaskOpen(false)
			textarea.value = ''
		}

	}

	const handleCheckboxChange = (id: number) => {
		if (!tasks) return
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
		const newTasks = tasks.filter(task => !task.completed)

		setTasks(newTasks)
	}

	const handleDelete = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		const li = (e.currentTarget as HTMLElement).closest('li');
		if (!li || !tasks) return;
		const id = Number(li.getAttribute('key')) || Number(li.dataset.key) || Number(li.getAttribute('data-key'));
		if (!id) return;
		const newTasks = tasks.filter(task => task.id !== id);
		setTasks(newTasks);
	}

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
											defaultValue={new Date().toISOString().split('T')[0]}
										/>
									</div>
								</div>
							</form>
						)
					}
				</div>
				<ul className='tasks'>
					{tasks?.map(task => (
						<li className={`task`} key={task.id}>
							<div className="title">
								<input
									type="checkbox"
									checked={task.completed}
									onChange={() => handleCheckboxChange(task.id)}
								/>
								<h2 className={`${task.completed ? 'dashed' : ''}`}>{task.title}</h2>
							</div>
							{task.date
								? (
									<p className="date">
										<FaCalendar /> {task.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
									</p>
								) : ''
							}
							<a className="cross" onClick={(e) => handleDelete(e)}>X</a>
						</li>
					))}
				</ul>
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
