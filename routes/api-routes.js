const workout = require('../models/Workout');

module.exports = (app) => {
    app.get('/api/workouts', (req, res) => {
        workout.find({})
            .then((workouts) => {
                workouts.forEach((workout) => {
                    workout.totalDuration = 0;
                    workout.exercises.forEach((exercise) => {
                        workout.totalDuration += exercise.duration;
                    });
                });

                res.json(workouts);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    app.get('/api/workouts/range', (req, res) => {
        workout.find({})
            .then((data) => {
                res.json(data);
            })
            .catch(({ message }) => {
                res.json(message);
            });
    });

    app.post('/api/workouts', ({ body }, res) => {
        workout.create(body)
            .then((data) => {
                res.json(data);
            })
            .catch(({ message }) => {
                res.json(message);
            });
    });

    app.put('/api/workouts/:id', (req, res) => {
        workout.findById(req.params.id)
            .then((data) => {
                let workoutExercises = data.exercises;

                workoutExercises.push(req.body);

                workout.findByIdAndUpdate(
                    req.params.id,
                    data,
                    (err, result) => {
                        if (err) res.json(err);
                        else res.json(result);
                    }
                );
            })
            .catch(({ message }) => {
                res.json(message);
            });
    });
};