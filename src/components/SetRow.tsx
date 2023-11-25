import React, { useState, useEffect } from "react";

import { ISet, editSet, deleteSet } from '../redux/slices/setsSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { IExercise } from "../redux/slices/exerciseSlice";
import { editCurrentRoutine } from "../redux/slices/currentRoutineSlice";


const SetRow: React.FC<{ set: ISet, exercise: IExercise, index: number }> = ({
  set, exercise, index
}) => {

  const dispatch = useAppDispatch();
  const [currentSet, setCurrentSet] = useState<ISet|null>(set);
  const [rest, setRest] = useState(set.rest);
  const [weight, setWeight] = useState(set.weight);
  const [rep, setRep] = useState(set.rep);

  const routine = useAppSelector(state => {
    return state.persistedReducer.currentRoutine;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, setState: Function) => {
    // console.log(e.currentTarget.value);
    setState(e.currentTarget.value);
    // dispatch(editSet({ _id: set._id ,rest, weight, rep: rep }));
  }
  const handleDelete = () => {
    setCurrentSet(null);
    // dispatch(deleteSet("place ID here"));
  }
  
  

  useEffect(() => {
    // delete routine.exercises[parseInt(exercise._id) - 1].sets[parseInt(set._id) - 1];
    // console.log(tempExercises, routine.exercises);
    if (currentSet == null) {
      
      let tempExercises: IExercise[] = routine.exercises.map((e) => {
        if (e._id === exercise._id)
          return {
            ...exercise,
            sets: exercise.sets.filter((s) => {
              if (s._id === set._id) return false;
              else return true;
            }),
          };
        else return e;
      });
      // console.log(tempExercises);
      dispatch(
        editCurrentRoutine({
          ...routine,
          exercises: [...tempExercises],
        })
      );
    }
      }, [currentSet]);
  // modifies redux state
  useEffect(() => {
    setTimeout(() => {
      let tempExercises: IExercise[] = routine.exercises.map((e) => {
        if (e._id === exercise._id)
          return {
            ...exercise,
            sets: exercise.sets.map((s) => {
              if (s._id === set._id) return { ...set, rest, rep, weight };
              else return s;
            }),
          };
        else return e;
      });
      // console.log(tempExercises, routine.exercises);
      dispatch(
        editCurrentRoutine({
          ...routine,
          exercises: [...tempExercises],
        })
      );
    }, 2000);
    
    // find the exercise to modify its set
    // modify the set array by creating a new one with a new entry to it
    
  }, [rest, weight, rep]);

  return (
    <Box display="flex" alignItems="end" className={`set`}>
      <Box >
        <Typography gutterBottom >
          {index+1}
        </Typography>
      </Box>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-rep"+set._id+exercise._id+routine._id}>
          rep
        </InputLabel>
        <Input
          id={"standard-adornment-rep"+set._id+exercise._id+routine._id}
          value={rep}
          onChange={(e) => {
            handleChange(e, setRep);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-weight"+set._id+exercise._id+routine._id}>
          weight
        </InputLabel>
        <Input
          id={"standard-adornment-weight"+set._id+exercise._id+routine._id}
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
          value={weight}
          onChange={(e) => {
            handleChange(e, setWeight);
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel shrink={true} htmlFor={"standard-adornment-rest"+set._id+exercise._id+routine._id}>
          rest
        </InputLabel>
        <Input
          id={"standard-adornment-rest"+set._id+exercise._id+routine._id}
          value={rest}
          endAdornment={<InputAdornment position="end">(s)</InputAdornment>}
          onChange={(e) => {
            handleChange(e, setRest);
          }}
        />
      </FormControl>
      <Box>
        <IconButton
        className="mt-1"
        color="secondary"
        onClick={handleDelete}
      >
        <ClearIcon />
      </IconButton>
      </Box>
    </Box>
  );
};

export default SetRow