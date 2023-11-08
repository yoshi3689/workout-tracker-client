import React from 'react'
import { Workout, Set } from "../routes/Root"
const SetRow: React.FC<{ setWorkout: Function; workout: Workout, set: Set }> = ({
  setWorkout,
  workout,
  set
}) => {
  return (
    <div className="row">
      <label htmlFor="reps">reps</label>

      <input type="number" name="reps" id="reps" />
      <label htmlFor="rest">rest</label>

      <input type="number" name="rest" id="rest" />

      <label htmlFor="weight">weight</label>
      <input type="number" name="weight" id="weight" />
      <button>---Remove Set</button>
    </div>
  );
};

export default SetRow