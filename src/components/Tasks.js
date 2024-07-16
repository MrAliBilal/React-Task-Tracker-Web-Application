import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {

  return (
    <>
        {tasks.map((task, index) => (
        <Task key={index}  task={task} onDelete={onDelete} onToggle={onToggle} />
        ))}
    </>
  )
}

export default Tasks


// const tasks = [
    // {
    //     id: 1,
    //     text: 'abc111',
    //     dat: 'feb 1 at 2:30pm',
    //     reminder: false,
    // },
    // {
    //     id: 2,
    //     text: 'abc222',
    //     dat: 'feb 1 at 2:30pm',
    //     reminder: true,
    // },
    // {
    //     id: 3,
    //     text: 'abc333',
    //     dat: 'feb 1 at 2:30pm',
    //     reminder: false,
    // }
// ]