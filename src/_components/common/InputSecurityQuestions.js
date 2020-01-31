import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export function SimpleSelect(props) {
    const classes = useStyles();
    const {age, setAge, selectedQuestions, disabled} = props;
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        // setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setAge(event.target.value);
    };

    return (
        <FormControl className={classes.formControl} disabled={disabled}>
            <Select value={age} onChange={handleChange} displayEmpty className={classes.selectEmpty}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {selectedQuestions.indexOf('1') === -1 && <MenuItem value={'1'}>1 question</MenuItem>}
                {selectedQuestions.indexOf('2') === -1 && <MenuItem value={'2'}>2 question</MenuItem>}
                {selectedQuestions.indexOf('3') === -1 && <MenuItem value={'3'}>3 question</MenuItem>}
                {selectedQuestions.indexOf('4') === -1 && <MenuItem value={'4'}>4 question</MenuItem>}
                {selectedQuestions.indexOf('5') === -1 && <MenuItem value={'5'}>5 question</MenuItem>}
                {selectedQuestions.indexOf('6') === -1 && <MenuItem value={'6'}>6 question</MenuItem>}
            </Select>
        </FormControl>
    );
}

export default function SecurityQuestionInput(props) {
    const {value, onChange, submitted, id, disabled} = props;
    const [age, setAge] = React.useState(value[id].id);
    let selectedQuestions = [];
    for (let key in value) {
        value[key].id !== value[id].id && value[key].id && selectedQuestions.push(value[key].id)
    }
    const handleChange = e => {
        onChange(
            id,
            {
                id: age,
                answer: e.target.value
            }
        )
    };

    return (
        <div className={'form-group' + (submitted && !value[id].answer ? ' has-error' : '')}>
            <SimpleSelect
                age={age}
                setAge={setAge}
                selectedQuestions={selectedQuestions}
                disabled={disabled}
            />
            {!age && submitted && !value[id].answer &&
            <div className="help-block">Security question is required</div>
            }
            {
                age &&
                <div className={'form-group' + (submitted && !value[id].answer ? ' has-error' : '')}>
                    <label htmlFor="firstName">Your answer to {id} question</label>
                    <input type="text" className="form-control" value={value[id].answer}
                           onChange={handleChange}/>
                    {submitted && !value[id].answer &&
                    <div className="help-block">Security question is required</div>
                    }
                </div>
            }
        </div>

    )

}