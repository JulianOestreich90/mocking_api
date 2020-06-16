import ReadmeMarkdown from '../components/Readme.md';
import {READ_README} from "./types";

export const readReadme = (props) => dispatch => {
     fetch(ReadmeMarkdown)
        .then(res => res.text())
        .then(text => dispatch({
            type: READ_README,
            payload: text
        }))
};