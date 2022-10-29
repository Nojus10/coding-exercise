import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "@Redux/Store";

export type StudentClass = "A" | "B" | "C" | "D" | "E" | "F"

export interface Student {
    Name: string
    Score: number
    Class: StudentClass
}

/**
 * Slice structure
 */
export interface StudentsSlice {
    students: Student[]
    showDeleteButton: boolean
}

/**
 * Set Initial State for Students Slice
 */
const initialState: StudentsSlice = {
    students: [
        {Name: "Alan", Score: 70, Class: "A"},
        {Name: "Ben", Score: 90, Class: "B"},
        {Name: "Cath", Score: 80, Class: "C"}
    ],
    showDeleteButton: false
}

/**
 * Configure Students Slice with initial state and reducers
 */
export const StudentsSlice = createSlice({
        name: "students",
        initialState,
        reducers: {
            addStudent(state, action: PayloadAction<Student>) {
                state.students.push(action.payload)
            },
            removeStudentListByNames(state, action: PayloadAction<Student[]>) {
                /**
                 * Remove students by their name, checks if the current student that is being
                 * filtered over belongs in the list of students to remove, if belongs remove the student.
                 */
                state.students = state.students.filter(student =>
                    !action.payload.some((delStudent) => delStudent.Name == student.Name)
                )
            },
            setDeleteButtonVisibility(state, action: PayloadAction<boolean>) {
                state.showDeleteButton = action.payload
            }
        }
    }
)

/**
 * Export all actions
 */
export const {addStudent, removeStudentListByNames, setDeleteButtonVisibility} = StudentsSlice.actions

/**
 * Wrapper for selecting the Student Slice
 */
export function useStudentsSlice() {
    return useSelector((state: RootState) => state.StudentsSlice)
}

export default StudentsSlice.reducer