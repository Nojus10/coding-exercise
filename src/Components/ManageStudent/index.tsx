import styles from "./AddStudent.module.css"
import {useState} from "react";
import {useDispatch} from "react-redux";
import {
    addStudent,
    removeStudentListByNames,
    setDeleteButtonVisibility,
    StudentClass,
    useStudentsSlice
} from "@Redux/Slices/StudentsSlice";

function ManageStudent({GridRef}: any) {
    const [name, setName] = useState("")
    const [score, setScore] = useState(0)
    const [studentClass, setClass] = useState<StudentClass>("A")
    const studentsSlice = useStudentsSlice()

    const dispatch = useDispatch()

    function SubmitStudent() {

        if (name.length < 2) {
            return alert("Please a name that is longer than 2 characters")
        }

        dispatch(addStudent({Name: name, Score: score, Class: studentClass}))

        setName("")
        setScore(0)
        setClass("A")
    }

    function SubmitDeleteSelected() {
        if (!GridRef.current) return alert("Grid failed to load.")

        const selectedRows = GridRef.current.api.getSelectedRows()
        dispatch(removeStudentListByNames(selectedRows))
        dispatch(setDeleteButtonVisibility(false))
    }

    return (
        <div className={styles.container}>
            <div className={styles.addContainer}>

                <input className={styles.input} value={name}
                       onChange={(e) => setName(e.currentTarget.value)} placeholder="Name" type="text"/>

                <input className={styles.input} value={score} onChange={(e) => setScore(Number(e.currentTarget.value))}
                       placeholder="Score"
                       type="number"/>

                <select className={styles.input} onChange={(e) => setClass(e.currentTarget.value as StudentClass)}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>

                <button className={styles.addButton} onClick={SubmitStudent}>Add</button>
            </div>
            {
                studentsSlice.showDeleteButton &&
                <button className={styles.deleteButton} onClick={SubmitDeleteSelected}>Delete Selected</button>
            }
        </div>
    )
}

export default ManageStudent